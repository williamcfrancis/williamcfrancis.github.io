const PERSIST_KEY = 'lit_audio_v1';

const LANG_BCP47: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  nl: 'nl-NL',
  sv: 'sv-SE',
  no: 'nb-NO',
  da: 'da-DK',
  fi: 'fi-FI',
  pl: 'pl-PL',
  cs: 'cs-CZ',
  ru: 'ru-RU',
  uk: 'uk-UA',
  el: 'el-GR',
  tr: 'tr-TR',
  ar: 'ar-SA',
  he: 'he-IL',
  fa: 'fa-IR',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  ur: 'ur-PK',
  th: 'th-TH',
  vi: 'vi-VN',
  id: 'id-ID',
  ms: 'ms-MY',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  sw: 'sw-KE',
  af: 'af-ZA',
  hu: 'hu-HU',
  ro: 'ro-RO',
  bg: 'bg-BG',
  sk: 'sk-SK',
  hr: 'hr-HR',
  sr: 'sr-RS',
  sl: 'sl-SI',
  et: 'et-EE',
  lv: 'lv-LV',
  lt: 'lt-LT',
  is: 'is-IS',
  ga: 'ga-IE',
  cy: 'cy-GB',
  ca: 'ca-ES',
  eu: 'eu-ES',
  gl: 'gl-ES',
};

function expandLangCode(code: string): string {
  return LANG_BCP47[code] || code;
}

function isSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

let voices: SpeechSynthesisVoice[] = [];
let voicesReady: Promise<void> | null = null;

function loadVoices(): Promise<void> {
  if (!isSupported()) return Promise.resolve();
  if (voicesReady) return voicesReady;

  voicesReady = new Promise(resolve => {
    const synth = window.speechSynthesis;
    const initial = synth.getVoices();
    if (initial && initial.length > 0) {
      voices = initial;
      resolve();
      return;
    }
    const onChange = () => {
      voices = synth.getVoices();
      synth.removeEventListener('voiceschanged', onChange);
      resolve();
    };
    synth.addEventListener('voiceschanged', onChange);
    setTimeout(() => {
      voices = synth.getVoices();
      resolve();
    }, 1500);
  });
  return voicesReady;
}

function pickVoice(langCode: string): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  const expanded = expandLangCode(langCode);
  const exact = voices.find(v => v.lang === expanded);
  if (exact) return exact;
  const prefix = voices.find(v => v.lang.startsWith(`${langCode}-`));
  if (prefix) return prefix;
  const bare = voices.find(v => v.lang === langCode);
  if (bare) return bare;
  const lowerPrefix = voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
  return lowerPrefix || null;
}

let enabled = false;
let initialized = false;
let speechGeneration = 0;
let finishSpeech: (() => void) | null = null;

function readPersisted(): boolean {
  try {
    return localStorage.getItem(PERSIST_KEY) === '1';
  } catch {
    return false;
  }
}

function writePersisted(on: boolean): void {
  try {
    localStorage.setItem(PERSIST_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function ensureInit(): void {
  if (initialized) return;
  initialized = true;
  if (!isSupported()) {
    enabled = false;
    return;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  enabled = reduced ? false : readPersisted();
  loadVoices();
}

export const journeyAudio = {
  isSupported,

  isEnabled(): boolean {
    ensureInit();
    return enabled;
  },

  setEnabled(on: boolean): void {
    ensureInit();
    enabled = on && isSupported();
    writePersisted(enabled);
    if (!enabled) this.cancel();
    else loadVoices();
  },

  cancel(): void {
    speechGeneration++;
    finishSpeech?.();
    if (!isSupported()) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  },

  async speak(text: string, langCode: string): Promise<void> {
    ensureInit();
    if (!enabled || !isSupported() || !text || !text.trim()) return;
    this.cancel();
    const generation = speechGeneration;
    await loadVoices();
    if (!enabled || generation !== speechGeneration) return;

    const voice = pickVoice(langCode);
    if (!voice) return;

    return new Promise<void>(resolve => {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        utter.voice = voice;
        utter.lang = voice.lang;
        utter.rate = 1.0;
        utter.pitch = 1.0;
        utter.volume = 1.0;
        let done = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const finish = () => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          if (finishSpeech === finish) finishSpeech = null;
          resolve();
        };
        finishSpeech = finish;
        utter.onend = finish;
        utter.onerror = finish;
        const safetyMs = Math.max(2500, text.length * 90);
        timer = setTimeout(finish, safetyMs);
        window.speechSynthesis.speak(utter);
      } catch {
        finishSpeech?.();
        resolve();
      }
    });
  },
};

export type JourneyAudio = typeof journeyAudio;
