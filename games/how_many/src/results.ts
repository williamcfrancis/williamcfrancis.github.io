import { CalculationResult } from './calculator';
import { generateComparisons, generateTooSmallMessage, formatNumber } from './comparisons';
import { OdometerCounter } from './counter';
import { Vis3D } from './vis3d';
import { Vis2D } from './vis2d';
import { VisCounter } from './visCounter';
import { Confetti } from './confetti';
import { sfx } from './sounds';

export interface ResultsCallbacks {
  onBack: () => void;
  onFlip: (small: string, large: string) => void;
}

export class ResultsScreen {
  private container: HTMLElement;
  private el: HTMLElement | null = null;
  private counter: OdometerCounter | null = null;
  private vis3d: Vis3D | null = null;
  private vis2d: Vis2D | null = null;
  private visCounter: VisCounter | null = null;
  private confetti: Confetti | null = null;
  private pendingFrame = 0;
  private celebrationTimer = 0;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  show(result: CalculationResult, callbacks: ResultsCallbacks) {
    this.destroy();

    if (result.tooSmall) {
      this.showTooSmall(result, callbacks);
      return;
    }

    const el = document.createElement('div');
    el.className = 'results screen-enter';
    this.el = el;

    const top = document.createElement('div');
    top.className = 'results-top';

    const counterWrap = document.createElement('div');
    counterWrap.className = 'results-counter-wrap';
    top.appendChild(counterWrap);

    const subtitle = document.createElement('div');
    subtitle.className = 'results-subtitle';
    subtitle.innerHTML = `<em>${result.small.icon} ${result.small.name}s</em> fit in a <em>${result.large.icon} ${result.large.name}</em>`;
    top.appendChild(subtitle);

    el.appendChild(top);

    const vizArea = document.createElement('div');
    vizArea.className = 'results-viz';
    el.appendChild(vizArea);

    const bottom = document.createElement('div');
    bottom.className = 'results-bottom';

    const comparisons = generateComparisons(result);
    if (comparisons.length > 0) {
      const compDiv = document.createElement('div');
      compDiv.className = 'comparisons';
      for (const comp of comparisons) {
        const p = document.createElement('p');
        p.className = 'comparison-text';
        p.textContent = comp;
        compDiv.appendChild(p);
      }
      bottom.appendChild(compDiv);
    }

    const actions = document.createElement('div');
    actions.className = 'results-actions';

    const backBtn = document.createElement('button');
    backBtn.className = 'btn-secondary';
    backBtn.textContent = '\u2190 Try Another';
    backBtn.addEventListener('click', () => {
      sfx.click();
      callbacks.onBack();
    });
    actions.appendChild(backBtn);

    const flipBtn = document.createElement('button');
    flipBtn.className = 'btn-secondary';
    flipBtn.textContent = '\uD83D\uDD04 Flip It!';
    flipBtn.addEventListener('click', () => {
      sfx.click();
      callbacks.onFlip(result.large.id, result.small.id);
    });
    actions.appendChild(flipBtn);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-secondary';
    copyBtn.textContent = '\uD83D\uDD17 Copy Link';
    copyBtn.addEventListener('click', () => {
      sfx.click();
      this.copyLink(result, copyBtn);
    });
    actions.appendChild(copyBtn);

    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn-secondary';
    shareBtn.textContent = '\uD83D\uDCE4 Share';
    shareBtn.addEventListener('click', () => {
      sfx.click();
      this.shareResult(result);
    });
    actions.appendChild(shareBtn);

    bottom.appendChild(actions);
    el.appendChild(bottom);
    this.container.appendChild(el);

    this.counter = new OdometerCounter(counterWrap, 2500);
    this.counter.animateTo(result.count);

    this.pendingFrame = requestAnimationFrame(() => {
      if (result.count <= 5000) {
        this.vis3d = new Vis3D(vizArea);
        this.vis3d.start(result);
      } else if (result.count <= 500000) {
        this.vis2d = new Vis2D(vizArea);
        this.vis2d.start(result);
      } else {
        this.visCounter = new VisCounter(vizArea);
        this.visCounter.start(result);
      }
    });

    this.celebrationTimer = window.setTimeout(() => {
      sfx.celebrate();
      this.confetti = new Confetti(el);
      this.confetti.burst();
    }, 2600);
  }

  private showTooSmall(result: CalculationResult, callbacks: ResultsCallbacks) {
    const el = document.createElement('div');
    el.className = 'too-small screen-enter';
    this.el = el;

    const emoji = document.createElement('div');
    emoji.className = 'too-small-emoji';
    emoji.textContent = '\uD83D\uDE05';
    el.appendChild(emoji);

    const msg = document.createElement('p');
    msg.className = 'too-small-msg';
    msg.textContent = generateTooSmallMessage(result);
    el.appendChild(msg);

    const subtext = document.createElement('p');
    subtext.className = 'too-small-msg';
    subtext.style.fontSize = '1rem';
    subtext.style.opacity = '0.5';
    subtext.textContent = `${result.small.icon} ${result.small.name} \u2192 ${result.large.icon} ${result.large.name}`;
    el.appendChild(subtext);

    const actions = document.createElement('div');
    actions.className = 'results-actions';
    actions.style.marginTop = '1rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'btn-secondary';
    backBtn.textContent = '\u2190 Try Another';
    backBtn.addEventListener('click', () => {
      sfx.click();
      callbacks.onBack();
    });
    actions.appendChild(backBtn);

    const flipBtn = document.createElement('button');
    flipBtn.className = 'btn-secondary';
    flipBtn.textContent = '\uD83D\uDD04 Flip It!';
    flipBtn.addEventListener('click', () => {
      sfx.click();
      callbacks.onFlip(result.large.id, result.small.id);
    });
    actions.appendChild(flipBtn);

    el.appendChild(actions);
    this.container.appendChild(el);
  }

  private async copyLink(result: CalculationResult, btn: HTMLButtonElement) {
    const url = new URL(window.location.href);
    url.searchParams.set('s', result.small.id);
    url.searchParams.set('l', result.large.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      const original = btn.textContent;
      btn.textContent = '\u2713 Copied!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  private async shareResult(result: CalculationResult) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#0b0d17';
    ctx.fillRect(0, 0, 1200, 630);

    const grad = ctx.createRadialGradient(600, 250, 0, 600, 250, 500);
    grad.addColorStop(0, 'rgba(0, 229, 255, 0.06)');
    grad.addColorStop(0.5, 'rgba(124, 77, 255, 0.03)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 1140, 570);

    ctx.font = 'bold 28px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#00e5ff';
    ctx.textAlign = 'center';
    ctx.fillText('How Many?', 600, 80);

    ctx.font = 'bold 90px JetBrains Mono, monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(formatNumber(result.count), 600, 260);

    ctx.font = '32px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(
      `${result.small.icon} ${result.small.name}s  fit in  ${result.large.icon} ${result.large.name}`,
      600,
      340,
    );

    const comps = generateComparisons(result);
    if (comps.length > 0) {
      ctx.font = '20px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText(comps[0], 600, 430);
    }
    if (comps.length > 1) {
      ctx.fillText(comps[1], 600, 465);
    }

    ctx.font = '16px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillText('williamcfrancis.github.io/games/how_many', 600, 590);

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (!blob) return;

      if (navigator.share) {
        const file = new File([blob], 'how-many.png', { type: 'image/png' });
        await navigator.share({
          title: 'How Many?',
          text: `${formatNumber(result.count)} ${result.small.name}s fit in a ${result.large.name}!`,
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'how-many.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      /* user cancelled share */
    }
  }

  destroy() {
    cancelAnimationFrame(this.pendingFrame);
    clearTimeout(this.celebrationTimer);
    this.counter?.destroy();
    this.vis3d?.destroy();
    this.vis2d?.destroy();
    this.visCounter?.destroy();
    this.confetti?.destroy();
    this.counter = null;
    this.vis3d = null;
    this.vis2d = null;
    this.visCounter = null;
    this.confetti = null;
    if (this.el?.parentElement) {
      this.el.parentElement.removeChild(this.el);
    }
    this.el = null;
  }
}
