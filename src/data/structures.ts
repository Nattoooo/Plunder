export interface StructureDef {
  id: string;
  name: string;
  price: number;
  mats: Record<string, number>;
  desc: string;
  produce?: { item: string; perHour: number }[];
  storage?: number;
  color: number;
  roof: number;
}

export const STRUCTURES: StructureDef[] = [
  { id: 'plantation', name: 'Plantation', price: 1500, mats: { planks: 10 }, desc: 'Grows cash crops suited to the island\'s climate.', produce: [{ item: 'sugar', perHour: 8 }], color: 0x6a9a3a, roof: 0xb8904a },
  { id: 'lumber_camp', name: 'Lumber Camp', price: 1200, mats: { rope: 4 }, desc: 'Fells trees into planks.', produce: [{ item: 'planks', perHour: 10 }], color: 0x7a5a32, roof: 0x5a3a22 },
  { id: 'mine', name: 'Iron Mine', price: 2600, mats: { planks: 12, rope: 6 }, desc: 'Digs and smelts iron bars.', produce: [{ item: 'iron_bars', perHour: 4 }], color: 0x5a5e66, roof: 0x3a3a40 },
  { id: 'fishery', name: 'Fishery', price: 900, mats: { planks: 6, rope: 4 }, desc: 'Nets fish and packs rations.', produce: [{ item: 'fish', perHour: 12 }, { item: 'rations', perHour: 6 }], color: 0x4a7a9a, roof: 0x3a5a7a },
  { id: 'distillery', name: 'Distillery', price: 2200, mats: { planks: 8, iron_bars: 4 }, desc: 'Turns cane into rum and grog.', produce: [{ item: 'rum', perHour: 4 }, { item: 'grog', perHour: 6 }], color: 0x9a6234, roof: 0x7a3a2a },
  { id: 'warehouse', name: 'Warehouse', price: 1000, mats: { planks: 14 }, desc: '+300 storage for goods produced here.', storage: 300, color: 0x8a6a4a, roof: 0x6a4a2e },
  { id: 'dock', name: 'Private Dock', price: 3000, mats: { planks: 20, rope: 8 }, desc: 'Repair and resupply here. Becomes your respawn point.', color: 0x8a6038, roof: 0x6a4426 },
  { id: 'watchtower', name: 'Watchtower', price: 1400, mats: { planks: 10 }, desc: 'Charts the seas for miles around the island.', color: 0x8a8578, roof: 0x5a5650 },
  { id: 'fort', name: 'Coastal Fort', price: 6500, mats: { planks: 10, iron_bars: 12 }, desc: 'Cannons that fire on hostile ships near your island.', color: 0x8e8a80, roof: 0x6a665e },
  { id: 'tavern', name: 'Tavern', price: 2500, mats: { planks: 12 }, desc: 'Sailors gather here. Hire crew on your own island.', color: 0xb8704a, roof: 0x8a3a2a }
];

export const STRUCT: Record<string, StructureDef> = {};
for (const s of STRUCTURES) STRUCT[s.id] = s;

export const PLANTATION_CROPS: Record<number, string> = { 0: 'sugar', 1: 'cocoa', 2: 'tea', 3: 'coffee', 4: 'tobacco' };
