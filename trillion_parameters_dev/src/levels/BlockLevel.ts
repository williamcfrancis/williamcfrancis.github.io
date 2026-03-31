import type { Level } from './Level';

export class BlockLevel implements Level {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private time = 0;
  private attentionWeights: number[][] = [];
  private seqLen = 8;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  init() {
    for (let i = 0; i < this.seqLen; i++) {
      this.attentionWeights[i] = [];
      for (let j = 0; j < this.seqLen; j++) {
        this.attentionWeights[i][j] = Math.random();
      }
    }
  }

  update(dt: number, _localZoom: number, _opacity: number) {
    this.time += dt;
    for (let i = 0; i < this.seqLen; i++) {
      for (let j = 0; j < this.seqLen; j++) {
        this.attentionWeights[i][j] += (Math.sin(this.time * 0.8 + i * 1.3 + j * 0.7) * 0.5 + 0.5 - this.attentionWeights[i][j]) * dt * 2;
        this.attentionWeights[i][j] = Math.max(0, Math.min(1, this.attentionWeights[i][j]));
      }
    }
  }

  render(opacity: number) {
    const c = this.ctx;
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;

    c.save();
    c.globalAlpha = opacity;

    const blockW = Math.min(w * 0.55, 450);
    const blockH = Math.min(h * 0.6, 400);
    const bx = cx - blockW / 2;
    const by = cy - blockH / 2;

    c.strokeStyle = 'rgba(78,205,196,0.15)';
    c.lineWidth = 1;
    c.setLineDash([4, 4]);
    c.strokeRect(bx, by, blockW, blockH);
    c.setLineDash([]);

    const projW = blockW * 0.2;
    const projH = blockH * 0.15;
    const projY = by + blockH * 0.08;
    const projGap = blockW * 0.05;
    const projStartX = cx - (projW * 3 + projGap * 2) / 2;

    const projLabels = ['Q', 'K', 'V'];
    const projColors = ['rgba(78,205,196,', 'rgba(168,230,207,', 'rgba(244,197,66,'];

    for (let p = 0; p < 3; p++) {
      const px = projStartX + p * (projW + projGap);
      this.drawMatrix(c, px, projY, projW, projH, projColors[p], projLabels[p]);
    }

    const attnSize = Math.min(blockW * 0.35, blockH * 0.3);
    const attnX = cx - attnSize / 2;
    const attnY = projY + projH + blockH * 0.08;
    this.drawAttentionHeatmap(c, attnX, attnY, attnSize);

    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.5)';
    c.textAlign = 'center';
    c.fillText('Attention Matrix', cx, attnY + attnSize + 14);

    const ffnY = attnY + attnSize + 30;
    const ffnH = blockH * 0.1;
    const ffnW = blockW * 0.6;
    const ffnX = cx - ffnW / 2;

    c.fillStyle = 'rgba(78,205,196,0.08)';
    c.strokeStyle = 'rgba(78,205,196,0.3)';
    c.lineWidth = 1;
    this.roundRect(c, ffnX, ffnY, ffnW, ffnH, 6);
    c.fill();
    c.stroke();

    c.font = '11px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.6)';
    c.textAlign = 'center';
    c.fillText('Feed-Forward Network', cx, ffnY + ffnH / 2 + 4);

    const normY = ffnY + ffnH + 15;
    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.4)';
    c.fillText('Add & LayerNorm', cx, normY + 4);

    const arrowStartY = by + 10;
    const arrowEndY = normY + 10;
    const arrowX = bx + blockW + 15;
    c.strokeStyle = 'rgba(168,230,207,0.3)';
    c.lineWidth = 1.5;
    c.setLineDash([3, 3]);
    c.beginPath();
    c.moveTo(cx + blockW * 0.35, arrowStartY);
    c.bezierCurveTo(arrowX, arrowStartY, arrowX, arrowEndY, cx + blockW * 0.35, arrowEndY);
    c.stroke();
    c.setLineDash([]);

    c.fillStyle = 'rgba(168,230,207,0.5)';
    c.font = '9px "Inter", sans-serif';
    c.textAlign = 'left';
    c.fillText('Residual', arrowX - 25, (arrowStartY + arrowEndY) / 2);

    const pulseT = (this.time * 0.3) % 1;
    const pulseY = by + pulseT * blockH;
    const pulseGrad = c.createRadialGradient(cx, pulseY, 0, cx, pulseY, 15);
    pulseGrad.addColorStop(0, 'rgba(244,197,66,0.4)');
    pulseGrad.addColorStop(1, 'rgba(244,197,66,0)');
    c.fillStyle = pulseGrad;
    c.beginPath();
    c.arc(cx, pulseY, 15, 0, Math.PI * 2);
    c.fill();

    c.restore();
  }

  private drawMatrix(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colorBase: string, label: string) {
    const rows = 4;
    const cols = 4;
    const cellW = w / cols;
    const cellH = h / rows;

    for (let r = 0; r < rows; r++) {
      for (let cl = 0; cl < cols; cl++) {
        const val = Math.abs(Math.sin(this.time * 0.5 + r * 2.3 + cl * 1.7));
        c.fillStyle = `${colorBase}${(val * 0.4).toFixed(2)})`;
        c.fillRect(x + cl * cellW, y + r * cellH, cellW - 1, cellH - 1);
      }
    }

    c.strokeStyle = `${colorBase}0.3)`;
    c.lineWidth = 1;
    c.strokeRect(x, y, w, h);

    c.font = 'bold 13px "JetBrains Mono", monospace';
    c.fillStyle = `${colorBase}0.8)`;
    c.textAlign = 'center';
    c.fillText(label, x + w / 2, y - 6);
  }

  private drawAttentionHeatmap(c: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const cellSize = size / this.seqLen;

    for (let i = 0; i < this.seqLen; i++) {
      for (let j = 0; j < this.seqLen; j++) {
        const val = this.attentionWeights[i][j];
        const r = Math.round(val * 255);
        const g = Math.round(val * val * 200);
        const b = Math.round(val * val * val * 80);
        c.fillStyle = `rgba(${r},${g},${b},${0.3 + val * 0.7})`;
        c.fillRect(x + j * cellSize, y + i * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
    }

    c.strokeStyle = 'rgba(255,255,255,0.1)';
    c.lineWidth = 0.5;
    c.strokeRect(x, y, size, size);
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
