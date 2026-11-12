import { ITEM } from '../data/items';
import { ICONS } from '../art/icons';
import { artDataURL } from '../render/artCanvas';
import { audio } from '../audio/audio';

type Child = Node | string | number | null | undefined | false | Child[];

export function h(tag: string, attrs: Record<string, unknown> = {}, ...kids: Child[]): HTMLElement {
  const el = document.createElement(tag);
  for (const k in attrs) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'cls') el.className = String(v);
    else if (k === 'style') el.setAttribute('style', String(v));
    else if (k === 'html') el.innerHTML = String(v);
    else if (k === 'onclick') {
      el.addEventListener('click', (e) => {
        if ((el as HTMLButtonElement).disabled) return;
        if (el.tagName === 'BUTTON' || el.classList.contains('tab')) audio.ui('click');
        (v as (e: Event) => void)(e);
      });
    } else if (k.startsWith('on')) el.addEventListener(k.slice(2), v as EventListener);
    else if (k === 'disabled') (el as HTMLButtonElement).disabled = !!v;
    else if (k === 'value') (el as HTMLInputElement).value = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  const add = (c: Child) => {
    if (c == null || c === false) return;
    if (Array.isArray(c)) {
      for (const x of c) add(x);
      return;
    }
    el.append(c instanceof Node ? c : String(c));
  };
  for (const c of kids) add(c);
  return el;
}

const iconCache = new Map<string, string>();

export function iconSrc(id: string): string {
  let u = iconCache.get(id);
  if (u !== undefined) return u;
  const ic = ICONS[id];
  u = ic ? artDataURL(ic.a, 2, ic.s) : '';
  iconCache.set(id, u);
  return u;
}

export function itemIcon(id: string, extra = ''): HTMLElement {
  const d = ITEM[id];
  const e = h('div', { cls: `icon ${extra}`, title: d?.name ?? id });
  const u = iconSrc(id);
  if (u) e.style.backgroundImage = `url(${u})`;
  return e;
}

export function bar(f: number, cls = ''): HTMLElement {
  const i = h('i');
  i.style.width = `${Math.max(0, Math.min(1, f)) * 100}%`;
  return h('div', { cls: `bar ${cls}` }, i);
}

export function setBar(el: HTMLElement, f: number): void {
  const i = el.firstElementChild as HTMLElement;
  const w = `${(Math.max(0, Math.min(1, f)) * 100).toFixed(1)}%`;
  if (i.style.width !== w) i.style.width = w;
}

export function txt(el: HTMLElement, s: string): void {
  if (el.textContent !== s) el.textContent = s;
}

export function gold(n: number): string {
  return `${Math.floor(n).toLocaleString('en-US')}g`;
}
