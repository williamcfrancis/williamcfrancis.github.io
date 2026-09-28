type Listener = () => void;

export function isInteractiveTarget(target: EventTarget | null): boolean {
  const element = target as Element | null;
  return typeof element?.closest === 'function'
    && Boolean(element.closest('input, textarea, select, button, a, [contenteditable="true"]'));
}

export class ZoomManager {
  private zoom = 0;
  private targetZoom = 0;
  private pinchStartDist = 0;
  private pinchStartZoom = 0;
  private lastTouchY: number | null = null;
  private userInputListeners: Listener[] = [];

  constructor() {
    window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', () => { this.lastTouchY = null; });
    window.addEventListener('keydown', this.onKey.bind(this));
  }

  private onWheel(e: WheelEvent) {
    if (isInteractiveTarget(e.target)) return;
    e.preventDefault();
    const delta = e.deltaY;
    const speed = 0.0004;
    this.targetZoom = Math.max(0, Math.min(1, this.targetZoom + delta * speed));
    this.fireUserInput();
  }

  private onKey(e: KeyboardEvent) {
    if (isInteractiveTarget(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      this.targetZoom = Math.min(1, this.targetZoom + 0.03);
      this.fireUserInput();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      this.targetZoom = Math.max(0, this.targetZoom - 0.03);
      this.fireUserInput();
    }
  }

  private onTouchStart(e: TouchEvent) {
    if (isInteractiveTarget(e.target)) { this.lastTouchY = null; return; }
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.pinchStartDist = Math.sqrt(dx * dx + dy * dy);
      this.pinchStartZoom = this.targetZoom;
    } else if (e.touches.length === 1) {
      this.lastTouchY = e.touches[0].clientY;
    }
  }

  private onTouchMove(e: TouchEvent) {
    if (isInteractiveTarget(e.target)) return;
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.max(1, Math.abs(Math.sqrt(dx * dx + dy * dy)));
      const scale = this.pinchStartDist / dist;
      this.targetZoom = Math.max(0, Math.min(1, this.pinchStartZoom + (scale - 1) * 0.5));
      this.fireUserInput();
    } else if (e.touches.length === 1) {
      e.preventDefault();
      const y = e.touches[0].clientY;
      if (this.lastTouchY !== null) {
        const dy = y - this.lastTouchY;
        this.targetZoom = Math.max(0, Math.min(1, this.targetZoom - dy * 0.001));
        this.fireUserInput();
      }
      this.lastTouchY = y;
    }
  }

  update(dt: number) {
    const factor = 1 - Math.exp(-dt * 12);
    this.zoom += (this.targetZoom - this.zoom) * factor;
  }

  getZoom(): number {
    return this.zoom;
  }

  getTargetZoom(): number {
    return this.targetZoom;
  }

  setTarget(z: number) {
    if (!Number.isFinite(z)) return;
    this.targetZoom = Math.max(0, Math.min(1, z));
    this.fireUserInput();
  }

  setTargetSilent(z: number) {
    if (!Number.isFinite(z)) return;
    this.targetZoom = Math.max(0, Math.min(1, z));
  }

  onUserInput(fn: Listener) {
    this.userInputListeners.push(fn);
  }

  private fireUserInput() {
    for (const fn of this.userInputListeners) fn();
  }
}
