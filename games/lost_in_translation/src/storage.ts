import pako from 'pako';
import type { TranslationChain } from './types';

const CACHE_KEY = 'lost_in_translation_cache';

export function getCachedChain(sentence: string): TranslationChain | null {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    return cache[sentence.toLowerCase().trim()] || null;
  } catch {
    return null;
  }
}

const MAX_CACHE_ENTRIES = 50;
const MAX_CACHE_BYTES = 4_000_000;

export function setCachedChain(chain: TranslationChain): void {
  try {
    const cache: Record<string, TranslationChain> = JSON.parse(
      localStorage.getItem(CACHE_KEY) || '{}',
    );
    const key = chain.original.toLowerCase().trim();
    cache[key] = chain;

    const entries = Object.entries(cache);
    if (entries.length > MAX_CACHE_ENTRIES) {
      entries
        .sort((a, b) => (a[1].timestamp ?? 0) - (b[1].timestamp ?? 0))
        .slice(0, entries.length - MAX_CACHE_ENTRIES)
        .forEach(([k]) => delete cache[k]);
    }

    const serialized = JSON.stringify(cache);
    if (serialized.length > MAX_CACHE_BYTES) {
      const sorted = Object.entries(cache).sort(
        (a, b) => (a[1].timestamp ?? 0) - (b[1].timestamp ?? 0),
      );
      while (sorted.length > 1 && JSON.stringify(Object.fromEntries(sorted)).length > MAX_CACHE_BYTES) {
        sorted.shift();
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(sorted)));
    } else {
      localStorage.setItem(CACHE_KEY, serialized);
    }
  } catch {
    /* storage full or unavailable */
  }
}

export function encodeChainToHash(chain: TranslationChain): string {
  const json = JSON.stringify(chain);
  const compressed = pako.deflate(new TextEncoder().encode(json));
  const base64 = btoa(Array.from(compressed, b => String.fromCharCode(b)).join(''));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeChainFromHash(hash: string): TranslationChain | null {
  try {
    const base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
    const decompressed = pako.inflate(bytes);
    const json = new TextDecoder().decode(decompressed);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function saveToUrl(chain: TranslationChain): void {
  const hash = encodeChainToHash(chain);
  window.history.replaceState(null, '', `#${hash}`);
}

export function loadFromUrl(): TranslationChain | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  return decodeChainFromHash(hash);
}
