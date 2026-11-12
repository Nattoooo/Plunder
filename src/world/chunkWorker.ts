import { renderChunk, renderMapTile } from './terrain';

interface Job {
  t: 'c' | 'm';
  key: number | string;
  cx?: number;
  cy?: number;
  lod?: number;
  tx?: number;
  ty?: number;
}

const ctx = self as unknown as Worker;

ctx.onmessage = (e: MessageEvent<Job>) => {
  const m = e.data;
  if (m.t === 'c') {
    const r = renderChunk(m.cx!, m.cy!);
    ctx.postMessage({ t: 'c', key: m.key, cx: m.cx, cy: m.cy, pixels: r.pixels, types: r.types, lights: r.lights, occ: r.occ }, [r.pixels.buffer, r.types.buffer]);
  } else {
    const p = renderMapTile(m.lod!, m.tx!, m.ty!);
    ctx.postMessage({ t: 'm', key: m.key, pixels: p }, [p.buffer]);
  }
};
