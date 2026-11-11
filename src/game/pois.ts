import { RNG, hash2, WORLD_SEED } from '../core/rng';
import { REGION, REGIONS, regionIslands, heightAt, HeightSample, beachWidth, I_STACK, I_SKULL, I_SWAMP, I_JUNGLE, B_MIST, CENTER, levelAt } from '../world/worldgen';
import { findLandSpot } from './loot';

export type PoiKind = 'flotsam' | 'bottle' | 'wreck' | 'chest' | 'dig' | 'claim' | 'shrine';

export interface POI {
  id: number;
  kind: PoiKind;
  x: number;
  y: number;
  island: number;
  level: number;
  respawn: number;
  locked: boolean;
  guarded: boolean;
}

export const RESPAWN: Record<PoiKind, number> = {
  flotsam: 1800,
  bottle: 7200,
  wreck: 10800,
  chest: 7200,
  dig: 3600,
  claim: 0,
  shrine: 21600
};

const cache = new Map<number, POI[]>();
const hs: HeightSample = { h: 0, isl: null };

function genPOIs(rx: number, ry: number): POI[] {
  const out: POI[] = [];
  if (rx < 2 || ry < 2 || rx >= REGIONS - 2 || ry >= REGIONS - 2) return out;
  const rng = new RNG(hash2(rx, ry, WORLD_SEED + 500));
  const base = (rx * REGIONS + ry) * 40;
  let k = 0;
  const x0 = rx * REGION;
  const y0 = ry * REGION;
  const push = (kind: PoiKind, x: number, y: number, island: number, level: number, locked = false, guarded = false) => {
    if (k >= 40) return;
    out.push({ id: base + k++, kind, x, y, island, level, respawn: RESPAWN[kind], locked, guarded });
  };
  if (rx === REGIONS / 2 && ry === REGIONS / 2) push('flotsam', CENTER + 300, CENTER + 1400, -1, 1);
  const lvl = levelAt(x0 + REGION / 2, y0 + REGION / 2);
  const water = (x: number, y: number, max: number) => heightAt(x, y, hs).h < max;
  const nf = rng.int(2, 4);
  for (let i = 0; i < nf; i++) {
    const x = x0 + rng.next() * REGION;
    const y = y0 + rng.next() * REGION;
    if (water(x, y, -40)) push('flotsam', x, y, -1, lvl);
  }
  if (rng.chance(0.28)) {
    const x = x0 + rng.next() * REGION;
    const y = y0 + rng.next() * REGION;
    if (water(x, y, -60)) push('bottle', x, y, -1, lvl);
  }
  const islands = regionIslands(rx, ry);
  if (rng.chance(0.32)) {
    let placed = false;
    const cand = islands.filter((i) => i.type !== I_STACK && !i.port);
    if (cand.length) {
      const isl = rng.pick(cand);
      for (let a = 0; a < 10 && !placed; a++) {
        const dx = rng.next() * 2 - 1;
        const dy = rng.next() * 2 - 1;
        const l = Math.hypot(dx, dy) || 1;
        const d = isl.r * (1.05 + rng.next() * 0.3) + 20;
        const x = isl.x + (dx / l) * d;
        const y = isl.y + (dy / l) * d;
        const h = heightAt(x, y, hs).h;
        if (h < -12 && h > -120) {
          push('wreck', x, y, isl.id, Math.max(lvl, isl.level));
          placed = true;
        }
      }
    }
    if (!placed) {
      const x = x0 + rng.next() * REGION;
      const y = y0 + rng.next() * REGION;
      if (water(x, y, -40)) push('wreck', x, y, -1, lvl);
    }
  }
  for (const isl of islands) {
    if (isl.port || isl.type === I_STACK) continue;
    const irng = new RNG(isl.seed ^ 0xabc);
    if (isl.claimable) {
      const p = findLandSpot(isl, irng, 0.3) ?? findLandSpot(isl, irng, 0.6);
      if (p) push('claim', p[0], p[1], isl.id, isl.level);
    }
    let chests = isl.r < 90 ? (irng.chance(0.5) ? 1 : 0) : isl.r < 260 ? 1 : 2;
    if (isl.type === I_SKULL) chests += 1;
    for (let c = 0; c < chests; c++) {
      const p = findLandSpot(isl, irng, 0.7);
      if (!p) continue;
      const guarded = isl.type === I_SKULL || (isl.level >= 3 && irng.chance(0.35));
      push('chest', p[0], p[1], isl.id, isl.level + (isl.type === I_SKULL ? 1 : 0), irng.chance(0.25), guarded);
    }
    if (isl.r >= 60 && irng.chance(0.6)) {
      const bw = beachWidth(isl.r);
      for (let a = 0; a < 30; a++) {
        const ax = irng.next() * 2 - 1;
        const ay = irng.next() * 2 - 1;
        const x = isl.x + ax * isl.r;
        const y = isl.y + ay * isl.r;
        heightAt(x, y, hs);
        if (hs.isl === isl && hs.h > 2 && hs.h < bw) {
          push('dig', Math.round(x), Math.round(y), isl.id, isl.level);
          break;
        }
      }
    }
    if (isl.type === I_SKULL || (isl.biome === B_MIST && (isl.type === I_SWAMP || isl.type === I_JUNGLE) && irng.chance(0.3))) {
      const p = findLandSpot(isl, irng, 0.4);
      if (p) push('shrine', p[0], p[1], isl.id, isl.level + 1, false, true);
    }
  }
  return out;
}

export function regionPOIs(rx: number, ry: number): POI[] {
  if (rx < 0 || ry < 0 || rx >= REGIONS || ry >= REGIONS) return [];
  const key = rx * REGIONS + ry;
  let p = cache.get(key);
  if (!p) {
    p = genPOIs(rx, ry);
    cache.set(key, p);
    if (cache.size > 400) cache.delete(cache.keys().next().value as number);
  }
  return p;
}

export function poisNear(x: number, y: number, r: number, out: POI[]): POI[] {
  out.length = 0;
  const rx0 = Math.floor((x - r) / REGION);
  const ry0 = Math.floor((y - r) / REGION);
  const rx1 = Math.floor((x + r) / REGION);
  const ry1 = Math.floor((y + r) / REGION);
  const r2 = r * r;
  for (let rx = rx0; rx <= rx1; rx++) for (let ry = ry0; ry <= ry1; ry++) {
    for (const p of regionPOIs(rx, ry)) {
      const dx = p.x - x;
      const dy = p.y - y;
      if (dx * dx + dy * dy <= r2) out.push(p);
    }
  }
  return out;
}

export const TUTORIAL_CRATE_ID = (125 * REGIONS + 125) * 40;
