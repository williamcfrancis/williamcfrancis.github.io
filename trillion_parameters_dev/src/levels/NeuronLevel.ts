import type { Level } from './Level';

interface InputLine {
  weight: number;
  x: number;
  pulsePos: number;
  pulseSpeed: number;
  y: number;
}

type ActivationFn = 'relu' | 'sigmoid' | 'tanh';

function relu(x: number) { return Math.max(0, x); }
function sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }
function tanhFn(x: number) { return Math.tanh(x); }

const activationFns: Record<ActivationFn, (x: number) => number> = { relu, sigmoid, tanh: tanhFn };

export class NeuronLevel implements Level {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private inputs: InputLine[] = [];
  private bias = 0.5;
  private activationFn: ActivationFn = 'relu';
  private time = 0;
  private outputPulsePos = 0;
  private outputValue = 0;
  private draggingWeight = -1;
  private mouseX = 0;
  private mouseY = 0;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  init() {
    const weights = [1.2, 0.8, -0.5, 1.5];
    for (let i = 0; i < weights.length; i++) {
      this.inputs.push({
        weight: weights[i],
        x: 1.0,
        pulsePos: i * 0.25,
        pulseSpeed: 0.3 + Math.random() * 0.2,
        y: 0,
      });
    }

    document.querySelectorAll('#activation-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#activation-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activationFn = (btn as HTMLElement).dataset.fn as ActivationFn;
      });
    });

    window.addEventListener('mousedown', (e) => {
      for (let i = 0; i < this.inputs.length; i++) {
        const inp = this.inputs[i];
        const w = this.canvas.width / window.devicePixelRatio;
        const h = this.canvas.height / window.devicePixelRatio;
        const cx = w / 2;
        const cy = h / 2;
        const neuronR = Math.min(w, h) * 0.09;
        const inputSpacing = Math.min(h * 0.12, 80);
        const inputStartY = cy - ((this.inputs.length - 1) * inputSpacing) / 2;
        const inputX = cx - w * 0.28;
        const iy = inputStartY + i * inputSpacing;
        const labelX = inputX + (cx - neuronR - inputX) * 0.35;
        const labelY = iy + (cy - iy) * 0.35 - 10;
        const dx = e.clientX - labelX;
        const dy = e.clientY - labelY;
        if (dx * dx + dy * dy < 900) {
          this.draggingWeight = i;
          break;
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (this.draggingWeight >= 0) {
        const w = this.canvas.width / window.devicePixelRatio;
        const normX = (e.clientX / w - 0.5) * 6;
        this.inputs[this.draggingWeight].weight = Math.round(normX * 20) / 20;
        this.inputs[this.draggingWeight].weight = Math.max(-3, Math.min(3, this.inputs[this.draggingWeight].weight));
      }
    });

    window.addEventListener('mouseup', () => { this.draggingWeight = -1; });
  }

  update(dt: number, _localZoom: number, _opacity: number) {
    this.time += dt;

    for (const input of this.inputs) {
      input.pulsePos += input.pulseSpeed * dt;
      if (input.pulsePos > 1) input.pulsePos -= 1;
    }

    let weightedSum = this.bias;
    for (const input of this.inputs) {
      weightedSum += input.weight * input.x;
    }

    const fn = activationFns[this.activationFn];
    this.outputValue = fn(weightedSum);
    this.outputPulsePos = (this.outputPulsePos + dt * 0.4) % 1;

    this.updateEquation(weightedSum);
  }

  private updateEquation(_ws: number) {
    const eq = document.getElementById('equation-display')!;
    const fnSymbol = this.activationFn === 'relu' ? 'ReLU' :
                     this.activationFn === 'sigmoid' ? 'σ' : 'tanh';
    const terms = this.inputs.map((inp, i) =>
      `${inp.weight.toFixed(1)}·x${i + 1}`
    ).join(' + ');
    eq.textContent = `y = ${fnSymbol}(${terms} + ${this.bias.toFixed(1)}) = ${this.outputValue.toFixed(3)}`;
  }

  render(opacity: number) {
    const c = this.ctx;
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;
    const neuronR = Math.min(w, h) * 0.09;

    c.save();
    c.globalAlpha = opacity;

    const inputCount = this.inputs.length;
    const inputSpacing = Math.min(h * 0.12, 80);
    const inputStartY = cy - ((inputCount - 1) * inputSpacing) / 2;
    const inputX = cx - w * 0.28;
    const outputX = cx + w * 0.28;

    for (let i = 0; i < inputCount; i++) {
      const inp = this.inputs[i];
      const iy = inputStartY + i * inputSpacing;
      inp.y = iy;

      const absW = Math.abs(inp.weight);
      const lineWidth = 0.5 + absW * 2;
      const isNeg = inp.weight < 0;
      c.strokeStyle = isNeg
        ? `rgba(255,120,120,${0.1 + absW * 0.12})`
        : `rgba(255,255,255,${0.1 + absW * 0.12})`;
      c.lineWidth = lineWidth;
      c.beginPath();
      c.moveTo(inputX, iy);
      c.lineTo(cx - neuronR, cy);
      c.stroke();

      const px = inputX + (cx - neuronR - inputX) * inp.pulsePos;
      const py = iy + (cy - iy) * inp.pulsePos;
      const pulseR = 3 + absW * 3;
      const grad = c.createRadialGradient(px, py, 0, px, py, pulseR * 2.5);
      grad.addColorStop(0, `rgba(244,197,66,0.85)`);
      grad.addColorStop(1, 'rgba(244,197,66,0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(px, py, pulseR * 2.5, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#f4c542';
      c.beginPath();
      c.arc(px, py, pulseR * 0.4, 0, Math.PI * 2);
      c.fill();

      c.font = '600 12px "JetBrains Mono", monospace';
      c.fillStyle = this.draggingWeight === i ? 'rgba(78,205,196,0.9)' : 'rgba(255,255,255,0.55)';
      c.textAlign = 'center';
      const labelX = inputX + (cx - neuronR - inputX) * 0.3;
      const labelY = iy + (cy - iy) * 0.3 - 12;
      c.fillText(`w${i + 1}=${inp.weight.toFixed(1)}`, labelX, labelY);

      c.font = '11px "JetBrains Mono", monospace';
      c.fillStyle = 'rgba(78,205,196,0.4)';
      c.textAlign = 'right';
      c.fillText(`x${i + 1}`, inputX - 12, iy + 4);

      c.fillStyle = 'rgba(78,205,196,0.25)';
      c.beginPath();
      c.arc(inputX, iy, 4, 0, Math.PI * 2);
      c.fill();
    }

    const neuronGlow = c.createRadialGradient(cx, cy, neuronR * 0.2, cx, cy, neuronR * 2.5);
    neuronGlow.addColorStop(0, 'rgba(78,205,196,0.25)');
    neuronGlow.addColorStop(0.4, 'rgba(78,205,196,0.06)');
    neuronGlow.addColorStop(1, 'rgba(78,205,196,0)');
    c.fillStyle = neuronGlow;
    c.beginPath();
    c.arc(cx, cy, neuronR * 2.5, 0, Math.PI * 2);
    c.fill();

    c.strokeStyle = 'rgba(78,205,196,0.5)';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(cx, cy, neuronR, 0, Math.PI * 2);
    c.stroke();

    const innerGrad = c.createRadialGradient(cx, cy, 0, cx, cy, neuronR);
    innerGrad.addColorStop(0, 'rgba(78,205,196,0.12)');
    innerGrad.addColorStop(1, 'rgba(78,205,196,0.02)');
    c.fillStyle = innerGrad;
    c.beginPath();
    c.arc(cx, cy, neuronR, 0, Math.PI * 2);
    c.fill();

    this.drawActivationGraph(c, cx, cy, neuronR);

    c.strokeStyle = `rgba(255,255,255,${0.12 + Math.min(1, this.outputValue) * 0.2})`;
    c.lineWidth = 1.5 + Math.min(1, this.outputValue) * 2;
    c.beginPath();
    c.moveTo(cx + neuronR, cy);
    c.lineTo(outputX, cy);
    c.stroke();

    const opx = (cx + neuronR) + (outputX - cx - neuronR) * this.outputPulsePos;
    const outBright = Math.min(1, Math.max(0, this.outputValue));
    const outR = 4 + outBright * 5;
    const outGrad = c.createRadialGradient(opx, cy, 0, opx, cy, outR * 2.5);
    outGrad.addColorStop(0, `rgba(78,205,196,${0.3 + outBright * 0.6})`);
    outGrad.addColorStop(1, 'rgba(78,205,196,0)');
    c.fillStyle = outGrad;
    c.beginPath();
    c.arc(opx, cy, outR * 2.5, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = `rgba(78,205,196,${0.5 + outBright * 0.5})`;
    c.beginPath();
    c.arc(opx, cy, outR * 0.4, 0, Math.PI * 2);
    c.fill();

    c.font = '11px "JetBrains Mono", monospace';
    c.fillStyle = 'rgba(255,255,255,0.4)';
    c.textAlign = 'left';
    c.fillText(`y = ${this.outputValue.toFixed(3)}`, outputX + 10, cy + 4);

    c.fillStyle = 'rgba(78,205,196,0.25)';
    c.beginPath();
    c.arc(outputX, cy, 4, 0, Math.PI * 2);
    c.fill();

    c.font = '10px "Inter", sans-serif';
    c.fillStyle = 'rgba(255,255,255,0.2)';
    c.textAlign = 'center';
    c.fillText('(click & drag weight labels to adjust)', cx, cy + neuronR * 2.5 + 15);

    c.restore();
  }

  private drawActivationGraph(c: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
    const graphW = r * 1.3;
    const graphH = r * 0.9;
    const gx = cx - graphW / 2;
    const gy = cy - graphH / 2;

    c.strokeStyle = 'rgba(255,255,255,0.07)';
    c.lineWidth = 0.5;
    c.beginPath();
    c.moveTo(gx, cy);
    c.lineTo(gx + graphW, cy);
    c.stroke();
    c.beginPath();
    c.moveTo(cx, gy);
    c.lineTo(cx, gy + graphH);
    c.stroke();

    const fn = activationFns[this.activationFn];
    c.strokeStyle = 'rgba(78,205,196,0.6)';
    c.lineWidth = 1.5;
    c.beginPath();
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const inputVal = (t - 0.5) * 8;
      let outVal = fn(inputVal);
      outVal = Math.max(-1.2, Math.min(2, outVal));
      const px = gx + t * graphW;
      const py = cy - outVal * (graphH * 0.35);
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.stroke();

    let weightedSum = this.bias;
    for (const inp of this.inputs) {
      weightedSum += inp.weight * inp.x;
    }
    const normX = (weightedSum / 8 + 0.5);
    const dotX = gx + Math.max(0, Math.min(1, normX)) * graphW;
    const dotY = cy - fn(weightedSum) * (graphH * 0.35);

    const dotGrad = c.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
    dotGrad.addColorStop(0, 'rgba(244,197,66,0.8)');
    dotGrad.addColorStop(1, 'rgba(244,197,66,0)');
    c.fillStyle = dotGrad;
    c.beginPath();
    c.arc(dotX, dotY, 8, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#f4c542';
    c.beginPath();
    c.arc(dotX, dotY, 3, 0, Math.PI * 2);
    c.fill();
  }
}
