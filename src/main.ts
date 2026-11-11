import '@fontsource/pixelify-sans/400.css';
import '@fontsource/pixelify-sans/600.css';
import '@fontsource/silkscreen/400.css';
import './ui/style.css';
import { Input } from './core/input';
import { Game } from './game/game';
import { Renderer } from './render/renderer';
import { UI } from './ui/ui';
import { audio } from './audio/audio';
import { saveGame, loadGame } from './game/save';
import { getIsland, START_ISLAND_ID, portLayout } from './world/worldgen';
import { Profile } from './game/player';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const game = new Game();
const input = new Input(canvas);
const ui = new UI(game);

const QUALITY: Record<string, number> = { full: 1, balanced: 0.75, performance: 0.5 };

function targetQuality(): number {
  const q = game.profile.settings.quality;
  if (QUALITY[q]) return QUALITY[q];
  const dpr = window.devicePixelRatio || 1;
  return Renderer.autoQualityFor(window.innerWidth * dpr * window.innerHeight * dpr);
}

let autoCap = 1;

function applyRender(): void {
  const auto = !QUALITY[game.profile.settings.quality];
  renderer.autoQuality = auto;
  renderer.resize(game.cam.zoom, auto ? Math.min(autoCap, targetQuality()) : targetQuality());
}

function applySettings(): void {
  const s = game.profile.settings;
  audio.volumes.master = s.master;
  audio.volumes.music = s.music;
  audio.volumes.sfx = s.sfx;
  audio.volumes.ambience = s.ambience;
  audio.applyVolumes();
  game.particles.quality = 0.3 + s.particles * 0.7;
  applyRender();
}

function preview(): void {
  const keepSettings = game.profile.settings;
  game.profile = new Profile();
  game.profile.settings = keepSettings;
  const isl = getIsland(START_ISLAND_ID)!;
  const L = portLayout(isl)!;
  game.profile.x = L.berthX + L.dirX * 60;
  game.profile.y = L.berthY + L.dirY * 60;
  game.profile.heading = Math.atan2(L.dirY, L.dirX);
  game.loadWorld();
  game.mode = 'title';
  game.cam.x = L.berthX + L.dirX * 150;
  game.cam.y = L.berthY + L.dirY * 150;
  game.spawnTitleFleet();
}

function save(): void {
  if (game.mode === 'title') return;
  saveGame(game.profile, game.seenIslands);
}

ui.onStart = (name, cont) => {
  const settings = game.profile.settings;
  if (cont) {
    const s = loadGame();
    if (s) {
      game.profile = s.profile;
      game.seenIslands = s.seen;
      game.loadWorld();
      game.toast(`Welcome back, Captain ${game.profile.name}.`, '#ffd870');
    } else game.startNew(name);
  } else {
    game.startNew(name);
    game.profile.settings = settings;
    save();
  }
  game.cam.zoom = game.profile.settings.zoom;
  applySettings();
};

ui.onQuit = () => {
  save();
  preview();
  ui.showTitle();
};

ui.onSettings = () => applySettings();

game.on('autosave', save);
game.on('mode', (m) => {
  document.body.classList.toggle('foot', m === 'foot');
});
game.env.onThunder = () => audio.ui('thunder');

window.addEventListener('resize', () => applyRender());
document.addEventListener('visibilitychange', () => {
  if (document.hidden) save();
});
window.addEventListener('pagehide', save);
window.addEventListener('pointerdown', () => audio.init(), { once: true });
window.addEventListener('keydown', () => audio.init(), { once: true });

preview();
ui.showTitle();
applySettings();

let last = performance.now();
const dts: number[] = [];
let slowChecks = 0;
let perfT = 0;
let fpsFrames = 0;
let fpsT = 0;
let hudT = 0;
let mmT = 0;

function frame(now: number): void {
  requestAnimationFrame(frame);
  let dt = (now - last) / 1000;
  last = now;
  if (dt > 0.1) dt = 0.1;
  if (dt <= 0) dt = 0.0001;
  if (!document.hidden) {
    dts.push(dt);
    if (dts.length > 180) dts.shift();
  }
  perfT += dt;
  if (perfT > 2 && dts.length >= 120) {
    perfT = 0;
    const sorted = [...dts].sort((a, b) => a - b);
    const fast = sorted[Math.floor(sorted.length * 0.1)];
    const median = sorted[Math.floor(sorted.length * 0.5)];
    const struggling = median > 1 / 50 || (median > fast * 1.45 && median > 1 / 100);
    slowChecks = struggling ? slowChecks + 1 : 0;
    if (renderer.autoQuality && slowChecks >= 2 && renderer.quality > 0.5) {
      autoCap = renderer.quality > 0.75 ? 0.75 : 0.5;
      applyRender();
      dts.length = 0;
      slowChecks = 0;
      if (game.mode !== 'title') game.toast('Lowered render resolution to keep things smooth (Settings → Render quality).', '#a8e0ff');
    }
  }
  fpsFrames++;
  fpsT += dt;
  if (fpsT >= 0.5) {
    game.fps = Math.round(fpsFrames / fpsT);
    fpsFrames = 0;
    fpsT = 0;
  }
  if (input.wheel !== 0 && !game.uiOpen && game.mode !== 'title') {
    const spy = game.profile.inv.has('spyglass');
    const z = Math.max(renderer.minZoom(spy), Math.min(2, game.cam.zoom - Math.sign(input.wheel)));
    if (z !== game.cam.zoom) {
      game.cam.zoom = z;
      game.profile.settings.zoom = z;
      renderer.resize(z, renderer.quality);
    }
  }
  input.blocked = game.uiOpen;
  if (game.mode === 'title') {
    game.cam.x += Math.cos(now / 20000) * dt * 7;
    game.cam.y += Math.sin(now / 14000) * dt * 5;
    game.titleTick(dt);
  } else {
    const modal = ui.modal?.dataset.name;
    const paused = (game.uiOpen && modal !== 'port') || ui.mapOpen;
    if (!paused) game.update(dt, input);
    else if (modal === 'boarding' || modal === 'death') game.particles.update(dt);
  }
  renderer.prepare(game, input.mouseX, input.mouseY);
  renderer.draw(game);
  if (game.mode !== 'title') {
    ui.hud.frame(dt);
    hudT += dt;
    if (hudT > 0.1) {
      hudT = 0;
      ui.hud.update();
    }
    mmT += dt;
    if (mmT > 0.15) {
      mmT = 0;
      ui.hud.minimap.draw(game);
    }
  }
  ui.drawMap();
  input.endFrame();
}

requestAnimationFrame(frame);

if (import.meta.env.DEV) Object.assign(window, { __game: game, __ui: ui, __renderer: renderer });
