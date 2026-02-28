let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function ensureCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function dest(): AudioNode {
  ensureCtx();
  return masterGain!;
}

/** Set master volume (0-1). */
export function setMasterVolume(v: number) {
  ensureCtx();
  masterGain!.gain.value = Math.max(0, Math.min(1, v));
}

/** Get the shared AudioContext (created lazily on first call). */
export function getAudioContext(): AudioContext {
  return ensureCtx();
}

/**
 * Play a one-shot synthesized tone.
 *
 *   playTone({ freq: 440, type: 'sine', duration: 0.2, volume: 0.5 });
 */
export function playTone(opts: {
  freq?: number;
  type?: OscillatorType;
  duration?: number;
  volume?: number;
  detune?: number;
}) {
  const ac = ensureCtx();
  const { freq = 440, type = 'sine', duration = 0.15, volume = 0.4, detune = 0 } = opts;
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

/**
 * Play white-noise burst (good for hits, explosions).
 */
export function playNoise(opts: {
  duration?: number;
  volume?: number;
  bandpass?: number;
} = {}) {
  const ac = ensureCtx();
  const { duration = 0.1, volume = 0.3, bandpass = 0 } = opts;
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

/**
 * Load an audio file from URL into a decoded AudioBuffer.
 * Caches by URL so repeated loads are instant.
 */
const bufferCache = new Map<string, AudioBuffer>();

export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(url);
  if (cached) return cached;
  const ac = ensureCtx();
  const resp = await fetch(url);
  const arrayBuf = await resp.arrayBuffer();
  const audioBuf = await ac.decodeAudioData(arrayBuf);
  bufferCache.set(url, audioBuf);
  return audioBuf;
}

/**
 * Play a previously loaded AudioBuffer.
 * Returns the source node for further manipulation.
 */
export function playBuffer(
  buffer: AudioBuffer,
  opts: { volume?: number; loop?: boolean; playbackRate?: number } = {},
): AudioBufferSourceNode {
  const ac = ensureCtx();
  const { volume = 1, loop = false, playbackRate = 1 } = opts;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;
  src.playbackRate.value = playbackRate;
  const gain = ac.createGain();
  gain.gain.value = volume;
  src.connect(gain);
  gain.connect(dest());
  src.start();
  return src;
}
