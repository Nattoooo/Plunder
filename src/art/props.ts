import { art } from './palette';
import { rd, rdList } from './redraw';

const CRATE_0 = art([
  'kkkkkkkkkkk',
  'kVVVVVVVVVk',
  'kVWvvvvvWvk',
  'kVvWvvvWvvk',
  'kVvvWvWvvvk',
  'kVvvvWvvvvk',
  'kVvvWvWvvvk',
  'kVvWvvvWvvk',
  'kVWvvvvvWvk',
  'kWWWWWWWWWk',
  'kkkkkkkkkkk'
]);

const BARREL_0 = art([
  '..kkkkkk..',
  '.kvVVVVvk.',
  '.kWvvvvWk.',
  'kMNMMMMMmk',
  'kVvvvvvvWk',
  'kVvvvvvvWk',
  'kVvvvvvvWk',
  'kVvvvvvvWk',
  'kMNMMMMMmk',
  '.kVvvvvWk.',
  '..kkkkkk..'
]);

const CHEST_0 = art([
  '..kkkkkkkkkk..',
  '.kvVVVVVVVVvk.',
  'kvVvvvvvvvvVvk',
  'kWWWWWWWWWWWWk',
  'kyyyyykkyyyyyk',
  'kvvvvkYYkvvvvk',
  'kvVvvkyykvvVvk',
  'kvvvvvkkvvvvvk',
  'kWWWWWWWWWWWWk',
  '.kkkkkkkkkkkk.',
  '.,,,,,,,,,,,,,'
]);

const LOCKED_CHEST_0 = art([
  '..kkkkkkkkkk..',
  '.kvVVMVVMVVvk.',
  'kvVvvMvvMvvVvk',
  'kWWWWmWWmWWWWk',
  'kMMMMkkkkMMMMk',
  'kvvvvkNNkvvvvk',
  'kvVvvknNkvvVvk',
  'kvvvMvkkvMvvvk',
  'kWWWmWWWWmWWWk',
  '.kkkkkkkkkkkk.',
  '.,,,,,,,,,,,,,'
]);

const GOLD_CHEST_0 = art([
  '..kkkkkkkkkk..',
  '.kyYYYYYYYYyk.',
  'kyYOyyYYyyOYyk',
  'kWWWWWWWWWWWWk',
  'kOOOOOkkOOOOOk',
  'kvvvvkYYkvvvvk',
  'kvVvvkyykvvVvk',
  'kvvvvvkkvvvvvk',
  'kWWWWWWWWWWWWk',
  '.kkkkkkkkkkkk.'
]);

const BOTTLE_0 = art(['..kkk..', '..kJk..', '..klk..', '.kllLk.', 'kllLLlk', 'klppLlk', 'klppllk', 'kllllbk', 'kbllbbk', '.kkkkk.']);

const WRECK_0 = art([
  '.....................kk...........',
  '....................kVk...........',
  '...................kVkkkk.........',
  '..................kVkCCpCk........',
  '.................kVk.kCCpk........',
  '................kVk...kCk.........',
  '...............kVk.....k..........',
  '.......kkkkkkkkVkkkkkk............',
  '.....kkvVVVVVVVVVVVVVVkk..........',
  '....kvVvvvvvvvvvvvvvvvVWk.........',
  '...kWvkkvkkvkkvkkvkkvvVWWk........',
  '...kWkAAkAAkAAkAAkAAkvVWWk........',
  '...kWvkkvkkvkkvkkvkkvVWWk.........',
  '....kWWWWWWWWWWWWWWWWWWk..........',
  '..AAkkkkkkkkkkkkkkkkkkkAAA........',
  '.AAAAAAAAAAAAAAAAAAAAAAAAAA.......',
  '...AAAAA..AAAAAAA...AAAAA.........'
]);

const QUEST_MARK_0 = art(['.kkk.', 'kyYyk', 'kyYyk', 'kyYyk', 'kyyyk', '.kyk.', '..k..', '.kkk.', 'kyYyk', '.kkk.']);

const DIG_SPOT_0 = art(['....kkkk....', '..kkfFFfkk..', '.kfFfffFfDk.', 'kfFfffffffDk', '.kDffffffDk.', '..kkDDDDkk..', '....,,,,....']);

const XMARK_0 = art([
  'Rr.......rR',
  'rRr.....rRr',
  '.rRr...rRr.',
  '..rRr.rRr..',
  '...rRrRr...',
  '....rRr....',
  '...rRrRr...',
  '..rRr.rRr..',
  '.rRr...rRr.',
  'rRr.....rRr',
  'Rr.......rR'
]);

const WAYPOINT_0 = art(['kk.......', 'kRRRk....', 'kReRRRk..', 'kRRRRRRk.', 'kRRRRk...', 'kRk......', 'kk.......', 'k........', 'k........', 'k........', 'k........', 'kk.......', ',,,......']);

const LOST_CARGO_0 = art([
  '...kk.......',
  '...kRRRk....',
  '...kReRRk...',
  '...kRRk.....',
  '...kk.......',
  '...k........',
  'kkkkkkkkkkk.',
  'kVVVVVVVVVk.',
  'kVWvvvvvWvk.',
  'kVvWvvvWvvk.',
  'kVvvWvWvvvk.',
  'kVvWvvvWvvk.',
  'kWWWWWWWWWk.',
  'kkkkkkkkkkk.'
]);

const SPARKLE_0 = [art(['..Y..', '..Y..', 'YYPYY', '..Y..', '..Y..']), art(['.....', '..Y..', '.YPY.', '..Y..', '.....'])];

const GLINT_0 = [art(['P']), art(['lPl']), art(['.l.', 'lPl', '.l.']), art(['l.l'])];

export { CLAIM_STONE, CLAIM_OWNED, SHRINE, STRUCTURES } from './world';

export const CRATE = rd('crate', CRATE_0);
export const BARREL = rd('barrel', BARREL_0);
export const CHEST = rd('chest', CHEST_0);
export const LOCKED_CHEST = rd('locked-chest', LOCKED_CHEST_0);
export const GOLD_CHEST = rd('gold-chest', GOLD_CHEST_0);
export const BOTTLE = rd('bottle', BOTTLE_0);
export const WRECK = rd('wreck', WRECK_0);
export const QUEST_MARK = rd('quest-mark', QUEST_MARK_0);
export const DIG_SPOT = rd('dig-spot', DIG_SPOT_0);
export const XMARK = rd('x-mark', XMARK_0);
export const WAYPOINT = rd('waypoint', WAYPOINT_0);
export const LOST_CARGO = rd('lost-cargo', LOST_CARGO_0);
export const SPARKLE = rdList(['sparkle-1', 'sparkle-2'], SPARKLE_0);
export const GLINT = rdList(['glint-1', 'glint-2', 'glint-3', 'glint-4'], GLINT_0);
