// ════════════════════════════════════════════════════════════
// IDLE BEHAVIOR FRAMEWORK
//
// Once a level's scrubbed timeline reaches the end and the
// section is still in view, we want the vignette to keep living
// — gentle motion, ambient detail, never abruptly frozen. This
// manager runs a single rAF loop that ticks the active level's
// idle hook and pauses everything else (perf + battery).
// ════════════════════════════════════════════════════════════

import { REDUCED_MOTION } from './tokens.ts';

export type IdleHook = (time: number, dt: number) => void;

interface Entry {
  hook: IdleHook;
  section: HTMLElement;
}

export class IdleManagerImpl {
  private entries = new Map<number, Entry>();
  private visibility = new Map<number, number>();
  private active: number | null = null;
  private rafId = 0;
  private last = 0;
  private start = 0;
  private observer: IntersectionObserver | null = null;

  register(levelId: number, hook: IdleHook, section: HTMLElement) {
    this.entries.set(levelId, { hook, section });
    this.attachObserver();
    this.observer!.observe(section);
  }

  unregister(levelId: number) {
    const e = this.entries.get(levelId);
    if (e && this.observer) this.observer.unobserve(e.section);
    this.entries.delete(levelId);
    this.visibility.delete(levelId);
    if (this.active === levelId) this.active = null;
  }

  begin() {
    if (REDUCED_MOTION) return;
    if (this.rafId) return;
    this.start = performance.now();
    this.last = this.start;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      const t = (now - this.start) / 1000;
      if (this.active !== null) {
        const e = this.entries.get(this.active);
        if (e) {
          try { e.hook(t, dt); } catch (err) { console.error(err); }
        }
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private attachObserver() {
    if (this.observer) return;
    this.observer = new IntersectionObserver((entries) => {
      // Observer callbacks contain only changed sections, not every visible one.
      for (const e of entries) {
        const id = parseInt((e.target as HTMLElement).id.replace('level-', ''));
        if (!this.entries.has(id)) continue;
        if (e.isIntersecting && e.intersectionRatio > 0) this.visibility.set(id, e.intersectionRatio);
        else this.visibility.delete(id);
      }
      let best: { id: number; ratio: number } | null = null;
      for (const [id, ratio] of this.visibility) {
        if (!best || ratio > best.ratio) best = { id, ratio };
      }
      this.active = best?.id ?? null;
    }, { threshold: [0.25, 0.5, 0.75] });
  }
}

export const IdleManager = new IdleManagerImpl();
