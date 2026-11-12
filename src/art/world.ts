import { art, Art, Swap } from './palette';

export const PALM = art([
  '....kk....kk...',
  '...khhk..khhk..',
  '..khHhhkkhHhhk.',
  '.khhhhhhhhhhhhk',
  'khHhkhhOOhhkhhk',
  'khhk.khOOOhk.kk',
  '.kk..khJJhk....',
  '......kJJk.....',
  '......kJjk.....',
  '.......kJJk....',
  '.......kJjk....',
  '.......kJJk....',
  '........kJJk...',
  '........kJjk...',
  '........kJJk...',
  '......,,kJJk,..',
  '.....,,,kkkk,,.',
  '......,,,,,,,..'
]);

export const TREE = art([
  '.....kkkkkk.....',
  '...kkhHHhhhkk...',
  '..khHHhhhhhhhk..',
  '.khHhhhhhhhGhhk.',
  '.khhhhhhhGhhhGk.',
  'khHhhhhhhhhhhhGk',
  'khhhhGhhhhhhhGGk',
  'kGhhhhhhhhhGhGGk',
  '.kGhhhhhGhhhGGk.',
  '.kGGhhhhhhGGGk..',
  '..kkGGGGGGGkk...',
  '.....kkJJkk.....',
  '......kJJk......',
  '......kJjk......',
  '....,,kJJk,,....',
  '...,,,,kk,,,,...',
  '.....,,,,,,.....'
]);

export const JUNGLE_TREE = art([
  '...kkk...kkkk...',
  '..kHhhkkkhhHhk..',
  '.khhhhGhhhhhhhk.',
  'khHhhhhhhGhHhhhk',
  'khhhGhhHhhhhhGhk',
  'kGhhhhhhhhGhhhGk',
  '.kGhHhhGhhhhhGk.',
  'khhhhhhhhhhhGGGk',
  'kGGhhGhhhhGGGgk.',
  '.kgGGGGGGGGggk..',
  '..kkgggkJkggkk..',
  '......kJJk......',
  '.....kJJjk......',
  '....,kJJJk,,....',
  '...,,,kkkk,,,...',
  '.....,,,,,,.....'
]);

export const PINE = art([
  '.....k.....',
  '....kGk....',
  '....kHk....',
  '...kGhGk...',
  '...kGGgk...',
  '..kGhGGGk..',
  '..kkGGgkk..',
  '..kGhGGGk..',
  '.kGhGGGGgk.',
  '.kkGGGGgkk.',
  '.kGhGGGGGk.',
  'kGhGGGGGGgk',
  'kkkGGGGgkkk',
  '...kkJkk...',
  '....kJk....',
  '..,,kjk,,..',
  '.,,,,k,,,,.',
  '...,,,,,...'
]);

export const SNOW_PINE = art([
  '.....k.....',
  '....kpk....',
  '....kPk....',
  '...kpGpk...',
  '...kGGgk...',
  '..kpPpGpk..',
  '..kkGGgkk..',
  '..kpPGpGk..',
  '.kGpGGpGgk.',
  '.kkGGGGgkk.',
  '.kpPpGpGpk.',
  'kGpGGpGGpgk',
  'kkkGGGGgkkk',
  '...kkJkk...',
  '....kJk....',
  '..,,kjk,,..',
  '.,,,,k,,,,.',
  '...,,,,,...'
]);

export const DEAD_TREE = art([
  'k....k...k.',
  'Jk..kJ..kJ.',
  '.Jk.kJ.kJ..',
  '..JkJJkJ...',
  '...kJJJk...',
  '....JJk....',
  '....kJJ..k.',
  '....kJJkJk.',
  '....kJJJk..',
  '....kJJk...',
  '....kJJk...',
  '....kJjk...',
  '..,,kJJk,..',
  '.,,,kkkk,,.',
  '...,,,,,...'
]);

export const BUSH = art(['...kkkkk...', '.kkhHhhhkk.', 'khHhhhhhhGk', 'khhhhhGhhGk', 'kGhhhhhhGGk', '.kkGGGGGkk.', '..,,,,,,,..']);
export const BERRY_BUSH = art(['...kkkkk...', '.kkhHhehkk.', 'khHehhhhhGk', 'khhhhehhhGk', 'kGhehhhhGGk', '.kkGGGGGkk.', '..,,,,,,,..']);
export const TUFT = art(['.h..h.', 'hGhhGh', 'GgGGgG', '.,,,,.']);
export const FLOWERS = art(['.e...y.', 'eYe.yOy', '.e.h.y.', '.h.h.h.', '..,,,..']);
export const ROCK = art(['..kkkk..', '.kuUuTk.', 'kuUuTTtk', 'kTTTTttk', '.kkkkkk.', '.,,,,,,.']);
export const BOULDER = art([
  '....kkkkk....',
  '..kkuUUuTkk..',
  '.kuUUuuTTTtk.',
  'kuUuuTTTTTttk',
  'kTuTTTTTtTttk',
  'kTTTTTTtttttk',
  '.kkTTtttttkk.',
  '...kkkkkkk...',
  '..,,,,,,,,,..'
]);
export const REEDS = art(['..J...J..', '.kJk.kJk.', '..h..Jh..', '..h.h.h..', '.hh.h.hh.', '.h.hhh.h.', 'h.hGhGh.h', 'GhGgGgGhG', '.,,,,,,,.']);
export const MUSHROOMS = art(['.kkk....', 'kReRk.kk', 'kkkkkkek', '.kpk.kkk', '.kpk..p.', '.,,,,,,.']);
export const SHELL = art(['.kkk.', 'kEpEk', 'kpEpk', '.kkk.']);
export const SKULL_ROCK = art([
  '....kkkkkkk....',
  '..kkuUUUUuukk..',
  '.kuUUuuuuuuTTk.',
  'kuUuuuuuuuuTTtk',
  'kuukkkuuukkkTtk',
  'kuukKkuuukKkTtk',
  'kuuukuuuuuktTtk',
  'kTuuuuukuuuTttk',
  '.kTTukkkkkTttk.',
  '.kTtkTkTkTktk..',
  '..kkkkkkkkkk...',
  '.,,,,,,,,,,,,..'
]);
export const ICE_SHARD = art(['...kk...', '..kPpk..', '.kPLlpk.', 'kPLllLlk', 'klLlllbk', '.kkkkkk.', '.,,,,,,.']);

export const HOUSES: Art[] = [
  art([
    '..kkkkkkkkkk..',
    '.keeeeeeeeeek.',
    'kRRRrRRRrRRRrk',
    'krrrrrrrrrrrrk',
    'kRrRRRrRRRrRRk',
    'krrrrrrrrrrrrk',
    'kRRRrRRRrRRRrk',
    'kkkkkkkkkkkkkk',
    '.kCCCCCCCCCCk.',
    '.kCkykCCkykCk.',
    '.kCCCCwwCCCCk.',
    '.kccccwwcccck.',
    '.kkkkkkkkkkkk.',
    '..,,,,,,,,,,,,'
  ]),
  art([
    '...kkkkkk...',
    '..keeeeeek..',
    '.kRRRRRRRRk.',
    'krrrrrrrrrrk',
    'kRrRRRrRRRrk',
    'krrrrrrrrrrk',
    'kkkkkkkkkkkk',
    '.kCCCCCCCCk.',
    '.kCkykwwCCk.',
    '.kccccwwcck.',
    '.kkkkkkkkkk.',
    '..,,,,,,,,,,'
  ]),
  art([
    '..kkkkkkkkkkkkkk..',
    '.keeeeeeeeeeeeeek.',
    'kRRRrRRRrRRRrRRRrk',
    'krrrrrrrrrrrrrrrrk',
    'kRrRRRrRRRrRRRrRRk',
    'krrrrrrrrrrrrrrrrk',
    'kRRRrRRRrRRRrRRRrk',
    'kkkkkkkkkkkkkkkkkk',
    '.kCCCCCCCCCCCCCCk.',
    '.kCkykCCwwCCkykCk.',
    '.kCCCCCCwwCCCCCCk.',
    '.kccccccwwcccccck.',
    '.kkkkkkkkkkkkkkkk.',
    '..,,,,,,,,,,,,,,,,'
  ]),
  art([
    '........kkk.',
    '...kkkkkTuTk',
    '..keeeeekTk.',
    '.kRRRRRRRRk.',
    'krrrrrrrrrrk',
    'kRrRRRrRRRrk',
    'krrrrrrrrrrk',
    'kRRRrRRRrRRk',
    'kkkkkkkkkkkk',
    '.kCCCCCCCCk.',
    '.kCkykCkykk.',
    '.kCCCCCCCCk.',
    '.kCCCwwCCCk.',
    '.kccckwccck.',
    '.kkkkkkkkkk.',
    '..,,,,,,,,,,'
  ])
];

export const ROOFS: Swap[] = [
  { R: 0xa83a32, r: 0x7a2420, e: 0xd0644e },
  { R: 0x3d5a8a, r: 0x2a3e64, e: 0x5a7eb0 },
  { R: 0x8f5b3a, r: 0x6a4026, e: 0xb07a50 },
  { R: 0x5f8a4a, r: 0x426634, e: 0x7cac60 },
  { R: 0x4a3a32, r: 0x322620, e: 0x6a564a },
  { R: 0xc2903a, r: 0x9a6c26, e: 0xe0b45a }
];

export const FORT = art([
  '.kkkkkk................kkkkkk.',
  'kuUUUUuk..............kuUUUUuk',
  'kUTTTTUkkkkkkkkkkkkkkkkUTTTTUk',
  'kUTmmTUuUuUuUuUuUuUuUuuUTmmTUk',
  'kUTmmTUTTTTTTTTTTTTTTTTUTmmTUk',
  'kuUUUUukkkkkkkkkkkkkkkkuUUUUuk',
  '.kuTTuk.ffffffffffffff.kuTTuk.',
  '.kuTtuk.ffffffffffffff.kuTtuk.',
  '.kuTTuk.fffffkkfffffff.kuTTuk.',
  '.kuTtuk.ffffkBBBkfffff.kuTtuk.',
  '.kuTTuk.ffffkBBBBkffff.kuTTuk.',
  '.kuTtuk.ffffkBBkkfffff.kuTtuk.',
  '.kuTTuk.ffffkJkffffff..kuTTuk.',
  '.kuTtuk.ffffkJkfffffff.kuTtuk.',
  '.kuTTuk.ffffkJkfffffff.kuTTuk.',
  '.kuTtuk.fffkJJJkffffff.kuTtuk.',
  '.kuTTuk.ffffffffffffff.kuTTuk.',
  '.kuTtuk.ffffffffffffff.kuTtuk.',
  '.kuUUuk.ffffffffffffff.kuUUuk.',
  'kuUUUUukkkkkkk..kkkkkkkuUUUUuk',
  'kUTTTTUuUuUuUk..kUuUuUuUTTTTUk',
  'kUTmmTUTTTTTTkwwkTTTTTTUTmmTUk',
  'kUTmmTUtttttTkwwkTttttTUTmmTUk',
  'kuUUUUukkkkkkkwwkkkkkkkuUUUUuk',
  '.kkkkkk......kkkk......kkkkkk.',
  '..,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
]);

export const FORT_FLAG: Swap[] = [{ B: 0x2a4a9a }, { B: 0x3a8a4a }, { B: 0x1a1a1a }];
