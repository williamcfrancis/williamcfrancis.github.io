type EventName = 'levelChangeStart' | 'levelChangeMid' | 'levelChangeEnd';

export class TransitionManager {
  private prevLevel = -1;
  private timers: { until: number; event: EventName; from: number; to: number }[] = [];
  private listeners: Record<EventName, ((from: number, to: number) => void)[]> = {
    levelChangeStart: [],
    levelChangeMid: [],
    levelChangeEnd: [],
  };
  private elapsed = 0;

  on(event: EventName, fn: (from: number, to: number) => void) {
    this.listeners[event].push(fn);
  }

  tick(dt: number, activeLevel: number) {
    this.elapsed += dt;

    if (this.prevLevel !== -1 && activeLevel !== this.prevLevel) {
      const from = this.prevLevel;
      const to = activeLevel;
      this.fire('levelChangeStart', from, to);
      this.timers.push({ until: this.elapsed + 0.2, event: 'levelChangeMid', from, to });
      this.timers.push({ until: this.elapsed + 0.4, event: 'levelChangeEnd', from, to });
    }
    this.prevLevel = activeLevel;

    for (let i = this.timers.length - 1; i >= 0; i--) {
      if (this.elapsed >= this.timers[i].until) {
        const t = this.timers[i];
        this.fire(t.event, t.from, t.to);
        this.timers.splice(i, 1);
      }
    }
  }

  private fire(event: EventName, from: number, to: number) {
    for (const fn of this.listeners[event]) fn(from, to);
  }
}
