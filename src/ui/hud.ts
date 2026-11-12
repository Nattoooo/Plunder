import type { Game } from '../game/game';
import { AMMO_ITEMS } from '../game/game';
import { ITEM } from '../data/items';
import { ORDER_INFO, Order } from '../game/crew';
import { TUTORIAL } from '../game/quests';
import { h, bar, setBar, txt, gold } from './dom';
import { Minimap } from './maps';
import { knots } from './shipwright';

export class HUD {
  root: HTMLElement;
  private els: Record<string, HTMLElement> = {};
  minimap: Minimap;
  private toastBox: HTMLElement;
  private banner: HTMLElement;
  private bannerT = 0;
  private orderBtns: Record<string, HTMLElement> = {};
  private gunRows: Record<string, HTMLElement> = {};

  constructor(parent: HTMLElement, private g: Game) {
    const E = this.els;
    const mk = (key: string, tag = 'span', cls = '') => (E[key] = h(tag, { cls }));
    const mm = h('canvas', { id: 'minimap' }) as HTMLCanvasElement;
    this.minimap = new Minimap(mm);
    this.toastBox = h('div', { id: 'toasts' });
    this.banner = h('div', { id: 'banner', style: 'opacity:0' }, mk('b1', 'div', 't1'), mk('b2', 'div', 't2'));
    const orders = h('div', { id: 'orders' });
    (['sail', 'battle', 'repair', 'board', 'rest'] as Order[]).forEach((o) => {
      const b = h('button', { title: ORDER_INFO[o].desc, onclick: () => g.setOrder(o) }, `${ORDER_INFO[o].key} ${ORDER_INFO[o].name}`);
      this.orderBtns[o] = b;
      orders.append(b);
    });
    const gunBox = h('div', { id: 'guns' });
    for (const [k, label] of [['3', 'Port'], ['0', 'Bow'], ['1', 'Starboard'], ['2', 'Stern'], ['m', 'Mortar']]) {
      const r = h('div', { cls: 'g' }, h('div', { cls: 'lbl' }, h('span', {}, label)), bar(0, 'gold'));
      this.gunRows[k] = r;
      gunBox.append(r);
    }
    gunBox.append(h('div', { style: 'min-width:7em' }, mk('ammo', 'div'), h('div', { cls: 'muted', style: 'font-size:0.8em' }, '[R] swap ammo')));
    E.guns = gunBox;
    this.root = h('div', {},
      h('div', { id: 'hud-tl', cls: 'hud' },
        h('div', { cls: 'row' }, mk('name', 'span'), mk('gold', 'span', 'gold')),
        h('div', { cls: 'row' }, h('span', { cls: 'muted' }, 'Fame'), mk('fame', 'span', 'goldt')),
        h('div', { cls: 'row' }, h('span', { cls: 'muted' }, 'Notoriety'), mk('noto', 'span')),
        (E.notoBar = bar(0, 'red')),
        h('div', { cls: 'row' }, mk('day', 'span'), mk('weather', 'span')),
        h('div', { cls: 'row' }, mk('region', 'span', 'muted'), mk('danger', 'span'))
      ),
      h('div', { id: 'hud-tr', cls: 'hud' },
        h('div', { id: 'minimap-wrap' }, mm, h('div', { cls: 'mm-n' }, 'N')),
        mk('coords', 'div', 'coords'),
        mk('wind', 'div', 'coords'),
        h('div', { cls: 'coords' }, '[M] Map  [I] Hold  [C] Crew  [J] Journal')
      ),
      h('div', { id: 'hud-bl', cls: 'hud' },
        h('div', { cls: 'row' }, mk('ship', 'span', 'goldt'), mk('speed', 'span')),
        h('div', { cls: 'lbl' }, h('span', {}, 'Hull'), mk('hullT', 'span')),
        (E.hullBar = bar(1)),
        (E.floodWrap = h('div', {}, h('div', { cls: 'lbl' }, h('span', {}, 'Flooding'), mk('floodT', 'span')), (E.floodBar = bar(0, 'blue')))),
        (E.sails = h('div', { cls: 'sailbox' }, h('span', {}, 'Furled'), h('span', {}, 'Half'), h('span', {}, 'Full'))),
        mk('status', 'div', 'muted'),
        h('div', { cls: 'lbl' }, h('span', {}, 'Cargo'), mk('cargoT', 'span')),
        (E.cargoBar = bar(0, 'gold')),
        h('div', { cls: 'lbl' }, h('span', {}, 'Crew'), mk('crewT', 'span')),
        (E.moraleBar = bar(0)),
        mk('supplies', 'div', 'muted')
      ),
      h('div', { id: 'hud-bc', cls: 'hud interactive' }, mk('prompt2', 'div'), mk('prompt', 'div'), gunBox, orders),
      h('div', { id: 'hud-tc', cls: 'hud' }, mk('objective', 'div'), this.toastBox),
      this.banner,
      mk('fps', 'div', 'hud')
    );
    E.prompt.id = 'prompt';
    E.prompt2.id = 'prompt';
    E.objective.id = 'objective';
    E.fps.id = 'fps';
    parent.append(this.root);
    g.on('toast', (m, c) => this.toast(m as string, c as string));
    g.on('region', (b, l) => this.showBanner(b as string, `Danger level ${l}`));
  }

  toast(msg: string, color = '#f0e6c8'): void {
    const t = h('div', { cls: 'toast', style: `color:${color}` }, msg);
    this.toastBox.prepend(t);
    while (this.toastBox.children.length > 6) this.toastBox.lastElementChild!.remove();
    setTimeout(() => (t.style.opacity = '0'), 4500);
    setTimeout(() => t.remove(), 5200);
  }

  showBanner(a: string, b: string): void {
    txt(this.els.b1, a);
    txt(this.els.b2, b);
    this.banner.style.opacity = '1';
    this.bannerT = 3.5;
  }

  frame(dt: number): void {
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.banner.style.opacity = '0';
    }
  }

  update(): void {
    const g = this.g;
    const E = this.els;
    const p = g.profile;
    const s = g.player;
    txt(E.name, p.name);
    txt(E.gold, gold(p.gold));
    txt(E.fame, `${Math.floor(p.fame)}`);
    txt(E.noto, p.notoriety >= 70 ? 'Infamous' : p.notoriety >= 40 ? 'Wanted' : p.notoriety >= 15 ? 'Suspect' : 'Clean');
    E.noto.className = p.notoriety >= 40 ? 'bad' : '';
    setBar(E.notoBar, p.notoriety / 100);
    txt(E.day, `Day ${Math.max(1, g.env.day - p.startDay + 1)} · ${g.env.clockString()}${g.env.night ? ' ☾' : ''}`);
    txt(E.weather, g.env.weatherName());
    const ri = g.regionInfo();
    txt(E.region, ri.biome);
    txt(E.danger, `Danger ${ri.level}`);
    E.danger.className = ri.level >= 7 ? 'bad' : ri.level >= 4 ? 'goldt' : 'good';
    const f = g.avatar ?? s;
    txt(E.coords, p.inv.has('sextant') ? g.coords(f.x, f.y) : `~${g.coords(Math.round(f.x / 2048) * 2048, Math.round(f.y / 2048) * 2048)}`);
    const dirs = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
    const wa = ((g.env.windAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const wd = dirs[Math.round(wa / (Math.PI / 4)) % 8];
    txt(E.wind, `Wind → ${wd} · ${g.env.windStrength < 0.85 ? 'Light' : g.env.windStrength < 1.15 ? 'Steady' : 'Strong'}`);
    txt(E.ship, s.name);
    txt(E.speed, knots(Math.abs(s.speed)));
    const integ = s.integrity();
    txt(E.hullT, `${Math.round(s.hullTotal)}/${s.base.hullMax}`);
    setBar(E.hullBar, (integ - 0.22) / 0.78);
    E.hullBar.className = integ < 0.45 ? 'bar red' : 'bar';
    E.floodWrap.classList.toggle('hidden', s.flood < 0.01);
    txt(E.floodT, `${Math.round(s.flood * 100)}%`);
    setBar(E.floodBar, s.flood);
    const lvl = s.sailTarget < 0.25 ? 0 : s.sailTarget < 0.75 ? 1 : 2;
    Array.from(E.sails.children).forEach((c, i) => c.classList.toggle('on', i === lvl));
    const st: string[] = [];
    if (g.docked) st.push(`Docked at ${g.docked.port?.name}`);
    if (s.anchored) st.push('Anchored');
    if (s.rowing && s.stats?.oarPower) st.push('Rowing');
    if (g.mode === 'foot') st.push('Ashore');
    if (Number.isFinite(s.sailAngle)) {
      const rel = Math.round((((s.sailAngle - s.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * 180 / Math.PI);
      if (Math.abs(rel) >= 2) st.push(`Sail ${Math.abs(rel)}° ${rel < 0 ? 'port' : 'starboard'}`);
    }
    if (s.sail > 0.05 && s.stats) {
      const wf = s.windFactor(g.env);
      st.push(wf > 0.95 ? 'Good wind' : wf > 0.7 ? 'Fair wind' : 'Into the wind');
    }
    txt(E.status, st.join(' · ') || ' ');
    const cap = g.cargoCap();
    const w = p.inv.weight();
    txt(E.cargoT, `${Math.round(w)}/${cap}`);
    setBar(E.cargoBar, w / cap);
    const cc = s.stats?.crewCap ?? 0;
    let mor = 0;
    for (const c of p.crew) mor += c.morale;
    mor = p.crew.length ? mor / p.crew.length : 70;
    txt(E.crewT, `${p.crew.length}/${cc} · morale ${Math.round(mor)}`);
    setBar(E.moraleBar, mor / 100);
    E.moraleBar.className = mor < 35 ? 'bar red' : 'bar';
    if (p.crew.length) {
      let food = 0;
      let water = 0;
      for (const it of p.inv.items) {
        const d = ITEM[it.id];
        food += (d.food ?? 0) * it.qty;
        water += (d.water ?? 0) * it.qty;
      }
      const n = p.crew.length * (1 - (s.stats?.foodSave ?? 0));
      const fd = food / n;
      const wdays = water / p.crew.length;
      txt(E.supplies, `Food ${fd.toFixed(1)}d · Water ${wdays.toFixed(1)}d`);
      E.supplies.className = fd < 1 || wdays < 1 ? 'bad' : 'muted';
    } else txt(E.supplies, 'No crew to feed');
    const showGuns = g.mode === 'sail' && s.guns.length > 0 && !g.docked;
    E.guns.classList.toggle('hidden', !showGuns);
    if (showGuns) {
      for (const k of ['0', '1', '2', '3', 'm']) {
        const fr = k === 'm' ? s.gunReadyFraction(-2) : s.gunReadyFraction(+k);
        const row = this.gunRows[k];
        row.classList.toggle('hidden', fr < 0);
        if (fr >= 0) setBar(row.lastElementChild as HTMLElement, fr);
      }
      const am = AMMO_ITEMS[g.ammoIdx];
      const n = p.inv.count(am.item);
      txt(E.ammo, `${am.name}: ${n}`);
      E.ammo.className = n === 0 ? 'bad' : '';
    }
    for (const o in this.orderBtns) this.orderBtns[o].classList.toggle('on', s.order === o);
    (E.orders ?? this.orderBtns.sail.parentElement!).classList.toggle('hidden', g.mode !== 'sail' || p.crew.length === 0);
    this.prompt(E.prompt, g.prompt);
    this.prompt(E.prompt2, g.prompt2);
    const tut = p.tutorial < TUTORIAL.length - 1 ? TUTORIAL[p.tutorial].text : '';
    let obj = tut;
    if (!obj && p.quests.length) {
      const q = p.quests[0];
      obj = `${q.title}${q.done ? ` — return to ${q.portName}` : ''}`;
    }
    E.objective.classList.toggle('hidden', !obj);
    txt(E.objective, obj ? `★ ${obj}` : '');
    E.fps.classList.toggle('hidden', !p.settings.showFps);
    txt(E.fps, `${g.fps} FPS · ${g.ships.length} ships · ${g.particles.n} fx · ${g.chunks.chunks.size} chunks`);
  }

  private prompt(el: HTMLElement, pr: { key: string; text: string } | null): void {
    el.classList.toggle('hidden', !pr);
    if (!pr) return;
    const s = `${pr.key}|${pr.text}`;
    if (el.dataset.k === s) return;
    el.dataset.k = s;
    el.innerHTML = '';
    el.append(h('b', {}, pr.key), pr.text);
  }
}
