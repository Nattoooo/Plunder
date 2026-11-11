import { COMPONENTS, ComponentDef, KEELS } from '../data/components';
import { PART_CHARS } from '../data/fleets';

export const CELL = 8;

export interface Design {
  w: number;
  h: number;
  hull: number[];
  part: number[];
  dir: number[];
  keel: number;
  sailColor: number;
  name: string;
}

export function emptyDesign(w: number, h: number, keel: number): Design {
  return { w, h, hull: new Array(w * h).fill(0), part: new Array(w * h).fill(0), dir: new Array(w * h).fill(0), keel, sailColor: 0xe8dcc0, name: 'Unnamed' };
}

export function cloneDesign(d: Design): Design {
  return { ...d, hull: d.hull.slice(), part: d.part.slice(), dir: d.dir.slice() };
}

export function hasHull(d: Design, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < d.w && y < d.h && d.hull[y * d.w + x] > 0;
}

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];
export { DX, DY };

export function autoDir(d: Design, x: number, y: number): number {
  if (!hasHull(d, x - 1, y)) return 3;
  if (!hasHull(d, x + 1, y)) return 1;
  if (!hasHull(d, x, y - 1)) return 0;
  if (!hasHull(d, x, y + 1)) return 2;
  return x >= d.w / 2 ? 1 : 3;
}

export function parseDesign(rows: string[], hullMat: number, sailColor: number, name: string): Design {
  const h = rows.length;
  const w = rows[0].length;
  const d = emptyDesign(w, h, 0);
  d.sailColor = sailColor;
  d.name = name;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ch = rows[y][x];
      if (ch === '.') continue;
      d.hull[y * w + x] = hullMat;
      if (ch !== '#') d.part[y * w + x] = PART_CHARS[ch] ?? 0;
    }
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (d.part[i] && COMPONENTS[d.part[i]].rotates) d.dir[i] = autoDir(d, x, y);
  }
  return d;
}

export function resizeDesign(d: Design, w: number, h: number): Design {
  const nd = emptyDesign(w, h, d.keel);
  nd.sailColor = d.sailColor;
  nd.name = d.name;
  let minX = d.w, minY = d.h, maxX = -1, maxY = -1;
  for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) if (d.hull[y * d.w + x]) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  if (maxX < 0) return nd;
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const ox = Math.floor((w - bw) / 2) - minX;
  const oy = Math.floor((h - bh) / 2) - minY;
  for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) {
    const nx = x + ox;
    const ny = y + oy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const i = y * d.w + x;
    const j = ny * w + nx;
    nd.hull[j] = d.hull[i];
    nd.part[j] = d.part[i];
    nd.dir[j] = d.dir[i];
  }
  return nd;
}

export interface DesignIssue {
  cell: number;
  msg: string;
}

export function validateDesign(d: Design): DesignIssue[] {
  const issues: DesignIssue[] = [];
  const keel = KEELS[d.keel];
  let cells = 0;
  let first = -1;
  let propulsion = 0;
  const counts: Record<number, number> = {};
  for (let i = 0; i < d.hull.length; i++) {
    if (d.hull[i]) {
      cells++;
      if (first < 0) first = i;
    }
    const p = d.part[i];
    if (!p) continue;
    const c = COMPONENTS[p];
    counts[p] = (counts[p] ?? 0) + 1;
    const x = i % d.w;
    const y = (i / d.w) | 0;
    if (!d.hull[i]) {
      issues.push({ cell: i, msg: `${c.name} needs a hull tile beneath it.` });
      continue;
    }
    if (c.sail || c.oar) propulsion++;
    if (c.place === 'edge') {
      const dir = d.dir[i];
      if (hasHull(d, x + DX[dir], y + DY[dir])) issues.push({ cell: i, msg: `${c.name} must face out over the side.` });
    } else if (c.place === 'bow') {
      if (hasHull(d, x, y - 1)) issues.push({ cell: i, msg: `${c.name} must be at the very front of the bow.` });
    } else if (c.place === 'stern') {
      if (hasHull(d, x, y + 1)) issues.push({ cell: i, msg: `${c.name} must be at the very back of the stern.` });
    }
  }
  for (const k in counts) {
    const c = COMPONENTS[+k];
    if (c.max && counts[k] > c.max) issues.push({ cell: -1, msg: `Only ${c.max} ${c.name} allowed.` });
  }
  if (cells === 0) {
    issues.push({ cell: -1, msg: 'The ship has no hull.' });
    return issues;
  }
  if (cells > keel.cells) issues.push({ cell: -1, msg: `Too many hull tiles for a ${keel.name} keel (${cells}/${keel.cells}).` });
  if (propulsion === 0) issues.push({ cell: -1, msg: 'The ship needs at least one sail or oar bench.' });
  const seen = new Uint8Array(d.hull.length);
  const stack = [first];
  seen[first] = 1;
  let reached = 0;
  while (stack.length) {
    const i = stack.pop()!;
    reached++;
    const x = i % d.w;
    const y = (i / d.w) | 0;
    for (let k = 0; k < 4; k++) {
      const nx = x + DX[k];
      const ny = y + DY[k];
      if (!hasHull(d, nx, ny)) continue;
      const j = ny * d.w + nx;
      if (seen[j]) continue;
      seen[j] = 1;
      stack.push(j);
    }
  }
  if (reached !== cells) issues.push({ cell: -1, msg: 'All hull tiles must be connected.' });
  return issues;
}

export function designCost(d: Design): { gold: number; mats: Record<string, number> } {
  let gold = 0;
  const mats: Record<string, number> = {};
  const add = (c: ComponentDef) => {
    gold += c.price;
    for (const k in c.mats) mats[k] = (mats[k] ?? 0) + c.mats[k];
  };
  for (let i = 0; i < d.hull.length; i++) {
    if (d.hull[i]) add(COMPONENTS[d.hull[i]]);
    if (d.part[i]) add(COMPONENTS[d.part[i]]);
  }
  return { gold, mats };
}

export interface BaseStats {
  cells: number;
  mass: number;
  hullMax: number;
  length: number;
  width: number;
  drag: number;
  cargo: number;
  crewCap: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function baseStats(d: Design): BaseStats {
  let cells = 0, mass = 0, hullMax = 0, drag = 0, cargo = 0, crew = 0;
  let minX = d.w, minY = d.h, maxX = -1, maxY = -1;
  for (let i = 0; i < d.hull.length; i++) {
    const hc = d.hull[i];
    if (!hc) continue;
    const x = i % d.w;
    const y = (i / d.w) | 0;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    cells++;
    const h = COMPONENTS[hc];
    mass += h.mass;
    hullMax += h.hp;
    drag += h.drag ?? 1;
    const p = d.part[i];
    if (p) {
      const c = COMPONENTS[p];
      mass += c.mass;
      cargo += c.cargo ?? 0;
      crew += c.crew ?? 0;
    }
  }
  return {
    cells,
    mass,
    hullMax,
    length: maxY - minY + 1,
    width: maxX - minX + 1,
    drag: cells ? drag / cells : 1,
    cargo: 30 + cells * 3 + cargo,
    crewCap: Math.floor(cells / 5) + crew,
    minX,
    maxX,
    minY,
    maxY
  };
}

export const SPEED_K = 43.3;

export function speedFor(power: number, mass: number, drag: number, length: number): number {
  if (power <= 0) return 0;
  return SPEED_K * Math.sqrt(power / (mass * drag)) * Math.pow(length, 0.35);
}

export interface DesignSummary {
  topSpeed: number;
  rowSpeed: number;
  turn: number;
  hull: number;
  cargo: number;
  crewCap: number;
  guns: number;
  firepower: number;
  vision: number;
  mass: number;
  cells: number;
  crewSlots: number;
}

export function summarize(d: Design): DesignSummary {
  const b = baseStats(d);
  let sail = 0, oar = 0, turn = 0, guns = 0, fire = 0, vision = 420, slots = 0;
  for (let i = 0; i < d.part.length; i++) {
    const p = d.part[i];
    if (!p || !d.hull[i]) continue;
    const c = COMPONENTS[p];
    if (c.sail) sail += c.sail.power * Math.max(c.unmanned ?? 0, 1);
    if (c.oar) oar += c.oar;
    if (c.turn) turn += c.turn;
    if (c.gun) {
      guns++;
      fire += c.gun.dmg / c.gun.reload;
    }
    if (c.vision) vision += c.vision;
    slots += c.slots ?? 0;
  }
  return {
    topSpeed: speedFor(sail * 1.05, b.mass, b.drag, b.length),
    rowSpeed: speedFor(oar, b.mass, b.drag, b.length),
    turn: (1.25 * (1 + turn)) / (1 + b.mass / 110),
    hull: b.hullMax,
    cargo: b.cargo,
    crewCap: b.crewCap,
    guns,
    firepower: fire,
    vision,
    mass: b.mass,
    cells: b.cells,
    crewSlots: slots
  };
}

export function starterDesign(): Design {
  const d = parseDesign(['###', '#s#', '###'], 1, 0xc8b48a, 'Driftwood');
  return resizeDesign(d, KEELS[0].w, KEELS[0].h);
}
