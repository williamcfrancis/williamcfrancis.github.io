import type { Language } from './types';

export function countryCodeToFlag(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 0x1F1A5))
    .join('');
}

export const ALL_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', countryCode: 'GB' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', countryCode: 'JP', nonLatin: true },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', countryCode: 'KE' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', countryCode: 'SA', rtl: true, nonLatin: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', countryCode: 'IN', nonLatin: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', countryCode: 'KR', nonLatin: true },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', countryCode: 'IS' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', countryCode: 'VN' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', countryCode: 'TR' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', countryCode: 'GR', nonLatin: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', countryCode: 'TH', nonLatin: true },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', countryCode: 'IL', rtl: true, nonLatin: true },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', countryCode: 'NG' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', countryCode: 'ID' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', countryCode: 'HU' },
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی', countryCode: 'IR', rtl: true, nonLatin: true },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', countryCode: 'CN', nonLatin: true },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', countryCode: 'ZA' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', countryCode: 'PT' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', countryCode: 'RU', nonLatin: true },
  { code: 'fr', name: 'French', nativeName: 'Français', countryCode: 'FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', countryCode: 'DE' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', countryCode: 'ES' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', countryCode: 'IT' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', countryCode: 'NL' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', countryCode: 'PL' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', countryCode: 'UA', nonLatin: true },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', countryCode: 'CZ' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', countryCode: 'RO' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', countryCode: 'SE' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', countryCode: 'DK' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', countryCode: 'FI' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', countryCode: 'NO' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', countryCode: 'BG', nonLatin: true },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', countryCode: 'HR' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', countryCode: 'SK' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', countryCode: 'SI' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', countryCode: 'EE' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', countryCode: 'LV' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', countryCode: 'LT' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', countryCode: 'GE', nonLatin: true },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', countryCode: 'AM', nonLatin: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', countryCode: 'BD', nonLatin: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', countryCode: 'LK', nonLatin: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', countryCode: 'IN', nonLatin: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', countryCode: 'IN', nonLatin: true },
  { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာ', countryCode: 'MM', nonLatin: true },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', countryCode: 'KH', nonLatin: true },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', countryCode: 'LA', nonLatin: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', countryCode: 'NP', nonLatin: true },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', countryCode: 'MN', nonLatin: true },
  { code: 'ms', name: 'Malay', nativeName: 'Melayu', countryCode: 'MY' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', countryCode: 'PH' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', countryCode: 'PK', rtl: true, nonLatin: true },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', countryCode: 'ET', nonLatin: true },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', countryCode: 'NE' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', countryCode: 'NG' },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', countryCode: 'MG' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', countryCode: 'SO' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', countryCode: 'AL' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', countryCode: 'GB' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', countryCode: 'IE' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', countryCode: 'MT' },
  { code: 'la', name: 'Latin', nativeName: 'Latina', countryCode: 'VA' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', countryCode: 'AZ' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', countryCode: 'KZ', nonLatin: true },
  { code: 'uz', name: 'Uzbek', nativeName: "O'zbek", countryCode: 'UZ' },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori', countryCode: 'NZ' },
];

function langByCode(code: string): Language {
  return ALL_LANGUAGES.find(l => l.code === code)!;
}

const DEFAULT_CODES = [
  'en', 'ja', 'sw', 'ar', 'hi', 'ko', 'is', 'vi', 'tr', 'el',
  'th', 'he', 'yo', 'id', 'hu', 'fa', 'zh-CN', 'zu', 'pt', 'ru', 'en',
];

const CHAOS_CODES = [
  'en', 'ja', 'sw', 'ar', 'hi', 'ko', 'is', 'vi', 'tr', 'el',
  'th', 'he', 'yo', 'id', 'hu', 'fa', 'zh-CN', 'zu', 'pt', 'ru',
  'fr', 'bn', 'ka', 'am', 'lo', 'mn', 'cs', 'fi', 'sq', 'cy',
  'ta', 'km', 'my', 'ur', 'bg', 'ro', 'ms', 'tl', 'ne', 'az',
  'kk', 'et', 'lv', 'lt', 'mg', 'so', 'ga', 'mt', 'la', 'mi', 'en',
];

export const DEFAULT_CHAIN: Language[] = DEFAULT_CODES.map(langByCode);
export const CHAOS_CHAIN: Language[] = CHAOS_CODES.map(langByCode);
