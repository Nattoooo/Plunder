import { ITEM } from '../data/items';
import { Design, starterDesign } from './design';
import { CrewMember } from './crew';

export interface InvItem {
  id: string;
  qty: number;
  data?: TreasureMapData;
}

export interface TreasureMapData {
  x: number;
  y: number;
  island: string;
  level: number;
  seed: number;
}

export class Inventory {
  items: InvItem[] = [];

  count(id: string): number {
    let n = 0;
    for (const it of this.items) if (it.id === id) n += it.qty;
    return n;
  }

  has(id: string, qty = 1): boolean {
    return this.count(id) >= qty;
  }

  weight(): number {
    let w = 0;
    for (const it of this.items) w += (ITEM[it.id]?.weight ?? 1) * it.qty;
    return w;
  }

  add(id: string, qty: number, data?: TreasureMapData): void {
    if (qty <= 0) return;
    if (data) {
      this.items.push({ id, qty: 1, data });
      return;
    }
    const ex = this.items.find((i) => i.id === id && !i.data);
    if (ex) ex.qty += qty;
    else this.items.push({ id, qty });
  }

  remove(id: string, qty: number): number {
    let left = qty;
    for (let i = this.items.length - 1; i >= 0 && left > 0; i--) {
      const it = this.items[i];
      if (it.id !== id) continue;
      const take = Math.min(it.qty, left);
      it.qty -= take;
      left -= take;
      if (it.qty <= 0) this.items.splice(i, 1);
    }
    return qty - left;
  }

  removeEntry(entry: InvItem): void {
    const i = this.items.indexOf(entry);
    if (i >= 0) this.items.splice(i, 1);
  }

  passive(key: 'luck' | 'speed' | 'vision' | 'nightVision' | 'storm' | 'morale' | 'goldFind' | 'reload' | 'repair'): number {
    let v = 0;
    const seen = new Set<string>();
    for (const it of this.items) {
      const d = ITEM[it.id];
      if (!d?.passive || seen.has(it.id)) continue;
      if (d.cat !== 'relic' && d.cat !== 'tool') continue;
      seen.add(it.id);
      v += d.passive[key] ?? 0;
    }
    return v;
  }

  sorted(): InvItem[] {
    const order = ['treasure', 'relic', 'map', 'trade', 'supply', 'ammo', 'material', 'tool', 'equip'];
    return [...this.items].sort((a, b) => {
      const da = ITEM[a.id];
      const db = ITEM[b.id];
      const ca = order.indexOf(da.cat);
      const cb = order.indexOf(db.cat);
      if (ca !== cb) return ca - cb;
      return db.price - da.price;
    });
  }
}

export interface OwnedIsland {
  id: number;
  name: string;
  structures: string[];
  storage: Record<string, number>;
  last: number;
}

export interface Quest {
  id: number;
  kind: 'hunt' | 'deliver' | 'salvage';
  title: string;
  desc: string;
  port: number;
  portName: string;
  x: number;
  y: number;
  item?: string;
  qty?: number;
  targetPort?: number;
  reward: number;
  fame: number;
  level: number;
  spawned?: boolean;
  done?: boolean;
  target?: string;
  expires: number;
}

export interface Stats {
  sunk: number;
  boarded: number;
  distance: number;
  treasures: number;
  goldEarned: number;
  islandsVisited: number;
  deaths: number;
  playSeconds: number;
}

export interface Settings {
  master: number;
  sfx: number;
  music: number;
  ambience: number;
  zoom: number;
  showFps: boolean;
  particles: number;
  screenShake: boolean;
}

export class Profile {
  name = 'Captain';
  gold = 150;
  fame = 0;
  notoriety = 0;
  keel = 0;
  design: Design = starterDesign();
  savedDesigns: Design[] = [];
  crew: CrewMember[] = [];
  inv = new Inventory();
  discovered = new Uint8Array(500 * 500);
  owned: OwnedIsland[] = [];
  looted: Record<number, number> = {};
  visitedPorts: number[] = [];
  lastPort = 0;
  home = 0;
  quests: Quest[] = [];
  completedQuests = 0;
  tutorial = 0;
  stats: Stats = { sunk: 0, boarded: 0, distance: 0, treasures: 0, goldEarned: 0, islandsVisited: 0, deaths: 0, playSeconds: 0 };
  settings: Settings = { master: 0.8, sfx: 0.8, music: 0.45, ambience: 0.7, zoom: 0, showFps: false, particles: 1, screenShake: true };
  markets: Record<number, { t: number; d: Record<string, number> }> = {};
  captainHp = 100;
  weapon: string | null = 'rusty_cutlass';
  armor: string | null = null;
  hat: string | null = null;
  lastDay = -1;
  waypoint: { x: number; y: number } | null = null;
  x = 0;
  y = 0;
  heading = -Math.PI / 2;
  hireSeed: Record<number, number[]> = {};
  created = Date.now();
  lost: { x: number; y: number; items: InvItem[]; t: number } | null = null;
  rumors: string[] = [];
  startDay = 0;

  ownedIsland(id: number): OwnedIsland | undefined {
    return this.owned.find((o) => o.id === id);
  }
}
