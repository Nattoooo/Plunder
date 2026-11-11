import { RNG, hash2, WORLD_SEED } from '../core/rng';
import { ITEMS } from '../data/items';
import { REGION, REGIONS, regionIslands, Island, levelAt, heightAt, HeightSample } from '../world/worldgen';
import { captainName } from '../world/names';
import type { Quest } from './player';

let questId = 1;
export function setNextQuestId(n: number): void {
  questId = Math.max(questId, n);
}

const hs: HeightSample = { h: 0, isl: null };

function waterSpot(rng: RNG, cx: number, cy: number, minD: number, maxD: number): [number, number] | null {
  for (let a = 0; a < 30; a++) {
    const ang = rng.next() * Math.PI * 2;
    const d = minD + rng.next() * (maxD - minD);
    const x = cx + Math.cos(ang) * d;
    const y = cy + Math.sin(ang) * d;
    if (x < 8000 || y < 8000 || x > 504000 || y > 504000) continue;
    if (heightAt(x, y, hs).h < -80) return [x, y];
  }
  return null;
}

function nearbyPort(rng: RNG, isl: Island): Island | null {
  const rx0 = Math.floor(isl.x / REGION);
  const ry0 = Math.floor(isl.y / REGION);
  for (let a = 0; a < 40; a++) {
    const rx = rx0 + rng.int(-6, 6);
    const ry = ry0 + rng.int(-6, 6);
    if (rx < 2 || ry < 2 || rx >= REGIONS - 2 || ry >= REGIONS - 2) continue;
    for (const o of regionIslands(rx, ry)) if (o.port && o.id !== isl.id) return o;
  }
  return null;
}

export function bountyBoard(isl: Island, day: number): Quest[] {
  const rng = new RNG(hash2(isl.id, day, WORLD_SEED + 900));
  const out: Quest[] = [];
  const lvl = Math.max(1, isl.level);
  const n = 3;
  for (let i = 0; i < n; i++) {
    const roll = rng.next();
    const base = { id: 0, port: isl.id, portName: isl.port!.name, done: false, expires: day + 3 };
    if (roll < 0.45) {
      const p = waterSpot(rng, isl.x, isl.y, 2500, 9000);
      if (!p) continue;
      const ql = Math.min(10, lvl + rng.int(0, 2));
      const target = captainName(rng);
      out.push({
        ...base,
        kind: 'hunt',
        title: `Bounty: ${target}`,
        desc: `${target} has been raiding near ${isl.port!.name}. Find and sink their ship.`,
        x: p[0],
        y: p[1],
        target,
        reward: Math.round((180 + ql * 140) / 10) * 10,
        fame: 6 + ql * 3,
        level: ql
      });
    } else if (roll < 0.75) {
      const dest = nearbyPort(rng, isl);
      if (!dest) continue;
      const goods = ITEMS.filter((it) => it.cat === 'trade' || it.cat === 'supply' || it.cat === 'material');
      const item = rng.pick(goods);
      const qty = Math.max(3, Math.min(Math.round((rng.int(8, 25) * 30) / Math.max(8, item.price)), Math.floor((18 + lvl * 6) / Math.max(0.5, item.weight))));
      const dist = Math.hypot(dest.x - isl.x, dest.y - isl.y);
      out.push({
        ...base,
        kind: 'deliver',
        title: `Deliver ${qty} ${item.name}`,
        desc: `Bring ${qty} ${item.name} to ${dest.port!.name}. You must supply the goods yourself.`,
        x: dest.x,
        y: dest.y,
        item: item.id,
        qty,
        targetPort: dest.id,
        reward: Math.round((item.price * qty * 1.35 + dist * 0.05) / 10) * 10,
        fame: 4 + Math.floor(dist / 4000),
        level: lvl
      });
    } else {
      const p = waterSpot(rng, isl.x, isl.y, 1800, 7000);
      if (!p) continue;
      out.push({
        ...base,
        kind: 'salvage',
        title: 'Recover the Strongbox',
        desc: `A Guild cutter went down with a strongbox. Salvage the wreck and return to ${isl.port!.name}.`,
        x: p[0],
        y: p[1],
        reward: Math.round((150 + lvl * 90) / 10) * 10,
        fame: 5 + lvl * 2,
        level: Math.max(1, levelAt(p[0], p[1]))
      });
    }
  }
  return out;
}

export function acceptQuest(q: Quest): Quest {
  return { ...q, id: questId++ };
}

export interface TutorialStep {
  text: string;
  reward: number;
}

export const TUTORIAL: TutorialStep[] = [
  { text: 'Draw your sail: press W', reward: 0 },
  { text: 'Turn the sail to steer: hold A or D', reward: 0 },
  { text: 'Sail over the floating crate to the south-west', reward: 20 },
  { text: 'Return to Port Haven: sail to the pier and press E', reward: 30 },
  { text: 'Sell your salvage in the Market', reward: 30 },
  { text: 'At the Shipwright, mount a Swivel Gun on your raft', reward: 60 },
  { text: 'Hire a sailor at the Tavern', reward: 60 },
  { text: 'Sink the pirate raft lurking nearby (click to fire)', reward: 120 },
  { text: 'Go ashore (E near a beach) and dig at the X with your shovel', reward: 100 },
  { text: 'The seas are yours. Earn fame to unlock bigger keels!', reward: 0 }
];
