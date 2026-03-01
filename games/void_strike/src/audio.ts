let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function ensureCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function dest(): AudioNode {
  ensureCtx();
  return masterGain!;
}

export function setVolume(v: number) {
  ensureCtx();
  masterGain!.gain.value = Math.max(0, Math.min(1, v));
}

function playTone(freq: number, type: OscillatorType, duration: number, volume: number, detune = 0) {
  const ac = ensureCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(volume, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  osc.connect(gain);
  gain.connect(dest());
  osc.start();
  osc.stop(ac.currentTime + duration + 0.05);
}

function playNoise(duration: number, volume: number, bandpass = 0) {
  const ac = ensureCtx();
  const size = Math.ceil(ac.sampleRate * duration);
  const buf = ac.createBuffer(1, size, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(volume, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  if (bandpass > 0) {
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = bandpass;
    bp.Q.value = 1;
    src.connect(bp);
    bp.connect(gain);
  } else {
    src.connect(gain);
  }
  gain.connect(dest());
  src.start();
  src.stop(ac.currentTime + duration + 0.05);
}

export function playGunshot(weaponSlot: number) {
  switch (weaponSlot) {
    case 0: // Pulse Rifle
      playNoise(0.08, 0.35, 2000);
      playTone(180, 'sawtooth', 0.06, 0.2);
      playTone(90, 'square', 0.04, 0.15);
      break;
    case 1: // Plasma Shotgun
      playNoise(0.15, 0.5, 800);
      playTone(120, 'sawtooth', 0.1, 0.3);
      playNoise(0.08, 0.3, 3000);
      break;
    case 2: // Rail Sniper
      playTone(2200, 'sine', 0.3, 0.15);
      playTone(1100, 'sine', 0.2, 0.1);
      playNoise(0.05, 0.4, 4000);
      playTone(80, 'sawtooth', 0.15, 0.25);
      break;
    case 3: // Rocket Launcher
      playNoise(0.25, 0.45, 400);
      playTone(60, 'sawtooth', 0.3, 0.3);
      playTone(40, 'square', 0.2, 0.2);
      break;
  }
}

export function playReload() {
  setTimeout(() => playTone(800, 'square', 0.05, 0.15), 0);
  setTimeout(() => playTone(600, 'square', 0.05, 0.12), 200);
  setTimeout(() => playTone(1000, 'square', 0.08, 0.18), 500);
}

export function playHit() {
  playTone(1800, 'sine', 0.05, 0.15);
  playTone(2400, 'sine', 0.03, 0.1);
}

export function playHeadshot() {
  playTone(2400, 'sine', 0.08, 0.2);
  playTone(3200, 'sine', 0.06, 0.15);
  playNoise(0.04, 0.1, 5000);
}

export function playKill() {
  playTone(880, 'sine', 0.1, 0.12);
  setTimeout(() => playTone(1100, 'sine', 0.1, 0.12), 80);
  setTimeout(() => playTone(1320, 'sine', 0.15, 0.15), 160);
}

export function playDamage() {
  playNoise(0.08, 0.2, 1500);
  playTone(200, 'sawtooth', 0.1, 0.15);
}

export function playExplosion() {
  playNoise(0.4, 0.5, 200);
  playTone(40, 'sawtooth', 0.5, 0.35);
  playTone(30, 'square', 0.3, 0.2);
  playNoise(0.2, 0.3, 600);
}

export function playPickup() {
  playTone(660, 'sine', 0.08, 0.12);
  setTimeout(() => playTone(880, 'sine', 0.08, 0.12), 60);
  setTimeout(() => playTone(1100, 'sine', 0.12, 0.15), 120);
}

export function playJump() {
  playTone(300, 'sine', 0.08, 0.08);
  playTone(400, 'sine', 0.06, 0.06);
}

export function playLand() {
  playNoise(0.06, 0.1, 500);
}

export function playWaveStart() {
  playTone(440, 'sine', 0.2, 0.15);
  setTimeout(() => playTone(550, 'sine', 0.2, 0.15), 150);
  setTimeout(() => playTone(660, 'sine', 0.2, 0.15), 300);
  setTimeout(() => playTone(880, 'sine', 0.4, 0.2), 450);
}

export function playDeath() {
  playTone(400, 'sawtooth', 0.3, 0.2);
  setTimeout(() => playTone(300, 'sawtooth', 0.3, 0.2), 200);
  setTimeout(() => playTone(200, 'sawtooth', 0.5, 0.25), 400);
  playNoise(0.3, 0.15, 800);
}

export function playEnemyShoot() {
  playNoise(0.06, 0.12, 2500);
  playTone(300, 'square', 0.04, 0.08);
}

export function playFootstep() {
  playNoise(0.04, 0.04 + Math.random() * 0.02, 300 + Math.random() * 200);
}
