import type { Mesh, Vector3, TransformNode } from '@babylonjs/core';

export interface WeaponDef {
  name: string;
  slot: number;
  icon: string;
  damage: number;
  headshotMultiplier: number;
  fireRate: number;
  magazineSize: number;
  reserveAmmo: number;
  reloadTime: number;
  spread: number;
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
  altFireName: string;
  altFireCooldown: number;
  altFireType: 'burst' | 'charge' | 'explosive' | 'beam' | 'emp';
}

export interface WeaponState {
  def: WeaponDef;
  currentAmmo: number;
  reserveAmmo: number;
  reloading: boolean;
  reloadTimer: number;
  fireTimer: number;
  equipped: boolean;
  altFireCooldownTimer: number;
  altFireCharging: boolean;
  altFireChargeTime: number;
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
  emissiveColor: [number, number, number];
  scale: number;
  behavior: 'rush' | 'strafe' | 'snipe' | 'flank' | 'fly' | 'boss';
  isBoss?: boolean;
  abilities?: string[];
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
  bossPhase: number;
  specialTimer: number;
  shieldActive: boolean;
  healthBarMesh?: Mesh;
}

export interface Pickup {
  mesh: Mesh;
  type: 'health' | 'armor' | 'ammo' | 'grenade' | 'overdrive';
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
  wallRunning: boolean;
  wallRunSide: number;
  wallRunTimer: number;
  doubleJumped: boolean;
  airJumpsLeft: number;
  grappling: boolean;
  grapplePoint: Vector3 | null;
  grappleLength: number;
  bulletTimeActive: boolean;
  bulletTimeEnergy: number;
  comboMultiplier: number;
  comboTimer: number;
  stylePoints: number;
  lastKillWasAirborne: boolean;
  lastKillWasWallRun: boolean;
  overdriveTimer: number;
}

export interface GameState {
  phase: 'menu' | 'playing' | 'paused' | 'gameover';
  wave: number;
  enemiesRemaining: number;
  enemiesInWave: number;
  waveTimer: number;
  spawnTimer: number;
  totalKills: number;
  bossActive: boolean;
  timeScale: number;
  difficulty: number;
}

export interface KillFeedEntry {
  text: string;
  time: number;
  color?: string;
}

export interface StyleKill {
  type: 'headshot' | 'airborne' | 'wallrun' | 'grapple' | 'multikill' | 'noscope' | 'longshot' | 'explosion';
  label: string;
  bonus: number;
}

export interface WallInfo {
  normal: Vector3;
  point: Vector3;
  side: number;
}

export interface Platform {
  mesh: Mesh;
  position: Vector3;
  width: number;
  depth: number;
  height: number;
}
