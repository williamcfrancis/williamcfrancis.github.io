import { getSettings, saveSettings } from './persistence.js';

let ctx;
let masterGain, sfxGain, musicGain;
let _musicTimer = null;
let _musicBeat = 0;
let _musicWave = 1;
let _bossFight = false;

export function initAudio() {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    sfxGain = ctx.createGain();
    musicGain = ctx.createGain();
    sfxGain.connect(masterGain);
    musicGain.connect(masterGain);
    masterGain.connect(ctx.destination);
    const s = getSettings();
    masterGain.gain.value = s.master;
    sfxGain.gain.value = s.sfx;
    musicGain.gain.value = s.music;
  }
  if (ctx.state === 'suspended') ctx.resume();
}

export function setVolumes(master, sfx, music) {
  if (!ctx) return;
  masterGain.gain.setTargetAtTime(master, ctx.currentTime, 0.02);
  sfxGain.gain.setTargetAtTime(sfx, ctx.currentTime, 0.02);
  musicGain.gain.setTargetAtTime(music, ctx.currentTime, 0.02);
  saveSettings({ master, sfx, music });
}

export function getVolumes() {
  if (!ctx) return getSettings();
  return { master: masterGain.gain.value, sfx: sfxGain.gain.value, music: musicGain.gain.value };
}

function env(g, a, d, s, r) {
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(s, t + a);
  g.gain.exponentialRampToValueAtTime(0.001, t + a + d + r);
}

function playSfx(fn) { if (ctx) fn(ctx, sfxGain); }

// ── Existing SFX (routed through sfxGain) ──

export function shootSound(freq = 440, type = 'sine') {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 1.4, c.currentTime + 0.04);
    o.frequency.exponentialRampToValueAtTime(freq * 0.4, c.currentTime + 0.14);
    env(g, 0.005, 0.04, 0.12, 0.1);
    o.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.18);
  });
}

export function hitSound() {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(520, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(160, c.currentTime + 0.1);
    env(g, 0.003, 0.03, 0.15, 0.07);
    o.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.12);
  });
}

export function deathSound() {
  playSfx((c, out) => {
    const o1 = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
    o1.type = 'sine'; o2.type = 'triangle';
    o1.frequency.setValueAtTime(700, c.currentTime);
    o1.frequency.exponentialRampToValueAtTime(1400, c.currentTime + 0.06);
    o1.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.22);
    o2.frequency.setValueAtTime(350, c.currentTime);
    o2.frequency.exponentialRampToValueAtTime(700, c.currentTime + 0.06);
    env(g, 0.004, 0.06, 0.18, 0.12);
    o1.connect(g); o2.connect(g); g.connect(out);
    o1.start(); o2.start();
    o1.stop(c.currentTime + 0.25); o2.stop(c.currentTime + 0.25);
  });
}

export function forgeCompleteSound() {
  playSfx((c, out) => {
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, c.currentTime + i * 0.1);
      g.gain.setValueAtTime(0.001, c.currentTime + i * 0.1);
      g.gain.linearRampToValueAtTime(0.1, c.currentTime + i * 0.1 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.25);
      o.connect(g); g.connect(out);
      o.start(c.currentTime + i * 0.1);
      o.stop(c.currentTime + i * 0.1 + 0.28);
    });
  });
}

export function playerHitSound() {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(220, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.15);
    env(g, 0.003, 0.04, 0.18, 0.1);
    o.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.18);
  });
}

// ── New SFX ──

export function waveCompleteSound() {
  playSfx((c, out) => {
    [392, 523, 659, 784].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.001, c.currentTime + i * 0.08);
      g.gain.linearRampToValueAtTime(0.08, c.currentTime + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.08 + 0.3);
      o.connect(g); g.connect(out);
      o.start(c.currentTime + i * 0.08);
      o.stop(c.currentTime + i * 0.08 + 0.35);
    });
  });
}

export function pickupCollectSound() {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(880, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(1760, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.001, c.currentTime);
    g.gain.linearRampToValueAtTime(0.1, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    o.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.15);
  });
}

export function dashSound() {
  playSfx((c, out) => {
    const len = c.sampleRate * 0.12;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 2000; bp.Q.value = 1.5;
    const g = c.createGain();
    g.gain.setValueAtTime(0.15, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
    src.connect(bp); bp.connect(g); g.connect(out);
    src.start(); src.stop(c.currentTime + 0.12);
  });
}

export function bossRoarSound() {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(60, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.5);
    g.gain.setValueAtTime(0.001, c.currentTime);
    g.gain.linearRampToValueAtTime(0.2, c.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 200;
    o.connect(lp); lp.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.65);
  });
}

export function bounceSound() {
  playSfx((c, out) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(600, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.03);
    o.frequency.exponentialRampToValueAtTime(400, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.001, c.currentTime);
    g.gain.linearRampToValueAtTime(0.08, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g); g.connect(out);
    o.start(); o.stop(c.currentTime + 0.1);
  });
}

// ── Procedural Background Music ──

const PENTA = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

function mNote(freq, dur, type = 'sine', vol = 0.04) {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  o.connect(g); g.connect(musicGain);
  o.start(); o.stop(ctx.currentTime + dur + 0.01);
}

function musicTick() {
  if (!ctx) return;
  const beat = _musicBeat % 16;
  const intense = _musicWave >= 10 ? 2 : _musicWave >= 5 ? 1 : 0;

  const noteIdx = _musicBeat % PENTA.length;
  mNote(PENTA[noteIdx], 0.3, 'sine', 0.025 + intense * 0.008);

  if (beat % 8 === 0) {
    mNote(PENTA[0] / 2, 1.8, 'sine', 0.018);
    mNote(PENTA[2], 1.8, 'triangle', 0.012);
  }

  if (intense >= 1) {
    if (beat % 4 === 0) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(120, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      o.connect(g); g.connect(musicGain);
      o.start(); o.stop(ctx.currentTime + 0.13);
    }
    if (beat % 2 === 1) {
      const len = ctx.sampleRate * 0.03;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 9000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.03, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      src.connect(f); f.connect(g); g.connect(musicGain);
      src.start(); src.stop(ctx.currentTime + 0.04);
    }
  }

  if (intense >= 2 && beat % 4 === 0) {
    mNote(PENTA[0] / 4, 0.6, 'sawtooth', 0.02);
  }

  if (_bossFight && beat % 16 === 0) {
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
    o1.type = 'sine'; o2.type = 'sine';
    o1.frequency.value = 55; o2.frequency.value = 58.27;
    g.gain.setValueAtTime(0.025, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
    o1.connect(g); o2.connect(g); g.connect(musicGain);
    o1.start(); o2.start();
    o1.stop(ctx.currentTime + 3.6); o2.stop(ctx.currentTime + 3.6);
  }

  _musicBeat++;
}

export function startMusic() {
  if (_musicTimer) return;
  _musicBeat = 0;
  _musicTimer = setInterval(musicTick, 250);
}

export function stopMusic() {
  if (_musicTimer) { clearInterval(_musicTimer); _musicTimer = null; }
}

export function updateMusicIntensity(wave, isBoss = false) {
  _musicWave = wave;
  _bossFight = isBoss;
}
