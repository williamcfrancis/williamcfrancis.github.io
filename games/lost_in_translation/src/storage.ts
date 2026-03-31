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

export function setCachedChain(chain: TranslationChain): void {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[chain.original.toLowerCase().trim()] = chain;
    const serialized = JSON.stringify(cache);
    if (serialized.length < 5_000_000) {
      localStorage.setItem(CACHE_KEY, serialized);
    }
  } catch {
    // storage full or unavailable
  }
}

export function encodeChainToHash(chain: TranslationChain): string {
  const json = JSON.stringify(chain);
  const compressed = pako.deflate(new TextEncoder().encode(json));
  const base64 = btoa(String.fromCharCode(...compressed));
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
