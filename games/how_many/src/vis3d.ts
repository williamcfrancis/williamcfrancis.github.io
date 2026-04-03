import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CalculationResult } from './calculator';

/* ── Per-item material classification ───────────────────── */

type MatType = 'metal' | 'plastic' | 'glossy' | 'matte' | 'organic' | 'glass';

const MAT_MAP: Record<string, MatType> = {
  penny: 'metal', paperclip: 'metal', usb_c: 'metal',
  sd_card: 'metal', soda_can: 'metal',

  mm_candy: 'plastic', lego_brick: 'plastic', billiard_ball: 'plastic',
  rubiks_cube: 'plastic', iphone: 'plastic', computer_mouse: 'plastic',
  tv_remote: 'plastic',

  tennis_ball: 'matte', ant: 'matte', postage_stamp: 'matte',

  grain_of_rice: 'organic', grain_of_sand: 'organic', sesame_seed: 'organic',
  blueberry: 'organic', cherry: 'organic', apple: 'organic',
  banana: 'organic', watermelon: 'organic',

  lightbulb: 'glass', pill_capsule: 'glossy',
  golf_ball: 'glossy', baseball: 'glossy', basketball: 'glossy',
  coffee_mug: 'glossy',
};

function matProps(id: string): Partial<THREE.MeshPhysicalMaterialParameters> {
  const t = MAT_MAP[id] ?? 'glossy';
  switch (t) {
    case 'metal':
      return { roughness: 0.15, metalness: 0.85, clearcoat: 0.3, clearcoatRoughness: 0.2 };
    case 'plastic':
      return { roughness: 0.1, metalness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.05 };
    case 'glossy':
      return { roughness: 0.25, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.15 };
    case 'matte':
      return { roughness: 0.85, metalness: 0.0 };
    case 'organic':
      return { roughness: 0.5, metalness: 0.0, clearcoat: 0.2, clearcoatRoughness: 0.5 };
    case 'glass':
      return { roughness: 0.05, metalness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.0 };
  }
}

/* ── Procedural environment map for PBR reflections ─────── */

function buildEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);

  const envScene = new THREE.Scene();
  const geo = new THREE.SphereGeometry(50, 64, 32);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      void main() {
        float y = vDir.y * 0.5 + 0.5;

        vec3 lo = vec3(0.01, 0.01, 0.03);
        vec3 mi = vec3(0.04, 0.05, 0.15);
        vec3 hi = vec3(0.10, 0.10, 0.30);

        vec3 c = mix(lo, mi, smoothstep(0.0, 0.35, y));
        c = mix(c, hi, smoothstep(0.4, 1.0, y));

        float s1 = pow(max(0.0, dot(vDir, normalize(vec3( 1.0, 0.7, 0.5)))), 128.0);
        float s2 = pow(max(0.0, dot(vDir, normalize(vec3(-0.6, 0.4,-0.8)))),  64.0);
        float s3 = pow(max(0.0, dot(vDir, normalize(vec3( 0.0, 1.0, 0.0)))),  16.0);

        c += vec3(1.0, 0.95, 0.85) * s1 * 3.0;
        c += vec3(0.0, 0.90, 1.00) * s2 * 1.5;
        c += vec3(0.15, 0.20, 0.40) * s3 * 0.8;

        gl_FragColor = vec4(c, 1.0);
      }
    `,
  });
  envScene.add(new THREE.Mesh(geo, mat));

  const rt = pmrem.fromScene(envScene, 0, 0.1, 100);
  const texture = rt.texture;

  pmrem.dispose();
  geo.dispose();
  mat.dispose();

  return texture;
}

/* ── Custom geometry: Lego brick with studs ─────────────── */

function legoGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
  const bodyH = h * 0.78;
  const studH = h * 0.22;
  const studR = Math.min(w, d) * 0.11;

  const body = new THREE.BoxGeometry(w, bodyH, d);
  body.translate(0, bodyH / 2, 0);

  const parts: THREE.BufferGeometry[] = [body];
  const nx = 4, nz = 2;
  const sx = w / nx, sz = d / nz;

  for (let ix = 0; ix < nx; ix++) {
    for (let iz = 0; iz < nz; iz++) {
      const stud = new THREE.CylinderGeometry(studR, studR, studH, 8);
      stud.translate(
        -w / 2 + sx * (ix + 0.5),
        bodyH + studH / 2,
        -d / 2 + sz * (iz + 0.5),
      );
      parts.push(stud);
    }
  }

  const merged = mergeGeometries(parts);
  if (!merged) return new THREE.BoxGeometry(w, h, d);

  merged.computeBoundingBox();
  const center = new THREE.Vector3();
  merged.boundingBox!.getCenter(center);
  merged.translate(-center.x, -center.y, -center.z);

  for (const g of parts) g.dispose();
  return merged;
}

/* ── Main visualisation class ───────────────────────────── */

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
  private envTexture: THREE.Texture | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    const w = container.clientWidth;
    const h = container.clientHeight;

    /* ── renderer ─────────────────────────── */
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    /* ── scene ─────────────────────────────── */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080a14);
    this.scene.fog = new THREE.FogExp2(0x080a14, 0.012);

    this.envTexture = buildEnvMap(this.renderer);
    this.scene.environment = this.envTexture;

    /* ── camera ────────────────────────────── */
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 500);
    this.camera.position.set(3, 2.5, 4);

    /* ── controls ──────────────────────────── */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;
    this.controls.maxPolarAngle = Math.PI * 0.85;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 25;

    /* ── lighting ──────────────────────────── */
    this.scene.add(new THREE.HemisphereLight(0x8899bb, 0x222244, 0.5));

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(5, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 30;
    const sc = 8;
    key.shadow.camera.left = -sc;
    key.shadow.camera.right = sc;
    key.shadow.camera.top = sc;
    key.shadow.camera.bottom = -sc;
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.02;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x4488cc, 0.35);
    fill.position.set(-4, 3, -3);
    this.scene.add(fill);

    const rim = new THREE.PointLight(0x00e5ff, 0.5, 20);
    rim.position.set(-4, 6, -5);
    this.scene.add(rim);

    /* ── ground plane ──────────────────────── */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x0a0c18, roughness: 0.6, metalness: 0.4 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.005;
    ground.receiveShadow = true;
    this.scene.add(ground);

    window.addEventListener('resize', this.onResize);
  }

  /* ── resize ──────────────────────────────────────────── */

  private onResize = () => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  /* ── glass container ─────────────────────────────────── */

  private createContainer(result: CalculationResult) {
    const [lw, lh, ld] = result.large.dimensions;
    const maxDim = Math.max(lw, lh, ld);
    const scale = 3 / maxDim;
    const sw = lw * scale;
    const sh = lh * scale;
    const sd = ld * scale;

    const containerGeo = new THREE.BoxGeometry(sw, sh, sd);

    const glass = new THREE.Mesh(
      containerGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x88ddff,
        transparent: true,
        opacity: 0.08,
        roughness: 0.05,
        metalness: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false,
        envMapIntensity: 2.0,
      }),
    );
    glass.position.set(0, sh / 2, 0);
    glass.renderOrder = 1;
    this.scene.add(glass);

    const edges = new THREE.EdgesGeometry(containerGeo);
    const edgeMesh = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5 }),
    );
    edgeMesh.position.copy(glass.position);
    edgeMesh.renderOrder = 2;
    this.scene.add(edgeMesh);

    return { sw, sh, sd, scale };
  }

  /* ── position generation ─────────────────────────────── */

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

  /* ── instanced mesh with PBR materials ───────────────── */

  private createInstances(
    result: CalculationResult,
    maxCount: number,
    scale: number,
  ) {
    const [smW, smH, smD] = result.small.dimensions.map((d) => d * scale);

    let geometry: THREE.BufferGeometry;

    if (result.small.id === 'lego_brick') {
      geometry = legoGeometry(smW, smH, smD);
    } else if (result.small.id === 'pill_capsule') {
      const r = Math.max(smW, smD) / 2;
      const bodyLen = Math.max(0, smH - 2 * r);
      geometry = new THREE.CapsuleGeometry(r, bodyLen, 8, 16);
    } else if (result.small.shape === 'sphere') {
      const radius = Math.max(smW, smH, smD) / 2;
      geometry = new THREE.SphereGeometry(radius, 24, 16);
    } else if (result.small.shape === 'cylinder') {
      const r = Math.max(smW, smD) / 2;
      geometry = new THREE.CylinderGeometry(r, r, smH, 24);
    } else {
      const minDim = Math.min(smW, smH, smD);
      const cornerRadius = minDim * 0.08;
      try {
        geometry = new RoundedBoxGeometry(smW, smH, smD, 2, cornerRadius);
      } catch {
        geometry = new THREE.BoxGeometry(smW, smH, smD);
      }
    }

    const isRainbow = result.small.id === 'mm_candy' || result.small.id === 'lego_brick';
    const color = new THREE.Color(isRainbow ? 0xffffff : result.small.color);
    const mp = matProps(result.small.id);
    const material = new THREE.MeshPhysicalMaterial({ color, ...mp });

    const mesh = new THREE.InstancedMesh(geometry, material, maxCount);
    mesh.count = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (isRainbow) {
      const palette = [0xe53935, 0x1e88e5, 0x43a047, 0xfdd835, 0xff8f00, 0x8e24aa];
      for (let i = 0; i < maxCount; i++) {
        mesh.setColorAt(i, new THREE.Color(palette[i % palette.length]));
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    this.scene.add(mesh);
    return mesh;
  }

  /* ── start ───────────────────────────────────────────── */

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

  /* ── animation loop ──────────────────────────────────── */

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

  /* ── cleanup ─────────────────────────────────────────── */

  destroy() {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);

    this.controls.dispose();

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m: THREE.Material) => m.dispose());
        } else if (obj.material) {
          (obj.material as THREE.Material).dispose();
        }
      }
    });

    this.envTexture?.dispose();
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
