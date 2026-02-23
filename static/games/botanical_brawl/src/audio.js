let ctx;

export function initAudio() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
}

function envelope(gain, attack, decay, sustain, release) {
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.linearRampToValueAtTime(sustain, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, t + attack + decay + release);
}

export function shootSound(freq = 440, type = 'sine') {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.04);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.14);
  envelope(gain, 0.005, 0.04, 0.12, 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

export function hitSound() {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.1);
  envelope(gain, 0.003, 0.03, 0.15, 0.07);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

export function deathSound() {
  if (!ctx) return;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = 'sine';
  osc2.type = 'triangle';
  osc1.frequency.setValueAtTime(700, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.06);
  osc1.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.22);
  osc2.frequency.setValueAtTime(350, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.06);
  envelope(gain, 0.004, 0.06, 0.18, 0.12);
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.start();
  osc2.start();
  osc1.stop(ctx.currentTime + 0.25);
  osc2.stop(ctx.currentTime + 0.25);
}

export function forgeCompleteSound() {
  if (!ctx) return;
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.28);
  });
}

export function playerHitSound() {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
  envelope(gain, 0.003, 0.04, 0.18, 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}
