import { COMPONENTS, GunSpec } from '../data/components';
import { Station } from '../data/crew';
import { angleDiff, approach, clamp, wrapAngle } from '../core/math';
import { Design, CELL, baseStats, BaseStats, speedFor, DX, DY } from './design';
import { CrewMember, crewEff, EffContext, ORDER_INFO, Order, gainXp } from './crew';
import { shipPassable, T_REEF, T_EDGE } from '../world/terrain';
import type { Particles } from './particles';

export type Ammo = 'round' | 'chain' | 'grape' | 'heated' | 'mortar' | 'free';

export interface ShipEnv {
  windAngle: number;
  windStrength: number;
  rain: number;
  storm: number;
  night: boolean;
  time: number;
}

export interface ShipWorld {
  typeAt(x: number, y: number): number;
  env: ShipEnv;
  particles: Particles;
  fireProjectile(ship: Ship, ci: number, gun: GunSpec, angle: number, tx: number, ty: number, ammo: Ammo, spread: number): void;
  sound(name: string, x: number, y: number, vol?: number, pitch?: number): void;
  onCrewDeath(ship: Ship, c: CrewMember): void;
  onPartBroken(ship: Ship, ci: number): void;
  explode(x: number, y: number, radius: number, dmg: number, source: Ship | null): void;
  ammoFor(ship: Ship, gun: GunSpec): Ammo | null;
  consumeAmmo(ship: Ship, ammo: Ammo): void;
  repairMaterial(ship: Ship, amount: number): number;
  rumAboard(ship: Ship): boolean;
}

export interface Stats {
  sailPower: number;
  wa: number;
  wb: number;
  wc: number;
  oarPower: number;
  turnRate: number;
  vision: number;
  repair: number;
  heal: number;
  foodSave: number;
  reloadBoost: number;
  luck: number;
  morale: number;
  cargoCap: number;
  crewCap: number;
  mass: number;
  accel: number;
  speedBonus: number;
  boardBonus: number;
  sailHandling: number;
}

export const SINK_AT = 0.22;

interface PendingShot {
  ci: number;
  t: number;
  tx: number;
  ty: number;
}

const tmpEff: EffContext = { hasGrog: false, night: false };

export class Ship {
  static nextId = 1;
  id = Ship.nextId++;
  design!: Design;
  base!: BaseStats;
  isPlayer = false;
  faction = 'player';
  name = '';
  captain = '';
  level = 1;
  x = 0;
  y = 0;
  heading = -Math.PI / 2;
  speed = 0;
  vx = 0;
  vy = 0;
  sail = 0;
  sailTarget = 0;
  turnInput = 0;
  rowing = false;
  anchored = false;
  hullHp!: Float32Array;
  partHp!: Float32Array;
  fire!: Float32Array;
  reload!: Float32Array;
  stationEff!: Float32Array;
  hullTotal = 0;
  flood = 0;
  sinking = -1;
  dead = false;
  crew: CrewMember[] = [];
  order: Order = 'sail';
  pivotX = 0;
  pivotY = 0;
  radius = 10;
  halfLen = 10;
  halfWid = 5;
  cells: number[] = [];
  probes: number[] = [];
  guns: number[] = [];
  stats!: Stats;
  statsDirty = true;
  visual = 0;
  hostile = false;
  surrendered = false;
  lastHitBy = 0;
  lastHitTime = -100;
  lastCombat = -100;
  ai: unknown = null;
  gold = 0;
  cargoMass = 0;
  extraSpeed = 0;
  extraReload = 0;
  stormResist = 0;
  boarding = 0;
  scrapeTimer = 0;
  wakeAcc = 0;
  sinkHandled = false;
  aiAmmo: Ammo = 'round';
  lootKind = 'pirate';
  questId = 0;
  boss = false;
  docked = false;
  private shots: PendingShot[] = [];
  private repairTimer = 0;
  private statTimer = 0;
  private clearTimer = 0;
  nearLand = true;
  private prevX = 0;
  private prevY = 0;

  constructor(design: Design) {
    this.setDesign(design);
  }

  setDesign(d: Design, preserve = false): void {
    const old = preserve ? { hull: this.hullHp, part: this.partHp, design: this.design } : null;
    this.design = d;
    this.base = baseStats(d);
    const n = d.w * d.h;
    this.hullHp = new Float32Array(n);
    this.partHp = new Float32Array(n);
    this.fire = new Float32Array(n);
    this.reload = new Float32Array(n);
    this.stationEff = new Float32Array(n);
    this.cells = [];
    this.guns = [];
    this.hullTotal = 0;
    for (let i = 0; i < n; i++) {
      if (!d.hull[i]) continue;
      this.cells.push(i);
      this.hullHp[i] = COMPONENTS[d.hull[i]].hp;
      this.hullTotal += this.hullHp[i];
      if (d.part[i]) {
        const c = COMPONENTS[d.part[i]];
        this.partHp[i] = c.hp;
        if (c.gun) {
          this.guns.push(i);
          this.reload[i] = 0;
        }
      }
    }
    if (old && old.design && old.design.w === d.w && old.design.h === d.h) {
      for (const i of this.cells) {
        if (old.design.hull[i] === d.hull[i]) this.hullHp[i] = Math.min(this.hullHp[i], old.hull[i]);
        if (old.design.part[i] === d.part[i] && d.part[i]) this.partHp[i] = Math.min(this.partHp[i], old.part[i]);
      }
      this.hullTotal = 0;
      for (const i of this.cells) this.hullTotal += this.hullHp[i];
    }
    const b = this.base;
    this.pivotX = ((b.minX + b.maxX + 1) / 2) * CELL;
    this.pivotY = ((b.minY + b.maxY + 1) / 2) * CELL;
    this.halfLen = (b.length * CELL) / 2 + 3;
    this.halfWid = (b.width * CELL) / 2;
    this.radius = Math.sqrt(this.halfLen * this.halfLen + this.halfWid * this.halfWid);
    this.probes = [];
    for (const i of this.cells) {
      const x = i % d.w;
      const y = (i / d.w) | 0;
      const lx = (x + 0.5) * CELL - this.pivotX;
      const ly = (y + 0.5) * CELL - this.pivotY;
      for (let k = 0; k < 4; k++) {
        const nx = x + DX[k];
        const ny = y + DY[k];
        const has = nx >= 0 && ny >= 0 && nx < d.w && ny < d.h && d.hull[ny * d.w + nx] > 0;
        if (!has) this.probes.push(lx + DX[k] * CELL * 0.5, ly + DY[k] * CELL * 0.5 - (k === 0 ? 2 : 0));
      }
    }
    for (const c of this.crew) if (c.station >= 0 && !this.stationOf(c.station)) c.station = -1;
    this.statsDirty = true;
    this.visual++;
  }

  hullMax(): number {
    return this.base.hullMax;
  }

  integrity(): number {
    return this.base.hullMax > 0 ? this.hullTotal / this.base.hullMax : 0;
  }

  cellLocal(i: number): [number, number] {
    const w = this.design.w;
    return [((i % w) + 0.5) * CELL - this.pivotX, (((i / w) | 0) + 0.5) * CELL - this.pivotY];
  }

  toWorld(lx: number, ly: number, out: number[]): number[] {
    const phi = this.heading + Math.PI / 2;
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    out[0] = this.x + lx * c - ly * s;
    out[1] = this.y + lx * s + ly * c;
    return out;
  }

  toLocal(wx: number, wy: number, out: number[]): number[] {
    const phi = this.heading + Math.PI / 2;
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    const dx = wx - this.x;
    const dy = wy - this.y;
    out[0] = dx * c + dy * s;
    out[1] = -dx * s + dy * c;
    return out;
  }

  cellAtLocal(lx: number, ly: number): number {
    const gx = Math.floor((lx + this.pivotX) / CELL);
    const gy = Math.floor((ly + this.pivotY) / CELL);
    if (gx < 0 || gy < 0 || gx >= this.design.w || gy >= this.design.h) return -1;
    const i = gy * this.design.w + gx;
    return this.design.hull[i] ? i : -1;
  }

  nearestCell(lx: number, ly: number): number {
    let best = -1;
    let bd = Infinity;
    for (const i of this.cells) {
      const [cx, cy] = this.cellLocal(i);
      const d = (cx - lx) * (cx - lx) + (cy - ly) * (cy - ly);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  }

  stationOf(i: number): Station | null {
    const p = this.design.part[i];
    if (!p || !this.design.hull[i]) return null;
    return COMPONENTS[p].station ?? null;
  }

  slotsOf(i: number): number {
    const p = this.design.part[i];
    return p ? COMPONENTS[p].slots ?? 0 : 0;
  }

  crewAt(i: number): CrewMember[] {
    return this.crew.filter((c) => c.station === i);
  }

  autoAssign(order: Order = this.order): void {
    this.order = order;
    const pri = ORDER_INFO[order].pri;
    const free = this.crew.filter((c) => !c.locked);
    for (const c of free) c.station = -1;
    const used = new Map<number, number>();
    for (const c of this.crew) if (c.locked && c.station >= 0) used.set(c.station, (used.get(c.station) ?? 0) + 1);
    const limit = order === 'rest' ? 1 : 99;
    const keyN = ORDER_INFO[order].keyCount;
    tmpEff.hasGrog = true;
    tmpEff.night = false;
    for (let pass = 0; pass < 4; pass++) {
      const liked = pass < 2;
      const stations = pass === 0 || pass === 2 ? pri.slice(0, keyN) : pri.slice(keyN);
      for (const st of stations) {
        for (const i of this.cells) {
          if (this.stationOf(i) !== st) continue;
          if (this.partHp[i] <= 0) continue;
          const slots = Math.min(this.slotsOf(i), limit);
          while ((used.get(i) ?? 0) < slots) {
            let best: CrewMember | null = null;
            let bs = -1;
            for (const c of free) {
              if (c.station >= 0) continue;
              if (liked && !roleLikes(c.role, st)) continue;
              if (pass === 1 && GENERALISTS.has(c.role)) continue;
              const s = crewEff(c, st, tmpEff);
              if (s > bs) {
                bs = s;
                best = c;
              }
            }
            if (!best) break;
            best.station = i;
            used.set(i, (used.get(i) ?? 0) + 1);
          }
        }
      }
    }
    this.statsDirty = true;
  }

  recomputeStats(env: ShipEnv | null, hasGrog: boolean): void {
    tmpEff.hasGrog = hasGrog;
    tmpEff.night = env?.night ?? false;
    const d = this.design;
    this.stationEff.fill(0);
    const counts = new Map<number, number>();
    for (const c of this.crew) {
      if (c.station < 0) continue;
      const st = this.stationOf(c.station);
      if (!st) {
        c.station = -1;
        continue;
      }
      this.stationEff[c.station] += crewEff(c, st, tmpEff);
      counts.set(c.station, (counts.get(c.station) ?? 0) + 1);
    }
    let sail = 0, wa = 0, wb = 0, wc = 0, oar = 0, turn = 0, vision = 420, repair = 0, heal = 0, foodSave = 0, reload = 0, luck = 0, morale = 0, cargoCap = this.base.cargo, crewCap = this.base.crewCap;
    let speedBonus = 0, accelBonus = 0, handling = 0;
    let helmEff = 0;
    for (const i of this.cells) {
      const p = d.part[i];
      if (!p) continue;
      const c = COMPONENTS[p];
      const alive = this.partHp[i] > 0;
      const hpF = c.hp > 0 ? this.partHp[i] / c.hp : 0;
      const slots = c.slots ?? 0;
      let eff = c.unmanned ?? 1;
      if (slots > 0) {
        const manned = this.stationEff[i] / slots;
        eff = Math.max(eff, manned);
      }
      if (!alive) eff = 0;
      this.stationEff[i] = eff;
      if (c.sail && alive) {
        const pw = c.sail.power * eff * (0.35 + 0.65 * hpF);
        sail += pw;
        wa += c.sail.a * pw;
        wb += c.sail.b * pw;
        wc += c.sail.c * pw;
        handling += eff;
      }
      if (c.oar && alive) oar += c.oar * eff;
      if (c.turn && alive) turn += c.station === 'helm' ? c.turn * eff : c.turn;
      if (c.station === 'helm') helmEff = eff;
      if (c.vision && alive) vision += c.vision * eff;
      if (c.repair && alive) repair += c.repair * eff;
      if (c.heal && alive) heal += c.heal * eff;
      if (c.foodSave && alive) foodSave = Math.max(foodSave, c.foodSave * Math.min(1, eff));
      if (c.reloadBoost && alive) reload += c.reloadBoost * eff;
      if (c.luck && alive) luck += c.luck;
      if (c.morale && alive) morale += c.morale;
    }
    for (const cm of this.crew) {
      if (cm.station < 0) continue;
      const st = this.stationOf(cm.station);
      if (cm.role === 'navigator' && st === 'helm') speedBonus += 0.04 + cm.skill / 1500;
      if (cm.role === 'boatswain' && (st === 'sail' || st === 'oar')) accelBonus += 0.35;
      if (cm.role === 'quartermaster' && st === 'cargo') luck += 0.05 + cm.skill / 1000;
      if (cm.role === 'shantyman') {
        morale += 2;
        oar *= 1.05;
      }
      if (cm.role === 'carpenter' && st !== 'workshop') repair += 0.4;
    }
    if (this.order === 'repair') repair += this.crew.filter((c) => c.station < 0).length * 0.45;
    if (this.order === 'rest') speedBonus -= 0.05;
    if (this.order === 'board') speedBonus -= 0.08;
    const mass = this.base.mass + this.cargoMass * 0.35;
    this.stats = {
      sailPower: sail,
      wa: sail > 0 ? wa / sail : 0.6,
      wb: sail > 0 ? wb / sail : 0.3,
      wc: sail > 0 ? wc / sail : 0.4,
      oarPower: oar,
      turnRate: ((1.25 * (1 + turn)) / (1 + mass / 110)) * (0.9 + helmEff * 0.1),
      vision,
      repair,
      heal,
      foodSave,
      reloadBoost: reload,
      luck,
      morale,
      cargoCap,
      crewCap,
      mass,
      accel: 1 + accelBonus,
      speedBonus,
      boardBonus: this.order === 'board' ? 0.25 : 0,
      sailHandling: 0.5 + Math.min(1.5, handling * 0.4)
    };
    this.statsDirty = false;
  }

  windFactor(env: ShipEnv): number {
    const rel = Math.abs(angleDiff(this.heading, env.windAngle));
    const s = this.stats;
    return s.wa + s.wb * Math.cos(rel) + s.wc * Math.sin(rel);
  }

  targetSpeed(env: ShipEnv): number {
    const s = this.stats;
    const wind = this.windFactor(env) * env.windStrength;
    const rowing = this.rowing && s.oarPower > 0;
    const power = s.sailPower * this.sail * wind + (rowing ? s.oarPower : 0);
    let v = speedFor(power, s.mass, this.base.drag, this.base.length);
    v *= 1 - this.flood * 0.55;
    v *= 1 + s.speedBonus + this.extraSpeed;
    if (env.storm > 0.3) v *= 1 - env.storm * 0.15 * (1 - this.stormResist);
    return this.anchored ? 0 : v;
  }

  update(dt: number, w: ShipWorld): void {
    if (this.sinking >= 0) {
      this.sinking += dt;
      this.speed *= Math.pow(0.4, dt);
      this.x += Math.cos(this.heading) * this.speed * dt;
      this.y += Math.sin(this.heading) * this.speed * dt;
      if (Math.random() < dt * 20) {
        const ci = this.cells[(Math.random() * this.cells.length) | 0];
        const [lx, ly] = this.cellLocal(ci);
        const p = this.toWorld(lx, ly, tmpA);
        w.particles.bubble(p[0], p[1]);
      }
      if (this.sinking > 4.5) this.dead = true;
      return;
    }
    this.statTimer -= dt;
    if (this.statsDirty || this.statTimer <= 0) {
      this.recomputeStats(w.env, w.rumAboard(this));
      this.statTimer = 0.5;
    }
    const s = this.stats;
    this.sail = approach(this.sail, this.sailTarget, dt * 0.55 * s.sailHandling);
    const tf = 0.35 + 0.65 * Math.min(1, Math.abs(this.speed) / 30);
    const prevHeading = this.heading;
    this.heading = wrapAngle(this.heading + this.turnInput * s.turnRate * tf * dt);
    const target = this.targetSpeed(w.env);
    if (this.speed < target) {
      const a = Math.max(5, target * 0.2) * s.accel;
      this.speed = Math.min(target, this.speed + a * dt);
    } else {
      const decel = this.anchored ? 45 : Math.max(2.5, this.speed * 0.22);
      this.speed = Math.max(target, this.speed - decel * dt);
    }
    const ch = Math.cos(this.heading);
    const sh = Math.sin(this.heading);
    const drift = this.anchored ? 0 : 1.2 * w.env.windStrength + w.env.storm * 6;
    this.vx = ch * this.speed + Math.cos(w.env.windAngle) * drift;
    this.vy = sh * this.speed + Math.sin(w.env.windAngle) * drift;
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.clearTimer -= dt;
    if (this.clearTimer <= 0 || this.nearLand) this.collide(w, prevHeading, dt);
    this.updateGuns(dt, w);
    this.updateDamage(dt, w);
    this.updateCrewPositions(dt);
  }

  private collide(w: ShipWorld, prevHeading: number, dt: number): void {
    const step = this.isPlayer ? 2 : Math.max(2, Math.floor(this.probes.length / 10) * 2);
    let hitIdx = -1;
    let reef = -1;
    let any = false;
    const phi = this.heading + Math.PI / 2;
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    for (let k = 0; k < this.probes.length; k += step) {
      const lx = this.probes[k];
      const ly = this.probes[k + 1];
      const wx = this.x + lx * c - ly * s;
      const wy = this.y + lx * s + ly * c;
      const t = w.typeAt(wx, wy);
      if (t !== 0 && t !== 1) any = true;
      if (!shipPassable(t)) {
        hitIdx = k;
        if (t === T_EDGE) this.speed = Math.min(this.speed, 5);
        break;
      }
      if (t === T_REEF) reef = k;
    }
    if (!any && hitIdx < 0) {
      this.nearLand = false;
      this.clearTimer = 0.25;
    } else this.nearLand = true;
    if (hitIdx >= 0) {
      if (!shipPassable(w.typeAt(this.prevX, this.prevY)) || !shipPassable(w.typeAt(this.x, this.y))) {
        this.unstick(w);
        return;
      }
      this.x = this.prevX;
      this.y = this.prevY;
      this.heading = prevHeading;
      const impact = Math.abs(this.speed);
      if (impact > 18) {
        const ci = this.nearestCell(this.probes[hitIdx], this.probes[hitIdx + 1]);
        if (ci >= 0) this.damageCell(ci, (impact - 18) * 0.7, 'round', w, null);
        w.sound('hit', this.x, this.y, Math.min(1, impact / 60));
      }
      this.speed = -Math.min(8, impact * 0.25);
      const lx = this.probes[hitIdx];
      const ly = this.probes[hitIdx + 1];
      const nx = -(lx * c - ly * s);
      const ny = -(lx * s + ly * c);
      const nl = Math.hypot(nx, ny) || 1;
      for (let tries = 0; tries < 3; tries++) {
        this.x += (nx / nl) * 0.8;
        this.y += (ny / nl) * 0.8;
      }
    }
    if (reef >= 0 && Math.abs(this.speed) > 6) {
      this.scrapeTimer -= dt;
      if (this.scrapeTimer <= 0) {
        this.scrapeTimer = 0.35;
        const ci = this.nearestCell(this.probes[reef], this.probes[reef + 1]);
        if (ci >= 0) this.damageCell(ci, 1.5 + Math.abs(this.speed) * 0.08, 'round', w, null);
        w.particles.splash(this.x + Math.cos(this.heading) * this.halfLen, this.y + Math.sin(this.heading) * this.halfLen, 3);
      }
      this.speed *= Math.pow(0.6, dt);
    }
  }

  unstick(w: ShipWorld): void {
    for (let r = 8; r <= 160; r += 8) {
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const x = this.x + Math.cos(ang) * r;
        const y = this.y + Math.sin(ang) * r;
        let ok = true;
        for (let k = 0; k < 8 && ok; k++) {
          const b = (k / 8) * Math.PI * 2;
          if (!shipPassable(w.typeAt(x + Math.cos(b) * this.radius, y + Math.sin(b) * this.radius))) ok = false;
        }
        if (ok) {
          this.x = x;
          this.y = y;
          this.prevX = x;
          this.prevY = y;
          this.speed = 0;
          return;
        }
      }
    }
  }

  gunAngle(ci: number): number {
    return this.heading + this.design.dir[ci] * (Math.PI / 2);
  }

  gunReady(ci: number): boolean {
    return this.reload[ci] <= 0 && this.partHp[ci] > 0;
  }

  gunBears(ci: number, tx: number, ty: number): boolean {
    const g = COMPONENTS[this.design.part[ci]].gun!;
    const [lx, ly] = this.cellLocal(ci);
    const p = this.toWorld(lx, ly, tmpA);
    const ang = Math.atan2(ty - p[1], tx - p[0]);
    if (g.lob) return true;
    return Math.abs(angleDiff(this.gunAngle(ci), ang)) <= g.arc;
  }

  reloadTime(ci: number): number {
    const g = COMPONENTS[this.design.part[ci]].gun!;
    const eff = Math.max(0.15, this.stationEff[ci]);
    let mult = 1 / eff;
    mult *= 1 - Math.min(0.45, this.stats.reloadBoost + this.extraReload);
    for (const c of this.crew) if (c.role === 'master_gunner' && c.station >= 0 && this.stationOf(c.station) !== null) {
      const [ax, ay] = this.cellLocal(c.station);
      const [bx, by] = this.cellLocal(ci);
      if (Math.abs(ax - bx) + Math.abs(ay - by) <= CELL * 3) mult *= 0.9;
    }
    return g.reload * mult;
  }

  fireAt(tx: number, ty: number, w: ShipWorld, onlyLob = false): number {
    let n = 0;
    let delay = 0;
    for (const ci of this.guns) {
      if (!this.gunReady(ci)) continue;
      if (this.shots.some((s) => s.ci === ci)) continue;
      const g = COMPONENTS[this.design.part[ci]].gun!;
      if (onlyLob && !g.lob) continue;
      if (!this.gunBears(ci, tx, ty)) continue;
      const dx = tx - this.x;
      const dy = ty - this.y;
      if (g.lob && dx * dx + dy * dy < 60 * 60) continue;
      if (!w.ammoFor(this, g)) continue;
      this.shots.push({ ci, t: delay, tx, ty });
      delay += 0.07 + Math.random() * 0.06;
      n++;
    }
    if (n) this.lastCombat = w.env.time;
    return n;
  }

  private updateGuns(dt: number, w: ShipWorld): void {
    for (const ci of this.guns) if (this.reload[ci] > 0) this.reload[ci] -= dt;
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      s.t -= dt;
      if (s.t > 0) continue;
      this.shots.splice(i, 1);
      const ci = s.ci;
      if (this.partHp[ci] <= 0) continue;
      const g = COMPONENTS[this.design.part[ci]].gun!;
      const ammo = w.ammoFor(this, g);
      if (!ammo) continue;
      w.consumeAmmo(this, ammo);
      const [lx, ly] = this.cellLocal(ci);
      const p = this.toWorld(lx, ly, tmpA);
      let ang = Math.atan2(s.ty - p[1], s.tx - p[0]);
      if (!g.lob) {
        const base = this.gunAngle(ci);
        const d = angleDiff(base, ang);
        ang = base + clamp(d, -g.arc, g.arc);
      }
      let skill = 0.6;
      let sharp = false;
      for (const c of this.crew) if (c.station === ci) {
        skill = Math.max(skill, c.skill / 100);
        if (c.traits.includes('sharpshooter')) sharp = true;
        gainXp(c, 2);
      }
      const spread = g.spread * (1.6 - skill) * (sharp ? 0.5 : 1);
      w.fireProjectile(this, ci, g, ang, s.tx, s.ty, ammo, spread);
      this.reload[ci] = this.reloadTime(ci);
    }
  }

  damageAt(wx: number, wy: number, dmg: number, ammo: Ammo, w: ShipWorld, src: Ship | null): number {
    const l = this.toLocal(wx, wy, tmpA);
    let ci = this.cellAtLocal(l[0], l[1]);
    if (ci < 0) ci = this.nearestCell(l[0], l[1]);
    if (ci < 0) return -1;
    this.damageCell(ci, dmg, ammo, w, src);
    return ci;
  }

  damageCell(ci: number, dmg: number, ammo: Ammo, w: ShipWorld, src: Ship | null): void {
    if (this.sinking >= 0) return;
    const d = this.design;
    const hullC = COMPONENTS[d.hull[ci]];
    const p = d.part[ci];
    const pc = p ? COMPONENTS[p] : null;
    let armor = (hullC.armor ?? 0) + (pc?.armor ?? 0);
    armor = Math.min(0.7, armor);
    let hullMult = 1, partMult = 1, crewMult = 1;
    if (ammo === 'chain') {
      hullMult = 0.3;
      partMult = pc?.sail ? 3.2 : 0.6;
      crewMult = 0.3;
    } else if (ammo === 'grape') {
      hullMult = 0.3;
      partMult = 0.45;
      crewMult = 3;
      armor *= 0.5;
    } else if (ammo === 'free') {
      hullMult = 0.75;
      partMult = 0.6;
      crewMult = 1.6;
    } else if (ammo === 'heated') {
      hullMult = 0.9;
      if (Math.random() < 0.35) this.fire[ci] = Math.max(this.fire[ci], 0.8);
    }
    if (src) {
      this.lastHitBy = src.id;
      this.lastHitTime = w.env.time;
      this.lastCombat = w.env.time;
    }
    if (pc && this.partHp[ci] > 0) {
      const before = this.partHp[ci];
      this.partHp[ci] = Math.max(0, before - dmg * 0.6 * partMult * (1 - armor * 0.5));
      const f0 = before / pc.hp;
      const f1 = this.partHp[ci] / pc.hp;
      if ((f0 > 0.5) !== (f1 > 0.5)) this.visual++;
      if (this.partHp[ci] <= 0) {
        this.statsDirty = true;
        this.visual++;
        w.onPartBroken(this, ci);
        if (pc.explosive) {
          const [lx, ly] = this.cellLocal(ci);
          const pp = this.toWorld(lx, ly, tmpA);
          w.explode(pp[0], pp[1], 26, 45, src);
        }
      }
    }
    const hd = dmg * (pc && this.partHp[ci] > 0 ? 0.7 : 1) * hullMult * (1 - armor);
    const hb = this.hullHp[ci];
    this.hullHp[ci] = Math.max(0, hb - hd);
    this.hullTotal -= hb - this.hullHp[ci];
    const hmax = hullC.hp;
    if ((hb / hmax > 0.5) !== (this.hullHp[ci] / hmax > 0.5) || (hb > 0 && this.hullHp[ci] <= 0)) this.visual++;
    const crewDmg = dmg * 0.5 * crewMult;
    if (crewDmg > 1) {
      const [cx, cy] = this.cellLocal(ci);
      for (let k = this.crew.length - 1; k >= 0; k--) {
        const c = this.crew[k];
        const dd = Math.abs(c.lx - cx) + Math.abs(c.ly - cy);
        if (dd > CELL * (crewMult > 1 ? 2.2 : 1.2)) continue;
        if (Math.random() > (crewMult > 1 ? 0.8 : 0.45)) continue;
        const def = c.armor ? 0.85 : 1;
        c.hp -= crewDmg * def * (0.6 + Math.random() * 0.8);
        if (c.hp <= 0) {
          if (this.stats.heal > 0 && Math.random() < 0.55) c.hp = 1;
          else {
            this.crew.splice(k, 1);
            this.statsDirty = true;
            w.onCrewDeath(this, c);
          }
        }
      }
    }
    if (this.integrity() < SINK_AT) this.startSink(w);
  }

  startSink(w: ShipWorld): void {
    if (this.sinking >= 0) return;
    this.sinking = 0;
    this.sail = 0;
    this.sailTarget = 0;
    w.sound('sink', this.x, this.y);
  }

  private updateDamage(dt: number, w: ShipWorld): void {
    const s = this.stats;
    let leak = 0;
    let burning = false;
    for (const i of this.cells) {
      const mx = COMPONENTS[this.design.hull[i]].hp;
      const f = this.hullHp[i] / mx;
      if (f < 0.6) leak += (0.6 - f) / 0.6;
      const fi = this.fire[i];
      if (fi > 0) {
        burning = true;
        const dmg = 2.6 * fi * dt;
        const hb = this.hullHp[i];
        this.hullHp[i] = Math.max(0, hb - dmg);
        this.hullTotal -= hb - this.hullHp[i];
        if (this.design.part[i] && this.partHp[i] > 0) {
          this.partHp[i] = Math.max(0, this.partHp[i] - dmg * 1.2);
          if (this.partHp[i] <= 0) {
            this.statsDirty = true;
            this.visual++;
            w.onPartBroken(this, i);
          }
        }
        this.fire[i] = Math.min(1.5, fi + dt * 0.05 - dt * (0.05 + s.repair * 0.035 + w.env.rain * 0.4));
        if (this.fire[i] < 0) this.fire[i] = 0;
        if (Math.random() < dt * 0.12 * fi) {
          const x = i % this.design.w;
          const y = (i / this.design.w) | 0;
          const k = (Math.random() * 4) | 0;
          const nx = x + DX[k];
          const ny = y + DY[k];
          if (nx >= 0 && ny >= 0 && nx < this.design.w && ny < this.design.h) {
            const j = ny * this.design.w + nx;
            if (this.design.hull[j] && this.fire[j] <= 0) this.fire[j] = 0.4;
          }
        }
        if (Math.random() < dt * 14 * fi) {
          const [lx, ly] = this.cellLocal(i);
          const p = this.toWorld(lx + (Math.random() - 0.5) * CELL, ly + (Math.random() - 0.5) * CELL, tmpA);
          w.particles.flame(p[0], p[1]);
        }
      }
    }
    const cells = this.cells.length || 1;
    const pump = 0.012 + s.repair * 0.006;
    this.flood = clamp(this.flood + ((leak / cells) * 0.085 - pump) * dt, 0, 1);
    if (this.flood >= 1) this.startSink(w);
    if (burning && this.integrity() < SINK_AT) this.startSink(w);
    this.repairTimer -= dt;
    if (this.repairTimer <= 0) {
      const iv = 0.25;
      this.repairTimer = iv;
      if (s.repair > 0) this.repair(s.repair * iv, w);
      if (s.heal > 0) {
        for (const c of this.crew) if (c.hp < c.maxHp) c.hp = Math.min(c.maxHp, c.hp + s.heal * iv);
      }
    }
  }

  repair(amount: number, w: ShipWorld): void {
    const avail = w.repairMaterial(this, amount);
    let budget = avail;
    for (const i of this.cells) {
      if (this.fire[i] > 0 && budget > 0) {
        this.fire[i] = Math.max(0, this.fire[i] - 0.08);
        budget -= 0.5;
      }
    }
    let guard = 0;
    while (budget > 0.01 && guard++ < 6) {
      let worst = -1;
      let wf = 1;
      let isPart = false;
      for (const i of this.cells) {
        const p = this.design.part[i];
        if (p) {
          const mx = COMPONENTS[p].hp;
          const f = this.partHp[i] / mx;
          if (f < 1 && f * 0.8 < wf) {
            wf = f * 0.8;
            worst = i;
            isPart = true;
          }
        }
        const hm = COMPONENTS[this.design.hull[i]].hp;
        const hf = this.hullHp[i] / hm;
        if (hf < wf) {
          wf = hf;
          worst = i;
          isPart = false;
        }
      }
      if (worst < 0) return;
      if (isPart) {
        const mx = COMPONENTS[this.design.part[worst]].hp;
        const before = this.partHp[worst];
        const add = Math.min(budget * 1.5, mx - before);
        this.partHp[worst] = before + add;
        budget -= add / 1.5;
        if (before <= 0 && this.partHp[worst] > 0) {
          this.statsDirty = true;
          this.visual++;
        }
        if ((before / mx > 0.5) !== (this.partHp[worst] / mx > 0.5)) this.visual++;
      } else {
        const mx = COMPONENTS[this.design.hull[worst]].hp;
        const before = this.hullHp[worst];
        const add = Math.min(budget, mx - before);
        this.hullHp[worst] = before + add;
        this.hullTotal += add;
        budget -= add;
        if ((before / mx > 0.5) !== (this.hullHp[worst] / mx > 0.5) || (before <= 0 && add > 0)) this.visual++;
      }
    }
  }

  repairFull(): void {
    for (const i of this.cells) {
      this.hullHp[i] = COMPONENTS[this.design.hull[i]].hp;
      if (this.design.part[i]) this.partHp[i] = COMPONENTS[this.design.part[i]].hp;
      this.fire[i] = 0;
    }
    this.hullTotal = this.base.hullMax;
    this.flood = 0;
    this.statsDirty = true;
    this.visual++;
  }

  repairFraction(): number {
    let missing = 0;
    let total = 0;
    for (const i of this.cells) {
      const hm = COMPONENTS[this.design.hull[i]].hp;
      missing += hm - this.hullHp[i];
      total += hm;
      if (this.design.part[i]) {
        const pm = COMPONENTS[this.design.part[i]].hp;
        missing += pm - this.partHp[i];
        total += pm;
      }
    }
    return total ? missing / total : 0;
  }

  updateCrewPositions(dt: number): void {
    for (const c of this.crew) {
      if (c.station >= 0) {
        const mates = this.crew.filter((o) => o.station === c.station);
        const idx = mates.indexOf(c);
        const [cx, cy] = this.cellLocal(c.station);
        c.tx = cx + (mates.length > 1 ? (idx === 0 ? -1.5 : 1.5) : 0);
        c.ty = cy + 1;
      } else {
        c.wander -= dt;
        if (c.wander <= 0) {
          c.wander = 2 + Math.random() * 5;
          const ci = this.cells[(Math.random() * this.cells.length) | 0];
          const [cx, cy] = this.cellLocal(ci);
          c.tx = cx + (Math.random() - 0.5) * 3;
          c.ty = cy + (Math.random() - 0.5) * 3;
        }
      }
      const dx = c.tx - c.lx;
      const dy = c.ty - c.ly;
      const d = Math.hypot(dx, dy);
      const sp = 14 * dt;
      if (d > sp) {
        c.lx += (dx / d) * sp;
        c.ly += (dy / d) * sp;
      } else {
        c.lx = c.tx;
        c.ly = c.ty;
      }
    }
  }

  placeCrewInstantly(): void {
    this.updateCrewPositions(0);
    for (const c of this.crew) {
      if (c.station < 0) {
        const ci = this.cells[(Math.random() * this.cells.length) | 0];
        const [cx, cy] = this.cellLocal(ci);
        c.tx = cx;
        c.ty = cy;
      }
      c.lx = c.tx;
      c.ly = c.ty;
    }
  }

  gunReadyFraction(side: number): number {
    let total = 0, ready = 0;
    for (const ci of this.guns) {
      if (this.partHp[ci] <= 0) continue;
      const g = COMPONENTS[this.design.part[ci]].gun!;
      const dir = this.design.dir[ci];
      if (side >= 0 && !g.lob && dir !== side) continue;
      if (side === -2 && !g.lob) continue;
      total++;
      const rt = this.reloadTime(ci);
      ready += this.reload[ci] <= 0 ? 1 : 1 - this.reload[ci] / rt;
    }
    return total ? ready / total : -1;
  }
}

function roleLikes(role: string, st: Station): boolean {
  switch (role) {
    case 'deckhand': return st === 'sail' || st === 'oar';
    case 'helmsman': return st === 'helm';
    case 'navigator': return st === 'helm' || st === 'nest';
    case 'gunner': return st === 'gun' || st === 'mortar';
    case 'master_gunner': return st === 'gun' || st === 'mortar';
    case 'powder_monkey': return st === 'magazine';
    case 'carpenter': return st === 'workshop';
    case 'surgeon': return st === 'sickbay';
    case 'cook': return st === 'galley';
    case 'lookout': return st === 'nest';
    case 'boatswain': return st === 'sail' || st === 'oar';
    case 'quartermaster': return st === 'cargo';
    case 'marine': return st === 'gun';
    case 'diver': return st === 'oar';
    case 'shantyman': return st === 'oar' || st === 'sail';
    default: return true;
  }
}

const tmpA: number[] = [0, 0];
const GENERALISTS = new Set(['deckhand', 'boatswain', 'shantyman', 'diver', 'marine']);
