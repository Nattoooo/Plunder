import { angleDiff, clamp, wrapAngle } from '../core/math';
import { shipPassable } from '../world/terrain';
import type { Ship } from './ship';

export const SEGMENTS = 12;
const SPACING = 7;

export class SeaMonster {
  static nextId = 1;
  id = SeaMonster.nextId++;
  kind = 'serpent';
  name = 'Sea Serpent';
  x: number;
  y: number;
  heading = 0;
  speed = 34;
  hp: number;
  maxHp: number;
  level: number;
  segs = new Float32Array(SEGMENTS * 2);
  depth = 1;
  diving = true;
  stateT = 2;
  biteT = 0;
  hurtT = 0;
  dead = false;
  deathT = 0;
  lastHitByPlayer = false;
  roared = false;
  target: Ship | null = null;

  constructor(x: number, y: number, level: number) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.maxHp = Math.round(320 + level * 70);
    this.hp = this.maxHp;
    this.heading = Math.random() * Math.PI * 2;
    for (let i = 0; i < SEGMENTS; i++) {
      this.segs[i * 2] = x - Math.cos(this.heading) * i * SPACING;
      this.segs[i * 2 + 1] = y - Math.sin(this.heading) * i * SPACING;
    }
  }

  segRadius(i: number): number {
    const t = i / (SEGMENTS - 1);
    return 5.5 - t * 3 + (i === 0 ? 0.5 : 0);
  }

  update(dt: number, typeAt: (x: number, y: number) => number, target: Ship | null): { biteCell: number; dmg: number } | null {
    if (this.dead) {
      this.deathT += dt;
      this.depth = Math.min(1, this.depth + dt * 0.3);
      return null;
    }
    this.target = target;
    this.hurtT = Math.max(0, this.hurtT - dt);
    this.biteT -= dt;
    this.stateT -= dt;
    if (this.stateT <= 0) {
      this.diving = !this.diving;
      this.stateT = this.diving ? 3 + Math.random() * 2 : 7 + Math.random() * 5;
    }
    const goal = this.diving ? 1 : 0;
    this.depth += clamp(goal - this.depth, -dt * 1.5, dt * 1.5);
    let desired = this.heading + Math.sin(performance.now() / 900 + this.id) * 0.4;
    let spd = this.diving ? 52 : 36;
    if (target) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const d = Math.hypot(dx, dy);
      desired = Math.atan2(dy, dx);
      if (!this.diving && d < 160) desired += Math.sin(performance.now() / 500 + this.id) * 0.5;
      spd = this.diving ? 62 : d < 80 ? 30 : 44;
    }
    const lx = this.x + Math.cos(desired) * 40;
    const ly = this.y + Math.sin(desired) * 40;
    if (!shipPassable(typeAt(lx, ly))) desired += 1.2;
    const turn = clamp(angleDiff(this.heading, desired), -2.2 * dt, 2.2 * dt);
    this.heading = wrapAngle(this.heading + turn);
    this.speed += (spd - this.speed) * Math.min(1, dt * 2);
    const nx = this.x + Math.cos(this.heading) * this.speed * dt;
    const ny = this.y + Math.sin(this.heading) * this.speed * dt;
    if (shipPassable(typeAt(nx, ny))) {
      this.x = nx;
      this.y = ny;
    } else this.heading += 0.8;
    this.segs[0] = this.x;
    this.segs[1] = this.y;
    for (let i = 1; i < SEGMENTS; i++) {
      const px = this.segs[(i - 1) * 2];
      const py = this.segs[(i - 1) * 2 + 1];
      let sx = this.segs[i * 2];
      let sy = this.segs[i * 2 + 1];
      const dx = sx - px;
      const dy = sy - py;
      const d = Math.hypot(dx, dy) || 1;
      sx = px + (dx / d) * SPACING;
      sy = py + (dy / d) * SPACING;
      this.segs[i * 2] = sx;
      this.segs[i * 2 + 1] = sy;
    }
    if (target && this.depth < 0.3 && this.biteT <= 0) {
      const hx = this.x + Math.cos(this.heading) * 6;
      const hy = this.y + Math.sin(this.heading) * 6;
      const d = Math.hypot(target.x - hx, target.y - hy);
      if (d < target.radius + 10) {
        this.biteT = 1.6;
        const l = target.toLocal(hx, hy, [0, 0]);
        let ci = target.cellAtLocal(l[0], l[1]);
        if (ci < 0) ci = target.nearestCell(l[0], l[1]);
        return { biteCell: ci, dmg: 14 + this.level * 3 };
      }
    }
    return null;
  }

  hitTest(x: number, y: number): boolean {
    if (this.dead || this.depth > 0.5) return false;
    for (let i = 0; i < SEGMENTS; i++) {
      const r = this.segRadius(i) + 2;
      const dx = x - this.segs[i * 2];
      const dy = y - this.segs[i * 2 + 1];
      if (dx * dx + dy * dy < r * r) return true;
    }
    return false;
  }
}
