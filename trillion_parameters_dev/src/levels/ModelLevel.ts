import * as THREE from 'three';
import type { Level } from './Level';

export class ModelLevel implements Level {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private layers: THREE.Mesh[] = [];
  private edges: THREE.LineSegments[] = [];
  private embedMesh!: THREE.Mesh;
  private headMesh!: THREE.Mesh;
  private time = 0;
  private layerCount = 12;
  private pulseMesh!: THREE.Mesh;

  constructor(scene: THREE.Scene, _renderer: THREE.WebGLRenderer, _camera: THREE.Camera) {
    this.scene = scene;
    this.group = new THREE.Group();
    (this.group as any)._levelObject = true;
  }

  init() {
    const layerH = 0.1;
    const layerGap = 0.2;
    const totalH = this.layerCount * (layerH + layerGap);
    const startY = -totalH / 2;

    const geo = new THREE.BoxGeometry(2.8, layerH, 0.15);
    const edgeGeo = new THREE.EdgesGeometry(geo);

    for (let i = 0; i < this.layerCount; i++) {
      const hue = 0.47 + i * 0.008;
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.45, 0.18),
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = startY + i * (layerH + layerGap);
      this.layers.push(mesh);
      this.group.add(mesh);

      const edge = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.2 })
      );
      edge.position.copy(mesh.position);
      this.edges.push(edge);
      this.group.add(edge);
    }

    const embedGeo = new THREE.BoxGeometry(2.8, 0.12, 0.15);
    const embedMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1a4a3a),
      transparent: true, opacity: 0.6,
    });
    this.embedMesh = new THREE.Mesh(embedGeo, embedMat);
    this.embedMesh.position.y = startY - layerGap * 1.8;
    this.group.add(this.embedMesh);

    const headGeo = new THREE.BoxGeometry(2.8, 0.12, 0.15);
    const headMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x4a3a1a),
      transparent: true, opacity: 0.6,
    });
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.y = startY + this.layerCount * (layerH + layerGap) + layerGap * 0.3;
    this.group.add(this.headMesh);

    const pulseGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xf4c542,
      transparent: true, opacity: 0.8,
    });
    this.pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    this.group.add(this.pulseMesh);

    const connGeo = new THREE.BufferGeometry();
    const connPositions = new Float32Array(this.layerCount * 2 * 3);
    for (let i = 0; i < this.layerCount; i++) {
      const y = startY + i * (layerH + layerGap);
      connPositions[i * 6] = 0;
      connPositions[i * 6 + 1] = y - layerGap * 0.4;
      connPositions[i * 6 + 2] = 0;
      connPositions[i * 6 + 3] = 0;
      connPositions[i * 6 + 4] = y + layerH + layerGap * 0.1;
      connPositions[i * 6 + 5] = 0;
    }
    connGeo.setAttribute('position', new THREE.BufferAttribute(connPositions, 3));
    const connMat = new THREE.LineBasicMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.08 });
    const connLines = new THREE.LineSegments(connGeo, connMat);
    this.group.add(connLines);
  }

  update(dt: number, _localZoom: number, opacity: number) {
    this.time += dt;
    this.scene.add(this.group);
    this.group.visible = opacity > 0.01;

    for (let i = 0; i < this.layers.length; i++) {
      const mat = this.layers[i].material as THREE.MeshBasicMaterial;
      const pulse = Math.sin(this.time * 2 - i * 0.4);
      mat.color.setHSL(0.47 + i * 0.008, 0.45, 0.18 + pulse * 0.04);
      mat.opacity = opacity * (0.5 + pulse * 0.15);

      const edgeMat = this.edges[i].material as THREE.LineBasicMaterial;
      edgeMat.opacity = opacity * (0.15 + pulse * 0.08);
    }

    (this.embedMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5;
    (this.headMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5;

    const layerH = 0.1;
    const layerGap = 0.2;
    const totalH = this.layerCount * (layerH + layerGap);
    const startY = -totalH / 2;
    const endY = startY + totalH;
    const pulseT = (this.time * 0.4) % 1;
    const pulseY = startY + pulseT * totalH * 1.1;
    this.pulseMesh.position.set(0, pulseY, 0.15);
    (this.pulseMesh.material as THREE.MeshBasicMaterial).opacity = opacity *
      (pulseY > startY && pulseY < endY ? 0.7 : 0);

    this.group.rotation.y = Math.sin(this.time * 0.12) * 0.12;
    this.group.rotation.x = Math.sin(this.time * 0.08) * 0.03;
  }

  render(_opacity: number) {}
}
