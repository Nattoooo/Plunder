import type { Game } from '../game/game';
import { MAP_TILE } from '../world/terrain';
import { WORLD_SIZE, regionIslands, REGION, REGIONS, portLayout, getIsland, Island, CENTER, BIOME_NAMES, biomeAt, levelAt } from '../world/worldgen';
import { poisNear, POI } from '../game/pois';

const FCOL: Record<string, string> = { pirate: '#ff5a4a', navy: '#6ab0ff', merchant: '#8ae87a', ghost: '#7affc0', hunter: '#ffa040' };
const PORT_COL = ['#4a8ae8', '#5ac85a', '#e8463a'];
const tmpPOI: POI[] = [];

export class Minimap {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  size = 160;
  upp = 16;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.width = this.size;
    canvas.height = this.size;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
  }

  draw(g: Game): void {
    const ctx = this.ctx;
    const S = this.size;
    const f = g.avatar ?? g.player;
    const upp = g.avatar ? 8 : this.upp;
    const x0 = f.x - (S / 2) * upp;
    const y0 = f.y - (S / 2) * upp;
    ctx.fillStyle = '#24507a';
    ctx.fillRect(0, 0, S, S);
    const lod = upp <= 8 ? 8 : 16;
    const span = MAP_TILE * lod;
    const tx0 = Math.floor(x0 / span);
    const ty0 = Math.floor(y0 / span);
    const tx1 = Math.floor((x0 + S * upp) / span);
    const ty1 = Math.floor((y0 + S * upp) / span);
    const k = lod / upp;
    for (let tx = tx0; tx <= tx1; tx++) for (let ty = ty0; ty <= ty1; ty++) {
      if (tx < 0 || ty < 0 || tx * span >= WORLD_SIZE || ty * span >= WORLD_SIZE) continue;
      const tile = g.chunks.tile(lod, tx, ty, Math.hypot(tx * span + span / 2 - f.x, ty * span + span / 2 - f.y));
      if (tile?.img) ctx.drawImage(tile.img, Math.round((tx * span - x0) / upp), Math.round((ty * span - y0) / upp), MAP_TILE * k, MAP_TILE * k);
    }
    const disc = g.profile.discovered;
    const cs = 1024 / upp;
    const cx0 = Math.floor(x0 / 1024);
    const cy0 = Math.floor(y0 / 1024);
    ctx.fillStyle = 'rgba(200,176,122,0.9)';
    for (let cx = cx0; cx <= cx0 + Math.ceil(S / cs) + 1; cx++) for (let cy = cy0; cy <= cy0 + Math.ceil(S / cs) + 1; cy++) {
      if (cx < 0 || cy < 0 || cx >= 500 || cy >= 500) continue;
      if (disc[cy * 500 + cx]) continue;
      ctx.fillRect(Math.floor((cx * 1024 - x0) / upp), Math.floor((cy * 1024 - y0) / upp), Math.ceil(cs), Math.ceil(cs));
    }
    const dot = (x: number, y: number, col: string, r = 1) => {
      const sx = Math.round((x - x0) / upp);
      const sy = Math.round((y - y0) / upp);
      if (sx < -2 || sy < -2 || sx > S + 2 || sy > S + 2) return;
      ctx.fillStyle = '#000';
      ctx.fillRect(sx - r - 1, sy - r - 1, r * 2 + 3, r * 2 + 3);
      ctx.fillStyle = col;
      ctx.fillRect(sx - r, sy - r, r * 2 + 1, r * 2 + 1);
    };
    const vision = g.player.stats?.vision ?? 420;
    poisNear(f.x, f.y, Math.min(vision, S * upp * 0.6), tmpPOI);
    for (const p of tmpPOI) {
      if (!g.poiAvailable(p)) continue;
      if (p.kind === 'flotsam' || p.kind === 'bottle') dot(p.x, p.y, '#e8c060', 0);
      else if (p.kind === 'wreck') dot(p.x, p.y, '#b08050', 1);
      else if (g.avatar && (p.kind === 'chest' || p.kind === 'shrine')) dot(p.x, p.y, '#ffd040', 0);
    }
    for (const l of g.loot) dot(l.x, l.y, '#ffe080', 0);
    for (const s of g.ships) {
      if (s.isPlayer || s.sinking >= 0) continue;
      if (Math.hypot(s.x - f.x, s.y - f.y) > vision * 1.4) continue;
      dot(s.x, s.y, g.aiHostileToPlayer(s) ? '#ff4a3a' : FCOL[s.faction] ?? '#fff', s.boss ? 2 : 1);
    }
    const rx0 = Math.floor(x0 / REGION) - 1;
    const ry0 = Math.floor(y0 / REGION) - 1;
    for (let rx = rx0; rx <= rx0 + Math.ceil((S * upp) / REGION) + 2; rx++) for (let ry = ry0; ry <= ry0 + Math.ceil((S * upp) / REGION) + 2; ry++) {
      for (const isl of regionIslands(rx, ry)) {
        if (!isl.port) continue;
        const L = portLayout(isl);
        if (!L) continue;
        const cxp = Math.floor(L.dockX1 / 1024);
        const cyp = Math.floor(L.dockY1 / 1024);
        if (!disc[cyp * 500 + cxp]) continue;
        dot(L.dockX1, L.dockY1, PORT_COL[isl.port.faction], 1);
      }
    }
    for (const m of g.monsters) if (!m.dead && Math.hypot(m.x - f.x, m.y - f.y) < vision * 1.4) dot(m.x, m.y, '#c060ff', 2);
    for (const it of g.profile.inv.items) if (it.data) dot(it.data.x, it.data.y, '#ff2020', 1);
    for (const q of g.profile.quests) if (!q.done) dot(q.x, q.y, '#ffd040', 1);
    if (g.profile.waypoint) dot(g.profile.waypoint.x, g.profile.waypoint.y, '#ff6a5a', 1);
    const px = (f.x - x0) / upp;
    const py = (f.y - y0) / upp;
    const ang = g.avatar ? g.avatar.dir : g.player.heading;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(ang);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(-5, -5);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff4d0';
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(-4, -3);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-4, 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    const wa = g.env.windAngle;
    const wr = S / 2 - 12;
    const wx = S / 2 - Math.cos(wa) * wr;
    const wy = S / 2 - Math.sin(wa) * wr;
    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(wa);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(-6, -1, 10, 2);
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(2, -4);
    ctx.lineTo(2, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export class WorldMap {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  fog: HTMLCanvasElement;
  fctx: CanvasRenderingContext2D;
  fogImg: ImageData;
  cx = CENTER;
  cy = CENTER;
  upp = 12;
  dragging = false;
  moved = false;
  lx = 0;
  ly = 0;
  hoverX = -1;
  hoverY = -1;
  dpr = 1;
  tip: HTMLElement;
  info: HTMLElement;
  private fogDirty = true;

  constructor(canvas: HTMLCanvasElement, tip: HTMLElement, info: HTMLElement, private g: Game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.tip = tip;
    this.info = info;
    this.fog = document.createElement('canvas');
    this.fog.width = 500;
    this.fog.height = 500;
    this.fctx = this.fog.getContext('2d')!;
    this.fogImg = this.fctx.createImageData(500, 500);
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const mx = (e.clientX - r.left) * this.dpr;
      const my = (e.clientY - r.top) * this.dpr;
      const wx = this.cx + (mx - canvas.width / 2) * this.upp;
      const wy = this.cy + (my - canvas.height / 2) * this.upp;
      this.upp = Math.max(4, Math.min(1024, this.upp * (e.deltaY > 0 ? 1.4 : 1 / 1.4)));
      this.cx = wx - (mx - canvas.width / 2) * this.upp;
      this.cy = wy - (my - canvas.height / 2) * this.upp;
    }, { passive: false });
    canvas.addEventListener('mousedown', (e) => {
      this.dragging = true;
      this.moved = false;
      this.lx = e.clientX;
      this.ly = e.clientY;
      canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', (e) => {
      if (!this.dragging) return;
      this.dragging = false;
      canvas.style.cursor = 'grab';
      if (!this.moved && e.target === canvas) {
        const r = canvas.getBoundingClientRect();
        const wx = this.cx + ((e.clientX - r.left) * this.dpr - canvas.width / 2) * this.upp;
        const wy = this.cy + ((e.clientY - r.top) * this.dpr - canvas.height / 2) * this.upp;
        if (e.button === 2) this.g.profile.waypoint = null;
        else this.g.profile.waypoint = { x: wx, y: wy };
      }
    });
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.g.profile.waypoint = null;
    });
    window.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      this.hoverX = (e.clientX - r.left) * this.dpr;
      this.hoverY = (e.clientY - r.top) * this.dpr;
      if (!this.dragging) return;
      const dx = e.clientX - this.lx;
      const dy = e.clientY - this.ly;
      if (Math.abs(dx) + Math.abs(dy) > 3) this.moved = true;
      this.cx -= dx * this.dpr * this.upp;
      this.cy -= dy * this.dpr * this.upp;
      this.lx = e.clientX;
      this.ly = e.clientY;
    });
  }

  markFog(cx: number, cy: number): void {
    const o = (cy * 500 + cx) * 4;
    this.fogImg.data[o + 3] = 0;
    this.fogDirty = true;
  }

  rebuildFog(): void {
    const d = this.g.profile.discovered;
    const data = this.fogImg.data;
    for (let i = 0; i < 250000; i++) {
      const o = i * 4;
      data[o] = 200;
      data[o + 1] = 176;
      data[o + 2] = 122;
      data[o + 3] = d[i] ? 0 : 255;
    }
    this.fogDirty = true;
  }

  centerOn(x: number, y: number): void {
    this.cx = x;
    this.cy = y;
  }

  resize(): void {
    this.dpr = window.devicePixelRatio || 1;
    const w = Math.round(this.canvas.clientWidth * this.dpr);
    const h = Math.round(this.canvas.clientHeight * this.dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  draw(): void {
    const g = this.g;
    this.resize();
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const upp = this.upp;
    const x0 = this.cx - (W / 2) * upp;
    const y0 = this.cy - (H / 2) * upp;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#2c5f8a';
    ctx.fillRect(0, 0, W, H);
    const lod = upp <= 12 ? 8 : upp <= 48 ? 32 : upp <= 192 ? 128 : 512;
    const span = MAP_TILE * lod;
    const k = lod / upp;
    const tx0 = Math.max(0, Math.floor(x0 / span));
    const ty0 = Math.max(0, Math.floor(y0 / span));
    const tx1 = Math.min(Math.ceil(WORLD_SIZE / span) - 1, Math.floor((x0 + W * upp) / span));
    const ty1 = Math.min(Math.ceil(WORLD_SIZE / span) - 1, Math.floor((y0 + H * upp) / span));
    const disc = g.profile.discovered;
    for (let tx = tx0; tx <= tx1; tx++) for (let ty = ty0; ty <= ty1; ty++) {
      const c0x = Math.floor((tx * span) / 1024);
      const c0y = Math.floor((ty * span) / 1024);
      const cn = Math.max(1, Math.floor(span / 1024));
      let any = false;
      for (let a = 0; a < cn && !any; a += Math.max(1, cn >> 3)) for (let b = 0; b < cn && !any; b += Math.max(1, cn >> 3)) if (disc[(c0y + b) * 500 + c0x + a]) any = true;
      if (!any && cn <= 8) {
        for (let a = 0; a < cn && !any; a++) for (let b = 0; b < cn && !any; b++) if (disc[(c0y + b) * 500 + c0x + a]) any = true;
      }
      if (!any) continue;
      const tile = g.chunks.tile(lod, tx, ty, Math.hypot(tx * span - this.cx, ty * span - this.cy));
      if (tile?.img) ctx.drawImage(tile.img, Math.floor((tx * span - x0) / upp), Math.floor((ty * span - y0) / upp), Math.ceil(MAP_TILE * k) + 1, Math.ceil(MAP_TILE * k) + 1);
    }
    if (this.fogDirty) {
      this.fctx.putImageData(this.fogImg, 0, 0);
      this.fogDirty = false;
    }
    ctx.imageSmoothingEnabled = upp < 300;
    ctx.drawImage(this.fog, (0 - x0) / upp, (0 - y0) / upp, WORLD_SIZE / upp, WORLD_SIZE / upp);
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = 'rgba(58,36,20,0.35)';
    ctx.lineWidth = 1;
    const grid = upp > 200 ? 51200 : upp > 40 ? 10240 : 2048;
    ctx.beginPath();
    for (let x = Math.floor(x0 / grid) * grid; x < x0 + W * upp; x += grid) {
      const sx = Math.round((x - x0) / upp) + 0.5;
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, H);
    }
    for (let y = Math.floor(y0 / grid) * grid; y < y0 + H * upp; y += grid) {
      const sy = Math.round((y - y0) / upp) + 0.5;
      ctx.moveTo(0, sy);
      ctx.lineTo(W, sy);
    }
    ctx.stroke();
    const fs = Math.round(13 * this.dpr);
    ctx.font = `${fs}px 'Pixelify Sans', monospace`;
    ctx.textAlign = 'center';
    const sxOf = (x: number) => (x - x0) / upp;
    const syOf = (y: number) => (y - y0) / upp;
    const label = (s: string, x: number, y: number, col: string) => {
      ctx.lineWidth = 3 * this.dpr;
      ctx.strokeStyle = 'rgba(20,12,8,0.9)';
      ctx.strokeText(s, x, y);
      ctx.fillStyle = col;
      ctx.fillText(s, x, y);
    };
    const hovers: { x: number; y: number; text: string }[] = [];
    const rx0 = Math.max(0, Math.floor(x0 / REGION));
    const ry0 = Math.max(0, Math.floor(y0 / REGION));
    const rx1 = Math.min(REGIONS - 1, Math.floor((x0 + W * upp) / REGION));
    const ry1 = Math.min(REGIONS - 1, Math.floor((y0 + H * upp) / REGION));
    for (let rx = rx0; rx <= rx1; rx++) for (let ry = ry0; ry <= ry1; ry++) {
      let any = false;
      for (let a = 0; a < 2 && !any; a++) for (let b = 0; b < 2 && !any; b++) if (disc[(ry * 2 + b) * 500 + rx * 2 + a]) any = true;
      if (!any) continue;
      for (const isl of regionIslands(rx, ry)) {
        if (!isl.port) continue;
        if (!disc[Math.floor(isl.y / 1024) * 500 + Math.floor(isl.x / 1024)]) continue;
        const sx = sxOf(isl.x);
        const sy = syOf(isl.y);
        const s = Math.max(3, Math.min(6, 600 / upp)) * this.dpr;
        ctx.fillStyle = '#140e0a';
        ctx.fillRect(sx - s - 1, sy - s - 1, s * 2 + 2, s * 2 + 2);
        ctx.fillStyle = PORT_COL[isl.port.faction];
        ctx.fillRect(sx - s, sy - s, s * 2, s * 2);
        if (g.profile.visitedPorts.includes(isl.id)) {
          ctx.fillStyle = '#fff4d0';
          ctx.fillRect(sx - 1, sy - 1, 2, 2);
        }
        if (upp <= 64) label(isl.port.name, sx, sy - s - 4 * this.dpr, '#fff4d0');
        hovers.push({ x: sx, y: sy, text: `${isl.port.name} — ${['Crown Port', 'Free Port', 'Pirate Haven'][isl.port.faction]} (Lv ${isl.level})` });
      }
    }
    for (const o of g.profile.owned) {
      const isl = getIsland(o.id);
      if (!isl) continue;
      const sx = sxOf(isl.x);
      const sy = syOf(isl.y);
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(sx - 1, sy - 12 * this.dpr, 2 * this.dpr, 12 * this.dpr);
      ctx.fillRect(sx, sy - 12 * this.dpr, 8 * this.dpr, 6 * this.dpr);
      ctx.fillStyle = '#e8c060';
      ctx.fillRect(sx + this.dpr, sy - 11 * this.dpr, 6 * this.dpr, 4 * this.dpr);
      label(o.name, sx, sy + 14 * this.dpr, '#ffe08a');
      hovers.push({ x: sx, y: sy, text: `${o.name} (yours) — ${o.structures.length} buildings` });
    }
    const X = (x: number, y: number, col: string, txt: string) => {
      const sx = sxOf(x);
      const sy = syOf(y);
      const s = 6 * this.dpr;
      ctx.lineWidth = 4 * this.dpr;
      ctx.strokeStyle = '#140e0a';
      ctx.beginPath();
      ctx.moveTo(sx - s, sy - s);
      ctx.lineTo(sx + s, sy + s);
      ctx.moveTo(sx + s, sy - s);
      ctx.lineTo(sx - s, sy + s);
      ctx.stroke();
      ctx.lineWidth = 2 * this.dpr;
      ctx.strokeStyle = col;
      ctx.stroke();
      hovers.push({ x: sx, y: sy, text: txt });
    };
    for (const it of g.profile.inv.items) if (it.id === 'treasure_map' && it.data) X(it.data.x, it.data.y, '#e8281e', `Treasure of ${it.data.island} (Lv ${it.data.level})`);
    if (g.profile.lost) X(g.profile.lost.x, g.profile.lost.y, '#8a5a2e', 'Your lost cargo');
    for (const q of g.profile.quests) {
      let x = q.x, y = q.y;
      if (q.done) {
        const isl = getIsland(q.port);
        if (isl) {
          x = isl.x;
          y = isl.y;
        }
      }
      const sx = sxOf(x);
      const sy = syOf(y);
      ctx.fillStyle = '#140e0a';
      ctx.beginPath();
      ctx.arc(sx, sy, 8 * this.dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd040';
      ctx.beginPath();
      ctx.arc(sx, sy, 6 * this.dpr, 0, Math.PI * 2);
      ctx.fill();
      label(q.done ? '+' : '!', sx, sy + 4 * this.dpr, '#140e0a');
      hovers.push({ x: sx, y: sy, text: `${q.title}${q.done ? ' (return for reward)' : ''}` });
    }
    if (g.profile.waypoint) {
      const sx = sxOf(g.profile.waypoint.x);
      const sy = syOf(g.profile.waypoint.y);
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(sx - 1, sy - 16 * this.dpr, 3 * this.dpr, 16 * this.dpr);
      ctx.fillStyle = '#e8463a';
      ctx.fillRect(sx + 2 * this.dpr, sy - 16 * this.dpr, 9 * this.dpr, 6 * this.dpr);
      hovers.push({ x: sx, y: sy, text: `Waypoint — ${g.milesFrom(g.profile.waypoint.x, g.profile.waypoint.y).toFixed(1)} mi` });
    }
    const f = g.avatar ?? g.player;
    const px = sxOf(f.x);
    const py = syOf(f.y);
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(g.player.heading);
    ctx.scale(this.dpr * 1.4, this.dpr * 1.4);
    ctx.fillStyle = '#140e0a';
    ctx.beginPath();
    ctx.moveTo(9, 0);
    ctx.lineTo(-6, -6);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff4d0';
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-4, -4);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    const mi = 512;
    const barMiles = upp > 200 ? 100 : upp > 40 ? 20 : upp > 12 ? 5 : 1;
    const bw = (barMiles * mi) / upp;
    ctx.fillStyle = 'rgba(20,12,8,0.85)';
    ctx.fillRect(W - bw - 30 * this.dpr, H - 34 * this.dpr, bw + 20 * this.dpr, 26 * this.dpr);
    ctx.fillStyle = '#fff4d0';
    ctx.fillRect(W - bw - 20 * this.dpr, H - 16 * this.dpr, bw, 3 * this.dpr);
    ctx.textAlign = 'right';
    ctx.fillText(`${barMiles} mi`, W - 20 * this.dpr, H - 20 * this.dpr);
    ctx.textAlign = 'center';
    let tipText = '';
    let bd = 14 * this.dpr;
    for (const hv of hovers) {
      const d = Math.hypot(hv.x - this.hoverX, hv.y - this.hoverY);
      if (d < bd) {
        bd = d;
        tipText = hv.text;
      }
    }
    if (this.hoverX >= 0) {
      const wx = this.cx + (this.hoverX - W / 2) * upp;
      const wy = this.cy + (this.hoverY - H / 2) * upp;
      if (!tipText && wx > 0 && wy > 0 && wx < WORLD_SIZE && wy < WORLD_SIZE) {
        const cell = Math.floor(wy / 1024) * 500 + Math.floor(wx / 1024);
        if (disc[cell]) tipText = `${BIOME_NAMES[biomeAt(wx, wy)]} · Danger ${levelAt(wx, wy)} · ${g.coords(wx, wy)}`;
        else tipText = 'Uncharted waters';
      }
    }
    if (tipText) {
      this.tip.classList.remove('hidden');
      this.tip.textContent = tipText;
      this.tip.style.left = `${this.hoverX / this.dpr + 16}px`;
      this.tip.style.top = `${this.hoverY / this.dpr + 12}px`;
    } else this.tip.classList.add('hidden');
  }
}
