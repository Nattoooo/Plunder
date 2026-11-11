import { hash2 } from '../core/rng';
import { clamp, angleDiff } from '../core/math';
import { COMPONENTS } from '../data/components';
import { ROLE } from '../data/crew';
import { STRUCT } from '../data/structures';
import { CHUNK, CHUNKS, islandsInRect, Island, portLayout, I_VOLCANO, WORLD_SIZE, getIsland } from '../world/worldgen';
import { T_DEEP, T_OCEAN, T_SHALLOW, EDGE_MARGIN } from '../world/terrain';
import { CELL } from '../game/design';
import type { Game } from '../game/game';
import type { Ship } from '../game/ship';
import { poisNear, POI } from '../game/pois';
import { shipSprite, pruneSprites, PAD } from './shipSprite';
import { sprites, structureSprite } from './sprites';
import { drawText, textWidth } from './font';

const tmpIsl: Island[] = [];
const tmpPOI: POI[] = [];

const FACTION_COL: Record<string, number> = { pirate: 0xff6a5a, navy: 0x8ac8ff, merchant: 0xa8e890, ghost: 0x80ffc0, hunter: 0xffa040, player: 0xffe080 };
const FLAG_COL: Record<string, string> = { pirate: '#141414', navy: '#2a4a9a', merchant: '#3a8a4a', ghost: '#3a6a5a', hunter: '#8a2a1a', player: '#141414' };

interface Comp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  light: HTMLCanvasElement;
  lctx: CanvasRenderingContext2D;
  w = 480;
  h = 270;
  scale = 4;
  baseScale = 4;
  dpr = 1;
  private comps = new Map<number, Comp>();
  private crewSprites = new Map<number, HTMLCanvasElement>();
  private structSprites = new Map<string, HTMLCanvasElement>();
  private frame = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.light = document.createElement('canvas');
    this.lctx = this.light.getContext('2d')!;
    this.resize(0);
  }

  resize(zoom: number): void {
    this.dpr = window.devicePixelRatio || 1;
    const pw = Math.round(window.innerWidth * this.dpr);
    const ph = Math.round(window.innerHeight * this.dpr);
    this.baseScale = Math.max(2, Math.round(ph / 290));
    const sc = clamp(this.baseScale + zoom, 1, this.baseScale + 3);
    this.scale = sc;
    const w = Math.ceil(pw / sc);
    const h = Math.ceil(ph / sc);
    if (w !== this.w || h !== this.h || this.canvas.width !== w) {
      this.w = w;
      this.h = h;
      this.canvas.width = w;
      this.canvas.height = h;
      this.light.width = Math.ceil(w / 2);
      this.light.height = Math.ceil(h / 2);
    }
    this.canvas.style.width = `${(w * sc) / this.dpr}px`;
    this.canvas.style.height = `${(h * sc) / this.dpr}px`;
    this.ctx.imageSmoothingEnabled = false;
  }

  minZoom(spyglass: boolean): number {
    return Math.max(1 - this.baseScale, spyglass ? -3 : -2);
  }

  prepare(g: Game, mx: number, my: number): void {
    let sx = 0;
    let sy = 0;
    if (g.cam.shake > 0 && g.profile.settings.screenShake) {
      sx = (Math.random() - 0.5) * g.cam.shake;
      sy = (Math.random() - 0.5) * g.cam.shake;
    }
    g.view.x = Math.round(g.cam.x - this.w / 2 + sx);
    g.view.y = Math.round(g.cam.y - this.h / 2 + sy);
    g.view.w = this.w;
    g.view.h = this.h;
    g.view.scale = this.scale;
    const k = this.dpr / this.scale;
    g.mouseWX = g.view.x + mx * k;
    g.mouseWY = g.view.y + my * k;
    const m = 200;
    g.chunks.update(g.view.x - m, g.view.y - m, g.view.x + this.w + m, g.view.y + this.h + m, g.cam.x, g.cam.y);
  }

  draw(g: Game): void {
    this.frame++;
    const ctx = this.ctx;
    const v = g.view;
    const ox = v.x;
    const oy = v.y;
    const W = this.w;
    const H = this.h;
    const t = g.env.time;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#1b4776';
    ctx.fillRect(0, 0, W, H);
    const cx0 = Math.floor(ox / CHUNK);
    const cy0 = Math.floor(oy / CHUNK);
    const cx1 = Math.floor((ox + W) / CHUNK);
    const cy1 = Math.floor((oy + H) / CHUNK);
    for (let cx = cx0; cx <= cx1; cx++) {
      for (let cy = cy0; cy <= cy1; cy++) {
        if (cx < 0 || cy < 0 || cx >= CHUNKS || cy >= CHUNKS) {
          ctx.fillStyle = '#14161e';
          ctx.fillRect(cx * CHUNK - ox, cy * CHUNK - oy, CHUNK, CHUNK);
          continue;
        }
        const ch = g.chunks.get(cx, cy);
        if (ch && ch.img) ctx.drawImage(ch.img, cx * CHUNK - ox, cy * CHUNK - oy);
      }
    }
    this.drawGlints(g, ox, oy, t);
    const S = sprites();
    poisNear(g.cam.x, g.cam.y, Math.max(W, H) * 0.8 + 60, tmpPOI);
    for (const p of tmpPOI) {
      if (p.kind === 'claim') continue;
      if (!g.poiAvailable(p)) continue;
      const sx = Math.round(p.x - ox);
      const sy = Math.round(p.y - oy);
      if (sx < -30 || sy < -30 || sx > W + 30 || sy > H + 30) continue;
      if (p.kind === 'flotsam') {
        const bob = Math.round(Math.sin(t * 2 + p.id) * 0.8);
        const spr = p.id % 2 ? S.crate : S.barrel;
        ctx.drawImage(spr, sx - 3, sy - 3 + bob);
        if ((this.frame >> 4) % 3 === 0) ctx.drawImage(S.glint[0], sx - 4, sy + 3);
      } else if (p.kind === 'bottle') {
        const bob = Math.round(Math.sin(t * 2.4 + p.id) * 1);
        ctx.drawImage(S.bottle, sx - 1, sy - 3 + bob);
      } else if (p.kind === 'wreck') ctx.drawImage(S.wreck, sx - 10, sy - 8);
    }
    for (const q of g.profile.quests) {
      if (q.kind !== 'salvage' || q.done) continue;
      const sx = Math.round(q.x - ox);
      const sy = Math.round(q.y - oy);
      if (sx > -30 && sy > -30 && sx < W + 30 && sy < H + 30) ctx.drawImage(S.questWreck, sx - 10, sy - 8);
    }
    if (g.profile.lost) {
      const sx = Math.round(g.profile.lost.x - ox);
      const sy = Math.round(g.profile.lost.y - oy);
      if (sx > -20 && sy > -20 && sx < W + 20 && sy < H + 20) ctx.drawImage(S.lostCargo, sx - 4, sy - 4);
    }
    g.particles.draw(ctx, ox, oy, W, H, 0);
    for (const l of g.loot) {
      const sx = Math.round(l.x - ox);
      const sy = Math.round(l.y - oy + Math.sin(l.bob * 2) * 0.8);
      if (sx < -10 || sy < -10 || sx > W + 10 || sy > H + 10) continue;
      const spr = l.kind === 2 ? S.goldchest : l.kind === 1 ? S.barrel : S.crate;
      if (l.life < 20 && (this.frame >> 3) % 2 === 0) continue;
      ctx.drawImage(spr, sx - (spr.width >> 1), sy - (spr.height >> 1));
    }
    this.drawLandObjects(g, ox, oy, tmpPOI);
    for (const s of g.ships) if (this.onScreen(s, ox, oy)) this.drawShipShadow(s, ox, oy);
    for (const s of g.ships) if (this.onScreen(s, ox, oy)) this.drawShip(g, s, ox, oy, t);
    for (const m of g.mobs) this.drawMob(m.kind, m.x - ox, m.y - oy, m.anim, m.hurt > 0, m.hp / m.maxHp);
    if (g.avatar) this.drawAvatar(g, g.avatar.x - ox, g.avatar.y - oy);
    for (const p of g.projectiles) {
      const sx = p.x - ox;
      const sy = p.y - oy;
      if (sx < -10 || sy < -40 || sx > W + 10 || sy > H + 10) continue;
      ctx.fillStyle = 'rgba(6,20,36,0.45)';
      ctx.fillRect(Math.round(sx), Math.round(sy), p.size, p.size);
      ctx.fillStyle = p.ammo === 'heated' ? '#ff7a2a' : p.foot ? '#d0d0d8' : p.ammo === 'chain' ? '#6a6a72' : '#202024';
      const s2 = p.lob ? 3 : p.size;
      ctx.fillRect(Math.round(sx - s2 / 2), Math.round(sy - p.z - s2 / 2), s2, s2);
      if (p.ammo === 'heated' || p.lob) {
        ctx.fillStyle = p.lob ? '#ffd040' : '#ffd060';
        ctx.fillRect(Math.round(sx), Math.round(sy - p.z - 1), 1, 1);
      }
    }
    g.particles.draw(ctx, ox, oy, W, H, 1);
    this.drawLighting(g, ox, oy);
    this.drawOverlays(g, ox, oy, t);
    this.drawWorldUI(g, ox, oy, t);
    if (this.frame % 300 === 0) pruneSprites(new Set(g.ships.map((s) => s.id)));
    if (this.frame % 300 === 0) for (const k of this.comps.keys()) if (!g.ships.some((s) => s.id === k)) this.comps.delete(k);
  }

  private onScreen(s: Ship, ox: number, oy: number): boolean {
    const r = s.radius + 20;
    return s.x - ox > -r && s.y - oy > -r && s.x - ox < this.w + r && s.y - oy < this.h + r;
  }

  private drawGlints(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const S = sprites();
    const G = 20;
    const drift = t * 3;
    const gx0 = Math.floor(ox / G);
    const gy0 = Math.floor(oy / G);
    const gx1 = Math.floor((ox + this.w) / G);
    const gy1 = Math.floor((oy + this.h) / G);
    const quality = g.particles.quality;
    for (let gx = gx0; gx <= gx1; gx++) {
      for (let gy = gy0; gy <= gy1; gy++) {
        const h = hash2(gx, gy, 77);
        if ((h & 3) !== 0) continue;
        if (quality < 0.6 && (h & 4)) continue;
        const ph = ((h >>> 3) & 255) / 255;
        const f = (t / 3.2 + ph) % 1;
        if (f > 0.4) continue;
        const wx = gx * G + ((h >>> 11) & 15) + Math.cos(g.env.windAngle) * drift * 0.2;
        const wy = gy * G + ((h >>> 15) & 15) + Math.sin(g.env.windAngle) * drift * 0.2;
        const cx = Math.floor(wx / CHUNK);
        const cy = Math.floor(wy / CHUNK);
        const ch = g.chunks.get(cx, cy);
        if (!ch) continue;
        const tt = ch.types[Math.floor(wy - cy * CHUNK) * CHUNK + Math.floor(wx - cx * CHUNK)];
        if (tt !== T_DEEP && tt !== T_OCEAN && tt !== T_SHALLOW) continue;
        const fr = Math.min(3, Math.floor((f / 0.4) * 4));
        const spr = S.glint[fr === 3 ? 0 : fr];
        ctx.globalAlpha = tt === T_SHALLOW ? 0.45 : 0.7;
        ctx.drawImage(spr, Math.round(wx - ox), Math.round(wy - oy));
      }
    }
    ctx.globalAlpha = 1;
  }

  private drawLandObjects(g: Game, ox: number, oy: number, pois: POI[]): void {
    const ctx = this.ctx;
    const S = sprites();
    const t = g.env.time;
    for (const p of pois) {
      const sx = Math.round(p.x - ox);
      const sy = Math.round(p.y - oy);
      if (sx < -30 || sy < -30 || sx > this.w + 30 || sy > this.h + 30) continue;
      if (p.kind === 'claim') {
        const own = g.profile.ownedIsland(p.island);
        ctx.drawImage(own ? S.claimOwned : S.claim, sx - 3, sy - 8);
        if (own) this.drawStructures(g, own.structures, p.x, p.y, ox, oy);
        continue;
      }
      if (!g.poiAvailable(p)) continue;
      if (p.kind === 'chest') ctx.drawImage(p.locked ? S.lockedChest : S.chest, sx - 4, sy - 4);
      else if (p.kind === 'dig') {
        if (((t * 2 + p.id) | 0) % 3 === 0) ctx.drawImage(S.sparkle, sx - 1, sy - 1);
        ctx.fillStyle = '#c8b07a';
        ctx.fillRect(sx - 2, sy, 1, 1);
        ctx.fillRect(sx + 1, sy + 1, 1, 1);
        ctx.fillRect(sx, sy - 1, 1, 1);
      } else if (p.kind === 'shrine') {
        ctx.drawImage(S.shrine, sx - 5, sy - 6);
        if (((t * 3) | 0) % 2) ctx.drawImage(S.sparkle, sx - 1, sy - 9);
      }
    }
    for (const it of g.profile.inv.items) {
      if (it.id !== 'treasure_map' || !it.data) continue;
      const sx = Math.round(it.data.x - ox);
      const sy = Math.round(it.data.y - oy);
      if (sx > -10 && sy > -10 && sx < this.w + 10 && sy < this.h + 10) ctx.drawImage(S.xmark, sx - 3, sy - 3);
    }
    if (g.profile.waypoint) {
      const sx = Math.round(g.profile.waypoint.x - ox);
      const sy = Math.round(g.profile.waypoint.y - oy);
      if (sx > -10 && sy > -10 && sx < this.w + 10 && sy < this.h + 10) ctx.drawImage(S.waypoint, sx - 2, sy - 7);
    }
  }

  private drawStructures(g: Game, list: string[], x: number, y: number, ox: number, oy: number): void {
    const ctx = this.ctx;
    const offs = [[-22, -12], [16, -14], [-26, 10], [20, 12], [-6, -26], [0, 22], [-40, 0], [36, -2]];
    list.forEach((st, i) => {
      const def = STRUCT[st];
      if (!def) return;
      let spr = this.structSprites.get(st);
      if (!spr) {
        spr = structureSprite(def.color, def.roof, st);
        this.structSprites.set(st, spr);
      }
      const o = offs[i % offs.length];
      const sx = Math.round(x + o[0] - ox - spr.width / 2);
      const sy = Math.round(y + o[1] - oy - spr.height / 2);
      ctx.drawImage(spr, sx, sy);
    });
  }

  private drawShipShadow(s: Ship, ox: number, oy: number): void {
    const sp = shipSprite(s);
    const phi = s.heading + Math.PI / 2;
    const k = s.sinking >= 0 ? Math.max(0.3, 1 - s.sinking * 0.12) : 1;
    const c = Math.cos(phi) * k;
    const sn = Math.sin(phi) * k;
    const ctx = this.ctx;
    ctx.setTransform(c, sn, -sn, c, Math.round(s.x - ox + 2), Math.round(s.y - oy + 2));
    ctx.globalAlpha = s.sinking >= 0 ? Math.max(0, 1 - s.sinking / 4) : 1;
    ctx.drawImage(sp.shadow, -sp.ox, -sp.oy);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
  }

  private crewSprite(shirt: number, captain = false): HTMLCanvasElement {
    const key = captain ? -1 : shirt;
    let c = this.crewSprites.get(key);
    if (c) return c;
    c = document.createElement('canvas');
    c.width = 3;
    c.height = 3;
    const x = c.getContext('2d')!;
    const hex = '#' + shirt.toString(16).padStart(6, '0');
    x.fillStyle = hex;
    x.fillRect(0, 1, 3, 1);
    x.fillRect(1, 2, 1, 1);
    x.fillStyle = captain ? '#141414' : '#4a2e1a';
    x.fillRect(1, 0, 1, 2);
    if (captain) {
      x.fillStyle = '#141414';
      x.fillRect(0, 0, 3, 1);
    }
    this.crewSprites.set(key, c);
    return c;
  }

  private comp(s: Ship, w: number, h: number): Comp {
    let c = this.comps.get(s.id);
    if (!c || c.canvas.width !== w || c.canvas.height !== h) {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      c = { canvas, ctx: canvas.getContext('2d')! };
      c.ctx.imageSmoothingEnabled = false;
      this.comps.set(s.id, c);
    }
    return c;
  }

  private drawShip(g: Game, s: Ship, ox: number, oy: number, t: number): void {
    const sp = shipSprite(s);
    const cw = sp.canvas.width;
    const chh = sp.canvas.height;
    const comp = this.comp(s, cw, chh);
    const c = comp.ctx;
    c.clearRect(0, 0, cw, chh);
    c.drawImage(sp.canvas, 0, 0);
    const px0 = PAD + s.pivotX;
    const py0 = PAD + s.pivotY;
    const d = s.design;
    const showCrew = this.scale >= 2;
    if (showCrew) {
      for (const cm of s.crew) c.drawImage(this.crewSprite(ROLE[cm.role]?.shirt ?? 0xd8d0c0), Math.round(px0 + cm.lx - 1), Math.round(py0 + cm.ly - 1));
      if (s.isPlayer) {
        let hx = 0, hy = s.halfLen - 6;
        for (const i of s.cells) if (d.part[i] === 11) {
          const [lx, ly] = s.cellLocal(i);
          hx = lx;
          hy = ly + 2;
        }
        if (!s.cells.some((i) => d.part[i] === 11)) {
          let maxY = -999;
          for (const i of s.cells) {
            const [lx, ly] = s.cellLocal(i);
            if (ly > maxY && !d.part[i]) {
              maxY = ly;
              hx = lx;
              hy = ly;
            }
          }
        }
        if (g.mode !== 'foot') c.drawImage(this.crewSprite(0xb82a2a, true), Math.round(px0 + hx - 1), Math.round(py0 + hy - 1));
      }
    }
    const relWind = angleDiff(s.heading, g.env.windAngle);
    let trim = clamp(relWind * 0.45, -0.55, 0.55) + s.turnInput * 0.22;
    trim = clamp(trim, -0.65, 0.65);
    const slope = Math.tan(trim);
    const sailCol = s.design.sailColor;
    for (const i of s.cells) {
      const p = d.part[i];
      if (!p) continue;
      const comp = COMPONENTS[p];
      const [lx, ly] = s.cellLocal(i);
      const mx = Math.round(px0 + lx);
      const my = Math.round(py0 + ly);
      if (comp.oar && s.partHp[i] > 0) {
        const rowing = s.rowing && s.stationEff[i] > 0;
        const ph = rowing ? Math.sin(t * 6 + i) : 0;
        const ext = 5;
        const sh = Math.round(ph * 1.5);
        c.fillStyle = '#5a3a1e';
        const lc = Math.round(px0 + lx - CELL / 2);
        const rc = Math.round(px0 + lx + CELL / 2);
        for (let k = 1; k <= ext; k++) {
          c.fillRect(lc - k, my + Math.round((sh * k) / ext), 1, 1);
          c.fillRect(rc + k - 1, my + Math.round((sh * k) / ext), 1, 1);
        }
      }
      if (comp.sail && s.partHp[i] > 0) this.drawSail(c, comp.sail.style, comp.sail.span, mx, my, s.sail, slope, sailCol, s.partHp[i] / comp.hp, i, s.faction === 'ghost');
      if (comp.key === 'crows_nest') {
        c.fillStyle = '#3a2414';
        c.fillRect(mx - 2, my - 3, 5, 1);
        c.fillRect(mx - 2, my + 1, 5, 1);
        c.fillRect(mx - 3, my - 2, 1, 3);
        c.fillRect(mx + 3, my - 2, 1, 3);
        c.fillStyle = '#7a5232';
        c.fillRect(mx - 2, my - 2, 5, 3);
        c.fillStyle = '#3a2414';
        c.fillRect(mx, my - 1, 1, 1);
      }
      if (s.fire[i] > 0) {
        const fl = (t * 12 + i) | 0;
        c.fillStyle = fl % 2 ? '#ffc040' : '#ff6a20';
        c.fillRect(mx - 2 + (fl % 3), my - 1, 2, 2);
        c.fillStyle = '#fff4a0';
        c.fillRect(mx - 1 + ((fl >> 1) % 3), my - 2, 1, 1);
      }
    }
    let flagCell = -1;
    for (const i of s.cells) if (COMPONENTS[d.part[i]]?.sail && s.partHp[i] > 0) {
      flagCell = i;
      break;
    }
    if (flagCell >= 0) {
      const [lx, ly] = s.cellLocal(flagCell);
      const fx = Math.round(px0 + lx);
      const fy = Math.round(py0 + ly);
      const wave = (t * 8) | 0;
      const dir = relWind > 0 ? -1 : 1;
      c.fillStyle = FLAG_COL[s.faction] ?? '#141414';
      for (let k = 1; k <= 3; k++) c.fillRect(fx + dir * k, fy + 2 + ((wave + k) % 2), 1, 2);
      if (s.surrendered) {
        c.fillStyle = '#ffffff';
        for (let k = 1; k <= 3; k++) c.fillRect(fx + dir * k, fy + 2 + ((wave + k) % 2), 1, 2);
      }
    }
    const phi = s.heading + Math.PI / 2;
    let k = 1;
    let alpha = 1;
    if (s.sinking >= 0) {
      k = Math.max(0.3, 1 - s.sinking * 0.12);
      alpha = Math.max(0, 1 - s.sinking / 4.5);
    }
    const ctx = this.ctx;
    const cs = Math.cos(phi) * k;
    const sn = Math.sin(phi) * k;
    ctx.setTransform(cs, sn, -sn, cs, Math.round(s.x - ox), Math.round(s.y - oy));
    ctx.globalAlpha = alpha * (s.faction === 'ghost' ? 0.82 : 1);
    ctx.drawImage(comp.canvas, -sp.ox, -sp.oy);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    if (s.faction === 'ghost' && Math.random() < 0.3) g.particles.ghost(s.x + (Math.random() - 0.5) * s.halfWid * 2, s.y + (Math.random() - 0.5) * s.halfLen * 2);
  }

  private drawSail(c: CanvasRenderingContext2D, style: string, span: number, mx: number, my: number, deploy: number, slope: number, col: number, hpF: number, seed: number, ghost: boolean): void {
    const half = Math.round((span * CELL) / 2);
    const depth = Math.round(1 + deploy * (style === 'main' ? 5 : 4));
    const base = '#' + col.toString(16).padStart(6, '0');
    const dark = '#' + shade(col, 0.78).toString(16).padStart(6, '0');
    const light = '#' + shade(col, 1.08).toString(16).padStart(6, '0');
    if (style === 'lateen') {
      const len = Math.round(span * CELL * 0.9);
      const side = slope >= 0 ? 1 : -1;
      const widthMax = Math.round(1 + deploy * 5);
      for (let r = 0; r < len; r++) {
        const y = my - 2 - r + Math.round(len * 0.25);
        const f = r / len;
        const wdt = Math.round(widthMax * (1 - Math.abs(f - 0.35) / 0.65));
        const xOff = Math.round(side * f * 2);
        c.fillStyle = '#5a3a1e';
        c.fillRect(mx + xOff, y, 1, 1);
        if (deploy < 0.05 || wdt <= 0) continue;
        c.fillStyle = r % 4 === 0 ? dark : base;
        if (side > 0) c.fillRect(mx + xOff + 1, y, wdt, 1);
        else c.fillRect(mx + xOff - wdt, y, wdt, 1);
      }
      return;
    }
    const tiers = style === 'main' ? 2 : 1;
    for (let tier = 0; tier < tiers; tier++) {
      const hw = tier === 0 ? half : Math.round(half * 0.7);
      const dp = tier === 0 ? depth : Math.max(1, depth - 2);
      const yoff = tier === 0 ? 0 : -dp - 2;
      for (let x = -hw; x <= hw; x++) {
        const dy = Math.round(x * slope);
        const yy = my + dy + yoff;
        c.fillStyle = '#4a2e18';
        c.fillRect(mx + x, yy, 1, 1);
        if (deploy < 0.05) {
          if (Math.abs(x) < hw) {
            c.fillStyle = light;
            c.fillRect(mx + x, yy - 1, 1, 1);
          }
          continue;
        }
        const edge = Math.abs(x) >= hw - 1;
        const belly = edge ? dp - 1 : dp;
        for (let k = 1; k <= belly; k++) {
          let fc = base;
          if (k === belly) fc = dark;
          else if (k === 1) fc = light;
          if (style === 'patch' && ((x + k + seed) % 5 === 0)) fc = '#a8946a';
          if (ghost && ((x * 3 + k * 7 + seed) % 4 === 0)) continue;
          if (hpF < 0.5 && ((x * 7 + k * 13 + seed) % 6 === 0)) continue;
          c.fillStyle = fc;
          c.fillRect(mx + x, yy - k, 1, 1);
        }
      }
    }
  }

  private drawAvatar(g: Game, x: number, y: number): void {
    const a = g.avatar!;
    const ctx = this.ctx;
    const sx = Math.round(x);
    const sy = Math.round(y);
    const step = a.moving ? Math.floor(a.walk) % 2 : 0;
    const hurt = a.hurt > 0 && ((this.frame >> 2) & 1);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(sx - 3, sy, 6, 2);
    const coat = hurt ? '#ffffff' : '#a82a2a';
    const f = a.facing;
    ctx.fillStyle = '#2a1e14';
    ctx.fillRect(sx - 2 + (step ? 1 : 0), sy - 2, 1, 2);
    ctx.fillRect(sx + 1 - (step ? 1 : 0), sy - 2, 1, 2);
    ctx.fillStyle = '#3a3048';
    ctx.fillRect(sx - 2, sy - 4, 4, 2);
    ctx.fillStyle = coat;
    ctx.fillRect(sx - 2, sy - 8, 4, 4);
    ctx.fillStyle = '#e8c040';
    if (f !== 0) ctx.fillRect(sx - (f === 3 ? 1 : 0), sy - 7, 1, 2);
    ctx.fillStyle = '#e0b088';
    ctx.fillRect(sx - 3, sy - 7 + (step ? 1 : 0), 1, 2);
    ctx.fillRect(sx + 2, sy - 7 + (step ? 0 : 1), 1, 2);
    ctx.fillRect(sx - 1, sy - 10, 3, 2);
    if (f === 2) {
      ctx.fillStyle = '#141014';
      ctx.fillRect(sx - 1, sy - 9, 1, 1);
      ctx.fillRect(sx + 1, sy - 9, 1, 1);
    }
    ctx.fillStyle = '#18141c';
    ctx.fillRect(sx - 2, sy - 11, 5, 1);
    ctx.fillRect(sx - 1, sy - 12, 3, 1);
    if (a.swing > 0) {
      const ang = a.dir;
      const p = g.profile.weapon;
      const ranged = p === 'flintlock' || p === 'musket' || p === 'blunderbuss';
      ctx.fillStyle = ranged ? '#ffd060' : '#e0e6f0';
      const r0 = ranged ? 6 : 4;
      const r1 = ranged ? 8 : 10;
      for (let r = r0; r <= r1; r++) {
        const sw = ranged ? 0 : (a.swing / 0.25 - 0.5) * 1.6;
        ctx.fillRect(Math.round(sx + Math.cos(ang + sw) * r), Math.round(sy - 5 + Math.sin(ang + sw) * r), 1, 1);
      }
    }
    if (a.dig > 0) {
      ctx.fillStyle = '#9aa0aa';
      const k = Math.floor(a.dig * 4) % 2;
      ctx.fillRect(sx + 3, sy - 6 + k * 2, 1, 4);
      ctx.fillStyle = '#c8b07a';
      ctx.fillRect(sx + 2, sy - 2 + k, 3, 1);
      this.bar(sx - 6, sy - 16, 12, a.dig / 2.2, '#ffd040');
    }
    if (a.hp < a.maxHp) this.bar(sx - 6, sy - 15 - (a.dig > 0 ? 3 : 0), 12, a.hp / a.maxHp, '#ff5a4a');
  }

  private drawMob(kind: string, x: number, y: number, anim: number, hurt: boolean, hpF: number): void {
    const ctx = this.ctx;
    const sx = Math.round(x);
    const sy = Math.round(y);
    if (sx < -10 || sy < -14 || sx > this.w + 10 || sy > this.h + 10) return;
    const step = Math.floor(anim * 6) % 2;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(sx - 3, sy, 6, 1);
    if (kind === 'crab') {
      ctx.fillStyle = hurt ? '#ffffff' : '#d84a2a';
      ctx.fillRect(sx - 2, sy - 3, 5, 3);
      ctx.fillRect(sx - 4 + step, sy - 4, 1, 2);
      ctx.fillRect(sx + 4 - step, sy - 4, 1, 2);
      ctx.fillStyle = '#141014';
      ctx.fillRect(sx - 1, sy - 3, 1, 1);
      ctx.fillRect(sx + 1, sy - 3, 1, 1);
      ctx.fillStyle = '#a83a1a';
      ctx.fillRect(sx - 3, sy - 1 + step, 1, 1);
      ctx.fillRect(sx + 3, sy - step, 1, 1);
    } else if (kind === 'skeleton') {
      ctx.fillStyle = hurt ? '#ff6a5a' : '#e8e2cc';
      ctx.fillRect(sx - 1, sy - 11, 3, 3);
      ctx.fillRect(sx, sy - 8, 1, 4);
      ctx.fillRect(sx - 2, sy - 7, 5, 1);
      ctx.fillRect(sx - 1, sy - 5, 3, 1);
      ctx.fillRect(sx - 1 + step, sy - 4, 1, 4);
      ctx.fillRect(sx + 1 - step, sy - 4, 1, 4);
      ctx.fillStyle = '#141014';
      ctx.fillRect(sx - 1, sy - 10, 1, 1);
      ctx.fillRect(sx + 1, sy - 10, 1, 1);
      ctx.fillStyle = '#9aa0aa';
      ctx.fillRect(sx + 3, sy - 9 + step, 1, 5);
    } else {
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = hurt ? '#ffffff' : '#80f0b0';
      ctx.fillRect(sx - 2, sy - 12 + step, 5, 4);
      ctx.fillRect(sx - 3, sy - 8 + step, 7, 4);
      ctx.fillRect(sx - 2, sy - 4 + step, 5, 2);
      ctx.fillRect(sx - 1 + step, sy - 2 + step, 1, 1);
      ctx.fillStyle = '#103020';
      ctx.fillRect(sx - 1, sy - 10 + step, 1, 1);
      ctx.fillRect(sx + 1, sy - 10 + step, 1, 1);
      ctx.globalAlpha = 1;
    }
    if (hpF < 1) this.bar(sx - 5, sy - 15, 10, hpF, '#ff5a4a');
  }

  private bar(x: number, y: number, w: number, f: number, col: string): void {
    const ctx = this.ctx;
    ctx.fillStyle = '#140e0a';
    ctx.fillRect(x - 1, y - 1, w + 2, 4);
    ctx.fillStyle = '#3a2e24';
    ctx.fillRect(x, y, w, 2);
    ctx.fillStyle = col;
    ctx.fillRect(x, y, Math.max(0, Math.round(w * clamp(f, 0, 1))), 2);
  }

  private drawLighting(g: Game, ox: number, oy: number): void {
    const env = g.env;
    let dark = env.dark;
    if (g.profile.inv.passive('nightVision') > 0) dark *= 0.55;
    if (dark < 0.02) return;
    const L = this.lctx;
    const lw = this.light.width;
    const lh = this.light.height;
    L.globalCompositeOperation = 'source-over';
    L.clearRect(0, 0, lw, lh);
    L.fillStyle = `rgba(6,10,32,${dark.toFixed(3)})`;
    L.fillRect(0, 0, lw, lh);
    L.globalCompositeOperation = 'destination-out';
    const S = sprites();
    const light = (x: number, y: number, r: number, a = 1) => {
      const sx = (x - ox) / 2;
      const sy = (y - oy) / 2;
      const rr = r / 2;
      if (sx < -rr || sy < -rr || sx > lw + rr || sy > lh + rr) return;
      L.globalAlpha = a;
      L.drawImage(S.light, sx - rr, sy - rr, rr * 2, rr * 2);
    };
    for (const s of g.ships) {
      if (s.sinking >= 0) continue;
      light(s.x, s.y, s.isPlayer ? 120 + s.radius : 50 + s.radius, s.isPlayer ? 1 : 0.8);
      for (const i of s.cells) if (s.fire[i] > 0) {
        const [lx, ly] = s.cellLocal(i);
        const phi = s.heading + Math.PI / 2;
        light(s.x + lx * Math.cos(phi) - ly * Math.sin(phi), s.y + lx * Math.sin(phi) + ly * Math.cos(phi), 40 + Math.random() * 8, 0.9);
      }
    }
    if (g.avatar) light(g.avatar.x, g.avatar.y - 4, 110, 1);
    const cx0 = Math.floor(ox / CHUNK);
    const cy0 = Math.floor(oy / CHUNK);
    for (let cx = cx0; cx <= cx0 + Math.ceil(this.w / CHUNK) + 1; cx++) for (let cy = cy0; cy <= cy0 + Math.ceil(this.h / CHUNK) + 1; cy++) {
      const ch = g.chunks.get(cx, cy);
      if (!ch) continue;
      for (let k = 0; k < ch.lights.length; k += 2) light(ch.lights[k], ch.lights[k + 1], 34, 0.85);
    }
    for (const p of g.projectiles) if (p.ammo === 'heated' || p.lob) light(p.x, p.y - p.z, 18, 0.7);
    for (const f of g.forts) light(f.x, f.y, 60, 0.6);
    islandsInRect(ox, oy, ox + this.w, oy + this.h, tmpIsl);
    for (const isl of tmpIsl) if (isl.type === I_VOLCANO) light(isl.x, isl.y, isl.r * 0.5, 0.7);
    const n = g.particles.n;
    const P = g.particles;
    for (let i = 0; i < n; i += 3) if (P.type[i] === 3) light(P.x[i], P.y[i], 16, 0.5);
    L.globalAlpha = 1;
    L.globalCompositeOperation = 'source-over';
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.light, 0, 0, lw * 2, lh * 2);
    ctx.imageSmoothingEnabled = false;
  }

  private drawOverlays(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const env = g.env;
    const W = this.w;
    const H = this.h;
    const p = env.phase;
    const dusk = Math.max(0, 1 - Math.abs(p - 0.8) / 0.05) + Math.max(0, 1 - Math.abs(p - 0.2) / 0.05);
    if (dusk > 0) {
      ctx.fillStyle = `rgba(255,120,60,${(dusk * 0.1).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (env.fog > 0.05 && g.profile.inv.passive('nightVision') <= 0) {
      const S = sprites();
      ctx.globalAlpha = Math.min(0.7, env.fog);
      const sc = 3;
      const tw = 256 * sc;
      const shiftX = ((t * 6 + ox * 0.6) % tw + tw) % tw;
      const shiftY = ((t * 2 + oy * 0.6) % tw + tw) % tw;
      ctx.imageSmoothingEnabled = true;
      for (let x = -shiftX; x < W; x += tw) for (let y = -shiftY; y < H; y += tw) ctx.drawImage(S.fog, x, y, tw, tw);
      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = 1;
    }
    if (env.storm > 0.05) {
      ctx.fillStyle = `rgba(16,22,36,${(env.storm * 0.32).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (env.lightning > 0) {
      ctx.fillStyle = `rgba(230,240,255,${(env.lightning * 0.55).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    const f = g.avatar ?? g.player;
    const edgeD = Math.min(f.x, f.y, WORLD_SIZE - f.x, WORLD_SIZE - f.y) - EDGE_MARGIN;
    if (edgeD < 3000) {
      ctx.fillStyle = `rgba(10,10,16,${clamp(1 - edgeD / 3000, 0, 0.7).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (g.hitFlash > 0) {
      ctx.fillStyle = `rgba(200,30,20,${(g.hitFlash * 0.18).toFixed(3)})`;
      ctx.fillRect(0, 0, W, 3);
      ctx.fillRect(0, H - 3, W, 3);
      ctx.fillRect(0, 0, 3, H);
      ctx.fillRect(W - 3, 0, 3, H);
    }
  }

  private drawWorldUI(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const W = this.w;
    const H = this.h;
    islandsInRect(ox - 200, oy - 200, ox + W + 200, oy + H + 200, tmpIsl);
    for (const isl of tmpIsl) {
      if (!isl.port) continue;
      const L = portLayout(isl);
      if (!L) continue;
      const sx = L.dockX1 - ox;
      const sy = L.dockY1 - oy - 14;
      if (sx < -60 || sy < -10 || sx > W + 60 || sy > H + 10) continue;
      const col = isl.port.faction === 0 ? 0x9ad0ff : isl.port.faction === 2 ? 0xff8a7a : 0xb8f0a0;
      drawText(ctx, isl.port.name, sx, sy, col, true);
    }
    for (const s of g.ships) {
      if (s.isPlayer || s.sinking >= 0) continue;
      const sx = s.x - ox;
      const sy = s.y - oy - s.radius - 8;
      if (sx < -50 || sy < -20 || sx > W + 50 || sy > H + 20) continue;
      const hostile = g.aiHostileToPlayer(s);
      const integ = s.integrity();
      const recent = g.env.time - s.lastHitTime < 10;
      const near = Math.hypot(g.mouseWX - s.x, g.mouseWY - s.y) < s.radius + 10;
      if (hostile || recent || near || integ < 0.99) {
        const col = FACTION_COL[s.faction] ?? 0xffffff;
        const label = `${s.boss ? '! ' : ''}${s.name} L${s.level}`;
        if (near || recent || s.boss) drawText(ctx, label, sx, sy - 6, col, true);
        const bw = Math.max(16, Math.min(40, s.radius * 1.4));
        this.bar(Math.round(sx - bw / 2), Math.round(sy), Math.round(bw), (integ - 0.22) / 0.78, hostile ? '#ff5a4a' : '#7ad86a');
        if (s.surrendered) drawText(ctx, 'SURRENDERED', sx, sy - 12, 0xffffff, true);
      }
    }
    for (const tx of g.texts) {
      const a = Math.min(1, tx.life / tx.max * 2);
      ctx.globalAlpha = a;
      drawText(ctx, tx.text, tx.x - ox, tx.y - oy, tx.color, true);
    }
    ctx.globalAlpha = 1;
    if (g.mode === 'sail' && !g.uiOpen && !g.docked && g.player.guns.length) {
      const s = g.player;
      const mx = Math.round(g.mouseWX - ox);
      const my = Math.round(g.mouseWY - oy);
      let bears = false;
      let ready = false;
      for (const ci of s.guns) {
        if (s.partHp[ci] <= 0) continue;
        if (s.gunBears(ci, g.mouseWX, g.mouseWY)) {
          bears = true;
          if (s.gunReady(ci)) ready = true;
        }
      }
      const col = ready ? '#7aff6a' : bears ? '#ffb040' : '#9a9a9a';
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(mx - 4, my - 1, 3, 3);
      ctx.fillRect(mx + 2, my - 1, 3, 3);
      ctx.fillRect(mx - 1, my - 4, 3, 3);
      ctx.fillRect(mx - 1, my + 2, 3, 3);
      ctx.fillStyle = col;
      ctx.fillRect(mx - 3, my, 2, 1);
      ctx.fillRect(mx + 2, my, 2, 1);
      ctx.fillRect(mx, my - 3, 1, 2);
      ctx.fillRect(mx, my + 2, 1, 2);
      if (bears) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = col;
        const sx = s.x - ox;
        const sy = s.y - oy;
        const dx = mx - sx;
        const dy = my - sy;
        const d = Math.hypot(dx, dy);
        for (let k = 12; k < d - 6; k += 6) ctx.fillRect(Math.round(sx + (dx / d) * k), Math.round(sy + (dy / d) * k), 1, 1);
        ctx.globalAlpha = 1;
      }
    }
    const hasCompass = g.profile.inv.has('compass') || g.profile.inv.has('sextant');
    const arrows: { x: number; y: number; col: number; label: string }[] = [];
    if (g.profile.waypoint) arrows.push({ ...g.profile.waypoint, col: 0xff6a5a, label: 'WP' });
    if (hasCompass) {
      for (const q of g.profile.quests) {
        if (q.done) {
          const isl = getIsland(q.port);
          if (isl) arrows.push({ x: isl.x, y: isl.y, col: 0xffd040, label: '+' });
        } else arrows.push({ x: q.x, y: q.y, col: 0xffd040, label: '!' });
      }
      for (const it of g.profile.inv.items) if (it.id === 'treasure_map' && it.data) arrows.push({ x: it.data.x, y: it.data.y, col: 0xff4040, label: 'X' });
    }
    const f = g.avatar ?? g.player;
    for (const a of arrows) {
      if (!a.x && !a.y) continue;
      const sx = a.x - ox;
      const sy = a.y - oy;
      if (sx > 8 && sy > 8 && sx < W - 8 && sy < H - 8) continue;
      const ang = Math.atan2(a.y - f.y, a.x - f.x);
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) / 2 - 14;
      const ex = Math.round(cx + Math.cos(ang) * Math.min(W / 2 - 12, r * 1.6) * 0.98);
      const ey = Math.round(cy + Math.sin(ang) * r);
      const px = clamp(ex, 10, W - 10);
      const py = clamp(ey, 10, H - 10);
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(px - 2, py - 2, 5, 5);
      ctx.fillStyle = '#' + a.col.toString(16).padStart(6, '0');
      ctx.fillRect(px - 1, py - 1, 3, 3);
      ctx.fillRect(Math.round(px + Math.cos(ang) * 4), Math.round(py + Math.sin(ang) * 4), 1, 1);
      ctx.fillRect(Math.round(px + Math.cos(ang) * 3), Math.round(py + Math.sin(ang) * 3), 1, 1);
      const miles = Math.hypot(a.x - f.x, a.y - f.y) / 512;
      drawText(ctx, `${a.label} ${miles < 10 ? miles.toFixed(1) : Math.round(miles)}MI`, px, py + 5, a.col, true);
    }
  }
}

function shade(c: number, f: number): number {
  return (Math.min(255, (((c >> 16) & 255) * f) | 0) << 16) | (Math.min(255, (((c >> 8) & 255) * f) | 0) << 8) | Math.min(255, ((c & 255) * f) | 0);
}
