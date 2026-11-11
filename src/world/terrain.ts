import { WORLD_SEED, hash2, hashf, noise2, fbm } from '../core/rng';
import {
  CHUNK, WORLD_SIZE, Island, islandsInRect, islandHeight, reefField, biomeWeights, beachWidth, portLayout, heightAt, HeightSample,
  B_SHALLOWS, B_CORAL, B_FROST, B_ASHEN, B_MIST,
  I_TROPICAL, I_ATOLL, I_CRAG, I_SANDBAR, I_VOLCANO, I_GLACIER, I_SWAMP, I_JUNGLE, I_SKULL, I_STACK
} from './worldgen';

export const T_DEEP = 0;
export const T_OCEAN = 1;
export const T_SHALLOW = 2;
export const T_REEF = 3;
export const T_FOAM = 4;
export const T_ICE = 5;
export const T_SAND = 6;
export const T_GRASS = 7;
export const T_FOREST = 8;
export const T_ROCK = 9;
export const T_PEAK = 10;
export const T_SNOW = 11;
export const T_LAVA = 12;
export const T_SWAMP = 13;
export const T_TOWN = 14;
export const T_DOCK = 15;
export const T_HOUSE = 16;
export const T_TREE = 17;
export const T_EDGE = 18;

export const EDGE_MARGIN = 3000;

export function isWater(t: number): boolean {
  return t <= T_FOAM;
}
export function shipPassable(t: number): boolean {
  return t <= T_FOAM;
}
export function walkable(t: number): boolean {
  return t === T_SHALLOW || t === T_FOAM || (t >= T_ICE && t <= T_DOCK && t !== T_PEAK && t !== T_LAVA);
}

function abgr(c: number): number {
  return (0xff000000 | ((c & 0xff) << 16) | (c & 0xff00) | ((c >> 16) & 0xff)) >>> 0;
}

const WATER_PAL: number[][] = [
  [0x1b4776, 0x1f4e80, 0x24649a, 0x2a6fa6, 0x3593ad, 0x46aebb, 0xd8f1ee, 0x3a8a70, 0x2e705e, 0xd8ecf4],
  [0x16447a, 0x1a4c86, 0x1e72a6, 0x2480b2, 0x30b2bb, 0x4ccac6, 0xe2f7f2, 0xd8806a, 0xb85e5a, 0xd8ecf4],
  [0x1a2c44, 0x1e344e, 0x284660, 0x2e506c, 0x4b7488, 0x5e8a9c, 0xe6f2f7, 0x7a9cae, 0x6a8a9a, 0xdcecf4],
  [0x2c2838, 0x322d40, 0x3e384c, 0x463f54, 0x5a5262, 0x685e6e, 0xb8aaa4, 0x7a5444, 0x643e32, 0xc8c0bc],
  [0x183736, 0x1c3e3c, 0x264f4b, 0x2c5852, 0x3c6a60, 0x4a7a6c, 0xbcd4c6, 0x5a6a4a, 0x4a5a3e, 0xd0dcd4]
];

const LAND_PAL: number[][] = [
  [0xe8d49a, 0xd6bd80, 0x62b04c, 0x4f9a42, 0x2f7036, 0x24592c, 0x8d8878, 0x726d60, 0xb4ae9e, 0x9a9484, 0xf2f6fa, 0xdce6ee, 0xff7a24, 0xd8401a, 0x4e6a3e, 0x3e5832, 0xb08a5a, 0x987448],
  [0xeedca4, 0xdcc488, 0x6ab84e, 0x56a244, 0x2c7a3a, 0x22622e, 0x948a7a, 0x787064, 0xbab2a2, 0xa09888, 0xf2f6fa, 0xdce6ee, 0xff7a24, 0xd8401a, 0x4e6a3e, 0x3e5832, 0xb08a5a, 0x987448],
  [0xa29e92, 0x8c887e, 0x7e9278, 0x6a7e66, 0x2e5040, 0x234034, 0x6f7682, 0x5a616c, 0xe8f0f6, 0xd0dce6, 0xf6faff, 0xdfe9f2, 0xff7a24, 0xd8401a, 0x4a5a4a, 0x3a4a3c, 0x9a8a72, 0x847460],
  [0x5a5254, 0x4a4446, 0x7a6c62, 0x685c52, 0x5a4a40, 0x483c34, 0x4a4246, 0x3a3436, 0x363032, 0x2a2427, 0xd8d0cc, 0xbcb4b0, 0xffa030, 0xe84a18, 0x4a463a, 0x3a3830, 0x6a5a4a, 0x5a4a3c],
  [0xb8ad8a, 0xa29876, 0x4f6c47, 0x415a3b, 0x2e4636, 0x22382a, 0x676c66, 0x545954, 0x8e928c, 0x787c76, 0xe8ecea, 0xd2d8d4, 0xff7a24, 0xd8401a, 0x3e503a, 0x30402e, 0x8a7a5a, 0x746648]
];

const BAYER = new Float32Array([0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16));

export function landType(isl: Island, hd: number, x: number, y: number): number {
  const r = isl.r;
  const rel = hd / r;
  const bw = beachWidth(r);
  const m = noise2(x / 70, y / 70, isl.seed + 3);
  switch (isl.type) {
    case I_SANDBAR:
      return rel > 0.45 && m > 0.5 ? T_GRASS : T_SAND;
    case I_ATOLL:
      return hd < bw ? T_SAND : m > 0.62 ? T_FOREST : T_GRASS;
    case I_STACK:
      return rel > 0.55 ? T_PEAK : T_ROCK;
    case I_CRAG:
      if (hd < bw * 0.6) return T_SAND;
      if (rel < 0.18 && m > 0.45) return T_GRASS;
      return rel > 0.62 ? T_PEAK : T_ROCK;
    case I_VOLCANO:
      if (hd < bw) return T_SAND;
      if (rel < 0.38) return m > 0.6 ? T_FOREST : T_GRASS;
      if (rel < 0.74) return T_ROCK;
      if (rel < 0.9) return T_PEAK;
      return T_LAVA;
    case I_GLACIER:
      if (hd < bw * 0.5) return T_SAND;
      if (rel > 0.7) return T_PEAK;
      return m > 0.68 ? T_ROCK : T_SNOW;
    case I_SWAMP:
      if (hd < bw * 0.6) return T_SAND;
      if (rel > 0.85) return T_ROCK;
      return m > 0.5 ? T_SWAMP : m > 0.32 ? T_FOREST : T_GRASS;
    case I_JUNGLE:
      if (hd < bw) return T_SAND;
      if (rel > 0.86) return T_PEAK;
      if (rel > 0.72) return T_ROCK;
      return m < 0.28 ? T_GRASS : T_FOREST;
    case I_SKULL:
      if (hd < bw) return T_SAND;
      if (rel > 0.7) return T_PEAK;
      return m > 0.55 ? T_ROCK : T_GRASS;
    default:
      if (hd < bw) return T_SAND;
      if (rel < 0.24) return m > 0.66 ? T_FOREST : T_GRASS;
      if (rel < 0.6) return m > 0.38 ? T_FOREST : T_GRASS;
      if (rel < 0.82) return T_ROCK;
      return isl.biome === B_FROST ? T_SNOW : T_PEAK;
  }
}

export function waterType(hd: number, reef: number, frost: boolean): number {
  if (reef > 0.3 && hd < -5) return frost ? T_ICE : T_REEF;
  if (hd > -3) return T_FOAM;
  if (hd > -28 || reef > -0.25) return T_SHALLOW;
  if (hd > -90) return T_OCEAN;
  return T_DEEP;
}

const sample: HeightSample = { h: 0, isl: null };
const wW = new Float32Array(5);
export function typeAtDirect(x: number, y: number): number {
  if (x < EDGE_MARGIN || y < EDGE_MARGIN || x > WORLD_SIZE - EDGE_MARGIN || y > WORLD_SIZE - EDGE_MARGIN) return T_EDGE;
  heightAt(x, y, sample);
  if (sample.isl && sample.h > 0) return landType(sample.isl, sample.h, x, y);
  biomeWeights(x, y, wW);
  const biome = argmax5(wW);
  const reef = reefField(x, y, biome);
  return waterType(sample.h, reef, biome === B_FROST);
}

function argmax5(w: Float32Array): number {
  let b = 0;
  for (let i = 1; i < 5; i++) if (w[i] > w[b]) b = i;
  return b;
}

type Sprite = { w: number; h: number; px: string; block: number };
function spr(rows: string[], block = 1): Sprite {
  return { w: rows[0].length, h: rows.length, px: rows.join(''), block };
}

const SPR_PALM = spr([
  '..dd.d...',
  '.dGGgGd..',
  'dGg.tgGgd',
  'd..kt..Gd',
  '....t....',
  '....tk...',
  '....t....',
  '...Tt....'
]);
const SPR_TREE = spr([
  '..dddd..',
  '.dGGGgd.',
  'dGGggggd',
  'dGgggggd',
  'dggggdgd',
  '.ddggdd.',
  '...tT...',
  '...tT...'
]);
const SPR_PINE = spr([
  '...d...',
  '..dgd..',
  '..dGd..',
  '.dGgdd.',
  '.dggGd.',
  'dGggggd',
  'ddgggdd',
  '...T...',
  '...T...'
]);
const SPR_SNOWPINE = spr([
  '...w...',
  '..wgd..',
  '..dwd..',
  '.wGgwd.',
  '.dggGw.',
  'wwggwgd',
  'ddgwgdd',
  '...T...',
  '...T...'
]);
const SPR_DEAD = spr([
  'T..T..T',
  '.T.T.T.',
  '..TTT..',
  '...T.T.',
  '..TT...',
  '...T...',
  '...T...'
]);
const SPR_BUSH = spr(['.dgd.', 'dGggd', 'dgggd', '.ddd.'], 0);
const SPR_ROCK = spr(['.RR.', 'Rrrk', 'kkkk'], 0);
const SPR_BOULDER = spr(['..RRR..', '.RRrrr.', 'RRrrrrk', 'Rrrrrkk', '.kkkkk.'], 2);
const SPR_TUFT = spr(['g.g', 'dgd'], 0);
const SPR_FLOWER = spr(['.f.', 'fyf', '.g.'], 0);
const SPR_SKULLROCK = spr(['.RRRRR.', 'RRrrrRR', 'R.kRk.R', 'RrrrrrR', '.RkRkR.', '..k.k..'], 2);
const SPR_REEDS = spr(['.y..y', 'g.y.g', 'g.g.g', 'gdgdg', 'ddddd'], 0);
const SPR_SHELL = spr(['wf', 'fw'], 0);

const BAYER4 = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)];

function spriteColors(biome: number): Record<string, number> {
  switch (biome) {
    case B_FROST:
      return { d: 0x1e3a2e, g: 0x2e5a44, G: 0x3e7058, t: 0x6a5040, T: 0x4a3828, k: 0x1a2420, R: 0x9aa2ac, r: 0x7a828c, y: 0xc8c070, f: 0xd0e0f0, w: 0xf6faff };
    case B_ASHEN:
      return { d: 0x2e2620, g: 0x4a3c30, G: 0x5e4c3c, t: 0x3e3028, T: 0x2a201a, k: 0x141012, R: 0x5a5054, r: 0x403a3c, y: 0xa08040, f: 0xff8040, w: 0xc0b0a8 };
    case B_MIST:
      return { d: 0x1a2a20, g: 0x2e4434, G: 0x3e5a44, t: 0x4a3c30, T: 0x34281e, k: 0x101814, R: 0x8a8e88, r: 0x6a6e68, y: 0xa0a060, f: 0xb090c0, w: 0xe0e8e4 };
    default:
      return { d: 0x1c4a24, g: 0x2f7a32, G: 0x4aa040, t: 0x7a5434, T: 0x5a3a22, k: 0x1a2a18, R: 0xa8a294, r: 0x86806e, y: 0xf0d040, f: 0xe85a7a, w: 0xfff4e0 };
  }
}
const SPR_COLS: Record<string, number>[] = [0, 1, 2, 3, 4].map((b) => {
  const c = spriteColors(b);
  const o: Record<string, number> = {};
  for (const k in c) o[k] = abgr(c[k]);
  return o;
});

const GRID = 2;
const MARGIN = 12;
const GN = (CHUNK + MARGIN * 2) / GRID + 1;

export interface ChunkResult {
  pixels: Uint8ClampedArray;
  types: Uint8Array;
  lights: number[];
}

const chunkIslands: Island[] = [];
const hGrid = new Float32Array(GN * GN);
const iGrid = new Int16Array(GN * GN);
const rGrid = new Float32Array(GN * GN);
const nGrid = new Float32Array(GN * GN);
const wGrid = new Float32Array(GN * GN);

function biomePalette(x: number, y: number): number[] {
  biomeWeights(x, y, wW);
  const out: number[] = [];
  for (let k = 0; k < 10; k++) {
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < 5; i++) {
      const c = WATER_PAL[i][k];
      r += ((c >> 16) & 255) * wW[i];
      g += ((c >> 8) & 255) * wW[i];
      b += (c & 255) * wW[i];
    }
    out.push(abgr((Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)));
  }
  return out;
}

const LAND_ABGR = LAND_PAL.map((p) => p.map(abgr));
const EDGE_A = abgr(0x14161e);
const EDGE_B = abgr(0x1a1c26);

function landColorIndex(t: number): number {
  switch (t) {
    case T_SAND: return 0;
    case T_GRASS: return 2;
    case T_FOREST: return 4;
    case T_ROCK: return 6;
    case T_PEAK: return 8;
    case T_SNOW: return 10;
    case T_LAVA: return 12;
    case T_SWAMP: return 14;
    case T_TOWN: return 16;
    default: return 0;
  }
}

export function renderChunk(cx: number, cy: number): ChunkResult {
  const x0 = cx * CHUNK;
  const y0 = cy * CHUNK;
  const buf = new Uint8ClampedArray(CHUNK * CHUNK * 4);
  const px = new Uint32Array(buf.buffer);
  const types = new Uint8Array(CHUNK * CHUNK);
  const lights: number[] = [];
  const gx0 = x0 - MARGIN;
  const gy0 = y0 - MARGIN;
  islandsInRect(gx0, gy0, gx0 + CHUNK + MARGIN * 2, gy0 + CHUNK + MARGIN * 2, chunkIslands);
  const nI = chunkIslands.length;
  biomeWeights(x0 + CHUNK / 2, y0 + CHUNK / 2, wW);
  const chunkBiome = argmax5(wW);
  const frost = chunkBiome === B_FROST;
  const wp = biomePalette(x0 + CHUNK / 2, y0 + CHUNK / 2);
  const reefPossible = fbm((x0 + 128) / 1400, (y0 + 128) / 1400, WORLD_SEED + 21, 3) > 0.5;
  for (let j = 0; j < GN; j++) {
    const wy = gy0 + j * GRID;
    for (let i = 0; i < GN; i++) {
      const wx = gx0 + i * GRID;
      let best = -100000;
      let bi = -1;
      for (let k = 0; k < nI; k++) {
        const h = islandHeight(chunkIslands[k], wx, wy);
        if (h > best) {
          best = h;
          bi = k;
        }
      }
      const g = j * GN + i;
      hGrid[g] = best;
      iGrid[g] = bi;
      rGrid[g] = reefPossible && best < -3 ? reefField(wx, wy, chunkBiome) : -1;
      nGrid[g] = noise2(wx / 14, wy / 14, WORLD_SEED + 5);
      wGrid[g] = best < -40 ? fbm(wx / 90, wy / 90, WORLD_SEED + 6, 2) : 0.5;
    }
  }
  const edge = x0 < EDGE_MARGIN || y0 < EDGE_MARGIN || x0 + CHUNK > WORLD_SIZE - EDGE_MARGIN || y0 + CHUNK > WORLD_SIZE - EDGE_MARGIN;
  for (let j = 0; j < CHUNK; j++) {
    const ly = j + MARGIN;
    const gj = (ly / GRID) | 0;
    const fy = (ly - gj * GRID) / GRID;
    const wy = y0 + j;
    for (let i = 0; i < CHUNK; i++) {
      const lx = i + MARGIN;
      const gi = (lx / GRID) | 0;
      const fx = (lx - gi * GRID) / GRID;
      const g = gj * GN + gi;
      const h00 = hGrid[g], h10 = hGrid[g + 1], h01 = hGrid[g + GN], h11 = hGrid[g + GN + 1];
      const hd = (h00 * (1 - fx) + h10 * fx) * (1 - fy) + (h01 * (1 - fx) + h11 * fx) * fy;
      const nz = (nGrid[g] * (1 - fx) + nGrid[g + 1] * fx) * (1 - fy) + (nGrid[g + GN] * (1 - fx) + nGrid[g + GN + 1] * fx) * fy;
      const wx = x0 + i;
      const o = j * CHUNK + i;
      const bay = BAYER4(wx, wy);
      if (edge && (wx < EDGE_MARGIN || wy < EDGE_MARGIN || wx > WORLD_SIZE - EDGE_MARGIN || wy > WORLD_SIZE - EDGE_MARGIN)) {
        types[o] = T_EDGE;
        px[o] = nz + bay * 0.4 > 0.7 ? EDGE_B : EDGE_A;
        continue;
      }
      if (hd > 0) {
        const isl = chunkIslands[iGrid[fx < 0.5 ? (fy < 0.5 ? g : g + GN) : fy < 0.5 ? g + 1 : g + GN + 1]] ?? chunkIslands[iGrid[g]];
        if (!isl) {
          types[o] = T_SHALLOW;
          px[o] = wp[4];
          continue;
        }
        const t = landType(isl, hd, wx, wy);
        types[o] = t;
        const pal = LAND_ABGR[isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome];
        const ci = landColorIndex(t);
        const slope = h00 - h11;
        let dark = nz + bay * 0.55 > 0.78;
        if (slope > 1.2) dark = false;
        else if (slope < -1.2) dark = true;
        let c = pal[ci + (dark ? 1 : 0)];
        if (t === T_SAND && hd < 1.6) c = pal[1];
        if (t === T_LAVA) c = nz + bay * 0.5 > 0.7 ? pal[13] : pal[12];
        px[o] = c;
      } else {
        const reef = (rGrid[g] * (1 - fx) + rGrid[g + 1] * fx) * (1 - fy) + (rGrid[g + GN] * (1 - fx) + rGrid[g + GN + 1] * fx) * fy;
        const t = waterType(hd, reef, frost);
        types[o] = t;
        let c: number;
        if (t === T_REEF) {
          const hv = hashf(wx, wy, 91);
          c = hv < 0.22 ? wp[5] : hv < 0.5 ? wp[8] : wp[7];
        }
        else if (t === T_ICE) c = nz + bay * 0.5 > 0.8 ? wp[6] : wp[9];
        else if (t === T_FOAM) c = hd > -1.6 || bay < 0.35 ? wp[6] : wp[5];
        else if (hd > -28 || reef > -0.25) {
          const tt = (hd + 28) / 18;
          c = tt > bay ? wp[5] : wp[4];
          if (reef > -0.25 && hd < -28) c = reef > -0.1 + bay * 0.25 ? wp[5] : wp[4];
        } else if (hd > -40) c = (hd + 40) / 12 > bay ? wp[4] : wp[3];
        else if (hd > -90) c = nz + bay * 0.3 > 0.72 ? wp[3] : wp[2];
        else if (hd > -140) c = (hd + 140) / 50 > bay ? wp[2] : (nz > 0.6 ? wp[1] : wp[0]);
        else c = nz + bay * 0.25 > 0.7 ? wp[1] : wp[0];
        px[o] = c;
      }
    }
  }
  decorate(x0, y0, px, types, chunkBiome);
  for (let k = 0; k < nI; k++) {
    const isl = chunkIslands[k];
    if (isl.port) drawTown(isl, x0, y0, px, types, lights);
  }
  return { pixels: buf, types, lights };
}

function decorate(x0: number, y0: number, px: Uint32Array, types: Uint8Array, chunkBiome: number): void {
  const C = 6;
  const cx0 = Math.floor((x0 - MARGIN) / C);
  const cy0 = Math.floor((y0 - MARGIN) / C);
  const cx1 = Math.floor((x0 + CHUNK + 2) / C);
  const cy1 = Math.floor((y0 + CHUNK + 2) / C);
  for (let gy = cy0; gy <= cy1; gy++) {
    for (let gx = cx0; gx <= cx1; gx++) {
      const hsh = hash2(gx, gy, WORLD_SEED + 31);
      const roll = (hsh & 0xffff) / 65536;
      if (roll > 0.8) continue;
      const ax = gx * C + ((hsh >>> 16) & 3);
      const ay = gy * C + ((hsh >>> 18) & 3);
      const lx = ax - x0;
      const ly = ay - y0;
      const gi = Math.round((lx + MARGIN) / GRID);
      const gj = Math.round((ly + MARGIN) / GRID);
      if (gi < 0 || gj < 0 || gi >= GN || gj >= GN) continue;
      const g = gj * GN + gi;
      const hd = hGrid[g];
      if (hd <= 1.5) {
        continue;
      }
      const isl = chunkIslands[iGrid[g]];
      if (!isl) continue;
      const t = landType(isl, hd, ax, ay);
      const biome = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
      let s: Sprite | null = null;
      const r2 = ((hsh >>> 20) & 0xfff) / 4096;
      if (t === T_FOREST) {
        if (roll < 0.62) {
          if (biome === B_FROST) s = r2 < 0.3 ? SPR_SNOWPINE : SPR_PINE;
          else if (biome === B_ASHEN) s = r2 < 0.7 ? SPR_DEAD : SPR_BUSH;
          else if (biome === B_MIST) s = r2 < 0.25 ? SPR_DEAD : SPR_TREE;
          else s = r2 < 0.25 ? SPR_PALM : SPR_TREE;
        } else if (roll < 0.7) s = SPR_BUSH;
      } else if (t === T_GRASS) {
        if (roll < 0.06) s = biome === B_FROST ? SPR_PINE : biome === B_ASHEN ? SPR_DEAD : biome <= B_CORAL ? (r2 < 0.5 ? SPR_PALM : SPR_TREE) : SPR_TREE;
        else if (roll < 0.13) s = SPR_BUSH;
        else if (roll < 0.22) s = SPR_TUFT;
        else if (roll < 0.26 && biome !== B_ASHEN) s = SPR_FLOWER;
        else if (roll < 0.28) s = SPR_ROCK;
      } else if (t === T_SAND) {
        if (roll < 0.035 && biome <= B_CORAL && hd > 4 && isl.type !== I_GLACIER) s = SPR_PALM;
        else if (roll < 0.05) s = SPR_ROCK;
        else if (roll < 0.065 && biome <= B_CORAL) s = SPR_SHELL;
      } else if (t === T_ROCK) {
        if (roll < 0.06) s = SPR_BOULDER;
        else if (roll < 0.14) s = SPR_ROCK;
        else if (roll < 0.16 && isl.type === I_SKULL) s = SPR_SKULLROCK;
      } else if (t === T_SNOW) {
        if (roll < 0.05) s = SPR_SNOWPINE;
        else if (roll < 0.09) s = SPR_ROCK;
      } else if (t === T_SWAMP) {
        if (roll < 0.22) s = SPR_REEDS;
        else if (roll < 0.3) s = SPR_DEAD;
      }
      if (isl.type === I_SKULL && t === T_GRASS && roll < 0.04) s = SPR_SKULLROCK;
      if (!s) continue;
      blit(s, lx - (s.w >> 1), ly - s.h + 1, px, types, SPR_COLS[biome]);
    }
  }
}

function blit(s: Sprite, sx: number, sy: number, px: Uint32Array, types: Uint8Array, cols: Record<string, number>): void {
  const shadow = 0;
  for (let y = 0; y < s.h; y++) {
    for (let x = 0; x < s.w; x++) {
      const ch = s.px[y * s.w + x];
      if (ch === '.') continue;
      const tx = sx + x + 1;
      const ty = sy + y + 1;
      if (tx < 0 || ty < 0 || tx >= CHUNK || ty >= CHUNK) continue;
      const o = ty * CHUNK + tx;
      const c = px[o];
      px[o] = (0xff000000 | (((((c >> 16) & 255) * 0.62) | 0) << 16) | (((((c >> 8) & 255) * 0.62) | 0) << 8) | (((c & 255) * 0.62) | 0)) >>> 0;
    }
  }
  for (let y = 0; y < s.h; y++) {
    for (let x = 0; x < s.w; x++) {
      const ch = s.px[y * s.w + x];
      if (ch === '.') continue;
      const tx = sx + x;
      const ty = sy + y;
      if (tx < 0 || ty < 0 || tx >= CHUNK || ty >= CHUNK) continue;
      const o = ty * CHUNK + tx;
      px[o] = cols[ch] ?? shadow;
      if (s.block === 1 && (ch === 'T' || ch === 't') && y >= s.h - 2) types[o] = T_TREE;
      else if (s.block === 2 && y >= s.h - 3) types[o] = T_TREE;
    }
  }
}

const DOCK_A = abgr(0x8a6038);
const DOCK_B = abgr(0x6a4426);
const DOCK_P = abgr(0x3e2614);
const OUTLINE = abgr(0x241a14);
const WALL = abgr(0xe2d2b0);
const WALL_D = abgr(0xbca880);
const DOOR = abgr(0x4a2e1a);
const STONE = abgr(0x8e8a80);
const STONE_D = abgr(0x6a665e);
const STONE_L = abgr(0xaaa69a);
const FLAG = [abgr(0x2a4a9a), abgr(0x3a8a4a), abgr(0x1a1a1a)];
const PATH_A = abgr(0xb89462);
const PATH_B = abgr(0xa4804e);

function shade(c: number, f: number): number {
  return (0xff000000 | (Math.min(255, (((c >> 16) & 255) * f) | 0) << 16) | (Math.min(255, (((c >> 8) & 255) * f) | 0) << 8) | Math.min(255, ((c & 255) * f) | 0)) >>> 0;
}

function drawTown(isl: Island, x0: number, y0: number, px: Uint32Array, types: Uint8Array, lights: number[]): void {
  const L = portLayout(isl);
  if (!L) return;
  const minX = Math.min(L.dockX1, L.townX) - 200;
  const maxX = Math.max(L.dockX1, L.townX) + 200;
  const minY = Math.min(L.dockY1, L.townY) - 200;
  const maxY = Math.max(L.dockY1, L.townY) + 200;
  if (maxX < x0 || minX > x0 + CHUNK || maxY < y0 || minY > y0 + CHUNK) return;
  for (let p = 0; p < L.paths.length; p += 4) {
    line(L.paths[p] - x0, L.paths[p + 1] - y0, L.paths[p + 2] - x0, L.paths[p + 3] - y0, 1, (x, y) => {
      const o = y * CHUNK + x;
      const t = types[o];
      if (t >= T_SAND && t <= T_SWAMP && t !== T_PEAK) {
        types[o] = T_TOWN;
        px[o] = BAYER4(x + x0, y + y0) > 0.7 ? PATH_B : PATH_A;
      }
    });
  }
  const dx = L.dirX;
  const dy = L.dirY;
  const len = Math.hypot(L.dockX1 - L.dockX0, L.dockY1 - L.dockY0);
  const bx0 = Math.floor(Math.min(L.dockX0, L.dockX1) - 6 - x0);
  const bx1 = Math.ceil(Math.max(L.dockX0, L.dockX1) + 6 - x0);
  const by0 = Math.floor(Math.min(L.dockY0, L.dockY1) - 6 - y0);
  const by1 = Math.ceil(Math.max(L.dockY0, L.dockY1) + 6 - y0);
  for (let y = Math.max(0, by0); y <= Math.min(CHUNK - 1, by1); y++) {
    for (let x = Math.max(0, bx0); x <= Math.min(CHUNK - 1, bx1); x++) {
      const rx = x + x0 - L.dockX0;
      const ry = y + y0 - L.dockY0;
      const along = rx * dx + ry * dy;
      const across = -rx * dy + ry * dx;
      if (along < 0 || along > len || across < -4.5 || across > 4.5) continue;
      const o = y * CHUNK + x;
      const edgeP = Math.abs(across) > 3.6;
      if (edgeP) {
        if ((Math.floor(along) & 7) < 2) {
          px[o] = DOCK_P;
          types[o] = T_DOCK;
        } else if (types[o] <= T_FOAM) px[o] = shade(px[o], 0.7);
        continue;
      }
      types[o] = T_DOCK;
      px[o] = (Math.floor(along) % 3 === 0) ? DOCK_B : DOCK_A;
    }
  }
  const faction = isl.port!.faction;
  for (const h of L.houses) {
    const hx = h.x - x0;
    const hy = h.y - y0;
    if (hx + h.w + 2 < 0 || hy + h.h + 2 < 0 || hx > CHUNK || hy > CHUNK) continue;
    if (h.kind === 1) drawFort(hx, hy, h.w, h.h, px, types, faction);
    else drawHouse(hx, hy, h.w, h.h, h.color, px, types);
  }
  for (let i = 0; i < L.lights.length; i += 2) {
    const lx = L.lights[i] - x0;
    const ly = L.lights[i + 1] - y0;
    if (lx >= 0 && ly >= 0 && lx < CHUNK && ly < CHUNK) lights.push(L.lights[i], L.lights[i + 1]);
  }
}

function put(px: Uint32Array, types: Uint8Array, x: number, y: number, c: number, t: number): void {
  if (x < 0 || y < 0 || x >= CHUNK || y >= CHUNK) return;
  const o = y * CHUNK + x;
  px[o] = c;
  if (t >= 0) types[o] = t;
}

function drawHouse(x: number, y: number, w: number, h: number, roof: number, px: Uint32Array, types: Uint8Array): void {
  for (let j = 0; j <= h; j++) for (let i = 0; i <= w; i++) {
    const o = (y + j + 1) * CHUNK + (x + i + 1);
    if (x + i + 1 >= 0 && y + j + 1 >= 0 && x + i + 1 < CHUNK && y + j + 1 < CHUNK) px[o] = shade(px[o], 0.6);
  }
  const roofH = h - 3;
  const rd = shade(roof, 0.75);
  const rl = shade(roof, 1.18);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      let c: number;
      const edge = i === 0 || j === 0 || i === w - 1 || j === h - 1;
      if (edge) c = OUTLINE;
      else if (j < roofH) c = j === (roofH >> 1) ? rl : (j < roofH >> 1 ? roof : rd);
      else if (j === roofH) c = OUTLINE;
      else c = i === (w >> 1) ? DOOR : (i === 2 || i === w - 3) && j === roofH + 1 ? abgr(0x6a8ab0) : (j === h - 2 ? WALL_D : WALL);
      put(px, types, x + i, y + j, c, T_HOUSE);
    }
  }
}

function drawFort(x: number, y: number, w: number, h: number, px: Uint32Array, types: Uint8Array, faction: number): void {
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const edge = i === 0 || j === 0 || i === w - 1 || j === h - 1;
      const wall = i < 3 || j < 3 || i >= w - 3 || j >= h - 3;
      let c: number;
      let t = T_HOUSE;
      if (edge) c = (i + j) % 2 === 0 && (j === 0 || i === 0) ? STONE_L : OUTLINE;
      else if (wall) c = (i * 3 + j) % 5 === 0 ? STONE_D : STONE;
      else {
        c = BAYER4(i, j) > 0.6 ? PATH_B : PATH_A;
        t = T_HOUSE;
      }
      put(px, types, x + i, y + j, c, t);
    }
  }
  const cx = x + (w >> 1);
  const cy = y + (h >> 1);
  for (let j = 0; j < 5; j++) put(px, types, cx, cy - j, OUTLINE, T_HOUSE);
  for (let j = 0; j < 2; j++) for (let i = 1; i < 4; i++) put(px, types, cx + i, cy - 4 + j, FLAG[faction], T_HOUSE);
  put(px, types, x + 1, y + 1, STONE_L, T_HOUSE);
  put(px, types, x + w - 2, y + 1, STONE_L, T_HOUSE);
  put(px, types, x + 1, y + h - 2, STONE_D, T_HOUSE);
  put(px, types, x + w - 2, y + h - 2, STONE_D, T_HOUSE);
}

function line(x0: number, y0: number, x1: number, y1: number, rad: number, fn: (x: number, y: number) => void): void {
  x0 = Math.round(x0);
  y0 = Math.round(y0);
  x1 = Math.round(x1);
  y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let n = 0;
  while (n++ < 4000) {
    for (let oy = -rad; oy <= rad; oy++) for (let ox = -rad; ox <= rad; ox++) {
      const x = x0 + ox;
      const y = y0 + oy;
      if (x >= 0 && y >= 0 && x < CHUNK && y < CHUNK) fn(x, y);
    }
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}

export const MAP_TILE = 128;
const mapIslands: Island[] = [];

const MAP_WATER = [0x2c5f8a, 0x2a6a96, 0x34485c, 0x3a3640, 0x2e5452].map(abgr);
const MAP_SHALLOW = [0x4aa0b4, 0x50b8c0, 0x5e8496, 0x585260, 0x4a7468].map(abgr);
const MAP_LAND = [0x8cbf62, 0x94c868, 0xd6dee6, 0x6a5a52, 0x6a805c].map(abgr);
const MAP_SAND = [0xe6d098, 0xecd8a2, 0xa6a296, 0x4e4648, 0xb4aa86].map(abgr);
const MAP_ROCK = abgr(0x8a8476);
const MAP_EDGE = abgr(0x15161c);
const MAP_REEF = abgr(0x5a9a8a);

export function renderMapTile(lod: number, tx: number, ty: number): Uint8ClampedArray {
  const buf = new Uint8ClampedArray(MAP_TILE * MAP_TILE * 4);
  const px = new Uint32Array(buf.buffer);
  const span = MAP_TILE * lod;
  const x0 = tx * span;
  const y0 = ty * span;
  const step = 8;
  const bgN = MAP_TILE / step + 1;
  const bg = new Uint8Array(bgN * bgN);
  for (let j = 0; j < bgN; j++) for (let i = 0; i < bgN; i++) {
    biomeWeights(x0 + i * step * lod, y0 + j * step * lod, wW);
    bg[j * bgN + i] = argmax5(wW);
  }
  for (let j = 0; j < MAP_TILE; j++) {
    for (let i = 0; i < MAP_TILE; i++) {
      const wx = x0 + (i + 0.5) * lod;
      const wy = y0 + (j + 0.5) * lod;
      if (wx < EDGE_MARGIN || wy < EDGE_MARGIN || wx > WORLD_SIZE - EDGE_MARGIN || wy > WORLD_SIZE - EDGE_MARGIN) {
        px[j * MAP_TILE + i] = MAP_EDGE;
        continue;
      }
      const b = bg[((j / step) | 0) * bgN + ((i / step) | 0)];
      px[j * MAP_TILE + i] = MAP_WATER[b];
    }
  }
  if (lod <= 16) {
    for (let j = 0; j < MAP_TILE; j += 1) for (let i = 0; i < MAP_TILE; i += 1) {
      const wx = x0 + (i + 0.5) * lod;
      const wy = y0 + (j + 0.5) * lod;
      const b = bg[((j / step) | 0) * bgN + ((i / step) | 0)];
      const rf = reefField(wx, wy, b);
      if (rf > 0.3) px[j * MAP_TILE + i] = b === B_FROST ? MAP_LAND[2] : MAP_REEF;
      else if (rf > -0.25) px[j * MAP_TILE + i] = MAP_SHALLOW[b];
    }
  }
  islandsInRect(x0, y0, x0 + span, y0 + span, mapIslands);
  for (const isl of mapIslands) {
    const b = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
    const pr = isl.r / lod;
    const cxp = (isl.x - x0) / lod;
    const cyp = (isl.y - y0) / lod;
    if (pr < 1.6) {
      const ix = Math.floor(cxp);
      const iy = Math.floor(cyp);
      const c = isl.type === I_STACK || isl.type === I_CRAG ? MAP_ROCK : MAP_LAND[b];
      for (let oy = 0; oy < (pr > 0.8 ? 2 : 1); oy++) for (let ox = 0; ox < (pr > 0.8 ? 2 : 1); ox++) {
        const x = ix + ox;
        const y = iy + oy;
        if (x >= 0 && y >= 0 && x < MAP_TILE && y < MAP_TILE) px[y * MAP_TILE + x] = c;
      }
      continue;
    }
    const ext = isl.rinf / lod;
    const i0 = Math.max(0, Math.floor(cxp - ext));
    const i1 = Math.min(MAP_TILE - 1, Math.ceil(cxp + ext));
    const j0 = Math.max(0, Math.floor(cyp - ext));
    const j1 = Math.min(MAP_TILE - 1, Math.ceil(cyp + ext));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const wx = x0 + (i + 0.5) * lod;
        const wy = y0 + (j + 0.5) * lod;
        const h = islandHeight(isl, wx, wy);
        const o = j * MAP_TILE + i;
        if (h > 0) {
          const t = landType(isl, h, wx, wy);
          px[o] = t === T_SAND ? MAP_SAND[b] : t === T_ROCK || t === T_PEAK ? MAP_ROCK : t === T_SNOW ? MAP_LAND[2] : MAP_LAND[b];
        } else if (h > -26 && px[o] !== MAP_LAND[b] && px[o] !== MAP_SAND[b] && px[o] !== MAP_ROCK) px[o] = MAP_SHALLOW[b];
      }
    }
  }
  return buf;
}

