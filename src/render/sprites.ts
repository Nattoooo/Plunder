export interface SpriteSet {
  light: HTMLCanvasElement;
  fog: HTMLCanvasElement;
}

let set: SpriteSet | null = null;

export function sprites(): SpriteSet {
  if (set) return set;
  const light = document.createElement('canvas');
  light.width = 64;
  light.height = 64;
  const lctx = light.getContext('2d')!;
  const g = lctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(0,0,0,1)');
  g.addColorStop(0.45, 'rgba(0,0,0,0.75)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  lctx.fillStyle = g;
  lctx.fillRect(0, 0, 64, 64);
  const fog = document.createElement('canvas');
  const FS = 256;
  fog.width = FS;
  fog.height = FS;
  const fctx = fog.getContext('2d')!;
  const img = fctx.createImageData(FS, FS);
  const octs = [4, 8, 16, 32];
  const grids = octs.map((n) => {
    const a = new Float32Array(n * n);
    for (let i = 0; i < a.length; i++) a[i] = Math.random();
    return a;
  });
  const sample = (grid: Float32Array, n: number, x: number, y: number) => {
    const fx = (x / FS) * n;
    const fy = (y / FS) * n;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = fx - x0;
    const ty = fy - y0;
    const sx = tx * tx * tx * (tx * (tx * 6 - 15) + 10);
    const sy = ty * ty * ty * (ty * (ty * 6 - 15) + 10);
    const a = grid[(y0 % n) * n + (x0 % n)];
    const b = grid[(y0 % n) * n + ((x0 + 1) % n)];
    const c = grid[((y0 + 1) % n) * n + (x0 % n)];
    const d = grid[((y0 + 1) % n) * n + ((x0 + 1) % n)];
    return (a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy;
  };
  for (let y = 0; y < FS; y++) for (let x = 0; x < FS; x++) {
    let v = 0;
    let amp = 0.5;
    let norm = 0;
    for (let k = 0; k < octs.length; k++) {
      v += sample(grids[k], octs[k], x, y) * amp;
      norm += amp;
      amp *= 0.5;
    }
    v /= norm;
    const a = Math.max(0, Math.min(1, (v - 0.3) * 1.8));
    const o = (y * FS + x) * 4;
    img.data[o] = 214;
    img.data[o + 1] = 224;
    img.data[o + 2] = 228;
    img.data[o + 3] = Math.round(a * 235);
  }
  fctx.putImageData(img, 0, 0);
  set = { light, fog };
  return set;
}
