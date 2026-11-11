interface Spec {
  ref: number;
  max: number;
  rolloff: number;
  vol: number;
}

const SPECS: Record<string, Spec> = {
  cannon: { ref: 140, max: 1800, rolloff: 1.1, vol: 0.5 },
  cannon_big: { ref: 180, max: 2200, rolloff: 1, vol: 0.6 },
  swivel: { ref: 90, max: 1100, rolloff: 1.4, vol: 0.35 },
  mortar: { ref: 200, max: 2600, rolloff: 0.9, vol: 0.55 },
  splash: { ref: 70, max: 800, rolloff: 1.5, vol: 0.3 },
  hit: { ref: 100, max: 1200, rolloff: 1.2, vol: 0.5 },
  explosion: { ref: 200, max: 2600, rolloff: 0.9, vol: 0.7 },
  sink: { ref: 160, max: 1800, rolloff: 1, vol: 0.5 },
  thump: { ref: 80, max: 900, rolloff: 1.4, vol: 0.45 },
  fort: { ref: 200, max: 2400, rolloff: 1, vol: 0.5 },
  bell: { ref: 220, max: 2000, rolloff: 1.1, vol: 0.32 },
  creak: { ref: 40, max: 400, rolloff: 2, vol: 0.12 },
  step: { ref: 30, max: 300, rolloff: 2, vol: 0.12 },
  dig: { ref: 40, max: 400, rolloff: 2, vol: 0.4 },
  sword: { ref: 50, max: 500, rolloff: 1.8, vol: 0.35 },
  pistol: { ref: 90, max: 1000, rolloff: 1.4, vol: 0.4 },
  hurt: { ref: 50, max: 500, rolloff: 1.8, vol: 0.35 },
  roar: { ref: 260, max: 3000, rolloff: 0.9, vol: 0.6 },
  ui: { ref: 1, max: 1e9, rolloff: 0, vol: 0.5 }
};

type Gen = (sr: number) => Float32Array;

function env(i: number, n: number, attack: number, decay: number, sr: number): number {
  const t = i / sr;
  if (t < attack) return t / attack;
  return Math.exp(-(t - attack) / decay);
}

function noiseBuf(sr: number, dur: number, fn: (i: number, t: number, nz: number, st: { lp: number; lp2: number; hp: number }) => number): Float32Array {
  const n = Math.floor(sr * dur);
  const out = new Float32Array(n);
  const st = { lp: 0, lp2: 0, hp: 0 };
  let seed = 12345;
  for (let i = 0; i < n; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const nz = (seed / 0x7fffffff) * 2 - 1;
    out[i] = fn(i, i / sr, nz, st);
  }
  return out;
}

function lpStep(st: { lp: number }, x: number, cutoff: number, sr: number): number {
  const a = 1 - Math.exp((-2 * Math.PI * cutoff) / sr);
  st.lp += (x - st.lp) * a;
  return st.lp;
}

const GENS: Record<string, Gen> = {
  cannon: (sr) =>
    noiseBuf(sr, 1.3, (i, t, nz, st) => {
      const cut = 200 + 2600 * Math.exp(-t * 7);
      const n = lpStep(st, nz, cut, sr) * env(i, 0, 0.004, 0.32, sr);
      const thump = Math.sin(2 * Math.PI * (70 * t - 30 * t * t)) * Math.exp(-t * 9) * 0.9;
      return (n * 1.6 + thump) * 0.8;
    }),
  cannon_big: (sr) =>
    noiseBuf(sr, 1.8, (i, t, nz, st) => {
      const cut = 150 + 2000 * Math.exp(-t * 5);
      const n = lpStep(st, nz, cut, sr) * env(i, 0, 0.005, 0.45, sr);
      const thump = Math.sin(2 * Math.PI * (55 * t - 20 * t * t)) * Math.exp(-t * 6);
      return (n * 1.7 + thump) * 0.8;
    }),
  swivel: (sr) =>
    noiseBuf(sr, 0.4, (i, t, nz, st) => {
      const l = lpStep(st, nz, 4000, sr);
      return (nz - l * 0.5) * env(i, 0, 0.002, 0.07, sr) * 0.7;
    }),
  mortar: (sr) =>
    noiseBuf(sr, 1.6, (i, t, nz, st) => {
      const n = lpStep(st, nz, 120 + 900 * Math.exp(-t * 6), sr) * env(i, 0, 0.01, 0.4, sr);
      const thump = Math.sin(2 * Math.PI * (45 * t)) * Math.exp(-t * 5);
      return (n * 1.8 + thump * 1.1) * 0.75;
    }),
  splash: (sr) =>
    noiseBuf(sr, 0.8, (i, t, nz, st) => {
      const l = lpStep(st, nz, 2500 - t * 2000, sr);
      return (nz * 0.3 + l) * env(i, 0, 0.03, 0.18, sr) * 0.8;
    }),
  hit: (sr) =>
    noiseBuf(sr, 0.6, (i, t, nz, st) => {
      const crack = Math.random() < 0.004 * Math.exp(-t * 8) ? 1 : 0;
      st.hp = st.hp * 0.9 + crack;
      const l = lpStep(st, nz, 1800 * Math.exp(-t * 4) + 200, sr);
      const thump = Math.sin(2 * Math.PI * 95 * t) * Math.exp(-t * 14);
      return (l * env(i, 0, 0.002, 0.12, sr) + st.hp * 0.6 * Math.sign(nz) + thump) * 0.7;
    }),
  explosion: (sr) =>
    noiseBuf(sr, 2.4, (i, t, nz, st) => {
      const l = lpStep(st, nz, 100 + 1600 * Math.exp(-t * 3), sr);
      const rumble = Math.sin(2 * Math.PI * 38 * t) * Math.exp(-t * 2.2);
      return (l * 2 * env(i, 0, 0.01, 0.7, sr) + rumble * 0.8) * 0.75;
    }),
  sink: (sr) =>
    noiseBuf(sr, 2.5, (i, t, nz, st) => {
      const l = lpStep(st, nz, 500 + 300 * Math.sin(t * 9), sr);
      const groan = Math.sin(2 * Math.PI * (110 - t * 25) * t) * 0.3 * Math.exp(-t * 0.8);
      return (l * 1.4 * env(i, 0, 0.2, 0.9, sr) + groan) * 0.6;
    }),
  thump: (sr) =>
    noiseBuf(sr, 0.35, (i, t, nz, st) => {
      const l = lpStep(st, nz, 600, sr);
      return (l + Math.sin(2 * Math.PI * 80 * t) * 0.8) * env(i, 0, 0.002, 0.08, sr);
    }),
  fort: (sr) => GENS.cannon_big(sr),
  bell: (sr) => {
    const n = Math.floor(sr * 2.2);
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      out[i] = (Math.sin(2 * Math.PI * 660 * t) + Math.sin(2 * Math.PI * 1320 * t) * 0.45 + Math.sin(2 * Math.PI * 1980 * t) * 0.25 + Math.sin(2 * Math.PI * 1667 * t) * 0.15) * Math.exp(-t * 2.2) * 0.35;
    }
    return out;
  },
  creak: (sr) => {
    const n = Math.floor(sr * 0.7);
    const out = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      const f = 140 + Math.sin(t * 18) * 25 + t * 40;
      ph += f / sr;
      const saw = (ph % 1) * 2 - 1;
      out[i] = saw * Math.sin(Math.PI * (t / 0.7)) * 0.25;
    }
    return out;
  },
  step: (sr) => noiseBuf(sr, 0.06, (i, t, nz, st) => lpStep(st, nz, 1500, sr) * env(i, 0, 0.002, 0.015, sr)),
  dig: (sr) =>
    noiseBuf(sr, 0.3, (i, t, nz, st) => {
      const l = lpStep(st, nz, 900, sr);
      return (l * 1.5 + nz * 0.2) * env(i, 0, 0.003, 0.06, sr);
    }),
  sword: (sr) =>
    noiseBuf(sr, 0.22, (i, t, nz, st) => {
      const l = lpStep(st, nz, 1200 + t * 18000, sr);
      return (nz - l) * Math.sin(Math.PI * (t / 0.22)) * 0.5;
    }),
  pistol: (sr) =>
    noiseBuf(sr, 0.5, (i, t, nz, st) => {
      const l = lpStep(st, nz, 3000 * Math.exp(-t * 10) + 300, sr);
      return l * 1.8 * env(i, 0, 0.001, 0.08, sr);
    }),
  hurt: (sr) => {
    const n = Math.floor(sr * 0.2);
    const out = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      ph += (320 - t * 900) / sr;
      out[i] = (ph % 1 < 0.5 ? 0.3 : -0.3) * (1 - t / 0.2);
    }
    return out;
  },
  roar: (sr) =>
    noiseBuf(sr, 2.2, (i, t, nz, st) => {
      const l = lpStep(st, nz, 300 + 200 * Math.sin(t * 30), sr);
      const tone = Math.sin(2 * Math.PI * (70 + 20 * Math.sin(t * 6)) * t);
      return (l * 1.5 + tone * 0.6) * Math.sin(Math.PI * Math.min(1, t / 2.2)) * 0.7;
    })
};

const UI_GENS: Record<string, Gen> = {
  click: (sr) => tone(sr, [[880, 0.03]], 'square', 0.15),
  open: (sr) => tone(sr, [[520, 0.04], [780, 0.05]], 'square', 0.12),
  close: (sr) => tone(sr, [[780, 0.04], [520, 0.05]], 'square', 0.12),
  coin: (sr) => tone(sr, [[1568, 0.06], [2093, 0.16]], 'sine', 0.35),
  buy: (sr) => tone(sr, [[1046, 0.05], [1318, 0.05], [1568, 0.12]], 'square', 0.12),
  error: (sr) => tone(sr, [[180, 0.08], [140, 0.14]], 'square', 0.18),
  pickup: (sr) => tone(sr, [[660, 0.05], [880, 0.05], [1320, 0.1]], 'triangle', 0.3),
  levelup: (sr) => tone(sr, [[523, 0.09], [659, 0.09], [784, 0.09], [1046, 0.3]], 'square', 0.14),
  quest: (sr) => tone(sr, [[392, 0.1], [523, 0.1], [659, 0.1], [784, 0.12], [1046, 0.35]], 'triangle', 0.3),
  chest: (sr) => tone(sr, [[220, 0.08], [330, 0.08], [1568, 0.1], [2093, 0.2]], 'triangle', 0.3),
  sail: (sr) =>
    noiseBuf(sr, 0.55, (i, t, nz, st) => {
      const l = lpStep(st, nz, 600 + t * 2400, sr);
      return (nz * 0.4 - l * 0.3) * Math.sin(Math.PI * (t / 0.55)) * 0.45;
    }),
  thunder: (sr) =>
    noiseBuf(sr, 3.5, (i, t, nz, st) => {
      const l = lpStep(st, nz, 180 + 500 * Math.exp(-t * 2), sr);
      const mod = 0.6 + 0.4 * Math.sin(t * 13 + Math.sin(t * 4) * 3);
      return l * 2.4 * mod * env(i, 0, 0.05, 1.1, sr);
    }),
  anchor: (sr) =>
    noiseBuf(sr, 0.9, (i, t, nz, st) => {
      const clank = Math.sin(2 * Math.PI * 340 * t) * Math.exp(-((t * 9) % 1) * 6) * 0.4;
      return (lpStep(st, nz, 2000, sr) * 0.3 + clank) * (1 - t / 0.9);
    })
};

function tone(sr: number, notes: [number, number][], type: 'square' | 'sine' | 'triangle', vol: number): Float32Array {
  let total = 0;
  for (const [, d] of notes) total += d;
  const n = Math.floor(sr * (total + 0.05));
  const out = new Float32Array(n);
  let i = 0;
  for (const [f, d] of notes) {
    const len = Math.floor(sr * d);
    let ph = 0;
    for (let k = 0; k < len && i < n; k++, i++) {
      ph += f / sr;
      const p = ph % 1;
      let v = type === 'square' ? (p < 0.5 ? 1 : -1) : type === 'triangle' ? 4 * Math.abs(p - 0.5) - 1 : Math.sin(2 * Math.PI * p);
      v *= Math.min(1, k / 40) * (1 - (k / len) * 0.6);
      out[i] = v * vol;
    }
  }
  return out;
}

export class GameAudio {
  ctx: AudioContext | null = null;
  master!: GainNode;
  sfx!: GainNode;
  musicBus!: GainNode;
  ambBus!: GainNode;
  buffers: Record<string, AudioBuffer> = {};
  lx = 0;
  ly = 0;
  halfW = 400;
  volumes = { master: 0.8, sfx: 0.8, music: 0.45, ambience: 0.7 };
  private ocean: GainNode | null = null;
  private wind: GainNode | null = null;
  private rain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private recent = new Map<string, number>();
  music: Music | null = null;

  init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    comp.connect(ctx.destination);
    this.master = ctx.createGain();
    this.master.connect(comp);
    this.sfx = ctx.createGain();
    this.sfx.connect(this.master);
    this.musicBus = ctx.createGain();
    this.musicBus.connect(this.master);
    this.ambBus = ctx.createGain();
    this.ambBus.connect(this.master);
    this.applyVolumes();
    const sr = ctx.sampleRate;
    for (const k in GENS) this.buffers[k] = this.mk(GENS[k](sr));
    for (const k in UI_GENS) this.buffers[k] = this.mk(UI_GENS[k](sr));
    this.startAmbience();
    this.music = new Music(ctx, this.musicBus);
  }

  private mk(data: Float32Array): AudioBuffer {
    const ctx = this.ctx!;
    const b = ctx.createBuffer(1, data.length, ctx.sampleRate);
    b.copyToChannel(data as Float32Array<ArrayBuffer>, 0);
    return b;
  }

  applyVolumes(): void {
    if (!this.ctx) return;
    this.master.gain.value = this.volumes.master;
    this.sfx.gain.value = this.volumes.sfx;
    this.musicBus.gain.value = this.volumes.music * 0.5;
    this.ambBus.gain.value = this.volumes.ambience;
  }

  private loopNoise(type: 'brown' | 'white' | 'pink', dur: number): AudioBuffer {
    const ctx = this.ctx!;
    const n = Math.floor(ctx.sampleRate * dur);
    const d = new Float32Array(n);
    let last = 0;
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'brown') {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      } else if (type === 'pink') {
        b0 = 0.99765 * b0 + w * 0.099;
        b1 = 0.963 * b1 + w * 0.2965;
        b2 = 0.57 * b2 + w * 1.0526;
        d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.12;
      } else d[i] = w * 0.3;
    }
    const fade = Math.floor(ctx.sampleRate * 0.05);
    for (let i = 0; i < fade; i++) {
      const t = i / fade;
      d[i] *= t;
      d[n - 1 - i] *= t;
    }
    return this.mk(d);
  }

  private startAmbience(): void {
    const ctx = this.ctx!;
    const mkLoop = (buf: AudioBuffer, filter: BiquadFilterNode | null): GainNode => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const g = ctx.createGain();
      g.gain.value = 0;
      if (filter) {
        src.connect(filter);
        filter.connect(g);
      } else src.connect(g);
      g.connect(this.ambBus);
      src.start();
      return g;
    };
    const oceanF = ctx.createBiquadFilter();
    oceanF.type = 'lowpass';
    oceanF.frequency.value = 420;
    this.ocean = mkLoop(this.loopNoise('brown', 6), oceanF);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 160;
    lfo.connect(lfoG);
    lfoG.connect(oceanF.frequency);
    lfo.start();
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.value = 700;
    this.windFilter.Q.value = 0.8;
    this.wind = mkLoop(this.loopNoise('pink', 5), this.windFilter);
    const rainF = ctx.createBiquadFilter();
    rainF.type = 'highpass';
    rainF.frequency.value = 1800;
    this.rain = mkLoop(this.loopNoise('white', 4), rainF);
  }

  setAmbience(ocean: number, wind: number, rain: number, windPitch: number): void {
    if (!this.ctx || !this.ocean) return;
    const t = this.ctx.currentTime;
    this.ocean.gain.setTargetAtTime(ocean * 0.55, t, 0.5);
    this.wind!.gain.setTargetAtTime(wind * 0.25, t, 0.5);
    this.rain!.gain.setTargetAtTime(rain * 0.3, t, 0.8);
    this.windFilter!.frequency.setTargetAtTime(500 + windPitch * 900, t, 0.8);
  }

  setListener(x: number, y: number, halfW: number): void {
    this.lx = x;
    this.ly = y;
    this.halfW = halfW;
  }

  play(name: string, x?: number, y?: number, vol = 1, pitch = 1): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const buf = this.buffers[name];
    if (!buf) return;
    const now = ctx.currentTime;
    const last = this.recent.get(name) ?? 0;
    if (now - last < 0.035) return;
    this.recent.set(name, now);
    const spec = SPECS[name] ?? SPECS.ui;
    let gain = spec.vol * vol;
    let pan = 0;
    if (x !== undefined && y !== undefined) {
      const dx = x - this.lx;
      const dy = y - this.ly;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > spec.max) return;
      const att = d <= spec.ref ? 1 : spec.ref / (spec.ref + spec.rolloff * (d - spec.ref));
      const edge = 1 - Math.pow(d / spec.max, 2);
      gain *= att * edge;
      pan = Math.max(-1, Math.min(1, dx / (this.halfW * 1.4))) * 0.8;
      if (gain < 0.004) return;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = pitch * (0.94 + Math.random() * 0.12);
    const g = ctx.createGain();
    g.gain.value = gain;
    if (pan !== 0 && ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      src.connect(g);
      g.connect(p);
      p.connect(this.sfx);
    } else {
      src.connect(g);
      g.connect(this.sfx);
    }
    src.start();
  }

  ui(name: string): void {
    this.play(name);
  }
}

interface Song {
  bpm: number;
  lead: string;
  bass: string;
  drums: string;
  leadType: OscillatorType;
  leadVol: number;
}

const SONGS: Record<string, Song> = {
  sea: {
    bpm: 96,
    leadType: 'square',
    leadVol: 0.05,
    lead: 'D4 - F4 A4 D5 - C5 A4 G4 - A4 F4 E4 - D4 - D4 - F4 A4 D5 - E5 F5 E5 D5 C5 A4 D5 - - - A4 - C5 A4 G4 - F4 G4 A4 - F4 D4 E4 - C4 - D4 - F4 G4 A4 - G4 F4 E4 C4 D4 E4 D4 - - -',
    bass: 'D2 - A2 - D2 - A2 - C2 - G2 - C2 - G2 - D2 - A2 - A#1 - F2 - A1 - E2 - D2 - A2 - F2 - C3 - F2 - C3 - C2 - G2 - C2 - G2 - A#1 - F2 - A1 - E2 - D2 - A2 - D2 - - -',
    drums: 'k . h . s . h . k . h . s . h h'
  },
  port: {
    bpm: 112,
    leadType: 'square',
    leadVol: 0.045,
    lead: 'G4 B4 D5 B4 C5 - A4 - B4 D5 G5 D5 E5 - D5 - C5 E5 C5 A4 B4 D5 B4 G4 A4 F#4 A4 D5 G4 - - - G4 B4 D5 B4 C5 - E5 - D5 B4 G4 B4 A4 - F#4 - G4 A4 B4 C5 D5 E5 F#5 E5 D5 C5 A4 F#4 G4 - - -',
    bass: 'G2 - D3 - C3 - E3 - G2 - D3 - C3 - D3 - A2 - E3 - G2 - D3 - D2 - A2 - G2 - D3 - G2 - D3 - C3 - G2 - G2 - B2 - D2 - A2 - C3 - G2 - A2 - E3 - D2 - A2 - G2 - D3 -',
    drums: 'k . h k s . h . k . h k s . h .'
  },
  battle: {
    bpm: 146,
    leadType: 'sawtooth',
    leadVol: 0.03,
    lead: 'A4 A4 C5 A4 E5 - D5 C5 B4 B4 D5 B4 F5 - E5 D5 A4 A4 C5 A4 E5 - A5 G5 F5 E5 D5 B4 C5 - A4 - E5 - D5 C5 D5 - C5 B4 C5 - B4 A4 G#4 - E4 - F5 E5 D5 C5 B4 C5 D5 B4 A4 - - - A4 - - -',
    bass: 'A1 A2 A1 A2 A1 A2 A1 A2 G1 G2 G1 G2 G1 G2 G1 G2 F1 F2 F1 F2 F1 F2 F1 F2 E1 E2 E1 E2 E1 E2 E1 E2 A1 A2 A1 A2 F1 F2 F1 F2 G1 G2 G1 G2 E1 E2 E1 E2 D1 D2 D1 D2 E1 E2 E1 E2 A1 A2 A1 A2 A1 A2 A1 A2',
    drums: 'k h s h k k s h k h s h k k s s'
  },
  night: {
    bpm: 66,
    leadType: 'triangle',
    leadVol: 0.08,
    lead: 'E4 - - G4 B4 - - - A4 - - G4 E4 - - - D4 - - E4 G4 - - - F#4 - - - - - - - E4 - - G4 B4 - - D5 C5 - - B4 A4 - - - G4 - - A4 B4 - - - E4 - - - - - - -',
    bass: 'E2 - - - - - - - C2 - - - - - - - G1 - - - - - - - B1 - - - - - - - E2 - - - - - - - A1 - - - - - - - C2 - - - - - - - E2 - - - - - - -',
    drums: '. . . . . . . . . . . . . . . .'
  }
};

const NOTE_IDX: Record<string, number> = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
function noteFreq(n: string): number {
  const m = /^([A-G]#?)(\d)$/.exec(n);
  if (!m) return 0;
  const midi = NOTE_IDX[m[1]] + (parseInt(m[2]) + 1) * 12;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

class Music {
  ctx: AudioContext;
  out: GainNode;
  song: Song | null = null;
  name = '';
  step = 0;
  nextTime = 0;
  private lead: string[] = [];
  private bass: string[] = [];
  private drums: string[] = [];
  private noise: AudioBuffer;
  private timer: number;
  private songGain: GainNode;

  constructor(ctx: AudioContext, out: GainNode) {
    this.ctx = ctx;
    this.out = out;
    this.songGain = ctx.createGain();
    this.songGain.connect(out);
    const n = Math.floor(ctx.sampleRate * 0.2);
    this.noise = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = new Float32Array(n);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    this.noise.copyToChannel(d, 0);
    this.timer = window.setInterval(() => this.tick(), 50);
  }

  play(name: string): void {
    if (name === this.name) return;
    this.name = name;
    const s = SONGS[name];
    const t = this.ctx.currentTime;
    this.songGain.gain.cancelScheduledValues(t);
    this.songGain.gain.setValueAtTime(this.songGain.gain.value, t);
    this.songGain.gain.linearRampToValueAtTime(0, t + 0.6);
    setTimeout(() => {
      if (this.name !== name) return;
      this.song = s ?? null;
      if (!s) return;
      this.lead = s.lead.split(/\s+/);
      this.bass = s.bass.split(/\s+/);
      this.drums = s.drums.split(/\s+/);
      this.step = 0;
      this.nextTime = this.ctx.currentTime + 0.1;
      const n = this.ctx.currentTime;
      this.songGain.gain.cancelScheduledValues(n);
      this.songGain.gain.setValueAtTime(0, n);
      this.songGain.gain.linearRampToValueAtTime(1, n + 1.2);
    }, 650);
  }

  private tick(): void {
    const s = this.song;
    if (!s || this.ctx.state !== 'running') return;
    const stepDur = 60 / s.bpm / 2;
    while (this.nextTime < this.ctx.currentTime + 0.25) {
      const i = this.step;
      const ln = this.lead[i % this.lead.length];
      const bn = this.bass[i % this.bass.length];
      const dn = this.drums[i % this.drums.length];
      if (ln !== '-' && ln !== '.') this.note(noteFreq(ln), this.nextTime, this.holdLen(this.lead, i) * stepDur, s.leadType, s.leadVol);
      if (bn !== '-' && bn !== '.') this.note(noteFreq(bn), this.nextTime, this.holdLen(this.bass, i) * stepDur * 0.9, 'triangle', 0.09);
      if (dn === 'k') this.drum(this.nextTime, 0.14, 160, 0.16);
      else if (dn === 's') this.drum(this.nextTime, 0.08, 1800, 0.07);
      else if (dn === 'h') this.drum(this.nextTime, 0.03, 7000, 0.025);
      this.nextTime += stepDur;
      this.step++;
    }
  }

  private holdLen(arr: string[], i: number): number {
    let n = 1;
    while (arr[(i + n) % arr.length] === '-' && n < 8) n++;
    return n;
  }

  private note(f: number, t: number, dur: number, type: OscillatorType, vol: number): void {
    if (!f) return;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.value = f;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.setValueAtTime(vol, t + Math.max(0.02, dur - 0.05));
    g.gain.exponentialRampToValueAtTime(0.0005, t + dur + 0.04);
    o.connect(g);
    g.connect(this.songGain);
    o.start(t);
    o.stop(t + dur + 0.06);
  }

  private drum(t: number, dur: number, freq: number, vol: number): void {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = freq < 500 ? 'lowpass' : 'highpass';
    f.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.songGain);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  dispose(): void {
    clearInterval(this.timer);
  }
}

export const audio = new GameAudio();
