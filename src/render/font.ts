const GLYPHS: Record<string, string> = {
  A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100',
  G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111',
  M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', Q: '010101101110011', R: '110101110101101',
  S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101',
  Y: '101101010010010', Z: '111001010100111', '0': '111101101101111', '1': '010110010010111', '2': '110001010100111', '3': '110001010001110',
  '4': '101101111001001', '5': '111100110001110', '6': '011100110101010', '7': '111001010010010', '8': '010101010101010', '9': '010101011001110',
  '+': '000010111010000', '-': '000000111000000', '.': '000000000000010', ',': '000000000010100', '!': '010010010000010', '?': '110001010000010',
  ':': '000010000010000', "'": '010010000000000', '/': '001001010100100', '(': '010100100100010', ')': '010001001001010', '%': '101001010100101',
  ' ': '000000000000000', '#': '101111101111101', '"': '101101000000000', '&': '010101010101011', '*': '000101010101000'
};

const CHARS = Object.keys(GLYPHS);
const IDX: Record<string, number> = {};
CHARS.forEach((c, i) => (IDX[c] = i));

const atlases = new Map<number, HTMLCanvasElement>();
const GW = 5;
const GH = 7;

function atlas(color: number): HTMLCanvasElement {
  let a = atlases.get(color);
  if (a) return a;
  a = document.createElement('canvas');
  a.width = CHARS.length * GW;
  a.height = GH;
  const ctx = a.getContext('2d')!;
  const hex = '#' + color.toString(16).padStart(6, '0');
  CHARS.forEach((ch, i) => {
    const g = GLYPHS[ch];
    ctx.fillStyle = '#140e0a';
    for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) {
      if (g[y * 3 + x] !== '1') continue;
      for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) ctx.fillRect(i * GW + 1 + x + ox, 1 + y + oy, 1, 1);
    }
    ctx.fillStyle = hex;
    for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) if (g[y * 3 + x] === '1') ctx.fillRect(i * GW + 1 + x, 1 + y, 1, 1);
  });
  atlases.set(color, a);
  return a;
}

export function textWidth(s: string): number {
  return s.length * 4 + 1;
}

export function drawText(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, color = 0xffffff, center = false, k = 1): void {
  const a = atlas(color);
  const str = s.toUpperCase();
  let px = Math.round((center ? x - textWidth(str) / 2 : x) * k) / k;
  const py = Math.round(y * k) / k;
  for (let i = 0; i < str.length; i++) {
    const gi = IDX[str[i]];
    if (gi !== undefined && str[i] !== ' ') ctx.drawImage(a, gi * GW, 0, GW, GH, px - 1, py - 1, GW, GH);
    px += 4;
  }
}
