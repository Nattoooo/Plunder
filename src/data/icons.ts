export const SHAPES: Record<string, string[]> = {
  sack: ['...oooo...', '..obbbbo..', '...oddo...', '..oaaaao..', '.oaaccaao.', 'oaaacaaaao', 'oaaaaaaabo', 'oaaaaaabbo', '.obbbbbbo.', '..oooooo..'],
  barrel: ['..oooooo..', '.obccccbo.', '.oddddddo.', 'oaaacaaabo', 'oaaacaaabo', 'oddddddddo', 'oaaacaaabo', '.oaacaabo.', '.oddddddo.', '..oooooo..'],
  crate: ['oooooooooo', 'oaaaaaaaao', 'oabbbbbbao', 'obabbbbabo', 'obbabbabbo', 'obbbaabbbo', 'obbabbabbo', 'obabbbbabo', 'oaaaaaaaao', 'oooooooooo'],
  bottle: ['....oo....', '....od....', '...oddo...', '...oaao...', '..oacaao..', '.oaacaaao.', '.oaacaaao.', '.oaaaaabo.', '.obbbbbbo.', '..oooooo..'],
  coins: ['..........', '....oo....', '...occo...', '..oaccao..', '.oocaaoo..', 'occaoocco.', 'oaacaoaaco', 'oaaaoaaaao', '.obbobbbo.', '..oo.ooo..'],
  gem: ['..........', '...oooo...', '..occaao..', '.occaaabo.', 'oaaaaaaabo', '.oaaaaabo.', '..oaaabo..', '...oabo...', '....oo....', '..........'],
  orb: ['..........', '...oooo...', '..occaao..', '.occaaaao.', '.ocaaaaao.', '.oaaaaabo.', '.oaaaabbo.', '..obbbbo..', '...oooo...', '..........'],
  dumbbell: ['..........', '..........', '.oo....oo.', 'ocao..ocao', 'oaaoddoaao', 'oaaoddoaao', 'obao..obao', '.oo....oo.', '..........', '..........'],
  cluster: ['..........', '..oo..oo..', '.ocao.oca.', '.oaao.oao.', '..oooooo..', '.oca.ocao.', '.oao.oaao.', '..oo..oo..', '..........', '..........'],
  bomb: ['......od..', '.....oo.d.', '...ooooo..', '..occaaao.', '.occaaaabo', '.ocaaaaabo', '.oaaaaaabo', '.oaaaaabbo', '..obbbbbo.', '...ooooo..'],
  shovel: ['........oo', '.......odo', '......odo.', '.....odo..', '....odo...', '.ooodo....', 'oaacbo....', 'oacaao....', 'oaaabo....', '.oooo.....'],
  sword: ['........oo', '.......oco', '......ocao', '.....ocao.', '....ocao..', '.o.ocao...', '.ooaao....', '..odoo....', '.odoodo...', 'oo...o....'],
  pistol: ['..........', '..........', 'oooooooo..', 'occccccao.', 'oaaaaaaao.', '.oodddoo..', '..oddoo...', '..oddo....', '..odo.....', '..oo......'],
  musket: ['.........o', '........oo', '.......oco', '......oco.', '.....oco..', '....odo...', '...oddo...', '..odddo...', '.oddoo....', '.ooo......'],
  axe: ['..........', '...oooo...', '..oaccaoo.', '.oaaaaodo.', '.oaaaodo..', '..ooodo...', '....odo...', '...odo....', '..odo.....', '..oo......'],
  scroll: ['..........', '.oooooooo.', 'obbbbbbbbo', '.oaaaaaao.', '.oaadaaao.', '.oadaddao.', '.oaaadaao.', '.oaaaaaao.', 'obbbbbbbbo', '.oooooooo.'],
  chalice: ['.oooooooo.', '.occaaabo.', '.ocaaaabo.', '..oaaabo..', '...oabo...', '....oo....', '....ab....', '...oabo...', '..oaaabo..', '..oooooo..'],
  idol: ['...oooo...', '..oaaaao..', '..ocdcdo..', '..oaaaao..', '...oaao...', '..oaaaao..', '.oaoaaoao.', '...oaao...', '..oaoboo..', '..oo..oo..'],
  crown: ['..........', 'o...oo...o', 'oo.oddo.oo', 'oaooaaooao', 'oacaacaaao', 'oaaaaaaabo', 'odadadadao', 'oaaaaaaabo', 'oooooooooo', '..........'],
  ring: ['..........', '....od....', '...oddo...', '..ooooo...', '.oaccaao..', 'oao...oao.', 'oco...obo.', 'oao...obo.', '.oaaaabo..', '..ooooo...'],
  necklace: ['o........o', 'oo......oo', '.oo....oo.', '..oo..oo..', '...oooo...', '...oddo...', '..oddddo..', '..odccdo..', '...oddo...', '....oo....'],
  plank: ['..........', 'oooooooooo', 'oaacaaaaao', 'obbbbbbbbo', 'oooooooooo', 'oaaacaaaao', 'obbbbbbbbo', 'oooooooooo', '..........', '..........'],
  ingot: ['..........', '..........', '...oooooo.', '..occcaao.', '.oaaaaabo.', 'oaaaaabbo.', 'obbbbbbo..', 'oooooooo..', '..........', '..........'],
  roll: ['..........', '.ooooooo..', 'oaccaaaao.', 'oaaaaaaabo', 'obbbbbbbbo', '.oooooooo.', '..odo.....', '..odo.....', '...oo.....', '..........'],
  coil: ['..........', '..oooooo..', '.oaaccaao.', 'oaoooooaao', 'oao....oao', 'oao....oao', 'oaoooooaao', '.oaaaaabo.', '..oooooo..', '..........'],
  fish: ['..........', '..........', '....ooo..o', '..ooaaaooo', '.ocaacaaao', 'oacaaaaabo', '.obbbbbooo', '..ooooo..o', '..........', '..........'],
  fruit: ['.....o....', '....od....', '...ooddo..', '..oaaoo...', '.ocaaaao..', '.ocaaaaao.', '.oaaaaabo.', '.oaaaabbo.', '..obbbbo..', '...oooo...'],
  meat: ['..........', '...oooo...', '..oaaaao..', '.oacaaaao.', '.oaaaaaao.', '.oaaaaabo.', '..obbbbo..', '...oddo...', '...occo...', '....oo....'],
  hat: ['..........', '..........', '...oooo...', '..oaaaao..', '.oaacaaao.', 'oddddddddo', 'oaaaaaaabo', '.oo....oo.', '..........', '..........'],
  vest: ['..........', '.oo....oo.', 'oaao..oaao', 'oaaaooaaao', 'oacaddaaao', 'oacaaaaaao', '.oaadaaao.', '.oaaaaaao.', '.obbbbbbo.', '.oooooooo.'],
  compass: ['...oooo...', '..oaaaao..', '.oaccccao.', 'oacccdccao', 'oaccdcccao', 'oacdccccao', 'oaccccccao', '.oaccccao.', '..oaaaao..', '...oooo...'],
  spyglass: ['..........', '........oo', '......ooco', '....oocaao', '..oocaaoo.', '.odaaoo...', 'odaoo.....', 'odoo......', 'oo........', '..........'],
  skull: ['..oooooo..', '.occcccao.', 'occcccccao', 'ocoocoocao', 'ocoocoocao', 'occccocaao', '.oaccccao.', '..ocococ..', '..oooooo..', '..........'],
  lantern: ['....oo....', '...o..o...', '..oooooo..', '..oddddo..', '.odcccado.', '.odcccado.', '.odcaaado.', '..oddddo..', '..oooooo..', '..........'],
  shell: ['..........', '....oooo..', '...oaccao.', '..oacaaabo', '.oaaaaabo.', 'oaaaabbo..', 'oaabbbo...', '.obbbo....', '..ooo.....', '..........'],
  key: ['..........', '..oooo....', '.oaccao...', '.oa..ao...', '.oaccao...', '..oaao....', '...oaoo...', '...oaaao..', '...oaoo...', '...ooo....'],
  book: ['..........', '.oooooooo.', '.oaaaaaabo', '.oacccaabo', '.oaaaaaabo', '.oaaddaabo', '.oaaaaaabo', '.obbbbbbbo', '.occcccco.', '.oooooooo.'],
  medkit: ['..........', '...oooo...', '..oo..oo..', 'oooooooooo', 'oaaaddaaao', 'oaaddddaao', 'oaaaddaaao', 'oaaaaaaaao', 'obbbbbbbbo', 'oooooooooo'],
  net: ['..........', 'oaoaoaoaoa', 'a.a.a.a.a.', 'oaoaoaoaoa', 'a.a.a.a.a.', 'oaoaoaoaoa', 'a.a.a.a.a.', 'oaoaoaoaoa', '..........', '..........'],
  helmet: ['..oooooo..', '.oaaaaaao.', 'oaoooooaao', 'oaodccoaao', 'oaocccoaao', 'oaoooooaao', '.oaaaaaao.', 'oooooooooo', 'obbbbbbbbo', 'oooooooooo'],
  toolbox: ['..........', '...oooo...', '...o..o...', 'oooooooooo', 'oaaaaaaaao', 'oddoddoddo', 'oaaaaaaaao', 'oaaaaaaaao', 'obbbbbbbbo', 'oooooooooo'],
  candelabra: ['d...d...d.', 'o...o...o.', 'oa..oa..oa', 'oaooooooao', '.oaaaaaao.', '....oa....', '....oa....', '...oaao...', '..oaaaao..', '..oooooo..'],
  doubloon: ['..........', '...oooo...', '..oaccao..', '.oacaadao.', '.oaadaaao.', '.oaadaaao.', '.oadaaabo.', '..oabbbo..', '...oooo...', '..........'],
  shard: ['....o.....', '...oco....', '...oco....', '..ocaao...', '..ocaao...', '.ocaaabo..', '.oaaaabo..', '..oaabo...', '...obo....', '....o.....'],
  horseshoe: ['..........', '.oo....oo.', 'oaao..oaao', 'oado..odao', 'oaao..oaao', 'oaaooooaao', 'oaaaaaaaao', '.oaaddaao.', '..oooooo..', '..........'],
  hourglass: ['oooooooooo', '.oaaaaaao.', '..occcco..', '...occo...', '....oo....', '....oo....', '...odco...', '..odddco..', '.oaaaaaao.', 'oooooooooo']
};

const cache = new Map<string, string>();

export function iconURL(shape: string, cols: number[], scale = 1): string {
  const key = shape + cols.join(',') + scale;
  const c = cache.get(key);
  if (c) return c;
  const rows = SHAPES[shape] ?? SHAPES.crate;
  const cv = document.createElement('canvas');
  cv.width = 12 * scale;
  cv.height = 12 * scale;
  const ctx = cv.getContext('2d')!;
  const map: Record<string, number> = { o: 0x1a1210, a: cols[0], b: cols[1] ?? shadeHex(cols[0], 0.7), c: cols[2] ?? shadeHex(cols[0], 1.35), d: cols[3] ?? 0x5a3a22 };
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const ch = rows[y][x];
      if (!ch || ch === '.') continue;
      const col = map[ch];
      ctx.fillStyle = '#' + col.toString(16).padStart(6, '0');
      ctx.fillRect((x + 1) * scale, (y + 1) * scale, scale, scale);
    }
  }
  const url = cv.toDataURL();
  cache.set(key, url);
  return url;
}

export function shadeHex(c: number, f: number): number {
  const r = Math.min(255, Math.round(((c >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((c >> 8) & 255) * f));
  const b = Math.min(255, Math.round((c & 255) * f));
  return (r << 16) | (g << 8) | b;
}
