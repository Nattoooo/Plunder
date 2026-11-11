import { RNG } from '../core/rng';
import { ROLE, ROLES, Station, TRAITS, SKIN } from '../data/crew';
import { ITEM } from '../data/items';
import { personName } from '../world/names';

export interface CrewMember {
  id: number;
  name: string;
  role: string;
  level: number;
  xp: number;
  skill: number;
  hp: number;
  maxHp: number;
  morale: number;
  traits: string[];
  weapon: string | null;
  armor: string | null;
  hat: string | null;
  wage: number;
  skin: number;
  station: number;
  locked: boolean;
  lx: number;
  ly: number;
  tx: number;
  ty: number;
  wander: number;
}

let nextCrewId = 1;
export function setNextCrewId(n: number): void {
  nextCrewId = Math.max(nextCrewId, n);
}

export function xpToNext(level: number): number {
  return Math.round(80 * Math.pow(level, 1.5));
}

export function genCrew(rng: RNG, level: number, role?: string): CrewMember {
  const weights = ROLES.map((r) => r.weight);
  const rd = role ? ROLE[role] : rng.weighted(ROLES, weights);
  const traits: string[] = [];
  const nt = rng.chance(0.55) ? 1 : rng.chance(0.25) ? 2 : 0;
  for (let i = 0; i < nt; i++) {
    const t = rng.pick(TRAITS);
    if (traits.includes(t.id)) continue;
    if ((t.id === 'brave' && traits.includes('coward')) || (t.id === 'coward' && traits.includes('brave'))) continue;
    traits.push(t.id);
  }
  const lvl = Math.max(1, Math.min(10, level));
  const skill = Math.min(100, 18 + lvl * 7 + rng.int(0, 16));
  const maxHp = Math.round((60 + lvl * 6) * (traits.includes('strong') ? 1.3 : 1));
  const wage = Math.round(rd.wage * (1 + (lvl - 1) * 0.22) * (traits.includes('greedy') ? 1.5 : 1));
  return {
    id: nextCrewId++,
    name: personName(rng),
    role: rd.id,
    level: lvl,
    xp: 0,
    skill,
    hp: maxHp,
    maxHp,
    morale: 70,
    traits,
    weapon: null,
    armor: null,
    hat: null,
    wage,
    skin: rng.pick(SKIN),
    station: -1,
    locked: false,
    lx: 0,
    ly: 0,
    tx: 0,
    ty: 0,
    wander: 0
  };
}

export function hireCost(c: CrewMember): number {
  const r = ROLE[c.role];
  const t = c.traits.reduce((s, id) => s + (id === 'greedy' ? 0.2 : ['brave', 'sharpshooter', 'lucky', 'loyal', 'strong', 'sea_legs', 'quick'].includes(id) ? 0.15 : -0.1), 0);
  return Math.round(r.hire * (1 + (c.level - 1) * 0.45) * (1 + t));
}

export interface EffContext {
  hasGrog: boolean;
  night: boolean;
}

export function crewEff(c: CrewMember, station: Station, ctx: EffContext): number {
  const r = ROLE[c.role];
  let e = r.eff[station] ?? 0.6;
  e *= 0.75 + c.skill / 200;
  e *= 0.5 + (0.5 * c.hp) / c.maxHp;
  e *= c.morale < 20 ? 0.65 : c.morale < 45 ? 0.88 : c.morale > 85 ? 1.08 : 1;
  for (const t of c.traits) {
    if (t === 'lazy') e *= 0.85;
    else if (t === 'quick') e *= 1.12;
    else if (t === 'drunkard' && !ctx.hasGrog) e *= 0.85;
    else if (t === 'strong' && station === 'oar') e *= 1.2;
  }
  return e;
}

export function combatPower(c: CrewMember): number {
  const r = ROLE[c.role];
  let p = r.combat * (0.7 + c.level * 0.12) * (0.4 + (0.6 * c.hp) / c.maxHp);
  if (c.weapon) p += (ITEM[c.weapon]?.combat ?? 0) * 0.35;
  if (c.armor) p += (ITEM[c.armor]?.defense ?? 0) * 0.2;
  if (c.hat) p += (ITEM[c.hat]?.defense ?? 0) * 0.2;
  if (c.traits.includes('brave')) p *= 1.3;
  if (c.traits.includes('coward')) p *= 0.7;
  return p;
}

export function gainXp(c: CrewMember, amount: number): boolean {
  if (c.level >= 10) return false;
  c.xp += amount;
  let up = false;
  while (c.level < 10 && c.xp >= xpToNext(c.level)) {
    c.xp -= xpToNext(c.level);
    c.level++;
    c.skill = Math.min(100, c.skill + 6);
    c.maxHp += 6;
    c.hp = Math.min(c.maxHp, c.hp + 6);
    up = true;
  }
  return up;
}

export type Order = 'sail' | 'battle' | 'repair' | 'board' | 'rest';

export const ORDER_INFO: Record<Order, { name: string; key: string; desc: string; pri: Station[]; keyCount: number }> = {
  sail: { name: 'Sail Stations', key: '1', desc: 'Crew man the sails, oars and lookout. Best for travel.', pri: ['helm', 'sail', 'oar', 'nest', 'galley', 'cargo', 'workshop', 'sickbay', 'magazine', 'gun', 'mortar'], keyCount: 3 },
  battle: { name: 'Battle Stations', key: '2', desc: 'Crew man the guns and powder magazine first.', pri: ['helm', 'gun', 'mortar', 'magazine', 'sail', 'workshop', 'sickbay', 'nest', 'oar', 'galley', 'cargo'], keyCount: 4 },
  repair: { name: 'All Hands Repair', key: '3', desc: 'Spare hands help the carpenters. Much faster repairs.', pri: ['helm', 'workshop', 'sickbay', 'sail', 'gun', 'mortar', 'magazine'], keyCount: 3 },
  board: { name: 'Prepare to Board', key: '4', desc: 'Crew arm up at the rails. +25% boarding strength, slower sailing.', pri: ['helm', 'sail', 'gun'], keyCount: 1 },
  rest: { name: 'Rest Below', key: '5', desc: 'Only a skeleton crew works. Morale and health recover faster.', pri: ['helm', 'sail', 'galley', 'sickbay'], keyCount: 2 }
};
