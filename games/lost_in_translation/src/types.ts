export interface Language {
  code: string;
  name: string;
  nativeName: string;
  countryCode: string;
  rtl?: boolean;
  nonLatin?: boolean;
}

export interface TranslationStep {
  language: Language;
  text: string;
  transliteration?: string;
  backTranslation: string;
  driftScore: number;
}

export interface TranslationChain {
  original: string;
  chain: Language[];
  steps: TranslationStep[];
  finalText: string;
  totalDrift: number;
  timestamp: number;
}

export interface TranslateResponse {
  translatedText: string;
  detectedSourceLanguage: string;
}
