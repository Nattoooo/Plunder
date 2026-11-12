import { walkable, T_SHALLOW, T_FOAM, T_SWAMP, T_LAVA, T_SNOW } from '../world/terrain';

export class Avatar {
  x = 0;
  y = 0;
  dir = Math.PI / 2;
  facing = 2;
  walk = 0;
  moving = false;
  hp = 100;
  maxHp = 100;
  attackCd = 0;
  swing = 0;
  dig = 0;
  digTarget = -1;
  hurt = 0;
  stepT = 0;
  iframes = 0;

  move(dx: number, dy: number, dt: number, typeAt: (x: number, y: number) => number): boolean {
    this.moving = dx !== 0 || dy !== 0;
    if (!this.moving) return false;
    const l = Math.hypot(dx, dy);
    dx /= l;
    dy /= l;
    this.dir = Math.atan2(dy, dx);
    if (Math.abs(dx) > Math.abs(dy)) this.facing = dx > 0 ? 1 : 3;
    else this.facing = dy > 0 ? 2 : 0;
    const here = typeAt(this.x, this.y);
    let sp = 42;
    if (here === T_SHALLOW || here === T_FOAM) sp = 22;
    else if (here === T_SWAMP) sp = 26;
    else if (here === T_SNOW) sp = 32;
    if (this.dig > 0) sp = 0;
    const nx = this.x + dx * sp * dt;
    const ny = this.y + dy * sp * dt;
    const ok = (x: number, y: number) => walkable(typeAt(x, y)) && walkable(typeAt(x - 1, y)) && walkable(typeAt(x + 1, y));
    if (ok(nx, ny)) {
      this.x = nx;
      this.y = ny;
    } else if (ok(nx, this.y)) this.x = nx;
    else if (ok(this.x, ny)) this.y = ny;
    this.walk += dt * sp * 0.25;
    return true;
  }

  onLava(typeAt: (x: number, y: number) => number): boolean {
    return typeAt(this.x, this.y) === T_LAVA;
  }
}

export type MobKind = 'crab' | 'skeleton' | 'wraith';

export interface Mob {
  id: number;
  kind: MobKind;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  dmg: number;
  speed: number;
  hx: number;
  hy: number;
  attackCd: number;
  hurt: number;
  dead: boolean;
  level: number;
  anim: number;
  island: number;
}

let mobId = 1;
export const MOB_BASE: Record<MobKind, { hp: number; dmg: number; speed: number }> = {
  crab: { hp: 12, dmg: 3, speed: 28 },
  skeleton: { hp: 26, dmg: 5, speed: 32 },
  wraith: { hp: 38, dmg: 8, speed: 38 }
};
export const MOB_LEVEL_SCALE = 0.18;

export function makeMob(kind: MobKind, x: number, y: number, level: number, island: number): Mob {
  const base = MOB_BASE[kind];
  const s = 1 + (level - 1) * MOB_LEVEL_SCALE;
  return {
    id: mobId++,
    kind,
    x,
    y,
    hp: Math.round(base.hp * s),
    maxHp: Math.round(base.hp * s),
    dmg: Math.round(base.dmg * s),
    speed: base.speed,
    hx: x,
    hy: y,
    attackCd: 1,
    hurt: 0,
    dead: false,
    level,
    anim: Math.random() * 10,
    island
  };
}

export function updateMob(m: Mob, av: Avatar | null, dt: number, typeAt: (x: number, y: number) => number): number {
  m.anim += dt;
  m.attackCd -= dt;
  m.hurt = Math.max(0, m.hurt - dt);
  let tx = m.hx;
  let ty = m.hy;
  let dmg = 0;
  if (av) {
    const dx = av.x - m.x;
    const dy = av.y - m.y;
    const d = Math.hypot(dx, dy);
    const hd = Math.hypot(av.x - m.hx, av.y - m.hy);
    if (d < 110 && hd < 220) {
      tx = av.x;
      ty = av.y;
      if (d < 9 && m.attackCd <= 0) {
        m.attackCd = 1.4 + Math.random() * 0.4;
        dmg = m.dmg;
      }
    }
  }
  const dx = tx - m.x;
  const dy = ty - m.y;
  const d = Math.hypot(dx, dy);
  if (d > 6) {
    const sp = m.speed * (m.hurt > 0 ? 0.3 : 1) * dt;
    const nx = m.x + (dx / d) * sp;
    const ny = m.y + (dy / d) * sp;
    if (walkable(typeAt(nx, ny)) || m.kind === 'wraith') {
      m.x = nx;
      m.y = ny;
    }
  }
  return dmg;
}
