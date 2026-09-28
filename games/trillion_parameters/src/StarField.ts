interface Star {
  x: number;
  y: number;
  baseSize: number;
  twinkleSeed: number;
  twinkleRate: number;
  parallax: number;
  hue: number;
}

export class StarField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private time = 0;
  private dpr: number;
  private w = 0;
  private h = 0;
  private reducedMotion: boolean;

  constructor(canvas: HTMLCanvasElement, count = 200, reducedMotion = false) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.reducedMotion = reducedMotion;
    this.resize();
    this.populate(count);
    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private populate(count: number) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random(),
        baseSize: 0.4 + Math.random() * 1.4,
        twinkleSeed: Math.random() * Math.PI * 2,
        twinkleRate: 0.4 + Math.random() * 0.8,
        parallax: 0.3 + Math.random() * 1.5,
        hue: 200 + Math.random() * 80,
      });
    }
  }

  tick(dt: number, zoom: number) {
    this.time += dt;
    const c = this.ctx;
    c.clearRect(0, 0, this.w, this.h);

    const offsetY = -zoom * 60;
    for (const s of this.stars) {
      const tw = this.reducedMotion ? 0.85 : (0.55 + 0.45 * Math.sin(this.time * s.twinkleRate + s.twinkleSeed));
      const sizeBoost = 1 + zoom * 0.6;
      const size = s.baseSize * sizeBoost * tw;
      const yPos = ((s.y + offsetY * s.parallax * 0.001) % 1 + 1) % 1;
      const xPx = s.x * this.w;
      const yPx = yPos * this.h;
      const alpha = 0.25 + tw * 0.55 * (0.4 + zoom * 0.6);

      c.fillStyle = `hsla(${s.hue}, 70%, 80%, ${alpha})`;
      c.beginPath();
      c.arc(xPx, yPx, size, 0, Math.PI * 2);
      c.fill();
    }
  }
}
