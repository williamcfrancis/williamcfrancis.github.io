const KEYS = {
  SCORES: 'bb_scores',
  GALLERY: 'bb_gallery',
  SETTINGS: 'bb_settings',
  TUTORIAL: 'bb_tutorial',
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function getHighScores() {
  return load(KEYS.SCORES, []);
}

export function saveHighScore(score, wave, kills) {
  const list = getHighScores();
  list.push({ score, wave, kills, date: Date.now() });
  list.sort((a, b) => b.score - a.score);
  save(KEYS.SCORES, list.slice(0, 5));
}

export function isNewBest(score) {
  const list = getHighScores();
  return list.length === 0 || score > list[0].score;
}

export function getWeaponGallery() {
  return load(KEYS.GALLERY, []);
}

export function saveWeaponToGallery(w) {
  const gal = getWeaponGallery();
  gal.unshift({
    name: w.name, speed: w.speed, damage: w.damage,
    scale: w.scale, bounces: w.bounces, rarity: w.rarity || 'common',
    spriteDataUrl: w.spriteDataUrl || null, timestamp: Date.now(),
  });
  save(KEYS.GALLERY, gal.slice(0, 50));
}

export function getSettings() {
  return load(KEYS.SETTINGS, { master: 0.7, sfx: 0.8, music: 0.5 });
}

export function saveSettings(s) {
  save(KEYS.SETTINGS, s);
}

export function hasSeenTutorial() {
  return load(KEYS.TUTORIAL, false);
}

export function markTutorialSeen() {
  save(KEYS.TUTORIAL, true);
}
