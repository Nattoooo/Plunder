import { RNG } from '../core/rng';
import { ITEMS, ItemCat, ItemDef } from '../data/items';
import { REGION, REGIONS, regionIslands, heightAt, HeightSample, beachWidth, I_STACK, I_SANDBAR, Island } from '../world/worldgen';
import type { TreasureMapData } from './player';

export type LootKind = 'flotsam' | 'chest' | 'buried' | 'treasure' | 'wreck' | 'shrine' | 'merchant' | 'pirate' | 'navy' | 'ghost' | 'hunter' | 'mob' | 'bottle';

export const MIX: Record<LootKind, Partial<Record<ItemCat, number>>> = {
  flotsam: { supply: 40, material: 25, ammo: 15, trade: 15, treasure: 5, map: 3 },
  chest: { treasure: 45, equip: 12, tool: 10, supply: 10, ammo: 8, map: 8, relic: 2 },
  buried: { treasure: 80, relic: 3, equip: 7, map: 5 },
  treasure: { treasure: 85, relic: 15 },
  wreck: { material: 22, trade: 25, ammo: 15, treasure: 28, tool: 5, map: 5 },
  shrine: { relic: 60, treasure: 40 },
  merchant: { trade: 70, supply: 15, material: 10, treasure: 5 },
  pirate: { ammo: 25, treasure: 30, equip: 15, supply: 10, map: 10, trade: 10 },
  navy: { ammo: 30, material: 25, equip: 20, tool: 10, supply: 15 },
  ghost: { treasure: 60, relic: 12, equip: 10, map: 18 },
  hunter: { ammo: 25, treasure: 35, equip: 25, map: 15 },
  mob: { treasure: 50, supply: 30, ammo: 20 },
  bottle: { map: 100 }
};

export const GOLD: Record<LootKind, [number, number, number]> = {
  flotsam: [0, 14, 0.5],
  chest: [20, 60, 1],
  buried: [30, 80, 1],
  treasure: [220, 520, 1],
  wreck: [20, 100, 0.8],
  shrine: [50, 150, 1],
  merchant: [60, 160, 1],
  pirate: [40, 120, 1],
  navy: [50, 110, 1],
  ghost: [90, 220, 1],
  hunter: [80, 160, 1],
  mob: [3, 15, 0.7],
  bottle: [0, 0, 0]
};

export const ROLLS: Record<LootKind, [number, number]> = {
  flotsam: [1, 2],
  chest: [2, 4],
  buried: [1, 3],
  treasure: [4, 7],
  wreck: [3, 5],
  shrine: [1, 2],
  merchant: [3, 6],
  pirate: [2, 4],
  navy: [2, 4],
  ghost: [2, 4],
  hunter: [3, 5],
  mob: [0, 1],
  bottle: [1, 1]
};

const byCat: Partial<Record<ItemCat, ItemDef[]>> = {};
for (const it of ITEMS) {
  if (it.id === 'treasure_map') continue;
  (byCat[it.cat] ??= []).push(it);
}

function rarityWeight(r: number, lvl: number): number {
  switch (r) {
    case 0: return 40;
    case 1: return 18 + lvl;
    case 2: return 5 + lvl * 1.5;
    case 3: return 0.8 + lvl * 0.5;
    default: return lvl >= 6 ? 0.2 + (lvl - 5) * 0.25 : 0;
  }
}

export interface LootDrop {
  id: string;
  qty: number;
  data?: TreasureMapData;
}

export interface Loot {
  gold: number;
  items: LootDrop[];
}

export function rollLoot(kind: LootKind, level: number, rng: RNG, luck = 0, rich = 1): Loot {
  const [g0, g1, gp] = GOLD[kind];
  const lv = Math.max(1, level);
  let gold = 0;
  if (rng.chance(gp)) gold = Math.round((g0 + rng.next() * (g1 - g0)) * Math.pow(lv, 1.1) * (1 + luck) * rich);
  const items: LootDrop[] = [];
  const [r0, r1] = ROLLS[kind];
  let rolls = rng.int(r0, r1);
  if (rng.chance(luck)) rolls++;
  if (rich > 1) rolls += Math.floor(rich - 1 + rng.next());
  const mix = MIX[kind];
  const cats = Object.keys(mix) as ItemCat[];
  const cw = cats.map((c) => mix[c]!);
  for (let i = 0; i < rolls; i++) {
    const cat = rng.weighted(cats, cw);
    if (cat === 'map') {
      const r = rng.next();
      if (kind === 'bottle' || r < 0.4) items.push({ id: 'bottle_message', qty: 1 });
      else if (r < 0.75) items.push({ id: 'treasure_map', qty: 1 });
      else items.push({ id: 'sea_chart', qty: 1 });
      continue;
    }
    const pool = byCat[cat];
    if (!pool) continue;
    const w = pool.map((it) => rarityWeight(it.rarity, lv));
    const it = rng.weighted(pool, w);
    let qty = 1;
    if (cat === 'supply' || cat === 'ammo' || cat === 'material' || cat === 'trade') qty = Math.round(rng.int(2, 7) * (1 + lv * 0.2) * (kind === 'merchant' ? 2 : 1));
    else if (cat === 'treasure') qty = it.rarity === 0 ? rng.int(1, 3 + Math.floor(lv / 2)) : 1;
    const ex = items.find((d) => d.id === it.id);
    if (ex) ex.qty += qty;
    else items.push({ id: it.id, qty });
  }
  return { gold, items };
}

const hs: HeightSample = { h: 0, isl: null };

export function findLandSpot(isl: Island, rng: RNG, inner = 0.65): [number, number] | null {
  const bw = beachWidth(isl.r);
  for (let a = 0; a < 40; a++) {
    const x = isl.x + (rng.next() * 2 - 1) * isl.r * inner;
    const y = isl.y + (rng.next() * 2 - 1) * isl.r * inner;
    heightAt(x, y, hs);
    if (hs.isl === isl && hs.h > bw + 3 && hs.h / isl.r < 0.6) return [Math.round(x), Math.round(y)];
  }
  return null;
}

export function makeTreasureMap(fx: number, fy: number, rng: RNG, level: number): TreasureMapData | null {
  const rx0 = Math.floor(fx / REGION);
  const ry0 = Math.floor(fy / REGION);
  for (let a = 0; a < 30; a++) {
    const dist = rng.int(3, 14);
    const rx = rx0 + rng.int(-dist, dist);
    const ry = ry0 + rng.int(-dist, dist);
    if (rx < 3 || ry < 3 || rx >= REGIONS - 3 || ry >= REGIONS - 3) continue;
    const list = regionIslands(rx, ry).filter((i) => !i.port && i.type !== I_STACK && i.type !== I_SANDBAR && i.r >= 60);
    if (!list.length) continue;
    const isl = rng.pick(list);
    const p = findLandSpot(isl, rng, 0.55);
    if (!p) continue;
    return { x: p[0], y: p[1], island: isl.name, level: Math.max(level, isl.level), seed: rng.int(1, 1e9) };
  }
  return null;
}
