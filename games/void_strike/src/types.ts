import type { Mesh, Vector3, TransformNode } from '@babylonjs/core';

export interface WeaponDef {
  name: string;
  slot: number;
  icon: string;
  damage: number;
  headshotMultiplier: number;
  fireRate: number; // rounds per second
  magazineSize: number;
  reserveAmmo: number;
  reloadTime: number; // seconds
  spread: number; // radians at hip
  adsSpread: number;
  recoilUp: number;
  recoilSide: number;
  range: number;
  projectilesPerShot: number;
  automatic: boolean;
  muzzleFlashScale: number;
  screenShake: number;
  type: 'hitscan' | 'projectile';
  projectileSpeed?: number;
  explosionRadius?: number;
}

export interface WeaponState {
  def: WeaponDef;
  currentAmmo: number;
  reserveAmmo: number;
  reloading: boolean;
  reloadTimer: number;
  fireTimer: number;
  equipped: boolean;
}

export interface EnemyType {
  name: string;
  health: number;
  speed: number;
  damage: number;
  fireRate: number;
  accuracy: number;
  scoreValue: number;
  color: [number, number, number];
  scale: number;
  behavior: 'rush' | 'strafe' | 'snipe' | 'flank';
}

export interface Enemy {
  mesh: TransformNode;
  bodyParts: Mesh[];
  health: number;
  maxHealth: number;
  type: EnemyType;
  position: Vector3;
  velocity: Vector3;
  alive: boolean;
  fireTimer: number;
  strafeDir: number;
  strafeTimer: number;
  targetPos: Vector3;
  alertLevel: number;
  lastSeenPlayerPos: Vector3 | null;
  hitFlashTimer: number;
  deathTimer: number;
}

export interface Pickup {
  mesh: Mesh;
  type: 'health' | 'armor' | 'ammo';
  value: number;
  respawnTimer: number;
  active: boolean;
  position: Vector3;
}

export interface PlayerState {
  health: number;
  maxHealth: number;
  armor: number;
  maxArmor: number;
  position: Vector3;
  velocity: Vector3;
  grounded: boolean;
  sprinting: boolean;
  score: number;
  kills: number;
  deaths: number;
  streak: number;
  alive: boolean;
}

export interface GameState {
  phase: 'menu' | 'playing' | 'paused' | 'gameover';
  wave: number;
  enemiesRemaining: number;
  enemiesInWave: number;
  waveTimer: number;
  spawnTimer: number;
  totalKills: number;
}

export interface KillFeedEntry {
  text: string;
  time: number;
  color?: string;
}
