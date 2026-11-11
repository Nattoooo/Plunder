import { T_DEEP, T_OCEAN } from '../world/terrain';
import type { Particles } from './particles';

export interface Gull {
  x: number;
  y: number;
  vx: number;
  vy: number;
  flap: number;
  turn: number;
  life: number;
}

export interface Whale {
  x: number;
  y: number;
  heading: number;
  t: number;
  dur: number;
  spouted: boolean;
}

export interface Streak {
  x: number;
  y: number;
  life: number;
  max: number;
  len: number;
}

export class Ambient {
  gulls: Gull[] = [];
  whales: Whale[] = [];
  streaks: Streak[] = [];
  private gullT = 0;
  private whaleT = 8;
  private fishT = 2;
  private streakT = 0;

  update(dt: number, cx: number, cy: number, viewW: number, viewH: number, nearLand: boolean, windAngle: number, windStrength: number, typeAt: (x: number, y: number) => number, fx: Particles): void {
    this.gullT -= dt;
    if (this.gullT <= 0) {
      this.gullT = 3 + Math.random() * 4;
      const want = nearLand ? 5 : 1;
      if (this.gulls.length < want) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.max(viewW, viewH) * 0.7;
        this.gulls.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, vx: -Math.cos(a) * 30, vy: -Math.sin(a) * 30, flap: Math.random() * 6, turn: (Math.random() - 0.5) * 0.8, life: 40 + Math.random() * 30 });
      }
    }
    for (let i = this.gulls.length - 1; i >= 0; i--) {
      const g = this.gulls[i];
      g.life -= dt;
      g.flap += dt * 9;
      if (Math.random() < dt * 0.4) g.turn = (Math.random() - 0.5) * 1.4;
      const ang = Math.atan2(g.vy, g.vx) + g.turn * dt;
      const pull = Math.atan2(cy - g.y, cx - g.x);
      const d = Math.hypot(cx - g.x, cy - g.y);
      const a2 = d > Math.max(viewW, viewH) * 0.6 ? ang + Math.sin(pull - ang) * dt * 1.2 : ang;
      const sp = 30 + Math.sin(g.flap * 0.2) * 6;
      g.vx = Math.cos(a2) * sp + Math.cos(windAngle) * windStrength * 6;
      g.vy = Math.sin(a2) * sp + Math.sin(windAngle) * windStrength * 6;
      g.x += g.vx * dt;
      g.y += g.vy * dt;
      if (g.life <= 0 && d > Math.max(viewW, viewH) * 0.6) this.gulls.splice(i, 1);
      else if (d > Math.max(viewW, viewH) * 2) this.gulls.splice(i, 1);
    }
    this.whaleT -= dt;
    if (this.whaleT <= 0 && !nearLand) {
      this.whaleT = 20 + Math.random() * 30;
      for (let k = 0; k < 6; k++) {
        const x = cx + (Math.random() - 0.5) * viewW * 0.9;
        const y = cy + (Math.random() - 0.5) * viewH * 0.9;
        if (typeAt(x, y) === T_DEEP && typeAt(x + 30, y) === T_DEEP && typeAt(x - 30, y) === T_DEEP) {
          this.whales.push({ x, y, heading: Math.random() * Math.PI * 2, t: 0, dur: 7, spouted: false });
          break;
        }
      }
    }
    for (let i = this.whales.length - 1; i >= 0; i--) {
      const w = this.whales[i];
      w.t += dt;
      w.x += Math.cos(w.heading) * 8 * dt;
      w.y += Math.sin(w.heading) * 8 * dt;
      if (!w.spouted && w.t > 1.6) {
        w.spouted = true;
        for (let k = 0; k < 14; k++) fx.add(1, w.x + Math.cos(w.heading) * 6, w.y + Math.sin(w.heading) * 6, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, 0.8 + Math.random() * 0.5, 1 + Math.random(), 4, 50 + Math.random() * 30);
      }
      if (Math.random() < dt * 6) fx.wake(w.x + (Math.random() - 0.5) * 14, w.y + (Math.random() - 0.5) * 6, 0, 0, 1, 2);
      if (w.t > w.dur) this.whales.splice(i, 1);
    }
    this.fishT -= dt;
    if (this.fishT <= 0) {
      this.fishT = 1.5 + Math.random() * 3;
      const x = cx + (Math.random() - 0.5) * viewW;
      const y = cy + (Math.random() - 0.5) * viewH;
      const t = typeAt(x, y);
      if (t === T_DEEP || t === T_OCEAN) {
        const a = Math.random() * Math.PI * 2;
        fx.add(11, x, y, Math.cos(a) * 26, Math.sin(a) * 26, 0.8, 1.5, 1, 45);
        fx.add(1, x, y, 0, 0, 0.3, 1, 1, 20);
      }
    }
    this.streakT -= dt;
    if (this.streakT <= 0 && windStrength > 0.8) {
      this.streakT = 0.25 / windStrength;
      if (this.streaks.length < 24) this.streaks.push({ x: cx + (Math.random() - 0.5) * viewW * 1.1, y: cy + (Math.random() - 0.5) * viewH * 1.1, life: 2.2, max: 2.2, len: 6 + Math.random() * 8 });
    }
    for (let i = this.streaks.length - 1; i >= 0; i--) {
      const s = this.streaks[i];
      s.life -= dt;
      s.x += Math.cos(windAngle) * windStrength * 45 * dt;
      s.y += Math.sin(windAngle) * windStrength * 45 * dt;
      if (s.life <= 0) this.streaks.splice(i, 1);
    }
  }
}
