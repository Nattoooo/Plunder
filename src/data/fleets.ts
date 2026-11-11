export type AIFaction = 'pirate' | 'navy' | 'merchant' | 'ghost' | 'hunter';

export interface ShipTemplate {
  id: string;
  name: string;
  faction: AIFaction;
  min: number;
  max: number;
  hull: number;
  hullHigh?: number;
  rows: string[];
  sail: number;
  weight: number;
}

export const TEMPLATES: ShipTemplate[] = [
  { id: 'pirate_raft', name: 'Pirate Raft', faction: 'pirate', min: 1, max: 2, hull: 1, rows: ['#w#', '#s#', '###'], sail: 0x3a3a3a, weight: 3 },
  { id: 'pirate_cutter', name: 'Pirate Cutter', faction: 'pirate', min: 1, max: 4, hull: 2, rows: ['.#.', '#L#', 'C#C', '#H#', '.R.'], sail: 0x2a2a2e, weight: 3 },
  { id: 'pirate_sloop', name: 'Pirate Sloop', faction: 'pirate', min: 2, max: 6, hull: 2, rows: ['.w.', '#Q#', 'C#C', '#B#', 'CUC', '#H#', '.R.'], sail: 0x262428, weight: 3 },
  { id: 'pirate_brig', name: 'Pirate Brig', faction: 'pirate', min: 4, max: 8, hull: 3, rows: ['..F..', '.#Q#.', 'C#U#C', '#BQB#', 'C#P#C', '#WHU#', 'K###K', '.#R#.'], sail: 0x2a1e1e, weight: 3 },
  { id: 'pirate_frigate', name: 'Pirate Frigate', faction: 'pirate', min: 6, max: 10, hull: 3, hullHigh: 4, rows: ['..A..', '.#L#.', 'K#N#K', 'C#M#C', 'K#U#K', 'C#P#C', '#BMB#', 'K#W#K', 'C#H#C', '#UgY#', '.#R#.'], sail: 0x1e1a1a, weight: 2 },
  { id: 'navy_cutter', name: 'Navy Cutter', faction: 'navy', min: 1, max: 4, hull: 2, rows: ['.w.', '#Q#', 'C#C', 'CHC', '.R.'], sail: 0xf4f0e6, weight: 3 },
  { id: 'navy_brig', name: 'Navy Brig', faction: 'navy', min: 3, max: 7, hull: 3, rows: ['..#..', '.#Q#.', 'C#N#C', 'C#U#C', '#BQB#', 'G#P#G', '#WHU#', 'C###C', '.#R#.'], sail: 0xf4f0e6, weight: 3 },
  { id: 'navy_frigate', name: 'Navy Frigate', faction: 'navy', min: 5, max: 10, hull: 3, hullHigh: 4, rows: ['...F...', '..#Q#..', '.G#N#G.', 'G##M##G', 'C#U#U#C', 'G##P##G', '#B#M#B#', 'C#W#Y#C', 'G##H##G', '.#U#g#.', '..#R#..'], sail: 0xfaf6ec, weight: 2 },
  { id: 'navy_bomb', name: 'Bomb Ketch', faction: 'navy', min: 7, max: 10, hull: 3, rows: ['.#.', '#Q#', '#X#', 'G#G', '#X#', 'CHC', '.R.'], sail: 0xeae4d4, weight: 1 },
  { id: 'merchant_raft', name: 'Trader\'s Raft', faction: 'merchant', min: 1, max: 2, hull: 1, rows: ['###', '#s#', '#B#'], sail: 0xd8c8a0, weight: 2 },
  { id: 'merchant_sloop', name: 'Merchant Sloop', faction: 'merchant', min: 1, max: 5, hull: 2, rows: ['.#.', '#Q#', 'BBB', '#U#', 'wHw', '.R.'], sail: 0xe8d8b0, weight: 3 },
  { id: 'merchant_galleon', name: 'Merchant Galleon', faction: 'merchant', min: 4, max: 10, hull: 3, rows: ['..#..', '.#Q#.', '#BMB#', 'BBUBB', 'C#B#C', '#BMB#', 'BBUBB', '#WHg#', '.#R#.'], sail: 0xe8dcc0, weight: 2 },
  { id: 'ghost_ship', name: 'Ghost Ship', faction: 'ghost', min: 4, max: 10, hull: 3, rows: ['..#..', '.#L#.', 'K#M#K', 'K#U#K', '#B#B#', 'K#M#K', '#WHU#', '.#R#.'], sail: 0x5a7a6a, weight: 1 },
  { id: 'hunter_brig', name: 'Bounty Hunter', faction: 'hunter', min: 3, max: 10, hull: 3, rows: ['..A..', '.#L#.', 'G#N#G', 'C#Q#C', 'G#P#G', '#WHU#', 'C###C', '.#R#.'], sail: 0x6a2a2a, weight: 1 }
];

export const PART_CHARS: Record<string, number> = {
  s: 5, Q: 6, L: 7, M: 8, O: 9, R: 10, H: 11, w: 12, C: 13, G: 14, K: 15, X: 16, U: 17, B: 18, g: 19, P: 20, W: 21, Y: 22, N: 23, A: 24, F: 25
};
