import { art, Art, Swap } from './palette';

export const HULL_SWAP: Record<number, Swap> = {
  1: { v: 0x9a6a3a, V: 0xc08850, W: 0x6a4424, w: 0x4a2e16, D: 0x8a6a3a, d: 0x5a4224, f: 0xc8a46a, F: 0xe8cc90 },
  2: { v: 0xb8884e, V: 0xd8aa6c, W: 0x7e5532, w: 0x5a3a20, D: 0xa27444 },
  3: { v: 0x7e5230, V: 0x9e6c40, W: 0x4e301c, w: 0x34200f, D: 0x6a4428 },
  4: { v: 0x74503a, V: 0x8e6848, W: 0x46301e, w: 0x2e1e12, D: 0x624430 }
};

export const RAIL_CAP: Record<number, string> = { 1: 'W', 2: 'V', 3: 'V', 4: 'n' };

export const DECK_PLANK = art([
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

export const DECK_LOG = art([
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

export const IRON_BANDS = art([
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

export const DMG_CRACK = art([
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

export const DMG_HOLE = art([
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

export const BOWS: Art[] = [
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

export const STERN_LANTERN = art(['.kkk.', 'kyYyk', 'kOyOk', '.kok.', '..k..']);

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

export const OAR = art(['.........kkk.', 'WVVVVVVVkVvVk', '.........kkk.']);

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

export const CREW = art(['..kk..', '.kjjk.', 'kRjjRk', 'kRRRrk', 'sRRRrs', '.k..k.']);
export const CAPTAIN = art(['.kkkk.', 'kkyykk', 'kRkkRk', 'kRRRrk', 'sRyyrs', '.k..k.']);

export const FLAG = [
  art(['kkkkk...', 'kRRRRkk.', 'kRRRRRRk', 'kkkkkkk.']),
  art(['kkkkkkk.', 'kRRRRRRk', 'kRRRRkk.', 'kkkkk...'])
];
export const JOLLY = [
  art(['kkkkk...', 'kKKKKkk.', 'kKKKKKKk', 'kkkkkkk.']),
  art(['kkkkkkk.', 'kKKKKKKk', 'kKKKKkk.', 'kkkkk...'])
];

export const FIRE = [
  art(['..Q...', '.QYQ..', '.QYYQ.', 'QYyYQq', 'QyyyqQ', '.qqqq.']),
  art(['...Q..', '..QYQ.', '.QYYQ.', 'qQYyYQ', 'QqyyyQ', '.qqqq.'])
];
