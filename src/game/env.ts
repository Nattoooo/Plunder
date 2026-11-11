import { noise1, noise2, WORLD_SEED } from '../core/rng';
import { clamp, smoothstep } from '../core/math';
import { biomeWeights, B_MIST, B_FROST } from '../world/worldgen';
import type { ShipEnv } from './ship';

export const DAY_LEN = 960;

const bw = new Float32Array(5);

export class Env implements ShipEnv {
  time = 0;
  epoch = 0;
  windAngle = 0;
  windStrength = 1;
  rain = 0;
  storm = 0;
  fog = 0;
  dark = 0;
  night = false;
  phase = 0.4;
  day = 0;
  lightning = 0;
  cold = 0;
  private flashTimer = 5;
  onThunder: (() => void) | null = null;
  timeOffset = 0;

  worldSeconds(): number {
    return Date.now() / 1000 + this.timeOffset;
  }

  update(dt: number, x: number, y: number): void {
    this.time += dt;
    const t = this.worldSeconds();
    this.epoch = t;
    this.phase = (t / DAY_LEN) % 1;
    this.day = Math.floor(t / DAY_LEN);
    const p = this.phase;
    const dusk = smoothstep(0.76, 0.86, p);
    const dawn = 1 - smoothstep(0.14, 0.24, p);
    this.dark = Math.max(dusk, dawn) * 0.64;
    this.night = this.dark > 0.4;
    this.windAngle = noise1(t / 240, WORLD_SEED + 40) * Math.PI * 4;
    this.windStrength = 0.7 + noise1(t / 110, WORLD_SEED + 41) * 0.6;
    const sf = noise2(x / 30000 + t / 3000, y / 30000 - t / 4000, WORLD_SEED + 42);
    const sf2 = noise2(x / 9000, y / 9000 + t / 1500, WORLD_SEED + 43);
    const s = sf * 0.75 + sf2 * 0.25;
    const targetRain = smoothstep(0.58, 0.7, s);
    const targetStorm = smoothstep(0.7, 0.82, s);
    this.rain += (targetRain - this.rain) * Math.min(1, dt * 0.3);
    this.storm += (targetStorm - this.storm) * Math.min(1, dt * 0.3);
    this.windStrength *= 1 + this.storm * 0.6;
    biomeWeights(x, y, bw);
    this.cold = bw[B_FROST];
    this.fog = clamp(bw[B_MIST] * 0.55 + this.storm * 0.25 + (this.night ? 0.05 : 0), 0, 0.75);
    if (this.storm > 0.5) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.flashTimer = 4 + Math.random() * 10;
        this.lightning = 1;
        if (this.onThunder) setTimeout(() => this.onThunder && this.onThunder(), 300 + Math.random() * 1200);
      }
    }
    this.lightning = Math.max(0, this.lightning - dt * 3);
  }

  clockString(): string {
    const h = Math.floor(this.phase * 24);
    const m = Math.floor((this.phase * 24 - h) * 60);
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
  }

  weatherName(): string {
    if (this.storm > 0.5) return 'Storm';
    if (this.rain > 0.5) return 'Rain';
    if (this.fog > 0.35) return 'Fog';
    if (this.windStrength > 1.15) return 'Windy';
    if (this.windStrength < 0.8) return 'Calm';
    return 'Fair';
  }
}
