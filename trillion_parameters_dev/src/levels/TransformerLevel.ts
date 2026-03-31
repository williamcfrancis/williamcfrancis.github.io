import type { Level } from './Level';

export class TransformerLevel implements Level {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private time = 0;
  private headCount = 12;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  init() {}

  update(dt: number, _localZoom: number, _opacity: number) {
    this.time += dt;
  }

  render(opacity: number) {
    const c = this.ctx;
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;

    c.save();
    c.globalAlpha = opacity;

    const totalW = Math.min(w * 0.75, 600);
    const totalH = Math.min(h * 0.7, 450);
    const startX = cx - totalW / 2;
    const startY = cy - totalH / 2;

    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.35)';
    c.textAlign = 'center';
    c.fillText('Input Tokens', cx, startY - 8);

    const mhaY = startY + 15;
    const mhaH = totalH * 0.35;
    const headW = (totalW - (this.headCount - 1) * 4) / this.headCount;

    c.strokeStyle = 'rgba(78,205,196,0.12)';
    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.strokeRect(startX - 5, mhaY - 5, totalW + 10, mhaH + 10);
    c.setLineDash([]);

    c.font = '9px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.3)';
    c.textAlign = 'left';
    c.fillText('Multi-Head Attention', startX, mhaY - 10);

    for (let i = 0; i < this.headCount; i++) {
      const hx = startX + i * (headW + 4);
      const activation = Math.abs(Math.sin(this.time * 0.8 + i * 0.7));

      c.fillStyle = `rgba(78,205,196,${0.05 + activation * 0.12})`;
      c.strokeStyle = `rgba(78,205,196,${0.2 + activation * 0.2})`;
      c.lineWidth = 1;
      this.roundRect(c, hx, mhaY, headW, mhaH, 3);
      c.fill();
      c.stroke();

      const miniSize = Math.min(headW - 6, mhaH * 0.4);
      const miniX = hx + (headW - miniSize) / 2;
      const miniY = mhaY + (mhaH - miniSize) / 2;
      const cells = 4;
      const cellSize = miniSize / cells;
      for (let r = 0; r < cells; r++) {
        for (let cl = 0; cl < cells; cl++) {
          const val = Math.abs(Math.sin(this.time * 0.6 + i * 2 + r * 1.3 + cl * 0.9));
          c.fillStyle = `rgba(255,${Math.round(150 * val)},${Math.round(50 * val)},${val * 0.5})`;
          c.fillRect(miniX + cl * cellSize, miniY + r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }

      c.font = '8px "JetBrains Mono", monospace';
      c.fillStyle = 'rgba(255,255,255,0.4)';
      c.textAlign = 'center';
      c.fillText(`H${i + 1}`, hx + headW / 2, mhaY + mhaH - 4);
    }

    const concatY = mhaY + mhaH + 20;
    const concatH = 28;
    c.fillStyle = 'rgba(168,230,207,0.08)';
    c.strokeStyle = 'rgba(168,230,207,0.25)';
    c.lineWidth = 1;
    this.roundRect(c, startX, concatY, totalW, concatH, 4);
    c.fill();
    c.stroke();
    c.font = '11px "Inter", sans-serif';
    c.fillStyle = 'rgba(168,230,207,0.6)';
    c.textAlign = 'center';
    c.fillText('Concat + Linear Projection', cx, concatY + concatH / 2 + 4);

    for (let i = 0; i < this.headCount; i++) {
      const hx = startX + i * (headW + 4) + headW / 2;
      c.strokeStyle = 'rgba(255,255,255,0.08)';
      c.lineWidth = 0.5;
      c.beginPath();
      c.moveTo(hx, mhaY + mhaH);
      c.lineTo(hx, concatY);
      c.stroke();
    }

    const ffnY = concatY + concatH + 20;
    const ffnH = totalH * 0.12;
    c.fillStyle = 'rgba(78,205,196,0.06)';
    c.strokeStyle = 'rgba(78,205,196,0.25)';
    c.lineWidth = 1;
    this.roundRect(c, startX, ffnY, totalW, ffnH, 6);
    c.fill();
    c.stroke();
    c.font = '12px "Inter", sans-serif';
    c.fillStyle = 'rgba(78,205,196,0.6)';
    c.textAlign = 'center';
    c.fillText('Feed-Forward Network (2 layers, 4× expansion)', cx, ffnY + ffnH / 2 + 4);

    c.strokeStyle = 'rgba(255,255,255,0.08)';
    c.lineWidth = 0.5;
    c.beginPath();
    c.moveTo(cx, concatY + concatH);
    c.lineTo(cx, ffnY);
    c.stroke();

    const normY = ffnY + ffnH + 15;
    c.fillStyle = 'rgba(244,197,66,0.06)';
    c.strokeStyle = 'rgba(244,197,66,0.2)';
    this.roundRect(c, cx - totalW * 0.3, normY, totalW * 0.6, 24, 4);
    c.fill();
    c.stroke();
    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(244,197,66,0.5)';
    c.fillText('Layer Norm + Residual', cx, normY + 15);

    const residX = startX - 20;
    c.strokeStyle = 'rgba(244,197,66,0.2)';
    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.beginPath();
    c.moveTo(startX, mhaY);
    c.bezierCurveTo(residX, mhaY, residX, normY + 12, startX, normY + 12);
    c.stroke();
    c.setLineDash([]);

    const pulseT = (this.time * 0.25) % 1;
    const pulseY = startY + pulseT * totalH;
    const pg = c.createRadialGradient(cx, pulseY, 0, cx, pulseY, 20);
    pg.addColorStop(0, 'rgba(244,197,66,0.25)');
    pg.addColorStop(1, 'rgba(244,197,66,0)');
    c.fillStyle = pg;
    c.beginPath();
    c.arc(cx, pulseY, 20, 0, Math.PI * 2);
    c.fill();

    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.35)';
    c.textAlign = 'center';
    c.fillText('Output Representations', cx, startY + totalH + 20);

    c.restore();
  }

  private roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }
}
