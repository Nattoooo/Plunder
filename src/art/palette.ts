export const PAL: Record<string, number> = {
  k: 0x1b1220, K: 0x3a2a3a,
  w: 0x4e301c, W: 0x6e4528, v: 0x93633a, V: 0xbd8a52,
  m: 0x2c2f36, M: 0x4b505a, n: 0x787f8a, N: 0xb7bec8,
  o: 0x7a4a12, O: 0xc08022, y: 0xf0bc3c, Y: 0xfff0a0,
  r: 0x5e1a22, R: 0xa82c34, e: 0xe0544a, E: 0xff9a80,
  c: 0xa89878, C: 0xd8ccb0, p: 0xf6f0e0, P: 0xffffff,
  g: 0x173a24, G: 0x24603a, h: 0x3f9444, H: 0x86cc5a,
  b: 0x16305e, B: 0x2e5ea8, l: 0x6aa6e0, L: 0xb8e0ff,
  s: 0xf0c098, S: 0xc08060, j: 0x3a2214, J: 0x7a4a2a,
  t: 0x3c3c46, T: 0x62626e, u: 0x9a9aa4, U: 0xd0d0d8,
  d: 0x5a3e24, D: 0x8a663e, f: 0xcfa86a, F: 0xf0d8a0,
  x: 0xe4dcc0, X: 0xa89a74,
  z: 0x4a2a6a, Z: 0x9a68d0,
  i: 0x1e7a5e, I: 0x78f0c0,
  q: 0xd8601e, Q: 0xffa83a,
  a: 0x0e2a4a, A: 0x2a6a9a
};

export const SHADOW = 0x5a0a0e1e;

export interface Art {
  w: number;
  h: number;
  rows: string[];
}

export function art(rows: string[]): Art {
  return { w: rows[0].length, h: rows.length, rows };
}

export function flipX(a: Art): Art {
  return { w: a.w, h: a.h, rows: a.rows.map((r) => r.split('').reverse().join('')) };
}

export type Swap = Record<string, number>;

export function abgr(c: number, alpha = 255): number {
  return ((alpha << 24) | ((c & 0xff) << 16) | (c & 0xff00) | ((c >> 16) & 0xff)) >>> 0;
}

const SHADOW_ABGR = abgr(0x0e0a1e, 90);

export function colorOf(ch: string, swap?: Swap): number {
  if (ch === '.') return 0;
  if (ch === ',') return SHADOW_ABGR;
  const c = swap && swap[ch] !== undefined ? swap[ch] : PAL[ch];
  return c === undefined ? abgr(0xff00ff) : abgr(c);
}

export function pixels(a: Art, swap?: Swap): Uint32Array<ArrayBuffer> {
  const out = new Uint32Array(a.w * a.h);
  for (let y = 0; y < a.h; y++) {
    const row = a.rows[y];
    for (let x = 0; x < a.w; x++) out[y * a.w + x] = colorOf(row[x], swap);
  }
  return out;
}

export function shade(c: number, f: number): number {
  const r = Math.min(255, Math.round(((c >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((c >> 8) & 255) * f));
  const b = Math.min(255, Math.round((c & 255) * f));
  return (r << 16) | (g << 8) | b;
}

export function ramp(base: number): Swap {
  return { p: shade(base, 1.18), C: base, c: shade(base, 0.8) };
}
