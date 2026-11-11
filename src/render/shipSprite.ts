import { COMPONENTS } from '../data/components';
import { CELL, Design, DX, DY } from '../game/design';
import type { Ship } from '../game/ship';

export const PAD = 10;

const HULL_PAL: Record<number, number[]> = {
  1: [0x9a6a3a, 0x7a5028, 0xb8844a, 0x3a2414, 0x5a3a1e],
  2: [0xc0905a, 0x9a6c3e, 0xd8aa70, 0x4a2e18, 0x7a5430],
  3: [0x8a5a34, 0x6a4224, 0xa87444, 0x2a180c, 0x5a3a20],
  4: [0x6e665e, 0x524c46, 0x8e867c, 0x221e1a, 0x3a3a42]
};

const PART_COLS: Record<string, number> = {
  k: 0x1a120c, m: 0x2a2a30, M: 0x5e5e68, w: 0x6a4626, W: 0x9a6c3e, b: 0xd8b04a, B: 0xa8822a, r: 0xb83a2a, c: 0xe8dcc0, g: 0x8a8a8a, G: 0xb0b0b0, x: 0x101010, o: 0xe8742a, p: 0xf4f4f4, t: 0xc8a46a, T: 0x8a6a3a, s: 0x4a4a4a
};

const ART: Record<string, string[]> = {
  light_cannon: ['......', '..mm..', '..Mm..', '..Mm..', '..Mm..', '.kMmk.', '.wmmw.', '.wWWw.', '.kwwk.', '......'],
  long_gun: ['..mm..', '..Mm..', '..Mm..', '..Mm..', '..Mm..', '.kMmk.', '.wmmw.', '.wWWw.', '.wwww.', '.k..k.'],
  carronade: ['......', '......', '.mmm..', '.MMm..', 'kMMmk.', 'wmmmw.', 'wWWWw.', 'wwwww.', 'k...k.', '......'],
  swivel_gun: ['......', '......', '......', '..m...', '..M...', '..m...', '.kmk..', '..w...', '..w...', '......'],
  ram: ['..MM..', '.MMmm.', '.Mmmm.', 'MMmmmm', 'mmmmmm', '.kkkk.', '......', '......', '......', '......'],
  figurehead: ['..bb..', '.bBBb.', '..bB..', '.bBBb.', '..bb..', '..ww..', '......', '......', '......', '......']
};

const CELL_ART: Record<string, string[]> = {
  mortar: ['.kkkk.', 'kxxxxk', 'kxsxxk', 'kxxxxk', 'kxxxxk', '.kkkk.'],
  helm: ['.wWw..', 'wkWkw.', 'WWbWW.', 'wkWkw.', '.wWw..', '......'],
  crew_quarters: ['......', '.kkkk.', '.kTTk.', '.kkkk.', '.kTTk.', '......'],
  cargo_hold: ['......', 'kkk.kk', 'ktk.kt', 'kkkkkk', '.ktTtk', '.kkkkk'],
  galley: ['......', '.gggg.', '.gxxg.', '.gxog.', '.gggg.', '...s..'],
  powder_magazine: ['......', '.ww.ww', 'wrrwrr', 'wWWwWW', '.ww.ww', '......'],
  workshop: ['......', '.ggg..', 'gGGgg.', '..g...', '.www..', '.wTw..'],
  sick_bay: ['......', '.pppp.', '.prrp.', '.rrrr.', '.prrp.', '.pppp.'],
  oar_bench: ['......', '......', 'wwwwww', 'WWWWWW', '......', '......'],
  rudder: ['......', '......', '......', '......', '..ww..', '..kk..'],
  mast: ['......', '......', '..kk..', '..kw..', '......', '......']
};

function hexToAbgr(c: number, a = 255): number {
  return ((a << 24) | ((c & 0xff) << 16) | (c & 0xff00) | ((c >> 16) & 0xff)) >>> 0;
}

function hsh(x: number, y: number): number {
  let h = Math.imul(x * 374761393 + y * 668265263, 0x5bd1e995);
  h ^= h >>> 13;
  return ((h >>> 0) % 1000) / 1000;
}

export interface ShipSprite {
  canvas: HTMLCanvasElement;
  shadow: HTMLCanvasElement;
  visual: number;
  ox: number;
  oy: number;
}

const cache = new Map<number, ShipSprite>();

export function shipSprite(s: Ship): ShipSprite {
  const c = cache.get(s.id);
  if (c && c.visual === s.visual) return c;
  const sp = buildSprite(s.design, s.hullHp, s.partHp, s.pivotX, s.pivotY, c);
  sp.visual = s.visual;
  cache.set(s.id, sp);
  return sp;
}

export function dropSprite(id: number): void {
  cache.delete(id);
}

export function pruneSprites(alive: Set<number>): void {
  for (const k of cache.keys()) if (!alive.has(k)) cache.delete(k);
}

export function buildSprite(d: Design, hullHp: Float32Array | null, partHp: Float32Array | null, pivotX: number, pivotY: number, reuse?: ShipSprite): ShipSprite {
  const W = d.w * CELL + PAD * 2;
  const H = d.h * CELL + PAD * 2;
  const cv = reuse && reuse.canvas.width === W && reuse.canvas.height === H ? reuse.canvas : document.createElement('canvas');
  const sh = reuse && reuse.shadow.width === W && reuse.shadow.height === H ? reuse.shadow : document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  sh.width = W;
  sh.height = H;
  const img = new ImageData(W, H);
  const px = new Uint32Array(img.data.buffer);
  const has = (x: number, y: number) => x >= 0 && y >= 0 && x < d.w && y < d.h && d.hull[y * d.w + x] > 0;
  const set = (x: number, y: number, col: number, a = 255) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    px[y * W + x] = hexToAbgr(col, a);
  };
  let minY = d.h;
  for (let i = 0; i < d.hull.length; i++) if (d.hull[i]) minY = Math.min(minY, (i / d.w) | 0);
  for (let cy = 0; cy < d.h; cy++) {
    for (let cx = 0; cx < d.w; cx++) {
      const i = cy * d.w + cx;
      const hc = d.hull[i];
      if (!hc) continue;
      const pal = HULL_PAL[hc] ?? HULL_PAL[2];
      const f = hullHp ? hullHp[i] / COMPONENTS[hc].hp : 1;
      const ox = PAD + cx * CELL;
      const oy = PAD + cy * CELL;
      const eU = !has(cx, cy - 1), eR = !has(cx + 1, cy), eD = !has(cx, cy + 1), eL = !has(cx - 1, cy);
      for (let y = 0; y < CELL; y++) {
        for (let x = 0; x < CELL; x++) {
          let col: number;
          if (hc === 1) {
            col = x % 2 === 0 ? pal[0] : pal[2];
            if (x % 2 === 1 && (y === 2 || y === 5)) col = pal[4];
            if ((x + cx * CELL) % CELL === CELL - 1) col = pal[1];
          } else {
            col = (x + cx * CELL) % 3 === 2 ? pal[1] : pal[0];
            if (hsh(ox + x, oy + y) < 0.08) col = pal[2];
            if (hc === 4 && (y === 0 || y === 4)) col = pal[4];
            if (hc === 4 && (y === 0 || y === 4) && x % 3 === 1) col = 0x8a8a92;
          }
          const edgeT = (eU && y === 0) || (eD && y === CELL - 1) || (eL && x === 0) || (eR && x === CELL - 1);
          const rimT = !edgeT && hc !== 1 && ((eU && y === 1) || (eD && y === CELL - 2) || (eL && x === 1) || (eR && x === CELL - 2));
          if (edgeT) col = pal[3];
          else if (rimT) col = pal[2];
          if ((eU && eL && x === 0 && y === 0) || (eU && eR && x === CELL - 1 && y === 0) || (eD && eL && x === 0 && y === CELL - 1) || (eD && eR && x === CELL - 1 && y === CELL - 1)) continue;
          if ((eU && eL && ((x === 1 && y === 0) || (x === 0 && y === 1))) || (eU && eR && ((x === CELL - 2 && y === 0) || (x === CELL - 1 && y === 1)))) col = pal[3];
          if ((eD && eL && ((x === 1 && y === CELL - 1) || (x === 0 && y === CELL - 2))) || (eD && eR && ((x === CELL - 2 && y === CELL - 1) || (x === CELL - 1 && y === CELL - 2)))) col = pal[3];
          if (f < 0.5 && !edgeT) {
            const r = hsh(ox + x * 7, oy + y * 3);
            if (r < (0.5 - f) * 0.9) col = r < 0.12 ? 0x1a1410 : pal[4];
          }
          if (f <= 0 && x >= 1 && x <= CELL - 2 && y >= 1 && y <= CELL - 2 && hsh(ox + x, oy + y * 5) < 0.85) col = (x + y) % 3 === 0 ? 0x1e3a5a : 0x0e1a28;
          set(ox + x, oy + y, col);
        }
      }
    }
  }
  const front: number[] = [];
  for (let cx = 0; cx < d.w; cx++) if (has(cx, minY)) front.push(cx);
  if (front.length) {
    const hc = d.hull[minY * d.w + front[0]];
    const pal = HULL_PAL[hc] ?? HULL_PAL[2];
    let runs: [number, number][] = [];
    let s0 = front[0];
    let prev = front[0];
    for (let k = 1; k <= front.length; k++) {
      if (k === front.length || front[k] !== prev + 1) {
        runs.push([s0, prev]);
        if (k < front.length) s0 = front[k];
      }
      if (k < front.length) prev = front[k];
    }
    runs = runs.slice(0, 3);
    for (const [a, b] of runs) {
      const x0 = PAD + a * CELL;
      const x1 = PAD + (b + 1) * CELL - 1;
      const wpx = x1 - x0 + 1;
      const hgt = Math.min(PAD - 1, Math.max(3, Math.round(wpx * 0.45)));
      const cxm = (x0 + x1) / 2;
      const top = PAD + minY * CELL;
      for (let r = 1; r <= hgt; r++) {
        const half = (wpx / 2) * (1 - Math.pow(r / (hgt + 1), 1.3));
        const l = Math.round(cxm - half + 0.5);
        const rr = Math.round(cxm + half - 0.5);
        for (let x = l; x <= rr; x++) {
          const edge = x === l || x === rr || r === hgt;
          const col = edge ? pal[3] : (x - l) % 3 === 2 ? pal[1] : pal[0];
          set(x, top - r, col);
        }
      }
      for (let x = x0 + 1; x <= x1 - 1; x++) set(x, top, hc === 1 ? pal[0] : pal[2]);
    }
  }
  for (let cy = 0; cy < d.h; cy++) {
    for (let cx = 0; cx < d.w; cx++) {
      const i = cy * d.w + cx;
      const p = d.part[i];
      if (!p || !d.hull[i]) continue;
      const comp = COMPONENTS[p];
      const broken = partHp ? partHp[i] <= 0 : false;
      const dmg = partHp ? partHp[i] / comp.hp < 0.5 : false;
      const ox = PAD + cx * CELL;
      const oy = PAD + cy * CELL;
      const tint = (c: number) => (broken ? shadeC(c, 0.35) : dmg ? shadeC(c, 0.7) : c);
      if (ART[comp.key]) {
        const art = ART[comp.key];
        const dir = comp.rotates ? d.dir[i] : 0;
        for (let ay = 0; ay < art.length; ay++) {
          for (let ax = 0; ax < 6; ax++) {
            const ch = art[ay][ax];
            if (ch === '.') continue;
            if (broken && ay < 4 && hsh(ox + ax, oy + ay) < 0.6) continue;
            const half = CELL / 2;
            const rx = ax + 1 + 0.5 - half;
            const ry = ay - 4 + 1 + 0.5 - half;
            let nx = rx, ny = ry;
            if (dir === 1) { nx = -ry; ny = rx; }
            else if (dir === 2) { nx = -rx; ny = -ry; }
            else if (dir === 3) { nx = ry; ny = -rx; }
            set(ox + Math.floor(half + nx), oy + Math.floor(half + ny), tint(PART_COLS[ch]));
          }
        }
      } else {
        const art = comp.sail ? CELL_ART.mast : CELL_ART[comp.key];
        if (!art) continue;
        for (let ay = 0; ay < 6; ay++) for (let ax = 0; ax < 6; ax++) {
          const ch = art[ay][ax];
          if (ch === '.') continue;
          set(ox + ax + 1, oy + ay + 1, tint(PART_COLS[ch]));
        }
        if (comp.key === 'rudder') {
          for (let k = 0; k < 3; k++) {
            set(ox + 3, oy + CELL + k, tint(k ? 0x4a2e18 : 0x2a180c));
            set(ox + 4, oy + CELL + k, tint(k ? 0x4a2e18 : 0x2a180c));
          }
        }
        if (broken) for (let k = 0; k < 6; k++) set(ox + 1 + ((hsh(ox, k) * 6) | 0), oy + 1 + ((hsh(k, oy) * 6) | 0), 0x1a1410);
      }
    }
  }
  const ctx = cv.getContext('2d')!;
  ctx.putImageData(img, 0, 0);
  const sctx = sh.getContext('2d')!;
  const simg = new ImageData(W, H);
  const sp = new Uint32Array(simg.data.buffer);
  const shadowCol = hexToAbgr(0x061424, 120);
  for (let k = 0; k < px.length; k++) if (px[k] >>> 24) sp[k] = shadowCol;
  sctx.putImageData(simg, 0, 0);
  return { canvas: cv, shadow: sh, visual: 0, ox: PAD + pivotX, oy: PAD + pivotY };
}

function shadeC(c: number, f: number): number {
  return (Math.min(255, (((c >> 16) & 255) * f) | 0) << 16) | (Math.min(255, (((c >> 8) & 255) * f) | 0) << 8) | Math.min(255, ((c & 255) * f) | 0);
}

export function partIcon(key: string, scale: number): string {
  const comp = Object.values(COMPONENTS).find((c) => c.key === key)!;
  const d: Design = { w: 1, h: 1, hull: [comp.kind === 'hull' ? comp.id : 2], part: [comp.kind === 'part' ? comp.id : 0], dir: [0], keel: 0, sailColor: 0xe8dcc0, name: '' };
  const sp = buildSprite(d, null, null, CELL / 2, CELL / 2);
  const out = document.createElement('canvas');
  out.width = sp.canvas.width * scale;
  out.height = sp.canvas.height * scale;
  const ctx = out.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sp.canvas, 0, 0, out.width, out.height);
  if (comp.sail) {
    ctx.fillStyle = '#' + comp.color.toString(16).padStart(6, '0');
    const cx = out.width / 2;
    const cy = out.height / 2;
    const w = Math.min(out.width - 4, comp.sail.span * 6 * scale * 0.7);
    if (comp.sail.style === 'lateen') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - 4 * scale);
      ctx.lineTo(cx + 4 * scale, cy + 4 * scale);
      ctx.lineTo(cx - 1 * scale, cy + 3 * scale);
      ctx.fill();
    } else ctx.fillRect(cx - w / 2, cy - 2 * scale, w, 3 * scale);
    ctx.fillStyle = '#5a3a22';
    ctx.fillRect(cx - w / 2, cy - 2 * scale, w, scale);
  }
  if (comp.key === 'crows_nest') {
    ctx.strokeStyle = '#3a2414';
    ctx.lineWidth = scale;
    ctx.beginPath();
    ctx.arc(out.width / 2, out.height / 2, 2.5 * scale, 0, Math.PI * 2);
    ctx.stroke();
  }
  return out.toDataURL();
}

export { DX, DY };
