import { WORLD_SEED, hash2, noise2, fbm } from '../core/rng';
import { Art, Swap, pixels } from '../art/palette';
import { LAVA_TILE, LAND_RAMPS, WATER_STOPS, REEF_TINT, DOCK_TEX } from '../art/terrain';
import { OBJS, ObjDef, DECO, BLOCK_TREE, BLOCK_HOUSE, houseId, fortId } from './objects';
import {
  CHUNK, WORLD_SIZE, Island, islandsInRect, islandHeight, reefField, reefOut, reefThreshold, biomeWeights, beachWidth, portLayout, heightAt, HeightSample,
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
  const reef = reefField(x, y, reefThreshold(wW));
  return waterType(sample.h, reef, biome === B_FROST);
}

function argmax5(w: Float32Array): number {
  let b = 0;
  for (let i = 1; i < 5; i++) if (w[i] > w[b]) b = i;
  return b;
}

const GRID = 2;
const MARGIN = 24;
const GN = (CHUNK + MARGIN * 2) / GRID + 1;

export interface ChunkResult {
  pixels: Uint8ClampedArray;
  types: Uint8Array;
  lights: number[];
  occ: number[];
}

const chunkIslands: Island[] = [];
const hGrid = new Float32Array(GN * GN);
const iGrid = new Int16Array(GN * GN);
const rGrid = new Float32Array(GN * GN);
const nGrid = new Float32Array(GN * GN);
const pGrid = new Float32Array(GN * GN);
const mGrid = new Float32Array(GN * GN);
const bGrid = new Float32Array(GN * GN);


const RAMP_A: Record<string, number[][]> = {};
for (const k in LAND_RAMPS) RAMP_A[k] = LAND_RAMPS[k].map((r) => r.map((c) => abgr(c)));
const ICE_A = RAMP_A.ice[0];
const LAVA_A = RAMP_A.lava[0];
const LAND_KEY: Record<number, string> = { [T_SAND]: 'sand', [T_GRASS]: 'grass', [T_FOREST]: 'forest', [T_ROCK]: 'rock', [T_PEAK]: 'peak', [T_SNOW]: 'snow', [T_SWAMP]: 'swamp' };

function landColor(t: number, biome: number, wx: number, wy: number, slope: number, hd: number, p: number): number {
  if (t === T_LAVA) return LAVA_A[LAVA_TILE.rows[wy & 15].charCodeAt(wx & 15) - 49];
  const ramps = RAMP_A[LAND_KEY[t] ?? 'sand'];
  const ramp = ramps[biome] ?? ramps[0];
  if (t === T_SAND) return ramp[hd < 1.6 ? 0 : p > 0.64 ? 2 : 1];
  let tone = p < 0.34 ? 0 : p > 0.64 ? 2 : 1;
  if (t === T_ROCK || t === T_PEAK || t === T_SNOW) {
    if (slope > 1.2) tone = 3;
    else if (slope < -1.2) tone = 0;
  }
  return ramp[tone];
}

const BANDS = 12;

function bandPalette(w: Float32Array, out: Float32Array): void {
  const st: number[][] = [];
  for (let k = 0; k < 5; k++) {
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < 5; i++) {
      const c = WATER_STOPS[i][k];
      r += ((c >> 16) & 255) * w[i];
      g += ((c >> 8) & 255) * w[i];
      b += (c & 255) * w[i];
    }
    st.push([r, g, b]);
  }
  const [deep, ocean, shallow, light, foam] = st;
  const put = (i: number, a: number[], b: number[], f: number) => {
    for (let c = 0; c < 3; c++) out[i * 3 + c] = a[c] + (b[c] - a[c]) * f;
  };
  put(0, foam, foam, 0);
  for (let k = 0; k < 4; k++) put(1 + k, light, shallow, k / 4);
  for (let k = 0; k < 3; k++) put(5 + k, shallow, ocean, k / 3);
  for (let k = 0; k < 3; k++) put(8 + k, ocean, deep, k / 3);
  put(11, deep, deep, 0);
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const DITHER = 0.4;

function dith(pos: number, th: number, max: number): number {
  let b = Math.floor(pos);
  const f = pos - b;
  if (b < max && f > 1 - DITHER && th < (f - (1 - DITHER)) / DITHER) b++;
  return b;
}

function bandOf(d: number, th: number): number {
  if (d < 2.2) return 0;
  if (d < 28) return dith(1 + ((d - 2.2) / 25.8) * 4, th, 11);
  if (d < 90) return dith(5 + ((d - 28) / 62) * 3, th, 11);
  if (d < 220) return dith(8 + ((d - 90) / 130) * 3, th, 11);
  return 11;
}

const REEF_K = [0, 0.07, 0.15, 0.22, 0.28];

function reefLevel(m: number, th: number): number {
  const pos = m < -0.03 ? (m + 0.06) / 0.03 : m < 0 ? 1 + (m + 0.03) / 0.03 : m < 0.04 ? 2 + m / 0.04 : m < 0.09 ? 3 + (m - 0.04) / 0.05 : 4;
  return REEF_K[dith(pos, th, 4)];
}

const palTL = new Float32Array(BANDS * 3);
const palTR = new Float32Array(BANDS * 3);
const palBL = new Float32Array(BANDS * 3);
const palBR = new Float32Array(BANDS * 3);
const rowL = new Float32Array(BANDS * 3);
const rowR = new Float32Array(BANDS * 3);

const fxc = new Float32Array(CHUNK).map((_, i) => i / CHUNK);
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
  biomeWeights(x0, y0, wW);
  bandPalette(wW, palTL);
  const thTL = reefThreshold(wW);
  biomeWeights(x0 + CHUNK, y0, wW);
  bandPalette(wW, palTR);
  const thTR = reefThreshold(wW);
  biomeWeights(x0, y0 + CHUNK, wW);
  bandPalette(wW, palBL);
  const thBL = reefThreshold(wW);
  biomeWeights(x0 + CHUNK, y0 + CHUNK, wW);
  bandPalette(wW, palBR);
  const thBR = reefThreshold(wW);
  biomeWeights(x0 + CHUNK / 2, y0 + CHUNK / 2, wW);
  const chunkBiome = argmax5(wW);
  const frost = chunkBiome === B_FROST;
  const tint = REEF_TINT[chunkBiome];
  const tR = (tint >> 16) & 255;
  const tG = (tint >> 8) & 255;
  const tB = tint & 255;
  const reefPossible = fbm((x0 + 128) / 1400, (y0 + 128) / 1400, WORLD_SEED + 21, 3) > 0.38;
  const edgeChunk = x0 < EDGE_MARGIN + CHUNK || y0 < EDGE_MARGIN + CHUNK || x0 + CHUNK > WORLD_SIZE - EDGE_MARGIN - CHUNK || y0 + CHUNK > WORLD_SIZE - EDGE_MARGIN - CHUNK;
  const waterPx = (band: number, i: number) => {
    const b = band * 3;
    const f = fxc[i];
    return (0xff000000 | ((rowL[b + 2] + (rowR[b + 2] - rowL[b + 2]) * f) << 16) | ((rowL[b + 1] + (rowR[b + 1] - rowL[b + 1]) * f) << 8) | (rowL[b] + (rowR[b] - rowL[b]) * f)) >>> 0;
  };
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
      if (reefPossible && best < -3) {
        const u = (wx - x0) / CHUNK;
        const v = (wy - y0) / CHUNK;
        rGrid[g] = reefField(wx, wy, (thTL + (thTR - thTL) * u) * (1 - v) + (thBL + (thBR - thBL) * u) * v);
        mGrid[g] = reefOut.margin;
        bGrid[g] = reefOut.base > -0.6 ? reefOut.base + (noise2(wx / 70, wy / 70, WORLD_SEED + 9) - 0.5) * 0.16 : reefOut.base;
      } else {
        rGrid[g] = -1;
        mGrid[g] = -1;
        bGrid[g] = -9;
      }
      nGrid[g] = edgeChunk ? noise2(wx / 14, wy / 14, WORLD_SEED + 5) : 0;
      pGrid[g] = best > -2 ? noise2(wx / 46, wy / 46, WORLD_SEED + 7) * 0.68 + noise2(wx / 13, wy / 13, WORLD_SEED + 8) * 0.32 : 0.5;
    }
  }
  const edge = x0 < EDGE_MARGIN || y0 < EDGE_MARGIN || x0 + CHUNK > WORLD_SIZE - EDGE_MARGIN || y0 + CHUNK > WORLD_SIZE - EDGE_MARGIN;
  for (let j = 0; j < CHUNK; j++) {
    const vy = j / CHUNK;
    for (let k = 0; k < BANDS * 3; k++) {
      rowL[k] = palTL[k] + (palBL[k] - palTL[k]) * vy;
      rowR[k] = palTR[k] + (palBR[k] - palTR[k]) * vy;
    }
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
      if (edge && (wx < EDGE_MARGIN || wy < EDGE_MARGIN || wx > WORLD_SIZE - EDGE_MARGIN || wy > WORLD_SIZE - EDGE_MARGIN)) {
        types[o] = T_EDGE;
        px[o] = nz > 0.62 ? EDGE_B : EDGE_A;
        continue;
      }
      if (hd > 0) {
        const isl = chunkIslands[iGrid[fx < 0.5 ? (fy < 0.5 ? g : g + GN) : fy < 0.5 ? g + 1 : g + GN + 1]] ?? chunkIslands[iGrid[g]];
        if (!isl) {
          types[o] = T_SHALLOW;
          px[o] = waterPx(1, i);
          continue;
        }
        const t = landType(isl, hd, wx, wy);
        types[o] = t;
        const biome = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
        const p = (pGrid[g] * (1 - fx) + pGrid[g + 1] * fx) * (1 - fy) + (pGrid[g + GN] * (1 - fx) + pGrid[g + GN + 1] * fx) * fy;
        px[o] = landColor(t, biome, wx, wy, h00 - h11, hd, p);
      } else {
        const reef = (rGrid[g] * (1 - fx) + rGrid[g + 1] * fx) * (1 - fy) + (rGrid[g + GN] * (1 - fx) + rGrid[g + GN + 1] * fx) * fy;
        const t = waterType(hd, reef, frost);
        types[o] = t;
        const m = reef > -0.6 ? (mGrid[g] * (1 - fx) + mGrid[g + 1] * fx) * (1 - fy) + (mGrid[g + GN] * (1 - fx) + mGrid[g + GN + 1] * fx) * fy : -1;
        if (t === T_ICE) {
          px[o] = ICE_A[m < 0.03 ? 0 : m > 0.1 ? 2 : 1];
          continue;
        }
        let d = -hd;
        const bs = (bGrid[g] * (1 - fx) + bGrid[g + 1] * fx) * (1 - fy) + (bGrid[g + GN] * (1 - fx) + bGrid[g + GN + 1] * fx) * fy;
        if (bs > -0.3) {
          const rd = 130 - Math.min(1, (bs + 0.3) / 0.45) * 114;
          if (rd < d) d = rd;
        }
        if (reef > 0) {
          const rd = 16 - reef * 10;
          if (rd < d) d = rd;
        }
        const th = BAYER[((wy & 3) << 2) | (wx & 3)];
        const b = bandOf(d, th) * 3;
        let r = rowL[b] + (rowR[b] - rowL[b]) * fxc[i];
        let gg = rowL[b + 1] + (rowR[b + 1] - rowL[b + 1]) * fxc[i];
        let bb = rowL[b + 2] + (rowR[b + 2] - rowL[b + 2]) * fxc[i];
        if (!frost && m > -0.06) {
          const k = reefLevel(m, th);
          r += (tR - r) * k;
          gg += (tG - gg) * k;
          bb += (tB - bb) * k;
        }
        px[o] = (0xff000000 | ((bb | 0) << 16) | ((gg | 0) << 8) | (r | 0)) >>> 0;
      }
    }
  }
  for (let k = 0; k < nI; k++) {
    const isl = chunkIslands[k];
    if (isl.port) drawTownGround(isl, x0, y0, px, types, lights);
  }
  const occ: number[] = [];
  placeObjects(x0, y0, px, types, occ);
  return { pixels: buf, types, lights, occ };
}

interface Place {
  id: number;
  x: number;
  y: number;
  by: number;
}

const places: Place[] = [];
const decoIslands: Island[] = [];
const townRects: number[] = [];
const townPaths: number[] = [];
const townCircles: number[] = [];
const pxCache = new Map<number, Uint32Array>();

function objPx(id: number): Uint32Array {
  let p = pxCache.get(id);
  if (!p) {
    p = pixels(OBJS[id].art, OBJS[id].swap);
    pxCache.set(id, p);
  }
  return p;
}

const anchor = { hd: 0, isl: null as Island | null };
function sampleAnchor(x: number, y: number): void {
  let best = -100000;
  let bi: Island | null = null;
  for (const isl of decoIslands) {
    const h = islandHeight(isl, x, y);
    if (h > best) {
      best = h;
      bi = isl;
    }
  }
  anchor.hd = best;
  anchor.isl = bi;
}

function inTown(x: number, y: number): boolean {
  for (let i = 0; i < townRects.length; i += 4) if (x >= townRects[i] && x < townRects[i + 2] && y >= townRects[i + 1] && y < townRects[i + 3]) return true;
  for (let i = 0; i < townPaths.length; i += 4) {
    const ax = townPaths[i], ay = townPaths[i + 1], bx = townPaths[i + 2], by = townPaths[i + 3];
    const dx = bx - ax, dy = by - ay;
    const l2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2));
    const ex = ax + dx * t - x, ey = ay + dy * t - y;
    if (ex * ex + ey * ey < 36) return true;
  }
  return false;
}

function bigDeco(t: number, biome: number, isl: Island, hd: number, roll: number, r2: number): string | null {
  const tropic = biome <= B_CORAL;
  if (t === T_FOREST) {
    if (roll > 0.74) return null;
    if (biome === B_FROST) return r2 < 0.35 ? 'snowPine' : 'pine';
    if (biome === B_ASHEN) return r2 < 0.8 ? 'dead' : null;
    if (biome === B_MIST) return r2 < 0.25 ? 'dead' : r2 < 0.75 ? 'tree' : 'jungle';
    if (isl.type === I_JUNGLE) return r2 < 0.2 ? 'palm' : 'jungle';
    return r2 < 0.22 ? 'palm' : r2 < 0.45 ? 'jungle' : 'tree';
  }
  if (t === T_GRASS) {
    if (isl.type === I_SKULL && roll < 0.04) return 'skull';
    if (roll < 0.07) return biome === B_FROST ? 'pine' : biome === B_ASHEN ? 'dead' : tropic ? (r2 < 0.5 ? 'palm' : 'tree') : 'tree';
    if (roll < 0.085) return 'boulder';
    return null;
  }
  if (t === T_SAND) return roll < 0.06 && tropic && hd > 5 && isl.type !== I_GLACIER ? 'palm' : null;
  if (t === T_ROCK) return roll < 0.1 ? 'boulder' : roll < 0.14 && isl.type === I_SKULL ? 'skull' : null;
  if (t === T_SNOW) return roll < 0.08 ? 'snowPine' : roll < 0.12 ? 'ice' : null;
  if (t === T_SWAMP) return roll < 0.1 ? 'dead' : null;
  return null;
}

function smallDeco(t: number, biome: number, roll: number, r2: number): string | null {
  const tropic = biome <= B_CORAL;
  if (t === T_FOREST) {
    if (roll < 0.12) return r2 < 0.3 && tropic ? 'berry' : 'bush';
    if (roll < 0.16 && biome === B_MIST) return 'mushrooms';
    return null;
  }
  if (t === T_GRASS) {
    if (roll < 0.04) return r2 < 0.25 && tropic ? 'berry' : 'bush';
    if (roll < 0.15) return 'tuft';
    if (roll < 0.19 && biome !== B_ASHEN && biome !== B_FROST) return 'flowers';
    if (roll < 0.21) return 'rock';
    return null;
  }
  if (t === T_SAND) return roll < 0.03 ? 'rock' : roll < 0.05 && tropic ? 'shell' : null;
  if (t === T_ROCK) return roll < 0.1 ? 'rock' : null;
  if (t === T_SNOW) return roll < 0.05 ? 'rock' : null;
  if (t === T_SWAMP) return roll < 0.2 ? 'reeds' : roll < 0.26 ? 'mushrooms' : null;
  return null;
}

function scatter(x0: number, y0: number, C: number, jit: number, padX: number, padY: number, seed: number, big: boolean): void {
  const cx0 = Math.floor((x0 - padX) / C);
  const cx1 = Math.floor((x0 + CHUNK + padX) / C);
  const cy0 = Math.floor(y0 / C) - 1;
  const cy1 = Math.floor((y0 + CHUNK + padY) / C);
  for (let gy = cy0; gy <= cy1; gy++) {
    for (let gx = cx0; gx <= cx1; gx++) {
      const hsh = hash2(gx, gy, WORLD_SEED + seed);
      const roll = (hsh & 0xffff) / 65536;
      if (roll > 0.8) continue;
      const ax = gx * C + ((hsh >>> 16) % jit);
      const ay = gy * C + ((hsh >>> 24) % jit);
      sampleAnchor(ax, ay);
      const isl = anchor.isl;
      const hd = anchor.hd;
      if (!isl || hd <= 2) continue;
      const t = landType(isl, hd, ax, ay);
      const biome = isl.type === I_GLACIER ? B_FROST : isl.type === I_VOLCANO ? B_ASHEN : isl.biome;
      const r2 = ((hsh >>> 8) & 0xff) / 256;
      const name = big ? bigDeco(t, biome, isl, hd, roll, r2) : smallDeco(t, biome, roll, r2);
      if (!name) continue;
      if (inTown(ax, ay)) continue;
      if (big && roll > 0.025) {
        let near = false;
        for (let i = 0; i < townCircles.length; i += 3) {
          const dx = ax - townCircles[i];
          const dy = ay - townCircles[i + 1];
          if (dx * dx + dy * dy < townCircles[i + 2]) near = true;
        }
        if (near) continue;
      }
      const id = DECO[name][biome] ?? DECO[name][0];
      const a = OBJS[id].art;
      const x = ax - (a.w >> 1);
      const y = ay - a.h + 1;
      if (x > x0 + CHUNK || x + a.w < x0 || y > y0 + CHUNK || ay < y0) continue;
      places.push({ id, x, y, by: ay });
    }
  }
}

function townPlaces(x0: number, y0: number): void {
  townRects.length = 0;
  townPaths.length = 0;
  townCircles.length = 0;
  islandsInRect(x0 - 320, y0 - 320, x0 + CHUNK + 320, y0 + CHUNK + 320, decoIslands);
  for (const isl of decoIslands) {
    if (!isl.port) continue;
    const L = portLayout(isl);
    if (!L) continue;
    const faction = isl.port.faction;
    const tr = 80 + isl.port.size * 45;
    townCircles.push(L.townX, L.townY, tr * tr);
    for (const h of L.houses) {
      townRects.push(h.x - 6, h.y + Math.round(h.h * 0.3), h.x + h.w + 6, h.y + h.h + 8);
      if (h.x > x0 + CHUNK || h.x + h.w < x0 || h.y > y0 + CHUNK || h.y + h.h < y0) continue;
      const id = h.kind === 1 ? fortId(h.color, faction) : houseId(h.color >> 8, h.color & 15, (h.color >> 4) & 15);
      places.push({ id, x: h.x, y: h.y, by: h.y + h.h - 1 });
    }
    for (let p = 0; p < L.paths.length; p++) townPaths.push(L.paths[p]);
  }
}

function placeObjects(x0: number, y0: number, px: Uint32Array, types: Uint8Array, occ: number[]): void {
  places.length = 0;
  townPlaces(x0, y0);
  islandsInRect(x0 - 40, y0 - 10, x0 + CHUNK + 40, y0 + CHUNK + 60, decoIslands);
  if (decoIslands.length) {
    scatter(x0, y0, 16, 12, 24, 44, 31, true);
    scatter(x0, y0, 10, 8, 12, 16, 47, false);
  }
  places.sort((a, b) => a.by - b.by || a.x - b.x);
  for (const p of places) {
    const o = OBJS[p.id];
    stamp(objPx(p.id), o.art, p.x - x0, p.y - y0, px, types, o);
    if (o.tall) {
      const ax = p.x + (o.art.w >> 1);
      if (ax >= x0 && ax < x0 + CHUNK && p.by >= y0 && p.by < y0 + CHUNK) occ.push(p.id, p.x, p.y);
    }
  }
}

function stamp(p: Uint32Array, a: Art, sx: number, sy: number, px: Uint32Array, types: Uint8Array, o: ObjDef): void {
  const block = o.block === BLOCK_TREE ? T_TREE : o.block === BLOCK_HOUSE ? T_HOUSE : 0;
  for (let y = 0; y < a.h; y++) {
    const ty = sy + y;
    if (ty < 0 || ty >= CHUNK) continue;
    const row = a.rows[y];
    const fy = block && y >= o.fy0 && y < o.fy1;
    for (let x = 0; x < a.w; x++) {
      const tx = sx + x;
      if (tx < 0 || tx >= CHUNK) continue;
      const ch = row[x];
      if (ch === '.') continue;
      const i = ty * CHUNK + tx;
      if (ch === ',') {
        px[i] = darken(px[i], 0.72);
        continue;
      }
      px[i] = p[y * a.w + x];
      if (fy && x >= o.fx0 && x < o.fx1 && types[i] > T_FOAM) types[i] = block;
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

function drawTownGround(isl: Island, x0: number, y0: number, px: Uint32Array, types: Uint8Array, lights: number[]): void {
  const L = portLayout(isl);
  if (!L) return;
  const minX = Math.min(L.dockX1, L.townX) - 360;
  const maxX = Math.max(L.dockX1, L.townX) + 360;
  const minY = Math.min(L.dockY1, L.townY) - 360;
  const maxY = Math.max(L.dockY1, L.townY) + 360;
  if (maxX < x0 || minX > x0 + CHUNK || maxY < y0 || minY > y0 + CHUNK) return;
  for (let p = 0; p < L.paths.length; p += 4) {
    line(L.paths[p] - x0, L.paths[p + 1] - y0, L.paths[p + 2] - x0, L.paths[p + 3] - y0, 2, (x, y) => {
      const o = y * CHUNK + x;
      const t = types[o];
      if (t >= T_SAND && t <= T_SWAMP && t !== T_PEAK) {
        types[o] = T_TOWN;
        px[o] = TOWN_A[1];
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
  const bth = new Float32Array(bgN * bgN);
  for (let j = 0; j < bgN; j++) for (let i = 0; i < bgN; i++) {
    biomeWeights(x0 + i * step * lod, y0 + j * step * lod, wW);
    bg[j * bgN + i] = argmax5(wW);
    bth[j * bgN + i] = reefThreshold(wW);
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
      const bi = ((j / step) | 0) * bgN + ((i / step) | 0);
      const b = bg[bi];
      const rf = reefField(wx, wy, bth[bi]);
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

