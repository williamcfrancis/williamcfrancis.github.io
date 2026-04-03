class SoundManager {
  private ctx: AudioContext | null = null;
  private _muted = true;

  get muted() { return this._muted; }

  set muted(v: boolean) {
    this._muted = v;
    try { localStorage.setItem('hm_sound', v ? '0' : '1'); } catch { /* noop */ }
  }

  constructor() {
    try {
      this._muted = localStorage.getItem('hm_sound') !== '1';
    } catch { /* noop */ }
  }

  private getCtx(): AudioContext | null {
    if (this._muted) return null;
    if (!this.ctx) {
      try { this.ctx = new AudioContext(); }
      catch { return null; }
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  click() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain).connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  whoosh() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const len = 0.25;
    const bufSize = Math.ceil(ctx.sampleRate * len);
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + len);
    filter.Q.value = 1.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + len);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + len);
  }

  celebrate() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    for (let i = 0; i < notes.length; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain).connect(ctx.destination);
      osc.type = 'triangle';
      const t = ctx.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(notes[i], t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    }
  }
}

export const sfx = new SoundManager();
