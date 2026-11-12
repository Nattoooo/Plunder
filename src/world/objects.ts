import { Art, Swap } from '../art/palette';
import { TREE, JUNGLE_TREE, PALM, PINE, SNOW_PINE, DEAD_TREE, BUSH, BERRY_BUSH, REEDS, BOULDER, ROCK, SKULL_ROCK, ICE_SHARD, TUFT, FLOWERS, MUSHROOMS, SHELL, HOUSES, ROOFS, WALLS, FORTS, FORT_FLAG } from '../art/world';

export const BLOCK_NONE = 0;
export const BLOCK_TREE = 1;
export const BLOCK_HOUSE = 2;

export interface ObjDef {
  art: Art;
  swap?: Swap;
  fx0: number;
  fy0: number;
  fx1: number;
  fy1: number;
  block: number;
  tall: boolean;
}

export const OBJS: ObjDef[] = [];

const solid = (ch: string) => ch !== '.' && ch !== ',';

function base(a: Art, rows: number): [number, number, number, number] {
  let bottom = a.h - 1;
  while (bottom > 0 && !a.rows[bottom].split('').some(solid)) bottom--;
  const y0 = Math.max(0, bottom - rows + 1);
  let x0 = a.w;
  let x1 = 0;
  for (let y = y0; y <= bottom; y++) for (let x = 0; x < a.w; x++) if (solid(a.rows[y][x])) {
    x0 = Math.min(x0, x);
    x1 = Math.max(x1, x + 1);
  }
  return [x0, y0, x1, bottom + 1];
}

function reg(art: Art, swap: Swap | undefined, foot: [number, number, number, number], block: number, tall: boolean): number {
  OBJS.push({ art, swap, fx0: foot[0], fy0: foot[1], fx1: foot[2], fy1: foot[3], block, tall });
  return OBJS.length - 1;
}

export const FOLIAGE: Swap[] = [
  { g: 0x1f4a26, G: 0x2f6e34, h: 0x469444, H: 0x6cb854 },
  { g: 0x1f5028, G: 0x317638, h: 0x4aa04a, H: 0x74c45c },
  { g: 0x1e3a30, G: 0x2e5244, h: 0x3e6a56, H: 0x5a8a70 },
  { g: 0x2e2620, G: 0x463a2c, h: 0x5e5036, H: 0x7a6a46 },
  { g: 0x18301e, G: 0x2a4a32, h: 0x3e6a44, H: 0x5e8a5a }
];

interface DecoSpec {
  art: Art;
  rows: number;
  block: number;
  tall: boolean;
}

const SPECS: Record<string, DecoSpec> = {
  tree: { art: TREE, rows: 3, block: BLOCK_TREE, tall: true },
  jungle: { art: JUNGLE_TREE, rows: 3, block: BLOCK_TREE, tall: true },
  palm: { art: PALM, rows: 3, block: BLOCK_TREE, tall: true },
  pine: { art: PINE, rows: 3, block: BLOCK_TREE, tall: true },
  snowPine: { art: SNOW_PINE, rows: 3, block: BLOCK_TREE, tall: true },
  dead: { art: DEAD_TREE, rows: 3, block: BLOCK_TREE, tall: true },
  bush: { art: BUSH, rows: 3, block: BLOCK_NONE, tall: true },
  berry: { art: BERRY_BUSH, rows: 3, block: BLOCK_NONE, tall: true },
  reeds: { art: REEDS, rows: 3, block: BLOCK_NONE, tall: true },
  boulder: { art: BOULDER, rows: 6, block: BLOCK_TREE, tall: true },
  skull: { art: SKULL_ROCK, rows: 8, block: BLOCK_TREE, tall: true },
  ice: { art: ICE_SHARD, rows: 6, block: BLOCK_TREE, tall: true },
  rock: { art: ROCK, rows: 2, block: BLOCK_NONE, tall: false },
  tuft: { art: TUFT, rows: 1, block: BLOCK_NONE, tall: false },
  flowers: { art: FLOWERS, rows: 1, block: BLOCK_NONE, tall: false },
  mushrooms: { art: MUSHROOMS, rows: 1, block: BLOCK_NONE, tall: false },
  shell: { art: SHELL, rows: 1, block: BLOCK_NONE, tall: false }
};

export type DecoName = keyof typeof SPECS;
export const DECO: Record<string, number[]> = {};
for (const k in SPECS) {
  const s = SPECS[k];
  const foot = base(s.art, s.rows);
  DECO[k] = FOLIAGE.map((sw) => reg(s.art, sw, foot, s.block, s.tall));
}

const houseIds: number[] = [];
HOUSES.forEach((h) => {
  const foot: [number, number, number, number] = [2, h.foot, h.art.w - 2, h.art.h - 1];
  ROOFS.forEach((r) => WALLS.forEach((w) => houseIds.push(reg(h.art, { ...r, ...w }, foot, BLOCK_HOUSE, true))));
});

export function houseId(variant: number, roof: number, wall: number): number {
  return houseIds[(variant * ROOFS.length + roof) * WALLS.length + wall];
}

const fortIds: number[] = [];
FORTS.forEach((f) => FORT_FLAG.forEach((sw) => fortIds.push(reg(f, sw, [0, 0, f.w - 2, f.h - 1], BLOCK_HOUSE, true))));

export function fortId(size: number, faction: number): number {
  return fortIds[size * FORT_FLAG.length + faction];
}

export const MAX_OBJ_W = Math.max(...OBJS.map((o) => o.art.w));
export const MAX_OBJ_H = Math.max(...OBJS.map((o) => o.art.h));
