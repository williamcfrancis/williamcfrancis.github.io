import { CalculationResult } from './calculator';

export class Vis2D {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private container: HTMLElement;
  private animFrameId = 0;
  private currentCount = 0;
  private targetCount = 0;
  private fillRate = 2000;
  private lastTime = 0;
  private result: CalculationResult | null = null;
  private cols = 0;
  private rows = 0;
  private cellSize = 0;
  private offsetX = 0;
  private offsetY = 0;
  private color = '#ffffff';
  private isSphere = false;
  private isRainbow = false;
  private rainbowColors = ['#e53935', '#1e88e5', '#43a047', '#fdd835', '#ff8f00', '#8e24aa'];

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'vis2d-canvas';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    window.addEventListener('resize', this.onResize);
  }

  private onResize = () => {
    if (!this.result) return;
    this.layoutGrid();
    this.redraw();
  };

  private layoutGrid() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.canvas.width = w * devicePixelRatio;
    this.canvas.height = h * devicePixelRatio;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    const maxCells = this.targetCount;
    const aspect = w / h;
    this.cols = Math.ceil(Math.sqrt(maxCells * aspect));
    this.rows = Math.ceil(maxCells / this.cols);

    this.cellSize = Math.min(w / this.cols, h / this.rows);
    this.cellSize = Math.max(1, Math.min(this.cellSize, 20));

    this.cols = Math.floor(w / this.cellSize);
    this.rows = Math.ceil(this.targetCount / this.cols);

    this.offsetX = (w - this.cols * this.cellSize) / 2;
    this.offsetY = Math.max(0, (h - this.rows * this.cellSize) / 2);
  }

  private redraw() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    this.ctx.fillStyle = '#0b0d17';
    this.ctx.fillRect(0, 0, w, h);

    const gap = this.cellSize * 0.1;
    const r = (this.cellSize - gap) / 2;

    for (let i = 0; i < this.currentCount; i++) {
      const col = i % this.cols;
      const row = Math.floor(i / this.cols);
      const cx = this.offsetX + col * this.cellSize + this.cellSize / 2;
      const cy = this.offsetY + row * this.cellSize + this.cellSize / 2;

      if (this.isRainbow) {
        this.ctx.fillStyle = this.rainbowColors[i % this.rainbowColors.length];
      } else {
        this.ctx.fillStyle = this.color;
      }

      if (this.isSphere) {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }
    }
  }

  start(result: CalculationResult) {
    this.result = result;
    this.targetCount = Math.min(result.count, 500000);
    this.currentCount = 0;
    this.color = result.small.color;
    this.isSphere = result.small.shape === 'sphere';
    this.isRainbow = result.small.id === 'mm_candy' || result.small.id === 'lego_brick';

    this.layoutGrid();

    this.fillRate = Math.max(500, this.targetCount / 5);
    this.lastTime = performance.now();
    this.animate();
  }

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (this.currentCount < this.targetCount) {
      const toAdd = Math.ceil(this.fillRate * dt);
      this.currentCount = Math.min(this.currentCount + toAdd, this.targetCount);
      this.redraw();
    }
  };

  destroy() {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }

  getProgress(): number {
    if (this.targetCount === 0) return 1;
    return this.currentCount / this.targetCount;
  }
}
