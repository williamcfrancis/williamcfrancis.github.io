import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CalculationResult } from './calculator';

export class Vis3D {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private container: HTMLElement;
  private instances: THREE.InstancedMesh | null = null;
  private animFrameId = 0;
  private currentCount = 0;
  private targetCount = 0;
  private positions: THREE.Matrix4[] = [];
  private pourRate = 200;
  private lastTime = 0;
  private result: CalculationResult | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0d17);
    this.scene.fog = new THREE.FogExp2(0x0b0d17, 0.015);

    const w = container.clientWidth;
    const h = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.01, 1000);
    this.camera.position.set(3, 2.5, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 0.5, 20);
    pointLight.position.set(-3, 5, -3);
    this.scene.add(pointLight);

    window.addEventListener('resize', this.onResize);
  }

  private onResize = () => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private createContainer(result: CalculationResult) {
    const [lw, lh, ld] = result.large.dimensions;

    const maxDim = Math.max(lw, lh, ld);
    const scale = 3 / maxDim;
    const sw = lw * scale;
    const sh = lh * scale;
    const sd = ld * scale;

    const containerGeo = new THREE.BoxGeometry(sw, sh, sd);

    const wireframe = new THREE.Mesh(
      containerGeo,
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    );
    wireframe.position.set(0, sh / 2, 0);
    this.scene.add(wireframe);

    const edges = new THREE.EdgesGeometry(containerGeo);
    const edgeMesh = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.4 }),
    );
    edgeMesh.position.copy(wireframe.position);
    this.scene.add(edgeMesh);

    return { sw, sh, sd, scale };
  }

  private generatePositions(
    result: CalculationResult,
    containerDims: { sw: number; sh: number; sd: number; scale: number },
  ) {
    const { sw, sh, sd, scale } = containerDims;
    const [smW, smH, smD] = result.small.dimensions.map((d) => d * scale);

    const positions: THREE.Matrix4[] = [];
    const maxCount = Math.min(result.count, 5000);

    if (result.small.shape === 'sphere') {
      const radius = Math.max(smW, smH, smD) / 2;
      const spacing = radius * 2.05;
      const nx = Math.floor(sw / spacing);
      const ny = Math.floor(sh / spacing);
      const nz = Math.floor(sd / spacing);

      const startX = -(nx * spacing) / 2 + radius;
      const startZ = -(nz * spacing) / 2 + radius;

      for (let y = 0; y < ny && positions.length < maxCount; y++) {
        for (let x = 0; x < nx && positions.length < maxCount; x++) {
          for (let z = 0; z < nz && positions.length < maxCount; z++) {
            const offsetX = (y % 2) * spacing * 0.5;
            const mat = new THREE.Matrix4();
            mat.setPosition(
              startX + x * spacing + offsetX,
              radius + y * spacing,
              startZ + z * spacing,
            );
            positions.push(mat);
          }
        }
      }
    } else {
      const spacingX = smW * 1.02;
      const spacingY = smH * 1.02;
      const spacingZ = smD * 1.02;
      const nx = Math.max(1, Math.floor(sw / spacingX));
      const ny = Math.max(1, Math.floor(sh / spacingY));
      const nz = Math.max(1, Math.floor(sd / spacingZ));

      const startX = -(nx * spacingX) / 2 + spacingX / 2;
      const startZ = -(nz * spacingZ) / 2 + spacingZ / 2;

      for (let y = 0; y < ny && positions.length < maxCount; y++) {
        for (let x = 0; x < nx && positions.length < maxCount; x++) {
          for (let z = 0; z < nz && positions.length < maxCount; z++) {
            const mat = new THREE.Matrix4();
            mat.setPosition(
              startX + x * spacingX,
              spacingY / 2 + y * spacingY,
              startZ + z * spacingZ,
            );
            positions.push(mat);
          }
        }
      }
    }

    return positions;
  }

  private createInstances(
    result: CalculationResult,
    maxCount: number,
    scale: number,
  ) {
    const [smW, smH, smD] = result.small.dimensions.map((d) => d * scale);

    let geometry: THREE.BufferGeometry;

    if (result.small.shape === 'sphere') {
      const radius = Math.max(smW, smH, smD) / 2;
      geometry = new THREE.SphereGeometry(radius, 12, 8);
    } else if (result.small.shape === 'cylinder') {
      geometry = new THREE.CylinderGeometry(
        Math.max(smW, smD) / 2,
        Math.max(smW, smD) / 2,
        smH,
        12,
      );
    } else {
      geometry = new THREE.BoxGeometry(smW, smH, smD);
    }

    const color = new THREE.Color(result.small.color);
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.1,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, maxCount);
    mesh.count = 0;

    const isRainbow = result.small.id === 'mm_candy' || result.small.id === 'lego_brick';
    if (isRainbow) {
      const colors = [0xe53935, 0x1e88e5, 0x43a047, 0xfdd835, 0xff8f00, 0x8e24aa];
      for (let i = 0; i < maxCount; i++) {
        const c = new THREE.Color(colors[i % colors.length]);
        mesh.setColorAt(i, c);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    this.scene.add(mesh);
    return mesh;
  }

  start(result: CalculationResult) {
    this.result = result;
    this.targetCount = Math.min(result.count, 5000);
    this.currentCount = 0;

    const containerDims = this.createContainer(result);
    this.positions = this.generatePositions(result, containerDims);
    this.targetCount = Math.min(this.targetCount, this.positions.length);
    this.instances = this.createInstances(
      result,
      this.positions.length,
      containerDims.scale,
    );

    this.camera.position.set(
      containerDims.sw * 1.5,
      containerDims.sh * 1.2,
      containerDims.sd * 1.5,
    );
    this.camera.lookAt(0, containerDims.sh / 2, 0);
    this.controls.target.set(0, containerDims.sh / 2, 0);

    this.lastTime = performance.now();
    this.pourRate = Math.max(50, Math.min(500, this.targetCount / 8));
    this.animate();
  }

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (this.instances && this.currentCount < this.targetCount) {
      const toAdd = Math.ceil(this.pourRate * dt);
      const end = Math.min(this.currentCount + toAdd, this.targetCount);

      for (let i = this.currentCount; i < end; i++) {
        if (this.positions[i]) {
          this.instances.setMatrixAt(i, this.positions[i]);
        }
      }

      this.currentCount = end;
      this.instances.count = this.currentCount;
      this.instances.instanceMatrix.needsUpdate = true;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  destroy() {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);

    this.controls.dispose();
    this.renderer.dispose();
    this.scene.clear();

    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }

  getProgress(): number {
    if (this.targetCount === 0) return 1;
    return this.currentCount / this.targetCount;
  }
}
