import { WORLD_SEED, hash2, noise2, fbm } from '../core/rng';
import { Art, Swap, pixels } from '../art/palette';
import { TEX, LAND_RAMPS, WATER_RAMPS, REEF_RAMPS, REEF_TILES, DOCK_TEX, texTone } from '../art/terrain';
import { PALM, TREE, JUNGLE_TREE, PINE, SNOW_PINE, DEAD_TREE, BUSH, BERRY_BUSH, TUFT, FLOWERS, ROCK, BOULDER, REEDS, MUSHROOMS, SHELL, SKULL_ROCK, ICE_SHARD, HOUSES, ROOFS, FORT, FORT_FLAG } from '../art/world';
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

const BAYER4 = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)];

const GRID = 2;
const MARGIN = 24;
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


const RAMP_A: Record<string, number[][]> = {};
for (const k in LAND_RAMPS) RAMP_A[k] = LAND_RAMPS[k].map((r) => r.map((c) => abgr(c)));
const ICE_A = LAND_RAMPS.ice[0].map((c) => abgr(c));
const REEF_A = REEF_RAMPS.map((r) => r.map((c) => abgr(c)));
const SHADED = new Set([T_GRASS, T_FOREST, T_ROCK, T_PEAK, T_SNOW]);

function landColor(t: number, biome: number, wx: number, wy: number, slope: number, hd: number): number {
  let key = 'sand';
  let tex = TEX.sand;
  switch (t) {
    case T_GRASS: key = 'grass'; tex = TEX.grass; break;
    case T_FOREST: key = 'forest'; tex = TEX.forest; break;
    case T_ROCK: key = 'rock'; tex = TEX.rock; break;
    case T_PEAK: key = 'peak'; tex = TEX.rock; break;
    case T_SNOW: key = 'snow'; tex = TEX.snow; break;
    case T_LAVA: key = 'lava'; tex = TEX.lava; break;
    case T_SWAMP: key = 'swamp'; tex = TEX.swamp; break;
    case T_ICE: key = 'ice'; tex = TEX.ice; break;
  }
  const ramps = RAMP_A[key];
  const ramp = ramps[biome] ?? ramps[0];
  let tone = texTone(tex, wx, wy);
  if (SHADED.has(t)) {
    if (slope > 1.2) tone++;
    else if (slope < -1.2) tone--;
  }
  if (t === T_SAND && hd < 1.6) tone = 1;
  return ramp[tone < 1 ? 0 : tone > 4 ? 3 : tone - 1];
}

function waterRamp(w: Float32Array): number[] {
  const out: number[] = [];
  for (let k = 0; k < 5; k++) {
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < 5; i++) {
      const c = WATER_RAMPS[i][k];
      r += ((c >> 16) & 255) * w[i];
      g += ((c >> 8) & 255) * w[i];
      b += (c & 255) * w[i];
    }
    out.push((Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b));
  }
  const deep = out[0];
  const darker = (Math.round(((deep >> 16) & 255) * 0.86) << 16) | (Math.round(((deep >> 8) & 255) * 0.86) << 8) | Math.round((deep & 255) * 0.86);
  return [darker, ...out].map((c) => abgr(c));
}

const EDGE_A = abgr(0x14161e);
const EDGE_B = abgr(0x1a1c26);

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
  const wr = waterRamp(wW);
  const rr = REEF_A[chunkBiome];
  const reefPossible = fbm((x0 + 128) / 1400, (y0 + 128) / 1400, WORLD_SEED + 21, 3) > 0.38;
  const edgeChunk = x0 < EDGE_MARGIN + CHUNK || y0 < EDGE_MARGIN + CHUNK || x0 + CHUNK > WORLD_SIZE - EDGE_MARGIN - CHUNK || y0 + CHUNK > WORLD_SIZE - EDGE_MARGIN - CHUNK;
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
      nGrid[g] = edgeChunk ? noise2(wx / 14, wy / 14, WORLD_SEED + 5) : 0;
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
          px[o] = wr[3];
          continue;
        }
        const t = landType(isl, hd, wx, wy);
        types[o] = t;
        const biome = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
        px[o] = landColor(t, biome, wx, wy, h00 - h11, hd);
      } else {
        const reef = (rGrid[g] * (1 - fx) + rGrid[g + 1] * fx) * (1 - fy) + (rGrid[g + GN] * (1 - fx) + rGrid[g + GN + 1] * fx) * fy;
        const t = waterType(hd, reef, frost);
        types[o] = t;
        if (t === T_REEF) {
          const rh = Math.imul(wx >> 4, 73856093) ^ Math.imul(wy >> 4, 19349663);
          px[o] = rr[texTone(REEF_TILES[rh & 3], rh & 4 ? 15 - (wx & 15) : wx, wy) - 1];
        }
        else if (t === T_ICE) px[o] = ICE_A[texTone(TEX.ice, wx, wy) - 1];
        else {
          const sh = hd + (bay - 0.5) * 7;
          const tex = sh > -3 ? TEX.foam : sh > -28 || reef > -0.25 ? TEX.shallow : sh > -90 ? TEX.ocean : TEX.deep;
          px[o] = wr[texTone(tex, wx, wy)];
        }
      }
    }
  }
  decorate(x0, y0, px, types);
  for (let k = 0; k < nI; k++) {
    const isl = chunkIslands[k];
    if (isl.port) drawTown(isl, x0, y0, px, types, lights);
  }
  return { pixels: buf, types, lights };
}

interface Deco {
  art: Art;
  block: number;
}

const D = (a: Art, block: number): Deco => ({ art: a, block });
const DECO = {
  palm: D(PALM, 1),
  tree: D(TREE, 1),
  jungle: D(JUNGLE_TREE, 1),
  pine: D(PINE, 1),
  snowPine: D(SNOW_PINE, 1),
  dead: D(DEAD_TREE, 1),
  bush: D(BUSH, 0),
  berry: D(BERRY_BUSH, 0),
  tuft: D(TUFT, 0),
  flowers: D(FLOWERS, 0),
  rock: D(ROCK, 0),
  boulder: D(BOULDER, 2),
  reeds: D(REEDS, 0),
  mushrooms: D(MUSHROOMS, 0),
  shell: D(SHELL, 0),
  skull: D(SKULL_ROCK, 2),
  ice: D(ICE_SHARD, 2)
};

const FOLIAGE: (Swap | undefined)[] = [
  undefined,
  { h: 0x4aa850, H: 0x96dc6a },
  { h: 0x3e6a54, H: 0x5a8a6e, G: 0x2a4a3a, g: 0x1a3226 },
  { h: 0x5e5236, H: 0x7a6a46, G: 0x463c2a, g: 0x2e2618 },
  { h: 0x3e6a44, H: 0x5e8a5a, G: 0x2a4a32, g: 0x18301e }
];

const pxCache = new Map<string, Uint32Array>();
function artPx(a: Art, swap: Swap | undefined, key: string): Uint32Array {
  let p = pxCache.get(key);
  if (!p) {
    p = pixels(a, swap);
    pxCache.set(key, p);
  }
  return p;
}

function decorate(x0: number, y0: number, px: Uint32Array, types: Uint8Array): void {
  const C = 9;
  const cx0 = Math.floor((x0 - MARGIN) / C);
  const cy0 = Math.floor((y0 - 2) / C);
  const cx1 = Math.floor((x0 + CHUNK + MARGIN) / C);
  const cy1 = Math.floor((y0 + CHUNK + MARGIN) / C);
  for (let gy = cy0; gy <= cy1; gy++) {
    for (let gx = cx0; gx <= cx1; gx++) {
      const hsh = hash2(gx, gy, WORLD_SEED + 31);
      const roll = (hsh & 0xffff) / 65536;
      if (roll > 0.8) continue;
      const ax = gx * C + ((hsh >>> 16) & 7);
      const ay = gy * C + ((hsh >>> 19) & 7);
      const lx = ax - x0;
      const ly = ay - y0;
      const gi = Math.round((lx + MARGIN) / GRID);
      const gj = Math.round((ly + MARGIN) / GRID);
      if (gi < 0 || gj < 0 || gi >= GN || gj >= GN) continue;
      const g = gj * GN + gi;
      const hd = hGrid[g];
      if (hd <= 2) continue;
      const isl = chunkIslands[iGrid[g]];
      if (!isl) continue;
      const t = landType(isl, hd, ax, ay);
      const biome = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
      const tropic = biome <= B_CORAL;
      let d: Deco | null = null;
      const r2 = ((hsh >>> 22) & 0x3ff) / 1024;
      if (t === T_FOREST) {
        if (roll < 0.55) {
          if (biome === B_FROST) d = r2 < 0.35 ? DECO.snowPine : DECO.pine;
          else if (biome === B_ASHEN) d = r2 < 0.75 ? DECO.dead : DECO.bush;
          else if (biome === B_MIST) d = r2 < 0.25 ? DECO.dead : r2 < 0.7 ? DECO.tree : DECO.jungle;
          else if (isl.type === I_JUNGLE) d = r2 < 0.2 ? DECO.palm : DECO.jungle;
          else d = r2 < 0.25 ? DECO.palm : r2 < 0.45 ? DECO.jungle : DECO.tree;
        } else if (roll < 0.66) d = r2 < 0.3 && tropic ? DECO.berry : DECO.bush;
        else if (roll < 0.7 && biome === B_MIST) d = DECO.mushrooms;
      } else if (t === T_GRASS) {
        if (roll < 0.06) d = biome === B_FROST ? DECO.pine : biome === B_ASHEN ? DECO.dead : tropic ? (r2 < 0.5 ? DECO.palm : DECO.tree) : DECO.tree;
        else if (roll < 0.12) d = r2 < 0.25 && tropic ? DECO.berry : DECO.bush;
        else if (roll < 0.24) d = DECO.tuft;
        else if (roll < 0.29 && biome !== B_ASHEN && biome !== B_FROST) d = DECO.flowers;
        else if (roll < 0.31) d = DECO.rock;
      } else if (t === T_SAND) {
        if (roll < 0.05 && tropic && hd > 5 && isl.type !== I_GLACIER) d = DECO.palm;
        else if (roll < 0.07) d = DECO.rock;
        else if (roll < 0.1 && tropic) d = DECO.shell;
      } else if (t === T_ROCK) {
        if (roll < 0.07) d = DECO.boulder;
        else if (roll < 0.16) d = DECO.rock;
        else if (roll < 0.19 && isl.type === I_SKULL) d = DECO.skull;
      } else if (t === T_SNOW) {
        if (roll < 0.06) d = DECO.snowPine;
        else if (roll < 0.1) d = DECO.ice;
        else if (roll < 0.13) d = DECO.rock;
      } else if (t === T_SWAMP) {
        if (roll < 0.24) d = DECO.reeds;
        else if (roll < 0.3) d = DECO.dead;
        else if (roll < 0.36) d = DECO.mushrooms;
      }
      if (isl.type === I_SKULL && t === T_GRASS && roll < 0.05) d = DECO.skull;
      if (!d) continue;
      const a = d.art;
      const sw = FOLIAGE[biome];
      stamp(artPx(a, sw, `${biome}:${a.rows[0]}${a.h}${a.w}`), a, lx - (a.w >> 1), ly - a.h + 1, px, types, d.block);
    }
  }
}

function stamp(p: Uint32Array, a: Art, sx: number, sy: number, px: Uint32Array, types: Uint8Array, block: number, blockAll = false): void {
  for (let y = 0; y < a.h; y++) {
    const ty = sy + y;
    if (ty < 0 || ty >= CHUNK) continue;
    const row = a.rows[y];
    for (let x = 0; x < a.w; x++) {
      const tx = sx + x;
      if (tx < 0 || tx >= CHUNK) continue;
      const ch = row[x];
      if (ch === '.') continue;
      const o = ty * CHUNK + tx;
      if (ch === ',') {
        px[o] = darken(px[o], 0.62);
        continue;
      }
      px[o] = p[y * a.w + x];
      if (blockAll) types[o] = T_HOUSE;
      else if (block === 1 && (ch === 'J' || ch === 'j') && y >= a.h - 6) types[o] = T_TREE;
      else if (block === 2 && y >= a.h - 4) types[o] = T_TREE;
    }
  }
}

function darken(c: number, f: number): number {
  return (0xff000000 | ((((c >> 16) & 255) * f) << 16) | ((((c >> 8) & 255) * f) << 8) | ((c & 255) * f)) >>> 0;
}

const TOWN_A = LAND_RAMPS.town[0].map((c) => abgr(c));
const DOCK_PX = pixels(DOCK_TEX);
const POST = abgr(0x3a2214);
const POST_K = abgr(0x1b1220);

function drawTown(isl: Island, x0: number, y0: number, px: Uint32Array, types: Uint8Array, lights: number[]): void {
  const L = portLayout(isl);
  if (!L) return;
  const minX = Math.min(L.dockX1, L.townX) - 220;
  const maxX = Math.max(L.dockX1, L.townX) + 220;
  const minY = Math.min(L.dockY1, L.townY) - 220;
  const maxY = Math.max(L.dockY1, L.townY) + 220;
  if (maxX < x0 || minX > x0 + CHUNK || maxY < y0 || minY > y0 + CHUNK) return;
  for (let p = 0; p < L.paths.length; p += 4) {
    line(L.paths[p] - x0, L.paths[p + 1] - y0, L.paths[p + 2] - x0, L.paths[p + 3] - y0, 1, (x, y) => {
      const o = y * CHUNK + x;
      const t = types[o];
      if (t >= T_SAND && t <= T_SWAMP && t !== T_PEAK) {
        types[o] = T_TOWN;
        px[o] = TOWN_A[texTone(TEX.town, x + x0, y + y0) - 1];
      }
    });
  }
  const dx = L.dirX;
  const dy = L.dirY;
  const len = Math.hypot(L.dockX1 - L.dockX0, L.dockY1 - L.dockY0);
  const bx0 = Math.floor(Math.min(L.dockX0, L.dockX1) - 8 - x0);
  const bx1 = Math.ceil(Math.max(L.dockX0, L.dockX1) + 8 - x0);
  const by0 = Math.floor(Math.min(L.dockY0, L.dockY1) - 8 - y0);
  const by1 = Math.ceil(Math.max(L.dockY0, L.dockY1) + 8 - y0);
  for (let y = Math.max(0, by0); y <= Math.min(CHUNK - 1, by1); y++) {
    for (let x = Math.max(0, bx0); x <= Math.min(CHUNK - 1, bx1); x++) {
      const rx = x + x0 - L.dockX0;
      const ry = y + y0 - L.dockY0;
      const along = rx * dx + ry * dy;
      const across = -rx * dy + ry * dx;
      if (along < 0 || along > len || across < -5.5 || across > 5.5) continue;
      const o = y * CHUNK + x;
      if (Math.abs(across) > 4.5) {
        const k = Math.floor(along) & 7;
        if (k < 2) {
          px[o] = k === 0 ? POST_K : POST;
          types[o] = T_DOCK;
        } else if (types[o] <= T_FOAM) px[o] = darken(px[o], 0.7);
        continue;
      }
      types[o] = T_DOCK;
      px[o] = DOCK_PX[(Math.floor(along) & 7) * 8 + (Math.floor(across + 4.5) & 7)];
    }
  }
  const faction = isl.port!.faction;
  for (const h of L.houses) {
    const hx = h.x - x0;
    const hy = h.y - y0;
    if (hx + h.w + 2 < 0 || hy + h.h + 2 < 0 || hx > CHUNK || hy > CHUNK) continue;
    if (h.kind === 1) stamp(artPx(FORT, FORT_FLAG[faction], `fort${faction}`), FORT, hx, hy, px, types, 0, true);
    else {
      const v = h.color >> 4;
      const art = HOUSES[v];
      const roof = h.color & 15;
      stamp(artPx(art, ROOFS[roof], `house${v}:${roof}`), art, hx, hy, px, types, 0, true);
    }
  }
  for (let i = 0; i < L.lights.length; i += 2) {
    const lx = L.lights[i] - x0;
    const ly = L.lights[i + 1] - y0;
    if (lx >= 0 && ly >= 0 && lx < CHUNK && ly < CHUNK) lights.push(L.lights[i], L.lights[i + 1]);
  }
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

