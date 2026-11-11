import { RNG } from '../core/rng';
import { ITEMS, ITEM, ItemDef } from '../data/items';
import { Island, F_CROWN, F_BRETHREN, F_FREE } from '../world/worldgen';
import type { Profile } from './player';

export interface MarketEntry {
  id: string;
  buy: number;
  sell: number;
  sells: boolean;
  tag: '' | 'cheap' | 'wanted';
}

export interface MarketProfile {
  produce: string[];
  demand: string[];
  stock: string[];
}

const cache = new Map<number, MarketProfile>();

export function marketProfile(isl: Island): MarketProfile {
  const c = cache.get(isl.id);
  if (c) return c;
  const rng = new RNG(isl.seed ^ 0x3c3c3c);
  const trade = ITEMS.filter((i) => i.cat === 'trade');
  const local = trade.filter((i) => i.biomes?.includes(isl.biome));
  const produce: string[] = [];
  const pool = local.length >= 2 ? local : trade;
  while (produce.length < 3 && produce.length < pool.length) {
    const it = rng.pick(pool);
    if (!produce.includes(it.id)) produce.push(it.id);
  }
  const demand: string[] = [];
  const far = trade.filter((i) => !produce.includes(i.id) && !i.biomes?.includes(isl.biome));
  while (demand.length < 4 && far.length) {
    const it = rng.pick(far);
    if (!demand.includes(it.id)) demand.push(it.id);
    else if (rng.chance(0.2)) break;
  }
  const f = isl.port!.faction;
  const stock: string[] = ['rations', 'water', 'fruit', 'salted_pork', 'grog', 'cannonball', 'planks', 'rope', 'canvas', 'tar', 'shovel', 'repair_kit'];
  const opt = (id: string, p: number) => {
    if (rng.chance(p) && !stock.includes(id)) stock.push(id);
  };
  opt('chain_shot', f === F_BRETHREN ? 0.9 : 0.6);
  opt('grapeshot', f === F_BRETHREN ? 0.9 : 0.6);
  opt('heated_shot', 0.35);
  opt('mortar_shell', f === F_CROWN ? 0.4 : 0.15);
  opt('pistol_shot', 0.8);
  opt('iron_bars', 0.8);
  opt('brass', 0.45);
  opt('medicine', 0.7);
  opt('fish', 0.6);
  opt('compass', 0.5);
  opt('spyglass', 0.35);
  opt('sextant', 0.2);
  opt('lockpick', f === F_BRETHREN ? 0.9 : 0.25);
  opt('fishing_net', 0.5);
  opt('diving_helmet', 0.12);
  opt('cutlass', 0.6);
  opt('boarding_axe', f === F_BRETHREN ? 0.7 : 0.3);
  opt('rapier', f === F_CROWN ? 0.4 : 0.15);
  opt('flintlock', 0.4);
  opt('blunderbuss', f === F_BRETHREN ? 0.5 : 0.15);
  opt('musket', f === F_CROWN ? 0.5 : 0.15);
  opt('leather_vest', 0.5);
  opt('tricorn', 0.5);
  opt('captains_coat', 0.12);
  opt('treasure_map', f === F_BRETHREN ? 0.8 : 0.25);
  opt('sea_chart', f === F_FREE ? 0.5 : 0.25);
  if (f === F_BRETHREN) {
    opt('lucky_charm', 0.25);
    opt('cursed_skull', 0.2);
    opt('kraken_ink', 0.12);
  }
  opt('storm_glass', 0.1);
  for (const p of produce) stock.push(p);
  for (const t of trade) if (!produce.includes(t.id) && rng.chance(0.3)) stock.push(t.id);
  const mp = { produce, demand, stock };
  cache.set(isl.id, mp);
  return mp;
}

function drift(profile: Profile, portId: number, now: number): Record<string, number> {
  let m = profile.markets[portId];
  if (!m) {
    m = { t: now, d: {} };
    profile.markets[portId] = m;
  }
  const hours = (now - m.t) / 3600;
  if (hours > 0.01) {
    const k = Math.pow(0.5, hours / 0.75);
    for (const id in m.d) {
      m.d[id] *= k;
      if (Math.abs(m.d[id]) < 0.5) delete m.d[id];
    }
    m.t = now;
  }
  return m.d;
}

export function priceOf(isl: Island, def: ItemDef, profile: Profile, now: number): MarketEntry {
  const mp = marketProfile(isl);
  const d = drift(profile, isl.id, now);
  const f = isl.port!.faction;
  const rng = new RNG((isl.seed ^ def.price * 7919) >>> 0);
  let mult = 0.9 + rng.next() * 0.25;
  let tag: MarketEntry['tag'] = '';
  if (mp.produce.includes(def.id)) {
    mult *= 0.62;
    tag = 'cheap';
  } else if (mp.demand.includes(def.id)) {
    mult *= 1.55;
    tag = 'wanted';
  }
  if (def.cat === 'equip' || def.cat === 'tool') mult *= f === F_CROWN ? 1 : 1.1;
  const pressure = d[def.id] ?? 0;
  let buy = Math.max(1, Math.round(def.price * mult * (1 + pressure * 0.02)));
  let sellMult = def.cat === 'treasure' || def.cat === 'relic' ? (f === F_BRETHREN ? 0.95 : 0.8) : 0.78;
  if (def.cat === 'map') sellMult = 0.5;
  let sell = Math.max(1, Math.round(def.price * mult * sellMult * Math.max(0.3, 1 + pressure * 0.02)));
  if (sell >= buy) sell = Math.max(1, buy - 1);
  const sells = mp.stock.includes(def.id);
  if (!sells) buy = 0;
  return { id: def.id, buy, sell, sells, tag };
}

export function recordTrade(profile: Profile, portId: number, id: string, qty: number, now: number): void {
  const d = drift(profile, portId, now);
  d[id] = Math.max(-35, Math.min(60, (d[id] ?? 0) + qty));
}

export function marketList(isl: Island, profile: Profile, now: number): MarketEntry[] {
  const mp = marketProfile(isl);
  const out: MarketEntry[] = [];
  for (const id of mp.stock) {
    const def = ITEM[id];
    if (def) out.push(priceOf(isl, def, profile, now));
  }
  return out;
}

export function claimPrice(isl: Island): number {
  return Math.round(((700 + isl.r * 9) * (1 + isl.level * 0.22)) / 50) * 50;
}

export function claimFame(isl: Island): number {
  return Math.floor(isl.r / 12);
}

export function structureSlots(isl: Island): number {
  return Math.max(2, Math.min(8, Math.floor(isl.r / 55)));
}
