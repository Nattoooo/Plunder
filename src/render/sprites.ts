const PAL: Record<string, string> = {
  k: '#1a120c', w: '#8a5a2e', W: '#b07a44', d: '#5a3a1e', y: '#e8c040', Y: '#fff08a', r: '#c83a2a', R: '#ff6a5a', g: '#8a8a8a', G: '#b8b8b8',
  s: '#6a6660', S: '#9a968c', b: '#2a5a8a', B: '#8ac8e8', p: '#f4f0e6', P: '#c8c0b0', x: '#101010', o: '#e8742a', e: '#5ae8a0', E: '#c0ffd8',
  c: '#e8dcc0', n: '#3a2414', l: '#4a7a3a', t: '#d8b880', q: '#7a6a5a'
};

export function makeSprite(rows: string[], pal: Record<string, string> = PAL): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = rows[0].length;
  c.height = rows.length;
  const ctx = c.getContext('2d')!;
  for (let y = 0; y < rows.length; y++) for (let x = 0; x < rows[y].length; x++) {
    const ch = rows[y][x];
    if (ch === '.') continue;
    ctx.fillStyle = pal[ch] ?? '#ff00ff';
    ctx.fillRect(x, y, 1, 1);
  }
  return c;
}

export interface SpriteSet {
  crate: HTMLCanvasElement;
  barrel: HTMLCanvasElement;
  goldchest: HTMLCanvasElement;
  bottle: HTMLCanvasElement;
  wreck: HTMLCanvasElement;
  chest: HTMLCanvasElement;
  lockedChest: HTMLCanvasElement;
  xmark: HTMLCanvasElement;
  claim: HTMLCanvasElement;
  claimOwned: HTMLCanvasElement;
  shrine: HTMLCanvasElement;
  sparkle: HTMLCanvasElement;
  flag: HTMLCanvasElement;
  light: HTMLCanvasElement;
  fog: HTMLCanvasElement;
  glint: HTMLCanvasElement[];
  lostCargo: HTMLCanvasElement;
  questWreck: HTMLCanvasElement;
  waypoint: HTMLCanvasElement;
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
  set = {
    crate: makeSprite(['kkkkkkk', 'kWWWWWk', 'kWdWdWk', 'kWWdWWk', 'kWdWdWk', 'kWWWWWk', 'kkkkkkk']),
    barrel: makeSprite(['.kkkk.', 'kWwwWk', 'kddddk', 'kWwwWk', 'kWwwWk', 'kddddk', '.kkkk.']),
    goldchest: makeSprite(['.kkkkkk.', 'kwwwwwwk', 'kyyyyyyk', 'kwwYywwk', 'kwwwwwwk', 'kkkkkkkk']),
    bottle: makeSprite(['.d.', '.B.', 'bBb', 'bpb', 'bBb', '.b.']),
    wreck: makeSprite([
      '........d...........',
      '........d...........',
      '.......cd...........',
      '......ccdc..........',
      '.......cd...........',
      '........d...........',
      '...kkk..d....kk.....',
      '..kwWwkkdkkkkwWk....',
      '.kwWwwwwwwWwwwwk....',
      'kwwdwwdwwdwwdwwk....',
      '.kkwwwwwwwwwwkk.....',
      '...kkkkkkkkkk.......'
    ]),
    chest: makeSprite(['.kkkkkkk.', 'kwWWWWWwk', 'kwwwwwwwk', 'kyyyyyyyk', 'kwwwYwwwk', 'kwwwwwwwk', 'kkkkkkkkk']),
    lockedChest: makeSprite(['.kkkkkkk.', 'kwWWWWWwk', 'kwwwwwwwk', 'kgggggggk', 'kwwwGwwwk', 'kwwwkwwwk', 'kkkkkkkkk']),
    xmark: makeSprite(['r.....r', '.r...r.', '..r.r..', '...r...', '..r.r..', '.r...r.', 'r.....r']),
    claim: makeSprite(['..k....', '..kpp..', '..kpPp.', '..kpp..', '..k....', '.sSSs..', '.sSss..', '.sSss..', 'ssssss.']),
    claimOwned: makeSprite(['..k....', '..kxxx.', '..kxpx.', '..kxxx.', '..k....', '.sSSs..', '.sSss..', '.sSss..', 'ssssss.']),
    shrine: makeSprite(['....eE....', '...eEEe...', '....ee....', '.kkkkkkkk.', '.sSSSSSSs.', '..sSsSsS..', '..sSsSss..', '.sSSSSSSs.', 'ssssssssss']),
    sparkle: makeSprite(['.Y.', 'YpY', '.Y.']),
    flag: makeSprite(['kxxxxx', 'kxpxpx', 'kxxpxx', 'kxpxpx', 'kxxxxx', 'k.....', 'k.....', 'k.....']),
    light,
    fog,
    glint: [makeSprite(['p']), makeSprite(['BpB']), makeSprite(['.B.', 'BpB']), makeSprite(['B.B'])],
    lostCargo: makeSprite(['....rr..', '....rrr.', '....r...', 'kkkkkkkk', 'kwWwwWwk', 'kwwwwwwk', '.kkkkkk.']),
    questWreck: makeSprite([
      '..........y.........',
      '.........yy.........',
      '........d...........',
      '.......cd...........',
      '......ccdc..........',
      '...kkk..d....kk.....',
      '..kwWwkkdkkkkwWk....',
      '.kwWwwwwwwWwwwwk....',
      'kwwdwwdwwdwwdwwk....',
      '.kkwwwwwwwwwwkk.....',
      '...kkkkkkkkkk.......'
    ]),
    waypoint: makeSprite(['..k....', '..krr..', '..krrr.', '..krr..', '..k....', '..k....', '.kkk...'])
  };
  return set;
}

export function structureSprite(color: number, roof: number, kind: string): HTMLCanvasElement {
  const hex = (c: number) => '#' + c.toString(16).padStart(6, '0');
  const c = document.createElement('canvas');
  const w = kind === 'fort' ? 16 : kind === 'dock' ? 14 : kind === 'watchtower' ? 7 : 11;
  const h = kind === 'fort' ? 14 : kind === 'watchtower' ? 14 : kind === 'dock' ? 6 : 9;
  c.width = w + 1;
  c.height = h + 1;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(1, 1, w, h);
  ctx.fillStyle = '#1a120c';
  ctx.fillRect(0, 0, w, h);
  if (kind === 'dock') {
    ctx.fillStyle = hex(color);
    ctx.fillRect(1, 1, w - 2, h - 2);
    ctx.fillStyle = '#5a3a1e';
    for (let x = 2; x < w - 1; x += 3) ctx.fillRect(x, 1, 1, h - 2);
    return c;
  }
  const roofH = kind === 'watchtower' ? 4 : Math.floor(h * 0.55);
  ctx.fillStyle = hex(roof);
  ctx.fillRect(1, 1, w - 2, roofH);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(1, Math.floor(roofH / 2), w - 2, 1);
  ctx.fillStyle = hex(color);
  ctx.fillRect(1, roofH + 1, w - 2, h - roofH - 2);
  ctx.fillStyle = '#3a2414';
  ctx.fillRect(Math.floor(w / 2), h - 3, 1, 2);
  if (kind === 'fort') {
    ctx.fillStyle = '#1a120c';
    for (let x = 1; x < w - 1; x += 2) ctx.fillRect(x, 0, 1, 1);
    ctx.fillStyle = '#2a2a30';
    ctx.fillRect(3, roofH + 2, 3, 2);
    ctx.fillRect(w - 6, roofH + 2, 3, 2);
  }
  if (kind === 'plantation') {
    ctx.fillStyle = '#4a8a3a';
    for (let x = 1; x < w - 1; x += 2) ctx.fillRect(x, h - 2, 1, 1);
  }
  return c;
}
