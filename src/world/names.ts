import { RNG } from '../core/rng';

const START = ['Ka', 'Lo', 'Ma', 'Ri', 'Sa', 'To', 'Vel', 'Dor', 'An', 'Ba', 'Cor', 'Del', 'Es', 'Fa', 'Gal', 'Ha', 'Is', 'Jor', 'Ku', 'Lan', 'Mar', 'Nor', 'Or', 'Pel', 'Qua', 'Ros', 'Sal', 'Tor', 'Ul', 'Ver', 'Xan', 'Ya', 'Zan', 'Bel', 'Car', 'Mor', 'Tri', 'Ash', 'Bram', 'Cal'];
const MID = ['ra', 'li', 'na', 'ro', 'ta', 've', 'mi', 'do', 'sa', 'ka', 'le', 'ri', 'go', 'ba', 'du', 'za', 'ne', 'vo'];
const END = ['ra', 'na', 'th', 'mor', 'via', 'dos', 'ga', 'ren', 'lis', 'tan', 'ca', 'go', 'to', 'mar', 'ia', 'ros', 'nu', 'za', 'vel', 'wick', 'more', 'den'];

const ADJ = ['Weeping', 'Broken', 'Silent', 'Golden', 'Drowned', 'Crimson', 'Howling', 'Sleeping', 'Forgotten', 'Gilded', 'Rotten', 'Lonely', 'Black', 'Jade', 'Hollow', 'Burning', 'Frozen', 'Whispering', 'Cursed', 'Sunken'];
const NOUN = ['Rocks', 'Teeth', 'Maiden', 'Sisters', 'Crown', 'Anvil', 'Gallows', 'Lantern', 'Serpent', 'Widow', 'Skull', 'Chalice', 'Spire', 'Cradle', 'Bones', 'Reef', 'Tusk', 'Hook'];

export function wordName(rng: RNG): string {
  let n = rng.pick(START);
  if (rng.chance(0.55)) n += rng.pick(MID);
  n += rng.pick(END);
  return n;
}

export function islandName(rng: RNG, type: number): string {
  const r = rng.next();
  if (type === 9) return `The ${rng.pick(ADJ)} ${rng.pick(NOUN)}`;
  if (type === 8) return `${rng.pick(['Skull', 'Dead Man\'s', 'Bone', 'Grave', 'Gallows'])} ${rng.pick(['Isle', 'Rock', 'Key', 'Point'])}`;
  const n = wordName(rng);
  if (r < 0.25) return `${n} Isle`;
  if (r < 0.45) return `Isla ${n}`;
  if (r < 0.6) return `${n} Cay`;
  if (r < 0.7) return `${n}'s Rest`;
  if (r < 0.82) return `The ${rng.pick(ADJ)} ${rng.pick(NOUN)}`;
  return `${n} Key`;
}

export function portName(rng: RNG, faction: number): string {
  const n = wordName(rng);
  if (faction === 0) return rng.pick([`Port ${n}`, `Fort ${n}`, `${n} Harbor`, `San ${n}`, `${n}ton`]);
  if (faction === 2) return rng.pick([`${n}'s Hideout`, `Rogue's ${rng.pick(['Cove', 'Hollow', 'Den'])}`, `${n} Haven`, `Black ${n}`, `Cutthroat ${rng.pick(['Bay', 'Cove'])}`]);
  return rng.pick([`${n} Bay`, `${n} Landing`, `${n} Market`, `Port ${n}`, `${n} Wharf`]);
}

const FIRST = ['Jack', 'Anne', 'Mary', 'Will', 'Ned', 'Bess', 'Tom', 'Grace', 'Silas', 'Molly', 'Elias', 'Jonah', 'Ruth', 'Calico', 'Bart', 'Ines', 'Rafa', 'Kofi', 'Mei', 'Oona', 'Pip', 'Dag', 'Saoirse', 'Ezra', 'Ama', 'Luis', 'Nils', 'Tobias', 'Yara', 'Ike', 'Hob', 'Wren', 'Juno', 'Abel', 'Lotte', 'Finn', 'Ada', 'Cyrus', 'Nell', 'Omar'];
const LAST = ['Rackham', 'Bonny', 'Hook', 'Flint', 'Teach', 'Kidd', 'Morgan', 'Vane', 'Lowe', 'Drake', 'Salt', 'Barrow', 'Tarr', 'Gull', 'Marsh', 'Crane', 'Bligh', 'Quill', 'Wick', 'Holt', 'Reyes', 'Oduya', 'Chen', 'Silva', 'Brandt', 'Mendes', 'Okafor', 'Varga', 'Hale', 'Finch'];
const NICK = ['One-Eye', 'Saltbeard', 'the Quick', 'Ironhook', 'Barnacle', 'the Red', 'Two-Pistols', 'Grim', 'the Lucky', 'Stormcrow', 'Bilgewater', 'the Silent', 'Longshanks', 'Mad'];

export function personName(rng: RNG): string {
  if (rng.chance(0.18)) return `${rng.pick(FIRST)} "${rng.pick(NICK)}" ${rng.pick(LAST)}`;
  return `${rng.pick(FIRST)} ${rng.pick(LAST)}`;
}

export function captainName(rng: RNG): string {
  return `${rng.pick(['Captain', 'Cap\'n', 'Admiral', 'Commodore'])} ${rng.pick(FIRST)} ${rng.chance(0.5) ? rng.pick(NICK) : rng.pick(LAST)}`;
}

export function shipName(rng: RNG): string {
  const a = ['Black', 'Royal', 'Salty', 'Golden', 'Iron', 'Silver', 'Scarlet', 'Wicked', 'Merry', 'Restless', 'Howling', 'Lucky', 'Grim', 'Wandering'];
  const b = ['Gull', 'Revenge', 'Fortune', 'Maiden', 'Kraken', 'Serpent', 'Wind', 'Dawn', 'Pearl', 'Hound', 'Widow', 'Tide', 'Spectre', 'Barracuda'];
  return `${rng.pick(a)} ${rng.pick(b)}`;
}
