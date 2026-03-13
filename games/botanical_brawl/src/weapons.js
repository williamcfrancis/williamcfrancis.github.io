import * as THREE from 'three';
import { shootSound, forgeCompleteSound, bounceSound } from './audio.js';
import { spawnTrail, spawnBurst, spawnShockwave } from './vfx.js';
import { saveWeaponToGallery } from './persistence.js';

// ── Rarity System ──

const RARITY_DEFS = {
  common:    { label: 'Common',    color: '#9E9E9E', hex: 0x9E9E9E, glow: 0 },
  uncommon:  { label: 'Uncommon',  color: '#4CAF50', hex: 0x4CAF50, glow: 0.15 },
  rare:      { label: 'Rare',      color: '#2196F3', hex: 0x2196F3, glow: 0.3 },
  legendary: { label: 'Legendary', color: '#FF9800', hex: 0xFF9800, glow: 0.5 },
};

export function computeRarity(weapon) {
  const score = (weapon.speed * 20) + (weapon.damage * 0.5) + (weapon.bounces * 30) + (weapon.scale * 10);
  if (score >= 120) return 'legendary';
  if (score >= 80) return 'rare';
  if (score >= 50) return 'uncommon';
  return 'common';
}

export function getRarityDef(rarity) {
  return RARITY_DEFS[rarity] || RARITY_DEFS.common;
}

// ── Default weapon factory ──

export function createDefaultWeapon() {
  return {
    speed: 1.0, damage: 40, scale: 1.0, bounces: 0,
    audioFreq: 520, audioType: 'sine',
    spriteTex: null, spriteDataUrl: null,
    name: 'Starter Orb', rarity: 'common',
    projColor: 0xFFD54F, projTrailColor: 0xFFA000, projShape: 'sphere',
  };
}

// ── Client-side weapon generation from description ──
// Each entry: { color, trail, freq, type, dmgMult, spdMult, scaleMult?, bounceAdd? }

const K = (color, trail, freq, type, dmgMult, spdMult, scaleMult, bounceAdd) =>
  ({ color, trail, freq, type, dmgMult, spdMult, scaleMult, bounceAdd });

const KEYWORD_MAP = {
  // ── Elements ──
  fire:       K(0xFF4500, 0xFF6B00, 380, 'sawtooth', 1.3, 0.8, 0, 0),
  flame:      K(0xFF4500, 0xFF6B00, 380, 'sawtooth', 1.3, 0.8, 0, 0),
  inferno:    K(0xFF2200, 0xFF4400, 300, 'sawtooth', 1.8, 0.6, 1.4, 0),
  blaze:      K(0xFF5500, 0xFF8800, 350, 'sawtooth', 1.5, 0.9, 0, 0),
  ember:      K(0xFF6633, 0xFF9944, 420, 'triangle', 1.1, 1.0, 0, 0),
  lava:       K(0xFF3300, 0xCC2200, 250, 'sawtooth', 2.0, 0.4, 1.8, 0),
  magma:      K(0xCC3300, 0x991100, 220, 'sawtooth', 2.2, 0.35, 2.0, 0),
  volcano:    K(0xDD2200, 0xAA1100, 200, 'sawtooth', 2.5, 0.3, 2.2, 0),
  scorch:     K(0xDD4400, 0xBB3300, 340, 'sawtooth', 1.4, 0.85, 0, 0),
  ice:        K(0x00BFFF, 0x87CEEB, 900, 'sine', 0.9, 1.3, 0, 0),
  frost:      K(0x00BFFF, 0x87CEEB, 900, 'sine', 0.9, 1.3, 0, 0),
  frozen:     K(0x00CED1, 0xADD8E6, 950, 'sine', 1.0, 1.1, 1.3, 0),
  blizzard:   K(0xB0E0E6, 0xE0F7FA, 1000, 'sine', 0.7, 1.6, 0, 2),
  glacial:    K(0x4DD0E1, 0x80DEEA, 880, 'sine', 1.3, 0.7, 1.5, 0),
  arctic:     K(0x00ACC1, 0x4DD0E1, 920, 'sine', 1.1, 1.0, 0, 0),
  snowball:   K(0xFFFFFF, 0xE0F7FA, 800, 'sine', 0.5, 1.2, 1.3, 2),
  snow:       K(0xF5F5F5, 0xE0F7FA, 850, 'sine', 0.6, 1.1, 0, 1),
  hail:       K(0xCFD8DC, 0xECEFF1, 750, 'triangle', 0.8, 1.4, 0.8, 3),
  lightning:  K(0xFFFF00, 0xFFF176, 1100, 'triangle', 1.1, 1.5, 0, 0),
  thunder:    K(0xFFFF00, 0xFFF176, 1100, 'triangle', 1.1, 1.5, 0, 0),
  electric:   K(0xFFFF00, 0xFFF176, 1100, 'triangle', 1.1, 1.5, 0, 0),
  bolt:       K(0xFFEA00, 0xFFFF8D, 1050, 'triangle', 1.3, 2.0, 0.6, 0),
  spark:      K(0xFFD600, 0xFFFF00, 1000, 'triangle', 0.7, 2.5, 0.5, 0),
  static:     K(0xC6FF00, 0xEEFF41, 980, 'triangle', 0.6, 2.0, 0, 1),
  shock:      K(0xFFFF00, 0xFFFF8D, 1080, 'triangle', 1.0, 1.8, 0, 0),
  zap:        K(0xFFFF00, 0xEEFF41, 1150, 'triangle', 0.8, 3.0, 0.5, 0),
  water:      K(0x2196F3, 0x64B5F6, 500, 'sine', 0.8, 1.0, 0, 0),
  wave:       K(0x1976D2, 0x42A5F5, 480, 'sine', 0.9, 1.1, 1.3, 0),
  ocean:      K(0x0D47A1, 0x1565C0, 400, 'sine', 1.1, 0.8, 1.5, 0),
  tidal:      K(0x0277BD, 0x0288D1, 420, 'sine', 1.3, 0.7, 1.8, 0),
  splash:     K(0x29B6F6, 0x81D4FA, 600, 'sine', 0.6, 1.3, 0, 2),
  rain:       K(0x4FC3F7, 0x81D4FA, 650, 'sine', 0.4, 2.5, 0.5, 0),
  tsunami:    K(0x01579B, 0x0277BD, 280, 'sawtooth', 2.5, 0.4, 2.5, 0),
  steam:      K(0xB0BEC5, 0xCFD8DC, 700, 'sine', 0.7, 1.3, 0, 0),
  earth:      K(0x795548, 0x5D4037, 250, 'triangle', 1.5, 0.5, 1.6, 0),
  rock:       K(0x8D6E63, 0x6D4C41, 230, 'triangle', 1.6, 0.45, 1.7, 0),
  stone:      K(0x9E9E9E, 0x757575, 240, 'triangle', 1.5, 0.5, 1.5, 0),
  boulder:    K(0x6D4C41, 0x4E342E, 180, 'triangle', 2.5, 0.25, 3.0, 0),
  sand:       K(0xFFD54F, 0xFFCA28, 550, 'sine', 0.6, 1.5, 0, 3),
  dust:       K(0xBCAAA4, 0xA1887F, 600, 'sine', 0.4, 1.8, 0, 2),
  mud:        K(0x6D4C41, 0x5D4037, 280, 'triangle', 0.9, 0.7, 1.3, 0),
  crystal:    K(0xE040FB, 0xCE93D8, 750, 'sine', 1.2, 1.0, 0, 0),
  quartz:     K(0xF8BBD0, 0xF48FB1, 780, 'sine', 1.1, 1.1, 0, 0),
  wind:       K(0xB2EBF2, 0xE0F7FA, 850, 'sine', 0.5, 2.5, 0, 0),
  gust:       K(0xB2EBF2, 0xE0F7FA, 900, 'sine', 0.4, 3.0, 0, 0),
  tornado:    K(0x78909C, 0x90A4AE, 350, 'sawtooth', 1.2, 1.5, 1.4, 2),
  cyclone:    K(0x607D8B, 0x78909C, 320, 'sawtooth', 1.4, 1.3, 1.5, 3),
  hurricane:  K(0x455A64, 0x607D8B, 280, 'sawtooth', 1.8, 1.0, 2.0, 2),

  // ── Light/Dark ──
  dark:       K(0x6A0DAD, 0x9C27B0, 250, 'sawtooth', 1.5, 0.6, 0, 0),
  shadow:     K(0x6A0DAD, 0x9C27B0, 250, 'sawtooth', 1.5, 0.6, 0, 0),
  void:       K(0x1A0033, 0x4A0080, 200, 'sawtooth', 2.0, 0.5, 1.5, 0),
  abyss:      K(0x0D0020, 0x2E0060, 180, 'sawtooth', 2.2, 0.4, 1.7, 0),
  nightmare:  K(0x2C003E, 0x550077, 220, 'sawtooth', 1.8, 0.7, 1.3, 0),
  demon:      K(0x880000, 0xCC0000, 200, 'sawtooth', 2.0, 0.6, 1.4, 0),
  devil:      K(0xAA0000, 0xDD2200, 210, 'sawtooth', 1.9, 0.65, 1.3, 0),
  hell:       K(0xBB0000, 0xFF2200, 190, 'sawtooth', 2.3, 0.5, 1.5, 0),
  cursed:     K(0x4A0072, 0x7B1FA2, 280, 'sawtooth', 1.7, 0.7, 0, 0),
  light:      K(0xFFFFE0, 0xFFF9C4, 800, 'sine', 1.0, 1.4, 0, 0),
  holy:       K(0xFFFFE0, 0xFFF9C4, 800, 'sine', 1.2, 1.1, 0, 0),
  divine:     K(0xFFF8E1, 0xFFECB3, 850, 'sine', 1.4, 1.0, 1.2, 0),
  angel:      K(0xFFFFFF, 0xFFF9C4, 900, 'sine', 1.3, 1.2, 0, 0),
  celestial:  K(0xFFF3E0, 0xFFE0B2, 880, 'sine', 1.3, 1.15, 0, 0),
  radiant:    K(0xFFFF8D, 0xFFFF00, 950, 'sine', 1.1, 1.5, 0, 0),
  solar:      K(0xFFD600, 0xFFAB00, 700, 'sine', 1.5, 1.0, 1.3, 0),
  sun:        K(0xFFD600, 0xFFAB00, 700, 'sine', 1.5, 1.0, 1.3, 0),
  lunar:      K(0xC5CAE9, 0x9FA8DA, 650, 'sine', 1.0, 1.1, 0, 1),
  moon:       K(0xC5CAE9, 0x9FA8DA, 650, 'sine', 1.0, 1.1, 0, 1),
  cosmic:     K(0x311B92, 0x6200EA, 500, 'sine', 1.4, 1.2, 0, 1),
  galaxy:     K(0x4A148C, 0x7C4DFF, 520, 'sine', 1.3, 1.3, 0, 2),
  nebula:     K(0xAA00FF, 0xD500F9, 540, 'sine', 1.1, 1.2, 1.3, 1),
  stellar:    K(0xFFD740, 0xFFAB40, 680, 'sine', 1.2, 1.3, 0, 0),

  // ── Nature/Bio ──
  poison:     K(0x76FF03, 0x33691E, 300, 'triangle', 1.4, 0.7, 0, 0),
  toxic:      K(0x76FF03, 0x33691E, 300, 'triangle', 1.4, 0.7, 0, 0),
  venom:      K(0x64DD17, 0x1B5E20, 320, 'triangle', 1.5, 0.65, 0, 0),
  acid:       K(0xAEEA00, 0x76FF03, 350, 'triangle', 1.3, 0.8, 0, 0),
  nature:     K(0x4CAF50, 0x81C784, 450, 'triangle', 1.0, 1.0, 0, 0),
  leaf:       K(0x66BB6A, 0xA5D6A7, 500, 'sine', 0.7, 1.3, 0, 1),
  vine:       K(0x2E7D32, 0x43A047, 400, 'triangle', 0.9, 0.9, 0, 0),
  thorn:      K(0x33691E, 0x558B2F, 380, 'triangle', 1.3, 1.0, 0.8, 0),
  flower:     K(0xFF69B4, 0xFFB7C5, 550, 'sine', 0.8, 1.2, 0, 1),
  rose:       K(0xE91E63, 0xF06292, 520, 'sine', 1.0, 1.0, 0, 0),
  petal:      K(0xF8BBD0, 0xF48FB1, 580, 'sine', 0.6, 1.4, 0, 2),
  seed:       K(0x8D6E63, 0xA1887F, 400, 'triangle', 0.7, 1.5, 0.7, 0),
  mushroom:   K(0xE53935, 0xEF5350, 380, 'sine', 0.8, 0.8, 1.2, 0),
  spore:      K(0xC0CA33, 0xD4E157, 450, 'sine', 0.5, 1.5, 0.6, 3),
  tree:       K(0x4CAF50, 0x2E7D32, 300, 'triangle', 1.5, 0.5, 2.0, 0),
  root:       K(0x5D4037, 0x795548, 280, 'triangle', 1.2, 0.6, 1.3, 0),
  bamboo:     K(0x7CB342, 0x9CCC65, 500, 'triangle', 1.0, 1.5, 0.7, 0),
  cactus:     K(0x388E3C, 0x4CAF50, 350, 'triangle', 1.3, 0.8, 0, 0),
  moss:       K(0x558B2F, 0x7CB342, 420, 'sine', 0.7, 0.9, 0, 0),

  // ── Animals ──
  dragon:     K(0xFF3D00, 0xDD2C00, 250, 'sawtooth', 2.5, 0.5, 1.8, 0),
  phoenix:    K(0xFF6D00, 0xFF9100, 380, 'sawtooth', 2.0, 0.8, 1.5, 0),
  serpent:    K(0x2E7D32, 0x388E3C, 320, 'triangle', 1.3, 1.2, 0.8, 0),
  snake:      K(0x388E3C, 0x4CAF50, 340, 'triangle', 1.2, 1.3, 0.7, 0),
  wolf:       K(0x78909C, 0x90A4AE, 300, 'triangle', 1.3, 1.5, 0, 0),
  bear:       K(0x5D4037, 0x795548, 220, 'triangle', 2.0, 0.5, 2.0, 0),
  eagle:      K(0xFFB300, 0xFFC107, 700, 'sine', 1.0, 2.0, 0.7, 0),
  hawk:       K(0xFF8F00, 0xFFA000, 720, 'sine', 1.1, 2.2, 0.7, 0),
  falcon:     K(0xF57F17, 0xFBC02D, 750, 'sine', 0.9, 2.5, 0.6, 0),
  shark:      K(0x455A64, 0x546E7A, 280, 'triangle', 1.8, 1.0, 1.3, 0),
  whale:      K(0x1565C0, 0x1976D2, 180, 'triangle', 2.5, 0.3, 3.5, 0),
  spider:     K(0x212121, 0x424242, 350, 'triangle', 1.0, 1.5, 0, 2),
  scorpion:   K(0x6D4C41, 0x4E342E, 300, 'triangle', 1.4, 1.0, 0, 0),
  bat:        K(0x37474F, 0x455A64, 400, 'triangle', 0.7, 2.0, 0.7, 1),
  cat:        K(0xFF8A65, 0xFFAB91, 650, 'sine', 0.8, 1.8, 0.8, 0),
  kitten:     K(0xFFAB91, 0xFFCCBC, 700, 'sine', 0.5, 2.0, 0.6, 1),
  dog:        K(0xA1887F, 0xBCAAA4, 500, 'sine', 1.0, 1.3, 0, 0),
  puppy:      K(0xBCAAA4, 0xD7CCC8, 550, 'sine', 0.7, 1.5, 0.8, 1),
  bunny:      K(0xFFCDD2, 0xEF9A9A, 650, 'sine', 0.5, 2.0, 0.7, 3),
  rabbit:     K(0xFFCDD2, 0xEF9A9A, 650, 'sine', 0.5, 2.0, 0.7, 3),
  duck:       K(0xFFEB3B, 0xFFF176, 500, 'sine', 0.7, 1.0, 1.2, 2),
  chicken:    K(0xFFFFFF, 0xFFECB3, 580, 'sine', 0.6, 1.2, 1.0, 1),
  frog:       K(0x4CAF50, 0x66BB6A, 450, 'sine', 0.8, 1.4, 0, 2),
  bee:        K(0xFFC107, 0xFFEB3B, 800, 'triangle', 0.6, 2.5, 0.5, 0),
  wasp:       K(0xFFB300, 0xFFD54F, 850, 'triangle', 0.8, 2.2, 0.5, 0),
  butterfly:  K(0xAB47BC, 0xCE93D8, 700, 'sine', 0.4, 1.8, 0, 3),
  unicorn:    K(0xFF80AB, 0xF48FB1, 750, 'sine', 1.2, 1.3, 0, 2),
  pegasus:    K(0xE1BEE7, 0xCE93D8, 780, 'sine', 1.0, 1.8, 0, 1),
  turtle:     K(0x4CAF50, 0x388E3C, 280, 'triangle', 1.5, 0.3, 2.0, 0),
  snail:      K(0x8D6E63, 0xA1887F, 300, 'sine', 0.5, 0.3, 0.8, 0),
  octopus:    K(0x7B1FA2, 0xAB47BC, 350, 'sine', 1.0, 1.0, 1.2, 3),
  squid:      K(0x880E4F, 0xAD1457, 370, 'sine', 0.9, 1.1, 0, 2),
  jellyfish:  K(0xE040FB, 0xEA80FC, 600, 'sine', 0.6, 0.8, 1.0, 0),
  crab:       K(0xE64A19, 0xFF5722, 350, 'triangle', 1.1, 0.8, 0, 1),
  penguin:    K(0x263238, 0xFFFFFF, 500, 'sine', 0.8, 1.0, 0, 1),
  dinosaur:   K(0x4CAF50, 0x388E3C, 200, 'sawtooth', 2.5, 0.4, 2.5, 0),
  trex:       K(0x33691E, 0x1B5E20, 180, 'sawtooth', 3.0, 0.3, 3.0, 0),

  // ── Food & Drinks ──
  cupcake:    K(0xFF80AB, 0xF48FB1, 600, 'sine', 0.9, 0.9, 1.3, 0),
  cake:       K(0xFFCDD2, 0xF8BBD0, 550, 'sine', 1.0, 0.8, 1.5, 0),
  cookie:     K(0xD2691E, 0xCD853F, 500, 'sine', 0.8, 1.0, 1.1, 0),
  donut:      K(0xFF69B4, 0xFFB7C5, 520, 'sine', 0.7, 1.0, 1.2, 2),
  pizza:      K(0xFF6F00, 0xFF8F00, 400, 'triangle', 1.0, 1.0, 1.4, 0),
  burger:     K(0x8D6E63, 0xA1887F, 350, 'triangle', 1.2, 0.8, 1.5, 0),
  hotdog:     K(0xFF5722, 0xFF8A65, 420, 'triangle', 0.9, 1.1, 1.2, 0),
  taco:       K(0xFFB300, 0xFFC107, 450, 'triangle', 1.0, 1.0, 1.1, 0),
  sushi:      K(0xFFFFFF, 0xEF5350, 550, 'sine', 0.8, 1.3, 0.9, 0),
  candy:      K(0xFF4081, 0xFF80AB, 700, 'sine', 0.6, 1.5, 0.8, 2),
  chocolate:  K(0x5D4037, 0x795548, 400, 'sine', 1.0, 0.9, 1.2, 0),
  lollipop:   K(0xE040FB, 0xEA80FC, 650, 'sine', 0.7, 1.2, 1.0, 1),
  gummy:      K(0xFF5252, 0xFF8A80, 600, 'sine', 0.5, 1.0, 1.0, 3),
  cheese:     K(0xFFC107, 0xFFD54F, 480, 'sine', 0.8, 1.0, 1.2, 0),
  watermelon: K(0x4CAF50, 0xE91E63, 380, 'triangle', 1.3, 0.7, 1.8, 0),
  melon:      K(0x66BB6A, 0x81C784, 400, 'sine', 1.1, 0.8, 1.5, 0),
  apple:      K(0xF44336, 0xEF5350, 450, 'sine', 0.9, 1.0, 1.0, 0),
  banana:     K(0xFFEB3B, 0xFFF176, 500, 'sine', 0.7, 1.2, 1.0, 2),
  orange:     K(0xFF9800, 0xFFB74D, 480, 'sine', 0.8, 1.1, 1.1, 0),
  lemon:      K(0xFFFF00, 0xFFFF8D, 650, 'sine', 0.7, 1.3, 0.9, 0),
  grape:      K(0x7B1FA2, 0xAB47BC, 550, 'sine', 0.6, 1.2, 0, 2),
  strawberry: K(0xE91E63, 0xF06292, 580, 'sine', 0.7, 1.1, 0.9, 0),
  cherry:     K(0xC62828, 0xEF5350, 600, 'sine', 0.8, 1.3, 0.8, 0),
  coconut:    K(0x8D6E63, 0xFFFFFF, 400, 'triangle', 1.0, 0.9, 1.3, 1),
  pineapple:  K(0xFFC107, 0xFFEB3B, 480, 'triangle', 1.1, 1.0, 1.2, 0),
  pepper:     K(0xFF1744, 0xFF5252, 350, 'triangle', 1.5, 1.2, 0.8, 0),
  chili:      K(0xDD2C00, 0xFF3D00, 330, 'triangle', 1.6, 1.1, 0.8, 0),
  egg:        K(0xFFFFFF, 0xFFF9C4, 500, 'sine', 0.8, 1.0, 1.1, 1),
  pancake:    K(0xFFCA28, 0xFFD54F, 450, 'sine', 0.7, 0.9, 1.5, 0),
  waffle:     K(0xFFA000, 0xFFB300, 440, 'sine', 0.8, 0.9, 1.3, 0),
  popcorn:    K(0xFFF9C4, 0xFFEB3B, 700, 'sine', 0.4, 2.5, 0.5, 3),
  coffee:     K(0x4E342E, 0x6D4C41, 350, 'triangle', 1.0, 1.5, 0, 0),
  tea:        K(0x689F38, 0x8BC34A, 550, 'sine', 0.7, 1.2, 0, 0),
  soda:       K(0x795548, 0xA1887F, 600, 'sine', 0.6, 1.3, 0, 2),
  juice:      K(0xFF9800, 0xFFB74D, 580, 'sine', 0.7, 1.2, 0, 0),
  milk:       K(0xFFFFFF, 0xFAFAFA, 500, 'sine', 0.6, 1.0, 0, 0),
  honey:      K(0xFFA000, 0xFFCA28, 400, 'sine', 0.8, 0.7, 1.3, 0),
  ice_cream:  K(0xFCE4EC, 0xF8BBD0, 600, 'sine', 0.7, 1.0, 1.2, 0),

  // ── Weapons & Combat ──
  sword:      K(0xB0BEC5, 0xCFD8DC, 400, 'triangle', 1.5, 2.0, 0.8, 0),
  blade:      K(0xB0BEC5, 0xECEFF1, 420, 'triangle', 1.4, 2.0, 0.7, 0),
  katana:     K(0xCFD8DC, 0xECEFF1, 500, 'triangle', 1.6, 2.5, 0.6, 0),
  dagger:     K(0x90A4AE, 0xB0BEC5, 550, 'triangle', 1.0, 3.0, 0.5, 0),
  knife:      K(0x90A4AE, 0xB0BEC5, 550, 'triangle', 0.9, 3.0, 0.5, 0),
  axe:        K(0x757575, 0x9E9E9E, 280, 'triangle', 2.0, 0.7, 1.5, 0),
  hammer:     K(0x616161, 0x757575, 200, 'triangle', 2.5, 0.4, 2.0, 0),
  mace:       K(0x424242, 0x616161, 250, 'triangle', 2.0, 0.5, 1.7, 0),
  spear:      K(0x8D6E63, 0xB0BEC5, 480, 'triangle', 1.3, 2.0, 0.7, 0),
  lance:      K(0x8D6E63, 0xB0BEC5, 480, 'triangle', 1.4, 1.8, 0.7, 0),
  bow:        K(0x8D6E63, 0xA1887F, 600, 'sine', 1.0, 2.0, 0.6, 0),
  arrow:      K(0x5D4037, 0x8D6E63, 650, 'sine', 1.1, 2.5, 0.5, 0),
  crossbow:   K(0x5D4037, 0x795548, 550, 'triangle', 1.3, 2.0, 0.6, 0),
  wand:       K(0xAA00FF, 0xD500F9, 700, 'sine', 1.0, 1.3, 0, 0),
  staff:      K(0x7B1FA2, 0xAB47BC, 650, 'sine', 1.2, 1.0, 0, 0),
  scepter:    K(0xFFD600, 0xFFAB00, 680, 'sine', 1.3, 1.0, 0, 0),
  trident:    K(0x0097A7, 0x00BCD4, 400, 'triangle', 1.5, 1.2, 0, 0),
  whip:       K(0x5D4037, 0x795548, 500, 'triangle', 0.8, 2.0, 0, 0),
  shield:     K(0x616161, 0x9E9E9E, 300, 'triangle', 0.5, 0.5, 2.5, 0),
  boomerang:  K(0x795548, 0xA1887F, 500, 'triangle', 0.8, 1.5, 0.8, 5),
  shuriken:   K(0x757575, 0xB0BEC5, 650, 'triangle', 0.7, 2.5, 0.6, 3),
  bomb:       K(0x212121, 0x424242, 220, 'sawtooth', 3.0, 0.4, 2.0, 0),
  grenade:    K(0x33691E, 0x424242, 240, 'sawtooth', 2.5, 0.5, 1.5, 0),
  dynamite:   K(0xFF3D00, 0xFF6E40, 200, 'sawtooth', 3.0, 0.3, 1.8, 0),
  nuke:       K(0xFFFF00, 0xFF3D00, 150, 'sawtooth', 5.0, 0.2, 4.0, 0),

  // ── Guns ──
  gun:        K(0x424242, 0x757575, 400, 'triangle', 1.0, 1.5, 0, 0),
  pistol:     K(0x616161, 0x9E9E9E, 500, 'triangle', 0.8, 2.0, 0, 0),
  rifle:      K(0x5D4037, 0x8D6E63, 450, 'triangle', 1.3, 2.0, 0, 0),
  sniper:     K(0x00E676, 0x69F0AE, 1000, 'triangle', 2.0, 2.5, 0.6, 0),
  shotgun:    K(0xFF6F00, 0xFFA726, 280, 'sawtooth', 1.0, 0.4, 0.5, 0),
  cannon:     K(0x424242, 0x757575, 180, 'triangle', 2.5, 0.3, 2.5, 0),
  turret:     K(0x616161, 0x757575, 350, 'triangle', 1.0, 3.0, 0, 0),
  minigun:    K(0x757575, 0x9E9E9E, 900, 'triangle', 0.3, 4.5, 0.5, 0),
  gatling:    K(0x757575, 0x9E9E9E, 900, 'triangle', 0.3, 4.5, 0.5, 0),
  rocket:     K(0xFF5722, 0xFF8A65, 220, 'sawtooth', 3.0, 0.3, 1.4, 0),
  missile:    K(0xFF5722, 0xFF8A65, 220, 'sawtooth', 3.0, 0.3, 1.4, 0),
  bazooka:    K(0x4E342E, 0xFF5722, 200, 'sawtooth', 3.5, 0.25, 1.6, 0),
  laser:      K(0xFF0000, 0xFF5252, 950, 'sine', 1.5, 3.0, 0.5, 0),
  beam:       K(0x00E5FF, 0x18FFFF, 980, 'sine', 1.3, 3.0, 0.4, 0),
  ray:        K(0x76FF03, 0xB2FF59, 900, 'sine', 1.2, 2.5, 0.5, 0),
  plasma:     K(0x00BFA5, 0x64FFDA, 800, 'sine', 1.4, 1.5, 0, 0),
  railgun:    K(0x2962FF, 0x448AFF, 1100, 'triangle', 3.0, 3.0, 0.4, 0),
  blaster:    K(0xFF1744, 0xFF5252, 700, 'triangle', 1.0, 2.0, 0, 0),
  phaser:     K(0xD500F9, 0xE040FB, 750, 'sine', 0.9, 2.5, 0, 0),

  // ── Magic ──
  magic:      K(0xAA00FF, 0xD500F9, 700, 'sine', 1.2, 1.1, 0, 0),
  spell:      K(0x7C4DFF, 0xB388FF, 680, 'sine', 1.1, 1.2, 0, 0),
  enchant:    K(0x651FFF, 0x7C4DFF, 720, 'sine', 1.2, 1.1, 0, 1),
  arcane:     K(0x6200EA, 0xB388FF, 650, 'sine', 1.4, 1.0, 0, 0),
  mystic:     K(0x304FFE, 0x536DFE, 600, 'sine', 1.3, 1.0, 0, 0),
  sorcery:    K(0x6A1B9A, 0x9C27B0, 580, 'sine', 1.5, 0.9, 0, 0),
  wizard:     K(0x4A148C, 0x7B1FA2, 600, 'sine', 1.3, 1.1, 0, 0),
  witch:      K(0x880E4F, 0xAD1457, 550, 'sine', 1.2, 1.0, 0, 0),
  hex:        K(0x4A148C, 0x880E4F, 400, 'sawtooth', 1.3, 0.8, 0, 0),
  rune:       K(0x1A237E, 0x283593, 500, 'sine', 1.2, 1.0, 0, 0),
  potion:     K(0x76FF03, 0xB2FF59, 550, 'sine', 1.0, 1.0, 1.0, 0),
  elixir:     K(0xFFD600, 0xFFAB00, 620, 'sine', 1.3, 1.0, 0, 0),
  portal:     K(0x6200EA, 0xB388FF, 500, 'sine', 1.0, 1.5, 0, 2),
  teleport:   K(0x651FFF, 0xB388FF, 800, 'sine', 0.5, 3.5, 0.5, 0),

  // ── Materials ──
  gold:       K(0xFFD700, 0xFFC107, 500, 'sine', 1.3, 0.9, 1.2, 0),
  golden:     K(0xFFD700, 0xFFC107, 500, 'sine', 1.3, 0.9, 1.2, 0),
  silver:     K(0xC0C0C0, 0xE0E0E0, 600, 'sine', 1.1, 1.1, 0, 0),
  bronze:     K(0xCD7F32, 0xB87333, 450, 'triangle', 1.0, 1.0, 1.1, 0),
  copper:     K(0xB87333, 0xDA8A67, 430, 'triangle', 0.9, 1.0, 0, 0),
  iron:       K(0x808080, 0xA0A0A0, 350, 'triangle', 1.5, 0.7, 1.3, 0),
  steel:      K(0xB0BEC5, 0xCFD8DC, 380, 'triangle', 1.5, 1.0, 1.1, 0),
  titanium:   K(0xE0E0E0, 0xFAFAFA, 400, 'triangle', 1.8, 1.2, 1.0, 0),
  diamond:    K(0xB3E5FC, 0xE1F5FE, 900, 'sine', 2.0, 1.0, 0.8, 0),
  emerald:    K(0x00C853, 0x69F0AE, 750, 'sine', 1.5, 1.0, 0.9, 0),
  ruby:       K(0xD50000, 0xFF1744, 700, 'sine', 1.5, 1.0, 0.9, 0),
  sapphire:   K(0x2962FF, 0x448AFF, 720, 'sine', 1.4, 1.1, 0.9, 0),
  amethyst:   K(0x7C4DFF, 0xB388FF, 680, 'sine', 1.3, 1.1, 0.9, 0),
  obsidian:   K(0x212121, 0x424242, 250, 'sawtooth', 1.8, 0.6, 1.3, 0),
  glass:      K(0xE0F7FA, 0xB2EBF2, 800, 'sine', 0.7, 1.5, 0, 1),
  wood:       K(0x8D6E63, 0xA1887F, 350, 'triangle', 0.8, 1.0, 1.1, 0),
  rubber:     K(0xFF69B4, 0xFFB7C5, 600, 'sine', 0.7, 1.0, 0, 2),
  plastic:    K(0xFF80AB, 0xF48FB1, 650, 'sine', 0.5, 1.3, 0, 1),
  paper:      K(0xFAFAFA, 0xF5F5F5, 700, 'sine', 0.3, 2.0, 0.5, 0),
  slime:      K(0x76FF03, 0xB2FF59, 350, 'sine', 0.6, 0.8, 1.3, 0),
  goo:        K(0x00E676, 0x69F0AE, 320, 'sine', 0.7, 0.7, 1.4, 0),
  jelly:      K(0xE040FB, 0xEA80FC, 450, 'sine', 0.5, 1.0, 1.2, 3),

  // ── Size/Speed Modifiers ──
  tiny:       K(0xFF80AB, 0xFF4081, 1100, 'sine', 0.3, 4.0, 0.5, 0),
  small:      K(0xFFAB91, 0xFF8A65, 900, 'sine', 0.5, 2.5, 0.6, 0),
  mini:       K(0xF48FB1, 0xF06292, 950, 'sine', 0.4, 3.0, 0.5, 0),
  micro:      K(0xCE93D8, 0xBA68C8, 1050, 'sine', 0.3, 4.0, 0.4, 0),
  big:        K(0xFF6E40, 0xFF3D00, 300, 'triangle', 1.8, 0.6, 1.8, 0),
  large:      K(0xFF6E40, 0xFF3D00, 280, 'triangle', 2.0, 0.5, 2.0, 0),
  huge:       K(0xDD2C00, 0xBF360C, 250, 'triangle', 2.2, 0.4, 2.3, 0),
  giant:      K(0x795548, 0x5D4037, 160, 'triangle', 2.5, 0.3, 3.0, 0),
  massive:    K(0x4E342E, 0x3E2723, 150, 'triangle', 3.0, 0.25, 3.5, 0),
  mega:       K(0xFF1744, 0xD50000, 200, 'sawtooth', 2.5, 0.5, 2.5, 0),
  ultra:      K(0x6200EA, 0xAA00FF, 250, 'sawtooth', 2.0, 1.5, 1.5, 0),
  super:      K(0x2979FF, 0x448AFF, 600, 'triangle', 1.5, 1.5, 1.3, 0),
  hyper:      K(0x00E5FF, 0x18FFFF, 900, 'triangle', 1.0, 3.0, 0, 0),
  turbo:      K(0xFF9100, 0xFFAB00, 850, 'triangle', 0.8, 3.5, 0, 0),
  rapid:      K(0xFFEB3B, 0xFFF176, 850, 'triangle', 0.4, 3.5, 0, 0),
  fast:       K(0x00E676, 0x69F0AE, 800, 'triangle', 0.6, 2.5, 0, 0),
  quick:      K(0x00E676, 0x69F0AE, 800, 'triangle', 0.6, 2.5, 0, 0),
  swift:      K(0x00BCD4, 0x4DD0E1, 750, 'sine', 0.7, 2.5, 0.7, 0),
  slow:       K(0x795548, 0x8D6E63, 250, 'triangle', 1.8, 0.4, 1.5, 0),
  heavy:      K(0x795548, 0x8D6E63, 200, 'triangle', 2.0, 0.4, 2.0, 0),
  machine:    K(0xFFEB3B, 0xFFF176, 850, 'triangle', 0.4, 3.0, 0, 0),

  // ── Adjectives & Moods ──
  rainbow:    K(0xFF69B4, 0x9C27B0, 650, 'sine', 1.0, 1.2, 0, 2),
  sparkle:    K(0xFFD600, 0xFFFF00, 800, 'sine', 0.8, 1.5, 0, 1),
  sparkly:    K(0xFFD600, 0xFFFF00, 800, 'sine', 0.8, 1.5, 0, 1),
  glitter:    K(0xFFC107, 0xFFD54F, 750, 'sine', 0.7, 1.4, 0, 2),
  shiny:      K(0xFFFFFF, 0xE0E0E0, 700, 'sine', 0.9, 1.2, 0, 0),
  glow:       K(0x69F0AE, 0xB9F6CA, 650, 'sine', 0.8, 1.0, 0, 0),
  neon:       K(0x00E5FF, 0x18FFFF, 850, 'sine', 0.9, 1.5, 0, 0),
  fluffy:     K(0xFFCDD2, 0xF8BBD0, 600, 'sine', 0.4, 1.0, 1.5, 2),
  fuzzy:      K(0xFFAB91, 0xFFCCBC, 550, 'sine', 0.5, 1.0, 1.3, 1),
  soft:       K(0xF8BBD0, 0xFCE4EC, 500, 'sine', 0.4, 1.0, 1.2, 1),
  sharp:      K(0xB0BEC5, 0xECEFF1, 700, 'triangle', 1.5, 2.0, 0.6, 0),
  spiky:      K(0x757575, 0xB0BEC5, 600, 'triangle', 1.3, 1.5, 0.8, 0),
  deadly:     K(0xB71C1C, 0xD32F2F, 300, 'sawtooth', 2.0, 1.0, 1.2, 0),
  lethal:     K(0x880E4F, 0xC2185B, 280, 'sawtooth', 2.2, 1.0, 1.1, 0),
  powerful:   K(0xFF3D00, 0xFF6E40, 250, 'sawtooth', 2.0, 0.7, 1.5, 0),
  strong:     K(0xDD2C00, 0xFF3D00, 260, 'triangle', 1.8, 0.6, 1.4, 0),
  weak:       K(0xBDBDBD, 0xE0E0E0, 600, 'sine', 0.3, 1.5, 0.6, 0),
  crazy:      K(0xFF1744, 0xF50057, 700, 'sawtooth', 1.3, 1.8, 0, 3),
  chaos:      K(0xFF3D00, 0xDD2C00, 350, 'sawtooth', 1.5, 1.5, 0, 4),
  chaotic:    K(0xFF3D00, 0xDD2C00, 350, 'sawtooth', 1.5, 1.5, 0, 4),
  random:     K(0xE040FB, 0x7C4DFF, 500, 'sine', 1.0, 1.5, 0, 3),
  wild:       K(0x00C853, 0x69F0AE, 550, 'triangle', 1.2, 1.3, 0, 2),
  gentle:     K(0xB2EBF2, 0xE0F7FA, 700, 'sine', 0.5, 1.0, 0, 0),
  calm:       K(0xB2DFDB, 0xE0F2F1, 650, 'sine', 0.6, 0.8, 0, 0),
  angry:      K(0xD50000, 0xFF1744, 300, 'sawtooth', 1.8, 1.3, 1.2, 0),
  furious:    K(0xB71C1C, 0xD50000, 250, 'sawtooth', 2.0, 1.5, 1.3, 0),
  love:       K(0xFF4081, 0xFF80AB, 650, 'sine', 0.7, 1.0, 0, 1),
  cute:       K(0xFF80AB, 0xFFCDD2, 700, 'sine', 0.5, 1.2, 0.8, 1),
  kawaii:     K(0xF48FB1, 0xF8BBD0, 750, 'sine', 0.4, 1.3, 0.7, 2),
  scary:      K(0x212121, 0x424242, 200, 'sawtooth', 1.5, 0.8, 1.3, 0),
  spooky:     K(0x4A148C, 0x6A1B9A, 250, 'sawtooth', 1.2, 1.0, 0, 0),
  ghost:      K(0xE0E0E0, 0xFAFAFA, 500, 'sine', 0.8, 1.5, 0, 2),
  invisible:  K(0xE0E0E0, 0xFAFAFA, 800, 'sine', 0.6, 2.5, 0.5, 0),
  stealth:    K(0x37474F, 0x455A64, 700, 'sine', 1.0, 2.5, 0.5, 0),
  ancient:    K(0x8D6E63, 0xA1887F, 300, 'triangle', 1.5, 0.7, 1.3, 0),
  legendary:  K(0xFFD600, 0xFFAB00, 500, 'sine', 2.0, 1.5, 1.5, 2),
  epic:       K(0x6200EA, 0xAA00FF, 550, 'sine', 1.8, 1.3, 1.3, 1),
  mythic:     K(0xD500F9, 0xE040FB, 520, 'sine', 2.0, 1.2, 1.4, 1),
  royal:      K(0x7B1FA2, 0xFFD600, 600, 'sine', 1.5, 1.0, 1.2, 0),
  enchanted:  K(0x651FFF, 0xB388FF, 680, 'sine', 1.3, 1.2, 0, 1),

  // ── Bouncy stuff ──
  bouncy:     K(0xFF69B4, 0xFFB7C5, 600, 'sine', 0.7, 1.0, 0, 3),
  bounce:     K(0xFF69B4, 0xFFB7C5, 600, 'sine', 0.7, 1.0, 0, 3),
  ricochet:   K(0xB0BEC5, 0xCFD8DC, 700, 'triangle', 0.8, 1.5, 0, 4),
  ping:       K(0x81D4FA, 0xB3E5FC, 900, 'sine', 0.5, 2.0, 0, 5),
  pong:       K(0x81D4FA, 0xB3E5FC, 900, 'sine', 0.5, 2.0, 0, 5),
  spring:     K(0x4CAF50, 0x81C784, 700, 'sine', 0.6, 1.5, 0, 3),
  trampoline: K(0xFFEB3B, 0xFFF176, 650, 'sine', 0.5, 1.2, 0, 5),
  bubble:     K(0x81D4FA, 0xB3E5FC, 700, 'sine', 0.5, 1.0, 0, 3),
  pinball:    K(0xFFD600, 0xFFAB00, 750, 'triangle', 0.7, 1.5, 0, 5),

  // ── Sci-fi / Tech ──
  cyber:      K(0x00E5FF, 0x18FFFF, 850, 'triangle', 1.2, 1.5, 0, 0),
  robot:      K(0x78909C, 0x90A4AE, 600, 'triangle', 1.2, 1.2, 0, 0),
  mech:       K(0x607D8B, 0x78909C, 400, 'triangle', 1.8, 0.8, 1.5, 0),
  nano:       K(0x18FFFF, 0x84FFFF, 1000, 'sine', 0.5, 3.0, 0.4, 0),
  quantum:    K(0x651FFF, 0xB388FF, 900, 'sine', 1.5, 2.0, 0, 2),
  atomic:     K(0x76FF03, 0xB2FF59, 500, 'triangle', 2.0, 1.0, 1.3, 0),
  nuclear:    K(0xFFFF00, 0x76FF03, 250, 'sawtooth', 3.5, 0.3, 2.5, 0),
  photon:     K(0xFFFFFF, 0xFFF9C4, 1100, 'sine', 0.8, 4.0, 0.4, 0),
  neutron:    K(0x424242, 0x757575, 300, 'triangle', 2.5, 0.5, 0.6, 0),
  gravity:    K(0x311B92, 0x4527A0, 250, 'sine', 1.5, 0.5, 2.0, 0),
  antimatter: K(0x1A0033, 0xAA00FF, 200, 'sawtooth', 4.0, 0.3, 0.8, 0),
  warp:       K(0x6200EA, 0xB388FF, 700, 'sine', 1.0, 3.0, 0, 1),
  matrix:     K(0x00C853, 0x00E676, 800, 'triangle', 1.0, 2.0, 0, 0),
  glitch:     K(0xFF1744, 0x00E5FF, 750, 'sawtooth', 1.0, 2.0, 0, 3),
  pixel:      K(0x00E676, 0x69F0AE, 800, 'triangle', 0.8, 1.5, 0, 0),
  digital:    K(0x00B0FF, 0x40C4FF, 850, 'triangle', 0.9, 1.5, 0, 0),
  hack:       K(0x00C853, 0x69F0AE, 900, 'triangle', 1.2, 2.0, 0, 0),
  virus:      K(0x76FF03, 0xB2FF59, 700, 'triangle', 0.8, 1.8, 0, 2),

  // ── Music ──
  bass:       K(0x7B1FA2, 0x9C27B0, 200, 'sine', 1.5, 0.5, 2.0, 0),
  beat:       K(0xFF4081, 0xFF80AB, 400, 'triangle', 0.8, 2.0, 0, 0),
  drum:       K(0x5D4037, 0x795548, 250, 'triangle', 1.2, 1.0, 1.3, 0),
  guitar:     K(0xE65100, 0xFF6D00, 500, 'triangle', 1.0, 1.2, 0, 0),
  piano:      K(0xFFFFFF, 0x212121, 600, 'sine', 0.9, 1.0, 0, 0),
  violin:     K(0x8D6E63, 0xA1887F, 800, 'sine', 0.8, 1.3, 0, 0),
  trumpet:    K(0xFFD600, 0xFFAB00, 700, 'triangle', 1.0, 1.5, 0, 0),
  flute:      K(0xB3E5FC, 0xE1F5FE, 1000, 'sine', 0.5, 2.0, 0, 0),
  horn:       K(0xFFB300, 0xFFC107, 350, 'triangle', 1.3, 0.8, 1.3, 0),
  music:      K(0xE040FB, 0xEA80FC, 600, 'sine', 0.8, 1.2, 0, 1),
  song:       K(0xF48FB1, 0xF8BBD0, 650, 'sine', 0.7, 1.3, 0, 1),
  disco:      K(0xFF4081, 0xFFD600, 750, 'sine', 0.8, 1.5, 0, 3),

  // ── Sports ──
  baseball:   K(0xFFFFFF, 0xF44336, 400, 'triangle', 1.2, 1.5, 1.0, 1),
  football:   K(0x795548, 0x8D6E63, 350, 'triangle', 1.3, 1.3, 1.2, 1),
  soccer:     K(0xFFFFFF, 0x212121, 400, 'sine', 1.0, 1.5, 1.1, 2),
  basketball: K(0xFF6D00, 0xFF9100, 380, 'triangle', 1.1, 1.3, 1.2, 3),
  tennis:     K(0xC6FF00, 0xEEFF41, 500, 'sine', 0.7, 2.0, 0.9, 3),
  golf:       K(0xFFFFFF, 0xF5F5F5, 550, 'sine', 0.8, 2.5, 0.6, 0),
  bowling:    K(0x212121, 0x424242, 280, 'triangle', 1.8, 0.7, 1.8, 0),
  hockey:     K(0x263238, 0x37474F, 450, 'triangle', 1.2, 2.0, 0.8, 2),
  frisbee:    K(0xFF4081, 0xFF80AB, 600, 'sine', 0.6, 1.8, 0.8, 4),

  // ── Colors (as explicit keywords) ──
  red:        K(0xFF0000, 0xFF5252, 400, 'triangle', 1.3, 1.0, 0, 0),
  blue:       K(0x2196F3, 0x64B5F6, 500, 'sine', 1.0, 1.2, 0, 0),
  green:      K(0x4CAF50, 0x81C784, 450, 'sine', 0.9, 1.1, 0, 0),
  yellow:     K(0xFFEB3B, 0xFFF176, 600, 'sine', 0.8, 1.3, 0, 0),
  purple:     K(0x9C27B0, 0xCE93D8, 550, 'sine', 1.1, 1.0, 0, 0),
  pink:       K(0xFF69B4, 0xFFB7C5, 650, 'sine', 0.7, 1.2, 0, 1),
  orange:     K(0xFF9800, 0xFFB74D, 480, 'sine', 1.0, 1.1, 0, 0),
  black:      K(0x212121, 0x424242, 250, 'sawtooth', 1.5, 0.7, 0, 0),
  white:      K(0xFFFFFF, 0xF5F5F5, 800, 'sine', 0.8, 1.4, 0, 0),
  cyan:       K(0x00BCD4, 0x4DD0E1, 700, 'sine', 0.9, 1.3, 0, 0),
  magenta:    K(0xE040FB, 0xEA80FC, 650, 'sine', 1.0, 1.1, 0, 0),
  crimson:    K(0xDC143C, 0xFF1744, 350, 'sawtooth', 1.5, 0.9, 0, 0),
  scarlet:    K(0xFF2400, 0xFF5722, 360, 'sawtooth', 1.4, 0.9, 0, 0),
  turquoise:  K(0x40E0D0, 0x64FFDA, 650, 'sine', 0.9, 1.2, 0, 0),
  violet:     K(0x7C4DFF, 0xB388FF, 600, 'sine', 1.1, 1.0, 0, 0),
  indigo:     K(0x3F51B5, 0x5C6BC0, 550, 'sine', 1.2, 1.0, 0, 0),
  teal:       K(0x009688, 0x4DB6AC, 580, 'sine', 1.0, 1.1, 0, 0),
  maroon:     K(0x800000, 0xB71C1C, 300, 'triangle', 1.5, 0.7, 0, 0),
  navy:       K(0x000080, 0x1A237E, 350, 'triangle', 1.3, 0.8, 0, 0),

  // ── Misc Objects ──
  slingshot:  K(0x8D6E63, 0xA1887F, 500, 'sine', 0.8, 1.5, 0, 1),
  catapult:   K(0x6D4C41, 0x8D6E63, 300, 'triangle', 2.0, 0.5, 2.0, 0),
  trebuchet:  K(0x5D4037, 0x795548, 250, 'triangle', 2.5, 0.4, 2.5, 0),
  boomerang:  K(0x795548, 0xA1887F, 500, 'triangle', 0.8, 1.5, 0.8, 5),
  frisbee:    K(0xFF4081, 0xFF80AB, 600, 'sine', 0.6, 1.8, 0.8, 4),
  coin:       K(0xFFD700, 0xFFC107, 700, 'sine', 0.6, 1.5, 0.6, 2),
  crown:      K(0xFFD700, 0xFFA000, 550, 'sine', 1.2, 1.0, 1.2, 0),
  skull:      K(0xEEEEEE, 0xBDBDBD, 250, 'sawtooth', 1.5, 0.8, 1.2, 0),
  bone:       K(0xFFF8E1, 0xFFECB3, 400, 'triangle', 1.0, 1.2, 0, 1),
  candle:     K(0xFFCA28, 0xFF6F00, 450, 'sine', 0.8, 0.9, 0, 0),
  clock:      K(0xFFD600, 0xFFAB00, 600, 'sine', 0.7, 1.0, 0, 0),
  key:        K(0xFFD600, 0xFFC107, 650, 'sine', 0.6, 1.5, 0.7, 0),
  feather:    K(0xECEFF1, 0xFAFAFA, 800, 'sine', 0.3, 2.5, 0.5, 1),
  balloon:    K(0xF44336, 0xEF5350, 550, 'sine', 0.3, 1.0, 1.5, 2),
  confetti:   K(0xFF4081, 0xFFD600, 750, 'sine', 0.3, 2.0, 0.5, 4),
  firework:   K(0xFF1744, 0xFFD600, 400, 'sawtooth', 1.5, 1.2, 0, 3),

  // ── Meme / Fun ──
  yeet:       K(0xFF1744, 0xF50057, 300, 'sawtooth', 2.0, 2.5, 1.5, 0),
  bruh:       K(0x795548, 0x5D4037, 200, 'triangle', 1.5, 0.5, 2.0, 0),
  sus:        K(0xFF0000, 0xFFFFFF, 400, 'triangle', 1.0, 1.0, 1.0, 0),
  bonk:       K(0xFF6F00, 0xFFA000, 250, 'triangle', 2.0, 0.5, 2.0, 0),
  boop:       K(0xF48FB1, 0xF8BBD0, 800, 'sine', 0.3, 1.5, 0.7, 1),
  oof:        K(0xFF5722, 0xFF8A65, 220, 'sawtooth', 1.5, 0.7, 1.3, 0),
  pew:        K(0x00E5FF, 0x18FFFF, 950, 'sine', 0.6, 3.5, 0.5, 0),
  zoom:       K(0xFFD600, 0xFFAB00, 1000, 'triangle', 0.5, 4.5, 0.4, 0),
  whoosh:     K(0xB2EBF2, 0xE0F7FA, 900, 'sine', 0.4, 4.0, 0.5, 0),
  kaboom:     K(0xFF3D00, 0xFF6E40, 180, 'sawtooth', 3.5, 0.3, 3.0, 0),
  splat:      K(0x76FF03, 0xB2FF59, 400, 'sine', 0.8, 1.0, 1.5, 0),
  squish:     K(0xF48FB1, 0xF8BBD0, 350, 'sine', 0.7, 0.8, 1.4, 0),
  chomp:      K(0xF44336, 0xFF5252, 300, 'triangle', 1.5, 1.0, 1.2, 0),
  nom:        K(0xFF9800, 0xFFB74D, 400, 'sine', 0.8, 1.0, 1.0, 0),
  explod:     K(0xFF3D00, 0xFF6E40, 250, 'sawtooth', 2.0, 0.6, 1.5, 0),
};

const SHAPE_KEYWORDS = {
  sphere: ['ball', 'orb', 'bubble', 'marble', 'sphere', 'globe', 'round', 'pearl', 'moon', 'sun', 'planet', 'eye', 'berry', 'seed', 'egg', 'snowball', 'cannonball', 'bomb', 'grenade', 'balloon', 'cherry', 'grape', 'apple', 'orange', 'coconut', 'melon', 'watermelon', 'bowling'],
  cube: ['cube', 'block', 'box', 'brick', 'crate', 'square', 'dice', 'die', 'pixel', 'voxel', 'tofu', 'waffle', 'present', 'gift'],
  star: ['star', 'shuriken', 'ninja', 'sparkle', 'twinkle', 'asterisk', 'flower', 'petal', 'sun', 'burst'],
  diamond: ['diamond', 'crystal', 'gem', 'jewel', 'ruby', 'emerald', 'sapphire', 'amethyst', 'quartz', 'prism', 'shard'],
  ring: ['ring', 'donut', 'halo', 'torus', 'bagel', 'tire', 'wheel', 'loop', 'portal', 'frisbee', 'disc', 'disk'],
  cone: ['cone', 'rocket', 'missile', 'arrow', 'spike', 'thorn', 'fang', 'horn', 'icicle', 'carrot', 'tornado', 'drill', 'spear', 'lance', 'bullet', 'dart', 'needle', 'dagger', 'knife'],
  cylinder: ['log', 'barrel', 'can', 'pillar', 'rod', 'staff', 'wand', 'bat', 'baton', 'bamboo', 'pipe', 'tube', 'stick', 'dynamite', 'candle', 'hotdog', 'sausage'],
  flat: ['card', 'paper', 'leaf', 'feather', 'blade', 'sword', 'katana', 'boomerang', 'wing', 'pancake', 'coin', 'shield', 'book', 'slice'],
};

function generateWeaponFromText(text) {
  const lower = text.toLowerCase();
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  hash = Math.abs(hash);

  let dmgMult = 1, spdMult = 1, scaleMult = 1, bounceAdd = 0;
  let color = null, trail = null, freq = 520, atype = 'sine';
  let matched = false;

  for (const [keyword, props] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      dmgMult *= props.dmgMult;
      spdMult *= props.spdMult;
      if (props.scaleMult) scaleMult *= props.scaleMult;
      if (props.bounceAdd) bounceAdd += props.bounceAdd;
      color = color || props.color;
      trail = trail || props.trail;
      freq = props.freq;
      atype = props.type;
      matched = true;
    }
  }

  if (!matched) {
    const hue = hash % 360;
    const r = Math.round(128 + 127 * Math.cos(hue * Math.PI / 180));
    const g = Math.round(128 + 127 * Math.cos((hue - 120) * Math.PI / 180));
    const b = Math.round(128 + 127 * Math.cos((hue + 120) * Math.PI / 180));
    color = (r << 16) | (g << 8) | b;
    trail = color;
    freq = 300 + (hash % 700);
    atype = hash % 2 === 0 ? 'sine' : 'triangle';
    dmgMult = 0.7 + (hash % 30) / 20;
    spdMult = 0.7 + (hash % 25) / 15;
  }

  let projShape = 'sphere';
  for (const [shape, keywords] of Object.entries(SHAPE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) { projShape = shape; break; }
  }
  if (projShape === 'sphere' && hash % 6 === 0) projShape = 'cube';
  if (projShape === 'sphere' && hash % 7 === 0) projShape = 'star';

  const weapon = {
    speed: clamp(1.0 * spdMult, 0.1, 5),
    damage: clamp(Math.round(40 * dmgMult), 10, 500),
    scale: clamp(1.0 * scaleMult, 0.5, 5),
    bounces: clamp(bounceAdd, 0, 5),
    audioFreq: clamp(freq, 200, 1200),
    audioType: atype,
    spriteTex: null,
    spriteDataUrl: null,
    name: text.length > 28 ? text.slice(0, 25) + '...' : text,
    rarity: 'common',
    projColor: color || 0xFFD54F,
    projTrailColor: trail || 0xFFA000,
    projShape,
    spread: 0,
    rocketMode: false,
  };

  if (lower.includes('shotgun') || lower.includes('buckshot') || lower.includes('scattergun')) {
    weapon.spread = 6;
    weapon.speed = clamp(weapon.speed, 0.1, 0.6);
    weapon.projShape = 'sphere';
  }
  if (lower.includes('rocket') || lower.includes('missile') || lower.includes('bazooka') || lower.includes('rpg')) {
    weapon.rocketMode = true;
    weapon.projShape = 'rocket';
  }

  return weapon;
}

// ── Projectile Firing ──

const _fireDir = new THREE.Vector3();
const _tmpShotgunDir = new THREE.Vector3();
const _tmpLookTarget = new THREE.Vector3();
const _tmpBurstOffset = new THREE.Vector3();

const _geoCache = new Map();

function getCachedGeo(shape, s) {
  const key = shape + '_' + s.toFixed(2);
  let geo = _geoCache.get(key);
  if (geo) return geo;
  switch (shape) {
    case 'cube': geo = new THREE.BoxGeometry(0.3 * s, 0.3 * s, 0.3 * s); break;
    case 'star': geo = new THREE.OctahedronGeometry(0.2 * s, 0); break;
    case 'diamond': geo = new THREE.OctahedronGeometry(0.22 * s, 0); break;
    case 'ring': geo = new THREE.TorusGeometry(0.15 * s, 0.06 * s, 4, 6); break;
    case 'cone': geo = new THREE.ConeGeometry(0.15 * s, 0.45 * s, 5); break;
    case 'cylinder': geo = new THREE.CylinderGeometry(0.1 * s, 0.1 * s, 0.4 * s, 5); break;
    case 'flat': geo = new THREE.PlaneGeometry(0.35 * s, 0.2 * s); break;
    default: geo = new THREE.SphereGeometry(0.22 * s, 6, 6); break;
  }
  _geoCache.set(key, geo);
  return geo;
}

const _matCache = new Map();

function getCachedBasicMat(color) {
  let mat = _matCache.get(color);
  if (mat) return mat;
  mat = new THREE.MeshBasicMaterial({ color });
  _matCache.set(color, mat);
  return mat;
}

const _transparentMatCache = new Map();

function getCachedTransparentMat(color, opacity) {
  const key = color + '_' + opacity;
  let mat = _transparentMatCache.get(key);
  if (mat) return mat;
  mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
  _transparentMatCache.set(key, mat);
  return mat;
}

const _rocketGeoCache = new Map();
const _rocketFinMat = new THREE.MeshBasicMaterial({ color: 0x666666, side: THREE.DoubleSide });
const _rocketBodyMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
const _rocketExhaustMat = new THREE.MeshBasicMaterial({ color: 0xFF6600, transparent: true, opacity: 0.8 });

function _getRocketGeos(s) {
  const key = s.toFixed(2);
  let g = _rocketGeoCache.get(key);
  if (g) return g;
  g = {
    body: new THREE.CylinderGeometry(0.06 * s, 0.08 * s, 0.35 * s, 6),
    head: new THREE.ConeGeometry(0.06 * s, 0.14 * s, 6),
    fin: new THREE.PlaneGeometry(0.1 * s, 0.08 * s),
    exhaust: new THREE.ConeGeometry(0.05 * s, 0.12 * s, 4),
  };
  _rocketGeoCache.set(key, g);
  return g;
}

function makeRocketMesh(s, color) {
  const geos = _getRocketGeos(s);
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geos.body, _rocketBodyMat));
  const head = new THREE.Mesh(geos.head, getCachedBasicMat(color));
  head.position.y = 0.245 * s;
  group.add(head);
  for (let i = 0; i < 4; i++) {
    const fin = new THREE.Mesh(geos.fin, _rocketFinMat);
    fin.position.y = -0.15 * s;
    fin.rotation.y = (i / 4) * Math.PI * 2;
    fin.rotation.x = 0.3;
    group.add(fin);
  }
  const exhaust = new THREE.Mesh(geos.exhaust, _rocketExhaustMat);
  exhaust.position.y = -0.235 * s;
  exhaust.rotation.x = Math.PI;
  group.add(exhaust);
  return group;
}

const _pelletGeoCache = new Map();
const _pelletBodyMat = new THREE.MeshLambertMaterial({ color: 0xCCBB88 });

function makeShotgunPellet(s, color) {
  const key = s.toFixed(2);
  let geos = _pelletGeoCache.get(key);
  if (!geos) {
    geos = {
      pellet: new THREE.SphereGeometry(0.06 * s, 5, 5),
      flash: new THREE.SphereGeometry(0.04 * s, 4, 4),
    };
    _pelletGeoCache.set(key, geos);
  }
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geos.pellet, _pelletBodyMat));
  const flash = new THREE.Mesh(geos.flash, getCachedTransparentMat(color, 0.6));
  flash.position.z = -0.04 * s;
  group.add(flash);
  return group;
}

export function fireProjectile(scene, state) {
  const now = performance.now();
  const weapon = state.weapons[state.activeWeaponIdx];
  const cooldown = 180 / Math.max(weapon.speed, 0.3);
  if (now - state.lastShot < cooldown) return;
  state.lastShot = now;

  _fireDir.subVectors(state.mouseWorld, state.playerPos).setY(0).normalize();
  if (_fireDir.length() < 0.01) _fireDir.set(0, 0, -1);

  const s = weapon.scale;
  const effectiveDmg = Math.round(weapon.damage * state.damageMultiplier);
  const projColor = weapon.projColor || 0xFFD54F;
  const trailColor = weapon.projTrailColor || projColor;

  shootSound(weapon.audioFreq, weapon.audioType);

  if (weapon.spread > 1) {
    const pelletCount = weapon.spread;
    const spreadAngle = 0.35;
    const pelletDmg = Math.max(5, Math.round(effectiveDmg / pelletCount * 1.8));
    const baseAngle = Math.atan2(_fireDir.x, _fireDir.z);

    for (let i = 0; i < pelletCount; i++) {
      const angleOffset = ((i / (pelletCount - 1)) - 0.5) * spreadAngle;
      const a = baseAngle + angleOffset;
      _tmpShotgunDir.set(Math.sin(a), 0, Math.cos(a));

      const mesh = makeShotgunPellet(s, projColor);
      mesh.position.copy(state.playerPos);
      mesh.position.y = 0.6;
      scene.add(mesh);

      const speedJitter = 0.9 + Math.random() * 0.2;
      state.projectiles.push({
        mesh,
        vel: _tmpShotgunDir.clone().multiplyScalar(0.45 * speedJitter),
        damage: pelletDmg,
        radius: 0.1 * s,
        bouncesLeft: weapon.bounces,
        life: 120,
        trailColor,
        trailCounter: 0,
      });
    }
    return;
  }

  if (weapon.rocketMode) {
    const mesh = makeRocketMesh(s, projColor);
    mesh.position.copy(state.playerPos);
    mesh.position.y = 0.6;
    _tmpLookTarget.copy(mesh.position).add(_fireDir);
    mesh.lookAt(_tmpLookTarget);
    mesh.rotation.x += Math.PI / 2;
    scene.add(mesh);

    state.projectiles.push({
      mesh,
      vel: _fireDir.clone().multiplyScalar(0.18),
      damage: effectiveDmg,
      radius: 0.3 * s,
      bouncesLeft: weapon.bounces,
      life: 500,
      trailColor: 0x888888,
      trailCounter: 0,
      isRocket: true,
      smokeCounter: 0,
    });
    return;
  }

  let mesh;
  if (weapon.spriteTex) {
    const mat = new THREE.SpriteMaterial({ map: weapon.spriteTex, transparent: true });
    mesh = new THREE.Sprite(mat);
    mesh.scale.set(s * 1.2, s * 1.2, 1);
  } else {
    const geo = getCachedGeo(weapon.projShape || 'sphere', s);
    const mat = getCachedBasicMat(projColor);
    mesh = new THREE.Mesh(geo, mat);
  }

  mesh.position.copy(state.playerPos);
  mesh.position.y = 0.6;
  scene.add(mesh);

  state.projectiles.push({
    mesh,
    vel: _fireDir.clone().multiplyScalar(0.35 * weapon.speed),
    damage: effectiveDmg,
    radius: 0.22 * s,
    bouncesLeft: weapon.bounces,
    life: 400,
    trailColor,
    trailCounter: 0,
  });
}

// ── Projectile Update ──

const _projNorm = new THREE.Vector3();

export function updateProjectiles(state, scene, islandRadius, damageEnemyFn, camera) {
  const dt60 = state.dt60;
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.mesh.position.addScaledVector(p.vel, dt60);
    p.life -= dt60;

    if (p.isRocket) {
      p.smokeCounter = (p.smokeCounter || 0) + dt60;
      if (p.smokeCounter >= 2) {
        p.smokeCounter -= 2;
        spawnTrail(p.mesh.position, 0x999999);
        spawnTrail(p.mesh.position, 0x666666);
      }
    } else {
      p.trailCounter += dt60;
      if (p.trailCounter >= 3) {
        p.trailCounter -= 3;
        spawnTrail(p.mesh.position, p.trailColor);
      }
    }

    // Wall collision
    if (state.terrain) {
      for (const wall of state.terrain.walls) {
        const wdx = p.mesh.position.x - wall.x;
        const wdz = p.mesh.position.z - wall.z;
        const overlapX = wall.hw + p.radius - Math.abs(wdx);
        const overlapZ = wall.hd + p.radius - Math.abs(wdz);
        if (overlapX > 0 && overlapZ > 0) {
          if (p.bouncesLeft > 0) {
            p.bouncesLeft--;
            bounceSound();
            if (overlapX < overlapZ) {
              p.vel.x *= -1;
              p.mesh.position.x += (wdx > 0 ? 1 : -1) * overlapX;
            } else {
              p.vel.z *= -1;
              p.mesh.position.z += (wdz > 0 ? 1 : -1) * overlapZ;
            }
          } else if (p.isRocket) {
            rocketExplosion(p.mesh.position, state, scene, damageEnemyFn, camera);
            p.life = 0;
          } else {
            p.life = 0;
          }
          break;
        }
      }
    }

    const pDist = Math.sqrt(p.mesh.position.x ** 2 + p.mesh.position.z ** 2);
    if (pDist > islandRadius) {
      if (p.bouncesLeft > 0) {
        p.bouncesLeft--;
        bounceSound();
        _projNorm.set(p.mesh.position.x, 0, p.mesh.position.z).normalize();
        const dot = p.vel.dot(_projNorm);
        p.vel.sub(_projNorm.multiplyScalar(2 * dot));
        const clampR = islandRadius - 0.2;
        const angle = Math.atan2(p.mesh.position.z, p.mesh.position.x);
        p.mesh.position.x = Math.cos(angle) * clampR;
        p.mesh.position.z = Math.sin(angle) * clampR;
      } else {
        if (p.isRocket) rocketExplosion(p.mesh.position, state, scene, damageEnemyFn, camera);
        p.life = 0;
      }
    }

    // Destroy destructible enemy projectiles
    for (let k = state.enemyProjectiles.length - 1; k >= 0; k--) {
      const ep = state.enemyProjectiles[k];
      if (!ep.destructible) continue;
      const edx = p.mesh.position.x - ep.mesh.position.x;
      const edz = p.mesh.position.z - ep.mesh.position.z;
      if (Math.sqrt(edx * edx + edz * edz) < p.radius + 0.2) {
        spawnBurstFromWeapons(ep.mesh.position, 0xFF4466, 8);
        scene.remove(ep.mesh);
        state.enemyProjectiles[k] = state.enemyProjectiles[state.enemyProjectiles.length - 1];
        state.enemyProjectiles.pop();
        p.life = 0;
        break;
      }
    }

    if (p.life > 0) {
      for (let j = state.enemies.length - 1; j >= 0; j--) {
        const e = state.enemies[j];
        const dx = p.mesh.position.x - e.mesh.position.x;
        const dz = p.mesh.position.z - e.mesh.position.z;
        if (Math.sqrt(dx * dx + dz * dz) < p.radius + e.radius) {
          const wasBounced = p.bouncesLeft < (state.weapons[state.activeWeaponIdx].bounces || 0);
          if (p.isRocket) {
            rocketExplosion(p.mesh.position, state, scene, damageEnemyFn, camera);
          } else {
            damageEnemyFn(e, p.damage, state, scene, camera, wasBounced);
          }
          p.life = 0;
          break;
        }
      }
    }

    if (p.life <= 0) {
      scene.remove(p.mesh);
      state.projectiles[i] = state.projectiles[state.projectiles.length - 1];
      state.projectiles.pop();
    }
  }
}

function rocketExplosion(pos, state, scene, damageEnemyFn, camera) {
  spawnBurst(pos, 0xFF4400, 12);
  spawnBurst(pos, 0xFF8800, 8);
  spawnBurst(pos, 0xFFCC00, 4);
  spawnShockwave(scene, pos, 3.0);

  const explosionRadius = 3.0;
  const weapon = state.weapons[state.activeWeaponIdx];
  const explosionDmg = Math.round((weapon ? weapon.damage : 40) * state.damageMultiplier * 0.6);

  for (let j = state.enemies.length - 1; j >= 0; j--) {
    const e = state.enemies[j];
    const dx = pos.x - e.mesh.position.x;
    const dz = pos.z - e.mesh.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < explosionRadius) {
      const falloff = 1 - (dist / explosionRadius);
      damageEnemyFn(e, Math.round(explosionDmg * falloff), state, scene, camera, false);
    }
  }
}

function spawnBurstFromWeapons(pos, color, count) {
  spawnTrail(pos, color);
  for (let i = 1; i < count; i++) {
    _tmpBurstOffset.copy(pos);
    _tmpBurstOffset.x += (Math.random() - 0.5) * 0.5;
    _tmpBurstOffset.y += Math.random() * 0.3;
    _tmpBurstOffset.z += (Math.random() - 0.5) * 0.5;
    spawnTrail(_tmpBurstOffset, color);
  }
}

// ── Forge ──

export async function handleForge(state, els) {
  const text = els.forgeInput.value.trim();
  if (!text) return;

  if (state.pollen <= 0) {
    els.forgeStatus.textContent = 'Not enough Pollen! Complete waves to earn more.';
    els.forgeStatus.className = 'forge-status error';
    return;
  }

  els.forgeBtn.disabled = true;
  els.forgeStatus.textContent = 'Forging your weapon...';
  els.forgeStatus.className = 'forge-status';

  // Generate weapon stats from description (instant, always works)
  let weapon = generateWeaponFromText(text);

  // Optionally try LLM API for enhanced stats (non-blocking)
  try {
    const data = await requestForgeStats(text);
    const raw = data.result || '';
    const get = (key, fb) => {
      const m = raw.match(new RegExp(`<${key}:\\s*([^>]+)>`));
      return m ? m[1].trim() : fb;
    };
    weapon.speed = clamp(parseFloat(get('speed', String(weapon.speed))), 0.1, 5);
    weapon.damage = clamp(parseInt(get('damage', String(weapon.damage)), 10), 10, 500);
    weapon.scale = clamp(parseFloat(get('scale', String(weapon.scale))), 0.5, 5);
    weapon.bounces = clamp(parseInt(get('bounces', String(weapon.bounces)), 10), 0, 5);
    weapon.audioFreq = clamp(parseInt(get('audio_freq', String(weapon.audioFreq)), 10), 200, 1200);
    const at = get('audio_type', weapon.audioType);
    if (['sine', 'triangle'].includes(at)) weapon.audioType = at;
  } catch {
    // Client-side generation is already good enough
  }

  weapon.rarity = computeRarity(weapon);
  state.pollen--;

  const slotIdx = state.forgeTargetSlot != null ? state.forgeTargetSlot : state.activeWeaponIdx;
  if (slotIdx >= state.weapons.length) {
    state.weapons.push(weapon);
  } else {
    state.weapons[slotIdx] = weapon;
  }
  state.activeWeaponIdx = slotIdx;

  els.forgeStatus.textContent = 'Conjuring visuals...';
  applyLocalFallbackSprite(text, weapon);

  // Try loading an AI sprite in background, but don't block
  loadWeaponSprite(text, weapon).catch(() => {});

  forgeCompleteSound();

  const rarityDef = getRarityDef(weapon.rarity);
  els.forgeStatus.innerHTML =
    `Forged! <span style="color:${rarityDef.color};font-weight:700">[${rarityDef.label}]</span> ` +
    `SPD:${weapon.speed.toFixed(1)} DMG:${weapon.damage} BNC:${weapon.bounces} ` +
    `<span style="font-size:0.7rem;color:#9E9E9E">${weapon.projShape}</span>`;
  els.forgeStatus.className = 'forge-status success';

  saveWeaponToGallery(weapon);
  els.forgeBtn.disabled = false;
}

// ── Sprite Loading with Improved Background Removal ──

async function loadWeaponSprite(prompt, weapon) {
  const encoded = encodeURIComponent(prompt.replace(/\s+/g, '+'));
  const url = `https://image.pollinations.ai/prompt/cute+vibrant+colorful+2D+pixel+art+${encoded}+item+game+sprite+isolated+on+solid+black+background`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sprite API returned ${res.status}`);
    const blob = await res.blob();
    const img = await blobToImage(blob);
    applyProcessedSpriteFromImage(img, weapon);
  } catch (err) {
    console.warn('[forge] Sprite service unavailable, using local fallback sprite.', err);
    applyLocalFallbackSprite(prompt, weapon);
  }
}

// ── Clear ──

export function clearProjectiles(state, scene) {
  for (const p of state.projectiles) scene.remove(p.mesh);
  state.projectiles.length = 0;
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

async function requestForgeStats(prompt) {
  const endpoints = ['/.netlify/functions/forge', '/netlify/functions/forge'];
  let lastErr;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        lastErr = new Error(`Forge API ${endpoint} returned ${res.status}`);
        continue;
      }
      return await res.json();
    } catch (err) {
      lastErr = err;
    }
  }

  throw lastErr || new Error('Forge API request failed');
}

function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode sprite image blob'));
    };
    img.src = url;
  });
}

function applyProcessedSpriteFromImage(img, weapon) {
  const cvs = document.createElement('canvas');
  cvs.width = img.width;
  cvs.height = img.height;
  const ctx = cvs.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const id = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const d = id.data;
  const w = cvs.width;
  const h = cvs.height;

  const visited = new Uint8Array(w * h);
  const bgColor = { r: d[0], g: d[1], b: d[2] };
  const tolerance = 50;
  const queue = [];

  const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
  for (const [cx, cy] of corners) {
    const ci = cy * w + cx;
    if (!visited[ci]) {
      queue.push(ci);
      visited[ci] = 1;
    }
  }

  while (queue.length > 0) {
    const idx = queue.shift();
    const pi = idx * 4;
    const dr = Math.abs(d[pi] - bgColor.r);
    const dg = Math.abs(d[pi + 1] - bgColor.g);
    const db = Math.abs(d[pi + 2] - bgColor.b);
    if (dr + dg + db < tolerance) {
      d[pi + 3] = 0;
      const x = idx % w;
      const y = (idx - x) / w;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const ni = ny * w + nx;
          if (!visited[ni]) {
            visited[ni] = 1;
            queue.push(ni);
          }
        }
      }
    }
  }

  ctx.putImageData(id, 0, 0);

  const cvs2 = document.createElement('canvas');
  cvs2.width = w + 4;
  cvs2.height = h + 4;
  const ctx2 = cvs2.getContext('2d');
  ctx2.shadowColor = 'rgba(255,255,255,0.6)';
  ctx2.shadowBlur = 3;
  ctx2.drawImage(cvs, 2, 2);
  ctx2.shadowBlur = 0;
  ctx2.drawImage(cvs, 2, 2);

  if (weapon.spriteTex) weapon.spriteTex.dispose();
  const tex = new THREE.CanvasTexture(cvs2);
  tex.needsUpdate = true;
  weapon.spriteTex = tex;

  try {
    weapon.spriteDataUrl = cvs2.toDataURL('image/png');
  } catch {}
}

function applyLocalFallbackSprite(prompt, weapon) {
  const color = weapon.projColor || 0xFFD54F;
  const r = (color >> 16) & 0xFF, g = (color >> 8) & 0xFF, b = color & 0xFF;
  const trail = weapon.projTrailColor || color;
  const tr = (trail >> 16) & 0xFF, tg = (trail >> 8) & 0xFF, tb = trail & 0xFF;

  const cvs = document.createElement('canvas');
  cvs.width = 64;
  cvs.height = 64;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);

  // Glow
  const grad = ctx.createRadialGradient(32, 32, 5, 32, 32, 28);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.5)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  // Shape
  const shape = weapon.projShape || 'sphere';
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.strokeStyle = `rgb(${tr},${tg},${tb})`;
  ctx.lineWidth = 2;
  if (shape === 'cube') {
    ctx.fillRect(18, 18, 28, 28);
    ctx.strokeRect(18, 18, 28, 28);
  } else if (shape === 'star') {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const rad = i % 2 === 0 ? 18 : 8;
      ctx[i === 0 ? 'moveTo' : 'lineTo'](32 + Math.cos(a) * rad, 32 + Math.sin(a) * rad);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (shape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(32, 12); ctx.lineTo(50, 32); ctx.lineTo(32, 52); ctx.lineTo(14, 32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (shape === 'ring') {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(32, 32, 14, 0, Math.PI * 2);
    ctx.stroke();
  } else if (shape === 'cone') {
    ctx.beginPath();
    ctx.moveTo(32, 10); ctx.lineTo(48, 50); ctx.lineTo(16, 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (shape === 'cylinder') {
    ctx.fillRect(22, 14, 20, 36);
    ctx.strokeRect(22, 14, 20, 36);
    ctx.beginPath(); ctx.ellipse(32, 14, 10, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  } else if (shape === 'flat') {
    ctx.fillRect(10, 24, 44, 16);
    ctx.strokeRect(10, 24, 44, 16);
  } else {
    ctx.beginPath();
    ctx.arc(32, 32, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Highlight
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.arc(26, 26, 5, 0, Math.PI * 2);
  ctx.fill();

  if (weapon.spriteTex) weapon.spriteTex.dispose();
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  weapon.spriteTex = tex;

  try {
    weapon.spriteDataUrl = cvs.toDataURL('image/png');
  } catch {}
}
