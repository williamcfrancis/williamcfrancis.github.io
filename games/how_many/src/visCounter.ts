import { CalculationResult } from './calculator';

export class VisCounter {
  private container: HTMLElement;
  private animFrameId = 0;
  private fillEl: HTMLElement | null = null;
  private startTime = 0;
  private duration = 4000;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  start(result: CalculationResult) {
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'vis-counter-wrap';

    const silhouette = document.createElement('div');
    silhouette.className = 'vis-counter-silhouette';

    const icon = document.createElement('div');
    icon.className = 'vis-counter-icon';
    icon.textContent = result.large.icon;
    silhouette.appendChild(icon);

    const fill = document.createElement('div');
    fill.className = 'vis-counter-fill';
    fill.style.backgroundColor = result.small.color;
    fill.style.height = '0%';
    silhouette.appendChild(fill);
    this.fillEl = fill;

    const label = document.createElement('div');
    label.className = 'vis-counter-label';
    label.textContent = result.large.name;
    silhouette.appendChild(label);

    wrapper.appendChild(silhouette);
    this.container.appendChild(wrapper);

    this.startTime = performance.now();
    this.animate();
  }

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    if (this.fillEl) {
      this.fillEl.style.height = `${eased * 100}%`;
    }
  };

  destroy() {
    cancelAnimationFrame(this.animFrameId);
    this.container.innerHTML = '';
  }

  getProgress(): number {
    const elapsed = performance.now() - this.startTime;
    return Math.min(elapsed / this.duration, 1);
  }
}
