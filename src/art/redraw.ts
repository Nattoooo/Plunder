import { art, Art } from './palette';

const SCALE = 1;

const ROWS: Record<string, string[]> = {

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
