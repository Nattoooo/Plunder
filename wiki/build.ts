import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { deflateSync } from 'node:zlib';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ITEMS, ItemDef, ItemCat } from '../src/data/items';
import { COMPONENTS, KEELS, ComponentDef } from '../src/data/components';
import { ROLES, TRAITS, Station } from '../src/data/crew';
import { TEMPLATES, PART_CHARS } from '../src/data/fleets';
import { STRUCTURES, PLANTATION_CROPS } from '../src/data/structures';
import { ICONS } from '../src/art/icons';
import { Art, Swap, pixels, ramp } from '../src/art/palette';
import { PARTS, SAILS } from '../src/art/ship';
import { CAPTAIN_DOWN, CRAB, SKELETON, WRAITH, SERPENT_HEAD, WHALE, GULL } from '../src/art/actors';
import { STRUCTURES as STRUCT_ART, HOUSES, FORTS, FORT_FLAG, ROOFS, TREE, PALM, JUNGLE_TREE, PINE, SNOW_PINE, DEAD_TREE, SHRINE, CLAIM_STONE } from '../src/art/world';
import { CHEST, LOCKED_CHEST, GOLD_CHEST, BOTTLE, WRECK } from '../src/art/props';
import { BIOME_NAMES, ISLAND_TYPE_NAMES, FACTION_PORT_NAMES } from '../src/world/worldgen';
import { TUTORIAL } from '../src/game/quests';
import { MIX, GOLD, ROLLS, LootKind } from '../src/game/loot';
import { MOB_BASE, MOB_LEVEL_SCALE } from '../src/game/avatar';
import { parseDesign, CELL, Design } from '../src/game/design';
import { SINK_AT } from '../src/game/ship';
import { DAY_LEN } from '../src/game/env';
import { shipPixels, PAD } from '../src/render/shipSprite';

const ROOT = dirname(fileURLToPath(import.meta.url));
const REPO = join(ROOT, '..');

const CRC = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Buffer {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  Buffer.from(data).copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

interface Img {
  px: Uint32Array;
  w: number;
  h: number;
}

function png(img: Img, scale: number): Buffer {
  const w = img.w * scale;
  const h = img.h * scale;
  const src = new Uint8Array(img.px.buffer, img.px.byteOffset, img.px.byteLength);
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1);
    const sy = Math.floor(y / scale);
    for (let x = 0; x < w; x++) {
      const s = (sy * img.w + Math.floor(x / scale)) * 4;
      const d = row + 1 + x * 4;
      raw[d] = src[s];
      raw[d + 1] = src[s + 1];
      raw[d + 2] = src[s + 2];
      raw[d + 3] = src[s + 3];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', new Uint8Array(0))]);
}

function artImg(a: Art, swap?: Swap): Img {
  const clean: Art = { w: a.w, h: a.h, rows: a.rows.map((r) => r.replace(/,/g, '.')) };
  return { px: pixels(clean, swap), w: a.w, h: a.h };
}

function crop(img: Img, margin = 1): Img {
  let x0 = img.w, y0 = img.h, x1 = -1, y1 = -1;
  for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) if (img.px[y * img.w + x] >>> 24) {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  if (x1 < 0) return img;
  x0 = Math.max(0, x0 - margin);
  y0 = Math.max(0, y0 - margin);
  x1 = Math.min(img.w - 1, x1 + margin);
  y1 = Math.min(img.h - 1, y1 + margin);
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const px = new Uint32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) px[y * w + x] = img.px[(y + y0) * img.w + x + x0];
  return { px, w, h };
}

function over(dst: Img, src: Img, ox: number, oy: number): void {
  for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) {
    const c = src.px[y * src.w + x];
    if (!(c >>> 24)) continue;
    const X = ox + x;
    const Y = oy + y;
    if (X < 0 || Y < 0 || X >= dst.w || Y >= dst.h) continue;
    dst.px[Y * dst.w + X] = c;
  }
}

function designImg(d: Design, sailColor: number): Img {
  const s = shipPixels(d, null, null);
  const img: Img = { px: new Uint32Array(s.px), w: s.w, h: s.h };
  for (let cy = 0; cy < d.h; cy++) for (let cx = 0; cx < d.w; cx++) {
    const i = cy * d.w + cx;
    const comp = COMPONENTS[d.part[i]];
    if (!comp || !d.hull[i]) continue;
    const mx = PAD + cx * CELL + CELL / 2;
    const my = PAD + cy * CELL + CELL / 2;
    if (comp.sail && SAILS[comp.sail.style]) {
      const set = SAILS[comp.sail.style];
      const a = set.full;
      over(img, artImg(a, ramp(sailColor)), mx - set.ax, my - (set.ay ?? a.h - 1));
    } else if (PARTS[comp.key]?.top) {
      const a = PARTS[comp.key].art;
      over(img, artImg(a), mx - Math.floor(a.w / 2), my - Math.floor(a.h / 2));
    }
  }
  return crop(img, 2);
}

function partImg(c: ComponentDef): Img {
  if (c.sail && SAILS[c.sail.style]) return crop(artImg(SAILS[c.sail.style].full));
  const d: Design = { w: 1, h: 1, hull: [c.kind === 'hull' ? c.id : 2], part: [c.kind === 'part' ? c.id : 0], dir: [0], keel: 0, sailColor: 0xe8dcc0, name: '' };
  return designImg(d, 0xe8dcc0);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pct = (v: number) => `${Math.round(v * 100)}%`;
const deg = (r: number) => `${Math.round((r * 180) / Math.PI)}°`;

const ITEM: Record<string, ItemDef> = {};
for (const it of ITEMS) ITEM[it.id] = it;
const CAT_NAMES: Record<ItemCat, string> = { trade: 'Trade goods', supply: 'Supplies', ammo: 'Ammunition', material: 'Materials', tool: 'Tools', equip: 'Equipment', treasure: 'Treasure', relic: 'Relics', map: 'Maps' };
const RARITY = ['Common', 'Uncommon', 'Rare', 'Very rare', 'Legendary'];
const STATION_NAMES: Record<Station, string> = { sail: 'Sails', oar: 'Oars', helm: 'Helm', gun: 'Guns', mortar: 'Mortar', magazine: 'Powder magazine', workshop: 'Workshop', sickbay: 'Sick bay', galley: 'Galley', nest: "Crow's nest", cargo: 'Cargo hold', quarters: 'Quarters' };
const PLACE: Record<ComponentDef['place'], string> = { any: 'Anywhere on the deck', edge: 'On the edge of the hull, facing outward', bow: 'At the bow (front)', stern: 'At the stern (back)' };
const LOOT_NAMES: Record<LootKind, string> = { flotsam: 'Floating flotsam', chest: 'Island chests', buried: 'Dig spots', treasure: 'Treasure map hoards', wreck: 'Shipwrecks', shrine: 'Shrines', merchant: 'Merchant ships', pirate: 'Pirate ships', navy: 'Navy ships', ghost: 'Ghost ships', hunter: 'Bounty hunters', mob: 'Land creatures', bottle: 'Messages in bottles' };
const FACTION_NAMES: Record<string, string> = { pirate: 'Pirates (the Brethren)', navy: 'Crown Navy', merchant: 'Merchant Guild', ghost: 'Ghost ships', hunter: 'Bounty hunters' };

interface Page {
  path: string;
  title: string;
  body: string;
}

const pages: Page[] = [];
const images = new Map<string, string>();

function rel(from: string, to: string): string {
  const depth = from.split('/').length - 1;
  return '../'.repeat(depth) + to;
}

function add(path: string, title: string, body: string): void {
  pages.push({ path, title, body });
}

function img(path: string, im: Img, scale: number): string {
  let uri = images.get(path);
  if (!uri) {
    uri = `data:image/png;base64,${png(im, scale).toString('base64')}`;
    images.set(path, uri);
  }
  return `${uri}" width="${im.w * scale}" height="${im.h * scale}`;
}

function imgTag(src: string, alt: string): string {
  return `<img src="${src}" alt="${esc(alt)}">`;
}

function table(head: string[], rows: string[][]): string {
  return `<div class="t"><table>\n<tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>\n${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}\n</table></div>`;
}

function mats(m: Record<string, number>): string {
  const e = Object.entries(m);
  return e.length ? e.map(([id, n]) => `${n} × <a href="@@ROOT@@items/${id}.html">${esc(ITEM[id]?.name ?? id)}</a>`).join(', ') : 'none';
}

const itemLink = (id: string) => `<a href="@@ROOT@@items/${id}.html">${esc(ITEM[id]?.name ?? id)}</a>`;
const partLink = (c: ComponentDef) => `<a href="@@ROOT@@parts/${c.key}.html">${esc(c.name)}</a>`;
const roleLink = (id: string) => `<a href="@@ROOT@@crew/${id}.html">${esc(ROLES.find((r) => r.id === id)?.name ?? id)}</a>`;

const iconImg = (id: string, scale = 3) => {
  const ic = ICONS[id];
  return ic ? imgTag(img(`img/items/${id}.png`, artImg(ic.a, ic.s), scale), ITEM[id]?.name ?? id) : '';
};

function sailEff(c: ComponentDef, angle: number): number {
  const s = c.sail!;
  return s.a + s.b * Math.cos(angle) + s.c * Math.sin(angle);
}

const PARTS_LIST = COMPONENTS.filter((c) => c.id > 0);

function itemPages(): void {
  const byCat = new Map<ItemCat, ItemDef[]>();
  for (const it of ITEMS) {
    if (!byCat.has(it.cat)) byCat.set(it.cat, []);
    byCat.get(it.cat)!.push(it);
  }
  let body = `<h1>Items</h1>\n<p>Every item in the game (${ITEMS.length}). Prices are base prices; each port's market moves them up or down.</p>\n`;
  body += `<ul>${[...byCat.keys()].map((c) => `<li><a href="#${c}">${CAT_NAMES[c]}</a> (${byCat.get(c)!.length})</li>`).join('')}</ul>\n`;
  for (const [cat, list] of byCat) {
    body += `<h2 id="${cat}">${CAT_NAMES[cat]}</h2>\n` + table(['', 'Item', 'Price', 'Weight', 'Rarity', 'Description'],
      list.map((it) => [iconImg(it.id, 2), itemLink(it.id), `${it.price}g`, `${it.weight}`, RARITY[it.rarity] ?? `${it.rarity}`, esc(it.desc)])) + '\n';
  }
  add('items/index.html', 'Items', body);

  for (const it of ITEMS) {
    const facts: string[][] = [['Category', `<a href="@@ROOT@@items/index.html#${it.cat}">${CAT_NAMES[it.cat]}</a>`], ['Base price', `${it.price} gold`], ['Weight', `${it.weight}`], ['Rarity', RARITY[it.rarity] ?? `${it.rarity}`]];
    if (it.food) facts.push(['Food', `feeds ${it.food} crew for a day`]);
    if (it.water) facts.push(['Water', `waters ${it.water} crew for a day`]);
    if (it.morale) facts.push(['Morale', `${it.morale > 0 ? '+' : ''}${it.morale} when eaten or drunk`]);
    if (it.heal) facts.push(['Healing', `${it.heal}`]);
    if (it.ammo) facts.push(['Ammunition type', cap(it.ammo)]);
    if (it.slot) facts.push(['Equipment slot', cap(it.slot)]);
    if (it.combat) facts.push(['Combat', `+${it.combat}`]);
    if (it.defense) facts.push(['Defense', `+${it.defense}`]);
    if (it.usable) facts.push(['Usable', 'yes, from the hold']);
    if (it.passive) for (const [k, v] of Object.entries(it.passive)) facts.push([`Passive: ${k}`, `${v}`]);
    if (it.biomes?.length) facts.push(['Cheapest in', it.biomes.map((b) => `<a href="@@ROOT@@world.html#biomes">${BIOME_NAMES[b]}</a>`).join(', ')]);
    const usedBy = [
      ...PARTS_LIST.filter((c) => c.mats[it.id]).map((c) => `${partLink(c)} (${c.mats[it.id]})`),
      ...STRUCTURES.filter((s) => s.mats[it.id]).map((s) => `<a href="@@ROOT@@buildings/${s.id}.html">${esc(s.name)}</a> (${s.mats[it.id]})`)
    ];
    const madeBy = STRUCTURES.filter((s) => s.produce?.some((p) => p.item === it.id) || (s.id === 'plantation' && Object.values(PLANTATION_CROPS).includes(it.id)))
      .map((s) => `<a href="@@ROOT@@buildings/${s.id}.html">${esc(s.name)}</a>`);
    const found = (Object.keys(MIX) as LootKind[]).filter((k) => MIX[k][it.cat]).map((k) => {
      const total = Object.values(MIX[k]).reduce((a, b) => a + (b ?? 0), 0);
      return `${LOOT_NAMES[k]} (${pct((MIX[k][it.cat] ?? 0) / total)} of rolls are ${CAT_NAMES[it.cat].toLowerCase()})`;
    });
    let body = `<h1>${esc(it.name)}</h1>\n<p>${iconImg(it.id, 6)}</p>\n<p>${esc(it.desc)}</p>\n` + table(['Property', 'Value'], facts) + '\n';
    if (usedBy.length) body += `<h2>Used to build</h2>\n<ul>${usedBy.map((u) => `<li>${u}</li>`).join('')}</ul>\n`;
    if (madeBy.length) body += `<h2>Produced by</h2>\n<ul>${madeBy.map((u) => `<li>${u}</li>`).join('')}</ul>\n`;
    if (found.length) body += `<h2>Where to find it</h2>\n<p>Can drop from:</p>\n<ul>${found.map((u) => `<li>${u}</li>`).join('')}</ul>\n<p>See <a href="@@ROOT@@loot.html">Loot</a>.</p>\n`;
    add(`items/${it.id}.html`, it.name, body);
  }
}

function partSummary(c: ComponentDef): string {
  const bits: string[] = [];
  if (c.kind === 'hull') bits.push(`${c.hp} hp per cell`, `drag ×${c.drag}`, c.armor ? `${pct(c.armor)} armor` : '');
  if (c.sail) bits.push(`power ${c.sail.power}`);
  if (c.oar) bits.push(`rowing power ${c.oar}`);
  if (c.turn) bits.push(`turning +${c.turn}`);
  if (c.gun) bits.push(`${c.gun.dmg} dmg`, `range ${c.gun.range}`, `reload ${c.gun.reload}s`);
  if (c.cargo) bits.push(`+${c.cargo} cargo`);
  if (c.crew) bits.push(`+${c.crew} crew`);
  if (c.vision) bits.push(`+${c.vision} sight`);
  if (c.repair) bits.push(`repairs ${c.repair}/s`);
  if (c.heal) bits.push(`heals crew`);
  if (c.reloadBoost) bits.push(`${pct(c.reloadBoost)} faster reloads`);
  if (c.foodSave) bits.push(`${pct(c.foodSave)} less food`);
  if (c.ram) bits.push(`ram damage ×${c.ram}`);
  if (c.luck) bits.push(`+${pct(c.luck)} loot`);
  return bits.filter(Boolean).join(', ');
}

function partPages(): void {
  const cats: [ComponentDef['cat'], string][] = [['hull', 'Hull materials'], ['sail', 'Sails and oars'], ['control', 'Steering'], ['weapon', 'Weapons'], ['utility', 'Utility']];
  let body = `<h1>Ship parts</h1>\n<p>Everything the Shipwright can build (${PARTS_LIST.length} components). Parts sit on the cells of your keel; see <a href="@@ROOT@@ship-building.html">Ship building</a> and <a href="@@ROOT@@hulls.html">Keels</a>.</p>\n`;
  for (const [cat, name] of cats) {
    const list = PARTS_LIST.filter((c) => c.cat === cat);
    body += `<h2 id="${cat}">${name}</h2>\n` + table(['', 'Part', 'Price', 'Materials', 'Fame needed', 'Effect'],
      list.map((c) => [imgTag(img(`img/parts/${c.key}.png`, partImg(c), 3), c.name), partLink(c), `${c.price}g`, mats(c.mats), `${c.fame}`, partSummary(c)])) + '\n';
  }
  add('parts/index.html', 'Ship parts', body);

  for (const c of PARTS_LIST) {
    const facts: string[][] = [['Type', c.kind === 'hull' ? 'Hull material' : cap(c.cat)], ['Price', `${c.price} gold`], ['Materials', mats(c.mats)], ['Fame needed', `${c.fame}`], ['Mass', `${c.mass}`], ['Hit points', `${c.hp}`], ['Placement', PLACE[c.place]]];
    if (c.max) facts.push(['Limit', `${c.max} per ship`]);
    if (c.rotates) facts.push(['Can be rotated', 'yes']);
    if (c.station) {
      facts.push(['Crew station', `${STATION_NAMES[c.station]}, ${c.slots} ${c.slots === 1 ? 'person' : 'people'}`]);
      facts.push(['Works unmanned', c.unmanned ? `at ${pct(c.unmanned)} effectiveness` : 'no']);
    }
    if (c.drag) facts.push(['Drag', `×${c.drag}`]);
    if (c.armor) facts.push(['Armor', pct(c.armor)]);
    if (c.turn) facts.push(['Turning bonus', `+${c.turn}`]);
    if (c.oar) facts.push(['Rowing power', `${c.oar}`]);
    if (c.sail) facts.push(['Sail power', `${c.sail.power}`]);
    if (c.gun) {
      const g = c.gun;
      facts.push(['Damage', `${g.dmg}${g.splash ? ` (splash radius ${g.splash})` : ''}`], ['Range', `${g.range}`], ['Reload', `${g.reload} s`], ['Firing arc', deg(g.arc * 2)], ['Ammunition', g.ammo === 'free' ? 'none needed' : g.ammo === 'mortar' ? itemLink('mortar_shell') : 'cannonballs and special shot']);
    }
    for (const [k, label] of [['cargo', 'Cargo capacity'], ['crew', 'Crew capacity'], ['vision', 'Sight range'], ['repair', 'Repair rate'], ['heal', 'Healing'], ['morale', 'Morale'], ['ram', 'Ram damage multiplier'], ['luck', 'Loot bonus']] as const) {
      const v = c[k];
      if (v) facts.push([label, k === 'luck' ? `+${pct(v)}` : `+${v}`]);
    }
    if (c.reloadBoost) facts.push(['Reload speed', `+${pct(c.reloadBoost)} for every gun`]);
    if (c.foodSave) facts.push(['Food saved', pct(c.foodSave)]);
    if (c.explosive) facts.push(['Danger', 'explodes when destroyed']);
    let body = `<h1>${esc(c.name)}</h1>\n<p>${imgTag(img(`img/parts/${c.key}-large.png`, partImg(c), 6), c.name)}</p>\n<p>${esc(c.desc)}</p>\n` + table(['Property', 'Value'], facts) + '\n';
    if (c.sail) {
      body += `<h2>Power by wind angle</h2>\n<p>The share of this sail's power you get depending on where the wind comes from: 0° is wind straight from behind, 180° is sailing straight into it.</p>\n` +
        table(['Wind from', 'Power'], [0, 45, 90, 135, 180].map((a) => [`${a}°`, pct(Math.max(0, sailEff(c, (a * Math.PI) / 180)))])) + '\n';
    }
    if (c.station) {
      const best = ROLES.filter((r) => r.eff[c.station!]).sort((a, b) => (b.eff[c.station!] ?? 0) - (a.eff[c.station!] ?? 0));
      if (best.length) body += `<h2>Best crew for this station</h2>\n<ul>${best.map((r) => `<li>${roleLink(r.id)} (${pct(r.eff[c.station!] ?? 0)})</li>`).join('')}</ul>\n`;
    }
    add(`parts/${c.key}.html`, c.name, body);
  }
}

function keelTable(): string {
  return table(['Keel', 'Deck cells', 'Grid', 'Price', 'Fame needed'], KEELS.map((k) => [esc(k.name), `${k.cells}`, `${k.w} × ${k.h}`, k.price ? `${k.price}g` : 'free', `${k.fame}`]));
}

function hullPage(): void {
  const hulls = PARTS_LIST.filter((c) => c.kind === 'hull');
  add('hulls.html', 'Keels and hulls', `<h1>Keels and hulls</h1>\n<p>The keel sets how many deck cells you can build on. Bigger keels need more fame. Change keels at any Shipwright.</p>\n${keelTable()}\n<h2>Hull materials</h2>\n` +
    table(['', 'Material', 'Price per cell', 'Hit points', 'Drag', 'Armor'], hulls.map((c) => [imgTag(img(`img/parts/${c.key}.png`, partImg(c), 3), c.name), partLink(c), `${c.price}g`, `${c.hp}`, `×${c.drag}`, c.armor ? pct(c.armor) : '-'])) + '\n');
}

function crewPages(): void {
  let body = `<h1>Crew</h1>\n<p>Hire crew at port taverns. Each role works some stations better than others. See <a href="@@ROOT@@crew-guide.html">Managing your crew</a>.</p>\n<h2>Roles</h2>\n` +
    table(['Role', 'Hire cost', 'Daily wage', 'Fighting', 'Best at', 'Description'], ROLES.map((r) => [roleLink(r.id), `${r.hire}g`, `${r.wage}g`, `×${r.combat}`, r.prefers.map((s) => STATION_NAMES[s]).join(', '), esc(r.desc)])) +
    `\n<h2 id="traits">Traits</h2>\n<p>Every sailor can have traits. Good traits are worth paying for.</p>\n` + table(['Trait', 'Kind', 'Effect'], TRAITS.map((t) => [esc(t.name), t.good ? 'Good' : 'Bad', esc(t.desc)])) + '\n';
  add('crew/index.html', 'Crew', body);
  for (const r of ROLES) {
    const eff = Object.entries(r.eff).map(([st, v]) => {
      const parts = PARTS_LIST.filter((c) => c.station === st);
      return [STATION_NAMES[st as Station], pct(v ?? 0), parts.map(partLink).join(', ') || '-'];
    });
    add(`crew/${r.id}.html`, r.name, `<h1>${esc(r.name)}</h1>\n<p>${esc(r.desc)}</p>\n` +
      table(['Property', 'Value'], [['Hire cost', `${r.hire} gold`], ['Daily wage', `${r.wage} gold`], ['Fighting strength', `×${r.combat}`], ['Prefers', r.prefers.map((s) => STATION_NAMES[s]).join(', ')]]) +
      `\n<h2>Station skill</h2>\n` + table(['Station', 'Effectiveness', 'Parts with this station'], eff) + '\n');
  }
}

function buildingPages(): void {
  const prodText = (s: (typeof STRUCTURES)[number]) => s.produce?.map((p) => `${p.perHour} ${s.id === 'plantation' ? 'crop (depends on the sea)' : itemLink(p.item)} per hour`).join(', ') ?? '-';
  let body = `<h1>Island buildings</h1>\n<p>Buildings you can put on an island you own. See <a href="@@ROOT@@islands.html">Owning islands</a>.</p>\n` +
    table(['', 'Building', 'Price', 'Materials', 'Produces', 'Storage'], STRUCTURES.map((s) => {
      const a = STRUCT_ART[s.id];
      return [a ? imgTag(img(`img/buildings/${s.id}.png`, crop(artImg(a, roofSwap(s.roof))), 1), s.name) : '', `<a href="@@ROOT@@buildings/${s.id}.html">${esc(s.name)}</a>`, `${s.price}g`, mats(s.mats), prodText(s), s.storage ? `+${s.storage}` : '-'];
    })) + '\n';
  add('buildings/index.html', 'Island buildings', body);
  for (const s of STRUCTURES) {
    const a = STRUCT_ART[s.id];
    let b = `<h1>${esc(s.name)}</h1>\n${a ? `<p>${imgTag(img(`img/buildings/${s.id}-large.png`, crop(artImg(a, roofSwap(s.roof))), 3), s.name)}</p>\n` : ''}<p>${esc(s.desc)}</p>\n` +
      table(['Property', 'Value'], [['Price', `${s.price} gold`], ['Materials', mats(s.mats)], ['Produces', prodText(s)], ['Storage', s.storage ? `+${s.storage}` : '-']]) + '\n';
    if (s.id === 'plantation') b += `<h2>Crop by sea</h2>\n` + table(['Sea', 'Crop'], Object.entries(PLANTATION_CROPS).map(([bi, id]) => [BIOME_NAMES[+bi], itemLink(id)])) + '\n';
    add(`buildings/${s.id}.html`, s.name, b);
  }
}

function roofSwap(c: number): Swap {
  const sh = (f: number) => (Math.min(255, Math.round(((c >> 16) & 255) * f)) << 16) | (Math.min(255, Math.round(((c >> 8) & 255) * f)) << 8) | Math.min(255, Math.round((c & 255) * f));
  return { e: sh(1.18), R: c, r: sh(0.8) };
}

function shipPages(): void {
  const byFaction = new Map<string, typeof TEMPLATES>();
  for (const t of TEMPLATES) {
    if (!byFaction.has(t.faction)) byFaction.set(t.faction, []);
    byFaction.get(t.faction)!.push(t);
  }
  const shipImg = (t: (typeof TEMPLATES)[number], scale: number, suffix = '') => {
    const d = parseDesign(t.rows, t.hull, t.sail, t.name);
    return imgTag(img(`img/ships/${t.id}${suffix}.png`, designImg(d, t.sail), scale), t.name);
  };
  let body = `<h1>Ships at sea</h1>\n<p>The ships you will meet (${TEMPLATES.length} kinds). Level is the danger level of the waters they sail; see <a href="@@ROOT@@world.html">The world</a>.</p>\n`;
  for (const [f, list] of byFaction) {
    body += `<h2>${esc(FACTION_NAMES[f] ?? f)}</h2>\n` + table(['', 'Ship', 'Levels', 'Hull'], list.map((t) => [shipImg(t, 2), `<a href="@@ROOT@@ships/${t.id}.html">${esc(t.name)}</a>`, `${t.min}-${t.max}`, partLink(COMPONENTS[t.hull])])) + '\n';
  }
  add('ships/index.html', 'Ships at sea', body);
  for (const t of TEMPLATES) {
    const counts = new Map<number, number>();
    for (const r of t.rows) for (const ch of r) {
      const id = PART_CHARS[ch];
      if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    const mix = MIX[t.faction as LootKind];
    const total = Object.values(mix).reduce((a, b) => a + (b ?? 0), 0);
    const g = GOLD[t.faction as LootKind];
    add(`ships/${t.id}.html`, t.name, `<h1>${esc(t.name)}</h1>\n<p>${shipImg(t, 4, '-large')}</p>\n` +
      table(['Property', 'Value'], [['Faction', esc(FACTION_NAMES[t.faction] ?? t.faction)], ['Appears at levels', `${t.min} to ${t.max}`], ['Hull', partLink(COMPONENTS[t.hull]) + (t.hullHigh ? ` (${partLink(COMPONENTS[t.hullHigh])} at high levels)` : '')]]) +
      `\n<h2>Fitted with</h2>\n<ul>${[...counts].map(([id, n]) => `<li>${n} × ${partLink(COMPONENTS[id])}</li>`).join('')}</ul>\n` +
      `<h2>Loot</h2>\n<p>About ${g[0]}-${g[1]} gold, scaled by level, plus ${ROLLS[t.faction as LootKind].join('-')} item rolls:</p>\n<ul>${Object.entries(mix).map(([c, w]) => `<li><a href="@@ROOT@@items/index.html#${c}">${CAT_NAMES[c as ItemCat]}</a>: ${pct((w ?? 0) / total)}</li>`).join('')}</ul>\n`);
  }
}

function creaturesPage(): void {
  const art: Record<string, Art> = { crab: CRAB[0], skeleton: SKELETON[0], wraith: WRAITH[0] };
  const rows = Object.entries(MOB_BASE).map(([k, b]) => [imgTag(img(`img/creatures/${k}.png`, crop(artImg(art[k])), 3), k), cap(k), `${b.hp}`, `${b.dmg}`, `${b.speed}`]);
  add('creatures.html', 'Creatures', `<h1>Creatures</h1>\n<h2>On land</h2>\n<p>Islands are guarded by creatures that scale with the island's danger level: each level above 1 adds ${pct(MOB_LEVEL_SCALE)} to health and damage.</p>\n` +
    table(['', 'Creature', 'Health (level 1)', 'Damage (level 1)', 'Speed'], rows) +
    `\n<h2>At sea</h2>\n<p>${imgTag(img('img/creatures/serpent.png', crop(artImg(SERPENT_HEAD)), 4), 'Sea serpent')} Sea serpents hunt in dangerous waters. They dive, surface and coil around ships, and drop rich loot when slain.</p>\n` +
    `<p>${imgTag(img('img/creatures/whale.png', crop(artImg(WHALE)), 3), 'Whale')} ${imgTag(img('img/creatures/gull.png', crop(artImg(GULL[0])), 4), 'Gull')} Whales and gulls are harmless and only for company.</p>\n`);
}

function lootPage(): string {
  const cats = Object.keys(CAT_NAMES) as ItemCat[];
  return table(['Source', 'Gold', 'Items', ...cats.map((c) => CAT_NAMES[c])], (Object.keys(MIX) as LootKind[]).map((k) => {
    const total = Object.values(MIX[k]).reduce((a, b) => a + (b ?? 0), 0);
    const g = GOLD[k];
    return [LOOT_NAMES[k], g[1] ? `${g[0]}-${g[1]}` : '-', ROLLS[k].join('-'), ...cats.map((c) => (MIX[k][c] ? pct((MIX[k][c] ?? 0) / total) : ''))];
  }));
}

function controlsTable(): string {
  const md = readFileSync(join(REPO, 'README.md'), 'utf8');
  const sec = md.split('## Controls')[1]?.split('\n## ')[0] ?? '';
  const rows = sec.split('\n').filter((l) => l.startsWith('|') && !l.includes('---')).map((l) => l.split('|').slice(1, -1).map((c) => esc(c.trim())));
  const extra = sec.split('\n').filter((l) => l.trim() && !l.startsWith('|')).map((l) => `<p>${esc(l.trim())}</p>`).join('\n');
  return rows.length ? table(rows[0], rows.slice(1)) + '\n' + extra : '';
}

function gallery(): string {
  const shots: [string, Art, Swap | undefined, number][] = [
    ['captain', CAPTAIN_DOWN[0], undefined, 4], ['tree', TREE, undefined, 3], ['palm', PALM, undefined, 3], ['jungle-tree', JUNGLE_TREE, undefined, 3],
    ['pine', PINE, undefined, 3], ['snow-pine', SNOW_PINE, undefined, 3], ['dead-tree', DEAD_TREE, undefined, 3], ['shrine', SHRINE, undefined, 3], ['claim-stone', CLAIM_STONE, undefined, 3],
    ['chest', CHEST, undefined, 4], ['locked-chest', LOCKED_CHEST, undefined, 4], ['gold-chest', GOLD_CHEST, undefined, 4], ['bottle', BOTTLE, undefined, 4], ['wreck', WRECK, undefined, 3]
  ];
  return shots.map(([n, a, s, k]) => imgTag(img(`img/world/${n}.png`, crop(artImg(a, s)), k), n.replace(/-/g, ' '))).join('\n');
}

function townGallery(): string {
  const h = HOUSES.map((b, i) => imgTag(img(`img/world/house-${i}.png`, crop(artImg(b.art, ROOFS[i % ROOFS.length])), 2), 'House'));
  const f = FORTS.map((a, i) => imgTag(img(`img/world/fort-${i}.png`, crop(artImg(a, FORT_FLAG[i % FORT_FLAG.length])), 1), 'Fort'));
  return h.join('\n') + '<br>\n' + f.join('\n');
}

const TOKENS: Record<string, () => string> = {
  game_url: () => GAME_URL,
  tutorial: () => `<ol>${TUTORIAL.map((t) => `<li>${esc(t.text)}${t.reward ? ` (reward: ${t.reward} gold)` : ''}</li>`).join('')}</ol>`,
  controls: controlsTable,
  keels: keelTable,
  day_minutes: () => `${DAY_LEN / 60}`,
  sink_at: () => pct(SINK_AT),
  biomes: () => `<ul>${BIOME_NAMES.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`,
  island_types: () => `<ul>${ISLAND_TYPE_NAMES.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`,
  port_factions: () => `<ul>${FACTION_PORT_NAMES.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`,
  loot_table: lootPage,
  sails: () => table(['Sail', 'Power', ...[0, 45, 90, 135, 180].map((a) => `Wind from ${a}°`)], PARTS_LIST.filter((c) => c.sail).map((c) => [partLink(c), `${c.sail!.power}`, ...[0, 45, 90, 135, 180].map((a) => pct(Math.max(0, sailEff(c, (a * Math.PI) / 180))))])),
  guns: () => table(['Gun', 'Damage', 'Range', 'Reload', 'Arc', 'Ammo'], PARTS_LIST.filter((c) => c.gun).map((c) => [partLink(c), `${c.gun!.dmg}`, `${c.gun!.range}`, `${c.gun!.reload} s`, deg(c.gun!.arc * 2), c.gun!.ammo === 'free' ? 'none' : c.gun!.ammo === 'mortar' ? 'mortar shells' : 'shot'])),
  ammo: () => `<ul>${ITEMS.filter((i) => i.ammo).map((i) => `<li>${itemLink(i.id)}: ${esc(i.desc)}</li>`).join('')}</ul>`,
  food: () => table(['Item', 'Feeds', 'Waters', 'Morale'], ITEMS.filter((i) => i.food || i.water).map((i) => [itemLink(i.id), i.food ? `${i.food}` : '', i.water ? `${i.water}` : '', i.morale ? `${i.morale > 0 ? '+' : ''}${i.morale}` : ''])),
  gallery,
  town_gallery: townGallery,
  counts: () => `<ul><li><a href="@@ROOT@@items/index.html">${ITEMS.length} items</a></li><li><a href="@@ROOT@@parts/index.html">${PARTS_LIST.length} ship parts</a> and <a href="@@ROOT@@hulls.html">${KEELS.length} keels</a></li><li><a href="@@ROOT@@crew/index.html">${ROLES.length} crew roles and ${TRAITS.length} traits</a></li><li><a href="@@ROOT@@buildings/index.html">${STRUCTURES.length} island buildings</a></li><li><a href="@@ROOT@@ships/index.html">${TEMPLATES.length} kinds of ship</a></li><li>${BIOME_NAMES.length} seas and ${ISLAND_TYPE_NAMES.length} island types</li></ul>`
};

function prose(): void {
  const dir = join(ROOT, 'pages');
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.html')).sort()) {
    let src = readFileSync(join(dir, f), 'utf8');
    src = src.replace(/\{\{(\w+)\}\}/g, (_, k) => {
      if (!TOKENS[k]) throw new Error(`wiki: unknown token {{${k}}} in ${f}`);
      return TOKENS[k]();
    });
    const title = /<h1>(.*?)<\/h1>/.exec(src)?.[1] ?? f.replace('.html', '');
    add(f === 'main.html' ? 'index.html' : f, f === 'main.html' ? 'Main page' : title.replace(/<[^>]+>/g, ''), src);
  }
}

function changes(): void {
  let log: string[] = [];
  try {
    log = execSync('git log -n 60 --date=short --pretty=format:%ad%x09%s', { cwd: REPO, encoding: 'utf8' }).split('\n').filter(Boolean);
  } catch {
    log = [];
  }
  const body = log.length
    ? `<h1>Recent changes</h1>\n<p>The latest updates to the game, newest first.</p>\n<ul>${log.map((l) => {
        const [d, s] = l.split('\t');
        return `<li>${esc(d)}: ${esc(s)}</li>`;
      }).join('\n')}</ul>\n`
    : '<h1>Recent changes</h1>\n<p>No history available in this build.</p>\n';
  add('changes.html', 'Recent changes', body);
}

const NAV: [string, string][] = [
  ['index.html', 'Main page'], ['getting-started.html', 'Getting started'], ['controls.html', 'Controls'], ['sailing.html', 'Sailing'], ['ship-building.html', 'Ship building'],
  ['combat.html', 'Combat'], ['crew-guide.html', 'Crew'], ['trading.html', 'Trading'], ['treasure.html', 'Treasure'], ['islands.html', 'Islands'], ['world.html', 'World'],
  ['items/index.html', 'Items'], ['parts/index.html', 'Ship parts'], ['ships/index.html', 'Ships'], ['changes.html', 'Recent changes']
];

function commitInfo(): string {
  try {
    const out = execSync('git log -1 --date=short --pretty=format:%h%x09%ad', { cwd: REPO, encoding: 'utf8' }).trim();
    const [h, d] = out.split('\t');
    return `version ${esc(h)} (${esc(d)})`;
  } catch {
    return 'the current version';
  }
}

export const GAME_URL = 'https://nattoooo.github.io/plunder/';

const STYLE = `<style>
:root { --bg: #ffffff; --fg: #111111; --link: #0b57d0; --visited: #6a3ab2; --rule: #8c8c8c; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #121212; --fg: #e6e6e6; --link: #8ab4f8; --visited: #c3a6f2; --rule: #5c5c5c; color-scheme: dark; } }
:root[data-theme="dark"] { --bg: #121212; --fg: #e6e6e6; --link: #8ab4f8; --visited: #c3a6f2; --rule: #5c5c5c; color-scheme: dark; }
body { background: var(--bg); color: var(--fg); font: 16px/1.45 Georgia, "Times New Roman", serif; padding-block: 8px 24px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
a { color: var(--link); }
a:visited { color: var(--visited); }
hr { border: 0; border-top: 1px solid var(--rule); }
.t { overflow-x: auto; }
table { border-collapse: collapse; }
th, td { border: 1px solid var(--rule); padding: 4px 6px; text-align: left; vertical-align: middle; }
img { image-rendering: pixelated; max-width: 100%; height: auto; vertical-align: middle; }
</style>`;

export function buildWiki(outDir: string): { pages: number; images: number; files: string[] } {
  pages.length = 0;
  images.clear();
  prose();
  itemPages();
  partPages();
  hullPage();
  crewPages();
  buildingPages();
  shipPages();
  creaturesPage();
  changes();
  const known = new Set(pages.map((p) => p.path));
  if (existsSync(outDir)) rmSync(outDir, { recursive: true });
  const ver = commitInfo();
  const files: string[] = [];
  for (const p of pages) {
    const root = rel(p.path, '');
    const nav = NAV.map(([href, label]) => `<a href="${root}${href}">${label}</a>`).join(' | ');
    const body = p.body.replace(/@@ROOT@@/g, root);
    const content = `<p><a href="${GAME_URL}">Play Plunder</a> | ${nav}</p>\n<hr>\n${body}\n<hr>\n<p>This wiki is generated from the game's own data, last updated for ${ver}.</p>\n`;
    const html = p.path === 'index.html'
      ? `<title>Plunder Wiki</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${STYLE}\n${content}`
      : `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="claude:viewport-fit-sides" content="cover">\n<title>${esc(p.title)} - Plunder Wiki</title>\n${STYLE}\n</head>\n<body>\n${content}</body>\n</html>\n`;
    const file = join(outDir, p.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    if (p.path !== 'index.html') files.push(p.path);
  }
  const broken: string[] = [];
  for (const p of pages) {
    const dir = dirname(p.path);
    const body = p.body.replace(/@@ROOT@@/g, rel(p.path, ''));
    for (const m of body.matchAll(/href="([^"#:]+\.html)/g)) {
      const target = join(dir, m[1]).replace(/\\/g, '/');
      if (!known.has(target)) broken.push(`${p.path} -> ${m[1]}`);
    }
  }
  if (broken.length) throw new Error(`wiki: broken links\n${broken.join('\n')}`);
  return { pages: pages.length, images: images.size, files };
}

const out = process.argv[2];
if (out) {
  const r = buildWiki(out);
  writeFileSync(join(out, 'files.json'), JSON.stringify(Object.fromEntries(r.files.map((f) => [f, f]))));
  console.log(`${r.pages} pages, ${r.images} images`);
}
