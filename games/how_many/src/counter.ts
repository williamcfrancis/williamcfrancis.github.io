export class OdometerCounter {
  private container: HTMLElement;
  private digitEls: HTMLElement[] = [];
  private targetValue = 0;
  private animFrameId = 0;
  private startTime = 0;
  private duration: number;
  private isLargeNumber = false;

  constructor(container: HTMLElement, duration = 2500) {
    this.container = container;
    this.duration = duration;
    this.container.classList.add('odometer');
  }

  private buildDigits(numStr: string) {
    this.container.innerHTML = '';
    this.digitEls = [];

    for (const ch of numStr) {
      if (ch >= '0' && ch <= '9') {
        const wrapper = document.createElement('span');
        wrapper.className = 'odometer-digit';

        const column = document.createElement('span');
        column.className = 'odometer-column';

        for (let d = 0; d <= 9; d++) {
          const cell = document.createElement('span');
          cell.className = 'odometer-cell';
          cell.textContent = String(d);
          column.appendChild(cell);
        }

        wrapper.appendChild(column);
        this.container.appendChild(wrapper);
        this.digitEls.push(column);
      } else {
        const sep = document.createElement('span');
        sep.className = 'odometer-sep';
        sep.textContent = ch;
        this.container.appendChild(sep);
      }
    }
  }

  private formatDisplay(n: number): string {
    if (n >= 1e15) return n.toExponential(2);
    return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  private setDigitsByValue(value: number) {
    const numDigits = this.digitEls.length;
    const valueStr = Math.round(value).toString().padStart(numDigits, '0');
    for (let i = 0; i < numDigits; i++) {
      const d = parseInt(valueStr[i], 10) || 0;
      this.digitEls[i].style.transform = `translateY(-${d * 10}%)`;
    }
  }

  private tick = () => {
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const eased = this.easeOutExpo(progress);

    this.setDigitsByValue(eased * this.targetValue);

    if (progress < 1) {
      this.animFrameId = requestAnimationFrame(this.tick);
    }
  };

  animateTo(target: number) {
    cancelAnimationFrame(this.animFrameId);
    this.targetValue = target;
    this.isLargeNumber = target >= 1e15;

    const targetStr = this.formatDisplay(target);
    this.buildDigits(targetStr);

    if (this.isLargeNumber) {
      const digitValues: number[] = [];
      for (const ch of targetStr) {
        if (ch >= '0' && ch <= '9') digitValues.push(parseInt(ch, 10));
      }

      for (const el of this.digitEls) {
        el.style.transition = 'none';
        el.style.transform = 'translateY(0%)';
      }
      // Force reflow
      void this.container.offsetHeight;

      const stagger = Math.min(80, this.duration / (this.digitEls.length + 1));
      for (let i = 0; i < this.digitEls.length; i++) {
        const d = digitValues[i] ?? 0;
        this.digitEls[i].style.transition =
          `transform ${this.duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${i * stagger}ms`;
        this.digitEls[i].style.transform = `translateY(-${d * 10}%)`;
      }
    } else {
      for (const el of this.digitEls) {
        el.style.transition = 'none';
      }
      this.setDigitsByValue(0);
      this.startTime = Date.now();
      this.animFrameId = requestAnimationFrame(this.tick);
    }
  }

  setImmediate(value: number) {
    cancelAnimationFrame(this.animFrameId);
    this.targetValue = value;
    const targetStr = this.formatDisplay(value);
    this.buildDigits(targetStr);

    const digitValues: number[] = [];
    for (const ch of targetStr) {
      if (ch >= '0' && ch <= '9') digitValues.push(parseInt(ch, 10));
    }
    for (let i = 0; i < this.digitEls.length; i++) {
      const d = digitValues[i] ?? 0;
      this.digitEls[i].style.transition = 'none';
      this.digitEls[i].style.transform = `translateY(-${d * 10}%)`;
    }
  }

  destroy() {
    cancelAnimationFrame(this.animFrameId);
    this.container.innerHTML = '';
  }
}
