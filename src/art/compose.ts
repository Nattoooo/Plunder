import { Art, flipX } from './palette';

export class Canvas {
  w: number;
  h: number;
  px: string[][];
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.px = Array.from({ length: h }, () => new Array<string>(w).fill('.'));
  }

  put(a: Art, x: number, y: number): this {
    for (let j = 0; j < a.h; j++) {
      const ty = y + j;
      if (ty < 0 || ty >= this.h) continue;
      const row = a.rows[j];
      for (let i = 0; i < a.w; i++) {
        const ch = row[i];
        const tx = x + i;
        if (ch === '.' || tx < 0 || tx >= this.w) continue;
        if (ch === ',' && this.px[ty][tx] !== '.') continue;
        this.px[ty][tx] = ch;
      }
    }
    return this;
  }

  tileX(a: Art, x0: number, x1: number, y: number): this {
    for (let x = x0; x < x1; x += a.w) this.put(x + a.w > x1 ? crop(a, 0, 0, x1 - x, a.h) : a, x, y);
    return this;
  }

  tileY(a: Art, x: number, y0: number, y1: number): this {
    for (let y = y0; y < y1; y += a.h) this.put(y + a.h > y1 ? crop(a, 0, 0, a.w, y1 - y) : a, x, y);
    return this;
  }

  fill(ch: string, x0: number, y0: number, x1: number, y1: number): this {
    for (let y = Math.max(0, y0); y < Math.min(this.h, y1); y++) for (let x = Math.max(0, x0); x < Math.min(this.w, x1); x++) this.px[y][x] = ch;
    return this;
  }

  art(): Art {
    const rows = this.px.map((r) => r.join(''));
    return { w: this.w, h: this.h, rows };
  }
}

export function crop(a: Art, x: number, y: number, w: number, h: number): Art {
  const rows = a.rows.slice(y, y + h).map((r) => r.slice(x, x + w));
  return { w, h: rows.length, rows };
}

export function hcat(...parts: Art[]): Art {
  const h = Math.max(...parts.map((p) => p.h));
  const rows: string[] = [];
  for (let y = 0; y < h; y++) rows.push(parts.map((p) => p.rows[y] ?? '.'.repeat(p.w)).join(''));
  return { w: rows[0].length, h, rows };
}

export function mirror(a: Art): Art {
  return flipX(a);
}

export function noShadow(a: Art): Art {
  return { w: a.w, h: a.h, rows: a.rows.map((r) => r.replace(/,/g, '.')) };
}
