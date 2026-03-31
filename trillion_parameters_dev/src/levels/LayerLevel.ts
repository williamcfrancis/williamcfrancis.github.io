import type { Level } from './Level';

interface Neuron {
  x: number;
  y: number;
  activation: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export class LayerLevel implements Level {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private layer1: Neuron[] = [];
  private layer2: Neuron[] = [];
  private time = 0;
  private pulses: Pulse[] = [];
  private hoveredNeuron: { layer: number; idx: number } | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private neuronCount = 16;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  private layoutNeurons() {
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    const spacing = Math.min(h * 0.038, 24);
    const startY = h / 2 - ((this.neuronCount - 1) * spacing) / 2;
    const x1 = w * 0.32;
    const x2 = w * 0.68;

    this.layer1 = [];
    this.layer2 = [];

    for (let i = 0; i < this.neuronCount; i++) {
      this.layer1.push({ x: x1, y: startY + i * spacing, activation: 0 });
      this.layer2.push({ x: x2, y: startY + i * spacing, activation: 0 });
    }
  }

  update(dt: number, _localZoom: number, _opacity: number) {
    this.time += dt;
    this.layoutNeurons();

    for (let i = 0; i < this.neuronCount; i++) {
      this.layer1[i].activation = 0.3 + 0.7 * Math.abs(Math.sin(this.time * 1.5 + i * 0.5));
      this.layer2[i].activation = 0.3 + 0.7 * Math.abs(Math.sin(this.time * 1.2 + i * 0.7 + 1));
    }

    if (Math.random() < dt * 8) {
      this.pulses.push({
        fromIdx: Math.floor(Math.random() * this.neuronCount),
        toIdx: Math.floor(Math.random() * this.neuronCount),
        progress: 0,
        speed: 0.6 + Math.random() * 0.6,
      });
    }

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i].progress += this.pulses[i].speed * dt;
      if (this.pulses[i].progress > 1) {
        this.pulses.splice(i, 1);
      }
    }

    this.hoveredNeuron = null;
    const check = (neurons: Neuron[], layer: number) => {
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const dx = this.mouseX - n.x;
        const dy = this.mouseY - n.y;
        if (dx * dx + dy * dy < 250) {
          this.hoveredNeuron = { layer, idx: i };
          return;
        }
      }
    };
    check(this.layer1, 0);
    if (!this.hoveredNeuron) check(this.layer2, 1);
  }

  render(opacity: number) {
    const c = this.ctx;
    c.save();
    c.globalAlpha = opacity;

    const hov = this.hoveredNeuron;

    for (let i = 0; i < this.neuronCount; i++) {
      const n1 = this.layer1[i];
      for (let j = 0; j < this.neuronCount; j++) {
        const n2 = this.layer2[j];
        const connected = hov && (
          (hov.layer === 0 && hov.idx === i) ||
          (hov.layer === 1 && hov.idx === j)
        );
        const alpha = hov ? (connected ? 0.2 : 0.01) : 0.04;
        c.strokeStyle = connected
          ? `rgba(78,205,196,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        c.lineWidth = connected ? 1.2 : 0.3;
        c.beginPath();
        c.moveTo(n1.x, n1.y);
        c.lineTo(n2.x, n2.y);
        c.stroke();
      }
    }

    for (const pulse of this.pulses) {
      if (this.layer1[pulse.fromIdx] && this.layer2[pulse.toIdx]) {
        const n1 = this.layer1[pulse.fromIdx];
        const n2 = this.layer2[pulse.toIdx];
        const t = pulse.progress;
        const px = n1.x + (n2.x - n1.x) * t;
        const py = n1.y + (n2.y - n1.y) * t;
        const a = t < 0.5 ? t * 2 : (1 - t) * 2;
        const grad = c.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, `rgba(244,197,66,${a * 0.8})`);
        grad.addColorStop(1, 'rgba(244,197,66,0)');
        c.fillStyle = grad;
        c.beginPath();
        c.arc(px, py, 6, 0, Math.PI * 2);
        c.fill();
      }
    }

    const drawNeuron = (n: Neuron, isHighlighted: boolean) => {
      const r = 5;
      const act = n.activation;
      const glowR = r * (isHighlighted ? 4 : 3);
      const glow = c.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      const glowAlpha = isHighlighted ? act * 0.5 : act * 0.2;
      glow.addColorStop(0, `rgba(78,205,196,${glowAlpha})`);
      glow.addColorStop(1, 'rgba(78,205,196,0)');
      c.fillStyle = glow;
      c.beginPath();
      c.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = `rgba(78,205,196,${0.3 + act * 0.7})`;
      c.beginPath();
      c.arc(n.x, n.y, r, 0, Math.PI * 2);
      c.fill();

      if (isHighlighted) {
        c.strokeStyle = 'rgba(78,205,196,0.8)';
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(n.x, n.y, r + 2, 0, Math.PI * 2);
        c.stroke();
      }
    };

    for (let i = 0; i < this.neuronCount; i++) {
      drawNeuron(this.layer1[i], hov?.layer === 0 && hov.idx === i);
      drawNeuron(this.layer2[i], hov?.layer === 1 && hov.idx === i);
    }

    c.restore();
  }
}
