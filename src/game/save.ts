import { Profile, Inventory } from './player';
import { setNextCrewId } from './crew';
import { KEELS } from '../data/components';
import { resizeDesign } from './design';

const KEY = 'plunder.save.v1';

function rle(a: Uint8Array): string {
  const out: number[] = [];
  let i = 0;
  while (i < a.length) {
    const v = a[i];
    let n = 1;
    while (i + n < a.length && a[i + n] === v && n < 65535) n++;
    out.push(v, n);
    i += n;
  }
  return out.join(',');
}

function unrle(s: string, len: number): Uint8Array<ArrayBuffer> {
  const a = new Uint8Array(len);
  if (!s) return a;
  const parts = s.split(',').map(Number);
  let o = 0;
  for (let i = 0; i < parts.length; i += 2) {
    const v = parts[i];
    const n = parts[i + 1];
    if (v) a.fill(v, o, Math.min(len, o + n));
    o += n;
  }
  return a;
}

export function hasSave(): boolean {
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function saveSummary(): { name: string; gold: number; fame: number; played: number } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    return { name: d.name, gold: d.gold, fame: d.fame, played: d.stats?.playSeconds ?? 0 };
  } catch {
    return null;
  }
}

export function saveGame(p: Profile, seen: Set<number>): boolean {
  try {
    const data = {
      ...p,
      inv: p.inv.items,
      discovered: rle(p.discovered),
      seen: [...seen].slice(-6000),
      crew: p.crew.map((c) => ({ ...c }))
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadGame(): { profile: Profile; seen: Set<number> } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    const p = new Profile();
    const skip = new Set(['inv', 'discovered', 'seen']);
    for (const k of Object.keys(d)) {
      if (skip.has(k)) continue;
      (p as unknown as Record<string, unknown>)[k] = d[k];
    }
    p.settings = { ...new Profile().settings, ...(d.settings ?? {}) };
    p.stats = { ...new Profile().stats, ...(d.stats ?? {}) };
    p.inv = new Inventory();
    p.inv.items = d.inv ?? [];
    p.discovered = unrle(d.discovered ?? '', 500 * 500);
    let maxId = 0;
    for (const c of p.crew) {
      maxId = Math.max(maxId, c.id);
      c.lx = c.lx ?? 0;
      c.ly = c.ly ?? 0;
    }
    setNextCrewId(maxId + 1);
    const k = KEELS[p.keel] ?? KEELS[0];
    if (p.design.w !== k.w || p.design.h !== k.h) p.design = resizeDesign(p.design, k.w, k.h);
    return { profile: p, seen: new Set<number>(d.seen ?? []) };
  } catch (e) {
    console.error('Failed to load save', e);
    return null;
  }
}

export function deleteSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    return;
  }
}
