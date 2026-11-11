export type Station = 'sail' | 'oar' | 'helm' | 'gun' | 'mortar' | 'magazine' | 'workshop' | 'sickbay' | 'galley' | 'nest' | 'cargo' | 'quarters';

export interface RoleDef {
  id: string;
  name: string;
  shirt: number;
  wage: number;
  hire: number;
  combat: number;
  eff: Partial<Record<Station, number>>;
  prefers: Station[];
  desc: string;
  weight: number;
}

export const ROLES: RoleDef[] = [
  { id: 'deckhand', name: 'Deckhand', shirt: 0xd8d0c0, wage: 6, hire: 40, combat: 1, eff: { sail: 1, oar: 1.05 }, prefers: ['sail', 'oar'], desc: 'Hauls lines and pulls oars. The backbone of any crew.', weight: 10 },
  { id: 'helmsman', name: 'Helmsman', shirt: 0x3a6ab8, wage: 12, hire: 90, combat: 1, eff: { helm: 1.35, sail: 0.85 }, prefers: ['helm', 'sail'], desc: 'Steady hands on the wheel. Sharper turns.', weight: 5 },
  { id: 'gunner', name: 'Gunner', shirt: 0xb83a2a, wage: 12, hire: 90, combat: 1.2, eff: { gun: 1.2, mortar: 0.9 }, prefers: ['gun', 'mortar'], desc: 'Loads, aims and fires cannons. Faster reloads and better aim.', weight: 8 },
  { id: 'master_gunner', name: 'Master Gunner', shirt: 0x7a1a1a, wage: 30, hire: 320, combat: 1.4, eff: { gun: 1.5, mortar: 1.45 }, prefers: ['mortar', 'gun'], desc: 'A veteran of a hundred broadsides. Nearby gunners work 10% faster.', weight: 2 },
  { id: 'powder_monkey', name: 'Powder Monkey', shirt: 0x8a8a3a, wage: 4, hire: 25, combat: 0.5, eff: { magazine: 1.3, gun: 0.8 }, prefers: ['magazine', 'gun'], desc: 'Runs powder from the magazine. Speeds up every gun aboard.', weight: 5 },
  { id: 'carpenter', name: 'Carpenter', shirt: 0x8a5a2e, wage: 15, hire: 120, combat: 1, eff: { workshop: 1.4 }, prefers: ['workshop'], desc: 'Patches holes and rebuilds broken parts, even mid-battle.', weight: 5 },
  { id: 'surgeon', name: 'Surgeon', shirt: 0xf0f0f0, wage: 22, hire: 200, combat: 0.6, eff: { sickbay: 1.5 }, prefers: ['sickbay'], desc: 'Heals the wounded and saves lives that would be lost.', weight: 3 },
  { id: 'cook', name: 'Cook', shirt: 0xe8e0a0, wage: 10, hire: 70, combat: 0.8, eff: { galley: 1.4 }, prefers: ['galley'], desc: 'Stretches rations and keeps bellies and spirits full.', weight: 4 },
  { id: 'navigator', name: 'Navigator', shirt: 0x2a8a8a, wage: 25, hire: 260, combat: 0.7, eff: { helm: 1.1, nest: 0.9 }, prefers: ['helm', 'nest'], desc: 'Reads wind and stars. Faster sailing and wider map discovery.', weight: 3 },
  { id: 'lookout', name: 'Lookout', shirt: 0x4ab84a, wage: 8, hire: 55, combat: 0.8, eff: { nest: 1.5 }, prefers: ['nest'], desc: 'Eagle eyes in the crow\'s nest. Spots ships and treasure early.', weight: 4 },
  { id: 'boatswain', name: 'Boatswain', shirt: 0x5a3a8a, wage: 18, hire: 160, combat: 1.2, eff: { sail: 1.3, oar: 1.2 }, prefers: ['sail', 'oar'], desc: 'Barks orders on deck. Faster acceleration and steadier morale.', weight: 3 },
  { id: 'quartermaster', name: 'Quartermaster', shirt: 0xd8a83a, wage: 28, hire: 300, combat: 1.1, eff: { cargo: 1.4, quarters: 1 }, prefers: ['cargo'], desc: 'Keeps the books and the peace. More loot, lower wages, better morale.', weight: 2 },
  { id: 'marine', name: 'Marine', shirt: 0xa82a3a, wage: 16, hire: 140, combat: 3, eff: { gun: 0.9 }, prefers: ['gun', 'sail'], desc: 'Trained fighter. Dominates boarding actions.', weight: 4 },
  { id: 'diver', name: 'Diver', shirt: 0x2a6aa8, wage: 14, hire: 110, combat: 0.9, eff: { cargo: 0.9, oar: 0.9 }, prefers: ['oar', 'cargo'], desc: 'Holds breath for minutes. Much richer salvage from wrecks.', weight: 3 },
  { id: 'shantyman', name: 'Shantyman', shirt: 0xe86a2a, wage: 9, hire: 65, combat: 0.8, eff: { oar: 1.1, sail: 0.9 }, prefers: ['oar', 'sail'], desc: 'Sings the crew through hard days. Morale stays up; rowers pull harder.', weight: 3 }
];

export const ROLE: Record<string, RoleDef> = {};
for (const r of ROLES) ROLE[r.id] = r;

export interface TraitDef {
  id: string;
  name: string;
  good: boolean;
  desc: string;
}

export const TRAITS: TraitDef[] = [
  { id: 'brave', name: 'Brave', good: true, desc: '+30% boarding strength.' },
  { id: 'coward', name: 'Coward', good: false, desc: '-30% boarding strength.' },
  { id: 'sharpshooter', name: 'Sharpshooter', good: true, desc: 'Much tighter cannon aim.' },
  { id: 'drunkard', name: 'Drunkard', good: false, desc: '-15% work unless there is grog or rum aboard.' },
  { id: 'lucky', name: 'Lucky', good: true, desc: '+5% loot.' },
  { id: 'greedy', name: 'Greedy', good: false, desc: 'Wants 50% higher wages.' },
  { id: 'loyal', name: 'Loyal', good: true, desc: 'Morale falls half as fast.' },
  { id: 'lazy', name: 'Lazy', good: false, desc: '-15% work.' },
  { id: 'strong', name: 'Strong', good: true, desc: '+30% health; rows harder.' },
  { id: 'superstitious', name: 'Superstitious', good: false, desc: 'Loses morale at night and in the Mistveil.' },
  { id: 'sea_legs', name: 'Sea Legs', good: true, desc: 'Unbothered by storms.' },
  { id: 'quick', name: 'Quick', good: true, desc: '+12% work speed.' }
];

export const TRAIT: Record<string, TraitDef> = {};
for (const t of TRAITS) TRAIT[t.id] = t;

export const SKIN = [0xf0c8a0, 0xd8a47a, 0xb87a50, 0x8a5a36, 0x6a4026, 0xe8b890];
