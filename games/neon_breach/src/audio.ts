const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

function ensureCtx(): void {
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function noise(duration: number, volume: number, filterFreq: number, filterType: BiquadFilterType = 'lowpass'): void {
  ensureCtx();
  const sr = audioCtx.sampleRate;
  const len = sr * duration;
  const buf = audioCtx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1);

  const src = audioCtx.createBufferSource();
  src.buffer = buf;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  const filter = audioCtx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;

  src.connect(filter).connect(gain).connect(audioCtx.destination);
  src.start();
  src.stop(audioCtx.currentTime + duration);
}

function tone(freq: number, duration: number, volume: number, type: OscillatorType = 'sine', detune = 0): void {
  ensureCtx();
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function sweep(startFreq: number, endFreq: number, duration: number, volume: number, type: OscillatorType = 'sine'): void {
  ensureCtx();
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playGunshot(slot: number): void {
  switch (slot) {
    case 0: // AR
      noise(0.08, 0.25, 3000, 'bandpass');
      tone(180, 0.06, 0.15, 'sawtooth');
      sweep(800, 200, 0.05, 0.1, 'square');
      break;
    case 1: // Shotgun
      noise(0.15, 0.35, 1500);
      tone(100, 0.12, 0.2, 'sawtooth');
      noise(0.08, 0.15, 5000, 'highpass');
      break;
    case 2: // Sniper
      noise(0.05, 0.2, 6000, 'highpass');
      sweep(2000, 100, 0.2, 0.2, 'sawtooth');
      tone(60, 0.3, 0.15, 'sine');
      break;
    case 3: // Rocket
      noise(0.2, 0.3, 800);
      sweep(400, 80, 0.3, 0.2, 'sawtooth');
      tone(50, 0.4, 0.15, 'sine');
      break;
    case 4: // SMG
      noise(0.04, 0.18, 4000, 'bandpass');
      tone(300, 0.03, 0.12, 'square');
      break;
  }
}

export function playAltFire(slot: number): void {
  switch (slot) {
    case 0: // Burst
      for (let i = 0; i < 3; i++) {
        setTimeout(() => { noise(0.05, 0.2, 3500, 'bandpass'); tone(200, 0.04, 0.1, 'sawtooth'); }, i * 60);
      }
      break;
    case 1: // Incendiary
      noise(0.2, 0.3, 2000);
      sweep(600, 100, 0.3, 0.2, 'sawtooth');
      tone(80, 0.3, 0.2, 'sine');
      break;
    case 2: // Beam
      sweep(800, 2000, 0.4, 0.2, 'sawtooth');
      tone(440, 0.5, 0.15, 'sine');
      break;
    case 3: // Cluster
      noise(0.3, 0.35, 1000);
      sweep(300, 50, 0.4, 0.25, 'sawtooth');
      break;
    case 4: // EMP
      sweep(2000, 50, 0.3, 0.25, 'sine');
      tone(60, 0.4, 0.2, 'square');
      noise(0.15, 0.15, 800);
      break;
  }
}

export function playHit(): void {
  tone(800, 0.05, 0.15, 'square');
  tone(1200, 0.03, 0.1, 'sine');
}

export function playHeadshot(): void {
  tone(1500, 0.08, 0.2, 'square');
  tone(2000, 0.06, 0.15, 'sine');
  sweep(2500, 800, 0.1, 0.1, 'sine');
}

export function playKill(): void {
  tone(600, 0.06, 0.12, 'sine');
  tone(900, 0.08, 0.12, 'sine');
  tone(1200, 0.1, 0.1, 'sine');
}

export function playDamage(): void {
  noise(0.1, 0.2, 1000);
  tone(200, 0.15, 0.12, 'sawtooth');
}

export function playDeath(): void {
  sweep(800, 50, 0.8, 0.25, 'sawtooth');
  noise(0.4, 0.2, 500);
}

export function playExplosion(): void {
  noise(0.4, 0.4, 400);
  tone(40, 0.6, 0.3, 'sine');
  sweep(200, 20, 0.5, 0.2, 'sawtooth');
  noise(0.2, 0.15, 2000, 'highpass');
}

export function playReload(): void {
  tone(400, 0.05, 0.08, 'square');
  setTimeout(() => tone(600, 0.05, 0.08, 'square'), 100);
  setTimeout(() => tone(500, 0.08, 0.06, 'sine'), 200);
}

export function playFootstep(): void {
  noise(0.04, 0.05, 800);
  tone(80 + Math.random() * 40, 0.03, 0.03, 'sine');
}

export function playJump(): void {
  sweep(200, 600, 0.12, 0.1, 'sine');
}

export function playLand(): void {
  noise(0.06, 0.1, 500);
  tone(100, 0.08, 0.06, 'sine');
}

export function playWaveStart(): void {
  tone(440, 0.15, 0.1, 'sine');
  setTimeout(() => tone(660, 0.15, 0.1, 'sine'), 150);
  setTimeout(() => tone(880, 0.2, 0.12, 'sine'), 300);
}

export function playPickup(): void {
  sweep(400, 1200, 0.15, 0.12, 'sine');
  tone(1200, 0.1, 0.08, 'sine');
}

export function playEnemyShoot(): void {
  noise(0.05, 0.08, 2000, 'bandpass');
  tone(300, 0.04, 0.05, 'sawtooth');
}

export function playWallRun(): void {
  noise(0.03, 0.04, 1200, 'bandpass');
}

export function playGrappleHit(): void {
  sweep(300, 1200, 0.1, 0.12, 'sine');
  tone(1200, 0.08, 0.08, 'square');
}

export function playGrappleRelease(): void {
  sweep(1000, 300, 0.08, 0.08, 'sine');
}

export function playBulletTime(): void {
  sweep(1500, 200, 0.4, 0.12, 'sine');
  tone(80, 0.5, 0.1, 'sine');
}

export function playBulletTimeEnd(): void {
  sweep(200, 1500, 0.2, 0.12, 'sine');
}

export function playCombo(level: number): void {
  const freq = 400 + level * 200;
  tone(freq, 0.08, 0.1, 'sine');
  tone(freq * 1.5, 0.06, 0.08, 'sine');
}

export function playBossSpawn(): void {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      tone(80 + i * 40, 0.3, 0.15, 'sawtooth');
      noise(0.15, 0.1, 500);
    }, i * 200);
  }
}

export function playBossDeath(): void {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      playExplosion();
    }, i * 150);
  }
  setTimeout(() => {
    sweep(100, 2000, 0.6, 0.2, 'sine');
    tone(2000, 0.4, 0.15, 'sine');
  }, 1200);
}

export function playDoubleJump(): void {
  sweep(400, 900, 0.08, 0.1, 'sine');
  noise(0.03, 0.05, 3000, 'highpass');
}

export function playStylePoint(): void {
  sweep(800, 1600, 0.06, 0.08, 'sine');
}

export function playOverdrive(): void {
  sweep(200, 1800, 0.3, 0.15, 'sawtooth');
  tone(1800, 0.2, 0.1, 'sine');
  noise(0.1, 0.08, 4000, 'highpass');
}
