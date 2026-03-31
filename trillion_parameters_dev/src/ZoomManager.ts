export class ZoomManager {
  private zoom = 0;
  private targetZoom = 0;
  private readonly SMOOTH = 0.06;
  private pinchStartDist = 0;
  private pinchStartZoom = 0;

  constructor() {
    window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    window.addEventListener('keydown', this.onKey.bind(this));
    this.tick();
  }

  private onWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY;
    const speed = 0.0004;
    this.targetZoom = Math.max(0, Math.min(1, this.targetZoom + delta * speed));
  }

  private onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      this.targetZoom = Math.min(1, this.targetZoom + 0.03);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      this.targetZoom = Math.max(0, this.targetZoom - 0.03);
    }
  }

  private onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.pinchStartDist = Math.sqrt(dx * dx + dy * dy);
      this.pinchStartZoom = this.targetZoom;
    }
  }

  private onTouchMove(e: TouchEvent) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scale = this.pinchStartDist / dist;
      this.targetZoom = Math.max(0, Math.min(1, this.pinchStartZoom + (scale - 1) * 0.5));
    } else if (e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaY = touch.clientY - (this as any)._lastTouchY;
      if ((this as any)._lastTouchY !== undefined) {
        this.targetZoom = Math.max(0, Math.min(1, this.targetZoom + deltaY * 0.001));
      }
      (this as any)._lastTouchY = touch.clientY;
    }
  }

  private tick() {
    this.zoom += (this.targetZoom - this.zoom) * this.SMOOTH;
    requestAnimationFrame(() => this.tick());
  }

  getZoom(): number {
    return this.zoom;
  }
}
