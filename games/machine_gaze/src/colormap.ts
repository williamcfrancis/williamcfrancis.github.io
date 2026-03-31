const STOPS: readonly [number, number, number, number][] = [
  [0.0, 0, 0, 4],
  [0.071, 10, 7, 46],
  [0.143, 31, 12, 72],
  [0.214, 57, 15, 97],
  [0.286, 85, 15, 109],
  [0.357, 114, 25, 107],
  [0.429, 143, 37, 100],
  [0.5, 171, 51, 86],
  [0.571, 197, 69, 67],
  [0.643, 220, 91, 45],
  [0.714, 239, 120, 19],
  [0.786, 249, 153, 9],
  [0.857, 252, 190, 35],
  [0.929, 250, 226, 76],
  [1.0, 252, 255, 164],
];

export function infernoColormap(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));

  let lo = 0;
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      lo = i - 1;
      break;
    }
    lo = i - 1;
  }

  const [t0, r0, g0, b0] = STOPS[lo];
  const hi = Math.min(lo + 1, STOPS.length - 1);
  const [t1, r1, g1, b1] = STOPS[hi];
  const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);

  return [
    Math.round(r0 + (r1 - r0) * f),
    Math.round(g0 + (g1 - g0) * f),
    Math.round(b0 + (b1 - b0) * f),
  ];
}
