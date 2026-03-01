import * as THREE from 'three';
import { playTone, playNoise } from '@shared/audio';

interface Chunk {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  ax: number;
  az: number;
  age: number;
  maxAge: number;
  bounced: boolean;
}

const GRAVITY = -0.028;
const GROUND_Y = 0.06;
const RESTITUTION = 0.4;
const DAMPING = 0.965;

const chunks: Chunk[] = [];
const pool: THREE.Mesh[] = [];

const geos = [
  new THREE.BoxGeometry(0.16, 0.16, 0.16),
  new THREE.BoxGeometry(0.24, 0.14, 0.2),
  new THREE.TetrahedronGeometry(0.17, 0),
  new THREE.OctahedronGeometry(0.12, 0),
  new THREE.BoxGeometry(0.1, 0.22, 0.12),
];

function getChunkMesh(color: number): THREE.Mesh {
  const recycled = pool.pop();
  if (recycled) {
    const mat = recycled.material as THREE.MeshLambertMaterial;
    mat.color.setHex(color);
    mat.emissive.setHex(color);
    mat.opacity = 1;
    recycled.visible = true;
    recycled.scale.setScalar(1);
    return recycled;
  }
  return new THREE.Mesh(
    geos[Math.floor(Math.random() * geos.length)],
    new THREE.MeshLambertMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 1,
    }),
  );
}

/**
 * Spawn physics-driven debris chunks when an enemy is killed.
 * Chunks are emissive so they glow through bloom post-processing.
 */
export function spawnDebris(
  scene: THREE.Scene,
  position: THREE.Vector3,
  color: number,
  radius: number,
  isBoss: boolean,
) {
  const count = isBoss ? 18 : 7 + Math.floor(Math.random() * 5);
  const power = isBoss ? 0.32 : 0.18;

  for (let i = 0; i < count; i++) {
    const mesh = getChunkMesh(color);
    const angle = Math.random() * Math.PI * 2;
    const spread = Math.random() * radius * 0.4;

    mesh.position.set(
      position.x + Math.cos(angle) * spread,
      position.y + Math.random() * radius * 0.3,
      position.z + Math.sin(angle) * spread,
    );

    const s = (0.5 + Math.random() * 0.9) * (isBoss ? 1.6 : 1);
    mesh.scale.setScalar(s);
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );

    scene.add(mesh);

    chunks.push({
      mesh,
      vx: Math.cos(angle) * power * (0.4 + Math.random() * 0.8),
      vy: 0.1 + Math.random() * power * 1.2,
      vz: Math.sin(angle) * power * (0.4 + Math.random() * 0.8),
      ax: (Math.random() - 0.5) * 0.35,
      az: (Math.random() - 0.5) * 0.35,
      age: 0,
      maxAge: 100 + Math.random() * 80,
      bounced: false,
    });
  }

  playNoise({ duration: 0.09, volume: isBoss ? 0.15 : 0.07, bandpass: 900 });
  playTone({
    freq: 160 + Math.random() * 100,
    type: 'triangle',
    duration: 0.14,
    volume: isBoss ? 0.1 : 0.05,
  });
}

/** Step physics and render all active debris. */
export function updateDebris(scene: THREE.Scene, dt60: number) {
  for (let i = chunks.length - 1; i >= 0; i--) {
    const c = chunks[i];
    c.age += dt60;

    c.vy += GRAVITY * dt60;
    c.mesh.position.x += c.vx * dt60;
    c.mesh.position.y += c.vy * dt60;
    c.mesh.position.z += c.vz * dt60;

    c.mesh.rotation.x += c.ax * dt60;
    c.mesh.rotation.z += c.az * dt60;

    if (c.mesh.position.y < GROUND_Y) {
      c.mesh.position.y = GROUND_Y;
      c.vy = Math.abs(c.vy) * RESTITUTION;
      c.vx *= 0.75;
      c.vz *= 0.75;
      c.ax *= 0.4;
      c.az *= 0.4;

      if (!c.bounced && c.vy > 0.015) {
        c.bounced = true;
        playTone({
          freq: 280 + Math.random() * 500,
          type: 'sine',
          duration: 0.03,
          volume: Math.min(0.03, c.vy * 0.25),
        });
      }
    }

    c.vx *= DAMPING;
    c.vz *= DAMPING;

    // Fade and shrink in last 40% of life
    const fadeStart = c.maxAge * 0.6;
    if (c.age > fadeStart) {
      const t = (c.age - fadeStart) / (c.maxAge - fadeStart);
      const mat = c.mesh.material as THREE.MeshLambertMaterial;
      mat.opacity = 1 - t;
      mat.emissiveIntensity = 0.6 * (1 - t);
      c.mesh.scale.multiplyScalar(0.993);
    }

    if (c.age >= c.maxAge) {
      scene.remove(c.mesh);
      c.mesh.visible = false;
      pool.push(c.mesh);
      chunks.splice(i, 1);
    }
  }
}

/** Remove all active debris (game reset). */
export function clearDebris(scene: THREE.Scene) {
  for (const c of chunks) {
    scene.remove(c.mesh);
    c.mesh.visible = false;
    pool.push(c.mesh);
  }
  chunks.length = 0;
}
