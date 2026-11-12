import { COMPONENTS } from '../data/components';
import { CELL, Design, DX, DY } from '../game/design';
import type { Ship } from '../game/ship';
import { Art, pixels, abgr } from '../art/palette';
import { HULL_SWAP, RAIL_CAP, DECK_PLANK, DECK_LOG, IRON_BANDS, DMG_CRACK, DMG_HOLE, BOWS, STERN_LANTERN, PARTS, SAILS } from '../art/ship';
import { artDataURL } from './artCanvas';

export const PAD = 18;

const K = abgr(0x1b1220);

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

export function pruneSprites(alive: Set<number>): void {
  for (const k of cache.keys()) if (!alive.has(k)) cache.delete(k);
}

function darken(c: number, f: number): number {
  if (!(c >>> 24)) return c;
  const r = Math.round((c & 255) * f);
  const g = Math.round(((c >> 8) & 255) * f);
  const b = Math.round(((c >> 16) & 255) * f);
  return ((c & 0xff000000) | (b << 16) | (g << 8) | r) >>> 0;
}

class Buf {
  px: Uint32Array<ArrayBuffer>;
  constructor(public w: number, public h: number) {
    this.px = new Uint32Array(w * h);
  }
  set(x: number, y: number, c: number): void {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || !(c >>> 24)) return;
    this.px[y * this.w + x] = c;
  }
  get(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0;
    return this.px[y * this.w + x];
  }
  blit(a: Art, x0: number, y0: number, swap?: Record<string, number>, dir = 0, f = 1, ay = 0): void {
    const p = pixels(a, swap);
    const half = CELL / 2;
    for (let y = 0; y < a.h; y++) {
      for (let x = 0; x < a.w; x++) {
        let c = p[y * a.w + x];
        if (!(c >>> 24)) continue;
        if (f !== 1) c = darken(c, f);
        if (dir === 0) {
          this.set(x0 + x, y0 + y - ay, c);
          continue;
        }
        const rx = x + 0.5 - half;
        const ry = y - ay + 0.5 - half;
        let nx = rx;
        let ny = ry;
        if (dir === 1) {
          nx = -ry;
          ny = rx;
        } else if (dir === 2) {
          nx = -rx;
          ny = -ry;
        } else {
          nx = ry;
          ny = -rx;
        }
        this.set(x0 + Math.floor(half + nx), y0 + Math.floor(half + ny), c);
      }
    }
  }
}

export function buildSprite(d: Design, hullHp: Float32Array | null, partHp: Float32Array | null, pivotX: number, pivotY: number, reuse?: ShipSprite): ShipSprite {
  const W = d.w * CELL + PAD * 2;
  const H = d.h * CELL + PAD * 2;
  const b = new Buf(W, H);
  const has = (x: number, y: number) => x >= 0 && y >= 0 && x < d.w && y < d.h && d.hull[y * d.w + x] > 0;
  let minY = d.h;
  let maxY = -1;
  for (let i = 0; i < d.hull.length; i++) if (d.hull[i]) {
    const y = (i / d.w) | 0;
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const bowRuns: { x0: number; x1: number; y: number; art: Art; mat: number }[] = [];
  const underBow = new Set<number>();
  if (minY <= maxY) {
    let x = 0;
    while (x < d.w) {
      if (!has(x, minY)) {
        x++;
        continue;
      }
      let x1 = x;
      while (has(x1 + 1, minY)) x1++;
      const mat = d.hull[minY * d.w + x];
      const width = x1 - x + 1;
      if (mat !== 1) {
        const n = Math.min(3, width);
        const off = Math.floor((width - n) / 2);
        bowRuns.push({ x0: x + off, x1: x + off + n - 1, y: minY, art: BOWS[n - 1], mat });
        for (let k = x + off; k <= x + off + n - 1; k++) underBow.add(minY * d.w + k);
      }
      x = x1 + 1;
    }
  }
  for (let cy = 0; cy < d.h; cy++) {
    for (let cx = 0; cx < d.w; cx++) {
      const i = cy * d.w + cx;
      const mat = d.hull[i];
      if (!mat) continue;
      const sw = HULL_SWAP[mat] ?? HULL_SWAP[2];
      const ox = PAD + cx * CELL;
      const oy = PAD + cy * CELL;
      b.blit(mat === 1 ? DECK_LOG : DECK_PLANK, ox, oy, sw);
      if (mat === 4) b.blit(IRON_BANDS, ox, oy);
      const cap = abgr((sw[RAIL_CAP[mat]] ?? 0x8a6a3a) as number);
      const capC = mat === 4 ? abgr(0x787f8a) : cap;
      const eU = !has(cx, cy - 1) && !underBow.has(i);
      const eD = !has(cx, cy + 1);
      const eL = !has(cx - 1, cy);
      const eR = !has(cx + 1, cy);
      const rail = mat !== 1;
      for (let k = 0; k < CELL; k++) {
        if (eU) {
          b.set(ox + k, oy, K);
          if (rail) b.set(ox + k, oy + 1, capC);
        }
        if (eD) {
          b.set(ox + k, oy + CELL - 1, K);
          if (rail) b.set(ox + k, oy + CELL - 2, capC);
        }
        if (eL) {
          b.set(ox, oy + k, K);
          if (rail && !(eU && k < 1) && !(eD && k > CELL - 2)) b.set(ox + 1, oy + k, capC);
        }
        if (eR) {
          b.set(ox + CELL - 1, oy + k, K);
          if (rail && !(eU && k < 1) && !(eD && k > CELL - 2)) b.set(ox + CELL - 2, oy + k, capC);
        }
      }
      const corner = (x: number, y: number, ix: number, iy: number) => {
        b.px[y * W + x] = 0;
        b.set(ix, iy, K);
      };
      if (eU && eL) corner(ox, oy, ox + 1, oy + 1);
      if (eU && eR) corner(ox + CELL - 1, oy, ox + CELL - 2, oy + 1);
      if (eD && eL) corner(ox, oy + CELL - 1, ox + 1, oy + CELL - 2);
      if (eD && eR) corner(ox + CELL - 1, oy + CELL - 1, ox + CELL - 2, oy + CELL - 2);
      if (hullHp) {
        const f = hullHp[i] / COMPONENTS[mat].hp;
        if (f <= 0) b.blit(DMG_HOLE, ox, oy);
        else if (f < 0.5) b.blit(DMG_CRACK, ox, oy);
      }
    }
  }
  const bowTop = new Map<number, number>();
  for (const r of bowRuns) {
    const a = r.art;
    const x = PAD + r.x0 * CELL;
    const y = PAD + r.y * CELL - a.h + 1;
    b.blit(a, x, y, HULL_SWAP[r.mat]);
    for (let k = r.x0; k <= r.x1; k++) bowTop.set(r.y * d.w + k, y);
  }
  if (maxY >= 0) {
    const row: number[] = [];
    for (let x = 0; x < d.w; x++) if (has(x, maxY)) row.push(x);
    const mid = row[Math.floor(row.length / 2)];
    if (mid !== undefined && d.hull[maxY * d.w + mid] !== 1 && !d.part[maxY * d.w + mid]) {
      b.blit(STERN_LANTERN, PAD + mid * CELL + 2, PAD + (maxY + 1) * CELL - 2);
    }
  }
  for (let cy = 0; cy < d.h; cy++) {
    for (let cx = 0; cx < d.w; cx++) {
      const i = cy * d.w + cx;
      const p = d.part[i];
      if (!p || !d.hull[i]) continue;
      const comp = COMPONENTS[p];
      const pa = comp.sail ? PARTS.mast : PARTS[comp.key];
      if (!pa || pa.top) continue;
      const broken = partHp ? partHp[i] <= 0 : false;
      const dmg = partHp ? partHp[i] / comp.hp < 0.5 : false;
      const f = broken ? 0.38 : dmg ? 0.72 : 1;
      const ox = PAD + cx * CELL;
      let oy = PAD + cy * CELL;
      if (comp.place === 'bow' && bowTop.has(i)) oy = bowTop.get(i)!;
      const dir = comp.rotates ? d.dir[i] : 0;
      b.blit(pa.art, ox, oy, undefined, dir, f, pa.ay);
    }
  }
  const cv = reuse && reuse.canvas.width === W && reuse.canvas.height === H ? reuse.canvas : document.createElement('canvas');
  const sh = reuse && reuse.shadow.width === W && reuse.shadow.height === H ? reuse.shadow : document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  sh.width = W;
  sh.height = H;
  cv.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(b.px.buffer), W, H), 0, 0);
  const spx = new Uint32Array(W * H);
  const sc = abgr(0x061424, 110);
  for (let k = 0; k < spx.length; k++) if (b.px[k] >>> 24) spx[k] = sc;
  sh.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(spx.buffer), W, H), 0, 0);
  return { canvas: cv, shadow: sh, visual: 0, ox: PAD + pivotX, oy: PAD + pivotY };
}

export function partPreview(key: string, scale: number): string {
  const comp = Object.values(COMPONENTS).find((c) => c.key === key)!;
  if (comp.sail && SAILS[comp.sail.style]) return artDataURL(SAILS[comp.sail.style].full, scale);
  if (comp.key === 'crows_nest') return artDataURL(PARTS.crows_nest.art, scale);
  const d: Design = { w: 1, h: 1, hull: [comp.kind === 'hull' ? comp.id : 2], part: [comp.kind === 'part' ? comp.id : 0], dir: [0], keel: 0, sailColor: 0xe8dcc0, name: '' };
  const sp = buildSprite(d, null, null, CELL / 2, CELL / 2);
  const crop = 6;
  const out = document.createElement('canvas');
  const size = CELL + crop * 2;
  out.width = size * scale;
  out.height = size * scale;
  const ctx = out.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sp.canvas, PAD - crop, PAD - crop, size, size, 0, 0, out.width, out.height);
  return out.toDataURL();
}

export { DX, DY };
