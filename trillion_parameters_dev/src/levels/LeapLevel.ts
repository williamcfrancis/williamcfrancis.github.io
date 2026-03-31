import * as THREE from 'three';
import type { Level } from './Level';

export class LeapLevel implements Level {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private gpt3Points: THREE.Points | null = null;
  private gpt4Points: THREE.Points | null = null;
  private time = 0;

  constructor(scene: THREE.Scene, _renderer: THREE.WebGLRenderer, _camera: THREE.Camera) {
    this.scene = scene;
    this.group = new THREE.Group();
    (this.group as any)._levelObject = true;
  }

  init() {
    this.gpt3Points = this.createGrid(1400, 2.5, 0x4ecdc4, 0.06);
    this.group.add(this.gpt3Points);

    this.gpt4Points = this.createGrid(5000, 5, 0xa8e6cf, 0.04);
    this.gpt4Points.position.z = -3;
    this.group.add(this.gpt4Points);
  }

  private createGrid(count: number, spread: number, color: number, size: number): THREE.Points {
    const positions = new Float32Array(count * 3);
    const cols = Math.ceil(Math.sqrt(count));
    const spacing = spread * 2 / cols;

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      positions[i * 3] = (col - cols / 2) * spacing;
      positions[i * 3 + 1] = (row - cols / 2) * spacing;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return new THREE.Points(geo, mat);
  }

  update(dt: number, localZoom: number, opacity: number) {
    this.time += dt;

    this.scene.add(this.group);
    this.group.visible = opacity > 0.01;

    if (this.gpt3Points) {
      const mat = this.gpt3Points.material as THREE.PointsMaterial;
      const gpt3Vis = localZoom < 0.5 ? 1 : Math.max(0, 1 - (localZoom - 0.5) * 3);
      mat.opacity = opacity * gpt3Vis * 0.7;
      this.gpt3Points.rotation.z = this.time * 0.02;
    }

    if (this.gpt4Points) {
      const mat = this.gpt4Points.material as THREE.PointsMaterial;
      const gpt4Vis = localZoom > 0.35 ? Math.min(1, (localZoom - 0.35) * 3) : 0;
      mat.opacity = opacity * gpt4Vis * 0.5;
      this.gpt4Points.rotation.z = -this.time * 0.015;
    }

    this.group.rotation.y = Math.sin(this.time * 0.1) * 0.08;
  }

  render(_opacity: number) {}
}
