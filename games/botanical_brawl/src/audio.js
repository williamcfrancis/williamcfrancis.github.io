import { getSettings, saveSettings } from './persistence.js';

let ctx;
let masterGain, sfxGain, musicGain;
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

// ── Procedural Ambient Music (Minecraft-inspired) ──

const AMBIENT_NOTES = [
  130.81, 146.83, 164.81, 196.00, 220.00,
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99, 880.00,
];

let _musicActive = false;
let _noteTimeout = null;
let _phraseNotes = 0;
let _phraseLength = 0;
let _resting = false;
let _restTicks = 0;
let _lastNoteIdx = -1;
let _padOscs = [];
let _padGain = null;

function playPianoNote(freq, vol = 0.028, decay = 3.0) {
  if (!ctx) return;
  const t = ctx.currentTime;

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.015);
  g.gain.setTargetAtTime(vol * 0.6, t + 0.015, 0.08);
  g.gain.exponentialRampToValueAtTime(0.001, t + decay);
  o.connect(g); g.connect(musicGain);
  o.start(t); o.stop(t + decay + 0.1);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = 'sine';
  o2.frequency.value = freq * 1.002;
  g2.gain.setValueAtTime(0.001, t);
  g2.gain.linearRampToValueAtTime(vol * 0.3, t + 0.015);
  g2.gain.exponentialRampToValueAtTime(0.001, t + decay * 1.15);
  o2.connect(g2); g2.connect(musicGain);
  o2.start(t); o2.stop(t + decay * 1.15 + 0.1);

  if (Math.random() < 0.3) {
    const o3 = ctx.createOscillator();
    const g3 = ctx.createGain();
    o3.type = 'sine';
    o3.frequency.value = freq * 2;
    g3.gain.setValueAtTime(0.001, t);
    g3.gain.linearRampToValueAtTime(vol * 0.12, t + 0.01);
    g3.gain.exponentialRampToValueAtTime(0.001, t + decay * 0.5);
    o3.connect(g3); g3.connect(musicGain);
    o3.start(t); o3.stop(t + decay * 0.5 + 0.1);
  }
}

function pickNextNote() {
  if (_lastNoteIdx >= 0 && Math.random() < 0.7) {
    const step = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2));
    return Math.max(0, Math.min(AMBIENT_NOTES.length - 1, _lastNoteIdx + step));
  }
  return Math.floor(Math.random() * AMBIENT_NOTES.length);
}

function musicTick() {
  if (!ctx || !_musicActive) return;

  if (_resting) {
    _restTicks--;
    if (_restTicks <= 0) {
      _resting = false;
      _phraseLength = 3 + Math.floor(Math.random() * 5);
      _phraseNotes = 0;
    }
    scheduleNext();
    return;
  }

  const idx = pickNextNote();
  _lastNoteIdx = idx;
  const freq = AMBIENT_NOTES[idx];
  const octaveRegion = idx < 5 ? 'low' : idx < 10 ? 'mid' : 'high';
  const vol = octaveRegion === 'low' ? 0.022 : octaveRegion === 'mid' ? 0.028 : 0.02;
  const decay = octaveRegion === 'low' ? 4.0 : octaveRegion === 'mid' ? 3.2 : 2.5;

  playPianoNote(freq, vol + Math.random() * 0.008, decay + Math.random() * 1.0);

  if (Math.random() < 0.25) {
    const chordIdx = Math.min(AMBIENT_NOTES.length - 1, idx + 2 + Math.floor(Math.random() * 2));
    setTimeout(() => {
      if (_musicActive) playPianoNote(AMBIENT_NOTES[chordIdx], vol * 0.6, decay * 0.8);
    }, 60 + Math.random() * 120);
  }

  _phraseNotes++;
  if (_phraseNotes >= _phraseLength) {
    _resting = true;
    _restTicks = 4 + Math.floor(Math.random() * 6);
  }

  const intense = _musicWave >= 10 ? 2 : _musicWave >= 5 ? 1 : 0;
  if (intense >= 1 && _musicBeat % 3 === 0) {
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(90, t);
    o.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    g.gain.setValueAtTime(0.04, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    o.connect(g); g.connect(musicGain);
    o.start(t); o.stop(t + 0.2);
  }

  if (_bossFight && _musicBeat % 6 === 0) {
    const t = ctx.currentTime;
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
    o1.type = 'sine'; o2.type = 'sine';
    o1.frequency.value = 55; o2.frequency.value = 58.27;
    g.gain.setValueAtTime(0.018, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 3.5);
    o1.connect(g); o2.connect(g); g.connect(musicGain);
    o1.start(t); o2.start(t);
    o1.stop(t + 3.6); o2.stop(t + 3.6);
  }

  _musicBeat++;
  scheduleNext();
}

function scheduleNext() {
  if (!_musicActive) return;
  const delay = _resting ? 600 + Math.random() * 400 : 1200 + Math.random() * 1800;
  _noteTimeout = setTimeout(musicTick, delay);
}

function startAmbientPad() {
  if (!ctx) return;
  _padGain = ctx.createGain();
  _padGain.gain.setValueAtTime(0, ctx.currentTime);
  _padGain.gain.linearRampToValueAtTime(0.007, ctx.currentTime + 3);
  _padGain.connect(musicGain);

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 400;
  lp.connect(_padGain);

  [130.81, 196.00, 261.63].forEach(freq => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    o.connect(lp);
    o.start();
    _padOscs.push(o);
  });
}

function stopAmbientPad() {
  for (const o of _padOscs) { try { o.stop(); } catch {} }
  _padOscs = [];
  _padGain = null;
}

export function startMusic() {
  if (_musicActive) return;
  _musicActive = true;
  _musicBeat = 0;
  _resting = false;
  _phraseNotes = 0;
  _phraseLength = 3 + Math.floor(Math.random() * 4);
  _lastNoteIdx = -1;
  startAmbientPad();
  scheduleNext();
}

export function stopMusic() {
  _musicActive = false;
  if (_noteTimeout) { clearTimeout(_noteTimeout); _noteTimeout = null; }
  stopAmbientPad();
}

export function updateMusicIntensity(wave, isBoss = false) {
  _musicWave = wave;
  _bossFight = isBoss;
}
