import { art, Art } from './palette';

const SCALE = 2;

const ROWS: Record<string, string[]> = {
  'berry-bush': ['.kkk..kkk.', 'kHHhkkhhhk', 'kHhhhhRRhk', 'khhRRhhhGk', 'khhhhGGGGk', '.kkkkkkkk.'],
  'boulder': ['....kkkk....', '..kkUuuukk..', '.kUUuuuuTTk.', 'kUUuuuuTTTTk', 'kuuuuuTTTTTk', 'kuuuuTTTTTTk', 'kuuTTTTTTTTk', '.kkkkkkkkkk.'],
  'bow-large': ['......kkk......', '....kkVvwkk....', '..kkVvvvvwwkk..', '.kVvvvvvvvwwwk.', 'kVvvvvvvvvvwwwk'],
  'bow-medium': ['....kk....', '..kkVwkk..', 'kkVvvvwwkk'],
  'bow-small': ['..k..', '.kVk.', 'kVvwk'],
  'bush': ['.kkk..kkk.', 'kHHhkkhhhk', 'kHhhhhhhhk', 'khhhhhhhGk', 'khhhhGGGGk', '.kkkkkkkk.'],
  'claim-stone': ['....kkkkk', '...kwPPPk', '...kwPPpk', '...kwkkkk', '..kkwkk..', '.kUuuuTk.', '.kUuKuTk.', 'kUuKKKuTk', 'kUuuKuuTk', 'kkkkkkkkk'],
  'claim-stone-owned': ['....kkkkk', '...kwMKKk', '...kwMKKk', '...kwkkkk', '..kkwkk..', '.kUuuuTk.', '.kUuKuTk.', 'kUuKKKuTk', 'kUuuKuuTk', 'kkkkkkkkk'],
  'cutlass-swing': ['....N', '...Nn', '..Nn.', '.Nn..', 'Nn...'],
  'damage-crack': ['wV...', '.ww..', '..wV.', '...ww', '....w'],
  'damage-hole': ['.www.', 'waaaw', 'waaaw', 'waaaw', '.www.'],
  'dead-tree': ['...k.....k...', '.kkvk...kdkk.', 'kvkvk...kdkdk', 'kvkvk...kddk.', '.kvvk..kddk..', '..kvvkkkdk...', '...kvvWddk...', '...kvWdkk....', '....kvWdk....', '....kvvdk....', '...kvvWdk....', '..kvvWddk....', '...kkkkk.....'],
  'deck-logs': ['WVvWW', 'WVvWW', 'DfffD', 'WVvWW', 'WVvWW'],
  'deck-planks': ['vvvvW', 'vvvvW', 'vvvvW', 'vvvvW', 'vvvvW'],
  'flowers': ['e.y.e', 'GhGGG', '.GGG.'],
  'glint-1': ['P'],
  'glint-2': ['PP'],
  'glint-3': ['PP', 'PP'],
  'glint-4': ['lL'],
  'grass-tuft': ['h..h', 'GhhG'],
  'house-cottage': ['..........kkkkkkk...', '..........kuuuuTk...', '....kkkkkkkkuuTkk...', '...keeeeeeekuuTkk...', '...keRRRRRRkuuTkk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRrk', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCkllkCwWWWCkllkCk.', '.kCkBBkCwWWWCkBBkCk.', '.kCkkkkCwWWWCkkkkCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'house-long': ['...................kkkkkkk....', '...................kuuuuTk....', '....kkkkkkkkkkkkkkkkuuuuTk....', '...keeeeeeeeeeeeeeekuuuuTkk...', '...keRRRRRRRRRRRRRRkuuuuTkk...', '..keRRRRRRRRRRRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRRRRRRRRRRRrk', 'krrrrrrrrrrrrrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccccccccccccck.', '.kCCCCCCCCCCCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCwwwwCCCCCCCCCCCk.', '.kCkkkkCkkkkCwWWWCkkkkCkkkkCk.', '.kCkllkCkllkCwWWWCkllkCkllkCk.', '.kCkBBkCkBBkCwWWWCkBBkCkBBkCk.', '.kCkkkkCkkkkCwWyWCkkkkCkkkkCk.', '.kCVVVVCVVVVCwWWWCVVVVCVVVVCk.', '.kCCCCCCCCCCCwWWWCCCCCCCCCCCk.', '.kCCCCCCCCCCCwWWWCCCCCCCCCCCk.', '.kkkkkkkkkkkkkkkkkkkkkkkkkkkk.'],
  'house-shutters': ['....kkkkkkkkkkkk....', '...keeeeeeeeeeeek...', '...keRRRRRRRRRRrk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRrk', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCBllBCwWWWCBllBCk.', '.kCBllBCwWWWCBllBCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'house-townhouse': ['...........kkkkkk...', '...........kuuuTk...', '...........kuuuTk...', '....kkkkkkkkuuuTk...', '...keeeeeeekuuuTk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCkkkkCkkkkCk.', '.kCkllkCkllkCkllkCk.', '.kCkBBkCkBBkCkBBkCk.', '.kCkkkkCkkkkCkkkkCk.', '.kCVVVVCVVVVCVVVVCk.', '.kCCCCCCCCCCCCCCCCk.', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCkllkCwWWWCkllkCk.', '.kCkBBkCwWWWCkBBkCk.', '.kCkkkkCwWWWCkkkkCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'iron-bands': ['.....', 'nnnnn', 'MMMMM', '.....', '.....'],
  'jungle-tree': ['.....kkkkkkkkkk.....', '.kkkkHHHHhhhhhhkkkk.', 'kkHHHHHhhhhhhhhhhhkk', 'kHHHhhhhhhhhhhhhhhhk', 'khhhhhhhGGhhhhhhhhhk', 'khhhhhhhhhhhhhhhGGGk', 'kGGhhhhhhGGGGGGGGGGk', '.kkGGGGGGGGGGGGGGkk.', '...kkkkkGGGGkkkkk...', '........kvwk........', '........kvwk........', '........kvwk........', '........kvwk........', '.......kvvwwk.......', '.......kkkkkk.......'],
  'muzzle-flash': ['y.y', '.Y.', 'y.y'],
  'palm': ['...kk...kkk...kk...', '..kHHkkkHHhkkkhhk..', '.kHHHhhkHhhkhhhGGk.', 'kHhhhGkhhhhhkGhhhhk', '.khhGk.kJJJk.kGhhk.', '..kkk..kJkJk..kkk..', '........kkk........', '.......kvwk........', '......kvwk.........', '......kvwk.........', '.....kvwk..........', '.....kvwk..........', '.....kvwk..........', '.....kvwk..........', '......kvwk.........', '......kvwk.........', '......kvvwk........', '.....kvvvwk........', '....kvvvvwwk.......', '....kkkkkkkk.......'],
  'pine': ['.....k.....', '....khk....', '...kHhhk...', '..kHhhGGk..', '..kGGGGGk..', '...kHhhk...', '..kHhhhhk..', '.kHhhhhhhk.', '.khhhhhGGk.', '.kGGGGGGGk.', '..kHhhhhk..', '.kHHhhhhhk.', 'kHHhhhhhhhk', 'khhhhhhhGGk', 'kGGGGGGGGGk', '.kkkkkkkkk.', '...kvvwk...', '...kvvwk...', '...kkkkk...'],
  'rock': ['.kkk.', 'kuTTk', 'kTTtk', '.kkk.'],
  'rum': ['..kk....', '.kJjkk..', '.kfDkDk.', 'kffDDkDk', 'kDDDdkdk', 'kDDDdkk.', 'kDDddk..', '.kkkk...'],
  'sail-lateen-full': ['v....', 'vp...', 'vpC..', 'vpC..', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCCc', 'vpCCc', 'vpCCc'],
  'sail-lateen-furled': ['v.', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC'],
  'sail-lateen-half': ['v..', 'v..', 'v..', 'v..', 'vp.', 'vp.', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc'],
  'sail-main-full': ['......pCCcc......', '.....pCCCCCc.....', '....ppCCCCCcc....', '...WvvvvvvvvvW...', '...pppCCCCCccc...', '.pppppCCCCCCcccc.', 'pppppCCCCCCCCcccc', 'pppppCCCCCCCCcccc', 'WvvvvvvvvvvvvvvvW'],
  'sail-main-furled': ['...WCCCCCCCCCW...', '.ppCCCCCCCCCCCcc.', 'WvvvvvvvvvvvvvvvW'],
  'sail-main-half': ['....ppCCCCCcc....', '...WvvvvvvvvvW...', '..pppppCCCCCccc..', 'pppppCCCCCCCCcccc', 'WvvvvvvvvvvvvvvvW'],
  'sail-square-full': ['..ppppCCCcc..', '.ppppCCCCCcc.', 'ppppppCCCCCcc', 'ppppppCCCCCcc', 'WvvvvvvvvvvvW'],
  'sail-square-furled': ['.ppCCCCCCCcc.', 'WvvvvvvvvvvvW'],
  'sail-square-half': ['..pppppCCCc..', 'pppppCCCCCCcc', 'WvvvvvvvvvvvW'],
  'shrine': ['kkkkk.......kkkkk', 'kUUTk.......kUUTk', 'kTTTk...k...kTTTk', 'kUuTk..kHk..kUuTk', 'kUuTk.kHhGk.kUuTk', 'kUuTk..kGk..kUuTk', 'kUuTk...k...kUuTk', 'kUuTkUUUUuTTkUuTk', 'kUuTkkkkkkkkkUuTk', 'kUuTkuuuuuTTkUuTk', 'kUUTkuuuuuTTkUUTk', 'kkkkkkkkkkkkkkkkk'],
  'skull-rock': ['....kkkkkkk....', '..kkUUUUUUUkk..', '.kUUUUUUUUUUuk.', 'kUUUUUUUUUUuuTk', 'kUUkkkUUUkkkuTk', 'kUUkkkUkUkkkuTk', '.kUUUUUkUUUuTk.', '..kUUkUUUkUuk..', '..kUUkUUUkUTk..', '...kkkkkkkkk...'],
  'snow-pine': ['.....k.....', '....kPk....', '...kPPPk...', '..kPPPLGk..', '..kGGGGGk..', '...kPPPk...', '..kPPPPhk..', '.kPPPLhhhk.', '.khhhhhGGk.', '.kGGGGGGGk.', '..kPPPPhk..', '.kPPPPhhhk.', 'kPPPPLhhhhk', 'khhhhhhhGGk', 'kGGGGGGGGGk', '.kkkkkkkkk.', '...kvvwk...', '...kvvwk...', '...kkkkk...'],
  'sparkle-1': ['.y.', 'yYy', '.y.'],
  'sparkle-2': ['...', '.Y.', '...'],
  'stern-lantern': ['yyO', 'yYO', 'OOo'],
  'tree': ['.....kkkkk.....', '...kkHHHhhkk...', '..kHHHhhhhhhk..', '..khhhhhhhhhk..', '..kHhGGGGhhhk..', '.kHHhhhhhHHhhk.', 'khhhhhhhhhhhhhk', 'khhhhhhGGGhhhhk', 'khhhhHHhhhGhhhk', 'khhGGhhhhhGGGGk', '.kGGGhhhhGGGGk.', '..kkkGGGGGkkk..', '.....kwwwk.....', '.....kvvwk.....', '.....kvvwk.....', '.....kvvwk.....', '....kvvvwwk....', '....kkkkkkk....'],
  'whale': ['kk....kk........', 'kBk..kBBkkkkkk..', 'kBBkkkBBlllBBBk.', '.kBBBBBBBllBBBBk', 'kBBkkkBBBBbbbbk.', 'kBk..kBbkkkkkk..', 'kk....kk........']
};

const cache = new Map<string, Art>();

function grow(rows: string[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const wide = r.split('').map((c) => c.repeat(SCALE)).join('');
    for (let i = 0; i < SCALE; i++) out.push(wide);
  }
  return out;
}

export function rd(name: string, fallback: Art): Art {
  const r = ROWS[name];
  if (!r) return fallback;
  let a = cache.get(name);
  if (!a) {
    a = art(grow(r));
    cache.set(name, a);
  }
  return a;
}

export function rdList(names: string[], fallback: Art[]): Art[] {
  return fallback.map((a, i) => rd(names[Math.min(i, names.length - 1)], a));
}
