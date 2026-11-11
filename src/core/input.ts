export class Input {
  down = new Set<string>();
  pressed = new Set<string>();
  mouseX = 0;
  mouseY = 0;
  mouseDown = false;
  mouseRight = false;
  clicked = false;
  rightClicked = false;
  wheel = 0;
  blocked = false;
  private el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
    window.addEventListener('keydown', (e) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const k = e.code;
      if (!this.down.has(k)) this.pressed.add(k);
      this.down.add(k);
      if (k === 'Tab' || k === 'Space' || k.startsWith('Arrow')) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => {
      this.down.delete(e.code);
    });
    window.addEventListener('blur', () => {
      this.down.clear();
      this.mouseDown = false;
      this.mouseRight = false;
    });
    el.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    el.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouseDown = true;
        this.clicked = true;
      } else if (e.button === 2) {
        this.mouseRight = true;
        this.rightClicked = true;
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDown = false;
      else if (e.button === 2) this.mouseRight = false;
    });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener(
      'wheel',
      (e) => {
        this.wheel += Math.sign(e.deltaY);
        e.preventDefault();
      },
      { passive: false }
    );
  }

  key(code: string): boolean {
    return !this.blocked && this.down.has(code);
  }

  hit(code: string): boolean {
    return !this.blocked && this.pressed.has(code);
  }

  hitAny(...codes: string[]): boolean {
    for (const c of codes) if (this.hit(c)) return true;
    return false;
  }

  keyAny(...codes: string[]): boolean {
    for (const c of codes) if (this.key(c)) return true;
    return false;
  }

  endFrame(): void {
    this.pressed.clear();
    this.clicked = false;
    this.rightClicked = false;
    this.wheel = 0;
  }
}
