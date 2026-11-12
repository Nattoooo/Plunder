import { Art, Swap, pixels } from '../art/palette';

const cache = new WeakMap<Art, Map<string, HTMLCanvasElement>>();

export function artCanvas(a: Art, swap?: Swap): HTMLCanvasElement {
  let m = cache.get(a);
  if (!m) {
    m = new Map();
    cache.set(a, m);
  }
  const key = swap ? JSON.stringify(swap) : '';
  let c = m.get(key);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = a.w;
  c.height = a.h;
  const px = pixels(a, swap);
  c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(px.buffer), a.w, a.h), 0, 0);
  m.set(key, c);
  return c;
}

export function artDataURL(a: Art, scale: number, swap?: Swap): string {
  const src = artCanvas(a, swap);
  const c = document.createElement('canvas');
  c.width = a.w * scale;
  c.height = a.h * scale;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(src, 0, 0, c.width, c.height);
  return c.toDataURL();
}
