import { CHUNK, CHUNKS } from './worldgen';
import { renderChunk, renderMapTile, typeAtDirect, MAP_TILE } from './terrain';

export interface Chunk {
  cx: number;
  cy: number;
  img: CanvasImageSource | null;
  types: Uint8Array;
  lights: number[];
  occ: number[];
  used: number;
}

interface WorkerMsg {
  t: 'c' | 'm';
  key: number | string;
  cx: number;
  cy: number;
  pixels: Uint8ClampedArray;
  types: Uint8Array;
  lights: number[];
  occ: number[];
}

export interface MapTile {
  img: CanvasImageSource | null;
  used: number;
}

function toImage(pixels: Uint8ClampedArray, w: number, h: number, done: (img: CanvasImageSource) => void): void {
  const data = new ImageData(pixels as Uint8ClampedArray<ArrayBuffer>, w, h);
  if (typeof createImageBitmap === 'function') {
    createImageBitmap(data).then(done, () => done(toCanvas(data)));
  } else done(toCanvas(data));
}

function toCanvas(data: ImageData): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = data.width;
  c.height = data.height;
  c.getContext('2d')!.putImageData(data, 0, 0);
  return c;
}

export class ChunkManager {
  chunks = new Map<number, Chunk>();
  tiles = new Map<string, MapTile>();
  private pending = new Set<number | string>();
  private workers: Worker[] = [];
  private busy: number[] = [];
  private queue: { key: number | string; t: 'c' | 'm'; pri: number; a: number; b: number; c: number }[] = [];
  private frame = 0;
  maxChunks = 180;
  maxTiles = 260;
  generated = 0;

  constructor() {
    const n = Math.max(1, Math.min(3, (navigator.hardwareConcurrency || 2) - 1));
    try {
      for (let i = 0; i < n; i++) {
        const w = new Worker(new URL('./chunkWorker.ts', import.meta.url), { type: 'module' });
        w.onmessage = (e: MessageEvent<WorkerMsg>) => this.receive(i, e.data);
        w.onerror = () => {
          this.workers = [];
        };
        this.workers.push(w);
        this.busy.push(0);
      }
    } catch {
      this.workers = [];
    }
  }

  private receive(wi: number, m: WorkerMsg): void {
    this.busy[wi]--;
    this.pending.delete(m.key);
    if (m.t === 'c') this.store(m.cx, m.cy, m.pixels, m.types, m.lights, m.occ);
    else {
      const tile: MapTile = { img: null, used: this.frame };
      this.tiles.set(m.key as string, tile);
      toImage(m.pixels, MAP_TILE, MAP_TILE, (img) => (tile.img = img));
    }
    this.pump();
  }

  private store(cx: number, cy: number, pixels: Uint8ClampedArray, types: Uint8Array, lights: number[], occ: number[]): void {
    const key = cx * CHUNKS + cy;
    const ch: Chunk = { cx, cy, img: null, types, lights, occ, used: this.frame };
    this.chunks.set(key, ch);
    this.generated++;
    toImage(pixels, CHUNK, CHUNK, (img) => (ch.img = img));
  }

  private pump(): void {
    if (!this.queue.length) return;
    if (this.workers.length === 0) return;
    this.queue.sort((a, b) => a.pri - b.pri);
    for (let wi = 0; wi < this.workers.length && this.queue.length; wi++) {
      while (this.busy[wi] < 2 && this.queue.length) {
        const j = this.queue.shift()!;
        this.busy[wi]++;
        if (j.t === 'c') this.workers[wi].postMessage({ t: 'c', key: j.key, cx: j.a, cy: j.b });
        else this.workers[wi].postMessage({ t: 'm', key: j.key, lod: j.a, tx: j.b, ty: j.c });
      }
    }
  }

  update(x0: number, y0: number, x1: number, y1: number, fx: number, fy: number): void {
    this.frame++;
    const m = 160;
    const cx0 = Math.max(0, Math.floor((x0 - m) / CHUNK));
    const cy0 = Math.max(0, Math.floor((y0 - m) / CHUNK));
    const cx1 = Math.min(CHUNKS - 1, Math.floor((x1 + m) / CHUNK));
    const cy1 = Math.min(CHUNKS - 1, Math.floor((y1 + m) / CHUNK));
    for (let cx = cx0; cx <= cx1; cx++) {
      for (let cy = cy0; cy <= cy1; cy++) {
        const key = cx * CHUNKS + cy;
        const c = this.chunks.get(key);
        if (c) {
          c.used = this.frame;
          continue;
        }
        if (this.pending.has(key)) continue;
        const dx = (cx + 0.5) * CHUNK - fx;
        const dy = (cy + 0.5) * CHUNK - fy;
        this.request(key, cx, cy, dx * dx + dy * dy);
      }
    }
    if (this.workers.length === 0 && this.queue.length) {
      this.queue.sort((a, b) => a.pri - b.pri);
      const t0 = performance.now();
      while (this.queue.length && performance.now() - t0 < 4) {
        const j = this.queue.shift()!;
        this.pending.delete(j.key);
        if (j.t === 'c') {
          const r = renderChunk(j.a, j.b);
          this.store(j.a, j.b, r.pixels, r.types, r.lights, r.occ);
        } else {
          const p = renderMapTile(j.a, j.b, j.c);
          const tile: MapTile = { img: null, used: this.frame };
          this.tiles.set(j.key as string, tile);
          toImage(p, MAP_TILE, MAP_TILE, (img) => (tile.img = img));
        }
      }
    }
    if (this.frame % 30 === 0) {
      const maxD = Math.pow(x1 - x0 + (y1 - y0) + 1400, 2);
      for (let i = this.queue.length - 1; i >= 0; i--) {
        const j = this.queue[i];
        if (j.t !== 'c') continue;
        const dx = (j.a + 0.5) * CHUNK - fx;
        const dy = (j.b + 0.5) * CHUNK - fy;
        j.pri = dx * dx + dy * dy;
        if (j.pri > maxD) {
          this.pending.delete(j.key);
          this.queue.splice(i, 1);
        }
      }
    }
    if (this.frame % 60 === 0) this.evict();
    this.pump();
  }

  private request(key: number, cx: number, cy: number, pri: number): void {
    this.pending.add(key);
    this.queue.push({ key, t: 'c', pri, a: cx, b: cy, c: 0 });
  }

  tile(lod: number, tx: number, ty: number, pri: number): MapTile | null {
    const key = `${lod}:${tx}:${ty}`;
    const t = this.tiles.get(key);
    if (t) {
      t.used = this.frame;
      return t;
    }
    if (!this.pending.has(key)) {
      this.pending.add(key);
      this.queue.push({ key, t: 'm', pri: 1e12 + pri, a: lod, b: tx, c: ty });
      this.pump();
    }
    return null;
  }

  private evict(): void {
    if (this.chunks.size > this.maxChunks) {
      const arr = [...this.chunks.entries()].sort((a, b) => a[1].used - b[1].used);
      const n = this.chunks.size - this.maxChunks;
      for (let i = 0; i < n; i++) {
        const c = arr[i][1];
        if (c.img && 'close' in c.img) (c.img as ImageBitmap).close();
        this.chunks.delete(arr[i][0]);
      }
    }
    if (this.tiles.size > this.maxTiles) {
      const arr = [...this.tiles.entries()].sort((a, b) => a[1].used - b[1].used);
      const n = this.tiles.size - this.maxTiles;
      for (let i = 0; i < n; i++) {
        const t = arr[i][1];
        if (t.img && 'close' in t.img) (t.img as ImageBitmap).close();
        this.tiles.delete(arr[i][0]);
      }
    }
  }

  get(cx: number, cy: number): Chunk | undefined {
    return this.chunks.get(cx * CHUNKS + cy);
  }

  typeAt(x: number, y: number): number {
    const cx = Math.floor(x / CHUNK);
    const cy = Math.floor(y / CHUNK);
    const c = this.chunks.get(cx * CHUNKS + cy);
    if (c) {
      const lx = Math.floor(x - cx * CHUNK);
      const ly = Math.floor(y - cy * CHUNK);
      return c.types[ly * CHUNK + lx];
    }
    return typeAtDirect(x, y);
  }

  loadedAt(x: number, y: number): boolean {
    return this.chunks.has(Math.floor(x / CHUNK) * CHUNKS + Math.floor(y / CHUNK));
  }

  pendingCount(): number {
    return this.pending.size;
  }
}
