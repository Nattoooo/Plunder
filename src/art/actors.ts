import { art, Art } from './palette';
import { rd, rdList } from './redraw';

const CAP_TOP = ['....kkkk....', '...kKKKKk...', '..kKKKKKKk..', '.kyyyyyyyyk.'];

const DOWN_BODY = [
  '..kjssssjk..',
  '..kskssksk..',
  '..ksssssSk..',
  '...kjjjjk...',
  '..kRRppRRk..',
  '.kRRRppRRRk.',
  'kRrkRppRkrRk',
  'kRrkRppRkrRk',
  'kssJJJyJJssk',
  '.kkRRRRRRkk.'
];

const UP_BODY = [
  '..kjjjjjjk..',
  '..kjjjjjjk..',
  '..kjjjjjjk..',
  '...kjRjjk...',
  '..kRRRRRRk..',
  '.kRRRRRRRRk.',
  'kRrkRRRRkrRk',
  'kRrkRrrRkrRk',
  'kssJJJJJJssk',
  '.kkRRRRRRkk.'
];

const LEGS_STAND = ['..kbBbbBbk..', '..kbBkkBbk..', '..kjjk.kjjk.', '..kkkk.kkkk.'];
const LEGS_A = ['..kbBbbBbk..', '..kbBkkjjk..', '..kjjk.kkk..', '..kkkk......'];
const LEGS_B = ['..kbBbbBbk..', '..kjjkkBbk..', '..kkk.kjjk..', '......kkkk..'];

const SIDE_TOP = ['....kkkk....', '...kKKKKk...', '..kKKKKKKk..', '.kyyyyyyyyyk'];
const SIDE_BODY = [
  '...kjjsssk..',
  '...kjsskSk..',
  '...kjssssk..',
  '....kjjSk...',
  '...kRRpRk...',
  '...kRRppRk..',
  '...kRrRRk...',
  '...kRrRRk...',
  '...kJsJJk...',
  '...kRRRRk...'
];
const SIDE_LEGS_STAND = ['...kbBBbk...', '...kbBBbk...', '...kjjjjk...', '...kkkkkkk..'];
const SIDE_LEGS_A = ['...kbBBbk...', '..kbBkkBbk..', '..kjjk.kjjk.', '.kkkk..kkkk.'];

const CAPTAIN_DOWN_0: Art[] = [art([...CAP_TOP, ...DOWN_BODY, ...LEGS_STAND]), art([...CAP_TOP, ...DOWN_BODY, ...LEGS_A]), art([...CAP_TOP, ...DOWN_BODY, ...LEGS_B])];
const CAPTAIN_UP_0: Art[] = [art([...CAP_TOP, ...UP_BODY, ...LEGS_STAND]), art([...CAP_TOP, ...UP_BODY, ...LEGS_A]), art([...CAP_TOP, ...UP_BODY, ...LEGS_B])];
const CAPTAIN_SIDE_0: Art[] = [art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_STAND]), art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_A]), art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_STAND])];

const CUTLASS_0 = art(['.......kk', '......kNk', '.....kNk.', '....kNk..', '.k.kNk...', '..kNk....', '.kyk.....', 'kJk......', 'kk.......']);
const PISTOL_FLASH_0 = art(['..Y..', '.YQY.', 'YQPQY', '.YQY.', '..Y..']);

const CRAB_0: Art[] = [
  art([
    '.kk......kk.',
    'kReRk..kReRk',
    '.kRRk..kRRk.',
    '..kkRpkpRkk.',
    '.kRRReeRRRk.',
    'kRRRRRRRRRRk',
    'kRkRrrrrRkRk',
    '.k.k....k.k.'
  ]),
  art([
    'kk........kk',
    'kReRk..kReRk',
    '.kRRk..kRRk.',
    '..kkRpkpRkk.',
    '.kRRReeRRRk.',
    'kRRRRRRRRRRk',
    '.kRkrrrrkRk.',
    'k.k......k.k'
  ])
];

const SKELETON_0: Art[] = [
  art([
    '...kkkk...',
    '..kxxxxk..',
    '.kxkxxkxk.',
    '.kxxxxxxk.',
    '..kxkkxk..',
    '...kxxk...',
    '.kkxxxxkk.',
    'kxkxkkxkxk',
    'kxkxxxxkxk',
    'kxkxkkxkxk',
    'kNk.xx.kxk',
    'kNkkxxkk.k',
    'kNkxkkxk..',
    'kkkx..xk..',
    '..kx..xk..',
    '..kk..kk..'
  ]),
  art([
    '...kkkk...',
    '..kxxxxk..',
    '.kxkxxkxk.',
    '.kxxxxxxk.',
    '..kxkkxk..',
    '...kxxk...',
    '.kkxxxxkk.',
    'kxkxkkxkxk',
    'kxkxxxxkxk',
    'kNkxkkxkxk',
    'kNk.xx.kxk',
    'kNkkxxkk.k',
    'kkkxkkxk..',
    '..kx.kxk..',
    '..kx..kk..',
    '..kk......'
  ])
];

const WRAITH_0: Art[] = [
  art([
    '....kkkk....',
    '...kiiiik...',
    '..kiIIIIik..',
    '..kikkkkik..',
    '.kikYkkYkik.',
    '.kikkkkkkik.',
    '.kiiikkiiik.',
    'kiIiiiiiiIik',
    'kiiiiiiiiiik',
    'kIkiiiiiikIk',
    '.k.kiiiik.k.',
    '...kiiiik...',
    '..kiiiiiik..',
    '..kiikkiik..',
    '...kik.kik..',
    '....k...k...'
  ]),
  art([
    '....kkkk....',
    '...kiiiik...',
    '..kiIIIIik..',
    '..kikkkkik..',
    '.kikYkkYkik.',
    '.kikkkkkkik.',
    '.kiiikkiiik.',
    'kiIiiiiiiIik',
    'kiiiiiiiiiik',
    'kIkiiiiiikIk',
    '.k.kiiiik.k.',
    '...kiiiik...',
    '..kiiiiiik..',
    '..kikiikik..',
    '..kik..kik..',
    '...k....k...'
  ])
];

const GULL_0: Art[] = [
  art(['kk.....kk', 'kpk...kpk', '.kpkkkpk.', '..kpYpk..', '...kpk...', '....k....']),
  art(['.........', 'kkk...kkk', 'kppkkkppk', '.kkpYpkk.', '...kpk...', '....k....'])
];
export const GULL_SHADOW = art([',,,,,', '.,,,.']);

const WHALE_0 = art([
  '..........kkkkkkkkk.........',
  '...kk...kkBlBBBBBBBkkk......',
  '..kBBk.kBBlBBBBBBBBBBBkk....',
  '..kBBBkBBBBBBBBBBkBBBBBBkk..',
  '...kBBBBBBBBBBBBBBBBBBBBBBk.',
  '...kbBBBBBBBBBBBBBBBBBBBBBBk',
  '..kbbbbBBBBBBBBBBBBBBBBBBBbk',
  '..kbbk.kbbbbbbbbbbbbbbbbbbk.',
  '...kk...kkkbbbbbbbbbbbbbkk..',
  '..........kkkkkkkkkkkkkk....'
]);

const SERPENT_HEAD_0 = art([
  '....kkkkk.....',
  '..kkGGGGGkk...',
  '.kGGhhGGGGGk..',
  'kGGhkYkGGGGGk.',
  'kGhGGGGGGGGGGk',
  'kGGGGGGGGGGGGk',
  'kgGGGGGGGkkkkk',
  'kggGGGGGkRRRk.',
  '.kgggggkxRxRk.',
  '..kkggggkkkkk.',
  '....kkkk......'
]);

const SERPENT_SEG_0: Art[] = [
  art([
    '...kkkkk...',
    '.kkGGGGGkk.',
    '.kGhGGGhGk.',
    'kGhGGGGGhGk',
    'kGGRRRRRGGk',
    'kGRrRrRrRGk',
    'kGGRRRRRGGk',
    'kgGGGGGGGgk',
    '.kgGgGgGgk.',
    '.kkgggggkk.',
    '...kkkkk...'
  ]),
  art(['..kkkkk..', '.kGhGhGk.', 'kGhGGGhGk', 'kGRRRRRGk', 'kRrRrRrRk', 'kGRRRRRGk', 'kgGGGGGgk', '.kgGgGgk.', '..kkkkk..']),
  art(['..kkk..', '.kGhGk.', 'kGRRRGk', 'kRrRrRk', 'kGRRRGk', '.kgGgk.', '..kkk..'])
];

const SERPENT_TAIL_0 = art(['kkk.......', 'kGGkk.....', '.kGRGkkkk.', '..kRrRRGGk', '.kGRGkkkk.', 'kGGkk.....', 'kkk.......']);

export const SUBMERGED = { G: 0x183c44, g: 0x12303a, h: 0x1e4a52, R: 0x1e3e46, r: 0x16323a, Y: 0x2a5a62, x: 0x1e4a52 };

export const FOOT_SHADOW = art(['..,,,,,,..', ',,,,,,,,,,', '..,,,,,,..']);

export const CAPTAIN_DOWN: Art[] = rdList(['captain-down-1', 'captain-down-2', 'captain-down-3'], CAPTAIN_DOWN_0);
export const CAPTAIN_UP: Art[] = rdList(['captain-up-1', 'captain-up-2', 'captain-up-3'], CAPTAIN_UP_0);
export const CAPTAIN_SIDE: Art[] = rdList(['captain-side-1', 'captain-side-2'], CAPTAIN_SIDE_0);
export const CUTLASS = rd('cutlass-swing', CUTLASS_0);
export const PISTOL_FLASH = rd('muzzle-flash', PISTOL_FLASH_0);
export const CRAB: Art[] = rdList(['crab-1', 'crab-2'], CRAB_0);
export const SKELETON: Art[] = rdList(['skeleton-1', 'skeleton-2'], SKELETON_0);
export const WRAITH: Art[] = rdList(['wraith-1', 'wraith-2'], WRAITH_0);
export const GULL: Art[] = rdList(['gull-1', 'gull-2'], GULL_0);
export const WHALE = rd('whale', WHALE_0);
export const SERPENT_HEAD = rd('serpent-head', SERPENT_HEAD_0);
export const SERPENT_SEG: Art[] = rdList(['serpent-body-1', 'serpent-body-2', 'serpent-body-3'], SERPENT_SEG_0);
export const SERPENT_TAIL = rd('serpent-tail', SERPENT_TAIL_0);
