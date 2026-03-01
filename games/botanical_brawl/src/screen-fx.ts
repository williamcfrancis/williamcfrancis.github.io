const el = document.getElementById('screen-fx') as HTMLDivElement | null;

let flashOpacity = 0;
let vignetteIntensity = 0;

/** Trigger a brief red damage flash across the screen. */
export function flashDamage() {
  flashOpacity = Math.min(flashOpacity + 0.3, 0.6);
}

/** Trigger a dramatic white flash (boss kill, wave clear). */
export function flashImpact() {
  flashOpacity = 0.55;
}

/** Step screen effects each frame. Call from the game loop. */
export function updateScreenFx(hp: number, maxHp: number, dt60: number) {
  if (!el) return;

  // Decay flash
  if (flashOpacity > 0) {
    flashOpacity *= Math.pow(0.86, dt60);
    if (flashOpacity < 0.01) flashOpacity = 0;
  }

  // Low-health vignette (ramps up below 35% HP)
  const hpRatio = hp / maxHp;
  if (hpRatio < 0.35) {
    const pulse = 1 + Math.sin(performance.now() * 0.004) * 0.15;
    const target = (1 - hpRatio / 0.35) * 0.45 * pulse;
    vignetteIntensity += (target - vignetteIntensity) * 0.08;
  } else {
    vignetteIntensity *= 0.93;
    if (vignetteIntensity < 0.005) vignetteIntensity = 0;
  }

  const total = flashOpacity + vignetteIntensity;
  if (total < 0.005) {
    el.style.opacity = '0';
    return;
  }

  if (flashOpacity > vignetteIntensity) {
    el.style.background =
      `radial-gradient(ellipse at center, rgba(255,80,50,${flashOpacity * 0.6}) 0%, rgba(200,30,10,${flashOpacity}) 100%)`;
  } else {
    el.style.background =
      `radial-gradient(ellipse at center, transparent 35%, rgba(160,0,0,${vignetteIntensity}) 100%)`;
  }
  el.style.opacity = '1';
}

/** Reset all screen effects (game reset / quit). */
export function clearScreenFx() {
  flashOpacity = 0;
  vignetteIntensity = 0;
  if (el) el.style.opacity = '0';
}
