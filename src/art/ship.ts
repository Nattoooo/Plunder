import { art, Art, Swap } from './palette';
import { rd, rdList } from './redraw';

export const HULL_SWAP: Record<number, Swap> = {
  1: { v: 0x9a6a3a, V: 0xc08850, W: 0x6a4424, w: 0x4a2e16, D: 0x8a6a3a, d: 0x5a4224, f: 0xc8a46a, F: 0xe8cc90 },
  2: { v: 0xb8884e, V: 0xd8aa6c, W: 0x7e5532, w: 0x5a3a20, D: 0xa27444 },
  3: { v: 0x7e5230, V: 0x9e6c40, W: 0x4e301c, w: 0x34200f, D: 0x6a4428 },
  4: { v: 0x74503a, V: 0x8e6848, W: 0x46301e, w: 0x2e1e12, D: 0x624430 }
};

export const RAIL_CAP: Record<number, string> = { 1: 'W', 2: 'V', 3: 'V', 4: 'n' };

const DECK_PLANK_0 = art([
  'VvvvWVvvvW',
  'VvvvWwWWwW',
  'VvvvWVvvvW',
  'VvvvWVvvvW',
  'VvvvWVvvvW',
  'VvvvWVvvvW',
  'wWWwWVvvvW',
  'VvvvWVvvvW',
  'VvvvWVvvvW',
  'VvvvWVvvvW'
]);

const DECK_LOG_0 = art([
  'WvVvwWvVvw',
  'WvVvwWvVvw',
  'DFfFdDFfFd',
  'WvVvwWvVvw',
  'WvVvwWvVvw',
  'WvVvwWvVvw',
  'WvVvwWvVvw',
  'DFfFdDFfFd',
  'WvVvwWvVvw',
  'WvVvwWvVvw'
]);

const IRON_BANDS_0 = art([
  '..........',
  '..........',
  'MNMMMMMMNM',
  'mmmmmmmmmm',
  '..........',
  '..........',
  '..........',
  'MNMMMMMMNM',
  'mmmmmmmmmm',
  '..........'
]);

const DMG_CRACK_0 = art([
  '..........',
  '...k......',
  '....k..W..',
  '..WkkW.k..',
  '....Wkk...',
  '......kW..',
  '.W.....k..',
  '.......W..',
  '..........',
  '..........'
]);

const DMG_HOLE_0 = art([
  '..........',
  '...kkkk...',
  '..kaaaVk..',
  '.kVaAAak..',
  '.kaAAaaVk.',
  '.kaaAAak..',
  '..kVaaak..',
  '...kkVk...',
  '..........',
  '..........'
]);

const BOWS_0: Art[] = [
  art(['....kk....', '...kVVk...', '..kVvvVk..', '.kVvWWvVk.', 'kVvvWWvvVk']),
  art([
    '.........kk.........',
    '........kVVk........',
    '......kkVvvVkk......',
    '....kkVvvWWvvVkk....',
    '..kkVvvvvWWvvvvVkk..',
    'kVvvvvvvvWWvvvvvvvVk'
  ]),
  art([
    '..............kk..............',
    '.............kVVk.............',
    '...........kkVvvVkk...........',
    '.........kkVvvWWvvVkk.........',
    '.......kkVvvvvWWvvvvVkk.......',
    '.....kkVvvvvvvWWvvvvvvVkk.....',
    '...kkVvvvvvvvvWWvvvvvvvvVkk...',
    '.kkVvvvvvvvvvvWWvvvvvvvvvvVkk.',
    'kVvvvvvvvvvvvvWWvvvvvvvvvvvvVk'
  ])
];

const STERN_LANTERN_0 = art(['.kkk.', 'kyYyk', 'kOyOk', '.kok.', '..k..']);

export interface PartArt {
  art: Art;
  ay: number;
  top?: boolean;
}

export const PARTS: Record<string, PartArt> = {
  light_cannon: {
    ay: 4,
    art: art([
      '...kkkk...',
      '...kNMk...',
      '...kNMk...',
      '...kNMk...',
      '..kkNMkk..',
      '..kNNMmk..',
      '..kNMMmk..',
      'kkkMMmmkkk',
      'kvVkmmkWvk',
      'kWvkkkkvWk',
      'kvVVVVVVvk',
      'kWvvvvvvWk',
      'kkkkkkkkkk',
      '..........'
    ])
  },
  long_gun: {
    ay: 6,
    art: art([
      '...kkkk...',
      '...kNMk...',
      '...kNMk...',
      '...kNMk...',
      '...kNMk...',
      '...kNMk...',
      '..kkNMkk..',
      '..kNNMmk..',
      '..kNMMmk..',
      'kkkMMmmkkk',
      'kvVkmmkWvk',
      'kWvkkkkvWk',
      'kvVVVVVVvk',
      'kWvvvvvvWk',
      'kkkkkkkkkk',
      '..........'
    ])
  },
  carronade: {
    ay: 3,
    art: art([
      '..kkkkkk..',
      '..kNNMmk..',
      '..kNMMmk..',
      '.kkNMMmkk.',
      '.kNNMMmmk.',
      '.kNMMMmmk.',
      '.kMMMmmmk.',
      'kkkMmmmkkk',
      'kvVkkkkWvk',
      'kvVVVVVVvk',
      'kWvvvvvvWk',
      'kkkkkkkkkk',
      '..........'
    ])
  },
  swivel_gun: {
    ay: 3,
    art: art([
      '....kk....',
      '...kNMk...',
      '...kNMk...',
      '...kNMk...',
      '..kkMmkk..',
      '..kWkkWk..',
      '...kWWk...',
      '....kk....',
      '...kVvk...',
      '...kvWk...',
      '....kk....',
      '..........',
      '..........'
    ])
  },
  mortar: {
    ay: 0,
    art: art([
      '..kkkkkk..',
      '.kNNMMMmk.',
      'kNMkkkkMmk',
      'kNkkKKkkmk',
      'kMkKkkKkmk',
      'kMkKkkKkmk',
      'kMkkKKkkmk',
      'kmMkkkkmmk',
      '.kmmmmmmk.',
      '..kkkkkk..'
    ])
  },
  helm: {
    ay: 0,
    art: art([
      '....vv....',
      '..kkWWkk..',
      '.kW.kk.Wk.',
      '.W.vkkv.W.',
      'vWkkOOkkWv',
      'vWkkOOkkWv',
      '.W.vkkv.W.',
      '.kW.kk.Wk.',
      '..kkWWkk..',
      '....vv....'
    ])
  },
  rudder: {
    ay: 0,
    art: art([
      '..........',
      '..........',
      '....kk....',
      '...kvVk...',
      '....kVk...',
      '....kVk...',
      '....kWk...',
      '...kWWWk..',
      '...kwWwk..',
      '...kwWwk..',
      '...kWvWk..',
      '...kWvWk..',
      '...kWvWk..',
      '....kkk...'
    ])
  },
  mast: {
    ay: 0,
    art: art([
      '..........',
      'K........K',
      '.K......K.',
      '..KkkkkK..',
      '...kVJk...',
      '...kJjk...',
      '..KkkkkK..',
      '.K......K.',
      'K........K',
      '..........'
    ])
  },
  oar_bench: {
    ay: 0,
    art: art([
      '..........',
      '..........',
      '..........',
      'kkkkkkkkkk',
      'MVVVVVVVVM',
      'kvvvvvvvvk',
      'kWWWWWWWWk',
      'kkkkkkkkkk',
      '..........',
      '..........'
    ])
  },
  crew_quarters: {
    ay: 0,
    art: art([
      '..........',
      '.kkkkkkkk.',
      '.kWWWWWWk.',
      '.kWkKKkWk.',
      '.kWkvvkWk.',
      '.kWkKKkWk.',
      '.kWkvvkWk.',
      '.kWWWWWWk.',
      '.kkkkkkkk.',
      '..........'
    ])
  },
  cargo_hold: {
    ay: 0,
    art: art([
      '..........',
      '.kkkkkkkk.',
      '.kVVVVVVk.',
      '.kMMMMMMk.',
      '.kvvvvvvk.',
      '.kVVVVVVk.',
      '.kMMMMMMk.',
      '.kvvvvvvk.',
      '.kkkkkkkk.',
      '..........'
    ])
  },
  galley: {
    ay: 0,
    art: art([
      '......kk..',
      '.....kTTk.',
      '.kkkkkTTk.',
      'kMMMMkmmk.',
      'kMkkkMmmk.',
      'kMkQqkMmk.',
      'kMkqQkMmk.',
      'kMMMMMMmk.',
      'kmmmmmmmk.',
      '.kkkkkkk..'
    ])
  },
  powder_magazine: {
    ay: 0,
    art: art([
      '.kkkk.kkkk',
      'kVvvWkVvvW',
      'kvjjwkvjjw',
      'kvjjwkvjjw',
      '.kWWk.kWWk',
      '.kkkk.kkkk',
      'kVvvWkVvvW',
      'kvjjwkvjjw',
      'kvjjwkvjjw',
      '.kWWk.kWWk'
    ])
  },
  workshop: {
    ay: 0,
    art: art([
      '..........',
      '.kkkk.....',
      '.kNMkkkkk.',
      '.kMmkWWWk.',
      '.kkkkkkkk.',
      'kkkkkkkkkk',
      'kVVVVVVVVk',
      'kvvvvvvvvk',
      'kWk....kWk',
      'kkk....kkk'
    ])
  },
  sick_bay: {
    ay: 0,
    art: art([
      '.kkkkkkkk.',
      '.kpppppPk.',
      '.kkkkkkkk.',
      '.kCCRRCCk.',
      '.kCRRRRCk.',
      '.kCCRRCCk.',
      '.kCCCCCck.',
      '.kcccccck.',
      '.kkkkkkkk.',
      '..k....k..'
    ])
  },
  crows_nest: {
    ay: 1,
    top: true,
    art: art([
      '...kkkkkk...',
      '..kWVVVVWk..',
      '.kWvvvvvvWk.',
      'kWvvWWWWvvWk',
      'kVvWkkkkWvVk',
      'kVvWkJJkWvVk',
      'kVvWkJJkWvVk',
      'kVvWkkkkWvVk',
      'kWvvWWWWvvWk',
      '.kWvvvvvvWk.',
      '..kWwwwwWk..',
      '...kkkkkk...'
    ])
  },
  ram: {
    ay: 6,
    art: art([
      '....kk....',
      '...kNMk...',
      '...kNMk...',
      '..kNNMmk..',
      '..kNMMmk..',
      '.kNNMMmmk.',
      '.kNMMMMmk.',
      'kMMMMMMMmk',
      'kmmmmmmmmk',
      '.kkkkkkkk.',
      '..........',
      '..........',
      '..........',
      '..........',
      '..........',
      '..........'
    ])
  },
  figurehead: {
    ay: 6,
    art: art([
      '...kkk....',
      '..kyYyk...',
      '..kOyOk...',
      '...kyk....',
      '..kyYyk...',
      '..kOyOk...',
      '...kOk....',
      '...kWk....',
      '...kWk....',
      '....k.....',
      '..........',
      '..........',
      '..........',
      '..........',
      '..........',
      '..........'
    ])
  }
};

const OAR_0 = art(['.........kkk.', 'WVVVVVVVkVvVk', '.........kkk.']);

export interface SailSet {
  furled: Art;
  half: Art;
  full: Art;
  ax: number;
  ay?: number;
}

const SQ_YARD = 'kWWWWWWWWWWWVVWWWWWWWWWWWk';

export const SAILS: Record<string, SailSet> = {
  square: {
    ax: 13,
    full: art([
      '........kkkkkkkkkk........',
      '......kkppppppCCCCkk......',
      '....kkppppppCCCCCCcckk....',
      '..kkppppppCCCCCCCCccccck..',
      '.kpppppppCCCCCCCCCcccccck.',
      '.kppppppCCCCCCCCCCcccccck.',
      '.kpppppCCCCCCCCCCccccccck.',
      '.kppppCCCCCCCCCCcccccccck.',
      '.kppCCCCCCCCCCCccccccccck.',
      SQ_YARD
    ]),
    half: art([
      '....kkkkkkkkkkkkkkkkkk....',
      '..kkpppppppCCCCCCCccccck..',
      '.kpppppCCCCCCCCCCcccccck..',
      '.kppppCCCCCCCCCCcccccccck.',
      '.kppCCCCCCCCCCCccccccccck.',
      SQ_YARD
    ]),
    furled: art(['.kkkkkkkkkkkkkkkkkkkkkkkk.', 'kppppCCCCCCCCCCCCCCccccck', SQ_YARD].map((r) => r.padEnd(26, 'k').slice(0, 26)))
  },
  patch: {
    ax: 9,
    full: art([
      '.....kkkkkkkk.....',
      '...kkppCCCCCcckk..',
      '..kppppCCCCCccck..',
      '.kpppCCCCCCCcccck.',
      '.kppCCCCCCCCcccck.',
      '.kppCCCCCCCCcccck.',
      '.kpCCCCCCCCccccck.',
      '.kpCCCCCCCCccccck.',
      'kWWWWWWWVVWWWWWWWk'
    ]),
    half: art(['...kkkkkkkkkkkk...', '..kppCCCCCCcccck..', '.kpCCCCCCCCccccck.', '.kpCCCCCCCccccck..', 'kWWWWWWWVVWWWWWWWk']),
    furled: art(['.kkkkkkkkkkkkkkkk.', 'kppCCCCCCCCCCcccck', 'kWWWWWWWVVWWWWWWWk'])
  },
  lateen: {
    ax: 1,
    ay: 17,
    full: art([
      '.k.......',
      'kWk......',
      'kWpk.....',
      'kWpCk....',
      'kWppCk...',
      'kWppCCk..',
      'kWpppCck.',
      'kWpppCcck',
      'kWppCCcck',
      'kWppCCcck',
      'kWpCCCcck',
      'kWpCCCcck',
      'kWpCCccck',
      'kWpCCccck',
      'kWCCCccck',
      'kWCCcccck',
      'kWCCccck.',
      'kWCcccck.',
      'kWCccck..',
      'kWCcck...',
      'kWcck....',
      'kWck.....',
      'kWk......',
      'kW.......',
      'kW.......',
      '.k.......'
    ]),
    half: art([
      '.k....',
      'kWk...',
      'kWpk..',
      'kWpCk.',
      'kWpCck',
      'kWpCck',
      'kWpCck',
      'kWpCck',
      'kWCCck',
      'kWCCck',
      'kWCCck',
      'kWCcck',
      'kWCcck',
      'kWCcck',
      'kWCcck',
      'kWCck.',
      'kWCck.',
      'kWck..',
      'kWck..',
      'kWk...',
      'kW....',
      'kW....',
      'kW....',
      'kW....',
      'kW....',
      '.k....'
    ]),
    furled: art([
      '.k..',
      'kWk.',
      'kWpk',
      'kWpk',
      'kWpk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWCk',
      'kWck',
      'kWck',
      'kWck',
      'kWck',
      'kWck',
      'kWck',
      'kWck',
      'kWk.',
      'kW..',
      'kW..',
      'kW..',
      '.k..'
    ])
  },
  main: {
    ax: 17,
    full: art([
      '............kkkkkkkkkk............',
      '..........kkppppppCCCckk..........',
      '........kkpppppppCCCCccckk........',
      '.......kppppppppCCCCCccccck.......',
      '.......kppppppCCCCCCcccccck.......',
      '.......kppppCCCCCCCccccccck.......',
      '.......kppCCCCCCCCcccccccck.......',
      '......kWWWWWWWWWVVWWWWWWWWWk......',
      '.....kkpppppppppppCCCCCCccckk.....',
      '...kkppppppppppppCCCCCCCCcccckk...',
      '.kpppppppppppppCCCCCCCCCCCcccccck.',
      '.kppppppppppCCCCCCCCCCCCcccccccck.',
      '.kppppppppCCCCCCCCCCCCCccccccccck.',
      '.kppppppCCCCCCCCCCCCCCcccccccccck.',
      '.kppppCCCCCCCCCCCCCCcccccccccccck.',
      '.kppCCCCCCCCCCCCCcccccccccccccccck',
      'kWWWWWWWWWWWWWWWVVWWWWWWWWWWWWWWWk'
    ]),
    half: art([
      '......kkkkkkkkkkkkkkkkkkkkkk......',
      '......kppppCCCCCCCCCCcccccck......',
      '......kWWWWWWWWWVVWWWWWWWWWk......',
      '..kkppppppppppppCCCCCCCCcccccckk..',
      '.kppppppppppppCCCCCCCCCCcccccccck.',
      '.kppppppppCCCCCCCCCCCCcccccccccck.',
      '.kppppCCCCCCCCCCCCCCcccccccccccck.',
      '.kppCCCCCCCCCCCCCcccccccccccccccck',
      'kWWWWWWWWWWWWWWWVVWWWWWWWWWWWWWWWk'
    ]),
    furled: art([
      '......kkkkkkkkkkkkkkkkkkkkkk......',
      '......kppppCCCCCCCCCCcccccck......',
      '.kkkkkkWWWWWWWWWVVWWWWWWWWWkkkkkk.',
      'kppppppppCCCCCCCCCCCCCCCcccccccck.',
      'kWWWWWWWWWWWWWWWVVWWWWWWWWWWWWWWWk'
    ])
  }
};

const CREW_0 = art(['..kk..', '.kjjk.', 'kRjjRk', 'kRRRrk', 'sRRRrs', '.k..k.']);
const CAPTAIN_0 = art(['.kkkk.', 'kkyykk', 'kRkkRk', 'kRRRrk', 'sRyyrs', '.k..k.']);

const FLAG_0 = [
  art(['kkkkk...', 'kRRRRkk.', 'kRRRRRRk', 'kkkkkkk.']),
  art(['kkkkkkk.', 'kRRRRRRk', 'kRRRRkk.', 'kkkkk...'])
];
const JOLLY_0 = [
  art(['kkkkk...', 'kKKKKkk.', 'kKKKKKKk', 'kkkkkkk.']),
  art(['kkkkkkk.', 'kKKKKKKk', 'kKKKKkk.', 'kkkkk...'])
];

const FIRE_0 = [
  art(['..Q...', '.QYQ..', '.QYYQ.', 'QYyYQq', 'QyyyqQ', '.qqqq.']),
  art(['...Q..', '..QYQ.', '.QYYQ.', 'qQYyYQ', 'QqyyyQ', '.qqqq.'])
];

export const DECK_PLANK = rd('deck-planks', DECK_PLANK_0);
export const DECK_LOG = rd('deck-logs', DECK_LOG_0);
export const IRON_BANDS = rd('iron-bands', IRON_BANDS_0);
export const DMG_CRACK = rd('damage-crack', DMG_CRACK_0);
export const DMG_HOLE = rd('damage-hole', DMG_HOLE_0);
export const BOWS: Art[] = rdList(['bow-small', 'bow-medium', 'bow-large'], BOWS_0);
export const STERN_LANTERN = rd('stern-lantern', STERN_LANTERN_0);
export const OAR = rd('oar', OAR_0);
export const CREW = rd('crew', CREW_0);
export const CAPTAIN = rd('captain-deck', CAPTAIN_0);
export const FLAG = rdList(['flag-1', 'flag-2'], FLAG_0);
export const JOLLY = rdList(['pirate-flag-1', 'pirate-flag-2'], JOLLY_0);
export const FIRE = rdList(['fire-1', 'fire-2'], FIRE_0);

for (const k in PARTS) {
  const p = PARTS[k];
  const a = rd(k.replace(/_/g, '-'), p.art);
  if (a !== p.art) PARTS[k] = { ...p, art: a, ay: k === 'rudder' ? 0 : Math.max(0, a.h - 10) };
}

const SAIL_NAMES: Record<string, string> = { square: 'sail-square', patch: 'sail-patched', lateen: 'sail-lateen', main: 'sail-main' };
for (const k in SAILS) {
  const set = SAILS[k];
  const n = SAIL_NAMES[k];
  const full = rd(n + '-full', set.full);
  if (full === set.full) continue;
  SAILS[k] = { ...set, full, half: rd(n + '-half', set.half), furled: rd(n + '-furled', set.furled), ax: k === 'lateen' ? 1 : Math.floor(full.w / 2) };
}
