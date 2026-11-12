import { hash2 } from '../core/rng';
import { clamp, angleDiff } from '../core/math';
import { COMPONENTS } from '../data/components';
import { ROLE } from '../data/crew';
import { STRUCT } from '../data/structures';
import { CHUNK, CHUNKS, islandsInRect, Island, portLayout, I_VOLCANO, WORLD_SIZE, getIsland } from '../world/worldgen';
import { T_DEEP, T_OCEAN, T_SHALLOW, EDGE_MARGIN } from '../world/terrain';
import { CELL } from '../game/design';
import type { Game } from '../game/game';
import type { Ship } from '../game/ship';
import { poisNear, POI } from '../game/pois';
import { shipSprite, pruneSprites } from './shipSprite';
import { artCanvas } from './artCanvas';
import { Art, Swap, flipX, ramp, shade as shadeHex } from '../art/palette';
import { noShadow } from '../art/compose';
import { OBJS, MAX_OBJ_W, MAX_OBJ_H } from '../world/objects';
import { structurePlaces } from '../world/structPlace';
import { SAILS, PARTS, OAR, CREW, CAPTAIN, FLAG, JOLLY, FIRE } from '../art/ship';
import { sprites } from './sprites';
import { CRATE, BARREL, GOLD_CHEST, BOTTLE, WRECK, QUEST_MARK, LOST_CARGO, GLINT, CLAIM_STONE, CLAIM_OWNED, CHEST, LOCKED_CHEST, SPARKLE, DIG_SPOT, SHRINE, XMARK, WAYPOINT, STRUCTURES } from '../art/props';
import { drawText } from './font';
import { SEGMENTS } from '../game/monster';
import { CAPTAIN_DOWN, CAPTAIN_UP, CAPTAIN_SIDE, CUTLASS, PISTOL_FLASH, CRAB, SKELETON, WRAITH, GULL, GULL_SHADOW, WHALE, SERPENT_HEAD, SERPENT_SEG, SERPENT_TAIL, SUBMERGED, FOOT_SHADOW } from '../art/actors';

const tmpIsl: Island[] = [];
const tmpPOI: POI[] = [];

const FACTION_COL: Record<string, number> = { pirate: 0xff6a5a, navy: 0x8ac8ff, merchant: 0xa8e890, ghost: 0x80ffc0, hunter: 0xffa040, player: 0xffe080 };
const FLAG_HEX: Record<string, number> = { pirate: 0x141414, navy: 0x2a4a9a, merchant: 0x3a8a4a, ghost: 0x3a6a5a, hunter: 0x8a2a1a, player: 0x141414 };

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  light: HTMLCanvasElement;
  lctx: CanvasRenderingContext2D;
  w = 480;
  h = 270;
  scale = 4;
  artScale = 4;
  baseScale = 4;
  dpr = 1;
  quality = 1;
  autoQuality = true;
  private frame = 0;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.light = document.createElement('canvas');
    this.lctx = this.light.getContext('2d')!;
    this.resize(0);
  }

  static autoQualityFor(pixels: number): number {
    const budget = 3.8e6;
    for (const q of [1, 0.75, 0.5]) if (pixels * q * q <= budget) return q;
    return 0.5;
  }

  resize(zoom: number, quality = this.quality): void {
    this.dpr = window.devicePixelRatio || 1;
    this.quality = quality;
    const pw = Math.round(window.innerWidth * this.dpr);
    const ph = Math.round(window.innerHeight * this.dpr);
    this.baseScale = Math.max(2, Math.round(ph / 384));
    this.artScale = clamp(this.baseScale + zoom, 1, this.baseScale + 3);
    this.scale = this.artScale * quality;
    const cw = Math.max(1, Math.round(pw * quality));
    const chh = Math.max(1, Math.round(ph * quality));
    if (this.canvas.width !== cw || this.canvas.height !== chh) {
      this.canvas.width = cw;
      this.canvas.height = chh;
    }
    this.w = cw / this.scale;
    this.h = chh / this.scale;
    const lw = Math.ceil(this.w / 2) + 1;
    const lh = Math.ceil(this.h / 2) + 1;
    if (this.light.width !== lw || this.light.height !== lh) {
      this.light.width = lw;
      this.light.height = lh;
    }
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.canvas.style.imageRendering = quality >= 1 ? 'pixelated' : 'auto';
    this.ctx.imageSmoothingEnabled = false;
  }

  snap(v: number): number {
    return Math.round(v * this.scale) / this.scale;
  }

  private base(): void {
    const S = this.scale;
    this.ctx.setTransform(S, 0, 0, S, 0, 0);
  }

  private rot(x: number, y: number, c: number, s: number): void {
    const S = this.scale;
    this.ctx.setTransform(c * S, s * S, -s * S, c * S, Math.round(x * S), Math.round(y * S));
  }

  minZoom(spyglass: boolean): number {
    return Math.max(1 - this.baseScale, spyglass ? -3 : -2);
  }

  prepare(g: Game, mx: number, my: number): void {
    let sx = 0;
    let sy = 0;
    if (g.cam.shake > 0 && g.profile.settings.screenShake) {
      sx = (Math.random() - 0.5) * g.cam.shake;
      sy = (Math.random() - 0.5) * g.cam.shake;
    }
    g.view.x = this.snap(g.cam.x - this.w / 2 + sx);
    g.view.y = this.snap(g.cam.y - this.h / 2 + sy);
    g.view.w = this.w;
    g.view.h = this.h;
    g.view.scale = this.scale;
    const k = (this.dpr * this.quality) / this.scale;
    g.mouseWX = g.view.x + mx * k;
    g.mouseWY = g.view.y + my * k;
    const m = 200;
    g.chunks.update(g.view.x - m, g.view.y - m, g.view.x + this.w + m, g.view.y + this.h + m, g.cam.x, g.cam.y);
  }

  draw(g: Game): void {
    this.frame++;
    const ctx = this.ctx;
    const v = g.view;
    const ox = v.x;
    const oy = v.y;
    const W = this.w;
    const H = this.h;
    const t = g.env.time;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#1b4776';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const Sc = this.scale;
    const cx0 = Math.floor(ox / CHUNK);
    const cy0 = Math.floor(oy / CHUNK);
    const cx1 = Math.floor((ox + W) / CHUNK);
    const cy1 = Math.floor((oy + H) / CHUNK);
    for (let cx = cx0; cx <= cx1; cx++) {
      const dx0 = Math.round((cx * CHUNK - ox) * Sc);
      const dx1 = Math.round(((cx + 1) * CHUNK - ox) * Sc);
      for (let cy = cy0; cy <= cy1; cy++) {
        const dy0 = Math.round((cy * CHUNK - oy) * Sc);
        const dy1 = Math.round(((cy + 1) * CHUNK - oy) * Sc);
        if (cx < 0 || cy < 0 || cx >= CHUNKS || cy >= CHUNKS) {
          ctx.fillStyle = '#14161e';
          ctx.fillRect(dx0, dy0, dx1 - dx0, dy1 - dy0);
          continue;
        }
        const ch = g.chunks.get(cx, cy);
        if (ch && ch.img) ctx.drawImage(ch.img, dx0, dy0, dx1 - dx0, dy1 - dy0);
      }
    }
    this.base();
    this.drawGlints(g, ox, oy, t);
    const S = sprites();
    poisNear(g.cam.x, g.cam.y, Math.max(W, H) * 0.8 + 60, tmpPOI);
    for (const p of tmpPOI) {
      if (p.kind === 'claim') continue;
      if (!g.poiAvailable(p)) continue;
      const sx = this.snap(p.x - ox);
      const sy = this.snap(p.y - oy);
      if (sx < -30 || sy < -30 || sx > W + 30 || sy > H + 30) continue;
      if (p.kind === 'flotsam') {
        const bob = this.snap(Math.sin(t * 2 + p.id) * 0.8);
        const spr = p.id % 2 ? CRATE : BARREL;
        ctx.drawImage(artCanvas(spr), sx - (spr.w >> 1), sy - (spr.h >> 1) + bob);
        if ((this.frame >> 4) % 3 === 0) ctx.drawImage(artCanvas(GLINT[2]), sx - 7, sy + 4);
      } else if (p.kind === 'bottle') {
        const bob = this.snap(Math.sin(t * 2.4 + p.id));
        ctx.drawImage(artCanvas(BOTTLE), sx - 3, sy - 5 + bob);
      } else if (p.kind === 'wreck') ctx.drawImage(artCanvas(WRECK), sx - 17, sy - 10);
    }
    for (const q of g.profile.quests) {
      if (q.kind !== 'salvage' || q.done) continue;
      const sx = this.snap(q.x - ox);
      const sy = this.snap(q.y - oy);
      if (sx > -30 && sy > -30 && sx < W + 30 && sy < H + 30) {
        ctx.drawImage(artCanvas(WRECK), sx - 17, sy - 10);
        ctx.drawImage(artCanvas(QUEST_MARK), sx - 2, this.snap(sy - 24 + Math.sin(t * 3) * 1.5));
      }
    }
    if (g.profile.lost) {
      const sx = this.snap(g.profile.lost.x - ox);
      const sy = this.snap(g.profile.lost.y - oy);
      if (sx > -20 && sy > -20 && sx < W + 20 && sy < H + 20) ctx.drawImage(artCanvas(LOST_CARGO), sx - 6, sy - 10);
    }
    g.particles.draw(ctx, ox, oy, W, H, 0, Sc);
    for (const l of g.loot) {
      const sx = this.snap(l.x - ox);
      const sy = this.snap(l.y - oy + Math.sin(l.bob * 2) * 0.8);
      if (sx < -10 || sy < -10 || sx > W + 10 || sy > H + 10) continue;
      const spr = artCanvas(l.kind === 2 ? GOLD_CHEST : l.kind === 1 ? BARREL : CRATE);
      if (l.life < 20 && (this.frame >> 3) % 2 === 0) continue;
      ctx.drawImage(spr, sx - (spr.width >> 1), sy - (spr.height >> 1));
    }
    this.drawLandObjects(g, ox, oy, tmpPOI);
    this.drawAmbientLow(g, ox, oy);
    for (const m of g.monsters) this.drawMonster(m, ox, oy, t);
    for (const s of g.ships) if (this.onScreen(s, ox, oy)) this.drawShipShadow(s, ox, oy);
    for (const s of g.ships) if (this.onScreen(s, ox, oy)) this.drawShip(g, s, ox, oy, t);
    this.drawStanding(g, ox, oy, tmpPOI);
    for (const p of g.projectiles) {
      const sx = p.x - ox;
      const sy = p.y - oy;
      if (sx < -10 || sy < -40 || sx > W + 10 || sy > H + 10) continue;
      ctx.fillStyle = 'rgba(6,20,36,0.45)';
      ctx.fillRect(this.snap(sx), this.snap(sy), p.size, p.size);
      ctx.fillStyle = p.ammo === 'heated' ? '#ff7a2a' : p.foot ? '#d0d0d8' : p.ammo === 'chain' ? '#6a6a72' : '#202024';
      const s2 = p.lob ? 3 : p.size;
      ctx.fillRect(this.snap(sx - s2 / 2), this.snap(sy - p.z - s2 / 2), s2, s2);
      if (p.ammo === 'heated' || p.lob) {
        ctx.fillStyle = p.lob ? '#ffd040' : '#ffd060';
        ctx.fillRect(this.snap(sx), this.snap(sy - p.z - 1), 1, 1);
      }
    }
    g.particles.draw(ctx, ox, oy, W, H, 1, Sc);
    this.drawGulls(g, ox, oy);
    this.drawLighting(g, ox, oy);
    this.drawOverlays(g, ox, oy, t);
    this.drawWorldUI(g, ox, oy, t);
    if (this.frame % 300 === 0) pruneSprites(new Set(g.ships.map((s) => s.id)));
  }

  private drawMonster(m: import('../game/monster').SeaMonster, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const hx = m.x - ox;
    const hy = m.y - oy;
    if (hx < -120 || hy < -120 || hx > this.w + 120 || hy > this.h + 120) return;
    const sub = m.depth;
    const hurt = m.hurtT > 0 && ((this.frame >> 1) & 1);
    const swap = sub > 0.5 ? SUBMERGED : undefined;
    ctx.globalAlpha = m.dead ? Math.max(0, 1 - m.deathT / 5) * (1 - sub * 0.6) : 1 - sub * 0.6;
    for (let i = SEGMENTS - 1; i >= 1; i--) {
      const px = m.segs[i * 2];
      const py = m.segs[i * 2 + 1];
      const qx = m.segs[(i - 1) * 2];
      const qy = m.segs[(i - 1) * 2 + 1];
      const ang = Math.atan2(qy - py, qx - px);
      const spr = i === SEGMENTS - 1 ? SERPENT_TAIL : SERPENT_SEG[i < 4 ? 0 : i < 8 ? 1 : 2];
      this.rot(px - ox, py - oy, Math.cos(ang), Math.sin(ang));
      if (!hurt) ctx.drawImage(artCanvas(spr, swap), -Math.floor(spr.w / 2), -Math.floor(spr.h / 2));
    }
    this.rot(hx, hy, Math.cos(m.heading), Math.sin(m.heading));
    if (!hurt) ctx.drawImage(artCanvas(SERPENT_HEAD, swap), -5, -5);
    this.base();
    ctx.globalAlpha = 1;
    if (!m.dead && sub < 0.5 && m.hp < m.maxHp) {
      this.bar(this.snap(hx - 15), this.snap(hy - 16), 30, m.hp / m.maxHp, '#c060ff');
      if (m.target) drawText(ctx, `${m.name} L${m.level}`, hx, hy - 24, 0xd8a0ff, true, this.scale);
    }
    void t;
  }

  private drawAmbientLow(g: Game, ox: number, oy: number): void {
    const ctx = this.ctx;
    const A = g.ambient;
    for (const w of A.whales) {
      const f = w.t / w.dur;
      const a = f < 0.2 ? f / 0.2 : f > 0.75 ? (1 - f) / 0.25 : 1;
      const c = Math.cos(w.heading);
      const sn = Math.sin(w.heading);
      ctx.globalAlpha = a * 0.85;
      this.rot(w.x - ox, w.y - oy, c, sn);
      ctx.drawImage(artCanvas(WHALE), -14, -5);
    }
    this.base();
    ctx.globalAlpha = 1;
    const wa = g.env.windAngle;
    const cx = Math.cos(wa);
    const cy = Math.sin(wa);
    ctx.fillStyle = '#ffffff';
    for (const s of A.streaks) {
      const f = s.life / s.max;
      ctx.globalAlpha = Math.sin(f * Math.PI) * 0.22;
      for (let k = 0; k < s.len; k += 1) ctx.fillRect(this.snap(s.x - ox + cx * k), this.snap(s.y - oy + cy * k), 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  private drawGulls(g: Game, ox: number, oy: number): void {
    const ctx = this.ctx;
    for (const gl of g.ambient.gulls) {
      const sx = this.snap(gl.x - ox);
      const sy = this.snap(gl.y - oy);
      if (sx < -10 || sy < -20 || sx > this.w + 10 || sy > this.h + 20) continue;
      ctx.drawImage(artCanvas(GULL_SHADOW), sx + 2, sy + 16);
      ctx.drawImage(artCanvas(GULL[Math.floor(gl.flap) % 2]), sx - 4, sy - 3);
    }
  }

  private onScreen(s: Ship, ox: number, oy: number): boolean {
    const r = s.radius + 20;
    return s.x - ox > -r && s.y - oy > -r && s.x - ox < this.w + r && s.y - oy < this.h + r;
  }

  private drawGlints(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const S = sprites();
    const G = 20;
    const drift = t * 3;
    const gx0 = Math.floor(ox / G);
    const gy0 = Math.floor(oy / G);
    const gx1 = Math.floor((ox + this.w) / G);
    const gy1 = Math.floor((oy + this.h) / G);
    const quality = g.particles.quality;
    const rough = g.env.windStrength > 1.15 || g.env.storm > 0.3;
    for (let gx = gx0; gx <= gx1; gx++) {
      for (let gy = gy0; gy <= gy1; gy++) {
        const h = hash2(gx, gy, 77);
        if ((h & 3) !== 0 && !(rough && (h & 3) === 1)) continue;
        if (quality < 0.6 && (h & 4)) continue;
        const ph = ((h >>> 3) & 255) / 255;
        const f = (t / 3.2 + ph) % 1;
        if (f > 0.4) continue;
        const wx = gx * G + ((h >>> 11) & 15) + Math.cos(g.env.windAngle) * drift * 0.2;
        const wy = gy * G + ((h >>> 15) & 15) + Math.sin(g.env.windAngle) * drift * 0.2;
        const cx = Math.floor(wx / CHUNK);
        const cy = Math.floor(wy / CHUNK);
        const ch = g.chunks.get(cx, cy);
        if (!ch) continue;
        const tt = ch.types[Math.floor(wy - cy * CHUNK) * CHUNK + Math.floor(wx - cx * CHUNK)];
        if (tt !== T_DEEP && tt !== T_OCEAN && tt !== T_SHALLOW) continue;
        const fr = Math.min(3, Math.floor((f / 0.4) * 4));
        const spr = artCanvas(GLINT[fr === 3 ? 3 : fr]);
        ctx.globalAlpha = tt === T_SHALLOW ? 0.3 : 0.5;
        ctx.drawImage(spr, this.snap(wx - ox), this.snap(wy - oy));
      }
    }
    ctx.globalAlpha = 1;
  }

  private drawLandObjects(g: Game, ox: number, oy: number, pois: POI[]): void {
    const ctx = this.ctx;
    const t = g.env.time;
    for (const p of pois) {
      if (p.kind !== 'dig' || !g.poiAvailable(p)) continue;
      const sx = this.snap(p.x - ox);
      const sy = this.snap(p.y - oy);
      if (sx < -30 || sy < -30 || sx > this.w + 30 || sy > this.h + 30) continue;
      ctx.drawImage(artCanvas(DIG_SPOT), sx - 6, sy - 4);
      const sp = ((t * 2 + p.id) | 0) % 4;
      if (sp < 2) ctx.drawImage(artCanvas(SPARKLE[sp]), sx - 2, sy - 6);
    }
    for (const it of g.profile.inv.items) {
      if (it.id !== 'treasure_map' || !it.data) continue;
      const sx = this.snap(it.data.x - ox);
      const sy = this.snap(it.data.y - oy);
      if (sx > -10 && sy > -10 && sx < this.w + 10 && sy < this.h + 10) ctx.drawImage(artCanvas(XMARK), sx - 5, sy - 5);
    }
  }

  private stand: { by: number; f: () => void }[] = [];
  private seen = new Set<string>();
  private solids = new WeakMap<Art, Art>();

  private solid(a: Art): Art {
    let s = this.solids.get(a);
    if (!s) {
      s = noShadow(a);
      this.solids.set(a, s);
    }
    return s;
  }

  private gatherOcc(g: Game, x0: number, y0: number, x1: number, by: number, ox: number, oy: number): void {
    const ctx = this.ctx;
    const cxa = Math.floor((x0 - MAX_OBJ_W) / CHUNK);
    const cxb = Math.floor((x1 + MAX_OBJ_W) / CHUNK);
    const cya = Math.floor(by / CHUNK);
    const cyb = Math.floor((by + MAX_OBJ_H) / CHUNK);
    for (let cx = cxa; cx <= cxb; cx++) for (let cy = cya; cy <= cyb; cy++) {
      const ch = g.chunks.get(cx, cy);
      if (!ch || !ch.occ.length) continue;
      const oc = ch.occ;
      for (let k = 0; k < oc.length; k += 3) {
        const o = OBJS[oc[k]];
        const qx = oc[k + 1];
        const qy = oc[k + 2];
        const depth = qy + o.fy1;
        if (depth <= by || qy >= by || qx >= x1 || qx + o.art.w <= x0 || qy + o.art.h <= y0) continue;
        const key = `${oc[k]},${qx},${qy}`;
        if (this.seen.has(key)) continue;
        this.seen.add(key);
        const art = this.solid(o.art);
        this.stand.push({ by: depth, f: () => ctx.drawImage(artCanvas(art, o.swap), this.snap(qx - ox), this.snap(qy - oy)) });
      }
    }
  }

  private drawStanding(g: Game, ox: number, oy: number, pois: POI[]): void {
    const ctx = this.ctx;
    const L = this.stand;
    L.length = 0;
    this.seen.clear();
    const t = g.env.time;
    const W = this.w;
    const H = this.h;
    const put = (a: Art, x: number, y: number, swap?: Swap, extra?: () => void) => {
      if (x + a.w < ox - 4 || x > ox + W + 4 || y + a.h < oy - 4 || y > oy + H + 4) return;
      L.push({ by: y + a.h - 1, f: () => {
        ctx.drawImage(artCanvas(a, swap), this.snap(x - ox), this.snap(y - oy));
        if (extra) extra();
      } });
      this.gatherOcc(g, x, y, x + a.w, y + a.h - 1, ox, oy);
    };
    for (const s of g.ships) if (this.onScreen(s, ox, oy) && s.sinking < 0) this.gatherOcc(g, s.x - s.radius, s.y - s.radius, s.x + s.radius, s.y, ox, oy);
    for (const p of pois) {
      if (p.kind === 'claim') {
        const own = g.profile.ownedIsland(p.island);
        const a = own ? CLAIM_OWNED : CLAIM_STONE;
        put(a, Math.round(p.x) - (a.w >> 1), Math.round(p.y) - a.h + 1);
        if (own) this.addStructures(p.island, own.structures, p.x, p.y, put);
        continue;
      }
      if (!g.poiAvailable(p)) continue;
      if (p.kind === 'chest') put(p.locked ? LOCKED_CHEST : CHEST, Math.round(p.x) - 7, Math.round(p.y) - 8);
      else if (p.kind === 'shrine') {
        const sx = Math.round(p.x);
        const sy = Math.round(p.y);
        put(SHRINE, sx - (SHRINE.w >> 1), sy - SHRINE.h + 1, undefined, () => {
          if (((t * 3) | 0) % 2) ctx.drawImage(artCanvas(SPARKLE[0]), this.snap(sx - ox) - 2, this.snap(sy - oy) - SHRINE.h - 2);
        });
      }
    }
    for (const m of g.mobs) {
      if (m.x < ox - 30 || m.x > ox + W + 30 || m.y < oy - 30 || m.y > oy + H + 40) continue;
      L.push({ by: m.y, f: () => this.drawMob(m.kind, m.x - ox, m.y - oy, m.anim, m.hurt > 0, m.hp / m.maxHp, !!g.avatar && g.avatar.x < m.x) });
      this.gatherOcc(g, m.x - 8, m.y - 18, m.x + 8, m.y, ox, oy);
    }
    if (g.avatar) {
      const a = g.avatar;
      L.push({ by: a.y, f: () => this.drawAvatar(g, a.x - ox, a.y - oy) });
      this.gatherOcc(g, a.x - 7, a.y - 18, a.x + 7, a.y, ox, oy);
    }
    if (g.profile.waypoint) {
      const wp = g.profile.waypoint;
      put(WAYPOINT, Math.round(wp.x) - 1, Math.round(wp.y) - 12);
    }
    L.sort((a, b) => a.by - b.by);
    for (const e of L) e.f();
  }

  private addStructures(island: number, list: string[], x: number, y: number, put: (a: Art, x: number, y: number, swap?: Swap) => void): void {
    const at = structurePlaces(island, x, y, list);
    list.forEach((st, i) => {
      const def = STRUCT[st];
      const art = STRUCTURES[st];
      const px = at[i * 2];
      const py = at[i * 2 + 1];
      if (!def || !art || !Number.isFinite(px)) return;
      put(art, Math.round(px - art.w / 2), Math.round(py - art.h + 1), ramp2(def.roof));
    });
  }

  private drawShipShadow(s: Ship, ox: number, oy: number): void {
    const sp = shipSprite(s);
    const phi = s.heading + Math.PI / 2;
    const k = s.sinking >= 0 ? Math.max(0.3, 1 - s.sinking * 0.12) : 1;
    const c = Math.cos(phi) * k;
    const sn = Math.sin(phi) * k;
    const ctx = this.ctx;
    this.rot(s.x - ox + 2, s.y - oy + 2, c, sn);
    ctx.globalAlpha = s.sinking >= 0 ? Math.max(0, 1 - s.sinking / 4) : 1;
    ctx.drawImage(sp.shadow, -sp.ox, -sp.oy);
    this.base();
    ctx.globalAlpha = 1;
  }

  private drawShip(g: Game, s: Ship, ox: number, oy: number, t: number): void {
    const sp = shipSprite(s);
    const phi = s.heading + Math.PI / 2;
    let k = 1;
    let alpha = 1;
    if (s.sinking >= 0) {
      k = Math.max(0.3, 1 - s.sinking * 0.12);
      alpha = Math.max(0, 1 - s.sinking / 4.5);
    }
    const ctx = this.ctx;
    const cs = Math.cos(phi) * k;
    const sn = Math.sin(phi) * k;
    const X = s.x - ox;
    const Y = s.y - oy;
    const ghost = s.faction === 'ghost';
    const at = () => this.rot(X, Y, cs, sn);
    at();
    ctx.globalAlpha = alpha * (ghost ? 0.82 : 1);
    ctx.drawImage(sp.canvas, -sp.ox, -sp.oy);
    const d = s.design;
    const oarC = artCanvas(OAR);
    for (const i of s.cells) {
      const comp = COMPONENTS[d.part[i]];
      if (!comp?.oar || s.partHp[i] <= 0) continue;
      const [lx, ly] = s.cellLocal(i);
      const rowing = s.rowing && s.stationEff[i] > 0;
      const sw = rowing ? Math.sin(t * 5 + i) * 0.5 : 0.25;
      for (const side of [-1, 1]) {
        at();
        ctx.translate(lx + side * (CELL / 2 - 1), ly);
        ctx.rotate(side > 0 ? sw : Math.PI - sw);
        ctx.drawImage(oarC, 0, -1);
      }
    }
    at();
    if (this.artScale >= 2) {
      for (const cm of s.crew) {
        const shirt = ROLE[cm.role]?.shirt ?? 0xd8d0c0;
        ctx.drawImage(artCanvas(CREW, { R: shirt, r: shadeHex(shirt, 0.72) }), cm.lx - 3, cm.ly - 3);
      }
      if (s.isPlayer && g.mode !== 'foot') {
        let hx = 0;
        let hy = s.halfLen - 8;
        let helm = false;
        for (const i of s.cells) if (d.part[i] === 11) {
          const [lx, ly] = s.cellLocal(i);
          hx = lx;
          hy = ly + 4;
          helm = true;
        }
        if (!helm) {
          let maxY = -999;
          for (const i of s.cells) {
            const [lx, ly] = s.cellLocal(i);
            if (ly > maxY && !d.part[i]) {
              maxY = ly;
              hx = lx;
              hy = ly;
            }
          }
        }
        ctx.drawImage(artCanvas(CAPTAIN), hx - 3, hy - 3);
      }
    }
    const state = s.sail < 0.2 ? 'furled' : s.sail < 0.7 ? 'half' : 'full';
    const windSide = angleDiff(s.heading, g.env.windAngle) < 0;
    const sailSwap = ramp(ghost ? 0x7a9a8a : s.design.sailColor);
    let flagAt: [number, number] | null = null;
    for (const i of s.cells) {
      const comp = COMPONENTS[d.part[i]];
      if (!comp?.sail || s.partHp[i] <= 0) continue;
      const set = SAILS[comp.sail.style];
      if (!set) continue;
      let a: Art = set[state];
      let ax = set.ax;
      const ay = set.ay ?? a.h - 1;
      if (comp.sail.style === 'lateen' && windSide) {
        a = this.flipped(a);
        ax = a.w - 1 - ax;
      }
      const [lx, ly] = s.cellLocal(i);
      at();
      ctx.drawImage(artCanvas(a, sailSwap), lx - ax, ly - ay);
      if (!flagAt) flagAt = [lx, ly];
    }
    for (const i of s.cells) {
      if (d.part[i] !== 23 || s.partHp[i] <= 0) continue;
      const [lx, ly] = s.cellLocal(i);
      at();
      const nest = PARTS.crows_nest.art;
      ctx.drawImage(artCanvas(nest), lx - nest.w / 2, ly - nest.h / 2);
      if (!flagAt) flagAt = [lx, ly];
    }
    if (flagAt) {
      const frame = Math.floor(t * 4 + s.id) % 2;
      const jolly = s.faction === 'pirate' || s.isPlayer;
      const f = jolly && !s.surrendered ? JOLLY[frame] : FLAG[frame];
      const col = s.surrendered ? 0xf6f0e0 : FLAG_HEX[s.faction] ?? 0xa82c34;
      at();
      ctx.translate(flagAt[0], flagAt[1]);
      ctx.rotate(g.env.windAngle - phi);
      ctx.drawImage(artCanvas(f, jolly && !s.surrendered ? undefined : { R: col }), 0, -2);
    }
    for (const i of s.cells) {
      if (s.fire[i] <= 0) continue;
      const [lx, ly] = s.cellLocal(i);
      at();
      ctx.drawImage(artCanvas(FIRE[Math.floor(t * 8 + i) % 2]), lx - 3, ly - 5);
    }
    this.base();
    ctx.globalAlpha = 1;
    if (ghost && Math.random() < 0.3) g.particles.ghost(s.x + (Math.random() - 0.5) * s.halfWid * 2, s.y + (Math.random() - 0.5) * s.halfLen * 2);
  }

  private flips = new WeakMap<Art, Art>();
  private flipped(a: Art): Art {
    let f = this.flips.get(a);
    if (!f) {
      f = flipX(a);
      this.flips.set(a, f);
    }
    return f;
  }

  private drawAvatar(g: Game, x: number, y: number): void {
    const a = g.avatar!;
    const ctx = this.ctx;
    const sx = this.snap(x);
    const sy = this.snap(y);
    const walk = a.moving ? 1 + (Math.floor(a.walk) % 2) : 0;
    const f = a.facing;
    const set = f === 0 ? CAPTAIN_UP : f === 2 ? CAPTAIN_DOWN : CAPTAIN_SIDE;
    let spr = set[walk];
    if (f === 3) spr = this.flipped(spr);
    ctx.drawImage(artCanvas(FOOT_SHADOW), sx - 5, sy - 2);
    if (!(a.hurt > 0 && (this.frame >> 2) & 1)) ctx.drawImage(artCanvas(spr), sx - spr.w / 2, sy - spr.h + 1);
    if (a.swing > 0) {
      const p = g.profile.weapon;
      const ranged = p === 'flintlock' || p === 'musket' || p === 'blunderbuss';
      if (ranged) {
        const fx = sx + Math.cos(a.dir) * 9;
        const fy = sy - 8 + Math.sin(a.dir) * 9;
        ctx.drawImage(artCanvas(PISTOL_FLASH), this.snap(fx - 2.5), this.snap(fy - 2.5));
      } else {
        const sw = (a.swing / 0.25 - 0.5) * 1.8;
        const S = this.scale;
        const ang = a.dir + sw + Math.PI / 4;
        const c = Math.cos(ang);
        const sn = Math.sin(ang);
        ctx.setTransform(c * S, sn * S, -sn * S, c * S, Math.round((sx + Math.cos(a.dir) * 3) * S), Math.round((sy - 8) * S));
        ctx.drawImage(artCanvas(CUTLASS), 0, -CUTLASS.h);
        this.base();
      }
    }
    if (a.dig > 0) this.bar(sx - 7, sy - 22, 14, a.dig / 2.2, '#ffd040');
    if (a.hp < a.maxHp) this.bar(sx - 7, sy - 22 - (a.dig > 0 ? 4 : 0), 14, a.hp / a.maxHp, '#ff5a4a');
  }

  private drawMob(kind: string, x: number, y: number, anim: number, hurt: boolean, hpF: number, flip: boolean): void {
    const ctx = this.ctx;
    const sx = this.snap(x);
    const sy = this.snap(y);
    if (sx < -20 || sy < -24 || sx > this.w + 20 || sy > this.h + 20) return;
    const fr = Math.floor(anim * (kind === 'crab' ? 6 : 4)) % 2;
    let spr = kind === 'crab' ? CRAB[fr] : kind === 'skeleton' ? SKELETON[fr] : WRAITH[fr];
    if (flip) spr = this.flipped(spr);
    ctx.drawImage(artCanvas(FOOT_SHADOW), sx - 5, sy - 2);
    if (kind === 'wraith') ctx.globalAlpha = 0.82;
    if (!(hurt && (this.frame >> 1) & 1)) ctx.drawImage(artCanvas(spr), sx - spr.w / 2, sy - spr.h + 1);
    ctx.globalAlpha = 1;
    if (hpF < 1) this.bar(sx - 6, sy - spr.h - 4, 12, hpF, '#ff5a4a');
  }

  private bar(x: number, y: number, w: number, f: number, col: string): void {
    const ctx = this.ctx;
    ctx.fillStyle = '#140e0a';
    ctx.fillRect(x - 1, y - 1, w + 2, 4);
    ctx.fillStyle = '#3a2e24';
    ctx.fillRect(x, y, w, 2);
    ctx.fillStyle = col;
    ctx.fillRect(x, y, Math.max(0, Math.round(w * clamp(f, 0, 1))), 2);
  }

  private drawLighting(g: Game, ox: number, oy: number): void {
    const env = g.env;
    let dark = env.dark;
    if (g.profile.inv.passive('nightVision') > 0) dark *= 0.55;
    if (dark < 0.02) return;
    const L = this.lctx;
    const lw = this.light.width;
    const lh = this.light.height;
    L.globalCompositeOperation = 'source-over';
    L.clearRect(0, 0, lw, lh);
    L.fillStyle = `rgba(6,10,32,${dark.toFixed(3)})`;
    L.fillRect(0, 0, lw, lh);
    L.globalCompositeOperation = 'destination-out';
    const S = sprites();
    const light = (x: number, y: number, r: number, a = 1) => {
      const sx = (x - ox) / 2;
      const sy = (y - oy) / 2;
      const rr = r / 2;
      if (sx < -rr || sy < -rr || sx > lw + rr || sy > lh + rr) return;
      L.globalAlpha = a;
      L.drawImage(S.light, sx - rr, sy - rr, rr * 2, rr * 2);
    };
    for (const s of g.ships) {
      if (s.sinking >= 0) continue;
      light(s.x, s.y, s.isPlayer ? 120 + s.radius : 50 + s.radius, s.isPlayer ? 1 : 0.8);
      for (const i of s.cells) if (s.fire[i] > 0) {
        const [lx, ly] = s.cellLocal(i);
        const phi = s.heading + Math.PI / 2;
        light(s.x + lx * Math.cos(phi) - ly * Math.sin(phi), s.y + lx * Math.sin(phi) + ly * Math.cos(phi), 40 + Math.random() * 8, 0.9);
      }
    }
    if (g.avatar) light(g.avatar.x, g.avatar.y - 4, 110, 1);
    const cx0 = Math.floor(ox / CHUNK);
    const cy0 = Math.floor(oy / CHUNK);
    for (let cx = cx0; cx <= cx0 + Math.ceil(this.w / CHUNK) + 1; cx++) for (let cy = cy0; cy <= cy0 + Math.ceil(this.h / CHUNK) + 1; cy++) {
      const ch = g.chunks.get(cx, cy);
      if (!ch) continue;
      for (let k = 0; k < ch.lights.length; k += 2) light(ch.lights[k], ch.lights[k + 1], 34, 0.85);
    }
    for (const p of g.projectiles) if (p.ammo === 'heated' || p.lob) light(p.x, p.y - p.z, 18, 0.7);
    for (const f of g.forts) light(f.x, f.y, 60, 0.6);
    islandsInRect(ox, oy, ox + this.w, oy + this.h, tmpIsl);
    for (const isl of tmpIsl) if (isl.type === I_VOLCANO) light(isl.x, isl.y, isl.r * 0.5, 0.7);
    const n = g.particles.n;
    const P = g.particles;
    for (let i = 0; i < n; i += 3) if (P.type[i] === 3) light(P.x[i], P.y[i], 16, 0.5);
    L.globalAlpha = 1;
    L.globalCompositeOperation = 'source-over';
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.light, 0, 0, lw * 2, lh * 2);
    ctx.imageSmoothingEnabled = false;
  }

  private drawOverlays(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const env = g.env;
    const W = this.w;
    const H = this.h;
    const p = env.phase;
    const dusk = Math.max(0, 1 - Math.abs(p - 0.8) / 0.05) + Math.max(0, 1 - Math.abs(p - 0.2) / 0.05);
    if (dusk > 0) {
      ctx.fillStyle = `rgba(255,120,60,${(dusk * 0.1).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (env.fog > 0.05 && g.profile.inv.passive('nightVision') <= 0) {
      const S = sprites();
      ctx.globalAlpha = Math.min(0.7, env.fog);
      const sc = 3;
      const tw = 256 * sc;
      const shiftX = ((t * 6 + ox * 0.6) % tw + tw) % tw;
      const shiftY = ((t * 2 + oy * 0.6) % tw + tw) % tw;
      ctx.imageSmoothingEnabled = true;
      for (let x = -shiftX; x < W; x += tw) for (let y = -shiftY; y < H; y += tw) ctx.drawImage(S.fog, x, y, tw, tw);
      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = 1;
    }
    if (env.storm > 0.05) {
      ctx.fillStyle = `rgba(16,22,36,${(env.storm * 0.32).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (env.lightning > 0) {
      ctx.fillStyle = `rgba(230,240,255,${(env.lightning * 0.55).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    const f = g.avatar ?? g.player;
    const edgeD = Math.min(f.x, f.y, WORLD_SIZE - f.x, WORLD_SIZE - f.y) - EDGE_MARGIN;
    if (edgeD < 3000) {
      ctx.fillStyle = `rgba(10,10,16,${clamp(1 - edgeD / 3000, 0, 0.7).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (g.hitFlash > 0) {
      ctx.fillStyle = `rgba(200,30,20,${(g.hitFlash * 0.18).toFixed(3)})`;
      ctx.fillRect(0, 0, W, 3);
      ctx.fillRect(0, H - 3, W, 3);
      ctx.fillRect(0, 0, 3, H);
      ctx.fillRect(W - 3, 0, 3, H);
    }
  }

  private drawWorldUI(g: Game, ox: number, oy: number, t: number): void {
    const ctx = this.ctx;
    const W = this.w;
    const H = this.h;
    islandsInRect(ox - 200, oy - 200, ox + W + 200, oy + H + 200, tmpIsl);
    for (const isl of tmpIsl) {
      if (!isl.port) continue;
      const L = portLayout(isl);
      if (!L) continue;
      const sx = L.dockX1 - ox;
      const sy = L.dockY1 - oy - 14;
      if (sx < -60 || sy < -10 || sx > W + 60 || sy > H + 10) continue;
      const col = isl.port.faction === 0 ? 0x9ad0ff : isl.port.faction === 2 ? 0xff8a7a : 0xb8f0a0;
      drawText(ctx, isl.port.name, sx, sy, col, true, this.scale);
    }
    for (const s of g.ships) {
      if (s.isPlayer || s.sinking >= 0) continue;
      const sx = s.x - ox;
      const sy = s.y - oy - s.radius - 8;
      if (sx < -50 || sy < -20 || sx > W + 50 || sy > H + 20) continue;
      const hostile = g.aiHostileToPlayer(s);
      const integ = s.integrity();
      const recent = g.env.time - s.lastHitTime < 10;
      const near = Math.hypot(g.mouseWX - s.x, g.mouseWY - s.y) < s.radius + 10;
      if (hostile || recent || near || integ < 0.99) {
        const col = FACTION_COL[s.faction] ?? 0xffffff;
        const label = `${s.boss ? '! ' : ''}${s.name} L${s.level}`;
        if (near || recent || s.boss) drawText(ctx, label, sx, sy - 6, col, true, this.scale);
        const bw = Math.max(16, Math.min(40, s.radius * 1.4));
        this.bar(this.snap(sx - bw / 2), this.snap(sy), Math.round(bw), (integ - 0.22) / 0.78, hostile ? '#ff5a4a' : '#7ad86a');
        if (s.surrendered) drawText(ctx, 'SURRENDERED', sx, sy - 14, 0xffffff, true, this.scale);
      }
    }
    for (const tx of g.texts) {
      const a = Math.min(1, tx.life / tx.max * 2);
      ctx.globalAlpha = a;
      drawText(ctx, tx.text, tx.x - ox, tx.y - oy, tx.color, true, this.scale);
    }
    ctx.globalAlpha = 1;
    if (g.mode === 'sail' && !g.uiOpen && !g.docked && g.player.guns.length) {
      const s = g.player;
      const mx = this.snap(g.mouseWX - ox);
      const my = this.snap(g.mouseWY - oy);
      let bears = false;
      let ready = false;
      for (const ci of s.guns) {
        if (s.partHp[ci] <= 0) continue;
        if (s.gunBears(ci, g.mouseWX, g.mouseWY)) {
          bears = true;
          if (s.gunReady(ci)) ready = true;
        }
      }
      const col = ready ? '#7aff6a' : bears ? '#ffb040' : '#9a9a9a';
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(mx - 4, my - 1, 3, 3);
      ctx.fillRect(mx + 2, my - 1, 3, 3);
      ctx.fillRect(mx - 1, my - 4, 3, 3);
      ctx.fillRect(mx - 1, my + 2, 3, 3);
      ctx.fillStyle = col;
      ctx.fillRect(mx - 3, my, 2, 1);
      ctx.fillRect(mx + 2, my, 2, 1);
      ctx.fillRect(mx, my - 3, 1, 2);
      ctx.fillRect(mx, my + 2, 1, 2);
      if (bears) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = col;
        const sx = s.x - ox;
        const sy = s.y - oy;
        const dx = mx - sx;
        const dy = my - sy;
        const d = Math.hypot(dx, dy);
        for (let k = 12; k < d - 6; k += 6) ctx.fillRect(this.snap(sx + (dx / d) * k), this.snap(sy + (dy / d) * k), 1, 1);
        ctx.globalAlpha = 1;
      }
    }
    const hasCompass = g.profile.inv.has('compass') || g.profile.inv.has('sextant');
    const arrows: { x: number; y: number; col: number; label: string }[] = [];
    if (g.profile.waypoint) arrows.push({ ...g.profile.waypoint, col: 0xff6a5a, label: 'WP' });
    if (hasCompass) {
      for (const q of g.profile.quests) {
        if (q.done) {
          const isl = getIsland(q.port);
          if (isl) arrows.push({ x: isl.x, y: isl.y, col: 0xffd040, label: '+' });
        } else arrows.push({ x: q.x, y: q.y, col: 0xffd040, label: '!' });
      }
      for (const it of g.profile.inv.items) if (it.id === 'treasure_map' && it.data) arrows.push({ x: it.data.x, y: it.data.y, col: 0xff4040, label: 'X' });
    }
    const f = g.avatar ?? g.player;
    for (const a of arrows) {
      if (!a.x && !a.y) continue;
      const sx = a.x - ox;
      const sy = a.y - oy;
      if (sx > 8 && sy > 8 && sx < W - 8 && sy < H - 8) continue;
      const ang = Math.atan2(a.y - f.y, a.x - f.x);
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) / 2 - 14;
      const ex = Math.round(cx + Math.cos(ang) * Math.min(W / 2 - 12, r * 1.6) * 0.98);
      const ey = Math.round(cy + Math.sin(ang) * r);
      const px = this.snap(clamp(ex, 10, W - 10));
      const py = this.snap(clamp(ey, 10, H - 10));
      ctx.fillStyle = '#140e0a';
      ctx.fillRect(px - 2, py - 2, 5, 5);
      ctx.fillStyle = '#' + a.col.toString(16).padStart(6, '0');
      ctx.fillRect(px - 1, py - 1, 3, 3);
      ctx.fillRect(this.snap(px + Math.cos(ang) * 4), this.snap(py + Math.sin(ang) * 4), 1, 1);
      ctx.fillRect(this.snap(px + Math.cos(ang) * 3), this.snap(py + Math.sin(ang) * 3), 1, 1);
      const miles = Math.hypot(a.x - f.x, a.y - f.y) / 512;
      drawText(ctx, `${a.label} ${miles < 10 ? miles.toFixed(1) : Math.round(miles)}MI`, px, py + 5, a.col, true, this.scale);
    }
  }
}

function shade(c: number, f: number): number {
  return (Math.min(255, (((c >> 16) & 255) * f) | 0) << 16) | (Math.min(255, (((c >> 8) & 255) * f) | 0) << 8) | Math.min(255, ((c & 255) * f) | 0);
}

function ramp2(c: number): Swap {
  return { e: shade(c, 1.18), R: c, r: shade(c, 0.8) };
}
