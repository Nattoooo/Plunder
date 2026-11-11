import type { Game, BoardResult } from '../game/game';
import { RNG, hash2, WORLD_SEED } from '../core/rng';
import { ITEM, ITEMS, RARITY_COLORS, RARITY_NAMES } from '../data/items';
import { ROLE, TRAIT } from '../data/crew';
import { COMPONENTS } from '../data/components';
import { STRUCT, STRUCTURES, PLANTATION_CROPS } from '../data/structures';
import { Island, getIsland, ISLAND_TYPE_NAMES, BIOME_NAMES, FACTION_PORT_NAMES, F_BRETHREN, portLayout, levelAt } from '../world/worldgen';
import { marketList, priceOf, recordTrade, claimPrice, claimFame, structureSlots } from '../game/economy';
import { genCrew, hireCost, CrewMember, ORDER_INFO, Order, xpToNext } from '../game/crew';
import { bountyBoard, acceptQuest, TUTORIAL } from '../game/quests';
import { makeTreasureMap, rollLoot } from '../game/loot';
import { InvItem } from '../game/player';
import { saveGame, hasSave, saveSummary, deleteSave } from '../game/save';
import { audio } from '../audio/audio';
import { h, itemIcon, bar, gold } from './dom';
import { HUD } from './hud';
import { WorldMap } from './maps';
import { Shipwright } from './shipwright';
import { fmtTime } from '../core/math';

export class UI {
  root: HTMLElement;
  hud: HUD;
  modal: HTMLElement | null = null;
  map: WorldMap;
  mapWrap: HTMLElement;
  mapOpen = false;
  titleEl: HTMLElement | null = null;
  private shipwright: Shipwright | null = null;
  private onCloseFn: (() => void) | null = null;
  private portIsl: Island | null = null;
  private portTab = 'market';
  onStart: ((name: string, cont: boolean) => void) | null = null;
  onQuit: (() => void) | null = null;
  onSettings: (() => void) | null = null;

  constructor(private g: Game) {
    this.root = document.getElementById('ui')!;
    this.hud = new HUD(this.root, g);
    this.hud.root.classList.add('hidden');
    const tip = h('div', { id: 'maptip', cls: 'hidden' });
    const info = h('div', { cls: 'mapui' });
    const cv = h('canvas', { id: 'worldmap' }) as HTMLCanvasElement;
    this.mapWrap = h('div', { id: 'mapwrap', cls: 'hidden' }, cv, info, h('div', { cls: 'mapbtns' }, h('button', { onclick: () => this.map.centerOn(g.player.x, g.player.y) }, 'Center'), h('button', { onclick: () => this.toggleMap() }, 'Close [M]')), tip);
    this.root.append(this.mapWrap);
    this.map = new WorldMap(cv, tip, info, g);
    g.on('discover', (cx, cy) => this.map.markFog(cx as number, cy as number));
    g.on('port', (isl) => this.openPort(isl as Island));
    g.on('claim', (isl) => this.openIsland(isl as Island));
    g.on('boarding', (r) => this.openBoarding(r as BoardResult));
    g.on('death', (d) => this.openDeath(d as { goldLost: number; drowned: string[]; cargo: number }));
    g.on('undock', () => this.close());
    g.on('loaded', () => this.map.rebuildFog());
    window.addEventListener('keydown', (e) => this.key(e));
  }

  private key(e: KeyboardEvent): void {
    const t = e.target as HTMLElement;
    if (t && t.tagName === 'INPUT') {
      if (e.code === 'Escape') t.blur();
      return;
    }
    const g = this.g;
    if (g.mode === 'title' || this.titleEl) return;
    if (e.code === 'Escape') {
      if (this.mapOpen) this.toggleMap();
      else if (this.modal) {
        if (this.modal.dataset.locked) return;
        this.close();
      } else this.openMenu();
      return;
    }
    if (g.mode === 'dead') return;
    if (this.modal?.dataset.locked) return;
    if (e.code === 'KeyM' || e.code === 'Tab') {
      e.preventDefault();
      this.toggleMap();
    } else if (e.code === 'KeyI') this.toggle('hold', () => this.openHold());
    else if (e.code === 'KeyC') this.toggle('crew', () => this.openCrew());
    else if (e.code === 'KeyJ') this.toggle('journal', () => this.openJournal());
    else if (e.code === 'F3') {
      g.profile.settings.showFps = !g.profile.settings.showFps;
      e.preventDefault();
    }
  }

  private toggle(name: string, fn: () => void): void {
    if (this.mapOpen) this.toggleMap();
    if (this.modal && this.modal.dataset.name === name) this.close();
    else if (!this.modal || !this.modal.dataset.port) fn();
  }

  toggleMap(): void {
    this.mapOpen = !this.mapOpen;
    this.mapWrap.classList.toggle('hidden', !this.mapOpen);
    this.syncOpen();
    if (this.mapOpen) {
      const f = this.g.avatar ?? this.g.player;
      this.map.centerOn(f.x, f.y);
      audio.ui('open');
      const info = this.mapWrap.querySelector('.mapui') as HTMLElement;
      info.innerHTML = '';
      info.append(
        h('h2', {}, 'Chart of the Known Seas'),
        h('div', { cls: 'hint' }, 'Drag to pan · Wheel to zoom · Click to set a waypoint · Right-click clears it'),
        h('div', { cls: 'mt' }, h('span', { style: 'color:#4a8ae8' }, '■ Crown'), ' ', h('span', { style: 'color:#5ac85a' }, '■ Free'), ' ', h('span', { style: 'color:#e8463a' }, '■ Pirate'), ' ', h('span', { style: 'color:#ffd040' }, '● Quest'), ' ', h('span', { style: 'color:#e8281e' }, '✕ Treasure')),
        h('div', { cls: 'hint mt' }, `Charted ${(this.g.profile.discovered.reduce((a, b) => a + b, 0) * 4).toLocaleString()} sq mi of 1,000,000`)
      );
    } else audio.ui('close');
  }

  drawMap(): void {
    if (this.mapOpen) this.map.draw();
  }

  private syncOpen(): void {
    this.g.uiOpen = !!this.modal || this.mapOpen || !!this.titleEl;
    document.body.classList.toggle('menu', this.g.uiOpen);
  }

  open(name: string, el: HTMLElement, onClose?: () => void, locked = false): void {
    this.close(true);
    const wrap = h('div', { id: 'modal' }, el);
    wrap.dataset.name = name;
    if (locked) wrap.dataset.locked = '1';
    wrap.addEventListener('mousedown', (e) => {
      if (e.target === wrap && !locked && name !== 'port') this.close();
    });
    this.modal = wrap;
    this.onCloseFn = onClose ?? null;
    this.root.append(wrap);
    this.syncOpen();
    audio.ui('open');
  }

  close(silent = false): void {
    if (!this.modal) return;
    this.shipwright?.dispose();
    this.shipwright = null;
    const fn = this.onCloseFn;
    this.onCloseFn = null;
    this.modal.remove();
    this.modal = null;
    this.syncOpen();
    if (!silent) audio.ui('close');
    if (fn) fn();
  }

  private panel(title: string, sub: string | HTMLElement, body: HTMLElement | HTMLElement[], cls = '', closable = true): HTMLElement {
    return h('div', { cls: `box panel ${cls}` },
      h('div', { cls: 'phead' }, h('div', {}, h('h2', {}, title), typeof sub === 'string' ? h('div', { cls: 'sub' }, sub) : sub)),
      closable ? h('button', { cls: 'close small', onclick: () => this.close() }, '✕ [Esc]') : '',
      body
    );
  }

  showTitle(): void {
    const g = this.g;
    this.hud.root.classList.add('hidden');
    const sum = saveSummary();
    const nameIn = h('input', { type: 'text', placeholder: 'Your captain\'s name', maxlength: 18, value: sum?.name ?? '' }) as HTMLInputElement;
    const menu = h('div', { cls: 'menu' });
    const start = (cont: boolean) => {
      audio.init();
      const n = nameIn.value.trim() || 'Nameless';
      this.titleEl?.remove();
      this.titleEl = null;
      this.hud.root.classList.remove('hidden');
      this.syncOpen();
      this.onStart?.(n, cont);
    };
    if (sum) menu.append(h('button', { cls: 'primary', onclick: () => start(true) }, `Continue — ${sum.name}`), h('div', { cls: 'hint', style: 'text-align:center' }, `${gold(sum.gold)} · ${Math.floor(sum.fame)} fame · ${fmtTime(sum.played)} played`));
    const newBtn = h('button', { cls: sum ? '' : 'primary', onclick: () => {
      if (sum && !confirm('Start a new voyage? Your current save will be overwritten.')) return;
      if (sum) deleteSave();
      start(false);
    } }, 'New Voyage');
    menu.append(h('div', { cls: 'flex' }, nameIn), newBtn, h('button', { onclick: () => this.openControls() }, 'How to Play'), h('button', { onclick: () => { audio.init(); this.openSettings(); } }, 'Settings'));
    this.titleEl = h('div', { id: 'title' },
      h('div', { cls: 'logo' }, 'PLUNDER'),
      h('div', { cls: 'tag' }, 'Raise a crew. Build a fleet. Rule a thousand miles of sea.'),
      menu,
      h('div', { cls: 'foot' }, 'One shared ocean · 1,000 × 1,000 miles · Offline preview build')
    );
    this.root.append(this.titleEl);
    this.syncOpen();
    nameIn.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') sum ? start(true) : start(false);
    });
  }

  openControls(): void {
    const rows: [string, string][] = [
      ['W / S', 'Draw (raise) or furl the sail — Furled, Half, Full'],
      ['A / D', 'Turn the sail to steer. You keep your heading until you turn again'],
      ['Mouse + Hold Left', 'Aim and fire every cannon that bears on the cursor'],
      ['R', 'Swap ammunition (round, chain, grape, heated)'],
      ['Right-click', 'Set a waypoint'],
      ['Q', 'Toggle rowing (needs manned oar benches)'],
      ['X', 'Drop or raise anchor'],
      ['E', 'Interact: dock, go ashore, salvage, open, dig, claim'],
      ['F', 'Board an enemy ship that is crippled, slow or has surrendered'],
      ['1 – 5', 'Crew orders: Sail, Battle, Repair, Board, Rest'],
      ['Mouse wheel', 'Zoom (a Spyglass lets you zoom further out)'],
      ['M / Tab', 'World map'],
      ['I / C / J', 'Hold, Crew, Journal'],
      ['On foot', 'WASD to walk, left-click to attack, E to interact'],
      ['Esc', 'Menu / close windows'],
      ['F3', 'Performance overlay']
    ];
    const body = h('div', { cls: 'pbody' },
      h('div', { cls: 'controls' }, rows.map(([k, d]) => [h('span', { cls: 'key' }, k), h('span', {}, d)])),
      h('div', { cls: 'hint mt' }, 'Wind matters: square sails love a following wind, lateen sails cope better upwind, and oars ignore it entirely. Docking at a port lets you trade, hire crew, refit your ship and take bounties. Crew need wages, food and water every day.')
    );
    const el = this.panel('How to Play', 'Captain\'s handbook', body, 'mid');
    if (this.titleEl) {
      const wrap = h('div', { id: 'modal', style: 'z-index:5' }, el);
      wrap.addEventListener('mousedown', (e) => e.target === wrap && wrap.remove());
      el.querySelector('.close')!.addEventListener('click', () => wrap.remove());
      this.root.append(wrap);
    } else this.open('controls', el);
  }

  openSettings(): void {
    const s = this.g.profile.settings;
    const slider = (label: string, key: 'master' | 'music' | 'sfx' | 'ambience' | 'particles') => {
      const inp = h('input', { type: 'range', min: 0, max: 100, value: Math.round(s[key] * 100) }) as HTMLInputElement;
      inp.addEventListener('input', () => {
        s[key] = +inp.value / 100;
        this.onSettings?.();
      });
      return h('div', { cls: 'spread' }, h('span', {}, label), inp);
    };
    const check = (label: string, key: 'showFps' | 'screenShake') => {
      const inp = h('input', { type: 'checkbox' }) as HTMLInputElement;
      inp.checked = s[key];
      inp.addEventListener('change', () => {
        s[key] = inp.checked;
        this.onSettings?.();
      });
      return h('div', { cls: 'spread' }, h('span', {}, label), inp);
    };
    const body = h('div', { cls: 'pbody fight' }, slider('Master volume', 'master'), slider('Music', 'music'), slider('Sound effects', 'sfx'), slider('Ambience', 'ambience'), slider('Particle detail', 'particles'), check('Screen shake', 'screenShake'), check('Show FPS (F3)', 'showFps'));
    const el = this.panel('Settings', 'Saved with your game', body, 'narrow');
    if (this.titleEl) {
      const wrap = h('div', { id: 'modal', style: 'z-index:5' }, el);
      wrap.addEventListener('mousedown', (e) => e.target === wrap && wrap.remove());
      el.querySelector('.close')!.addEventListener('click', () => wrap.remove());
      this.root.append(wrap);
    } else this.open('settings', el);
  }

  openMenu(): void {
    const g = this.g;
    const body = h('div', { cls: 'pbody fight' },
      h('button', { cls: 'primary', onclick: () => this.close() }, 'Resume'),
      h('button', { onclick: () => this.openSettings() }, 'Settings'),
      h('button', { onclick: () => this.openControls() }, 'How to Play'),
      h('button', { onclick: () => {
        const ok = saveGame(g.profile, g.seenIslands);
        g.toast(ok ? 'Game saved.' : 'Could not save (storage blocked).', ok ? '#c8f0a0' : '#ff9a7a');
        this.close();
      } }, 'Save Game'),
      h('button', { cls: 'danger', onclick: () => { this.close(true); this.onQuit?.(); } }, 'Save & Quit to Title')
    );
    this.open('menu', this.panel('Paused', `Captain ${g.profile.name}`, body, 'narrow'));
  }

  openPort(isl: Island, tab = this.portTab): void {
    this.portIsl = isl;
    this.portTab = tab;
    const g = this.g;
    const port = isl.port!;
    const tabs = h('div', { cls: 'tabs' });
    const body = h('div', { cls: 'pbody' });
    const goldEl = h('span', { cls: 'goldt' });
    const set = (t: string) => {
      this.portTab = t;
      this.shipwright?.dispose();
      this.shipwright = null;
      Array.from(tabs.children).forEach((c) => c.classList.toggle('on', (c as HTMLElement).dataset.t === t));
      body.innerHTML = '';
      goldEl.textContent = gold(g.profile.gold);
      if (t === 'market') body.append(this.market(isl, () => set('market')));
      else if (t === 'tavern') body.append(this.tavern(isl, () => set('tavern')));
      else if (t === 'shipwright') body.append(this.shipwrightTab(() => (goldEl.textContent = gold(g.profile.gold))));
      else if (t === 'harbor') body.append(this.harbor(isl, () => set('harbor')));
    };
    for (const [k, n] of [['market', 'Market'], ['tavern', 'Tavern'], ['shipwright', 'Shipwright'], ['harbor', 'Harbor Master']]) {
      const tb = h('div', { cls: 'tab', onclick: () => set(k) }, n);
      tb.dataset.t = k;
      tabs.append(tb);
    }
    const leave = h('button', { cls: 'primary', onclick: () => {
      this.close();
    } }, g.docked ? 'Set Sail [Esc]' : 'Leave [Esc]');
    const el = h('div', { cls: 'box panel' },
      h('div', { cls: 'phead' },
        h('div', {}, h('h2', {}, port.name), h('div', { cls: 'sub' }, `${FACTION_PORT_NAMES[port.faction]} · ${BIOME_NAMES[isl.biome]} · Danger ${isl.level}`)),
        h('div', { cls: 'flex' }, h('span', {}, 'Purse: '), goldEl, leave)
      ),
      tabs,
      body
    );
    this.open('port', el, () => {
      if (g.docked) g.undock();
    });
    this.modal!.dataset.port = '1';
    set(tab);
  }

  private market(isl: Island, refresh: () => void): HTMLElement {
    const g = this.g;
    const p = g.profile;
    const now = g.env.epoch;
    const entries = marketList(isl, p, now);
    const free = g.cargoFree();
    const buy = (id: string, n: number) => {
      const def = ITEM[id];
      let bought = 0;
      for (let i = 0; i < n; i++) {
        const pr = priceOf(isl, def, p, now);
        if (p.gold < pr.buy || g.cargoFree() < def.weight) break;
        p.gold -= pr.buy;
        if (id === 'treasure_map') {
          const data = makeTreasureMap(isl.x, isl.y, new RNG(hash2(isl.id, Math.floor(now), i)), isl.level);
          if (data) p.inv.add(id, 1, data);
        } else p.inv.add(id, 1);
        recordTrade(p, isl.id, id, 1, now);
        bought++;
        g.syncCargo();
      }
      if (bought) audio.ui('coin');
      else audio.ui('error');
      refresh();
    };
    const sell = (entry: InvItem, n: number) => {
      const def = ITEM[entry.id];
      let sold = 0;
      for (let i = 0; i < n; i++) {
        if (!p.inv.items.includes(entry) || entry.qty <= 0) break;
        const pr = priceOf(isl, def, p, now);
        p.gold += pr.sell;
        p.stats.goldEarned += pr.sell;
        if (entry.data) p.inv.removeEntry(entry);
        else p.inv.remove(entry.id, 1);
        recordTrade(p, isl.id, entry.id, -1, now);
        sold++;
      }
      g.syncCargo();
      if (sold) {
        audio.ui('coin');
        if (p.tutorial === 4) g.advanceTutorial(4);
      }
      refresh();
    };
    const buyList = h('div', { cls: 'list' }, entries.filter((e) => e.sells).map((e) => {
      const def = ITEM[e.id];
      const canN = Math.min(Math.floor(p.gold / Math.max(1, e.buy)), def.weight > 0 ? Math.floor(free / def.weight) : 999);
      return h('div', { cls: 'row', title: def.desc },
        itemIcon(e.id),
        h('span', { cls: 'nm' }, h('span', { style: `color:${RARITY_COLORS[def.rarity]}` }, def.name), e.tag ? h('span', { cls: `tag ${e.tag}` }, e.tag === 'cheap' ? 'local' : 'wanted') : '', h('span', { cls: 'muted', style: 'font-size:0.8em' }, `  ${def.weight}wt`)),
        h('span', { cls: 'pr' }, gold(e.buy)),
        h('button', { cls: 'small', disabled: canN < 1, onclick: () => buy(e.id, 1) }, 'Buy'),
        def.cat !== 'tool' && def.cat !== 'equip' && def.cat !== 'map' ? h('button', { cls: 'small', disabled: canN < 2, onclick: () => buy(e.id, 10) }, 'x10') : ''
      );
    }));
    const sellList = h('div', { cls: 'list' }, p.inv.sorted().map((it) => {
      const def = ITEM[it.id];
      const pr = priceOf(isl, def, p, now);
      return h('div', { cls: 'row', title: def.desc },
        itemIcon(it.id),
        h('span', { cls: 'nm' }, h('span', { style: `color:${RARITY_COLORS[def.rarity]}` }, def.name), ` ×${it.qty}`, pr.tag ? h('span', { cls: `tag ${pr.tag}` }, pr.tag === 'cheap' ? 'local' : 'wanted') : ''),
        h('span', { cls: 'pr' }, gold(pr.sell)),
        h('button', { cls: 'small', onclick: () => sell(it, 1) }, 'Sell'),
        it.qty > 1 ? h('button', { cls: 'small', onclick: () => sell(it, it.qty) }, 'All') : ''
      );
    }));
    const sellCat = (cats: string[]) => {
      for (const it of [...p.inv.items]) if (cats.includes(ITEM[it.id].cat)) sell(it, it.qty);
    };
    return h('div', { cls: 'cols' },
      h('div', { cls: 'col' }, h('h3', {}, 'For Sale'), buyList),
      h('div', { cls: 'col' },
        h('div', { cls: 'spread' }, h('h3', {}, 'Your Hold'), h('div', { cls: 'flex' }, h('button', { cls: 'small', onclick: () => sellCat(['treasure']) }, 'Sell treasure'), h('button', { cls: 'small', onclick: () => sellCat(['trade']) }, 'Sell goods'))),
        sellList,
        h('div', { cls: 'lbl mt' }, h('span', {}, 'Cargo'), h('span', {}, `${Math.round(p.inv.weight())} / ${g.cargoCap()}`)),
        bar(p.inv.weight() / g.cargoCap(), 'gold')
      )
    );
  }

  private candidates(isl: Island): CrewMember[] {
    const g = this.g;
    const day = g.env.day;
    const rng = new RNG(hash2(isl.id, day, WORLD_SEED + 77));
    const n = 3 + (isl.port?.size ?? 1) * 2;
    const out: CrewMember[] = [];
    for (let i = 0; i < n; i++) {
      const lvl = Math.max(1, Math.min(10, isl.level + rng.int(-1, 2)));
      const c = genCrew(rng, lvl);
      c.id = -(i + 1);
      out.push(c);
    }
    const hired = g.profile.hireSeed[isl.id];
    if (hired && hired[0] === day) return out.filter((_, i) => !hired.includes(-(i + 1)));
    return out;
  }

  private tavern(isl: Island, refresh: () => void): HTMLElement {
    const g = this.g;
    const p = g.profile;
    const cap = g.player.stats.crewCap;
    const full = p.crew.length >= cap;
    const cands = this.candidates(isl);
    const cards = h('div', { cls: 'cards' }, cands.map((c) => {
      const cost = hireCost(c);
      const r = ROLE[c.role];
      return h('div', { cls: 'card' },
        h('div', { cls: 'spread' }, h('h4', {}, c.name), h('span', { style: `color:#${r.shirt.toString(16).padStart(6, '0')}` }, '■')),
        h('div', {}, `${r.name} · Level ${c.level} · Skill ${c.skill}`),
        h('div', { cls: 'hint' }, r.desc),
        h('div', {}, c.traits.map((t) => h('span', { cls: `trait ${TRAIT[t].good ? 'g' : 'b'}`, title: TRAIT[t].desc }, TRAIT[t].name))),
        h('div', { cls: 'spread' }, h('span', { cls: 'muted' }, `Wage ${c.wage}g/day`), h('button', { cls: 'small primary', disabled: full || p.gold < cost, onclick: () => {
          p.gold -= cost;
          const real = { ...c, id: 0 };
          const fresh = genCrew(new RNG(1), 1);
          real.id = fresh.id;
          p.crew.push(real);
          const day = g.env.day;
          const list = p.hireSeed[isl.id] && p.hireSeed[isl.id][0] === day ? p.hireSeed[isl.id] : [day];
          list.push(c.id);
          p.hireSeed[isl.id] = list;
          g.player.crew = p.crew;
          g.player.autoAssign();
          g.player.placeCrewInstantly();
          audio.ui('buy');
          g.toast(`${c.name} the ${r.name} signs the articles!`, '#c8f0a0');
          if (p.tutorial === 6) g.advanceTutorial(6);
          refresh();
        } }, `Hire ${gold(cost)}`))
      );
    }));
    const roundCost = Math.max(5, p.crew.length * 4);
    const rumorCost = isl.port!.faction === F_BRETHREN ? 90 : 140;
    const dayKey = `${isl.id}:${g.env.day}`;
    const usedRumor = p.rumors.includes(dayKey);
    return h('div', {},
      h('div', { cls: 'spread' }, h('h3', { style: 'margin:0;color:var(--gold)' }, 'Sailors looking for a berth'), h('span', { cls: full ? 'bad' : 'muted' }, `Crew ${p.crew.length}/${cap}${full ? ' — build Crew Quarters for more room' : ''}`)),
      cands.length ? cards : h('div', { cls: 'muted' }, 'Nobody else is looking for work today. Come back tomorrow.'),
      h('div', { cls: 'flex wrap mt' },
        h('button', { disabled: !p.crew.length || p.gold < roundCost, onclick: () => {
          p.gold -= roundCost;
          for (const c of p.crew) c.morale = Math.min(100, c.morale + 15);
          audio.ui('coin');
          g.toast('You buy a round. The crew roars a shanty!', '#c8f0a0');
          refresh();
        } }, `Buy the crew a round (${gold(roundCost)})`),
        h('button', { disabled: !!usedRumor || p.gold < rumorCost, onclick: () => {
          const data = makeTreasureMap(isl.x, isl.y, new RNG(hash2(isl.id, g.env.day, 4242)), isl.level);
          if (!data) return;
          p.gold -= rumorCost;
          p.inv.add('treasure_map', 1, data);
          p.rumors = [...p.rumors.slice(-30), dayKey];
          audio.ui('buy');
          g.toast(`An old salt sells you a map to treasure on ${data.island}.`, '#ffd870');
          refresh();
        } }, usedRumor ? 'No more rumors today' : `Buy a treasure rumor (${gold(rumorCost)})`)
      )
    );
  }

  private shipwrightTab(onChange: () => void): HTMLElement {
    const g = this.g;
    const s = g.player;
    const frac = s.repairFraction();
    const cost = Math.ceil(frac * (s.base.hullMax + 200) * 1.1);
    const repair = h('button', { cls: 'primary', disabled: frac <= 0 || g.profile.gold < cost, onclick: () => {
      g.profile.gold -= cost;
      s.repairFull();
      audio.ui('buy');
      g.sound('creak', s.x, s.y);
      g.toast('Your ship is good as new.', '#c8f0a0');
      repair.setAttribute('disabled', '');
      repair.textContent = 'Fully repaired';
      onChange();
    } }, frac <= 0 ? 'Fully repaired' : `Repair ship (${gold(cost)})`);
    this.shipwright = new Shipwright(g, () => onChange());
    return h('div', { style: 'height:100%;display:flex;flex-direction:column;gap:0.5em' }, h('div', { cls: 'flex' }, repair, h('span', { cls: 'hint' }, `Hull ${Math.round(s.integrity() * 100)}% · Removing parts refunds half their price · Missing materials are bought for you at a markup`)), h('div', { style: 'flex:1;min-height:0' }, this.shipwright.el));
  }

  private harbor(isl: Island, refresh: () => void): HTMLElement {
    const g = this.g;
    const p = g.profile;
    const board = bountyBoard(isl, g.env.day).filter((q) => !p.quests.some((a) => a.title === q.title && a.port === q.port));
    const resupplyNeed = () => {
      const n = Math.max(1, p.crew.length);
      let food = 0;
      let water = 0;
      for (const it of p.inv.items) {
        food += (ITEM[it.id].food ?? 0) * it.qty;
        water += (ITEM[it.id].water ?? 0) * it.qty;
      }
      return { r: Math.max(0, Math.ceil(n * 4 - food)), w: Math.max(0, Math.ceil(n * 4 - water)) };
    };
    const need = resupplyNeed();
    const rp = priceOf(isl, ITEM.rations, p, g.env.epoch).buy;
    const wp = priceOf(isl, ITEM.water, p, g.env.epoch).buy;
    const supCost = need.r * rp + need.w * wp;
    return h('div', { cls: 'cols' },
      h('div', { cls: 'col' },
        h('h3', {}, 'Bounty Board'),
        h('div', { cls: 'list' }, board.length ? board.map((q) => h('div', { cls: 'card', style: 'margin-bottom:6px' },
          h('h4', {}, q.title),
          h('div', { cls: 'hint' }, q.desc),
          h('div', { cls: 'spread' }, h('span', {}, h('span', { cls: 'goldt' }, gold(q.reward)), ` · ${q.fame} fame · Lv ${q.level} · ${g.milesFrom(q.x, q.y).toFixed(0)} mi`),
            h('button', { cls: 'small primary', disabled: p.quests.length >= 4, onclick: () => {
              p.quests.push(acceptQuest(q));
              audio.ui('quest');
              g.toast(`Quest accepted: ${q.title}`, '#ffd870');
              refresh();
            } }, p.quests.length >= 4 ? 'Journal full' : 'Accept'))
        )) : h('div', { cls: 'muted' }, 'No new bounties today.'))
      ),
      h('div', { cls: 'col' },
        h('h3', {}, 'Your Contracts'),
        h('div', { cls: 'list' }, p.quests.length ? p.quests.map((q) => h('div', { cls: 'row' }, h('span', { cls: 'nm' }, `${q.done ? '✓ ' : ''}${q.title}`), h('span', { cls: 'muted' }, q.done ? `Return to ${q.portName}` : `${g.milesFrom(q.x, q.y).toFixed(0)} mi`), h('button', { cls: 'small danger', onclick: () => {
          p.quests.splice(p.quests.indexOf(q), 1);
          refresh();
        } }, 'Abandon'))) : h('div', { cls: 'muted' }, 'No active contracts.')),
        h('h3', { cls: 'mt' }, 'Provisions'),
        h('div', { cls: 'hint' }, 'Top up food and water to last your crew four days.'),
        h('button', { cls: 'mt', disabled: supCost <= 0 || p.gold < supCost || g.cargoFree() < need.r + need.w, onclick: () => {
          p.gold -= supCost;
          p.inv.add('rations', need.r);
          p.inv.add('water', need.w);
          recordTrade(p, isl.id, 'rations', need.r, g.env.epoch);
          recordTrade(p, isl.id, 'water', need.w, g.env.epoch);
          g.syncCargo();
          audio.ui('coin');
          refresh();
        } }, supCost <= 0 ? 'Fully provisioned' : `Buy ${need.r} rations + ${need.w} water (${gold(supCost)})`)
      )
    );
  }

  openCrew(): void {
    const g = this.g;
    const p = g.profile;
    const s = g.player;
    const stations: { ci: number; label: string; slots: number }[] = [];
    const counts: Record<string, number> = {};
    for (const ci of s.cells) {
      const st = s.stationOf(ci);
      if (!st) continue;
      const c = COMPONENTS[s.design.part[ci]];
      counts[c.key] = (counts[c.key] ?? 0) + 1;
      stations.push({ ci, label: `${c.name} ${counts[c.key]}`, slots: c.slots ?? 1 });
    }
    const equipOpts = (slot: 'weapon' | 'armor' | 'hat', cur: string | null) => {
      const ids = new Set<string>();
      for (const it of p.inv.items) if (ITEM[it.id].slot === slot) ids.add(it.id);
      if (cur) ids.add(cur);
      return [h('option', { value: '' }, '—'), ...[...ids].map((id) => {
        const o = h('option', { value: id }, ITEM[id].name);
        if (id === cur) o.setAttribute('selected', '');
        return o;
      })];
    };
    const rerender = () => this.openCrew();
    const table = h('table', { cls: 'crew' },
      h('tr', {}, ['Name', 'Role', 'Lv', 'Health', 'Morale', 'Station', 'Lock', 'Weapon', 'Armor', 'Hat', 'Wage', ''].map((t) => h('th', {}, t))),
      p.crew.map((c) => {
        const r = ROLE[c.role];
        const sel = h('select', {}, h('option', { value: '-1' }, 'Idle / auto'), stations.map((st) => {
          const used = s.crew.filter((o) => o.station === st.ci && o !== c).length;
          const o = h('option', { value: st.ci }, `${st.label} (${used}/${st.slots})`);
          if (c.station === st.ci) o.setAttribute('selected', '');
          if (used >= st.slots && c.station !== st.ci) o.setAttribute('disabled', '');
          return o;
        })) as HTMLSelectElement;
        sel.addEventListener('change', () => {
          c.station = +sel.value;
          c.locked = c.station >= 0;
          s.statsDirty = true;
          audio.ui('click');
          rerender();
        });
        const lock = h('input', { type: 'checkbox', title: 'Locked crew keep their station when you give orders' }) as HTMLInputElement;
        lock.checked = c.locked;
        lock.addEventListener('change', () => {
          c.locked = lock.checked;
        });
        const eq = (slot: 'weapon' | 'armor' | 'hat') => {
          const se = h('select', {}, equipOpts(slot, c[slot])) as HTMLSelectElement;
          se.addEventListener('change', () => {
            const old = c[slot];
            if (old) p.inv.add(old, 1);
            c[slot] = se.value || null;
            if (c[slot]) p.inv.remove(c[slot]!, 1);
            g.syncCargo();
            audio.ui('click');
            rerender();
          });
          return se;
        };
        return h('tr', { title: `${r.desc}\nTraits: ${c.traits.map((t) => `${TRAIT[t].name} (${TRAIT[t].desc})`).join(', ') || 'none'}` },
          h('td', {}, h('span', { style: `color:#${r.shirt.toString(16).padStart(6, '0')}` }, '■ '), c.name, c.traits.length ? h('div', {}, c.traits.map((t) => h('span', { cls: `trait ${TRAIT[t].good ? 'g' : 'b'}` }, TRAIT[t].name))) : ''),
          h('td', {}, r.name),
          h('td', { title: `${c.xp}/${xpToNext(c.level)} xp` }, `${c.level}`, bar(c.xp / xpToNext(c.level), 'gold')),
          h('td', {}, bar(c.hp / c.maxHp, c.hp / c.maxHp < 0.4 ? 'red' : '')),
          h('td', {}, bar(c.morale / 100, c.morale < 35 ? 'red' : '')),
          h('td', {}, sel),
          h('td', {}, lock),
          h('td', {}, eq('weapon')),
          h('td', {}, eq('armor')),
          h('td', {}, eq('hat')),
          h('td', {}, `${c.wage}g`),
          h('td', {}, h('button', { cls: 'small danger', onclick: () => {
            if (!confirm(`Dismiss ${c.name}? They will leave the crew.`)) return;
            for (const sl of ['weapon', 'armor', 'hat'] as const) if (c[sl]) p.inv.add(c[sl]!, 1);
            p.crew.splice(p.crew.indexOf(c), 1);
            s.crew = p.crew;
            s.autoAssign();
            rerender();
          } }, '✕'))
        );
      })
    );
    let wages = 0;
    for (const c of p.crew) wages += c.wage;
    const orders = h('div', { cls: 'flex wrap' }, (['sail', 'battle', 'repair', 'board', 'rest'] as Order[]).map((o) => h('button', { cls: s.order === o ? 'primary' : '', title: ORDER_INFO[o].desc, onclick: () => {
      g.setOrder(o);
      rerender();
    } }, `${ORDER_INFO[o].key} ${ORDER_INFO[o].name}`)));
    const st = s.stats;
    const body = h('div', { cls: 'pbody', style: 'display:flex;flex-direction:column;gap:0.5em' },
      orders,
      h('div', { cls: 'hint' }, `${ORDER_INFO[s.order].desc} Unlocked crew are reassigned when you change orders.`),
      p.crew.length ? h('div', { cls: 'list', style: 'flex:1' }, table) : h('div', { cls: 'muted' }, 'You sail alone. Hire crew at any tavern — each role excels at a different station.'),
      h('div', { cls: 'hint' }, `Captain covers the helm and the patched sail alone. Station efficiency: sails ${pct(avg(s, 'sail'))}, guns ${pct(avg(s, 'gun'))}, oars ${pct(avg(s, 'oar'))} · Repair ${st.repair.toFixed(1)}/s · Heal ${st.heal.toFixed(1)}/s`)
    );
    this.open('crew', this.panel('Crew Roster', `${p.crew.length}/${st.crewCap} hands · wages ${wages}g per day · ${s.name}`, body));
  }

  openHold(selected?: InvItem): void {
    const g = this.g;
    const p = g.profile;
    const items = p.inv.sorted();
    let sel = selected && p.inv.items.includes(selected) ? selected : items[0];
    const detail = h('div', { cls: 'detail' });
    const grid = h('div', { cls: 'invgrid' });
    const renderDetail = () => {
      detail.innerHTML = '';
      if (!sel) {
        detail.append(h('div', { cls: 'muted' }, 'Your hold is empty.'));
        return;
      }
      const it = sel;
      const d = ITEM[it.id];
      const actions = h('div', { cls: 'flex wrap mt' });
      if (d.slot) actions.append(h('button', { cls: 'primary', onclick: () => {
        const slot = d.slot!;
        const old = p[slot];
        p.inv.remove(it.id, 1);
        if (old) p.inv.add(old, 1);
        p[slot] = it.id;
        g.syncCargo();
        audio.ui('buy');
        this.openHold();
      } }, 'Equip (Captain)'));
      if (d.usable) actions.append(h('button', { cls: 'primary', onclick: () => {
        this.useItem(it);
        this.openHold();
      } }, d.id === 'bottle_message' ? 'Uncork' : 'Use'));
      actions.append(h('button', { cls: 'danger', onclick: () => {
        if (it.qty > 1 && !confirm(`Throw ${it.qty} ${d.name} overboard?`)) return;
        p.inv.removeEntry(it);
        if (g.mode === 'sail') {
          const back = g.player.radius + 26;
          g.dropLoot(g.player.x - Math.cos(g.player.heading) * back, g.player.y - Math.sin(g.player.heading) * back, 0, [{ id: it.id, qty: it.qty, data: it.data }], 0);
          g.loot[g.loot.length - 1].delay = 6;
        }
        g.syncCargo();
        this.openHold();
      } }, 'Drop'));
      let extra: HTMLElement | string = '';
      if (it.data) {
        const dd = it.data;
        const dist = g.milesFrom(dd.x, dd.y);
        const exact = p.inv.has('sextant');
        extra = h('div', { cls: 'goldt mt' }, `Marks a spot on ${dd.island}. ${exact ? `${dist.toFixed(1)} miles away at ${g.coords(dd.x, dd.y)}.` : `Roughly ${Math.round(dist / 5) * 5 || 1} miles away.`} It is marked on your map. Dig there with a Shovel.`);
        actions.prepend(h('button', { onclick: () => {
          p.waypoint = { x: dd.x, y: dd.y };
          g.toast('Waypoint set to the treasure.', '#ffd870');
        } }, 'Set waypoint'));
      }
      detail.append(
        h('div', { cls: 'flex' }, itemIcon(it.id), h('div', {}, h('h3', { style: `color:${RARITY_COLORS[d.rarity]}` }, d.name), h('div', { cls: 'muted' }, `${RARITY_NAMES[d.rarity]} ${d.cat} · ${d.weight} wt each · worth ~${gold(d.price)}`))),
        h('div', { cls: 'mt' }, d.desc),
        d.combat ? h('div', { cls: 'good' }, `Combat +${d.combat}`) : '',
        d.defense ? h('div', { cls: 'good' }, `Defense +${d.defense}`) : '',
        d.food ? h('div', {}, `Food value ${d.food}`) : '',
        d.water ? h('div', {}, `Water value ${d.water}`) : '',
        extra,
        actions
      );
    };
    for (const it of items) {
      const d = ITEM[it.id];
      const slot = h('div', { cls: `slot ${it === sel ? 'sel' : ''}`, title: d.name, style: `border-bottom-color:${RARITY_COLORS[d.rarity]}` }, itemIcon(it.id), it.qty > 1 ? h('span', { cls: 'q' }, `${it.qty}`) : '');
      slot.addEventListener('click', () => {
        sel = it;
        Array.from(grid.children).forEach((c) => c.classList.remove('sel'));
        slot.classList.add('sel');
        audio.ui('click');
        renderDetail();
      });
      grid.append(slot);
    }
    renderDetail();
    const eqSlot = (slot: 'weapon' | 'armor' | 'hat', label: string) => {
      const id = p[slot];
      return h('div', { cls: 'row' }, id ? itemIcon(id) : h('div', { cls: 'icon' }), h('span', { cls: 'nm' }, `${label}: ${id ? ITEM[id].name : '—'}`), id ? h('button', { cls: 'small', onclick: () => {
        p.inv.add(id, 1);
        p[slot] = null;
        g.syncCargo();
        this.openHold();
      } }, 'Unequip') : '');
    };
    let value = 0;
    for (const it of p.inv.items) value += ITEM[it.id].price * it.qty;
    const body = h('div', { cls: 'cols' },
      h('div', { cls: 'col', style: 'flex:1.6' }, h('div', { cls: 'list' }, grid), h('div', { cls: 'lbl mt' }, h('span', {}, 'Cargo'), h('span', {}, `${Math.round(p.inv.weight())} / ${g.cargoCap()} · est. value ${gold(value)}`)), bar(p.inv.weight() / g.cargoCap(), 'gold')),
      h('div', { cls: 'col' }, h('h3', {}, 'Captain'), h('div', { cls: 'muted' }, `Health ${Math.round(p.captainHp)}/100`), eqSlot('weapon', 'Weapon'), eqSlot('armor', 'Armor'), eqSlot('hat', 'Hat'), h('h3', { cls: 'mt' }, 'Item'), detail)
    );
    this.open('hold', this.panel('Ship\'s Hold', `${p.inv.items.length} stacks · ${gold(p.gold)}`, body));
  }

  useItem(it: InvItem): void {
    const g = this.g;
    const p = g.profile;
    const s = g.player;
    if (it.id === 'repair_kit') {
      if (s.repairFraction() <= 0) {
        g.toast('Your ship needs no repairs.');
        return;
      }
      p.inv.remove('repair_kit', 1);
      g.freeRepair = true;
      s.repair(s.base.hullMax * 0.3, g);
      g.freeRepair = false;
      s.flood = Math.max(0, s.flood - 0.3);
      g.sound('creak', s.x, s.y);
      g.toast('Patched the worst of the damage.', '#c8f0a0');
    } else if (it.id === 'medicine') {
      p.inv.remove('medicine', 1);
      for (const c of p.crew) c.hp = Math.min(c.maxHp, c.hp + 40);
      p.captainHp = Math.min(100, p.captainHp + 40);
      g.toast('The crew\'s wounds are dressed.', '#c8f0a0');
    } else if (it.id === 'bottle_message') {
      p.inv.remove('bottle_message', 1);
      const rng = new RNG(hash2(Math.floor(g.env.epoch), p.inv.items.length, 99));
      const r = rng.next();
      if (r < 0.45) {
        const data = makeTreasureMap(s.x, s.y, rng, levelAt(s.x, s.y));
        if (data) {
          p.inv.add('treasure_map', 1, data);
          g.toast(`A treasure map! It leads to ${data.island}.`, '#ffd870');
          audio.ui('quest');
          return;
        }
      }
      if (r < 0.75) {
        const loot = rollLoot('chest', levelAt(s.x, s.y), rng, g.luck());
        g.addItems(loot.items.slice(0, 1), Math.round(loot.gold * 0.5), s.x, s.y, 'Inside the bottle');
        return;
      }
      const notes = ['"Beware the black sails beyond the Ashen Reach..."', '"To whoever finds this: the Crown pays well for pirate heads."', '"The ghost ships only sail when the moon is up."', '"Mermaid scales fetch a fortune in Pirate Havens."', '"The Frostreach hides furs and amber aplenty."', '"I buried my gold where the sand glitters. Bring a shovel."'];
      g.toast(rng.pick(notes), '#a8e0ff');
    } else if (it.id === 'sea_chart') {
      p.inv.remove('sea_chart', 1);
      const cx = Math.floor(s.x / 1024);
      const cy = Math.floor(s.y / 1024);
      for (let x = cx - 14; x <= cx + 14; x++) for (let y = cy - 14; y <= cy + 14; y++) {
        if (x < 0 || y < 0 || x >= 500 || y >= 500) continue;
        if ((x - cx) ** 2 + (y - cy) ** 2 > 196) continue;
        if (!p.discovered[y * 500 + x]) {
          p.discovered[y * 500 + x] = 1;
          this.map.markFog(x, y);
        }
      }
      g.toast('You chart the surrounding waters onto your map.', '#a8e0ff');
      audio.ui('quest');
    }
    g.syncCargo();
  }

  openIsland(isl: Island): void {
    const g = this.g;
    const p = g.profile;
    const own = p.ownedIsland(isl.id);
    const rerender = () => this.openIsland(isl);
    if (!own) {
      const price = claimPrice(isl);
      const fame = claimFame(isl);
      const body = h('div', { cls: 'pbody fight' },
        h('div', {}, `${ISLAND_TYPE_NAMES[isl.type]} in the ${BIOME_NAMES[isl.biome]} · ${(isl.r * 2 / 512).toFixed(2)} miles across · Danger ${isl.level}`),
        h('div', { cls: 'hint' }, `Owning ${isl.name} lets you build up to ${structureSlots(isl)} structures: plantations, mines, a dock to repair and respawn at, forts to defend it, and more. Buildings keep producing while you're away.`),
        h('div', { cls: 'stat' }, h('span', {}, 'Deed price'), h('b', {}, gold(price))),
        h('div', { cls: 'stat' }, h('span', {}, 'Fame required'), h('b', { cls: p.fame >= fame ? 'good' : 'bad' }, `${fame} (you have ${Math.floor(p.fame)})`)),
        h('button', { cls: 'primary', disabled: p.gold < price || p.fame < fame, onclick: () => {
          p.gold -= price;
          p.owned.push({ id: isl.id, name: isl.name, structures: [], storage: {}, last: g.env.epoch });
          p.fame += 10;
          audio.ui('levelup');
          g.toast(`${isl.name} is yours! Plant your flag, Captain.`, '#ffd870');
          rerender();
        } }, `Buy ${isl.name}`)
      );
      this.open('island', this.panel(isl.name, 'Unclaimed land', body, 'narrow'));
      return;
    }
    g.produceIsland(own, g.env.epoch);
    const slots = structureSlots(isl);
    const cap = g.islandCap(own);
    let stored = 0;
    for (const k in own.storage) stored += own.storage[k];
    const nameIn = h('input', { type: 'text', value: own.name, maxlength: 24 }) as HTMLInputElement;
    nameIn.addEventListener('change', () => (own.name = nameIn.value || isl.name));
    const storageRows = Object.entries(own.storage).filter(([, v]) => v >= 1).map(([k, v]) => h('div', { cls: 'row' }, itemIcon(k), h('span', { cls: 'nm' }, ITEM[k].name), h('span', {}, `${Math.floor(v)}`)));
    const build = STRUCTURES.map((st) => {
      const has = own.structures.includes(st.id);
      const matOk = Object.entries(st.mats).every(([k, v]) => p.inv.count(k) >= v);
      const can = !has && own.structures.length < slots && p.gold >= st.price && matOk;
      const prod = st.produce ? st.produce.map((pr) => `${pr.perHour}/h ${ITEM[st.id === 'plantation' ? PLANTATION_CROPS[isl.biome] : pr.item].name}`).join(', ') : '';
      return h('div', { cls: 'row', title: st.desc },
        h('span', { cls: 'nm' }, h('span', { cls: has ? 'good' : '' }, st.name), h('div', { cls: 'hint' }, `${st.desc}${prod ? ' ' + prod : ''}`)),
        has ? h('span', { cls: 'good' }, 'Built') : h('button', { cls: 'small', disabled: !can, onclick: () => {
          p.gold -= st.price;
          for (const k in st.mats) p.inv.remove(k, st.mats[k]);
          own.structures.push(st.id);
          if (st.id === 'dock' && !p.home) p.home = isl.id;
          g.syncCargo();
          audio.ui('buy');
          g.sound('creak', g.player.x, g.player.y);
          g.toast(`Built a ${st.name} on ${own.name}.`, '#c8f0a0');
          rerender();
        } }, `${gold(st.price)} + ${Object.entries(st.mats).map(([k, v]) => `${v} ${ITEM[k].name}`).join(', ')}`)
      );
    });
    const hasDock = own.structures.includes('dock');
    const hasTavern = own.structures.includes('tavern');
    const body = h('div', { cls: 'cols' },
      h('div', { cls: 'col' },
        h('h3', {}, `Buildings ${own.structures.length}/${slots}`),
        h('div', { cls: 'list' }, build)
      ),
      h('div', { cls: 'col' },
        h('div', { cls: 'flex' }, h('span', {}, 'Name'), nameIn),
        h('h3', { cls: 'mt' }, `Storehouse ${Math.floor(stored)}/${cap}`),
        h('div', { cls: 'list' }, storageRows.length ? storageRows : h('div', { cls: 'muted' }, 'Nothing stored yet. Build producers and come back later.')),
        h('div', { cls: 'flex wrap mt' },
          h('button', { cls: 'primary', disabled: !storageRows.length, onclick: () => {
            const items = Object.entries(own.storage).filter(([, v]) => v >= 1).map(([k, v]) => ({ id: k, qty: Math.floor(v) }));
            const left = g.addItems(items, 0, g.player.x, g.player.y, 'Collected');
            own.storage = {};
            for (const l of left) own.storage[l.id] = l.qty;
            rerender();
          } }, 'Load into hold'),
          hasDock ? h('button', { disabled: g.player.repairFraction() <= 0, onclick: () => {
            g.player.repairFull();
            g.toast('Your dockhands repaired the ship for free.', '#c8f0a0');
            rerender();
          } }, 'Repair at dock (free)') : '',
          hasDock ? h('button', { disabled: p.home === isl.id, onclick: () => {
            p.home = isl.id;
            g.toast(`${own.name} is now your home port.`, '#c8f0a0');
            rerender();
          } }, p.home === isl.id ? 'Home port ✓' : 'Make home port') : '',
          hasTavern ? h('button', { onclick: () => this.openIslandTavern(isl) }, 'Visit your tavern') : ''
        )
      )
    );
    this.open('island', this.panel(own.name, `Your ${ISLAND_TYPE_NAMES[isl.type]} · ${BIOME_NAMES[isl.biome]}`, body));
  }

  private openIslandTavern(isl: Island): void {
    const fake: Island = { ...isl, port: { name: isl.name, faction: 1, size: 1 } };
    const body = h('div', { cls: 'pbody' });
    const refresh = () => {
      body.innerHTML = '';
      body.append(this.tavern(fake, refresh));
    };
    refresh();
    this.open('itavern', this.panel(`${isl.name} Tavern`, 'Your own sailors\' rest', body));
  }

  openJournal(tab = 'quests'): void {
    const g = this.g;
    const p = g.profile;
    const tabs = h('div', { cls: 'tabs' });
    const body = h('div', { cls: 'pbody' });
    const set = (t: string) => {
      Array.from(tabs.children).forEach((c) => c.classList.toggle('on', (c as HTMLElement).dataset.t === t));
      body.innerHTML = '';
      if (t === 'quests') {
        body.append(
          h('h3', { style: 'color:var(--gold)' }, 'Contracts'),
          p.quests.length ? h('div', { cls: 'cards' }, p.quests.map((q) => h('div', { cls: 'card' }, h('h4', {}, `${q.done ? '✓ ' : ''}${q.title}`), h('div', { cls: 'hint' }, q.desc), h('div', {}, `${gold(q.reward)} · ${q.fame} fame · from ${q.portName}`), h('div', { cls: 'muted' }, q.done ? `Return to ${q.portName}` : `${g.milesFrom(q.x, q.y).toFixed(1)} miles away`), h('div', { cls: 'flex' }, h('button', { cls: 'small', onclick: () => {
            const isl = q.done ? getIsland(q.port) : null;
            p.waypoint = isl ? { x: isl.x, y: isl.y } : { x: q.x, y: q.y };
            g.toast('Waypoint set.', '#ffd870');
          } }, 'Set waypoint'))))) : h('div', { cls: 'muted' }, 'No contracts. Visit a Harbor Master to take bounties.'),
          h('h3', { style: 'color:var(--gold)', cls: 'mt' }, 'Getting Started'),
          h('div', {}, TUTORIAL.slice(0, -1).map((t, i) => h('div', { cls: i < p.tutorial ? 'good' : i === p.tutorial ? 'goldt' : 'muted' }, `${i < p.tutorial ? '✓' : i === p.tutorial ? '►' : '·'} ${t.text}`)))
        );
      } else if (t === 'log') {
        const st = p.stats;
        const rows: [string, string][] = [
          ['Ships sunk', `${st.sunk}`],
          ['Ships boarded', `${st.boarded}`],
          ['Miles sailed', `${(st.distance / 512).toFixed(1)}`],
          ['Treasures found', `${st.treasures}`],
          ['Gold earned', gold(st.goldEarned)],
          ['Islands sighted', `${st.islandsVisited}`],
          ['Ports visited', `${p.visitedPorts.length}`],
          ['Contracts completed', `${p.completedQuests}`],
          ['Times sunk', `${st.deaths}`],
          ['Time at sea', fmtTime(st.playSeconds)],
          ['Fame', `${Math.floor(p.fame)}`],
          ['Notoriety', `${Math.floor(p.notoriety)}/100`]
        ];
        body.append(h('div', { style: 'max-width:30em' }, rows.map(([a, b]) => h('div', { cls: 'stat' }, h('span', {}, a), h('b', {}, b)))));
      } else if (t === 'islands') {
        body.append(p.owned.length ? h('div', { cls: 'cards' }, p.owned.map((o) => {
          const isl = getIsland(o.id);
          return h('div', { cls: 'card' }, h('h4', {}, o.name), h('div', { cls: 'muted' }, isl ? `${ISLAND_TYPE_NAMES[isl.type]} · ${g.milesFrom(isl.x, isl.y).toFixed(0)} mi away` : ''), h('div', {}, o.structures.map((s) => STRUCT[s]?.name).join(', ') || 'No buildings'), h('button', { cls: 'small', onclick: () => {
            if (isl) p.waypoint = { x: isl.x, y: isl.y };
            g.toast('Waypoint set.', '#ffd870');
          } }, 'Set waypoint'));
        })) : h('div', { cls: 'muted' }, 'You own no land. Find an island with a claim stone, go ashore and buy the deed.'));
      } else if (t === 'factions') {
        const n = p.notoriety;
        body.append(h('div', { cls: 'fight', style: 'max-width:40em' },
          h('div', {}, h('b', { cls: 'goldt' }, 'The Crown Navy'), h('div', { cls: n >= 40 ? 'bad' : 'good' }, n >= 70 ? 'Shoots on sight. Crown ports turn you away.' : n >= 40 ? 'Hunting you. Navy ships will attack.' : 'Tolerates you.')),
          h('div', {}, h('b', { cls: 'goldt' }, 'The Brethren (pirates)'), h('div', { cls: n >= 60 ? 'good' : 'bad' }, n >= 60 ? 'Respect you as one of their own. Pirates leave you be.' : 'See you as easy prey.')),
          h('div', {}, h('b', { cls: 'goldt' }, 'The Merchant Guild'), h('div', {}, 'Neutral traders. Attacking them raises notoriety, but their holds are full.')),
          h('div', {}, h('b', { cls: 'goldt' }, 'The Drowned'), h('div', { cls: 'bad' }, 'Ghost ships that sail at night, especially in the Mistveil. Always hostile.')),
          h('div', { cls: 'hint' }, 'Notoriety rises when you attack Crown or Guild ships and slowly fades over time. High notoriety summons bounty hunters.')
        ));
      }
    };
    for (const [k, n] of [['quests', 'Quests'], ['log', 'Captain\'s Log'], ['islands', 'Your Islands'], ['factions', 'Factions']]) {
      const tb = h('div', { cls: 'tab', onclick: () => set(k) }, n);
      tb.dataset.t = k;
      tabs.append(tb);
    }
    set(tab);
    this.open('journal', this.panel('Journal', `Captain ${p.name}`, [tabs, body]));
  }

  openBoarding(res: BoardResult): void {
    const g = this.g;
    const oursBar = bar(1);
    const theirsBar = bar(1, 'red');
    const status = h('div', { cls: 'goldt' }, 'Grappling hooks away!');
    const result = h('div', {});
    const body = h('div', { cls: 'pbody fight' },
      h('div', { cls: 'lbl' }, h('span', {}, `Your boarding party (${Math.round(res.ourStart)})`)),
      oursBar,
      h('div', { cls: 'lbl' }, h('span', {}, `${res.enemy.name} (${Math.round(res.theirStart)})`)),
      theirsBar,
      status,
      result
    );
    let claimed = false;
    this.open('boarding', this.panel('Boarding Action!', `${res.enemy.captain} of the ${res.enemy.name}`, body, 'narrow', false), () => {
      if (res.win && !claimed) {
        claimed = true;
        g.claimLoot(res, []);
      }
    }, true);
    let i = 0;
    const lines = ['Steel rings across the deck!', 'Pistols crack in the smoke!', 'Your crew surges forward!', 'They fight like devils!', 'Cutlasses flash!', 'Bodies hit the water!'];
    const step = () => {
      if (!this.modal || this.modal.dataset.name !== 'boarding') return;
      if (i < res.rounds.length) {
        const r = res.rounds[i];
        (oursBar.firstElementChild as HTMLElement).style.width = `${(r.ours / res.ourStart) * 100}%`;
        (theirsBar.firstElementChild as HTMLElement).style.width = `${(r.theirs / Math.max(1, res.theirStart)) * 100}%`;
        status.textContent = lines[i % lines.length];
        audio.play('sword', g.player.x, g.player.y, 0.8, 0.8 + Math.random() * 0.4);
        i++;
        setTimeout(step, 420);
        return;
      }
      this.modal.dataset.locked = '';
      delete this.modal.dataset.locked;
      if (res.win) {
        status.textContent = `Victory! The ${res.enemy.name} is yours.`;
        audio.ui('levelup');
        const picks = new Set<CrewMember>();
        result.append(
          res.dead.length ? h('div', { cls: 'bad' }, `Lost: ${res.dead.map((c) => c.name).join(', ')}`) : h('div', { cls: 'good' }, 'No lives lost.'),
          h('div', { cls: 'goldt mt' }, `${gold(res.gold)} in the captain's strongbox`),
          h('div', { cls: 'flex wrap' }, res.items.map((it) => h('span', { cls: 'flex' }, itemIcon(it.id), `${it.qty > 1 ? it.qty + '× ' : ''}${ITEM[it.id].name}`))),
          res.recruits.length ? h('div', { cls: 'mt' }, h('div', { cls: 'muted' }, 'Survivors willing to join you:'), res.recruits.map((c) => {
            const cb = h('input', { type: 'checkbox' }) as HTMLInputElement;
            cb.addEventListener('change', () => (cb.checked ? picks.add(c) : picks.delete(c)));
            return h('label', { cls: 'flex' }, cb, `${c.name} — ${ROLE[c.role].name} Lv ${c.level} (${c.wage}g/day)`);
          })) : '',
          h('button', { cls: 'primary mt', onclick: () => {
            claimed = true;
            g.claimLoot(res, [...picks]);
            this.close();
          } }, 'Claim the plunder and scuttle her')
        );
      } else {
        status.textContent = 'Repelled! Your boarders fall back.';
        audio.ui('error');
        result.append(
          res.dead.length ? h('div', { cls: 'bad' }, `Lost: ${res.dead.map((c) => c.name).join(', ')}`) : '',
          res.gold < 0 ? h('div', { cls: 'bad' }, `They seized ${gold(-res.gold)} from your purse.`) : '',
          h('div', { cls: 'hint' }, 'Weaken the enemy crew with grapeshot first, hire Marines, or arm your crew.'),
          h('button', { cls: 'primary mt', onclick: () => this.close() }, 'Fall back')
        );
      }
    };
    setTimeout(step, 500);
  }

  openDeath(info: { goldLost: number; drowned: string[]; cargo: number }): void {
    const g = this.g;
    const body = h('div', { cls: 'pbody fight' },
      h('div', {}, `The sea claims the ${g.player.name}. You cling to the wreckage until a fishing boat pulls you aboard.`),
      info.goldLost ? h('div', { cls: 'bad' }, `Lost ${gold(info.goldLost)}.`) : '',
      info.cargo ? h('div', { cls: 'bad' }, `${info.cargo} stacks of cargo went down with the ship. Its wreck is marked on your map — salvage it!`) : '',
      info.drowned.length ? h('div', { cls: 'bad' }, `Drowned: ${info.drowned.join(', ')}`) : h('div', { cls: 'good' }, 'All hands survived.'),
      h('button', { cls: 'primary mt', onclick: () => {
        this.close(true);
        g.respawn();
      } }, 'Wash ashore')
    );
    setTimeout(() => this.open('death', this.panel('Your Ship Has Sunk', 'Davy Jones sends his regards', body, 'narrow', false), undefined, true), 1800);
  }
}

function avg(s: Game['player'], st: string): number {
  let t = 0;
  let n = 0;
  for (const ci of s.cells) {
    if (s.stationOf(ci) !== st) continue;
    t += s.stationEff[ci];
    n++;
  }
  return n ? t / n : -1;
}

function pct(v: number): string {
  return v < 0 ? '—' : `${Math.round(v * 100)}%`;
}

