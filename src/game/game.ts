import { RNG, hash2, WORLD_SEED } from '../core/rng';
import { angleDiff, clamp, dist2, wrapAngle } from '../core/math';
import { Input } from '../core/input';
import { audio } from '../audio/audio';
import { COMPONENTS, GunSpec, KEELS } from '../data/components';
import { ITEM } from '../data/items';
import { ROLE } from '../data/crew';
import { STRUCT, PLANTATION_CROPS } from '../data/structures';
import { TEMPLATES, ShipTemplate, AIFaction } from '../data/fleets';
import { ChunkManager } from '../world/chunks';
import {
  CENTER, REGION, WORLD_SIZE, UNITS_PER_MILE, Island, getIsland, islandsInRect, portLayout, regionIslands, levelAt, biomeAt,
  START_ISLAND_ID, F_CROWN, F_BRETHREN, B_MIST, I_SKULL, heightAt, HeightSample, ISLAND_TYPE_NAMES
} from '../world/worldgen';
import { shipPassable, isWater, walkable, T_SAND, T_DEEP, T_OCEAN, EDGE_MARGIN } from '../world/terrain';
import { captainName, shipName } from '../world/names';
import { Env } from './env';
import { Particles } from './particles';
import { Profile, Quest, TreasureMapData, OwnedIsland } from './player';
import { Ship, ShipWorld, Ammo } from './ship';
import { parseDesign, CELL, cloneDesign } from './design';
import { CrewMember, genCrew, gainXp, combatPower, Order } from './crew';
import { AIState, AIWorld, newAI, updateAI } from './ai';
import { Avatar, Mob, makeMob, updateMob } from './avatar';
import { POI, poisNear, TUTORIAL_CRATE_ID } from './pois';
import { rollLoot, LootDrop, LootKind, makeTreasureMap, findLandSpot } from './loot';
import { TUTORIAL, setNextQuestId } from './quests';
import { structureSlots } from './economy';
import { SeaMonster } from './monster';
import { Ambient } from './ambient';

export type Mode = 'title' | 'sail' | 'foot' | 'dead';

export interface FloatLoot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  gold: number;
  items: LootDrop[];
  kind: number;
  bob: number;
}

export interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  dmg: number;
  ammo: Ammo;
  owner: Ship | null;
  lob: boolean;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  t: number;
  dur: number;
  splash: number;
  size: number;
  z: number;
  foot: boolean;
  fort: number;
}

export interface FloatText {
  x: number;
  y: number;
  text: string;
  color: number;
  life: number;
  max: number;
}

export interface Fort {
  x: number;
  y: number;
  faction: number;
  reload: number;
  island: number;
  player: boolean;
}

export interface Prompt {
  key: string;
  text: string;
  action: () => void;
}

export interface BoardResult {
  win: boolean;
  enemy: Ship;
  ourStart: number;
  theirStart: number;
  rounds: { ours: number; theirs: number }[];
  dead: CrewMember[];
  gold: number;
  items: LootDrop[];
  recruits: CrewMember[];
}

type Handler = (...args: unknown[]) => void;

const hs: HeightSample = { h: 0, isl: null };
const tmpP: number[] = [0, 0];
const tmpIslands: Island[] = [];
const tmpPOIs: POI[] = [];

export const AMMO_ITEMS: { ammo: Ammo; item: string; name: string }[] = [
  { ammo: 'round', item: 'cannonball', name: 'Round Shot' },
  { ammo: 'chain', item: 'chain_shot', name: 'Chain Shot' },
  { ammo: 'grape', item: 'grapeshot', name: 'Grapeshot' },
  { ammo: 'heated', item: 'heated_shot', name: 'Heated Shot' }
];

export class Game implements ShipWorld, AIWorld {
  chunks = new ChunkManager();
  env = new Env();
  particles = new Particles();
  profile = new Profile();
  ships: Ship[] = [];
  player!: Ship;
  projectiles: Projectile[] = [];
  loot: FloatLoot[] = [];
  texts: FloatText[] = [];
  mobs: Mob[] = [];
  forts: Fort[] = [];
  avatar: Avatar | null = null;
  monsters: SeaMonster[] = [];
  ambient = new Ambient();
  mode: Mode = 'title';
  cam = { x: CENTER, y: CENTER, zoom: 0, shake: 0 };
  view = { x: 0, y: 0, w: 480, h: 270, scale: 4 };
  mouseWX = 0;
  mouseWY = 0;
  prompt: Prompt | null = null;
  prompt2: Prompt | null = null;
  ammoIdx = 0;
  uiOpen = false;
  docked: Island | null = null;
  nearIsland: Island | null = null;
  seenIslands = new Set<number>();
  private handlers: Record<string, Handler[]> = {};
  private lootId = 1;
  private spawnT = 1;
  private discoverT = 0;
  private fortT = 0;
  private saveT = 30;
  private moraleT = 0;
  private plankAcc = 0;
  private fishT = 10;
  private notorietyT = 0;
  private biomeName = '';
  private lastRegionLevel = 0;
  private spawnedGuards = new Set<number>();
  private crabT = 4;
  private tutorialRaft: Ship | null = null;
  private deathT = 0;
  questShips = new Map<number, Ship>();
  hitFlash = 0;
  boardCooldown = 0;
  fps = 0;
  lastAmmoWarn = 0;
  freeRepair = false;

  on(ev: string, fn: Handler): void {
    (this.handlers[ev] ??= []).push(fn);
  }

  emit(ev: string, ...args: unknown[]): void {
    const l = this.handlers[ev];
    if (l) for (const fn of l) fn(...args);
  }

  toast(msg: string, color = '#f0e6c8'): void {
    this.emit('toast', msg, color);
  }

  float(x: number, y: number, text: string, color = 0xffe080): void {
    this.texts.push({ x, y, text, color, life: 1.4, max: 1.4 });
  }

  sound(name: string, x: number, y: number, vol = 1, pitch = 1): void {
    audio.play(name, x, y, vol, pitch);
  }

  typeAt(x: number, y: number): number {
    return this.chunks.typeAt(x, y);
  }

  startNew(name: string): void {
    this.profile = new Profile();
    this.profile.name = name || 'Captain';
    const p = this.profile;
    p.inv.add('rations', 6);
    p.inv.add('water', 6);
    p.inv.add('cannonball', 12);
    p.inv.add('planks', 4);
    const start = getIsland(START_ISLAND_ID)!;
    const L = portLayout(start)!;
    p.lastPort = start.id;
    this.env.update(0, start.x, start.y);
    p.startDay = this.env.day;
    const cx = Math.floor(start.x / 1024);
    const cy = Math.floor(start.y / 1024);
    for (let x = cx - 3; x <= cx + 3; x++) for (let y = cy - 3; y <= cy + 3; y++) if ((x - cx) ** 2 + (y - cy) ** 2 <= 10) p.discovered[y * 500 + x] = 1;
    p.visitedPorts.push(start.id);
    p.x = L.berthX + L.dirX * 40;
    p.y = L.berthY + L.dirY * 40;
    p.heading = Math.atan2(L.dirY, L.dirX);
    this.loadWorld();
    this.toast(`Welcome aboard, Captain ${p.name}.`, '#ffd870');
  }

  loadWorld(): void {
    const p = this.profile;
    let maxCrew = 0;
    for (const c of p.crew) maxCrew = Math.max(maxCrew, c.id);
    let maxQ = 0;
    for (const q of p.quests) maxQ = Math.max(maxQ, q.id);
    setNextQuestId(maxQ + 1);
    this.ships = [];
    this.projectiles = [];
    this.loot = [];
    this.mobs = [];
    this.monsters = [];
    this.questShips.clear();
    const s = new Ship(p.design);
    s.isPlayer = true;
    s.faction = 'player';
    s.name = p.design.name;
    s.captain = p.name;
    s.x = p.x;
    s.y = p.y;
    s.heading = p.heading;
    s.crew = p.crew;
    s.autoAssign('sail');
    s.placeCrewInstantly();
    this.player = s;
    this.ships.push(s);
    this.syncCargo();
    this.cam.x = s.x;
    this.cam.y = s.y;
    this.mode = 'sail';
    this.avatar = null;
    this.docked = null;
    this.env.update(0, s.x, s.y);
    if (p.lastDay < 0) p.lastDay = this.env.day;
    this.emit('loaded');
  }

  syncCargo(): void {
    this.player.cargoMass = this.profile.inv.weight();
    this.player.extraSpeed = this.profile.inv.passive('speed');
    this.player.extraReload = this.profile.inv.passive('reload');
    this.player.stormResist = Math.min(0.9, this.profile.inv.passive('storm'));
    this.player.statsDirty = true;
  }

  cargoCap(): number {
    return this.player.stats ? this.player.stats.cargoCap : this.player.base.cargo;
  }

  cargoFree(): number {
    return this.cargoCap() - this.profile.inv.weight();
  }

  addItems(items: LootDrop[], gold: number, x: number, y: number, source: string): LootDrop[] {
    const left: LootDrop[] = [];
    const p = this.profile;
    if (gold > 0) {
      p.gold += gold;
      p.stats.goldEarned += gold;
      this.float(x, y - 8, `+${gold}g`, 0xffd040);
    }
    const got: string[] = [];
    let free = this.cargoFree();
    for (const it of items) {
      const def = ITEM[it.id];
      if (!def) continue;
      const w = def.weight;
      let take = it.qty;
      if (w > 0) take = Math.min(it.qty, Math.floor((free + 1e-6) / w));
      if (it.id === 'treasure_map' && !it.data) {
        const data = makeTreasureMap(x, y, new RNG(hash2(x | 0, y | 0, this.lootId++)), levelAt(x, y));
        if (data) it.data = data;
        else continue;
      }
      if (take > 0) {
        if (it.data) p.inv.add(it.id, 1, it.data);
        else p.inv.add(it.id, take);
        free -= take * w;
        got.push(`${take > 1 ? take + ' ' : ''}${def.name}`);
      }
      if (take < it.qty) left.push({ id: it.id, qty: it.qty - take, data: it.data });
    }
    if (got.length) this.toast(`${source}: ${got.join(', ')}`, '#c8f0a0');
    if (left.length) this.toast('Your hold is full! Some cargo was left behind.', '#ff9a7a');
    this.syncCargo();
    return left;
  }

  dropLoot(x: number, y: number, gold: number, items: LootDrop[], kind = 0): void {
    this.loot.push({ id: this.lootId++, x, y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, life: 240, gold, items, kind, bob: Math.random() * 6 });
  }

  luck(): number {
    const s = this.player.stats;
    let l = (s?.luck ?? 0) + this.profile.inv.passive('luck');
    for (const c of this.profile.crew) if (c.traits.includes('lucky')) l += 0.05;
    return l;
  }

  update(dt: number, input: Input): void {
    if (this.mode === 'title') return;
    const p = this.profile;
    p.stats.playSeconds += dt;
    const focus = this.avatar ?? this.player;
    this.env.update(dt, focus.x, focus.y);
    this.boardCooldown -= dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt * 2);
    if (this.mode === 'sail') this.controlShip(dt, input);
    else if (this.mode === 'foot') this.controlAvatar(dt, input);
    else if (this.mode === 'dead') {
      this.deathT += dt;
      this.player.turnInput = 0;
    }
    for (const s of this.ships) {
      if (s.isPlayer) continue;
      if (s.ai) updateAI(s.ai as AIState, s, this, dt);
    }
    for (const s of this.ships) {
      if (s.docked) {
        s.speed = 0;
        s.turnInput = 0;
      } else s.update(dt, this);
      this.emitWake(s, dt);
    }
    this.updateMonsters(dt);
    this.shipCollisions(dt);
    this.updateProjectiles(dt);
    for (const s of this.ships) if (s.sinking >= 0 && !s.sinkHandled) this.onSink(s);
    this.updateForts(dt);
    this.updateLoot(dt);
    this.updateMobs(dt);
    this.updateWeatherFx(dt);
    this.ambient.update(dt, this.cam.x, this.cam.y, this.view.w, this.view.h, !!this.nearIsland || this.mode === 'foot', this.env.windAngle, this.env.windStrength, (x, y) => this.typeAt(x, y), this.particles);
    this.particles.update(dt);
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt;
      t.y -= dt * 14;
      if (t.life <= 0) this.texts.splice(i, 1);
    }
    for (let i = this.ships.length - 1; i >= 0; i--) if (this.ships[i].dead && !this.ships[i].isPlayer) this.ships.splice(i, 1);
    this.spawnT -= dt;
    if (this.spawnT <= 0) {
      this.spawnT = 3;
      this.spawner();
    }
    this.discoverT -= dt;
    if (this.discoverT <= 0) {
      this.discoverT = 0.5;
      this.discover();
    }
    this.moraleT -= dt;
    if (this.moraleT <= 0) {
      this.moraleT = 5;
      this.tickMorale(5);
    }
    if (this.env.day !== p.lastDay) {
      const days = this.env.day - p.lastDay;
      p.lastDay = this.env.day;
      if (days > 0) this.dailyTick();
    }
    this.notorietyT += dt;
    if (this.notorietyT > 60) {
      this.notorietyT = 0;
      if (p.notoriety > 0) p.notoriety = Math.max(0, p.notoriety - 1);
      this.produceIslands();
    }
    this.updatePrompts();
    this.updateQuests(dt);
    this.updateCamera(dt);
    if (this.player.sinking < 0) {
      p.x = this.player.x;
      p.y = this.player.y;
      p.heading = this.player.heading;
    }
    this.saveT -= dt;
    if (this.saveT <= 0) {
      this.saveT = 30;
      this.emit('autosave');
    }
    const ship = this.player;
    audio.setListener(this.cam.x, this.cam.y, this.view.w / 2);
    const spd = Math.abs(ship.speed);
    audio.setAmbience(
      this.mode === 'foot' ? 0.5 : 0.55 + Math.min(0.45, spd / 120),
      clamp(this.env.windStrength * 0.6 + this.env.storm * 0.8 + spd / 200, 0, 1.2),
      this.env.rain,
      this.env.windStrength
    );
    const combat = this.env.time - ship.lastCombat < 12;
    audio.music?.play(this.docked ? 'port' : combat ? 'battle' : this.env.night ? 'night' : 'sea');
  }

  private controlShip(dt: number, input: Input): void {
    const s = this.player;
    if (this.uiOpen || s.sinking >= 0) {
      s.turnInput = 0;
      return;
    }
    if (this.docked) {
      if (input.hitAny('KeyW', 'ArrowUp', 'KeyE', 'Escape')) this.undock();
      return;
    }
    let turn = 0;
    if (input.keyAny('KeyA', 'ArrowLeft')) turn -= 1;
    if (input.keyAny('KeyD', 'ArrowRight')) turn += 1;
    s.turnInput = turn;
    if (turn !== 0 && this.profile.tutorial === 1) this.advanceTutorial(1);
    if (input.hitAny('KeyW', 'ArrowUp')) {
      if (s.anchored) {
        s.anchored = false;
        this.toast('Anchor raised.');
      }
      const before = s.sailTarget;
      s.sailTarget = s.sailTarget < 0.25 ? 0.5 : 1;
      if (before !== s.sailTarget) audio.ui('sail');
      if (this.profile.tutorial === 0) this.advanceTutorial(0);
    }
    if (input.hitAny('KeyS', 'ArrowDown')) {
      const before = s.sailTarget;
      s.sailTarget = s.sailTarget > 0.75 ? 0.5 : 0;
      if (before !== s.sailTarget) audio.ui('sail');
    }
    if (input.hit('KeyQ')) {
      if (s.stats.oarPower > 0) {
        s.rowing = !s.rowing;
        this.toast(s.rowing ? 'Oars out! Rowing.' : 'Oars shipped.');
      } else this.toast('You have no manned oar benches.', '#ff9a7a');
    }
    if (input.hit('KeyX')) {
      s.anchored = !s.anchored;
      audio.ui('anchor');
      this.toast(s.anchored ? 'Anchor dropped.' : 'Anchor raised.');
    }
    if (input.hit('KeyR')) this.cycleAmmo();
    const orders: Order[] = ['sail', 'battle', 'repair', 'board', 'rest'];
    for (let i = 0; i < 5; i++) if (input.hit(`Digit${i + 1}`)) this.setOrder(orders[i]);
    if (input.mouseDown && !this.uiOpen) {
      const n = s.fireAt(this.mouseWX, this.mouseWY, this);
      if (n === 0 && input.clicked && s.guns.length) {
        const anyReady = s.guns.some((ci) => s.gunReady(ci));
        if (anyReady && this.env.time - this.lastAmmoWarn > 1.2) {
          const bears = s.guns.some((ci) => s.gunReady(ci) && s.gunBears(ci, this.mouseWX, this.mouseWY));
          if (bears) this.toast('Out of ammunition for those guns!', '#ff9a7a');
          this.lastAmmoWarn = this.env.time;
        }
      }
    }
    if (input.rightClicked) this.profile.waypoint = { x: this.mouseWX, y: this.mouseWY };
    if (this.prompt && input.hit('KeyE')) this.prompt.action();
    if (this.prompt2 && input.hit('KeyF')) this.prompt2.action();
  }

  setOrder(o: Order): void {
    const s = this.player;
    s.autoAssign(o);
    audio.ui('click');
    this.emit('order', o);
  }

  cycleAmmo(): void {
    for (let k = 1; k <= AMMO_ITEMS.length; k++) {
      const i = (this.ammoIdx + k) % AMMO_ITEMS.length;
      if (this.profile.inv.has(AMMO_ITEMS[i].item)) {
        this.ammoIdx = i;
        this.toast(`Loading ${AMMO_ITEMS[i].name}.`);
        audio.ui('click');
        return;
      }
    }
    this.toast('No other ammunition aboard.', '#ff9a7a');
  }

  private controlAvatar(dt: number, input: Input): void {
    const a = this.avatar!;
    if (this.uiOpen) return;
    let dx = 0;
    let dy = 0;
    if (input.keyAny('KeyA', 'ArrowLeft')) dx -= 1;
    if (input.keyAny('KeyD', 'ArrowRight')) dx += 1;
    if (input.keyAny('KeyW', 'ArrowUp')) dy -= 1;
    if (input.keyAny('KeyS', 'ArrowDown')) dy += 1;
    const moved = a.move(dx, dy, dt, (x, y) => this.typeAt(x, y));
    if (moved) {
      a.stepT -= dt;
      if (a.stepT <= 0) {
        a.stepT = 0.32;
        this.sound('step', a.x, a.y, 0.7);
      }
      if (a.dig > 0) a.dig = 0;
    }
    a.attackCd -= dt;
    a.swing = Math.max(0, a.swing - dt);
    a.hurt = Math.max(0, a.hurt - dt);
    a.iframes = Math.max(0, a.iframes - dt);
    if (a.hp < a.maxHp && a.hurt <= 0) a.hp = Math.min(a.maxHp, a.hp + dt * 1.5);
    if (input.mouseDown && a.attackCd <= 0) this.avatarAttack();
    if (a.onLava((x, y) => this.typeAt(x, y))) this.hurtAvatar(30 * dt, true);
    if (a.dig > 0) {
      a.dig += dt;
      if (Math.random() < dt * 6) {
        this.particles.dust(a.x + Math.cos(a.dir) * 5, a.y + Math.sin(a.dir) * 5, 2);
        this.sound('dig', a.x, a.y, 0.6);
      }
      if (a.dig >= 2.2) this.finishDig();
    }
    if (this.prompt && input.hit('KeyE')) this.prompt.action();
    else if (this.prompt2 && input.hit('KeyF')) this.prompt2.action();
  }

  private avatarAttack(): void {
    const a = this.avatar!;
    const p = this.profile;
    const w = p.weapon ? ITEM[p.weapon] : null;
    const ranged = w && (w.id === 'flintlock' || w.id === 'musket' || w.id === 'blunderbuss');
    const ang = Math.atan2(this.mouseWY - a.y, this.mouseWX - a.x);
    a.dir = ang;
    if (ranged) {
      if (!p.inv.has('pistol_shot')) {
        if (this.env.time - this.lastAmmoWarn > 1) this.toast('No pistol shot!', '#ff9a7a');
        this.lastAmmoWarn = this.env.time;
        a.attackCd = 0.4;
        return;
      }
      p.inv.remove('pistol_shot', 1);
      const n = w!.id === 'blunderbuss' ? 5 : 1;
      for (let i = 0; i < n; i++) {
        const sp = ang + (n > 1 ? (Math.random() - 0.5) * 0.5 : 0);
        this.projectiles.push(this.mkProj(a.x, a.y, Math.cos(sp) * 320, Math.sin(sp) * 320, w!.id === 'musket' ? 0.7 : 0.35, (w!.combat ?? 5) * 2.4, 'free', null, true));
      }
      this.particles.smoke(a.x + Math.cos(ang) * 6, a.y + Math.sin(ang) * 6, 3, 6);
      this.sound('pistol', a.x, a.y);
      a.attackCd = w!.id === 'musket' ? 1.4 : w!.id === 'blunderbuss' ? 1.6 : 1.0;
      a.swing = 0.15;
      return;
    }
    a.attackCd = 0.45;
    a.swing = 0.25;
    this.sound('sword', a.x, a.y);
    const dmg = 8 + (w?.combat ?? 0) * 2.5;
    for (const m of this.mobs) {
      if (m.dead) continue;
      const dx = m.x - a.x;
      const dy = m.y - a.y;
      const d = Math.hypot(dx, dy);
      if (d > 20) continue;
      if (Math.abs(angleDiff(ang, Math.atan2(dy, dx))) > 1.2 && d > 6) continue;
      this.hurtMob(m, dmg);
    }
  }

  private hurtMob(m: Mob, dmg: number): void {
    m.hp -= dmg;
    m.hurt = 0.3;
    const a = this.avatar;
    if (a) {
      const dx = m.x - a.x;
      const dy = m.y - a.y;
      const d = Math.hypot(dx, dy) || 1;
      const nx = m.x + (dx / d) * 6;
      const ny = m.y + (dy / d) * 6;
      if (walkable(this.typeAt(nx, ny))) {
        m.x = nx;
        m.y = ny;
      }
    }
    this.float(m.x, m.y - 6, `${Math.round(dmg)}`, 0xffffff);
    this.sound('hit', m.x, m.y, 0.4, 1.6);
    if (m.hp <= 0) {
      m.dead = true;
      this.particles.dust(m.x, m.y, 8);
      const loot = rollLoot('mob', m.level, new RNG(m.id * 7919), this.luck());
      this.addItems(loot.items, loot.gold, m.x, m.y, m.kind === 'crab' ? 'Crab' : m.kind === 'skeleton' ? 'Skeleton' : 'Wraith');
      this.profile.fame += m.kind === 'crab' ? 0 : 1;
    }
  }

  hurtAvatar(dmg: number, silent = false): void {
    const a = this.avatar;
    if (!a) return;
    if (!silent) {
      if (a.iframes > 0) return;
      a.iframes = 0.5;
    }
    const p = this.profile;
    const def = (p.armor ? ITEM[p.armor].defense ?? 0 : 0) + (p.hat ? ITEM[p.hat].defense ?? 0 : 0);
    const d = dmg * (1 - Math.min(0.6, def * 0.06));
    a.hp -= d;
    if (!silent) {
      a.hurt = 0.3;
      this.sound('hurt', a.x, a.y);
      this.float(a.x, a.y - 10, `-${Math.round(d)}`, 0xff6050);
    }
    p.captainHp = Math.max(0, a.hp);
    if (a.hp <= 0) {
      this.toast('You were knocked out! Your crew carried you back aboard.', '#ff7a6a');
      const lost = Math.floor(p.gold * 0.1);
      p.gold -= lost;
      if (lost > 0) this.toast(`You lost ${lost} gold.`, '#ff9a7a');
      this.boardShip();
      p.captainHp = 35;
    }
  }

  private updateMobs(dt: number): void {
    const a = this.mode === 'foot' ? this.avatar : null;
    for (const m of this.mobs) {
      if (m.dead) continue;
      const dmg = updateMob(m, a, dt, (x, y) => this.typeAt(x, y));
      if (dmg > 0 && a) this.hurtAvatar(dmg);
    }
    for (let i = this.mobs.length - 1; i >= 0; i--) if (this.mobs[i].dead) this.mobs.splice(i, 1);
    if (!a) return;
    this.crabT -= dt;
    if (this.crabT <= 0) {
      this.crabT = 6 + Math.random() * 6;
      const near = this.mobs.filter((m) => m.kind === 'crab').length;
      if (near < 3 && Math.random() < 0.5) {
        for (let k = 0; k < 10; k++) {
          const ang = Math.random() * Math.PI * 2;
          const x = a.x + Math.cos(ang) * 90;
          const y = a.y + Math.sin(ang) * 90;
          if (this.typeAt(x, y) === T_SAND) {
            this.mobs.push(makeMob('crab', x, y, levelAt(x, y), -1));
            break;
          }
        }
      }
    }
  }

  private finishDig(): void {
    const a = this.avatar!;
    a.dig = 0;
    const p = this.profile;
    const tgt = a.digTarget;
    a.digTarget = -1;
    if (tgt === -2) {
      const entry = p.inv.items.find((it) => it.id === 'treasure_map' && it.data && Math.hypot(it.data.x - a.x, it.data.y - a.y) < 18);
      if (!entry || !entry.data) return;
      const d = entry.data;
      p.inv.removeEntry(entry);
      const loot = rollLoot('treasure', d.level, new RNG(d.seed), this.luck(), 1.3);
      this.particles.gold(a.x, a.y, 20);
      audio.ui('chest');
      this.addItems(loot.items, loot.gold, a.x, a.y, 'Buried treasure');
      p.stats.treasures++;
      p.fame += 8 + d.level * 2;
      this.toast(`You unearthed the treasure of ${d.island}!`, '#ffd870');
      if (p.tutorial === 8) this.advanceTutorial(8);
      return;
    }
    const poi = this.findPOI(tgt);
    if (!poi) return;
    p.looted[poi.id] = this.env.epoch;
    const loot = rollLoot('buried', poi.level, new RNG(poi.id * 31 + Math.floor(this.env.epoch / poi.respawn)), this.luck());
    this.particles.gold(a.x, a.y, 10);
    audio.ui('chest');
    this.addItems(loot.items, loot.gold, a.x, a.y, 'Dug up');
    p.stats.treasures++;
  }

  findPOI(id: number): POI | null {
    const f = this.avatar ?? this.player;
    poisNear(f.x, f.y, 600, tmpPOIs);
    return tmpPOIs.find((q) => q.id === id) ?? null;
  }

  poiAvailable(poi: POI): boolean {
    const t = this.profile.looted[poi.id];
    if (t === undefined) return true;
    if (poi.respawn <= 0) return false;
    return this.env.epoch - t > poi.respawn;
  }

  private updatePrompts(): void {
    this.prompt = null;
    this.prompt2 = null;
    this.nearIsland = null;
    if (this.uiOpen) return;
    if (this.mode === 'sail') this.shipPrompts();
    else if (this.mode === 'foot') this.footPrompts();
  }

  private shipPrompts(): void {
    const s = this.player;
    if (s.sinking >= 0 || this.docked) return;
    islandsInRect(s.x - 900, s.y - 900, s.x + 900, s.y + 900, tmpIslands);
    let nearPort: Island | null = null;
    for (const isl of tmpIslands) {
      if (!isl.port) continue;
      const L = portLayout(isl);
      if (!L) continue;
      if (dist2(s.x, s.y, L.berthX, L.berthY) < 110 * 110) nearPort = isl;
    }
    const slow = Math.abs(s.speed) < 30;
    if (nearPort) {
      const blocked = nearPort.port!.faction === F_CROWN && this.profile.notoriety >= 70;
      this.prompt = {
        key: 'E',
        text: blocked ? `${nearPort.port!.name} refuses you (notoriety too high)` : `Dock at ${nearPort.port!.name}`,
        action: () => {
          if (blocked) {
            audio.ui('error');
            return;
          }
          if (!slow) {
            this.toast('Slow down to dock.', '#ff9a7a');
            return;
          }
          this.dock(nearPort!);
        }
      };
    }
    for (const isl of tmpIslands) {
      if (dist2(s.x, s.y, isl.x, isl.y) < (isl.rinf + 50) * (isl.rinf + 50)) {
        this.nearIsland = isl;
        break;
      }
    }
    if (!this.prompt) {
      poisNear(s.x, s.y, 80, tmpPOIs);
      for (const poi of tmpPOIs) {
        if (poi.kind !== 'wreck' || !this.poiAvailable(poi)) continue;
        this.prompt = {
          key: 'E',
          text: 'Salvage the wreck',
          action: () => {
            if (Math.abs(s.speed) > 20) {
              this.toast('Slow down to salvage.', '#ff9a7a');
              return;
            }
            this.salvage(poi);
          }
        };
        break;
      }
    }
    if (!this.prompt) {
      for (const q of this.profile.quests) {
        if (q.kind !== 'salvage' || q.done) continue;
        if (dist2(s.x, s.y, q.x, q.y) < 80 * 80) {
          this.prompt = {
            key: 'E',
            text: 'Salvage the Guild wreck',
            action: () => {
              q.done = true;
              this.sound('splash', q.x, q.y);
              this.particles.splash(q.x, q.y, 14);
              this.toast(`Recovered the strongbox! Return to ${q.portName}.`, '#ffd870');
              audio.ui('quest');
            }
          };
        }
      }
    }
    const lc = this.profile;
    if (!this.prompt && lc.lost && dist2(s.x, s.y, lc.lost.x, lc.lost.y) < 90 * 90) {
      this.prompt = {
        key: 'E',
        text: 'Recover your lost cargo',
        action: () => {
          const left = this.addItems(lc.lost!.items, 0, s.x, s.y, 'Recovered');
          lc.lost = left.length ? { ...lc.lost!, items: left } : null;
        }
      };
    }
    if (!this.prompt && slow) {
      const spot = this.landingSpot(60);
      if (spot) {
        const owned = this.nearIsland && this.profile.ownedIsland(this.nearIsland.id);
        const dockable = owned && owned.structures.includes('dock');
        this.prompt = {
          key: 'E',
          text: dockable ? `Go ashore (${this.nearIsland!.name}, your dock)` : `Go ashore${this.nearIsland ? ' on ' + this.nearIsland.name : ''}`,
          action: () => this.goAshore(spot[0], spot[1])
        };
      }
    }
    let boardTarget: Ship | null = null;
    for (const o of this.ships) {
      if (o === s || o.sinking >= 0) continue;
      const lim = s.radius + o.radius + 22;
      if (dist2(s.x, s.y, o.x, o.y) > lim * lim) continue;
      if (o.surrendered || o.integrity() < 0.55 || Math.abs(o.speed) < 14) boardTarget = o;
    }
    if (boardTarget && this.boardCooldown <= 0) {
      const t = boardTarget;
      this.prompt2 = { key: 'F', text: t.surrendered ? `Board the ${t.name} (surrendered)` : `Board the ${t.name}!`, action: () => this.board(t) };
    }
  }

  private landingSpot(range: number): [number, number] | null {
    const s = this.player;
    let best: [number, number] | null = null;
    let bd = Infinity;
    for (let k = 0; k < s.probes.length; k += 2) {
      const p = s.toWorld(s.probes[k], s.probes[k + 1], tmpP);
      for (let a = 0; a < 8; a++) {
        const ang = (a / 8) * Math.PI * 2;
        for (let d = 4; d <= range; d += 6) {
          const x = p[0] + Math.cos(ang) * d;
          const y = p[1] + Math.sin(ang) * d;
          const t = this.typeAt(x, y);
          if (walkable(t) && !isWater(t)) {
            const dd = dist2(x, y, s.x, s.y);
            if (dd < bd) {
              bd = dd;
              best = [x, y];
            }
            break;
          }
        }
      }
    }
    return best;
  }

  private footPrompts(): void {
    const a = this.avatar!;
    const p = this.profile;
    const s = this.player;
    if (dist2(a.x, a.y, s.x, s.y) < (s.radius + 28) * (s.radius + 28)) {
      this.prompt = { key: 'E', text: `Return to the ${s.name}`, action: () => this.boardShip() };
    }
    islandsInRect(a.x, a.y, a.x, a.y, tmpIslands);
    for (const isl of tmpIslands) {
      if (dist2(a.x, a.y, isl.x, isl.y) < isl.rinf * isl.rinf) this.nearIsland = isl;
      if (isl.port) {
        const L = portLayout(isl);
        if (L && dist2(a.x, a.y, L.townX, L.townY) < 90 * 90 && !this.prompt) {
          this.prompt = { key: 'E', text: `Visit ${isl.port.name}`, action: () => this.emit('port', isl) };
        }
      }
    }
    for (const entry of p.inv.items) {
      if (entry.id !== 'treasure_map' || !entry.data) continue;
      if (Math.hypot(entry.data.x - a.x, entry.data.y - a.y) < 18) {
        this.prompt = {
          key: 'E',
          text: 'Dig here (X marks the spot!)',
          action: () => {
            if (!p.inv.has('shovel')) {
              this.toast('You need a Shovel to dig.', '#ff9a7a');
              audio.ui('error');
              return;
            }
            a.dig = 0.01;
            a.digTarget = -2;
          }
        };
      }
    }
    poisNear(a.x, a.y, 120, tmpPOIs);
    let best: POI | null = null;
    let bd = Infinity;
    for (const poi of tmpPOIs) {
      if (poi.kind === 'flotsam' || poi.kind === 'bottle' || poi.kind === 'wreck') continue;
      if (poi.kind !== 'claim' && !this.poiAvailable(poi)) continue;
      if ((poi.kind === 'chest' || poi.kind === 'shrine') && poi.guarded && !this.spawnedGuards.has(poi.id) && dist2(a.x, a.y, poi.x, poi.y) < 110 * 110) this.spawnGuards(poi);
      const d = dist2(a.x, a.y, poi.x, poi.y);
      if (d < 16 * 16 && d < bd) {
        bd = d;
        best = poi;
      }
    }
    if (best) {
      const poi = best;
      if (poi.kind === 'chest') {
        this.prompt = { key: 'E', text: poi.locked ? 'Pick the lock (needs Lockpick Set)' : 'Open the chest', action: () => this.openChest(poi) };
      } else if (poi.kind === 'dig') {
        this.prompt = {
          key: 'E',
          text: 'Dig the suspicious sand',
          action: () => {
            if (!p.inv.has('shovel')) {
              this.toast('You need a Shovel to dig.', '#ff9a7a');
              audio.ui('error');
              return;
            }
            a.dig = 0.01;
            a.digTarget = poi.id;
          }
        };
      } else if (poi.kind === 'claim') {
        const isl = getIsland(poi.island);
        if (isl) this.prompt = { key: 'E', text: p.ownedIsland(isl.id) ? `Manage ${p.ownedIsland(isl.id)!.name}` : `Claim stone: ${isl.name}`, action: () => this.emit('claim', isl) };
      } else if (poi.kind === 'shrine') {
        this.prompt = { key: 'E', text: 'Plunder the ancient shrine', action: () => this.openShrine(poi) };
      }
    }
  }

  private spawnGuards(poi: POI): void {
    this.spawnedGuards.add(poi.id);
    const isl = getIsland(poi.island);
    const mist = isl ? isl.biome === B_MIST : false;
    const kind = isl && (isl.type === I_SKULL || mist) ? (poi.kind === 'shrine' || Math.random() < 0.3 ? 'wraith' : 'skeleton') : 'skeleton';
    const n = 2 + Math.floor(Math.random() * 2) + (poi.kind === 'shrine' ? 1 : 0);
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < 10; k++) {
        const ang = Math.random() * Math.PI * 2;
        const x = poi.x + Math.cos(ang) * (14 + Math.random() * 20);
        const y = poi.y + Math.sin(ang) * (14 + Math.random() * 20);
        if (walkable(this.typeAt(x, y))) {
          this.mobs.push(makeMob(kind, x, y, poi.level, poi.island));
          break;
        }
      }
    }
    this.toast(kind === 'wraith' ? 'Wraiths rise to guard the treasure!' : 'Skeletons claw out of the earth!', '#ff9a7a');
  }

  private guardsAlive(poi: POI): boolean {
    for (const m of this.mobs) if (!m.dead && m.island === poi.island && dist2(m.x, m.y, poi.x, poi.y) < 90 * 90 && m.kind !== 'crab') return true;
    return false;
  }

  private openChest(poi: POI): void {
    const p = this.profile;
    if (this.guardsAlive(poi)) {
      this.toast('Defeat the guardians first!', '#ff9a7a');
      audio.ui('error');
      return;
    }
    if (poi.locked) {
      if (!p.inv.has('lockpick')) {
        this.toast('This chest is locked. You need a Lockpick Set.', '#ff9a7a');
        audio.ui('error');
        return;
      }
      if (Math.random() < 0.3) {
        p.inv.remove('lockpick', 1);
        this.toast('Your lockpick snapped!', '#ff9a7a');
      }
    }
    p.looted[poi.id] = this.env.epoch;
    const loot = rollLoot('chest', poi.level, new RNG(poi.id * 13 + Math.floor(this.env.epoch / poi.respawn)), this.luck(), poi.locked ? 1.5 : 1);
    this.particles.gold(poi.x, poi.y, 12);
    audio.ui('chest');
    this.addItems(loot.items, loot.gold, poi.x, poi.y, 'Chest');
    p.stats.treasures++;
  }

  private openShrine(poi: POI): void {
    if (this.guardsAlive(poi)) {
      this.toast('The guardians still stand!', '#ff9a7a');
      return;
    }
    this.profile.looted[poi.id] = this.env.epoch;
    const loot = rollLoot('shrine', poi.level, new RNG(poi.id * 17 + Math.floor(this.env.epoch / poi.respawn)), this.luck());
    this.particles.gold(poi.x, poi.y, 16);
    audio.ui('chest');
    this.addItems(loot.items, loot.gold, poi.x, poi.y, 'Shrine');
    this.profile.fame += 3;
  }

  private salvage(poi: POI): void {
    const p = this.profile;
    p.looted[poi.id] = this.env.epoch;
    let rich = 1;
    if (p.inv.has('diving_helmet')) rich += 0.8;
    const divers = p.crew.filter((c) => c.role === 'diver').length;
    rich += divers * 0.35;
    const loot = rollLoot('wreck', poi.level, new RNG(poi.id * 19 + Math.floor(this.env.epoch / poi.respawn)), this.luck(), rich);
    this.particles.splash(poi.x, poi.y, 16);
    this.sound('splash', poi.x, poi.y);
    for (const c of p.crew) if (c.role === 'diver') gainXp(c, 20);
    this.addItems(loot.items, loot.gold, poi.x, poi.y, 'Salvage');
  }

  goAshore(x: number, y: number): void {
    const s = this.player;
    s.anchored = true;
    s.sailTarget = 0;
    s.speed = 0;
    const a = new Avatar();
    a.x = x;
    a.y = y;
    a.maxHp = 100;
    a.hp = Math.max(20, this.profile.captainHp);
    this.avatar = a;
    this.mode = 'foot';
    this.spawnedGuards.clear();
    audio.ui('open');
    this.emit('mode', 'foot');
  }

  boardShip(): void {
    if (this.avatar) this.profile.captainHp = Math.max(1, this.avatar.hp);
    this.avatar = null;
    this.mobs = [];
    this.mode = 'sail';
    this.emit('mode', 'sail');
  }

  dock(isl: Island): void {
    const s = this.player;
    const L = portLayout(isl)!;
    s.x = L.berthX;
    s.y = L.berthY;
    s.heading = Math.atan2(L.dirY, L.dirX);
    s.speed = 0;
    s.sailTarget = 0;
    s.sail = 0;
    s.docked = true;
    this.docked = isl;
    const p = this.profile;
    p.lastPort = isl.id;
    if (!p.visitedPorts.includes(isl.id)) {
      p.visitedPorts.push(isl.id);
      p.fame += 2;
    }
    for (let i = p.crew.length - 1; i >= 0; i--) {
      const c = p.crew[i];
      if (c.morale < 10 && !c.traits.includes('loyal')) {
        p.crew.splice(i, 1);
        this.toast(`${c.name} deserted the crew in ${isl.port!.name}!`, '#ff7a6a');
      }
    }
    s.statsDirty = true;
    this.sound('bell', L.berthX, L.berthY);
    if (p.tutorial === 3 && isl.id === START_ISLAND_ID) this.advanceTutorial(3);
    for (const q of p.quests) {
      if (q.done && q.port === isl.id && q.kind !== 'deliver') this.completeQuest(q);
      if (q.kind === 'deliver' && q.targetPort === isl.id && !q.done) {
        if (p.inv.count(q.item!) >= q.qty!) {
          p.inv.remove(q.item!, q.qty!);
          q.done = true;
          this.syncCargo();
          this.completeQuest(q);
        } else this.toast(`Delivery: you need ${q.qty} ${ITEM[q.item!].name} for ${q.title}.`, '#ff9a7a');
      }
    }
    this.emit('port', isl);
  }

  undock(): void {
    if (!this.docked) return;
    this.player.docked = false;
    this.docked = null;
    this.emit('undock');
  }

  completeQuest(q: Quest): void {
    const p = this.profile;
    const i = p.quests.indexOf(q);
    if (i < 0) return;
    p.quests.splice(i, 1);
    p.gold += q.reward;
    p.fame += q.fame;
    p.completedQuests++;
    p.stats.goldEarned += q.reward;
    audio.ui('quest');
    this.toast(`Quest complete: ${q.title}! +${q.reward} gold, +${q.fame} fame`, '#ffd870');
  }

  advanceTutorial(step: number): void {
    const p = this.profile;
    if (p.tutorial !== step) return;
    const t = TUTORIAL[step];
    if (t.reward) {
      p.gold += t.reward;
      this.float(this.player.x, this.player.y - 14, `+${t.reward}g`, 0xffd040);
    }
    p.tutorial++;
    audio.ui('quest');
    if (p.tutorial === 7) this.spawnTutorialRaft();
    if (p.tutorial === 8) {
      if (!p.inv.has('shovel')) p.inv.add('shovel', 1);
      const isl = getIsland(START_ISLAND_ID + 3) ?? getIsland(START_ISLAND_ID + 1);
      if (isl) {
        const spot = findLandSpot(isl, new RNG(4242), 0.5);
        if (spot) {
          p.inv.add('treasure_map', 1, { x: spot[0], y: spot[1], island: isl.name, level: 1, seed: 777 });
          this.toast(`You found a Treasure Map to ${isl.name} and a Shovel! Open the map (M).`, '#ffd870');
        }
      }
    }
    this.emit('tutorial', p.tutorial);
  }

  private spawnTutorialRaft(): void {
    const t = TEMPLATES.find((x) => x.id === 'pirate_raft')!;
    const s = this.player;
    for (let k = 0; k < 20; k++) {
      const ang = Math.random() * Math.PI * 2;
      const x = s.x + Math.cos(ang) * 600;
      const y = s.y + Math.sin(ang) * 600;
      if (this.openWater(x, y, 60)) {
        const e = this.spawnShip(t, 1, x, y);
        e.hostile = true;
        e.name = 'Pirate Raft';
        for (const i of e.cells) {
          const lost = e.hullHp[i] * 0.6;
          e.hullHp[i] -= lost;
          e.hullTotal -= lost;
        }
        e.visual++;
        this.tutorialRaft = e;
        (e.ai as AIState).aggro = 900;
        this.toast('A pirate raft approaches! Hold the mouse button to fire.', '#ff9a7a');
        return;
      }
    }
  }

  private openWater(x: number, y: number, r: number): boolean {
    if (!shipPassable(this.typeAt(x, y))) return false;
    for (let a = 0; a < 6; a++) {
      const ang = (a / 6) * Math.PI * 2;
      if (!shipPassable(this.typeAt(x + Math.cos(ang) * r, y + Math.sin(ang) * r))) return false;
    }
    return true;
  }

  board(enemy: Ship): void {
    const s = this.player;
    const p = this.profile;
    this.boardCooldown = 4;
    const crew = p.crew;
    const captain = 8 + (p.weapon ? (ITEM[p.weapon].combat ?? 0) * 1.4 : 0) + (p.armor ? (ITEM[p.armor].defense ?? 0) : 0);
    let ours = captain;
    for (const c of crew) ours += combatPower(c);
    ours *= 1 + (s.stats.boardBonus ?? 0);
    let theirs = 0;
    for (const c of enemy.crew) theirs += combatPower(c);
    theirs += 4 + enemy.level * 2;
    if (enemy.surrendered) theirs *= 0.15;
    if (enemy.boss) theirs *= 1.4;
    const res: BoardResult = { win: false, enemy, ourStart: ours, theirStart: theirs, rounds: [], dead: [], gold: 0, items: [], recruits: [] };
    let o = ours;
    let t = theirs;
    for (let r = 0; r < 12 && o > 0.5 && t > 0.5; r++) {
      const dmgT = o * (0.22 + Math.random() * 0.15);
      const dmgO = t * (0.2 + Math.random() * 0.15);
      t = Math.max(0, t - dmgT);
      o = Math.max(0, o - dmgO);
      res.rounds.push({ ours: o, theirs: t });
    }
    res.win = t <= 0.5 || (o > 0 && o / ours > t / theirs);
    const lossFrac = 1 - o / ours;
    for (const c of [...crew]) {
      c.hp -= c.maxHp * lossFrac * (0.5 + Math.random() * 0.9);
      if (c.hp <= 0) {
        if (s.stats.heal > 0 && Math.random() < 0.5) c.hp = 1;
        else {
          crew.splice(crew.indexOf(c), 1);
          res.dead.push(c);
        }
      }
    }
    s.statsDirty = true;
    if (res.win) {
      p.stats.boarded++;
      const loot = rollLoot(enemy.lootKind as LootKind, enemy.level, new RNG(enemy.id * 977), this.luck(), 1.6);
      res.gold = Math.round(loot.gold * (1 + this.profile.inv.passive('goldFind')) + enemy.gold);
      res.items = loot.items;
      const rng = new RNG(enemy.id * 31);
      const n = enemy.surrendered ? 2 : 1;
      for (let i = 0; i < Math.min(n, enemy.crew.length); i++) {
        if (rng.chance(0.75)) {
          const c = enemy.crew[i];
          c.station = -1;
          c.locked = false;
          c.morale = 45;
          c.hp = Math.max(c.hp, c.maxHp * 0.4);
          res.recruits.push(c);
        }
      }
      for (const c of crew) gainXp(c, 25 + enemy.level * 6);
      p.fame += 4 + enemy.level * 3;
      if (enemy.faction === 'merchant' || enemy.faction === 'navy') p.notoriety = Math.min(100, p.notoriety + 10);
      enemy.crew = [];
      enemy.surrendered = false;
      enemy.startSink(this);
      enemy.sinkHandled = true;
      this.handleQuestKill(enemy);
    } else {
      const lost = Math.floor(p.gold * 0.15);
      p.gold -= lost;
      res.gold = -lost;
      enemy.hostile = true;
      const ang = Math.atan2(s.y - enemy.y, s.x - enemy.x);
      s.x += Math.cos(ang) * 20;
      s.y += Math.sin(ang) * 20;
    }
    audio.play('sword', s.x, s.y);
    this.emit('boarding', res);
  }

  claimLoot(res: BoardResult, recruit: CrewMember[]): void {
    this.addItems(res.items, Math.max(0, res.gold), this.player.x, this.player.y, 'Plunder');
    const p = this.profile;
    for (const c of recruit) {
      if (p.crew.length >= this.player.stats.crewCap) {
        this.toast('No room for more crew. Build Crew Quarters!', '#ff9a7a');
        break;
      }
      p.crew.push(c);
      this.toast(`${c.name} (${ROLE[c.role].name}) joins your crew!`, '#c8f0a0');
    }
    this.player.crew = p.crew;
    this.player.autoAssign();
  }

  private onSink(s: Ship): void {
    if (s.sinkHandled) return;
    s.sinkHandled = true;
    if (s.isPlayer) {
      this.playerSunk();
      return;
    }
    const byPlayer = s.lastHitBy === this.player.id;
    this.particles.debris(s.x, s.y, 20);
    if (!byPlayer) return;
    const p = this.profile;
    p.stats.sunk++;
    const loot = rollLoot(s.lootKind as LootKind, s.level, new RNG(s.id * 7717), this.luck());
    const gold = Math.round((loot.gold + s.gold) * (1 + p.inv.passive('goldFind')));
    const per = Math.max(1, Math.ceil(loot.items.length / 3));
    for (let i = 0; i < loot.items.length || i === 0; i += per) {
      const items = loot.items.slice(i, i + per);
      const ang = Math.random() * Math.PI * 2;
      this.dropLoot(s.x + Math.cos(ang) * 10, s.y + Math.sin(ang) * 10, i === 0 ? gold : 0, items, i === 0 ? 2 : Math.random() < 0.5 ? 0 : 1);
      if (i >= loot.items.length) break;
    }
    p.fame += 3 + s.level * 2 + (s.boss ? 15 : 0);
    if (s.faction === 'navy') p.notoriety = Math.min(100, p.notoriety + 15);
    else if (s.faction === 'merchant') p.notoriety = Math.min(100, p.notoriety + 10);
    else if (s.faction === 'pirate') p.notoriety = Math.max(0, p.notoriety - 2);
    for (const c of p.crew) gainXp(c, 10 + s.level * 4);
    this.toast(`The ${s.name} goes down! +${3 + s.level * 2} fame`, '#ffd870');
    if (s === this.tutorialRaft && p.tutorial === 7) this.advanceTutorial(7);
    this.handleQuestKill(s);
  }

  private handleQuestKill(s: Ship): void {
    if (!s.questId) return;
    const q = this.profile.quests.find((x) => x.id === s.questId);
    if (q) {
      q.done = true;
      this.toast(`Bounty target sunk! Return to ${q.portName} to claim the reward.`, '#ffd870');
      audio.ui('quest');
    }
  }

  private playerSunk(): void {
    this.mode = 'dead';
    this.deathT = 0;
    this.avatar = null;
    const p = this.profile;
    p.stats.deaths++;
    const lost = p.inv.items.filter((it) => {
      const c = ITEM[it.id].cat;
      return c === 'trade' || c === 'treasure' || c === 'relic' || c === 'material';
    });
    p.lost = lost.length ? { x: this.player.x, y: this.player.y, items: lost.map((i) => ({ id: i.id, qty: i.qty, data: i.data })), t: this.env.epoch } : null;
    for (const it of lost) p.inv.removeEntry(it);
    const goldLost = Math.floor(p.gold * 0.15);
    p.gold -= goldLost;
    const drowned: string[] = [];
    for (let i = p.crew.length - 1; i >= 0; i--) {
      if (Math.random() < 0.3) {
        drowned.push(p.crew[i].name);
        p.crew.splice(i, 1);
      }
    }
    this.emit('death', { goldLost, drowned, cargo: lost.length });
  }

  respawn(): void {
    const p = this.profile;
    let isl = getIsland(p.lastPort) ?? getIsland(START_ISLAND_ID)!;
    if (p.home) {
      const home = getIsland(p.home);
      const owned = p.ownedIsland(p.home);
      if (home && owned?.structures.includes('dock')) {
        const dh = Math.hypot(home.x - this.player.x, home.y - this.player.y);
        const dp = Math.hypot(isl.x - this.player.x, isl.y - this.player.y);
        if (dh < dp) {
          const spot = this.coastWater(home);
          if (spot) {
            this.respawnAt(spot[0], spot[1], Math.atan2(spot[1] - home.y, spot[0] - home.x));
            this.toast(`You wash ashore at ${owned.name}. Your shipwrights rebuilt the ${this.player.name}.`, '#f0e6c8');
            return;
          }
        }
      }
    }
    if (!isl.port) isl = getIsland(START_ISLAND_ID)!;
    const L = portLayout(isl)!;
    this.respawnAt(L.berthX + L.dirX * 30, L.berthY + L.dirY * 30, Math.atan2(L.dirY, L.dirX));
    this.toast(`You wash ashore at ${isl.port!.name}. The harbor insurance rebuilt your ship.`, '#f0e6c8');
  }

  private respawnAt(x: number, y: number, heading: number): void {
    const p = this.profile;
    p.x = x;
    p.y = y;
    p.heading = heading;
    const s = new Ship(p.design);
    s.isPlayer = true;
    s.faction = 'player';
    s.name = p.design.name;
    s.captain = p.name;
    s.x = x;
    s.y = y;
    s.heading = heading;
    s.crew = p.crew;
    s.autoAssign('sail');
    s.placeCrewInstantly();
    this.ships = this.ships.filter((o) => !o.isPlayer && Math.hypot(o.x - x, o.y - y) > 2500);
    this.ships.unshift(s);
    this.player = s;
    this.projectiles = [];
    this.syncCargo();
    this.mode = 'sail';
    this.cam.x = x;
    this.cam.y = y;
    p.captainHp = 100;
  }

  coastWater(isl: Island): [number, number] | null {
    for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2;
      for (let d = isl.r * 0.5; d < isl.rinf; d += 8) {
        const x = isl.x + Math.cos(ang) * d;
        const y = isl.y + Math.sin(ang) * d;
        if (heightAt(x, y, hs).h < -40 && this.openWater(x, y, 30)) return [x, y];
      }
    }
    return null;
  }

  fireProjectile(ship: Ship, ci: number, gun: GunSpec, angle: number, tx: number, ty: number, ammo: Ammo, spread: number): void {
    const [lx, ly] = ship.cellLocal(ci);
    const p = ship.toWorld(lx, ly, tmpP);
    const a = angle + (Math.random() - 0.5) * 2 * spread;
    const gx = p[0] + Math.cos(a) * 5;
    const gy = p[1] + Math.sin(a) * 5;
    let dmg = gun.dmg * (0.9 + Math.random() * 0.2);
    let range = gun.range;
    if (ammo === 'chain') range *= 0.8;
    else if (ammo === 'grape') range *= 0.6;
    if (ship.boss) dmg *= 1.3;
    if (!ship.isPlayer) dmg *= 0.75 + ship.level * 0.05;
    if (gun.lob) {
      const dx = tx - gx;
      const dy = ty - gy;
      const d = Math.min(range, Math.hypot(dx, dy));
      const ang = Math.atan2(dy, dx);
      const ex = gx + Math.cos(ang) * d + (Math.random() - 0.5) * d * spread * 2;
      const ey = gy + Math.sin(ang) * d + (Math.random() - 0.5) * d * spread * 2;
      const pr = this.mkProj(gx, gy, 0, 0, 0, dmg, ammo, ship, false);
      pr.lob = true;
      pr.tx = ex;
      pr.ty = ey;
      pr.dur = 0.8 + d / gun.speed;
      pr.splash = gun.splash ?? 20;
      pr.size = 3;
      this.projectiles.push(pr);
      this.sound('mortar', gx, gy);
    } else {
      const sp = gun.speed;
      const vx = Math.cos(a) * sp + ship.vx * 0.5;
      const vy = Math.sin(a) * sp + ship.vy * 0.5;
      const pr = this.mkProj(gx, gy, vx, vy, range / sp, dmg, ammo, ship, false);
      pr.size = gun.size >= 4 ? 2 : gun.size >= 2 ? 2 : 1;
      this.projectiles.push(pr);
      this.sound(gun.size >= 3 ? 'cannon_big' : gun.size === 1 ? 'swivel' : 'cannon', gx, gy);
    }
    this.particles.smoke(gx + Math.cos(a) * 3, gy + Math.sin(a) * 3, gun.size >= 2 ? 7 : 3, 10, Math.cos(a) * 25 + ship.vx * 0.6, Math.sin(a) * 25 + ship.vy * 0.6);
    this.particles.sparks(gx, gy, 3);
    if (ship.isPlayer && gun.size >= 2) this.cam.shake = Math.max(this.cam.shake, 1.2);
  }

  mkProj(x: number, y: number, vx: number, vy: number, life: number, dmg: number, ammo: Ammo, owner: Ship | null, foot: boolean): Projectile {
    return { x, y, vx, vy, life, dmg, ammo, owner, lob: false, sx: x, sy: y, tx: x, ty: y, t: 0, dur: 0, splash: 0, size: 1, z: 0, foot, fort: 0 };
  }

  private updateProjectiles(dt: number): void {
    const list = this.projectiles;
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      let remove = false;
      if (p.lob) {
        p.t += dt;
        const f = Math.min(1, p.t / p.dur);
        p.x = p.sx + (p.tx - p.sx) * f;
        p.y = p.sy + (p.ty - p.sy) * f;
        const h = Math.hypot(p.tx - p.sx, p.ty - p.sy) * 0.3;
        p.z = 4 * h * f * (1 - f);
        if (f >= 1) {
          this.explode(p.x, p.y, p.splash, p.dmg, p.owner);
          remove = true;
        }
      } else {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        p.z = p.foot ? 3 : 2 + Math.max(0, p.life) * 3;
        if (p.foot) {
          for (const m of this.mobs) {
            if (m.dead) continue;
            if (dist2(m.x, m.y, p.x, p.y) < 7 * 7) {
              this.hurtMob(m, p.dmg);
              remove = true;
              break;
            }
          }
          if (!remove && p.life <= 0) {
            this.particles.dust(p.x, p.y, 2);
            remove = true;
          }
        } else {
          for (const s of this.ships) {
            if (s === p.owner || s.sinking >= 0) continue;
            if (s.docked && s.isPlayer) continue;
            const r = s.radius + 3;
            if (dist2(s.x, s.y, p.x, p.y) > r * r) continue;
            const l = s.toLocal(p.x, p.y, tmpP);
            const ci = s.cellAtLocal(l[0], l[1]);
            if (ci < 0) continue;
            this.projectileHit(p, s, ci);
            remove = true;
            break;
          }
          if (!remove) {
            for (const m of this.monsters) {
              if (!m.hitTest(p.x, p.y)) continue;
              this.hurtMonster(m, p.dmg * (p.ammo === 'chain' ? 0.6 : p.ammo === 'grape' ? 0.8 : 1), p.owner);
              this.particles.splash(p.x, p.y, 6);
              remove = true;
              break;
            }
          }
          if (!remove) {
            const t = this.typeAt(p.x, p.y);
            if (!isWater(t) && p.life < p.dur - 0.05 && t !== T_DEEP) {
              const st = p.owner && dist2(p.x, p.y, p.owner.x, p.owner.y) > (p.owner.radius + 8) ** 2;
              if (st || !p.owner) {
                this.particles.dust(p.x, p.y, 5);
                this.sound('thump', p.x, p.y, 0.6);
                remove = true;
              }
            }
          }
          if (!remove && p.life <= 0) {
            this.particles.splash(p.x, p.y, 8);
            this.sound('splash', p.x, p.y, 0.8);
            remove = true;
          }
        }
      }
      if (remove) list.splice(i, 1);
    }
  }

  private projectileHit(p: Projectile, s: Ship, ci: number): void {
    s.damageCell(ci, p.dmg, p.ammo, this, p.owner);
    this.particles.debris(p.x, p.y, p.ammo === 'grape' ? 4 : 8);
    this.particles.smoke(p.x, p.y, 3, 8);
    this.sound('hit', p.x, p.y);
    const owner = p.owner;
    if (owner?.isPlayer) {
      this.float(p.x, p.y - 6, `${Math.round(p.dmg)}`, 0xffe080);
      this.provoke(s);
      if (Math.random() < 0.15) for (const c of this.profile.crew) if (c.station >= 0 && s.guns.length) gainXp(c, 1);
    }
    if (s.isPlayer) {
      this.hitFlash = 1;
      this.cam.shake = Math.max(this.cam.shake, 2.5);
      if (owner) owner.hostile = true;
    }
  }

  provoke(s: Ship): void {
    if (s.isPlayer) return;
    const wasHostile = this.hostileTo(s, this.player);
    s.hostile = true;
    if (s.ai) (s.ai as AIState).provoked = true;
    if (!wasHostile) {
      if (s.faction === 'navy' || s.faction === 'merchant') {
        this.profile.notoriety = Math.min(100, this.profile.notoriety + 8);
        this.toast(`You attacked a ${s.faction === 'navy' ? 'Crown' : 'Guild'} ship! Notoriety rises.`, '#ff9a7a');
      }
    }
  }

  explode(x: number, y: number, radius: number, dmg: number, source: Ship | null): void {
    this.particles.explosion(x, y, radius);
    this.sound('explosion', x, y);
    const t = this.typeAt(x, y);
    if (isWater(t)) this.particles.splash(x, y, 14);
    for (const s of this.ships) {
      if (s.sinking >= 0) continue;
      if (s.isPlayer && s.docked) continue;
      const lim = s.radius + radius;
      if (dist2(s.x, s.y, x, y) > lim * lim) continue;
      for (const ci of s.cells) {
        const [lx, ly] = s.cellLocal(ci);
        const w = s.toWorld(lx, ly, tmpP);
        const d = Math.hypot(w[0] - x, w[1] - y);
        if (d > radius) continue;
        s.damageCell(ci, dmg * (1 - (d / radius) * 0.7) * 0.6, 'round', this, source);
      }
      if (source?.isPlayer) this.provoke(s);
      if (s.isPlayer) {
        this.hitFlash = 1;
        this.cam.shake = 4;
      }
    }
    for (const m of this.monsters) {
      if (m.dead || m.depth > 0.5) continue;
      const d = Math.hypot(m.x - x, m.y - y);
      if (d < radius + 10) this.hurtMonster(m, dmg * (1 - Math.min(1, d / (radius + 10)) * 0.6), source);
    }
    const fx = this.avatar ?? this.player;
    const d = Math.hypot(fx.x - x, fx.y - y);
    if (d < 300) this.cam.shake = Math.max(this.cam.shake, 4 * (1 - d / 300));
  }

  private hurtMonster(m: SeaMonster, dmg: number, src: Ship | null): void {
    if (m.dead) return;
    m.hp -= dmg;
    m.hurtT = 0.25;
    if (src?.isPlayer) {
      m.lastHitByPlayer = true;
      this.player.lastCombat = this.env.time;
      this.float(m.x, m.y - 8, `${Math.round(dmg)}`, 0xffe080);
    }
    this.sound('hit', m.x, m.y, 0.7, 0.6);
    if (m.hp > 0) return;
    m.dead = true;
    m.deathT = 0;
    this.sound('roar', m.x, m.y, 0.8, 0.7);
    this.particles.splash(m.x, m.y, 24);
    if (!m.lastHitByPlayer) return;
    const rng = new RNG(m.id * 4241 + 7);
    const items: LootDrop[] = [];
    if (rng.chance(0.35 + this.luck())) items.push({ id: 'mermaid_scale', qty: 1 });
    if (rng.chance(0.3)) items.push({ id: 'kraken_ink', qty: 1 });
    if (rng.chance(0.06 + m.level * 0.01)) items.push({ id: 'trident_shard', qty: 1 });
    items.push({ id: rng.pick(['black_pearl', 'pearl', 'sapphire', 'ancient_coin']), qty: rng.int(1, 3) });
    this.dropLoot(m.x, m.y, Math.round((120 + m.level * 60) * (1 + this.profile.inv.passive('goldFind'))), items, 2);
    this.profile.fame += 10 + m.level * 3;
    this.toast(`You slew the ${m.name}! +${10 + m.level * 3} fame`, '#ffd870');
  }

  private updateMonsters(dt: number): void {
    const s = this.player;
    const active = this.playerActive && this.mode === 'sail';
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const m = this.monsters[i];
      const d = Math.hypot(m.x - s.x, m.y - s.y);
      const target = active && !m.dead && d < 1100 ? s : null;
      const wasDiving = m.depth > 0.5;
      const res = m.update(dt, (x, y) => this.typeAt(x, y), target);
      if (wasDiving !== m.depth > 0.5) this.particles.splash(m.x, m.y, 12);
      if (target && !m.roared && d < 700) {
        m.roared = true;
        this.sound('roar', m.x, m.y);
        this.toast(`A ${m.name} rises from the deep!`, '#ff9a7a');
      }
      if (target && d < 600) s.lastCombat = this.env.time;
      if (res && res.biteCell >= 0) {
        s.damageCell(res.biteCell, res.dmg, 'round', this, null);
        this.particles.debris(m.x, m.y, 10);
        this.particles.splash(m.x, m.y, 8);
        this.sound('hit', m.x, m.y, 1, 0.6);
        this.hitFlash = 1;
        this.cam.shake = Math.max(this.cam.shake, 3);
      }
      if (!m.dead && m.depth > 0.6 && Math.random() < dt * 8) this.particles.bubble(m.x + (Math.random() - 0.5) * 8, m.y + (Math.random() - 0.5) * 8);
      if ((m.dead && m.deathT > 5) || d > 3600) this.monsters.splice(i, 1);
    }
  }

  onCrewDeath(ship: Ship, c: CrewMember): void {
    if (!ship.isPlayer) return;
    this.toast(`${c.name} the ${ROLE[c.role].name} has been killed!`, '#ff7a6a');
    for (const o of this.profile.crew) o.morale = Math.max(0, o.morale - 4);
  }

  onPartBroken(ship: Ship, ci: number): void {
    const [lx, ly] = ship.cellLocal(ci);
    const p = ship.toWorld(lx, ly, tmpP);
    this.particles.debris(p[0], p[1], 10);
    if (ship.isPlayer) this.toast(`Your ${COMPONENTS[ship.design.part[ci]].name} was destroyed!`, '#ff9a7a');
  }

  ammoFor(ship: Ship, gun: GunSpec): Ammo | null {
    if (gun.ammo === 'free') return 'free';
    if (!ship.isPlayer) return gun.ammo === 'mortar' ? 'mortar' : ship.aiAmmo;
    const inv = this.profile.inv;
    if (gun.ammo === 'mortar') return inv.has('mortar_shell') ? 'mortar' : null;
    const sel = AMMO_ITEMS[this.ammoIdx];
    if (inv.has(sel.item)) return sel.ammo;
    for (const a of AMMO_ITEMS) if (inv.has(a.item)) {
      this.ammoIdx = AMMO_ITEMS.indexOf(a);
      return a.ammo;
    }
    return null;
  }

  consumeAmmo(ship: Ship, ammo: Ammo): void {
    if (!ship.isPlayer || ammo === 'free') return;
    const item = ammo === 'mortar' ? 'mortar_shell' : AMMO_ITEMS.find((a) => a.ammo === ammo)?.item;
    if (item) this.profile.inv.remove(item, 1);
  }

  repairMaterial(ship: Ship, amount: number): number {
    if (!ship.isPlayer || this.freeRepair) return amount;
    if (ship.repairFraction() <= 0) return 0;
    const inv = this.profile.inv;
    if (!inv.has('planks')) return amount * 0.3;
    this.plankAcc += amount;
    if (this.plankAcc >= 35) {
      this.plankAcc -= 35;
      inv.remove('planks', 1);
      this.syncCargo();
    }
    return amount * (1 + this.profile.inv.passive('repair'));
  }

  rumAboard(ship: Ship): boolean {
    if (!ship.isPlayer) return true;
    return this.profile.inv.has('grog') || this.profile.inv.has('rum');
  }

  get playerActive(): boolean {
    return (this.mode === 'sail' || this.mode === 'foot') && !this.docked && this.player.sinking < 0;
  }

  hostileTo(a: Ship, b: Ship): boolean {
    if (a.isPlayer) return this.aiHostileToPlayer(b);
    if (b.isPlayer) return this.aiHostileToPlayer(a);
    if (a.faction === b.faction) return false;
    const f1 = a.faction;
    const f2 = b.faction;
    const pair = (x: string, y: string) => (f1 === x && f2 === y) || (f1 === y && f2 === x);
    if (f1 === 'ghost' || f2 === 'ghost') return true;
    if (pair('navy', 'pirate')) return true;
    if (pair('pirate', 'merchant')) return true;
    if (pair('navy', 'hunter') || pair('hunter', 'merchant') || pair('hunter', 'pirate')) return false;
    return false;
  }

  aiHostileToPlayer(o: Ship): boolean {
    if (o.surrendered) return false;
    if (o.hostile) return true;
    const n = this.profile.notoriety;
    switch (o.faction) {
      case 'ghost':
      case 'hunter':
        return true;
      case 'pirate':
        return n < 60;
      case 'navy':
        return n >= 40;
      default:
        return false;
    }
  }

  fire(ship: Ship, tx: number, ty: number): void {
    ship.fireAt(tx, ty, this);
  }

  private shipCollisions(dt: number): void {
    const list = this.ships;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.sinking >= 0) continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (b.sinking >= 0) continue;
        const lim = a.radius + b.radius;
        if (dist2(a.x, a.y, b.x, b.y) > lim * lim) continue;
        this.collidePair(a, b, dt);
      }
    }
  }

  private collidePair(a: Ship, b: Ship, dt: number): void {
    const sample = (s: Ship, o: Ship): number => {
      for (let k = 0; k < s.probes.length; k += 2) {
        const w = s.toWorld(s.probes[k], s.probes[k + 1], tmpP);
        const l = o.toLocal(w[0], w[1], tmpP);
        if (o.cellAtLocal(l[0], l[1]) >= 0) return k;
      }
      return -1;
    };
    const ka = sample(a, b);
    const kb = ka < 0 ? sample(b, a) : -1;
    if (ka < 0 && kb < 0) return;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 1;
    const nx = dx / d;
    const ny = dy / d;
    const ma = a.stats?.mass ?? 20;
    const mb = b.stats?.mass ?? 20;
    const push = 24 * dt;
    if (!a.docked) {
      a.x -= nx * push * (mb / (ma + mb)) * 2;
      a.y -= ny * push * (mb / (ma + mb)) * 2;
    }
    if (!b.docked) {
      b.x += nx * push * (ma / (ma + mb)) * 2;
      b.y += ny * push * (ma / (ma + mb)) * 2;
    }
    const rel = Math.hypot(a.vx - b.vx, a.vy - b.vy);
    if (rel > 25) {
      const ram = (s: Ship) => {
        for (let i = 0; i < s.design.part.length; i++) if (s.design.part[i] === 24 && s.partHp[i] > 0) return COMPONENTS[24].ram ?? 1;
        return 1;
      };
      const ra = ram(a);
      const rb = ram(b);
      const impact = (rel - 25) * 0.6;
      const facingA = Math.cos(a.heading) * nx + Math.sin(a.heading) * ny;
      const facingB = -(Math.cos(b.heading) * nx + Math.sin(b.heading) * ny);
      b.damageAt(a.x + nx * a.halfLen, a.y + ny * a.halfLen, impact * (facingA > 0.5 ? ra : 1) * (ma / mb) ** 0.5, 'round', this, a);
      a.damageAt(b.x - nx * b.halfLen, b.y - ny * b.halfLen, impact * (facingB > 0.5 ? rb : 1) * (mb / ma) ** 0.5 * (facingA > 0.5 && ra > 1 ? 0.3 : 1), 'round', this, b);
      this.sound('hit', (a.x + b.x) / 2, (a.y + b.y) / 2, 1, 0.7);
      this.particles.debris((a.x + b.x) / 2, (a.y + b.y) / 2, 14);
      a.speed *= 0.4;
      b.speed *= 0.4;
      if (a.isPlayer) this.provoke(b);
      if (b.isPlayer) this.provoke(a);
      if (a.isPlayer || b.isPlayer) this.cam.shake = 4;
    }
  }

  private updateForts(dt: number): void {
    this.fortT -= dt;
    const s = this.player;
    if (this.fortT <= 0) {
      this.fortT = 2;
      const keep = new Map(this.forts.map((f) => [f.island * 2 + (f.player ? 1 : 0), f]));
      this.forts = [];
      islandsInRect(s.x - 2200, s.y - 2200, s.x + 2200, s.y + 2200, tmpIslands);
      for (const isl of tmpIslands) {
        if (isl.port) {
          const L = portLayout(isl);
          if (L && L.fortX) this.forts.push(keep.get(isl.id * 2) ?? { x: L.fortX, y: L.fortY, faction: isl.port.faction, reload: 1, island: isl.id, player: false });
        }
        const own = this.profile.ownedIsland(isl.id);
        if (own && own.structures.includes('fort')) {
          poisNear(isl.x, isl.y, isl.r + 50, tmpPOIs);
          const claim = tmpPOIs.find((p) => p.kind === 'claim' && p.island === isl.id);
          if (claim) this.forts.push(keep.get(isl.id * 2 + 1) ?? { x: claim.x, y: claim.y, faction: -1, reload: 1, island: isl.id, player: true });
        }
      }
    }
    for (const f of this.forts) {
      f.reload -= dt;
      if (f.reload > 0) continue;
      let target: Ship | null = null;
      let bd = 460 * 460;
      for (const o of this.ships) {
        if (o.sinking >= 0) continue;
        const d = dist2(o.x, o.y, f.x, f.y);
        if (d > bd) continue;
        let hostile = false;
        if (f.player) hostile = !o.isPlayer && this.aiHostileToPlayer(o);
        else if (o.isPlayer) hostile = f.faction === F_CROWN && this.profile.notoriety >= 70 && !o.docked;
        else if (f.faction === F_BRETHREN) hostile = o.faction === 'navy' || o.faction === 'ghost' || o.faction === 'hunter';
        else hostile = o.faction === 'pirate' || o.faction === 'ghost' || (o.hostile && this.env.time - o.lastCombat < 20);
        if (hostile) {
          bd = d;
          target = o;
        }
      }
      if (!target) {
        f.reload = 0.5;
        continue;
      }
      f.reload = 3.2;
      const lead = Math.sqrt(bd) / 300;
      const tx = target.x + target.vx * lead;
      const ty = target.y + target.vy * lead;
      const ang = Math.atan2(ty - f.y, tx - f.x) + (Math.random() - 0.5) * 0.08;
      const pr = this.mkProj(f.x, f.y, Math.cos(ang) * 300, Math.sin(ang) * 300, 1.7, 18, 'round', null, false);
      pr.fort = 1;
      pr.size = 2;
      this.projectiles.push(pr);
      this.particles.smoke(f.x, f.y, 6, 10);
      this.sound('fort', f.x, f.y);
    }
  }

  private updateLoot(dt: number): void {
    const s = this.player;
    for (let i = this.loot.length - 1; i >= 0; i--) {
      const l = this.loot[i];
      l.life -= dt;
      l.bob += dt;
      l.x += (l.vx + Math.cos(this.env.windAngle) * 2) * dt;
      l.y += (l.vy + Math.sin(this.env.windAngle) * 2) * dt;
      l.vx *= Math.pow(0.6, dt);
      l.vy *= Math.pow(0.6, dt);
      if (l.life <= 0) {
        this.loot.splice(i, 1);
        continue;
      }
      if (this.mode === 'sail' && s.sinking < 0) {
        const r = s.radius + 8;
        if (dist2(l.x, l.y, s.x, s.y) < r * r) {
          const left = this.addItems(l.items, l.gold, l.x, l.y, 'Picked up');
          audio.ui('pickup');
          this.particles.splash(l.x, l.y, 5);
          if (left.length) {
            l.items = left;
            l.gold = 0;
            l.vx = (l.x - s.x) * 0.5;
            l.vy = (l.y - s.y) * 0.5;
          } else this.loot.splice(i, 1);
        }
      }
    }
    if (this.mode !== 'sail' || s.sinking >= 0) return;
    poisNear(s.x, s.y, s.radius + 14, tmpPOIs);
    for (const poi of tmpPOIs) {
      if ((poi.kind !== 'flotsam' && poi.kind !== 'bottle') || !this.poiAvailable(poi)) continue;
      this.profile.looted[poi.id] = this.env.epoch;
      const kind: LootKind = poi.kind === 'bottle' ? 'bottle' : 'flotsam';
      const loot = rollLoot(kind, poi.level, new RNG(poi.id * 7 + Math.floor(this.env.epoch / poi.respawn)), this.luck());
      if (poi.id === TUTORIAL_CRATE_ID && this.profile.tutorial <= 2) {
        loot.items = [{ id: 'silver_coins', qty: 3 }, { id: 'rum', qty: 2 }, { id: 'planks', qty: 3 }];
        loot.gold = 0;
      }
      audio.ui('pickup');
      this.particles.splash(poi.x, poi.y, 6);
      const left = this.addItems(loot.items, loot.gold, poi.x, poi.y, poi.kind === 'bottle' ? 'Bottle' : 'Flotsam');
      if (left.length) this.dropLoot(poi.x, poi.y, 0, left);
      if (poi.id === TUTORIAL_CRATE_ID && this.profile.tutorial === 2) this.advanceTutorial(2);
    }
    if (this.profile.inv.has('fishing_net') && Math.abs(s.speed) < 25 && s.speed > 2) {
      this.fishT -= dt;
      if (this.fishT <= 0) {
        this.fishT = 25 + Math.random() * 20;
        this.addItems([{ id: 'fish', qty: 1 + Math.floor(Math.random() * 3) }], 0, s.x, s.y, 'Your net');
      }
    }
  }

  private emitWake(s: Ship, dt: number): void {
    const sp = Math.abs(s.speed);
    if (sp < 3 || s.sinking >= 0) return;
    s.wakeAcc += dt * sp * 0.45 * this.particles.quality;
    const back = -s.halfLen + 2;
    const ch = Math.cos(s.heading);
    const sh = Math.sin(s.heading);
    while (s.wakeAcc >= 1) {
      s.wakeAcc -= 1;
      for (const side of [-1, 1]) {
        const lx = side * s.halfWid * 0.8;
        const p = s.toWorld(lx, -back, tmpP);
        const px = s.x + (p[0] - s.x);
        const py = s.y + (p[1] - s.y);
        const ox = -sh * side;
        const oy = ch * side;
        this.particles.wake(px - ch * 2, py - sh * 2, ox * 6 - ch * 3, oy * 6 - sh * 3, 1.2 + Math.random() * 0.8, 2);
      }
      if (sp > 35 && Math.random() < 0.5) {
        const p = s.toWorld((Math.random() - 0.5) * s.halfWid, -s.halfLen, tmpP);
        this.particles.add(1, p[0], p[1], -sh * (Math.random() - 0.5) * 20, ch * (Math.random() - 0.5) * 20, 0.35, 1, 1, 18);
      }
    }
  }

  private updateWeatherFx(dt: number): void {
    const v = this.view;
    if (this.env.rain > 0.05) {
      const n = this.env.rain * 160 * dt * this.particles.quality * (v.w * v.h) / (480 * 270);
      let k = Math.floor(n) + (Math.random() < n % 1 ? 1 : 0);
      while (k-- > 0) this.particles.rain(v.x + Math.random() * (v.w + 40), v.y + Math.random() * (v.h + 40) - 20);
    }
  }

  private spawner(): void {
    const s = this.player;
    const p = this.profile;
    for (const o of this.ships) {
      if (o.isPlayer || o.questId) continue;
      const d = dist2(o.x, o.y, s.x, s.y);
      if (d > 3400 * 3400 && this.env.time - o.lastCombat > 20) o.dead = true;
    }
    const lvl = levelAt(s.x, s.y);
    const biome = biomeAt(s.x, s.y);
    const startIsl = getIsland(START_ISLAND_ID)!;
    const nearStart = Math.hypot(s.x - startIsl.x, s.y - startIsl.y) < 2600;
    let count = 0;
    for (const o of this.ships) if (!o.isPlayer && o.sinking < 0 && dist2(o.x, o.y, s.x, s.y) < 2400 * 2400) count++;
    if (lvl >= 4 && !nearStart && this.monsters.length === 0 && Math.random() < (this.env.night || this.env.storm > 0.3 ? 0.07 : 0.035)) {
      for (let k = 0; k < 8; k++) {
        const ang = Math.random() * Math.PI * 2;
        const x = s.x + Math.cos(ang) * 900;
        const y = s.y + Math.sin(ang) * 900;
        if (this.typeAt(x, y) === T_DEEP && this.openWater(x, y, 120)) {
          this.monsters.push(new SeaMonster(x, y, clamp(lvl + Math.floor(Math.random() * 2), 1, 10)));
          break;
        }
      }
    }
    const target = Math.min(7, 2 + Math.floor(lvl * 0.45) + (this.env.night ? 1 : 0));
    if (count >= target) return;
    if (Math.random() < 0.35) return;
    const weights: Record<AIFaction, number> = {
      pirate: nearStart ? 0 : 40 + lvl * 3,
      merchant: 35,
      navy: 22 + (p.notoriety >= 40 ? 10 : 0),
      ghost: this.env.night && (biome === B_MIST || lvl >= 5) ? 18 : 0,
      hunter: p.notoriety >= 50 && !nearStart ? 8 + p.notoriety / 5 : 0
    };
    const facs = Object.keys(weights) as AIFaction[];
    const fac = new RNG((Math.random() * 1e9) | 0).weighted(facs, facs.map((f) => weights[f]));
    const level = clamp(lvl + Math.floor(Math.random() * 3) - 1, 1, 10);
    const cands = TEMPLATES.filter((t) => t.faction === fac && t.min <= level && t.max >= level);
    if (!cands.length) return;
    const t = new RNG((Math.random() * 1e9) | 0).weighted(cands, cands.map((c) => c.weight));
    for (let k = 0; k < 12; k++) {
      const ang = Math.random() * Math.PI * 2;
      const d = 1000 + Math.random() * 500;
      const x = s.x + Math.cos(ang) * d;
      const y = s.y + Math.sin(ang) * d;
      if (x < EDGE_MARGIN + 500 || y < EDGE_MARGIN + 500 || x > WORLD_SIZE - EDGE_MARGIN - 500 || y > WORLD_SIZE - EDGE_MARGIN - 500) continue;
      if (!this.openWater(x, y, 90)) continue;
      const e = this.spawnShip(t, level, x, y);
      if (fac === 'merchant') {
        const ai = e.ai as AIState;
        ai.wx = x + Math.cos(ang + Math.PI) * 3000;
        ai.wy = y + Math.sin(ang + Math.PI) * 3000;
      }
      return;
    }
  }

  spawnShip(t: ShipTemplate, level: number, x: number, y: number): Ship {
    const hull = t.hullHigh && level >= 8 ? t.hullHigh : t.hull;
    const d = parseDesign(t.rows, hull, t.sail, t.name);
    const e = new Ship(d);
    const rng = new RNG((Math.random() * 1e9) | 0);
    e.faction = t.faction;
    e.level = level;
    e.name = t.faction === 'merchant' || t.faction === 'navy' ? `${t.faction === 'navy' ? 'HMS ' : ''}${shipName(rng)}` : shipName(rng);
    e.captain = captainName(rng);
    e.x = x;
    e.y = y;
    e.heading = Math.random() * Math.PI * 2;
    e.lootKind = t.faction;
    e.aiAmmo = t.faction === 'pirate' && rng.chance(0.3) ? 'chain' : t.faction === 'ghost' ? 'grape' : 'round';
    e.gold = Math.round(level * (t.faction === 'merchant' ? 40 : 15) * (0.5 + rng.next()));
    let slots = 0;
    for (const i of e.cells) slots += e.slotsOf(i);
    const n = Math.min(e.base.crewCap + 2, Math.max(1, Math.round(slots * (0.6 + level * 0.05))));
    for (let i = 0; i < n; i++) {
      const c = genCrew(rng, clamp(level + rng.int(-1, 1), 1, 10), t.faction === 'navy' && rng.chance(0.3) ? 'marine' : undefined);
      e.crew.push(c);
    }
    e.autoAssign(t.faction === 'merchant' ? 'sail' : 'battle');
    e.placeCrewInstantly();
    e.sailTarget = 0.6;
    e.sail = 0.6;
    e.speed = 20;
    e.ai = newAI(e, t.faction === 'merchant' ? 500 : 520 + level * 40);
    e.recomputeStats(this.env, true);
    this.ships.push(e);
    return e;
  }

  private updateQuests(dt: number): void {
    const s = this.player;
    for (const q of this.profile.quests) {
      if (q.kind !== 'hunt' || q.done) continue;
      const ex = this.questShips.get(q.id);
      if (ex && !ex.dead) continue;
      if (dist2(s.x, s.y, q.x, q.y) < 1500 * 1500) {
        const cands = TEMPLATES.filter((t) => (t.faction === 'pirate' || t.faction === 'hunter') && t.min <= q.level && t.max >= q.level);
        const t = cands[cands.length - 1] ?? TEMPLATES[2];
        let x = q.x;
        let y = q.y;
        if (!this.openWater(x, y, 90)) {
          for (let k = 0; k < 20; k++) {
            const nx = q.x + (Math.random() - 0.5) * 600;
            const ny = q.y + (Math.random() - 0.5) * 600;
            if (this.openWater(nx, ny, 90)) {
              x = nx;
              y = ny;
              break;
            }
          }
        }
        const e = this.spawnShip(t, q.level, x, y);
        e.faction = 'pirate';
        e.hostile = true;
        e.boss = true;
        e.questId = q.id;
        e.captain = q.target ?? e.captain;
        e.name = `${e.name} (${q.target})`;
        e.gold += q.level * 60;
        (e.ai as AIState).boss = true;
        (e.ai as AIState).aggro = 900;
        this.questShips.set(q.id, e);
        this.toast(`You spot the ship of ${q.target}!`, '#ff9a7a');
      }
    }
  }

  private discover(): void {
    const f = this.avatar ?? this.player;
    const p = this.profile;
    const vision = this.avatar ? 360 : this.player.stats ? this.player.stats.vision * (1 + p.inv.passive('vision')) : 420;
    const c = 1024;
    const r = vision + (p.crew.some((m) => m.role === 'navigator') ? 600 : 0);
    const x0 = Math.floor((f.x - r) / c);
    const x1 = Math.floor((f.x + r) / c);
    const y0 = Math.floor((f.y - r) / c);
    const y1 = Math.floor((f.y + r) / c);
    for (let cx = x0; cx <= x1; cx++) for (let cy = y0; cy <= y1; cy++) {
      if (cx < 0 || cy < 0 || cx >= 500 || cy >= 500) continue;
      const idx = cy * 500 + cx;
      if (p.discovered[idx]) continue;
      const nx = Math.max(cx * c, Math.min(f.x, cx * c + c));
      const ny = Math.max(cy * c, Math.min(f.y, cy * c + c));
      if (dist2(nx, ny, f.x, f.y) <= r * r) {
        p.discovered[idx] = 1;
        this.emit('discover', cx, cy);
      }
    }
    islandsInRect(f.x - vision, f.y - vision, f.x + vision, f.y + vision, tmpIslands);
    for (const isl of tmpIslands) {
      if (this.seenIslands.has(isl.id) || isl.r < 30) continue;
      if (dist2(isl.x, isl.y, f.x, f.y) > (vision + isl.r) * (vision + isl.r)) continue;
      this.seenIslands.add(isl.id);
      p.stats.islandsVisited++;
      if (isl.port) this.toast(`Sighted ${isl.port.name} (${['Crown Port', 'Free Port', 'Pirate Haven'][isl.port.faction]})`, '#a8e0ff');
      else if (isl.r > 80) this.toast(`Discovered ${isl.name} — ${ISLAND_TYPE_NAMES[isl.type]}`, '#a8e0ff');
      p.fame += isl.port ? 1 : isl.r > 200 ? 1 : 0;
    }
    const bn = ['Emerald Shallows', 'Coral Expanse', 'Frostreach', 'Ashen Reach', 'Mistveil'][biomeAt(f.x, f.y)];
    const lv = levelAt(f.x, f.y);
    if (bn !== this.biomeName || lv !== this.lastRegionLevel) {
      if (this.biomeName) this.emit('region', bn, lv);
      this.biomeName = bn;
      this.lastRegionLevel = lv;
    }
  }

  regionInfo(): { biome: string; level: number } {
    return { biome: this.biomeName, level: this.lastRegionLevel };
  }

  private tickMorale(sec: number): void {
    const p = this.profile;
    const s = this.player;
    const stats = s.stats;
    if (!stats) return;
    const night = this.env.night;
    const mist = biomeAt(s.x, s.y) === B_MIST;
    let base = 62 + (stats.morale ?? 0) + p.inv.passive('morale') + (p.hat ? ITEM[p.hat].passive?.morale ?? 0 : 0) + (p.armor ? ITEM[p.armor].passive?.morale ?? 0 : 0);
    if (s.order === 'rest') base += 10;
    if (p.crew.some((c) => c.role === 'quartermaster')) base += 5;
    if (p.crew.some((c) => c.role === 'boatswain')) base += 3;
    if (this.rumAboard(s)) base += 4;
    for (const c of p.crew) {
      let target = base;
      if (c.traits.includes('superstitious') && (night || mist)) target -= 12;
      if (c.traits.includes('drunkard') && !this.rumAboard(s)) target -= 8;
      if (this.env.storm > 0.5 && !c.traits.includes('sea_legs')) target -= 6;
      const rate = (c.traits.includes('loyal') ? 0.5 : 1) * sec * 0.08;
      if (c.morale < target) c.morale = Math.min(target, c.morale + sec * 0.1);
      else c.morale = Math.max(target, c.morale - rate);
      c.morale = clamp(c.morale, 0, 100);
      if (s.order === 'rest' && c.hp < c.maxHp) c.hp = Math.min(c.maxHp, c.hp + sec * 0.25);
      else if (this.docked && c.hp < c.maxHp) c.hp = Math.min(c.maxHp, c.hp + sec * 0.5);
    }
    if (this.mode === 'sail' && p.captainHp < 100) p.captainHp = Math.min(100, p.captainHp + sec * 0.3);
    if (this.mode === 'sail' && !this.docked) p.stats.distance += Math.abs(s.speed) * sec;
    if (s.sail > 0.5 && Math.random() < 0.15) for (const c of p.crew) if (c.station >= 0 && s.stationOf(c.station) === 'sail') gainXp(c, 1);
  }

  dailyTick(): void {
    const p = this.profile;
    const s = this.player;
    if (!p.crew.length) return;
    const qm = p.crew.some((c) => c.role === 'quartermaster') ? 0.9 : 1;
    let wages = 0;
    for (const c of p.crew) wages += c.wage;
    wages = Math.round(wages * qm);
    if (p.gold >= wages) {
      p.gold -= wages;
      for (const c of p.crew) c.morale = Math.min(100, c.morale + 3);
      this.toast(`Paid ${wages} gold in crew wages.`, '#f0e6c8');
    } else {
      const paid = p.gold;
      p.gold = 0;
      for (const c of p.crew) c.morale = Math.max(0, c.morale - (c.traits.includes('greedy') ? 30 : 18));
      this.toast(`You could only pay ${paid} of ${wages} gold in wages! The crew is furious.`, '#ff7a6a');
    }
    const foodSave = s.stats?.foodSave ?? 0;
    let needFood = p.crew.length * (1 - foodSave);
    let needWater = p.crew.length;
    let moraleBoost = 0;
    let heal = 0;
    for (const id of ['salted_pork', 'fish', 'rations', 'fruit']) {
      const def = ITEM[id];
      while (needFood > 0.01 && p.inv.has(id)) {
        p.inv.remove(id, 1);
        needFood -= def.food ?? 1;
        moraleBoost += def.morale ?? 0;
        heal += def.heal ?? 0;
      }
    }
    for (const id of ['water', 'grog']) {
      const def = ITEM[id];
      while (needWater > 0.01 && p.inv.has(id)) {
        p.inv.remove(id, 1);
        needWater -= def.water ?? 1;
        moraleBoost += def.morale ?? 0;
      }
    }
    for (const c of p.crew) {
      c.morale = Math.min(100, c.morale + moraleBoost / p.crew.length);
      c.hp = Math.min(c.maxHp, c.hp + heal / p.crew.length);
      if (needFood > 0.01) {
        c.morale = Math.max(0, c.morale - 15);
        c.hp = Math.max(1, c.hp - 15);
      }
      if (needWater > 0.01) {
        c.morale = Math.max(0, c.morale - 20);
        c.hp = Math.max(1, c.hp - 20);
      }
    }
    if (needFood > 0.01) this.toast('The crew went hungry! Buy rations.', '#ff7a6a');
    if (needWater > 0.01) this.toast('The crew is parched! Buy fresh water.', '#ff7a6a');
    this.syncCargo();
  }

  produceIslands(): void {
    const now = this.env.epoch;
    for (const o of this.profile.owned) this.produceIsland(o, now);
  }

  produceIsland(o: OwnedIsland, now: number): void {
    const hours = (now - o.last) / 3600;
    if (hours <= 0) return;
    o.last = now;
    const isl = getIsland(o.id);
    let cap = 100;
    for (const st of o.structures) cap += STRUCT[st]?.storage ?? 0;
    let total = 0;
    for (const k in o.storage) total += o.storage[k];
    for (const st of o.structures) {
      const def = STRUCT[st];
      if (!def?.produce) continue;
      for (const pr of def.produce) {
        let item = pr.item;
        if (st === 'plantation' && isl) item = PLANTATION_CROPS[isl.biome] ?? item;
        const amt = pr.perHour * hours;
        const room = cap - total;
        if (room <= 0) return;
        const add = Math.min(room, amt);
        o.storage[item] = (o.storage[item] ?? 0) + add;
        total += add;
      }
    }
  }

  islandCap(o: OwnedIsland): number {
    let cap = 100;
    for (const st of o.structures) cap += STRUCT[st]?.storage ?? 0;
    return cap;
  }

  islandSlots(isl: Island): number {
    return structureSlots(isl);
  }

  private updateCamera(dt: number): void {
    const f = this.mode === 'foot' && this.avatar ? this.avatar : this.player;
    let tx = f.x;
    let ty = f.y;
    if (f === this.player) {
      tx += this.player.vx * 0.9;
      ty += this.player.vy * 0.9;
    }
    const k = Math.min(1, dt * 3.5);
    this.cam.x += (tx - this.cam.x) * k;
    this.cam.y += (ty - this.cam.y) * k;
    this.cam.shake = Math.max(0, this.cam.shake - dt * 8);
  }

  milesFrom(x: number, y: number): number {
    const f = this.avatar ?? this.player;
    return Math.hypot(x - f.x, y - f.y) / UNITS_PER_MILE;
  }

  coords(x: number, y: number): string {
    const lon = (x - CENTER) / UNITS_PER_MILE;
    const lat = (CENTER - y) / UNITS_PER_MILE;
    return `${Math.abs(lat).toFixed(1)}${lat >= 0 ? 'N' : 'S'} ${Math.abs(lon).toFixed(1)}${lon >= 0 ? 'E' : 'W'}`;
  }

  applyDesign(): void {
    const p = this.profile;
    const s = this.player;
    s.setDesign(cloneDesign(p.design), false);
    s.name = p.design.name;
    s.crew = p.crew;
    s.autoAssign(s.order);
    s.placeCrewInstantly();
    this.syncCargo();
  }
}

