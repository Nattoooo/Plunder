import type { Station } from './crew';

export interface GunSpec {
  dmg: number;
  range: number;
  reload: number;
  arc: number;
  speed: number;
  spread: number;
  lob?: boolean;
  splash?: number;
  ammo: 'shot' | 'mortar' | 'free';
  size: number;
}

export interface SailSpec {
  power: number;
  a: number;
  b: number;
  c: number;
  span: number;
  style: 'patch' | 'square' | 'lateen' | 'main';
}

export interface ComponentDef {
  id: number;
  key: string;
  name: string;
  kind: 'hull' | 'part';
  cat: 'hull' | 'sail' | 'control' | 'weapon' | 'utility';
  price: number;
  mats: Record<string, number>;
  mass: number;
  hp: number;
  fame: number;
  station?: Station;
  slots?: number;
  unmanned?: number;
  sail?: SailSpec;
  oar?: number;
  turn?: number;
  gun?: GunSpec;
  armor?: number;
  drag?: number;
  cargo?: number;
  crew?: number;
  vision?: number;
  repair?: number;
  heal?: number;
  morale?: number;
  foodSave?: number;
  reloadBoost?: number;
  ram?: number;
  luck?: number;
  explosive?: boolean;
  place: 'edge' | 'bow' | 'stern' | 'any';
  rotates: boolean;
  max?: number;
  color: number;
  desc: string;
}

const SQ = { a: 0.625, b: 0.325, c: 0.475 };
const LT = { a: 0.725, b: 0.125, c: 0.325 };

export const COMPONENTS: ComponentDef[] = [
  { id: 0, key: 'none', name: 'Empty', kind: 'part', cat: 'utility', price: 0, mats: {}, mass: 0, hp: 0, fame: 0, place: 'any', rotates: false, color: 0, desc: '' },
  { id: 1, key: 'raft_logs', name: 'Raft Logs', kind: 'hull', cat: 'hull', price: 12, mats: {}, mass: 2, hp: 20, fame: 0, drag: 1.22, place: 'any', rotates: false, color: 0x9a6a3a, desc: 'Lashed-together logs. Light, cheap and flimsy.' },
  { id: 2, key: 'pine_hull', name: 'Pine Planking', kind: 'hull', cat: 'hull', price: 45, mats: { planks: 2 }, mass: 3, hp: 40, fame: 0, drag: 1, place: 'any', rotates: false, color: 0xb88a52, desc: 'Standard planked hull. A good balance of weight and strength.' },
  { id: 3, key: 'oak_hull', name: 'Oak Hull', kind: 'hull', cat: 'hull', price: 130, mats: { planks: 3, tar: 1 }, mass: 4.5, hp: 70, fame: 40, drag: 1.03, armor: 0.12, place: 'any', rotates: false, color: 0x7a5232, desc: 'Thick seasoned oak. Shrugs off light shot.' },
  { id: 4, key: 'iron_hull', name: 'Ironbound Hull', kind: 'hull', cat: 'hull', price: 420, mats: { planks: 2, iron_bars: 2 }, mass: 7, hp: 110, fame: 300, drag: 1.1, armor: 0.32, place: 'any', rotates: false, color: 0x5a5e66, desc: 'Oak sheathed in iron bands. Heavy, but nearly unsinkable.' },

  { id: 5, key: 'patched_sail', name: 'Patched Sail', kind: 'part', cat: 'sail', price: 30, mats: { canvas: 1 }, mass: 1.5, hp: 25, fame: 0, station: 'sail', slots: 1, unmanned: 1, sail: { power: 10, ...SQ, span: 1.6, style: 'patch' }, place: 'any', rotates: false, color: 0xc8b48a, desc: 'A scrap of canvas on a pole. You can work it alone.' },
  { id: 6, key: 'square_rig', name: 'Square Rig', kind: 'part', cat: 'sail', price: 260, mats: { canvas: 4, rope: 2 }, mass: 4, hp: 50, fame: 0, station: 'sail', slots: 1, unmanned: 0.55, sail: { power: 24, ...SQ, span: 2.4, style: 'square' }, place: 'any', rotates: false, color: 0xf0e8d0, desc: 'A proper square sail. Fast downwind, poor upwind. Wants a sailor.' },
  { id: 7, key: 'lateen_rig', name: 'Lateen Rig', kind: 'part', cat: 'sail', price: 300, mats: { canvas: 3, rope: 2 }, mass: 3, hp: 45, fame: 20, station: 'sail', slots: 1, unmanned: 0.6, turn: 0.08, sail: { power: 18, ...LT, span: 2, style: 'lateen' }, place: 'any', rotates: false, color: 0xf0e0c0, desc: 'Triangular fore-and-aft sail. Weaker, but sails well into the wind and turns sharper.' },
  { id: 8, key: 'mainmast', name: 'Great Mainmast', kind: 'part', cat: 'sail', price: 1400, mats: { planks: 6, canvas: 10, rope: 6 }, mass: 9, hp: 110, fame: 220, station: 'sail', slots: 2, unmanned: 0.35, sail: { power: 54, ...SQ, span: 3.4, style: 'main' }, place: 'any', rotates: false, color: 0xfff4dc, desc: 'A towering mast with two tiers of canvas. Needs two hands.' },
  { id: 9, key: 'oar_bench', name: 'Oar Bench', kind: 'part', cat: 'sail', price: 90, mats: { planks: 2 }, mass: 2.5, hp: 40, fame: 0, station: 'oar', slots: 2, unmanned: 0, oar: 12, place: 'any', rotates: false, color: 0x8a6a44, desc: 'Rowing positions. Moves you regardless of wind, even with sails furled.' },
  { id: 10, key: 'rudder', name: 'Rudder', kind: 'part', cat: 'control', price: 150, mats: { planks: 2, iron_bars: 1 }, mass: 2, hp: 55, fame: 0, turn: 0.3, place: 'stern', rotates: false, color: 0x5a3a22, desc: 'Must sit at the stern. Much sharper turning.' },
  { id: 11, key: 'helm', name: 'Ship\'s Wheel', kind: 'part', cat: 'control', price: 80, mats: { planks: 1, brass: 1 }, mass: 1.5, hp: 60, fame: 0, station: 'helm', slots: 1, unmanned: 1, turn: 0.22, max: 1, place: 'any', rotates: false, color: 0x8a5a2e, desc: 'The helm. A helmsman or navigator here boosts turning and speed.' },

  { id: 12, key: 'swivel_gun', name: 'Swivel Gun', kind: 'part', cat: 'weapon', price: 140, mats: { iron_bars: 1 }, mass: 1.5, hp: 35, fame: 0, station: 'gun', slots: 1, unmanned: 0.5, gun: { dmg: 9, range: 180, reload: 1.5, arc: 1.25, speed: 300, spread: 0.06, ammo: 'free', size: 1 }, place: 'any', rotates: true, color: 0x6a6a72, desc: 'Light rail gun with a wide arc. Fires without ammo. Good against crews.' },
  { id: 13, key: 'light_cannon', name: 'Light Cannon', kind: 'part', cat: 'weapon', price: 320, mats: { iron_bars: 2 }, mass: 4, hp: 60, fame: 0, station: 'gun', slots: 1, unmanned: 0.35, gun: { dmg: 22, range: 280, reload: 4, arc: 0.62, speed: 250, spread: 0.06, ammo: 'shot', size: 2 }, place: 'edge', rotates: true, color: 0x3a3a40, desc: 'A six-pounder. Must face out over the side.' },
  { id: 14, key: 'long_gun', name: 'Long Gun', kind: 'part', cat: 'weapon', price: 900, mats: { iron_bars: 4 }, mass: 6.5, hp: 80, fame: 100, station: 'gun', slots: 2, unmanned: 0.25, gun: { dmg: 30, range: 420, reload: 5.5, arc: 0.44, speed: 330, spread: 0.035, ammo: 'shot', size: 3 }, place: 'edge', rotates: true, color: 0x2e2e34, desc: 'Long-barrelled twelve-pounder. Hits hard from far away.' },
  { id: 15, key: 'carronade', name: 'Carronade', kind: 'part', cat: 'weapon', price: 1100, mats: { iron_bars: 5 }, mass: 6, hp: 80, fame: 180, station: 'gun', slots: 2, unmanned: 0.25, gun: { dmg: 55, range: 190, reload: 6.5, arc: 0.7, speed: 220, spread: 0.09, ammo: 'shot', size: 4 }, place: 'edge', rotates: true, color: 0x26262c, desc: 'The smasher. Short range, enormous damage.' },
  { id: 16, key: 'mortar', name: 'Mortar', kind: 'part', cat: 'weapon', price: 2400, mats: { iron_bars: 8, brass: 2 }, mass: 9, hp: 90, fame: 450, station: 'mortar', slots: 2, unmanned: 0.2, gun: { dmg: 75, range: 580, reload: 12, arc: Math.PI, speed: 210, spread: 0.05, lob: true, splash: 26, ammo: 'mortar', size: 5 }, place: 'any', rotates: false, color: 0x1e1e22, desc: 'Lobs explosive shells anywhere around you. Uses mortar shells.' },

  { id: 17, key: 'crew_quarters', name: 'Crew Quarters', kind: 'part', cat: 'utility', price: 180, mats: { planks: 3 }, mass: 2.5, hp: 50, fame: 0, crew: 4, morale: 1, place: 'any', rotates: false, color: 0x6a4a2e, desc: 'Hammocks below deck. +4 crew capacity.' },
  { id: 18, key: 'cargo_hold', name: 'Cargo Hold', kind: 'part', cat: 'utility', price: 150, mats: { planks: 3 }, mass: 2, hp: 50, fame: 0, station: 'cargo', slots: 1, unmanned: 1, cargo: 60, place: 'any', rotates: false, color: 0xa07a4a, desc: '+60 cargo capacity. A quartermaster here increases loot.' },
  { id: 19, key: 'galley', name: 'Galley', kind: 'part', cat: 'utility', price: 380, mats: { planks: 2, iron_bars: 1 }, mass: 3, hp: 45, fame: 0, station: 'galley', slots: 1, unmanned: 0.3, foodSave: 0.35, morale: 3, place: 'any', rotates: false, color: 0x7a7a7a, desc: 'Ship\'s kitchen. Less food eaten and happier crew, best with a cook.' },
  { id: 20, key: 'powder_magazine', name: 'Powder Magazine', kind: 'part', cat: 'utility', price: 420, mats: { planks: 2, iron_bars: 1 }, mass: 3, hp: 35, fame: 30, station: 'magazine', slots: 1, unmanned: 0.4, reloadBoost: 0.14, explosive: true, place: 'any', rotates: false, color: 0x8a2a1e, desc: 'Ship-wide faster reloads. Explodes if destroyed!' },
  { id: 21, key: 'workshop', name: 'Carpenter\'s Workshop', kind: 'part', cat: 'utility', price: 450, mats: { planks: 2, iron_bars: 2 }, mass: 3, hp: 50, fame: 20, station: 'workshop', slots: 1, unmanned: 0.25, repair: 2.2, place: 'any', rotates: false, color: 0x9a7a5a, desc: 'Repairs damaged parts and hull at sea. Best with a carpenter.' },
  { id: 22, key: 'sick_bay', name: 'Sick Bay', kind: 'part', cat: 'utility', price: 500, mats: { planks: 2, brass: 1 }, mass: 2, hp: 40, fame: 40, station: 'sickbay', slots: 1, unmanned: 0, heal: 0.8, place: 'any', rotates: false, color: 0xe8e4dc, desc: 'A surgeon here heals wounded crew and prevents deaths.' },
  { id: 23, key: 'crows_nest', name: 'Crow\'s Nest', kind: 'part', cat: 'utility', price: 300, mats: { planks: 2, rope: 2 }, mass: 2, hp: 40, fame: 0, station: 'nest', slots: 1, unmanned: 0.3, vision: 280, place: 'any', rotates: false, color: 0x6a4a2e, desc: 'A lookout up here sees much farther.' },
  { id: 24, key: 'ram', name: 'Iron Ram', kind: 'part', cat: 'weapon', price: 700, mats: { iron_bars: 6 }, mass: 5, hp: 160, fame: 90, ram: 3, armor: 0.5, place: 'bow', rotates: false, color: 0x4a4e56, desc: 'Must sit at the bow. Ramming deals triple damage to the enemy.' },
  { id: 25, key: 'figurehead', name: 'Figurehead', kind: 'part', cat: 'utility', price: 600, mats: { planks: 1, brass: 2 }, mass: 1.5, hp: 40, fame: 50, luck: 0.08, morale: 4, max: 1, place: 'bow', rotates: false, color: 0xd8b04a, desc: 'Must sit at the bow. +8% loot and a proud, happy crew.' }
];

export const COMP_BY_KEY: Record<string, ComponentDef> = {};
for (const c of COMPONENTS) COMP_BY_KEY[c.key] = c;

export interface KeelDef {
  id: number;
  name: string;
  cells: number;
  w: number;
  h: number;
  price: number;
  fame: number;
}

export const KEELS: KeelDef[] = [
  { id: 0, name: 'Raft', cells: 12, w: 4, h: 5, price: 0, fame: 0 },
  { id: 1, name: 'Sloop', cells: 24, w: 5, h: 9, price: 1200, fame: 15 },
  { id: 2, name: 'Brigantine', cells: 42, w: 6, h: 12, price: 4500, fame: 120 },
  { id: 3, name: 'Frigate', cells: 68, w: 7, h: 16, price: 14000, fame: 400 },
  { id: 4, name: 'Galleon', cells: 100, w: 9, h: 19, price: 38000, fame: 1000 },
  { id: 5, name: 'Man-o\'-War', cells: 140, w: 10, h: 22, price: 90000, fame: 2500 }
];

export const GRID_W = 10;
export const GRID_H = 22;
