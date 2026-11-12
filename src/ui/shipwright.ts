import type { Game } from '../game/game';
import { COMPONENTS, ComponentDef, KEELS } from '../data/components';
import { ITEM } from '../data/items';
import { Design, cloneDesign, validateDesign, summarize, resizeDesign, autoDir, CELL, hasHull } from '../game/design';
import { buildSprite, partPreview, PAD } from '../render/shipSprite';
import { artCanvas } from '../render/artCanvas';
import { SAILS, PARTS } from '../art/ship';
import { ramp } from '../art/palette';
import { audio } from '../audio/audio';
import { h, gold } from './dom';

const CATS: [string, string][] = [
  ['hull', 'Hull'],
  ['sail', 'Sails & Oars'],
  ['control', 'Steering'],
  ['weapon', 'Weapons'],
  ['utility', 'Utility']
];

const SAIL_COLORS = [0xe8dcc0, 0xf4f0e6, 0xc8b48a, 0x2a2a2e, 0x9a2a2a, 0x2a4a8a, 0x3a7a4a, 0xd8b04a, 0x7a4a8a, 0xe8946a];

const iconCache = new Map<string, string>();
function icon(key: string): string {
  let u = iconCache.get(key);
  if (!u) {
    u = partPreview(key, 3);
    iconCache.set(key, u);
  }
  return u;
}

export function knots(v: number): string {
  return `${(v * 0.25).toFixed(1)} kn`;
}

export interface CostInfo {
  gold: number;
  refund: number;
  mats: Record<string, number>;
  matGold: number;
  total: number;
}

export function designDiffCost(g: Game, oldD: Design, newD: Design): CostInfo {
  const count = (d: Design) => {
    const m = new Map<number, number>();
    for (let i = 0; i < d.hull.length; i++) {
      if (d.hull[i]) m.set(d.hull[i], (m.get(d.hull[i]) ?? 0) + 1);
      if (d.part[i] && d.hull[i]) m.set(d.part[i], (m.get(d.part[i]) ?? 0) + 1);
    }
    return m;
  };
  const a = count(oldD);
  const b = count(newD);
  let goldC = 0;
  let refund = 0;
  const mats: Record<string, number> = {};
  const ids = new Set([...a.keys(), ...b.keys()]);
  for (const id of ids) {
    const d = (b.get(id) ?? 0) - (a.get(id) ?? 0);
    const c = COMPONENTS[id];
    if (d > 0) {
      goldC += c.price * d;
      for (const k in c.mats) mats[k] = (mats[k] ?? 0) + c.mats[k] * d;
    } else if (d < 0) refund += Math.floor(c.price * -d * 0.5);
  }
  let matGold = 0;
  for (const k in mats) {
    const have = g.profile.inv.count(k);
    const missing = Math.max(0, mats[k] - have);
    matGold += Math.ceil(missing * ITEM[k].price * 1.25);
  }
  return { gold: goldC, refund, mats, matGold, total: goldC + matGold - refund };
}

export class Shipwright {
  el: HTMLElement;
  design: Design;
  sel: ComponentDef | null = null;
  rot = 1;
  hover = -1;
  canvas: HTMLCanvasElement;
  private cellPx = 24;
  private ox = 0;
  private oy = 0;
  private statsEl: HTMLElement;
  private palEl: HTMLElement;
  private infoEl: HTMLElement;
  private keyHandler: (e: KeyboardEvent) => void;

  constructor(private g: Game, private onDone: () => void) {
    this.design = cloneDesign(g.profile.design);
    this.canvas = h('canvas') as HTMLCanvasElement;
    this.statsEl = h('div', { cls: 'sw-stats' });
    this.palEl = h('div', { cls: 'list' });
    this.infoEl = h('div', { cls: 'hint' }, 'Select a part, then click the grid. Right-click removes. R rotates guns.');
    this.el = h('div', { cls: 'sw' },
      h('div', { cls: 'sw-pal' }, h('h3', {}, 'Parts'), this.palEl),
      h('div', { cls: 'sw-grid' }, this.canvas, h('div', { style: 'position:absolute;left:6px;bottom:4px;right:6px' }, this.infoEl)),
      this.statsEl
    );
    this.canvas.addEventListener('mousemove', (e) => {
      this.hover = this.cellAt(e);
      this.draw();
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.hover = -1;
      this.draw();
    });
    this.canvas.addEventListener('mousedown', (e) => {
      const ci = this.cellAt(e);
      if (ci < 0) return;
      if (e.button === 2) this.remove(ci);
      else this.place(ci);
    });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    this.keyHandler = (e: KeyboardEvent) => {
      if (e.code === 'KeyR') {
        this.rot = (this.rot + 1) % 4;
        if (this.hover >= 0 && this.design.part[this.hover] && COMPONENTS[this.design.part[this.hover]].rotates) {
          this.design.dir[this.hover] = this.rot;
          this.refresh();
        }
        this.draw();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
    this.buildPalette();
    this.refresh();
    requestAnimationFrame(() => this.refresh());
  }

  dispose(): void {
    window.removeEventListener('keydown', this.keyHandler);
  }

  private cellAt(e: MouseEvent): number {
    const r = this.canvas.getBoundingClientRect();
    const sx = (e.clientX - r.left) * (this.canvas.width / r.width);
    const sy = (e.clientY - r.top) * (this.canvas.height / r.height);
    const cx = Math.floor((sx - this.ox) / this.cellPx);
    const cy = Math.floor((sy - this.oy) / this.cellPx);
    if (cx < 0 || cy < 0 || cx >= this.design.w || cy >= this.design.h) return -1;
    return cy * this.design.w + cx;
  }

  private buildPalette(): void {
    this.palEl.innerHTML = '';
    const fame = this.g.profile.fame;
    for (const [cat, name] of CATS) {
      this.palEl.append(h('div', { cls: 'muted', style: 'margin:6px 4px 2px;font-family:Silkscreen' }, name));
      for (const c of COMPONENTS) {
        if (c.id === 0 || c.cat !== cat) continue;
        const locked = fame < c.fame;
        const img = h('img', { src: icon(c.key), style: 'width:2.2em;height:2.2em;image-rendering:pixelated' });
        const row = h('div', { cls: `part ${this.sel === c ? 'sel' : ''} ${locked ? 'locked' : ''}`, title: c.desc },
          img,
          h('span', { cls: 'nm' }, c.name),
          h('span', { cls: 'pr' }, locked ? `${c.fame} fame` : gold(c.price))
        );
        row.addEventListener('click', () => {
          if (locked) {
            audio.ui('error');
            this.info(`Requires ${c.fame} fame. You have ${Math.floor(fame)}.`);
            return;
          }
          audio.ui('click');
          this.sel = c;
          this.buildPalette();
          this.info(this.describe(c));
        });
        this.palEl.append(row);
      }
    }
  }

  private describe(c: ComponentDef): string {
    const bits: string[] = [c.desc];
    const st: string[] = [`HP ${c.hp}`, `Mass ${c.mass}`];
    if (c.sail) st.push(`Sail ${c.sail.power}`);
    if (c.oar) st.push(`Oars ${c.oar}`);
    if (c.gun) st.push(`Dmg ${c.gun.dmg}`, `Range ${c.gun.range}`, `Reload ${c.gun.reload}s`);
    if (c.slots) st.push(`Crew ${c.slots}`);
    if (c.armor) st.push(`Armor ${Math.round(c.armor * 100)}%`);
    const mats = Object.entries(c.mats).map(([k, v]) => `${v} ${ITEM[k].name}`).join(', ');
    return `${bits.join(' ')} [${st.join(' · ')}]${mats ? ' Needs: ' + mats : ''}`;
  }

  private info(s: string): void {
    this.infoEl.textContent = s;
  }

  private place(ci: number): void {
    const d = this.design;
    const c = this.sel;
    if (!c) {
      this.info('Pick a part from the list first.');
      return;
    }
    const x = ci % d.w;
    const y = (ci / d.w) | 0;
    if (c.kind === 'hull') {
      if (d.hull[ci] === c.id) return;
      let cells = 0;
      for (const v of d.hull) if (v) cells++;
      if (!d.hull[ci] && cells >= KEELS[d.keel].cells) {
        audio.ui('error');
        this.info(`Your ${KEELS[d.keel].name} keel supports only ${KEELS[d.keel].cells} hull tiles. Buy a bigger keel.`);
        return;
      }
      d.hull[ci] = c.id;
    } else {
      if (!d.hull[ci]) {
        audio.ui('error');
        this.info('Parts must sit on a hull tile.');
        return;
      }
      if (d.part[ci] === c.id && c.rotates) d.dir[ci] = (d.dir[ci] + 1) % 4;
      else {
        d.part[ci] = c.id;
        d.dir[ci] = c.rotates ? (c.place === 'edge' ? autoDir(d, x, y) : this.rot) : 0;
      }
    }
    audio.ui('click');
    this.refresh();
  }

  private remove(ci: number): void {
    const d = this.design;
    if (d.part[ci]) d.part[ci] = 0;
    else if (d.hull[ci]) d.hull[ci] = 0;
    else return;
    audio.ui('click');
    this.refresh();
  }

  refresh(): void {
    this.draw();
    this.renderStats();
  }

  draw(): void {
    const d = this.design;
    const parent = this.canvas.parentElement;
    const availW = Math.max(200, (parent?.clientWidth ?? 600) - 20);
    const availH = Math.max(200, (parent?.clientHeight ?? 500) - 50);
    const cp = Math.max(10, Math.floor(Math.min(availW / (d.w + 3), availH / (d.h + 3))));
    this.cellPx = cp;
    const W = (d.w + 3) * cp;
    const H = (d.h + 3) * cp;
    this.canvas.width = W;
    this.canvas.height = H;
    this.ox = Math.floor(1.5 * cp);
    this.oy = Math.floor(1.5 * cp);
    const ctx = this.canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#1e3a5a';
    ctx.fillRect(0, 0, W, H);
    for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#24466a' : '#284c72';
      ctx.fillRect(this.ox + x * cp, this.oy + y * cp, cp, cp);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = `${Math.max(10, cp * 0.45)}px Silkscreen, monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('BOW', W / 2, this.oy - cp * 0.6);
    ctx.fillText('STERN', W / 2, this.oy + d.h * cp + cp * 1.1);
    const sp = buildSprite(d, null, null, 0, 0);
    const k = cp / CELL;
    ctx.drawImage(sp.canvas, this.ox - PAD * k, this.oy - PAD * k, sp.canvas.width * k, sp.canvas.height * k);
    for (let i = 0; i < d.part.length; i++) {
      const p = d.part[i];
      if (!p || !d.hull[i]) continue;
      const c = COMPONENTS[p];
      const x = this.ox + (i % d.w) * cp;
      const y = this.oy + ((i / d.w) | 0) * cp;
      const k2 = cp / CELL;
      if (c.sail && SAILS[c.sail.style]) {
        const set = SAILS[c.sail.style];
        const a = set.full;
        const ay = set.ay ?? a.h - 1;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(artCanvas(a, ramp(d.sailColor)), x + cp / 2 - set.ax * k2, y + cp / 2 - ay * k2, a.w * k2, a.h * k2);
        ctx.globalAlpha = 1;
      }
      if (c.key === 'crows_nest') {
        const a = PARTS.crows_nest.art;
        ctx.drawImage(artCanvas(a), x + cp / 2 - (a.w / 2) * k2, y + cp / 2 - (a.h / 2) * k2, a.w * k2, a.h * k2);
      }
    }
    const issues = validateDesign(d);
    ctx.lineWidth = Math.max(2, cp / 10);
    for (const is of issues) {
      if (is.cell < 0) continue;
      ctx.strokeStyle = '#ff4a3a';
      ctx.strokeRect(this.ox + (is.cell % d.w) * cp + 1, this.oy + ((is.cell / d.w) | 0) * cp + 1, cp - 2, cp - 2);
    }
    if (this.hover >= 0) {
      const hx = this.ox + (this.hover % d.w) * cp;
      const hy = this.oy + ((this.hover / d.w) | 0) * cp;
      ctx.strokeStyle = '#ffe08a';
      ctx.strokeRect(hx + 1, hy + 1, cp - 2, cp - 2);
      if (this.sel?.rotates) {
        const dir = this.sel.place === 'edge' && hasHull(d, this.hover % d.w, (this.hover / d.w) | 0) ? autoDir(d, this.hover % d.w, (this.hover / d.w) | 0) : this.rot;
        const ax = [0, 1, 0, -1][dir];
        const ay = [-1, 0, 1, 0][dir];
        ctx.fillStyle = '#ffe08a';
        ctx.beginPath();
        ctx.arc(hx + cp / 2 + ax * cp * 0.45, hy + cp / 2 + ay * cp * 0.45, cp * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  private renderStats(): void {
    const g = this.g;
    const p = g.profile;
    const d = this.design;
    const old = summarize(p.design);
    const s = summarize(d);
    const issues = validateDesign(d);
    const cost = designDiffCost(g, p.design, d);
    const row = (label: string, a: string, b: string, better: boolean | null) =>
      h('div', { cls: 'stat' }, h('span', {}, label), h('span', {}, a !== b ? h('span', { cls: 'muted' }, `${a} → `) : '', h('b', { cls: better === null || a === b ? '' : better ? 'good' : 'bad' }, b)));
    const keel = KEELS[d.keel];
    const nameIn = h('input', { type: 'text', value: d.name, maxlength: 24, style: 'width:100%' }) as HTMLInputElement;
    nameIn.addEventListener('input', () => (d.name = nameIn.value || 'Unnamed'));
    const swatches = h('div', { cls: 'flex wrap' }, SAIL_COLORS.map((c) => {
      const sw = h('span', { cls: `swatch ${d.sailColor === c ? 'sel' : ''}`, style: `background:#${c.toString(16).padStart(6, '0')}` });
      sw.addEventListener('click', () => {
        d.sailColor = c;
        audio.ui('click');
        this.renderStats();
      });
      return sw;
    }));
    const matsList = Object.entries(cost.mats).map(([k, v]) => {
      const have = p.inv.count(k);
      return h('div', { cls: 'stat' }, h('span', {}, ITEM[k].name), h('b', { cls: have >= v ? 'good' : '' }, `${v} (have ${have})`));
    });
    const valid = issues.length === 0;
    const changed = JSON.stringify(d) !== JSON.stringify(p.design);
    const afford = p.gold >= cost.total;
    const btn = h('button', { cls: 'primary', disabled: !valid || !changed || !afford, onclick: () => this.commit() }, cost.total >= 0 ? `Commission (${gold(cost.total)})` : `Commission (+${gold(-cost.total)})`);
    let cells = 0;
    for (const v of d.hull) if (v) cells++;
    this.statsEl.innerHTML = '';
    this.statsEl.append(
      h('h3', { style: 'margin:0;color:var(--gold)' }, 'Ship'),
      nameIn,
      h('div', { cls: 'hint' }, 'Sail colour'),
      swatches,
      h('div', { cls: 'stat' }, h('span', {}, 'Keel'), h('b', {}, `${keel.name} ${cells}/${keel.cells}`)),
      row('Top speed', knots(old.topSpeed), knots(s.topSpeed), s.topSpeed >= old.topSpeed),
      row('Rowing', knots(old.rowSpeed), knots(s.rowSpeed), s.rowSpeed >= old.rowSpeed),
      row('Turning', `${Math.round((old.turn * 180) / Math.PI)}°/s`, `${Math.round((s.turn * 180) / Math.PI)}°/s`, s.turn >= old.turn),
      row('Hull', `${old.hull}`, `${s.hull}`, s.hull >= old.hull),
      row('Cargo', `${old.cargo}`, `${s.cargo}`, s.cargo >= old.cargo),
      row('Crew cap', `${old.crewCap}`, `${s.crewCap}`, s.crewCap >= old.crewCap),
      row('Crew slots', `${old.crewSlots}`, `${s.crewSlots}`, null),
      row('Guns', `${old.guns}`, `${s.guns}`, s.guns >= old.guns),
      row('Firepower', old.firepower.toFixed(1), s.firepower.toFixed(1), s.firepower >= old.firepower),
      row('Vision', `${old.vision}`, `${s.vision}`, s.vision >= old.vision),
      row('Mass', old.mass.toFixed(0), s.mass.toFixed(0), null),
      h('div', { cls: 'issues' }, issues.map((i) => h('div', {}, '• ' + i.msg))),
      cost.gold || cost.refund ? h('div', {}, h('div', { cls: 'stat' }, h('span', {}, 'Parts'), h('b', {}, gold(cost.gold))), cost.refund ? h('div', { cls: 'stat' }, h('span', {}, 'Refund (50%)'), h('b', { cls: 'good' }, `-${gold(cost.refund)}`)) : '', matsList, cost.matGold ? h('div', { cls: 'stat' }, h('span', {}, 'Missing materials'), h('b', {}, gold(cost.matGold))) : '') : '',
      h('div', { cls: 'flex wrap mt' }, btn, h('button', { onclick: () => { this.design = cloneDesign(p.design); this.refresh(); } }, 'Revert')),
      !afford && changed ? h('div', { cls: 'bad' }, 'Not enough gold.') : '',
      h('h3', { style: 'margin:0.6em 0 0;color:var(--gold)' }, 'Keels'),
      h('div', {}, KEELS.map((k) => {
        const owned = p.keel >= k.id;
        const next = k.id === p.keel + 1;
        return h('div', { cls: 'stat' }, h('span', {}, `${k.name} (${k.cells})`), owned ? h('b', { cls: 'good' }, 'Owned') : next ? h('button', { cls: 'small', disabled: p.gold < k.price || p.fame < k.fame, onclick: () => this.buyKeel(k.id) }, p.fame < k.fame ? `${k.fame} fame` : gold(k.price)) : h('span', { cls: 'muted' }, `${k.fame} fame`));
      }))
    );
  }

  private buyKeel(id: number): void {
    const p = this.g.profile;
    const k = KEELS[id];
    if (p.gold < k.price || p.fame < k.fame) return;
    p.gold -= k.price;
    p.keel = id;
    const base = resizeDesign(p.design, k.w, k.h);
    base.keel = id;
    p.design = base;
    const nd = resizeDesign(this.design, k.w, k.h);
    nd.keel = id;
    this.design = nd;
    this.g.applyDesign();
    audio.ui('levelup');
    this.g.toast(`Your shipwrights laid a ${k.name} keel!`, '#ffd870');
    this.refresh();
    this.onDone();
  }

  private commit(): void {
    const g = this.g;
    const p = g.profile;
    const d = this.design;
    if (validateDesign(d).length) return;
    const cost = designDiffCost(g, p.design, d);
    if (p.gold < cost.total) return;
    for (const k in cost.mats) {
      const have = p.inv.count(k);
      p.inv.remove(k, Math.min(have, cost.mats[k]));
    }
    p.gold -= cost.total;
    const hadGun = p.design.part.some((x) => x && COMPONENTS[x].gun);
    p.design = cloneDesign(d);
    g.applyDesign();
    audio.ui('buy');
    g.sound('creak', g.player.x, g.player.y, 1);
    g.toast(`The ${d.name} has been refitted.`, '#ffd870');
    if (p.tutorial === 5 && !hadGun && d.part.some((x) => x && COMPONENTS[x].gun)) g.advanceTutorial(5);
    this.refresh();
    this.onDone();
  }
}
