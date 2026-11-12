import { STRUCTURES } from '../art/world';
import { getIsland, heightAt, beachWidth, HeightSample } from './worldgen';

const cache = new Map<string, number[]>();
const hs: HeightSample = { h: 0, isl: null };

export function structurePlaces(islandId: number, cx: number, cy: number, list: string[]): number[] {
  const key = `${islandId}:${Math.round(cx)}:${Math.round(cy)}:${list.join(',')}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const isl = getIsland(islandId);
  const out: number[] = [];
  if (!isl) {
    for (let i = 0; i < list.length; i++) out.push(NaN, NaN);
    cache.set(key, out);
    return out;
  }
  const min = beachWidth(isl.r) + 2;
  const land = (x: number, y: number) => heightAt(x, y, hs).h > min && hs.isl === isl;
  const taken: number[] = [cx - 14, cy - 26, cx + 14, cy + 6];
  const cands: number[] = [];
  for (let r = 36; r < isl.r * 1.3; r += 10) {
    const n = Math.max(8, Math.round((Math.PI * 2 * r) / 16));
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + r * 0.37;
      cands.push(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r));
    }
  }
  for (const st of list) {
    const a = STRUCTURES[st];
    let found = false;
    if (a) {
      const hw = a.w / 2;
      const top = a.h * 0.55;
      for (let c = 0; c < cands.length && !found; c += 2) {
        const x = cands[c];
        const y = cands[c + 1];
        const x0 = x - hw - 6;
        const x1 = x + hw + 6;
        const y0 = y - a.h - 4;
        const y1 = y + 6;
        let clash = false;
        for (let t = 0; t < taken.length; t += 4) if (x0 < taken[t + 2] && x1 > taken[t] && y0 < taken[t + 3] && y1 > taken[t + 1]) {
          clash = true;
          break;
        }
        if (clash) continue;
        if (!land(x, y) || !land(x - hw, y) || !land(x + hw, y) || !land(x - hw, y - top) || !land(x + hw, y - top) || !land(x, y - top)) continue;
        taken.push(x0, y0, x1, y1);
        out.push(x, y);
        found = true;
      }
    }
    if (!found) out.push(NaN, NaN);
  }
  cache.set(key, out);
  return out;
}
