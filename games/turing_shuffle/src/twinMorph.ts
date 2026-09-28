/**
 * twinMorph — character-by-character text morph for the Twin Reveal.
 *
 * A wave-front sweeps left-to-right across the passage. As the wave passes
 * each character position, that position cycles through 3–5 random glyphs
 * for ~80–120ms before settling into the twin's character at that index.
 * Whitespace, punctuation, and identical positions don't scramble — the
 * effect is concentrated where the texts actually diverge.
 *
 * Variable lengths are handled by padding with spaces during the morph and
 * trimming once it completes.
 */

export interface MorphOptions {
  /** Total duration of the morph in milliseconds. Default 1400. */
  duration?: number;
  /** Width of the scramble wave-front in characters. Default 28. */
  waveWidth?: number;
  /** Called once the morph has settled. */
  onComplete?: () => void;
  /** Called on each frame with progress 0–1. */
  onProgress?: (progress: number) => void;
  /** AbortSignal to cancel the morph mid-flight. */
  signal?: AbortSignal;
}

const SCRAMBLE_POOL =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789·∂∇∑∞◇○';

function randomGlyph(): string {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
}

function isWhitespace(ch: string): boolean {
  return ch === ' ' || ch === '\n' || ch === '\t';
}

function isQuiet(ch: string): boolean {
  // Punctuation/whitespace we don't scramble — preserves visual spine.
  return /[\s.,:;!?'"\-—–()\[\]{}]/.test(ch);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Morph the textContent of `el` from `fromText` to `toText` with a left-to-right
 * scramble wave. Honors prefers-reduced-motion (instant cross-fade with a brief
 * glow). Returns a Promise that resolves once the morph has settled (or is
 * aborted via opts.signal).
 */
export function morphText(
  el: HTMLElement,
  fromText: string,
  toText: string,
  opts: MorphOptions = {}
): Promise<void> {
  const duration = opts.duration ?? 1400;
  const waveWidth = opts.waveWidth ?? 28;
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return new Promise<void>((resolve) => {
    if (opts.signal?.aborted) {
      el.textContent = toText;
      opts.onComplete?.();
      resolve();
      return;
    }

    if (reduced) {
      el.classList.add('morph-glow');
      // Brief fade-out / fade-in cross-dissolve via opacity.
      el.style.transition = 'opacity 180ms ease';
      el.style.opacity = '0';
      setTimeout(() => {
        if (opts.signal?.aborted) {
          el.style.opacity = '';
          el.style.transition = '';
          el.classList.remove('morph-glow');
          opts.onComplete?.();
          resolve();
          return;
        }
        el.textContent = toText;
        el.style.opacity = '1';
        setTimeout(() => {
          el.style.opacity = '';
          el.style.transition = '';
          el.classList.remove('morph-glow');
          opts.onComplete?.();
          resolve();
        }, 200);
      }, 200);
      return;
    }

    const maxLen = Math.max(fromText.length, toText.length);
    // Pad with regular spaces during the morph; trim at end.
    const fromPad = fromText.padEnd(maxLen, ' ');
    const toPad = toText.padEnd(maxLen, ' ');

    el.classList.add('morph-glow');
    const startT = performance.now();
    let rafId = 0;

    const onAbort = () => {
      cancelAnimationFrame(rafId);
      el.textContent = toText;
      el.classList.remove('morph-glow');
      opts.onComplete?.();
      resolve();
    };
    opts.signal?.addEventListener('abort', onAbort, { once: true });

    function frame(now: number) {
      if (opts.signal?.aborted) return; // onAbort handles cleanup
      const elapsedRaw = now - startT;
      const linearProgress = Math.min(elapsedRaw / duration, 1);
      const eased = easeInOut(linearProgress);
      // Wave-front sweeps from -waveWidth to maxLen+waveWidth so chars at
      // both ends get equal treatment.
      const waveFront = eased * (maxLen + waveWidth) - waveWidth;

      let result = '';
      for (let i = 0; i < maxLen; i++) {
        const fromCh = fromPad[i];
        const toCh = toPad[i];
        const dist = waveFront - i;

        if (dist < 0) {
          // Not yet reached: show original.
          result += fromCh;
        } else if (dist >= waveWidth) {
          // Past wave: settled to twin.
          result += toCh;
        } else {
          // Inside the wave.
          if (fromCh === toCh) {
            result += toCh;
          } else if (isWhitespace(fromCh) && isWhitespace(toCh)) {
            result += toCh;
          } else if (isQuiet(toCh) && Math.random() > 0.4) {
            // Quiet chars resolve quickly so layout stays steady.
            result += toCh;
          } else {
            // Bias toward settling as the wave passes.
            const settlePressure = dist / waveWidth;
            result += Math.random() < settlePressure ? toCh : randomGlyph();
          }
        }
      }

      el.textContent = result;
      opts.onProgress?.(linearProgress);

      if (linearProgress < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        el.textContent = toText;
        el.classList.remove('morph-glow');
        el.classList.add('morph-settled');
        setTimeout(() => el.classList.remove('morph-settled'), 700);
        opts.signal?.removeEventListener('abort', onAbort);
        opts.onComplete?.();
        resolve();
      }
    }

    rafId = requestAnimationFrame(frame);
  });
}
