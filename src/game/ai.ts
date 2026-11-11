import { angleDiff, clamp, wrapAngle } from '../core/math';
import { COMPONENTS } from '../data/components';
import { shipPassable } from '../world/terrain';
import type { Ship } from './ship';

export interface AIState {
  mode: 'wander' | 'engage' | 'flee' | 'idle';
  target: Ship | null;
  wx: number;
  wy: number;
  think: number;
  aggro: number;
  side: number;
  homeX: number;
  homeY: number;
  avoid: number;
  avoidT: number;
  desired: number;
  boss: boolean;
  questId: number;
  range: number;
  provoked: boolean;
  stuck: number;
  lastX: number;
  lastY: number;
}

export interface AIWorld {
  typeAt(x: number, y: number): number;
  ships: Ship[];
  player: Ship;
  playerActive: boolean;
  hostileTo(a: Ship, b: Ship): boolean;
  fire(ship: Ship, tx: number, ty: number): void;
}

export function newAI(ship: Ship, aggro: number): AIState {
  let range = 200;
  for (const ci of ship.guns) {
    const g = COMPONENTS[ship.design.part[ci]].gun!;
    if (!g.lob) range = Math.max(range, g.range);
  }
  return {
    mode: 'wander',
    target: null,
    wx: ship.x,
    wy: ship.y,
    think: Math.random() * 0.3,
    aggro,
    side: Math.random() < 0.5 ? 1 : -1,
    homeX: ship.x,
    homeY: ship.y,
    avoid: 0,
    avoidT: 0,
    desired: ship.heading,
    boss: false,
    questId: 0,
    range,
    provoked: false,
    stuck: 0,
    lastX: ship.x,
    lastY: ship.y
  };
}

const PROBE_ANG = [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4];

function clearance(ship: Ship, w: AIWorld, ang: number): number {
  const dists = [ship.halfLen + 20, ship.halfLen + 60, ship.halfLen + 120, ship.halfLen + 200];
  for (let i = 0; i < dists.length; i++) {
    const x = ship.x + Math.cos(ang) * dists[i];
    const y = ship.y + Math.sin(ang) * dists[i];
    if (!shipPassable(w.typeAt(x, y))) return i;
  }
  return dists.length;
}

export function updateAI(ai: AIState, ship: Ship, w: AIWorld, dt: number): void {
  if (ship.sinking >= 0) return;
  ai.think -= dt;
  if (ship.surrendered) {
    ship.sailTarget = 0;
    ship.turnInput = 0;
    return;
  }
  if (ai.think <= 0) {
    ai.think = 0.25 + Math.random() * 0.1;
    think(ai, ship, w);
  }
  const d = angleDiff(ship.heading, ai.desired + ai.avoid);
  ship.turnInput = clamp(d * 2.2, -1, 1);
}

function think(ai: AIState, ship: Ship, w: AIWorld): void {
  const moved = Math.hypot(ship.x - ai.lastX, ship.y - ai.lastY);
  ai.lastX = ship.x;
  ai.lastY = ship.y;
  if (moved < 1.5 && ship.sailTarget > 0) ai.stuck++;
  else ai.stuck = Math.max(0, ai.stuck - 1);
  let best: Ship | null = null;
  let bd = Infinity;
  for (const o of w.ships) {
    if (o === ship || o.sinking >= 0 || o.dead) continue;
    if (o.isPlayer && !w.playerActive) continue;
    if (!w.hostileTo(ship, o)) continue;
    const dx = o.x - ship.x;
    const dy = o.y - ship.y;
    const dd = dx * dx + dy * dy;
    const lim = ai.aggro * (o.isPlayer ? 1 : 0.8);
    if (dd < lim * lim && dd < bd) {
      bd = dd;
      best = o;
    }
  }
  if (ai.target && (ai.target.dead || ai.target.sinking >= 0)) ai.target = null;
  if (ai.target) {
    const dx = ai.target.x - ship.x;
    const dy = ai.target.y - ship.y;
    const keep = ai.aggro * 1.6;
    if (dx * dx + dy * dy > keep * keep || !w.hostileTo(ship, ai.target)) ai.target = null;
  }
  if (!ai.target && best) ai.target = best;
  const integ = ship.integrity();
  const merchant = ship.faction === 'merchant';
  if (ai.target) {
    const flee = merchant || (integ < (ship.faction === 'navy' || ship.faction === 'ghost' ? 0.0 : 0.3) && !ai.boss);
    ai.mode = flee ? 'flee' : 'engage';
  } else if (ai.mode !== 'wander') ai.mode = 'wander';
  const t = ai.target;
  if (ai.mode === 'flee' && t) {
    ai.desired = Math.atan2(ship.y - t.y, ship.x - t.x);
    ship.sailTarget = 1;
    ship.rowing = true;
    if (merchant && integ < 0.45 && Math.hypot(t.x - ship.x, t.y - ship.y) < 280 && t.isPlayer) ship.surrendered = true;
    if (!merchant && t) w.fire(ship, t.x, t.y);
  } else if (ai.mode === 'engage' && t) {
    const dx = t.x - ship.x;
    const dy = t.y - ship.y;
    const dist = Math.hypot(dx, dy);
    const lead = Math.min(1.5, dist / 260);
    const px = t.x + t.vx * lead;
    const py = t.y + t.vy * lead;
    const bearing = Math.atan2(py - ship.y, px - ship.x);
    const hasRam = ship.design.part.some((p, i) => p === 24 && ship.partHp[i] > 0);
    const noGuns = ship.guns.every((ci) => ship.partHp[ci] <= 0);
    if (hasRam && (dist < 220 || noGuns)) {
      ai.desired = bearing;
      ship.sailTarget = 1;
    } else if (dist > ai.range * 0.85) {
      ai.desired = bearing;
      ship.sailTarget = 1;
    } else {
      const a1 = wrapAngle(bearing + Math.PI / 2);
      const a2 = wrapAngle(bearing - Math.PI / 2);
      const pick = Math.abs(angleDiff(ship.heading, a1)) < Math.abs(angleDiff(ship.heading, a2)) ? a1 : a2;
      const tooClose = dist < Math.max(70, ai.range * 0.35);
      ai.desired = tooClose ? wrapAngle(pick + (angleDiff(pick, bearing) > 0 ? -0.5 : 0.5)) : pick;
      ship.sailTarget = dist < ai.range * 0.5 ? 0.55 : 0.8;
    }
    ship.rowing = true;
    w.fire(ship, px, py);
  } else {
    const dx = ai.wx - ship.x;
    const dy = ai.wy - ship.y;
    if (dx * dx + dy * dy < 120 * 120 || Math.random() < 0.01 || ai.stuck > 6) {
      for (let a = 0; a < 6; a++) {
        const ang = Math.random() * Math.PI * 2;
        const r = 400 + Math.random() * 1400;
        const nx = ai.homeX + Math.cos(ang) * r;
        const ny = ai.homeY + Math.sin(ang) * r;
        if (shipPassable(w.typeAt(nx, ny))) {
          ai.wx = nx;
          ai.wy = ny;
          break;
        }
      }
      ai.stuck = 0;
    }
    ai.desired = Math.atan2(ai.wy - ship.y, ai.wx - ship.x);
    ship.sailTarget = merchant ? 0.75 : 0.6;
    ship.rowing = false;
  }
  ai.avoidT -= 0.3;
  const want = ai.desired;
  const ahead = clearance(ship, w, want);
  if (ahead < 3) {
    let bestA = 0;
    let bestC = -1;
    for (const off of PROBE_ANG) {
      const c = clearance(ship, w, want + off) - Math.abs(off) * 0.3;
      if (c > bestC) {
        bestC = c;
        bestA = off;
      }
    }
    ai.avoid = bestA;
    ai.avoidT = 1.2;
    if (ahead === 0) ship.sailTarget = Math.min(ship.sailTarget, 0.3);
  } else if (ai.avoidT <= 0) ai.avoid *= 0.5;
  if (ai.stuck > 8) {
    ai.avoid = Math.PI * (Math.random() < 0.5 ? 0.7 : -0.7);
    ai.avoidT = 2;
  }
}
