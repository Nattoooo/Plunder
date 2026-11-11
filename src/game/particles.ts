export const P_SMOKE = 0;
export const P_SPLASH = 1;
export const P_DEBRIS = 2;
export const P_FLAME = 3;
export const P_SPARK = 4;
export const P_BUBBLE = 5;
export const P_WAKE = 6;
export const P_GOLD = 7;
export const P_RAIN = 8;
export const P_DUST = 9;
export const P_GHOST = 10;
export const P_FISH = 11;

const CAP = 2600;

export const PCOLORS = [
  ['#e8e4dc', '#c8c4bc', '#a8a49c', '#88847c'],
  ['#ffffff', '#d8f0f4', '#b0d8e4', '#90c0d0'],
  ['#c8925a', '#9a6a3a', '#7a5230', '#5a3a22'],
  ['#fff4a0', '#ffc040', '#ff7a20', '#c83a14'],
  ['#ffffff', '#fff0a0', '#ffd040', '#ff9020'],
  ['#d8f4ff', '#b0e0f0', '#90c8e0', '#70b0d0'],
  ['#ffffff', '#e8f6f8', '#c8e8f0', '#a8d8e8'],
  ['#fff8c0', '#ffe060', '#e8b830', '#c89020'],
  ['#a8c0d8', '#a8c0d8', '#90a8c0', '#90a8c0'],
  ['#d8c8a0', '#c0b088', '#a89870', '#908058'],
  ['#c0ffd8', '#80f0b0', '#50c088', '#309060'],
  ['#d8e4f0', '#b8c8d8', '#98a8bc', '#7888a0']
];

export class Particles {
  n = 0;
  x = new Float32Array(CAP);
  y = new Float32Array(CAP);
  z = new Float32Array(CAP);
  vx = new Float32Array(CAP);
  vy = new Float32Array(CAP);
  vz = new Float32Array(CAP);
  life = new Float32Array(CAP);
  max = new Float32Array(CAP);
  size = new Float32Array(CAP);
  type = new Uint8Array(CAP);
  quality = 1;

  add(type: number, x: number, y: number, vx: number, vy: number, life: number, size: number, z = 0, vz = 0): void {
    if (this.n >= CAP) return;
    const i = this.n++;
    this.type[i] = type;
    this.x[i] = x;
    this.y[i] = y;
    this.z[i] = z;
    this.vx[i] = vx;
    this.vy[i] = vy;
    this.vz[i] = vz;
    this.life[i] = life;
    this.max[i] = life;
    this.size[i] = size;
  }

  update(dt: number): void {
    let i = 0;
    while (i < this.n) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        const j = --this.n;
        this.type[i] = this.type[j];
        this.x[i] = this.x[j];
        this.y[i] = this.y[j];
        this.z[i] = this.z[j];
        this.vx[i] = this.vx[j];
        this.vy[i] = this.vy[j];
        this.vz[i] = this.vz[j];
        this.life[i] = this.life[j];
        this.max[i] = this.max[j];
        this.size[i] = this.size[j];
        continue;
      }
      const t = this.type[i];
      this.x[i] += this.vx[i] * dt;
      this.y[i] += this.vy[i] * dt;
      if (t === P_DEBRIS || t === P_SPLASH || t === P_SPARK || t === P_GOLD || t === P_FISH) {
        this.z[i] += this.vz[i] * dt;
        this.vz[i] -= 140 * dt;
        if (this.z[i] < 0) {
          this.z[i] = 0;
          this.vz[i] = 0;
          this.vx[i] *= 0.5;
          this.vy[i] *= 0.5;
          if (t === P_SPLASH || t === P_SPARK || t === P_FISH) this.life[i] = Math.min(this.life[i], 0.05);
        }
      } else if (t === P_SMOKE || t === P_FLAME || t === P_GHOST) {
        this.z[i] += this.vz[i] * dt;
        const k = Math.pow(0.4, dt);
        this.vx[i] *= k;
        this.vy[i] *= k;
      } else if (t === P_WAKE) {
        const k = Math.pow(0.25, dt);
        this.vx[i] *= k;
        this.vy[i] *= k;
      } else if (t === P_RAIN) {
        this.z[i] += this.vz[i] * dt;
        if (this.z[i] <= 0) this.life[i] = 0.0001;
      }
      i++;
    }
  }

  draw(ctx: CanvasRenderingContext2D, ox: number, oy: number, w: number, h: number, layer: number, k = 1): void {
    let last = '';
    for (let i = 0; i < this.n; i++) {
      const t = this.type[i];
      const isLow = t === P_WAKE || t === P_BUBBLE;
      if ((layer === 0) !== isLow) continue;
      const sx = this.x[i] - ox;
      const sy = this.y[i] - oy - this.z[i];
      if (sx < -8 || sy < -8 || sx > w + 8 || sy > h + 8) continue;
      const f = this.life[i] / this.max[i];
      const ci = f > 0.75 ? 0 : f > 0.5 ? 1 : f > 0.25 ? 2 : 3;
      const col = PCOLORS[t][ci];
      if (col !== last) {
        ctx.fillStyle = col;
        last = col;
      }
      let s = this.size[i];
      if (t === P_SMOKE || t === P_GHOST) s = s * (1.6 - f * 0.6);
      else if (t === P_WAKE) s = s * (0.5 + f * 0.7);
      else if (t === P_FLAME) s = s * (0.4 + f * 0.8);
      if (t === P_RAIN) {
        ctx.fillRect(Math.round(sx * k) / k, Math.round(sy * k) / k, 1, 3);
        continue;
      }
      const si = s < 1 ? 1 : s | 0;
      if (t === P_WAKE && f < 0.35 && (i & 1)) continue;
      ctx.fillRect(Math.round((sx - si / 2) * k) / k, Math.round((sy - si / 2) * k) / k, si, si);
    }
  }

  smoke(x: number, y: number, n = 6, spread = 14, vx = 0, vy = 0): void {
    n = Math.ceil(n * this.quality);
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * spread;
      this.add(P_SMOKE, x, y, vx + Math.cos(a) * sp, vy + Math.sin(a) * sp, 0.8 + Math.random() * 1.2, 2 + Math.random() * 3, 0, 4 + Math.random() * 6);
    }
  }

  splash(x: number, y: number, n = 10): void {
    n = Math.ceil(n * this.quality);
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 8 + Math.random() * 30;
      this.add(P_SPLASH, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.4 + Math.random() * 0.5, 1 + Math.random() * 1.5, 0, 30 + Math.random() * 50);
    }
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      this.add(P_WAKE, x + Math.cos(a) * 2, y + Math.sin(a) * 2, Math.cos(a) * 18, Math.sin(a) * 18, 0.9, 2);
    }
  }

  debris(x: number, y: number, n = 8): void {
    n = Math.ceil(n * this.quality);
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 10 + Math.random() * 45;
      this.add(P_DEBRIS, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.6 + Math.random() * 0.8, 1 + Math.random() * 1.5, 2, 30 + Math.random() * 40);
    }
  }

  sparks(x: number, y: number, n = 6): void {
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 20 + Math.random() * 50;
      this.add(P_SPARK, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.2 + Math.random() * 0.3, 1, 2, 20 + Math.random() * 30);
    }
  }

  flame(x: number, y: number): void {
    this.add(P_FLAME, x + (Math.random() - 0.5) * 2, y, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, 0.3 + Math.random() * 0.4, 2 + Math.random() * 2, 0, 10 + Math.random() * 12);
    if (Math.random() < 0.3) this.add(P_SMOKE, x, y, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 1 + Math.random(), 2, 4, 8);
  }

  explosion(x: number, y: number, r: number): void {
    const n = Math.ceil(26 * this.quality);
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * r * 2.5;
      this.add(P_FLAME, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.3 + Math.random() * 0.5, 3 + Math.random() * 4, 0, 10);
    }
    this.smoke(x, y, 14, r * 1.5);
    this.debris(x, y, 12);
    this.sparks(x, y, 10);
  }

  bubble(x: number, y: number): void {
    this.add(P_BUBBLE, x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4, 0, 0, 0.5 + Math.random() * 0.6, 1 + Math.random() * 2);
  }

  wake(x: number, y: number, vx: number, vy: number, size: number, life: number): void {
    this.add(P_WAKE, x, y, vx, vy, life, size);
  }

  gold(x: number, y: number, n = 8): void {
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 10 + Math.random() * 25;
      this.add(P_GOLD, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.6 + Math.random() * 0.5, 1.5, 2, 40 + Math.random() * 40);
    }
  }

  dust(x: number, y: number, n = 5): void {
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      this.add(P_DUST, x, y, Math.cos(a) * 12, Math.sin(a) * 12, 0.4 + Math.random() * 0.3, 1.5 + Math.random(), 1, 6);
    }
  }

  ghost(x: number, y: number): void {
    this.add(P_GHOST, x, y, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, 1.2 + Math.random(), 2 + Math.random() * 2, 2, 5);
  }

  rain(x: number, y: number): void {
    this.add(P_RAIN, x, y, -20, 30, 0.5, 1, 40 + Math.random() * 30, -140);
  }
}
