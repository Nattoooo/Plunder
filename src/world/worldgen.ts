import { WORLD_SEED, hash2, fbm, RNG, noise2 } from '../core/rng';
import { islandName, portName } from './names';
import { HOUSES, FORTS, WALLS } from '../art/world';

export const UNITS_PER_MILE = 512;
export const WORLD_MILES = 1000;
export const WORLD_SIZE = 512000;
export const CHUNK = 256;
export const CHUNKS = WORLD_SIZE / CHUNK;
export const REGION = 2048;
export const REGIONS = WORLD_SIZE / REGION;
export const CENTER = WORLD_SIZE / 2;
export const MAX_INFLUENCE = 1260;

export const B_SHALLOWS = 0;
export const B_CORAL = 1;
export const B_FROST = 2;
export const B_ASHEN = 3;
export const B_MIST = 4;
export const BIOME_NAMES = ['Emerald Shallows', 'Coral Expanse', 'Frostreach', 'Ashen Reach', 'Mistveil'];

export const I_TROPICAL = 0;
export const I_ATOLL = 1;
export const I_CRAG = 2;
export const I_SANDBAR = 3;
export const I_VOLCANO = 4;
export const I_GLACIER = 5;
export const I_SWAMP = 6;
export const I_JUNGLE = 7;
export const I_SKULL = 8;
export const I_STACK = 9;
export const ISLAND_TYPE_NAMES = ['Tropical Isle', 'Atoll', 'Crag', 'Sandbar', 'Volcanic Isle', 'Glacier', 'Swamp Isle', 'Jungle Isle', 'Skull Isle', 'Sea Stack'];

export const F_CROWN = 0;
export const F_FREE = 1;
export const F_BRETHREN = 2;
export const FACTION_PORT_NAMES = ['Crown Port', 'Free Port', 'Pirate Haven'];

export interface PortInfo {
  name: string;
  faction: number;
  size: number;
}

export interface Island {
  id: number;
  x: number;
  y: number;
  r: number;
  rinf: number;
  wf: number;
  type: number;
  biome: number;
  seed: number;
  level: number;
  name: string;
  port: PortInfo | null;
  claimable: boolean;
}

const START_RX = REGIONS / 2;
const START_RY = REGIONS / 2;
export const START_ISLAND_ID = (START_RX * REGIONS + START_RY) * 16;

export function biomeWeights(x: number, y: number, out: Float32Array): void {
  const dx = x - CENTER;
  const dy = y - CENTER;
  const wx = dx + (fbm(x / 60000, y / 60000, WORLD_SEED + 1, 3) - 0.5) * 110000;
  const wy = dy + (fbm(x / 60000, y / 60000, WORLD_SEED + 2, 3) - 0.5) * 110000;
  const r = Math.sqrt(wx * wx + wy * wy) + 1;
  const t = (r - 42000) / 36000;
  const c = t <= 0 ? 1 : t >= 1 ? 0 : 1 - t * t * (3 - 2 * t);
  let e = wx > 0 ? wx / r : 0;
  let w = wx < 0 ? -wx / r : 0;
  let n = wy < 0 ? -wy / r : 0;
  let s = wy > 0 ? wy / r : 0;
  e = e * e * e * e;
  w = w * w * w * w;
  n = n * n * n * n;
  s = s * s * s * s;
  const sum = e + w + n + s + 1e-6;
  const k = (1 - c) / sum;
  out[0] = c;
  out[1] = e * k;
  out[2] = n * k;
  out[3] = s * k;
  out[4] = w * k;
}

const bw = new Float32Array(5);
export function biomeAt(x: number, y: number): number {
  biomeWeights(x, y, bw);
  let best = 0;
  for (let i = 1; i < 5; i++) if (bw[i] > bw[best]) best = i;
  return best;
}

export function dangerAt(x: number, y: number): number {
  const dx = x - CENTER;
  const dy = y - CENTER;
  const d = Math.sqrt(dx * dx + dy * dy) / 230000;
  const n = (noise2(x / 30000, y / 30000, WORLD_SEED + 9) - 0.5) * 0.12;
  const v = d + n;
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function levelAt(x: number, y: number): number {
  return 1 + Math.min(9, Math.floor(dangerAt(x, y) * 10));
}

function pickType(rng: RNG, biome: number, r: number): number {
  if (r < 70 && rng.chance(0.35)) return I_SANDBAR;
  const roll = rng.next();
  switch (biome) {
    case B_SHALLOWS:
      return roll < 0.55 ? I_TROPICAL : roll < 0.7 ? I_JUNGLE : roll < 0.82 ? I_ATOLL : roll < 0.94 ? I_CRAG : I_SANDBAR;
    case B_CORAL:
      return roll < 0.35 ? I_TROPICAL : roll < 0.65 ? I_ATOLL : roll < 0.8 ? I_JUNGLE : roll < 0.92 ? I_SANDBAR : I_SKULL;
    case B_FROST:
      return roll < 0.5 ? I_GLACIER : roll < 0.8 ? I_CRAG : roll < 0.92 ? I_TROPICAL : I_SKULL;
    case B_ASHEN:
      return roll < 0.45 ? I_VOLCANO : roll < 0.75 ? I_CRAG : roll < 0.9 ? I_SKULL : I_TROPICAL;
    default:
      return roll < 0.4 ? I_SWAMP : roll < 0.65 ? I_JUNGLE : roll < 0.85 ? I_SKULL : I_CRAG;
  }
}

function makeIsland(id: number, x: number, y: number, r: number, type: number, biome: number, seed: number): Island {
  const rng = new RNG(seed ^ 0x5bd1e995);
  return {
    id,
    x,
    y,
    r,
    rinf: r * 1.5 + 140,
    wf: 1.3 / r,
    type,
    biome,
    seed,
    level: levelAt(x, y),
    name: islandName(rng, type),
    port: null,
    claimable: false
  };
}

function genRegion(rx: number, ry: number): Island[] {
  const list: Island[] = [];
  if (rx < 2 || ry < 2 || rx >= REGIONS - 2 || ry >= REGIONS - 2) return list;
  const rng = new RNG(hash2(rx, ry, WORLD_SEED));
  const x0 = rx * REGION;
  const y0 = ry * REGION;
  const cx = x0 + REGION / 2;
  const cy = y0 + REGION / 2;
  const biome = biomeAt(cx, cy);
  const danger = dangerAt(cx, cy);
  const base = (rx * REGIONS + ry) * 16;
  let idx = 0;
  const start = rx === START_RX && ry === START_RY;
  if (start) {
    const isl = makeIsland(base + idx++, x0 + 980, y0 + 1000, 330, I_TROPICAL, B_SHALLOWS, hash2(rx, ry, 777));
    isl.name = 'Haven Isle';
    isl.port = { name: 'Port Haven', faction: F_CROWN, size: 3 };
    isl.level = 1;
    list.push(isl);
    list.push(makeIsland(base + idx++, x0 + 1760, y0 + 320, 90, I_TROPICAL, B_SHALLOWS, hash2(rx, ry, 778)));
    list.push(makeIsland(base + idx++, x0 + 260, y0 + 1800, 60, I_SANDBAR, B_SHALLOWS, hash2(rx, ry, 779)));
    list.push(makeIsland(base + idx++, x0 + 1820, y0 + 1700, 140, I_JUNGLE, B_SHALLOWS, hash2(rx, ry, 780)));
    list[1].claimable = true;
    list[3].claimable = true;
    return list;
  }
  const near = Math.abs(rx - START_RX) <= 1 && Math.abs(ry - START_RY) <= 1;
  const dens = fbm(rx * 0.07, ry * 0.07, WORLD_SEED + 11, 3);
  let count: number;
  const arch = dens > 0.6;
  if (arch) count = rng.int(3, 6);
  else if (dens > 0.44) count = rng.int(1, 3);
  else count = rng.chance(0.6) ? 1 : 0;
  if (near) count = Math.max(count, 1);
  for (let i = 0; i < count; i++) {
    let r = arch ? 40 + Math.pow(rng.next(), 1.8) * 260 : 50 + Math.pow(rng.next(), 2) * 640;
    if (near) r = Math.min(r, 260);
    for (let a = 0; a < 8; a++) {
      const m = Math.min(r, 700);
      const x = x0 + m * 0.4 + rng.next() * (REGION - m * 0.8);
      const y = y0 + m * 0.4 + rng.next() * (REGION - m * 0.8);
      let ok = true;
      for (const o of list) {
        const dx = o.x - x;
        const dy = o.y - y;
        const min = (o.r + r) * 1.05 + 40;
        if (dx * dx + dy * dy < min * min) {
          ok = false;
          break;
        }
      }
      if (ok) {
        list.push(makeIsland(base + idx++, x, y, r, pickType(rng, biome, r), biome, rng.int(1, 0x7fffffff)));
        break;
      }
      r *= 0.85;
    }
  }
  const stacks = rng.chance(biome === B_ASHEN || biome === B_FROST ? 0.6 : 0.35) ? rng.int(1, 5) : 0;
  const sx = x0 + 200 + rng.next() * (REGION - 400);
  const sy = y0 + 200 + rng.next() * (REGION - 400);
  for (let i = 0; i < stacks; i++) {
    const x = sx + (rng.next() - 0.5) * 260;
    const y = sy + (rng.next() - 0.5) * 260;
    let ok = true;
    for (const o of list) {
      const dx = o.x - x;
      const dy = o.y - y;
      const min = o.rinf + 30;
      if (dx * dx + dy * dy < min * min) ok = false;
    }
    if (ok && idx < 16) list.push(makeIsland(base + idx++, x, y, 8 + rng.next() * 14, I_STACK, biome, rng.int(1, 0x7fffffff)));
  }
  const pPort = near ? 0.5 : 0.24 - danger * 0.2;
  if (rng.chance(pPort)) {
    let best: Island | null = null;
    for (const isl of list) {
      if (isl.type === I_STACK || isl.type === I_SANDBAR || isl.type === I_ATOLL || isl.type === I_GLACIER) continue;
      if (isl.r < 150) continue;
      if (!best || isl.r > best.r) best = isl;
    }
    if (best) {
      let faction = F_FREE;
      const fr = rng.next();
      if (biome === B_MIST || biome === B_ASHEN) faction = fr < 0.6 ? F_BRETHREN : fr < 0.85 ? F_FREE : F_CROWN;
      else if (danger < 0.25) faction = fr < 0.55 ? F_CROWN : fr < 0.92 ? F_FREE : F_BRETHREN;
      else faction = fr < 0.35 ? F_CROWN : fr < 0.7 ? F_FREE : F_BRETHREN;
      const prng = new RNG(best.seed ^ 0x1234567);
      best.port = { name: portName(prng, faction), faction, size: best.r > 420 ? 3 : best.r > 260 ? 2 : 1 };
    }
  }
  for (const isl of list) {
    if (!isl.port && isl.type !== I_STACK && isl.type !== I_SANDBAR && isl.r >= 95) isl.claimable = true;
  }
  return list;
}

const regionCache = new Map<number, Island[]>();
const islandById = new Map<number, Island>();

export function regionIslands(rx: number, ry: number): Island[] {
  if (rx < 0 || ry < 0 || rx >= REGIONS || ry >= REGIONS) return EMPTY;
  const key = rx * REGIONS + ry;
  let r = regionCache.get(key);
  if (!r) {
    r = genRegion(rx, ry);
    regionCache.set(key, r);
    for (const isl of r) islandById.set(isl.id, isl);
    if (regionCache.size > 6000) {
      const first = regionCache.keys().next().value as number;
      const old = regionCache.get(first);
      regionCache.delete(first);
      if (old) for (const isl of old) islandById.delete(isl.id);
    }
  }
  return r;
}
const EMPTY: Island[] = [];

export function getIsland(id: number): Island | null {
  const cached = islandById.get(id);
  if (cached) return cached;
  const reg = Math.floor(id / 16);
  const rx = Math.floor(reg / REGIONS);
  const ry = reg % REGIONS;
  for (const isl of regionIslands(rx, ry)) if (isl.id === id) return isl;
  return null;
}

export function islandsInRect(x0: number, y0: number, x1: number, y1: number, out: Island[]): Island[] {
  out.length = 0;
  const rx0 = Math.floor((x0 - MAX_INFLUENCE) / REGION);
  const ry0 = Math.floor((y0 - MAX_INFLUENCE) / REGION);
  const rx1 = Math.floor((x1 + MAX_INFLUENCE) / REGION);
  const ry1 = Math.floor((y1 + MAX_INFLUENCE) / REGION);
  for (let rx = rx0; rx <= rx1; rx++) {
    for (let ry = ry0; ry <= ry1; ry++) {
      const list = regionIslands(rx, ry);
      for (let i = 0; i < list.length; i++) {
        const isl = list[i];
        if (isl.x + isl.rinf < x0 || isl.x - isl.rinf > x1 || isl.y + isl.rinf < y0 || isl.y - isl.rinf > y1) continue;
        out.push(isl);
      }
    }
  }
  return out;
}

export function islandHeight(isl: Island, x: number, y: number): number {
  const dx = x - isl.x;
  const dy = y - isl.y;
  const d2 = dx * dx + dy * dy;
  const ri = isl.rinf;
  if (d2 >= ri * ri) return -100000;
  const d = Math.sqrt(d2);
  const r = isl.r;
  const s = isl.seed;
  const warp = fbm(x * isl.wf, y * isl.wf, s, 3) - 0.5;
  const detail = fbm(x * 0.03, y * 0.03, s + 7, 2) - 0.5;
  const amp = 5 + r * 0.08;
  let h: number;
  switch (isl.type) {
    case I_ATOLL: {
      h = r * 0.24 - Math.abs(d - r * 0.72 + warp * r * 0.3) + detail * amp;
      if (d < r * 0.72 && h < -10) h = -10 + detail * 4;
      break;
    }
    case I_STACK:
      h = (r - d) * 1.6 + detail * 6;
      break;
    case I_SANDBAR:
      h = (r - d) + warp * r * 0.7 + detail * amp;
      break;
    case I_CRAG:
      h = (r - d) + warp * r * 1.1 + detail * amp * 1.6;
      break;
    default:
      h = (r - d) + warp * r * 0.9 + detail * amp;
  }
  const t0 = ri * 0.62;
  if (d > t0) {
    let t = (d - t0) / (ri - t0);
    t = t * t * (3 - 2 * t);
    h = h * (1 - t) - ri * t;
  }
  return h;
}

export interface HeightSample {
  h: number;
  isl: Island | null;
}

const tmpIslands: Island[] = [];
export function heightAt(x: number, y: number, out: HeightSample): HeightSample {
  islandsInRect(x, y, x, y, tmpIslands);
  let best = -100000;
  let bi: Island | null = null;
  for (let i = 0; i < tmpIslands.length; i++) {
    const h = islandHeight(tmpIslands[i], x, y);
    if (h > best) {
      best = h;
      bi = tmpIslands[i];
    }
  }
  out.h = best;
  out.isl = bi;
  return out;
}

export const reefOut = { margin: -1, base: -9 };

const REEF_TH = [0.75, 0.63, 0.66, 0.8, 0.8];

export function reefThreshold(w: Float32Array): number {
  let t = 0;
  for (let i = 0; i < 5; i++) t += w[i] * REEF_TH[i];
  return t;
}

export function reefField(x: number, y: number, th: number): number {
  const macro = fbm(x / 1400, y / 1400, WORLD_SEED + 21, 3);
  reefOut.base = (macro - th) * 6;
  if (macro < th) {
    reefOut.margin = -1;
    return -1;
  }
  const base = (macro - th) * 6;
  const micro = fbm(x / 15, y / 15, WORLD_SEED + 22, 2);
  reefOut.margin = micro - (0.67 - Math.min(0.05, base * 0.03));
  if (reefOut.margin > 0) return 0.6;
  return base > 0.15 ? 0 : -0.5;
}

const DIRS: number[] = [
  1, 0, 0.92388, 0.38268, 0.70711, 0.70711, 0.38268, 0.92388, 0, 1, -0.38268, 0.92388, -0.70711, 0.70711, -0.92388, 0.38268,
  -1, 0, -0.92388, -0.38268, -0.70711, -0.70711, -0.38268, -0.92388, 0, -1, 0.38268, -0.92388, 0.70711, -0.70711, 0.92388, -0.38268
];

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: number;
  color: number;
}

export interface PortLayout {
  dockX0: number;
  dockY0: number;
  dockX1: number;
  dockY1: number;
  dirX: number;
  dirY: number;
  berthX: number;
  berthY: number;
  townX: number;
  townY: number;
  houses: Rect[];
  paths: number[];
  fortX: number;
  fortY: number;
  lights: number[];
}

const layoutCache = new Map<number, PortLayout | null>();
const hs: HeightSample = { h: 0, isl: null };

export function beachWidth(r: number): number {
  return 4 + r * 0.025;
}

export function portLayout(isl: Island): PortLayout | null {
  if (!isl.port) return null;
  const c = layoutCache.get(isl.id);
  if (c !== undefined) return c;
  let best = -1;
  let bestScore = Infinity;
  let bestCoast = 0;
  const start = new RNG(isl.seed ^ 0x77).int(0, 15);
  for (let k = 0; k < 16; k++) {
    const di = (start + k) % 16;
    const dx = DIRS[di * 2];
    const dy = DIRS[di * 2 + 1];
    let coast = -1;
    for (let s = 0; s < isl.r * 1.6; s += 4) {
      heightAt(isl.x + dx * s, isl.y + dy * s, hs);
      if (hs.h < -3) {
        coast = s;
        break;
      }
    }
    if (coast < 0) continue;
    let ok = true;
    for (let s = 30; s <= 120; s += 30) {
      heightAt(isl.x + dx * (coast + s), isl.y + dy * (coast + s), hs);
      if (hs.h > -20) ok = false;
    }
    if (!ok) continue;
    const score = coast + k * 3;
    if (score < bestScore) {
      bestScore = score;
      best = di;
      bestCoast = coast;
    }
  }
  if (best < 0) {
    layoutCache.set(isl.id, null);
    isl.port = null;
    return null;
  }
  const dx = DIRS[best * 2];
  const dy = DIRS[best * 2 + 1];
  const cx = isl.x + dx * bestCoast;
  const cy = isl.y + dy * bestCoast;
  const size = isl.port.size;
  const L: PortLayout = {
    dockX0: cx - dx * 10,
    dockY0: cy - dy * 10,
    dockX1: cx + dx * 46,
    dockY1: cy + dy * 46,
    dirX: dx,
    dirY: dy,
    berthX: cx + dx * 70,
    berthY: cy + dy * 70,
    townX: cx - dx * (70 + size * 40),
    townY: cy - dy * (70 + size * 40),
    houses: [],
    paths: [],
    fortX: 0,
    fortY: 0,
    lights: []
  };
  const rng = new RNG(isl.seed ^ 0x99);
  const bwid = beachWidth(isl.r);
  const radius = 70 + size * 45;
  const count = 4 + size * 4;
  const roofs = isl.port.faction === F_CROWN ? [0, 1, 2, 0] : isl.port.faction === F_BRETHREN ? [4, 2, 4, 0] : [5, 3, 2, 0];
  const okAt = (x: number, y: number) => heightAt(x, y, hs).h > bwid + 3;
  const overlaps = (x: number, y: number, w: number, h: number) => {
    for (const o of L.houses) if (x < o.x + o.w + 10 && x + w + 10 > o.x && y < o.y + o.h + 10 && y + h + 10 > o.y) return true;
    const ddx = x + w / 2 - cx;
    const ddy = y + h - cy;
    if (ddx * ddx + ddy * ddy < 44 * 44) return true;
    return false;
  };
  const fortArt = FORTS[Math.min(FORTS.length, size) - 1];
  const fw = fortArt.w;
  const fh = fortArt.h;
  for (let a = 0; a < 60; a++) {
    const fx = L.townX - fw / 2 + (rng.next() - 0.5) * radius * 1.4;
    const fy = L.townY - fh / 2 + (rng.next() - 0.5) * radius * 1.4;
    if (okAt(fx, fy) && okAt(fx + fw, fy) && okAt(fx, fy + fh) && okAt(fx + fw, fy + fh) && okAt(fx + fw / 2, fy + fh / 2) && okAt(fx + fw / 2, fy) && okAt(fx + fw / 2, fy + fh) && !overlaps(fx, fy, fw, fh)) {
      L.houses.push({ x: Math.round(fx), y: Math.round(fy), w: fw, h: fh, kind: 1, color: Math.min(FORTS.length, size) - 1 });
      L.fortX = fx + fw / 2;
      L.fortY = fy + fh / 2;
      break;
    }
  }
  for (let a = 0; a < count * 8 && L.houses.length < count; a++) {
    const px = L.townX + (rng.next() - 0.5) * radius * 2;
    const py = L.townY + (rng.next() - 0.5) * radius * 2;
    const ddx = px - L.townX;
    const ddy = py - L.townY;
    if (ddx * ddx + ddy * ddy > radius * radius) continue;
    const variant = rng.int(0, HOUSES.length - 1);
    const w = HOUSES[variant].art.w;
    const h = HOUSES[variant].art.h;
    const hx = Math.round(px - w / 2);
    const hy = Math.round(py - h / 2);
    if (!okAt(hx, hy) || !okAt(hx + w, hy) || !okAt(hx, hy + h) || !okAt(hx + w, hy + h)) continue;
    if (overlaps(hx, hy, w, h)) continue;
    const wallCol = rng.int(0, WALLS.length - 1);
    L.houses.push({ x: hx, y: hy, w, h, kind: 0, color: (variant << 8) | (wallCol << 4) | rng.pick(roofs) });
    L.lights.push(hx + w / 2, hy + h - 3);
  }
  const nodes: number[] = [Math.round(L.dockX0), Math.round(L.dockY0), Math.round(L.townX), Math.round(L.townY)];
  for (const hsx of L.houses) nodes.push(Math.round(hsx.x + (hsx.w - 2) / 2), Math.round(hsx.y + hsx.h + 2));
  const n = nodes.length / 2;
  const inTree = new Uint8Array(n);
  const bestD = new Float64Array(n).fill(Infinity);
  const parent = new Int32Array(n).fill(-1);
  bestD[0] = 0;
  for (let it = 0; it < n; it++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!inTree[i] && (u < 0 || bestD[i] < bestD[u])) u = i;
    inTree[u] = 1;
    if (parent[u] >= 0) L.paths.push(nodes[parent[u] * 2], nodes[parent[u] * 2 + 1], nodes[u * 2], nodes[u * 2 + 1]);
    for (let v = 0; v < n; v++) {
      if (inTree[v]) continue;
      const d = Math.hypot(nodes[u * 2] - nodes[v * 2], nodes[u * 2 + 1] - nodes[v * 2 + 1]);
      if (d < bestD[v]) {
        bestD[v] = d;
        parent[v] = u;
      }
    }
  }
  L.lights.push(L.dockX1, L.dockY1);
  layoutCache.set(isl.id, L);
  return L;
}
