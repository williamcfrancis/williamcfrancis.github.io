// ════════════════════════════════════════════════════════════
// DESIGN TOKENS — single source of truth for colors, motion,
// typography, depth, and spacing across the exhibit.
// ════════════════════════════════════════════════════════════

export interface Accent {
  fill: string;
  soft: string;
  glow: string;
  ink: string;
}

// Thematic progression: primitives → embodied → vehicular →
// augmented → beyond-Earth → frontier.
export const ACCENTS: Accent[] = [
  // L1 Thermostat — warm amber
  { fill: '#ff8a4c', soft: 'rgba(255, 138, 76, 0.32)', glow: 'rgba(255, 138, 76, 0.18)', ink: '#ffb38a' },
  // L2 Cruise Control — ochre
  { fill: '#e0a64b', soft: 'rgba(224, 166, 75, 0.32)', glow: 'rgba(224, 166, 75, 0.18)', ink: '#f0c47a' },
  // L3 Roomba — jade
  { fill: '#34d399', soft: 'rgba(52, 211, 153, 0.32)', glow: 'rgba(52, 211, 153, 0.18)', ink: '#7eecbf' },
  // L4 Drone — teal
  { fill: '#22d3ee', soft: 'rgba(34, 211, 238, 0.32)', glow: 'rgba(34, 211, 238, 0.18)', ink: '#7ce8f5' },
  // L5 Warehouse — cyan
  { fill: '#06b6d4', soft: 'rgba(6, 182, 212, 0.32)', glow: 'rgba(6, 182, 212, 0.18)', ink: '#5fd5e8' },
  // L6 L2 car — amber (warning)
  { fill: '#f59e0b', soft: 'rgba(245, 158, 11, 0.32)', glow: 'rgba(245, 158, 11, 0.18)', ink: '#fac35d' },
  // L7 L4 car — emerald (calm/safe)
  { fill: '#10b981', soft: 'rgba(16, 185, 129, 0.32)', glow: 'rgba(16, 185, 129, 0.18)', ink: '#5fd9b0' },
  // L8 Surgical — clinical sky blue
  { fill: '#60a5fa', soft: 'rgba(96, 165, 250, 0.32)', glow: 'rgba(96, 165, 250, 0.18)', ink: '#a3c7fc' },
  // L9 Mars rover — mars orange
  { fill: '#f97316', soft: 'rgba(249, 115, 22, 0.32)', glow: 'rgba(249, 115, 22, 0.18)', ink: '#fba968' },
  // L10 Starlink — indigo
  { fill: '#818cf8', soft: 'rgba(129, 140, 248, 0.32)', glow: 'rgba(129, 140, 248, 0.18)', ink: '#b4bbfb' },
  // L11 AlphaFold — violet
  { fill: '#a855f7', soft: 'rgba(168, 85, 247, 0.32)', glow: 'rgba(168, 85, 247, 0.18)', ink: '#cd96fb' },
  // L12 Von Neumann — gold
  { fill: '#fbbf24', soft: 'rgba(251, 191, 36, 0.32)', glow: 'rgba(251, 191, 36, 0.18)', ink: '#fcd57c' },
];

// ════════════════════════════════════════════════════════════
// MOTION
// ════════════════════════════════════════════════════════════

export const EASE = {
  standard: 'power2.inOut',
  entrance: 'power3.out',
  exit: 'power2.in',
  elastic: 'back.out(1.7)',
} as const;

// ════════════════════════════════════════════════════════════
// TYPOGRAPHY (canvas / SVG numeric sizes — CSS uses --ts-* vars)
// ════════════════════════════════════════════════════════════

export const TYPE = {
  xs: 10,
  sm: 11,
  base: 12,
  md: 13,
  lg: 16,
  xl: 20,
  data: '12px JetBrains Mono, monospace',
  dataSm: '11px JetBrains Mono, monospace',
  label: '11px JetBrains Mono, monospace',
  body: '12px Inter, sans-serif',
} as const;

// ════════════════════════════════════════════════════════════
// DEPTH — drop-shadow strings (CSS) and SVG filter helpers
// ════════════════════════════════════════════════════════════

export const DEPTH = {
  sm: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
  md: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
  lg: 'drop-shadow(0 6px 18px rgba(0,0,0,0.5))',
} as const;

// ════════════════════════════════════════════════════════════
// METADATA
// ════════════════════════════════════════════════════════════

export const AS_OF = '2026-05';

// ════════════════════════════════════════════════════════════
// REDUCED MOTION
// ════════════════════════════════════════════════════════════

export const REDUCED_MOTION = (() => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})();
