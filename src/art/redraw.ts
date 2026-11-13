import { art, Art } from './palette';

const SCALE = 1;

const ROWS: Record<string, string[]> = {
  'captain-deck': ['..kk..', '.kKKk.', 'kKKKKk', 'sRRRRS', '.RRRRr', '.rrrr.'],
  'crew': ['..JJ..', '.JJJJ.', 'sRRRRr', '.RRRrS', '.RRRr.', '.j..j.'],
  'deck-logs': ['wVvvWwVvvW', 'wVvvWwVvvW', 'wVvvWwVvvW', 'wVvvWwVvvW', 'DffffDffff', 'dDDDDdDDDD', 'wVvvWwVvvW', 'wVvvWwVvvW', 'wVvvWwVvvW', 'wVvvWwVvvW'],
  'deck-planks': ['VvvvWVvvvW', 'VvvvWVvvvW', 'VvvvWVvvvW', 'VvvvWVvvvW', 'WWWWWVvvvW', 'VvvvWWWWWW', 'VvvvWVvvvW', 'VvvvWVvvvW', 'VvvvWVvvvW', 'VvvvWVvvvW'],
  'flag-1': ['wRRRRRR.', 'wRRRRRRR', 'wRRRR...', 'w.......'],
  'flag-2': ['wRRRR...', 'wRRRRRR.', 'wRRRRRRR', 'w.......'],
  'iron-bands': ['..........', 'nnnnnnnnnn', 'nNnnnnnNnn', 'MMMMMMMMMM', '..........', '..........', 'nnnnnnnnnn', 'nNnnnnnNnn', 'MMMMMMMMMM', '..........'],
  'long-gun': ['...kkkk...', '...kNNk...', '...kNMk...', '...kNMk...', '...kNMk...', '...kNMk...', '...kNMk...', '...kNMk...', '...kNMk...', '...kNMk...', '..kNnMMk..', '..kNnMMk..', '..kNnMMk..', '.kvvVVwwk.', '.kWvVVwWk.', '..kkkkkk..'],
  'oar': ['WW.......VVV.', 'WWWWWWWWWWWWW', 'ww.......www.'],
  'pirate-flag-1': ['wKKKKKK.', 'wKKKKKKK', 'wkkkk...', 'w.......'],
  'pirate-flag-2': ['wKKKK...', 'wKKKKKK.', 'wkkkkkkk', 'w.......'],
  'sail-lateen-full': ['W........', 'Wp.......', 'Wp.......', 'Wp.......', 'WpC......', 'WpC......', 'WpC......', 'WpCc.....', 'WpCc.....', 'WpCc.....', 'WpCCc....', 'WpCCc....', 'WpCCc....', 'WpCCc....', 'WpCCCc...', 'WpCCCc...', 'WpCCCc...', 'WpCCCCc..', 'WpCCCCc..', 'WpCCCCc..', 'WpCCCCCc.', 'WpCCCCCc.', 'WpCCCCCc.', 'WpCCCCCc.', 'WpCCCCCCc', 'WpCCCCCCc'],
  'sail-lateen-furled': ['WCC.', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WpCc', 'WCC.'],
  'sail-lateen-half': ['W.....', 'W.....', 'W.....', 'W.....', 'W.....', 'W.....', 'W.....', 'W.....', 'W.....', 'Wp....', 'Wp....', 'Wp....', 'Wp....', 'WpC...', 'WpC...', 'WpC...', 'WpCc..', 'WpCc..', 'WpCc..', 'WpCc..', 'WpCCc.', 'WpCCc.', 'WpCCc.', 'WpCCc.', 'WpCCCc', 'WpCCCc'],
  'sail-main-full': ['...........ppppCCCCCccc...........', '.........pppppCCCCCCCcccc.........', '........pppppCCCCCCCCccccc........', '.......ppppppCCCCCCCCCccccc.......', '......ppppppCCCCCCCCCCcccccc......', '.....WWWWWWWWWWWWWWWWWWWWWWWW.....', '.....wwwwwwwwwwwwwwwwwwwwwwww.....', '......ppppppCCCCCCCCCCcccccc......', '....pppppppCCCCCCCCCCCCccccccc....', '...ppppppppCCCCCCCCCCCCcccccccc...', '..pppppppppCCCCCCCCCCCCCcccccccc..', '.pppppppppCCCCCCCCCCCCCCccccccccc.', 'ppppppppppCCCCCCCCCCCCCCCccccccccc', 'ppppppppppCCCCCCCCCCCCCCCccccccccc', 'ppppppppppCCCCCCCCCCCCCCCccccccccc', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'],
  'sail-main-furled': ['.......ppppppCCCCCCCCCccccc.......', '.....WWWWWWWWWWWWWWWWWWWWWWWW.....', '..pppppppppCCCCCCCCCCCCCcccccccc..', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'],
  'sail-main-half': ['.........pppppCCCCCCCcccc.........', '.......ppppppCCCCCCCCCccccc.......', '.....WWWWWWWWWWWWWWWWWWWWWWWW.....', '.....wwwwwwwwwwwwwwwwwwwwwwww.....', '....pppppppCCCCCCCCCCCCccccccc....', '..pppppppppCCCCCCCCCCCCCcccccccc..', 'ppppppppppCCCCCCCCCCCCCCCccccccccc', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'],
  'sail-patched-full': ['.....ppCCCCcc.....', '...ppppCCCCCccc...', '..ppppCCCCCCcccc..', '.ppppcccCCCCCcccc.', 'pppppcccCCCCCccccc', 'pppppcccCCCCCccccc', 'pppppCCCCCCCCccccc', 'WWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwww'],
  'sail-patched-furled': ['.pppppCCCCCCCcccc.', 'WWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwww'],
  'sail-patched-half': ['..ppppCCCCCCcccc..', '.pppppCCCCCCCcccc.', 'pppppCCCCCCCCccccc', 'WWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwww'],
  'sail-square-full': ['......ppppCCCCCCcccc......', '....pppppCCCCCCCCccccc....', '...ppppppCCCCCCCCCccccc...', '..ppppppCCCCCCCCCCcccccc..', '.pppppppCCCCCCCCCCCcccccc.', 'pppppppCCCCCCCCCCCCccccccc', 'pppppppCCCCCCCCCCCCccccccc', 'pppppppCCCCCCCCCCCCccccccc', 'WWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwww'],
  'sail-square-furled': ['.pppppppCCCCCCCCCCCcccccc.', 'WWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwww'],
  'sail-square-half': ['....pppppCCCCCCCCccccc....', '..ppppppCCCCCCCCCCcccccc..', '.pppppppCCCCCCCCCCCcccccc.', 'pppppppCCCCCCCCCCCCccccccc', 'WWWWWWWWWWWWWWWWWWWWWWWWWW', 'wwwwwwwwwwwwwwwwwwwwwwwwww'],
  'stern-lantern': ['.yyO.', 'yYYYO', 'yYYYO', 'yYYYo', '.Ooo.']
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

function shadowed(rows: string[]): string[] {
  const w = rows[0].length;
  const base = rows[rows.length - 1];
  let x0 = base.search(/[^.]/);
  let x1 = w - 1 - base.split('').reverse().join('').search(/[^.]/);
  if (x0 < 0) return rows;
  const line = (a: number, b: number) => {
    let s = '';
    for (let x = 0; x < w + 3; x++) s += x >= a && x <= b ? ',' : '.';
    return s;
  };
  return [...rows.map((r) => r + '...'), line(x0 + 1, x1 + 3), line(x0 + 3, x1 + 1)];
}

export function rd(name: string, fallback: Art): Art {
  const r = ROWS[name];
  if (!r) return fallback;
  const key = name + (fallback.rows.some((row) => row.includes(',')) ? '+s' : '');
  let a = cache.get(key);
  if (!a) {
    const g = grow(r);
    a = art(key.endsWith('+s') ? shadowed(g) : g);
    cache.set(key, a);
  }
  return a;
}

export function rdList(names: string[], fallback: Art[]): Art[] {
  return fallback.map((a, i) => rd(names[Math.min(i, names.length - 1)], a));
}
