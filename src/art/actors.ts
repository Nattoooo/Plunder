import { art, Art } from './palette';

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

export const CAPTAIN_DOWN: Art[] = [art([...CAP_TOP, ...DOWN_BODY, ...LEGS_STAND]), art([...CAP_TOP, ...DOWN_BODY, ...LEGS_A]), art([...CAP_TOP, ...DOWN_BODY, ...LEGS_B])];
export const CAPTAIN_UP: Art[] = [art([...CAP_TOP, ...UP_BODY, ...LEGS_STAND]), art([...CAP_TOP, ...UP_BODY, ...LEGS_A]), art([...CAP_TOP, ...UP_BODY, ...LEGS_B])];
export const CAPTAIN_SIDE: Art[] = [art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_STAND]), art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_A]), art([...SIDE_TOP, ...SIDE_BODY, ...SIDE_LEGS_STAND])];

export const CUTLASS = art(['.......kk', '......kNk', '.....kNk.', '....kNk..', '.k.kNk...', '..kNk....', '.kyk.....', 'kJk......', 'kk.......']);
export const PISTOL_FLASH = art(['..Y..', '.YQY.', 'YQPQY', '.YQY.', '..Y..']);

export const CRAB: Art[] = [
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

export const SKELETON: Art[] = [
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

export const WRAITH: Art[] = [
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

export const GULL: Art[] = [
  art(['kk.....kk', 'kpk...kpk', '.kpkkkpk.', '..kpYpk..', '...kpk...', '....k....']),
  art(['.........', 'kkk...kkk', 'kppkkkppk', '.kkpYpkk.', '...kpk...', '....k....'])
];
export const GULL_SHADOW = art([',,,,,', '.,,,.']);

export const WHALE = art([
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

export const SERPENT_HEAD = art([
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

export const SERPENT_SEG: Art[] = [
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

export const SERPENT_TAIL = art(['kkk.......', 'kGGkk.....', '.kGRGkkkk.', '..kRrRRGGk', '.kGRGkkkk.', 'kGGkk.....', 'kkk.......']);

export const SUBMERGED = { G: 0x183c44, g: 0x12303a, h: 0x1e4a52, R: 0x1e3e46, r: 0x16323a, Y: 0x2a5a62, x: 0x1e4a52 };

export const FOOT_SHADOW = art(['..,,,,,,..', ',,,,,,,,,,', '..,,,,,,..']);
