import { art } from './palette';

export const CRATE = art([
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

export const BARREL = art([
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

export const CHEST = art([
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

export const LOCKED_CHEST = art([
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

export const GOLD_CHEST = art([
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

export const BOTTLE = art(['..kkk..', '..kJk..', '..klk..', '.kllLk.', 'kllLLlk', 'klppLlk', 'klppllk', 'kllllbk', 'kbllbbk', '.kkkkk.']);

export const WRECK = art([
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

export const QUEST_MARK = art(['.kkk.', 'kyYyk', 'kyYyk', 'kyYyk', 'kyyyk', '.kyk.', '..k..', '.kkk.', 'kyYyk', '.kkk.']);

export const DIG_SPOT = art(['....kkkk....', '..kkfFFfkk..', '.kfFfffFfDk.', 'kfFfffffffDk', '.kDffffffDk.', '..kkDDDDkk..', '....,,,,....']);

export const XMARK = art([
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

export const WAYPOINT = art(['kk.......', 'kRRRk....', 'kReRRRk..', 'kRRRRRRk.', 'kRRRRk...', 'kRk......', 'kk.......', 'k........', 'k........', 'k........', 'k........', 'kk.......', ',,,......']);

export const LOST_CARGO = art([
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

export const SPARKLE = [art(['..Y..', '..Y..', 'YYPYY', '..Y..', '..Y..']), art(['.....', '..Y..', '.YPY.', '..Y..', '.....'])];

export const GLINT = [art(['P']), art(['lPl']), art(['.l.', 'lPl', '.l.']), art(['l.l'])];

export { CLAIM_STONE, CLAIM_OWNED, SHRINE, STRUCTURES } from './world';
