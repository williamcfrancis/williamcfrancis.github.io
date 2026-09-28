type Listener = (tier: number, ratio: number) => void;

export class PerfMonitor {
  private samples: number[] = [];
  private maxSamples = 60;
  private downshiftCooldown = 0;
  private upshiftCooldown = 0;
  private downAccum = 0;
  private upAccum = 0;
  private currentRatioCap: number;
  private maxRatio: number;
  private minRatio = 1.0;
  private steps = [1.0, 1.25, 1.5, 1.75, 2.0];
  private downshiftListeners: Listener[] = [];
  private upshiftListeners: Listener[] = [];
  tier = 0; // 0 = high, 1 = medium, 2 = low

  constructor(initialRatio: number) {
    this.maxRatio = initialRatio;
    this.currentRatioCap = initialRatio;
    if (!this.steps.includes(initialRatio)) {
      this.steps.push(initialRatio);
      this.steps.sort((a, b) => a - b);
    }
  }

  tick(dt: number) {
    if (dt <= 0) return;
    const fps = 1 / dt;
    this.samples.push(fps);
    if (this.samples.length > this.maxSamples) this.samples.shift();

    if (this.samples.length < 30) return;

    const avg = this.getAvgFps();
    this.downshiftCooldown = Math.max(0, this.downshiftCooldown - dt);
    this.upshiftCooldown = Math.max(0, this.upshiftCooldown - dt);

    if (avg < 50) {
      this.downAccum += dt;
      this.upAccum = 0;
    } else if (avg > 58) {
      this.upAccum += dt;
      this.downAccum = 0;
    } else {
      this.downAccum *= 0.5;
      this.upAccum *= 0.5;
    }

    if (this.downAccum > 1.5 && this.downshiftCooldown <= 0) {
      this.downshift();
      this.downAccum = 0;
      this.downshiftCooldown = 3;
    } else if (this.upAccum > 5 && this.upshiftCooldown <= 0) {
      this.upshift();
      this.upAccum = 0;
      this.upshiftCooldown = 5;
    }
  }

  private downshift() {
    const idx = this.steps.indexOf(this.currentRatioCap);
    if (idx > 0) {
      this.currentRatioCap = this.steps[idx - 1];
      this.recomputeTier();
      this.downshiftListeners.forEach(fn => fn(this.tier, this.currentRatioCap));
    }
  }

  private upshift() {
    const idx = this.steps.indexOf(this.currentRatioCap);
    if (idx < this.steps.length - 1 && this.steps[idx + 1] <= this.maxRatio) {
      this.currentRatioCap = this.steps[idx + 1];
      this.recomputeTier();
      this.upshiftListeners.forEach(fn => fn(this.tier, this.currentRatioCap));
    }
  }

  private recomputeTier() {
    if (this.currentRatioCap >= this.maxRatio - 0.01) this.tier = 0;
    else if (this.currentRatioCap >= 1.4) this.tier = 1;
    else this.tier = 2;
  }

  getAvgFps(): number {
    if (this.samples.length === 0) return 60;
    return this.samples.reduce((a, b) => a + b, 0) / this.samples.length;
  }

  getRatioCap(): number {
    return this.currentRatioCap;
  }

  isReduced(): boolean {
    return this.currentRatioCap < this.maxRatio - 0.01;
  }

  onDownshift(fn: Listener) { this.downshiftListeners.push(fn); }
  onUpshift(fn: Listener) { this.upshiftListeners.push(fn); }
}
