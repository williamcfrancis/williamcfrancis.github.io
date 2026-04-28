import {
  Scene,
  Vector3,
  Mesh,
  MeshBuilder,
  Color3,
  Color4,
  PBRMaterial,
  StandardMaterial,
  HemisphericLight,
  DirectionalLight,
  PointLight,
} from '@babylonjs/core';
import type { Platform } from './types';

export interface MapData {
  spawnPoints: Vector3[];
  pickupLocations: Vector3[];
  shadowGenerator: null;
  platforms: Platform[];
  wallRunSurfaces: Mesh[];
  grapplePoints: Vector3[];
  animatedMeshes: { mesh: Mesh; rotSpeed: Vector3; baseY: number; bobSpeed: number; bobAmount: number }[];
}

export function buildMap(scene: Scene): MapData {
  scene.clearColor = new Color4(0.04, 0.03, 0.08, 1);
  scene.ambientColor = new Color3(0.15, 0.12, 0.2);
  scene.fogMode = Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.003;
  scene.fogColor = new Color3(0.05, 0.03, 0.1);

  // Lights
  const hemi = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
  hemi.intensity = 1.0;
  hemi.diffuse = new Color3(0.6, 0.5, 0.8);
  hemi.groundColor = new Color3(0.2, 0.15, 0.25);

  const dirLight = new DirectionalLight('dir', new Vector3(-0.5, -1, 0.5), scene);
  dirLight.intensity = 1.2;
  dirLight.diffuse = new Color3(0.7, 0.6, 1.0);
  dirLight.position = new Vector3(0, 80, 0);

  const shadowGen: { addShadowCaster: (m: Mesh) => void } | null = null;

  // Materials
  const floorMat = new PBRMaterial('floor', scene);
  floorMat.albedoColor = new Color3(0.08, 0.06, 0.1);
  floorMat.roughness = 0.9;
  floorMat.metallic = 0.05;

  const wallMat = new PBRMaterial('wall', scene);
  wallMat.albedoColor = new Color3(0.1, 0.07, 0.12);
  wallMat.roughness = 0.8;
  wallMat.metallic = 0.1;

  const platformMat = new PBRMaterial('platform', scene);
  platformMat.albedoColor = new Color3(0.09, 0.07, 0.11);
  platformMat.roughness = 0.8;
  platformMat.metallic = 0.1;

  const neonCyan = new PBRMaterial('neonCyan', scene);
  neonCyan.albedoColor = new Color3(0, 0.2, 0.3);
  neonCyan.emissiveColor = new Color3(0, 0.8, 1);
  neonCyan.emissiveIntensity = 3;
  neonCyan.roughness = 0.3;
  neonCyan.metallic = 0.3;

  const neonMagenta = new PBRMaterial('neonMagenta', scene);
  neonMagenta.albedoColor = new Color3(0.3, 0, 0.2);
  neonMagenta.emissiveColor = new Color3(1, 0, 0.6);
  neonMagenta.emissiveIntensity = 3;
  neonMagenta.roughness = 0.3;
  neonMagenta.metallic = 0.3;

  const neonPurple = new PBRMaterial('neonPurple', scene);
  neonPurple.albedoColor = new Color3(0.15, 0, 0.3);
  neonPurple.emissiveColor = new Color3(0.5, 0.1, 1);
  neonPurple.emissiveIntensity = 3;
  neonPurple.roughness = 0.3;
  neonPurple.metallic = 0.3;

  const neonOrange = new PBRMaterial('neonOrange', scene);
  neonOrange.albedoColor = new Color3(0.3, 0.1, 0);
  neonOrange.emissiveColor = new Color3(1, 0.4, 0);
  neonOrange.emissiveIntensity = 3;
  neonOrange.roughness = 0.3;
  neonOrange.metallic = 0.3;

  const neonMats = [neonCyan, neonMagenta, neonPurple, neonOrange];

  // Ground
  const ground = MeshBuilder.CreateGround('ground', { width: 180, height: 180 }, scene);
  ground.material = floorMat;
  ground.checkCollisions = true;
  ground.receiveShadows = true;

  // Grid lines on floor
  const gridLines: Mesh[] = [];
  for (let i = -90; i <= 90; i += 20) {
    const lineX = MeshBuilder.CreateBox(`gridX_${i}`, { width: 180, height: 0.02, depth: 0.06 }, scene);
    lineX.position = new Vector3(0, 0.01, i);
    lineX.material = neonCyan;
    lineX.isPickable = false;
    gridLines.push(lineX);

    const lineZ = MeshBuilder.CreateBox(`gridZ_${i}`, { width: 0.06, height: 0.02, depth: 180 }, scene);
    lineZ.position = new Vector3(i, 0.01, 0);
    lineZ.material = neonCyan;
    lineZ.isPickable = false;
    gridLines.push(lineZ);
  }

  // Arena boundary walls
  const wallRunSurfaces: Mesh[] = [];
  const boundaryPositions: [number, number, number, number, number][] = [
    [0, 6, -90, 180, 12],
    [0, 6, 90, 180, 12],
    [-90, 6, 0, 12, 180],
    [90, 6, 0, 12, 180],
  ];

  boundaryPositions.forEach(([x, y, z, w, d], i) => {
    const isXWall = w > d;
    const wall = MeshBuilder.CreateBox(`bwall_${i}`, {
      width: isXWall ? w : 1.5,
      height: y * 2,
      depth: isXWall ? 1.5 : d,
    }, scene);
    wall.position = new Vector3(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    wall.receiveShadows = true;
    wallRunSurfaces.push(wall);
    shadowGen?.addShadowCaster(wall);

    // Neon trim on walls
    const trim = MeshBuilder.CreateBox(`bwallTrim_${i}`, {
      width: isXWall ? w : 0.1,
      height: 0.1,
      depth: isXWall ? 0.1 : d,
    }, scene);
    trim.position = new Vector3(x, 2, z);
    trim.material = neonMats[i % 4];
    trim.isPickable = false;

    const trimHigh = trim.clone(`bwallTrimH_${i}`);
    trimHigh.position.y = 8;
  });

  // Platforms
  const platforms: Platform[] = [];

  const createPlatform = (x: number, y: number, z: number, w: number, d: number, h: number, mat: PBRMaterial, neonIdx: number): Platform => {
    const plat = MeshBuilder.CreateBox(`plat_${x}_${z}`, { width: w, height: h, depth: d }, scene);
    plat.position = new Vector3(x, y, z);
    plat.material = mat;
    plat.checkCollisions = true;
    plat.receiveShadows = true;
    shadowGen?.addShadowCaster(plat);

    // Neon edge trim
    const edgeMat = neonMats[neonIdx % 4];
    const trimTop = MeshBuilder.CreateBox(`platTrim_${x}_${z}`, { width: w + 0.2, height: 0.08, depth: d + 0.2 }, scene);
    trimTop.position = new Vector3(x, y + h / 2 + 0.04, z);
    trimTop.material = edgeMat;
    trimTop.isPickable = false;

    const platform: Platform = { mesh: plat, position: new Vector3(x, y, z), width: w, depth: d, height: h };
    platforms.push(platform);
    return platform;
  };

  // Center tower
  createPlatform(0, 1.5, 0, 14, 14, 3, platformMat, 0);
  createPlatform(0, 5, 0, 8, 8, 1.5, platformMat, 2);

  // Ramps to center
  const rampMat = new PBRMaterial('ramp', scene);
  rampMat.albedoColor = new Color3(0.08, 0.07, 0.1);
  rampMat.roughness = 0.8;
  rampMat.metallic = 0.1;

  const createRamp = (x: number, z: number, rotY: number): void => {
    const ramp = MeshBuilder.CreateBox('ramp', { width: 4, height: 0.3, depth: 10 }, scene);
    ramp.position = new Vector3(x, 1.5, z);
    ramp.rotation.x = -Math.atan2(3, 10);
    ramp.rotation.y = rotY;
    ramp.material = rampMat;
    ramp.checkCollisions = true;
    ramp.receiveShadows = true;
    shadowGen?.addShadowCaster(ramp);

    const rampTrim = MeshBuilder.CreateBox('rampTrim', { width: 4.2, height: 0.06, depth: 10.2 }, scene);
    rampTrim.position = ramp.position.clone();
    rampTrim.position.y += 0.18;
    rampTrim.rotation = ramp.rotation.clone();
    rampTrim.material = neonCyan;
    rampTrim.isPickable = false;
  };

  createRamp(0, -11, 0);
  createRamp(0, 11, Math.PI);
  createRamp(-11, 0, Math.PI / 2);
  createRamp(11, 0, -Math.PI / 2);

  // Corner elevated platforms (sniper perches)
  const corners: [number, number, number][] = [[-55, 0, -55], [55, 0, -55], [-55, 0, 55], [55, 0, 55]];
  corners.forEach(([cx, , cz], i) => {
    createPlatform(cx, 4, cz, 12, 12, 8, platformMat, i);

    // Stairs to corner platforms
    for (let s = 0; s < 4; s++) {
      const stairX = cx + (i % 2 === 0 ? 8 : -8);
      const stairZ = cz + (i < 2 ? 6 - s * 3 : -6 + s * 3);
      createPlatform(stairX, 2 + s * 2, stairZ, 4, 3, 0.5, rampMat, i);
    }
  });

  // Mid-height catwalks connecting corners
  const catwalkMat = new PBRMaterial('catwalk', scene);
  catwalkMat.albedoColor = new Color3(0.08, 0.06, 0.1);
  catwalkMat.roughness = 0.8;
  catwalkMat.metallic = 0.1;

  const catwalks: [number, number, number, number, number][] = [
    [0, 6, -55, 98, 3],
    [0, 6, 55, 98, 3],
    [-55, 6, 0, 3, 98],
    [55, 6, 0, 3, 98],
  ];

  catwalks.forEach(([x, y, z, w, d], i) => {
    const cw = MeshBuilder.CreateBox(`catwalk_${i}`, { width: w, height: 0.3, depth: d }, scene);
    cw.position = new Vector3(x, y, z);
    cw.material = catwalkMat;
    cw.checkCollisions = true;
    cw.receiveShadows = true;
    shadowGen?.addShadowCaster(cw);

    const cwTrim = MeshBuilder.CreateBox(`cwTrim_${i}`, { width: w + 0.1, height: 0.06, depth: d + 0.1 }, scene);
    cwTrim.position = new Vector3(x, y + 0.18, z);
    cwTrim.material = neonMats[i % 4];
    cwTrim.isPickable = false;

    platforms.push({ mesh: cw, position: new Vector3(x, y, z), width: w, depth: d, height: 0.3 });
  });

  // Cover blocks scattered around mid-field
  const coverPositions: [number, number, number, number, number][] = [
    [-30, 1, -30, 5, 3], [30, 1, -30, 5, 3],
    [-30, 1, 30, 5, 3], [30, 1, 30, 5, 3],
    [-50, 1, 0, 3, 7], [50, 1, 0, 3, 7],
    [0, 1, -50, 7, 3], [0, 1, 50, 7, 3],
    [-20, 1, -15, 2, 6], [20, 1, 15, 2, 6],
    [-15, 1, 20, 6, 2], [15, 1, -20, 6, 2],
    [-40, 1, -20, 3, 4], [40, 1, 20, 3, 4],
    [-20, 1, 40, 4, 3], [20, 1, -40, 4, 3],
  ];

  coverPositions.forEach(([x, y, z, w, d], i) => {
    const cover = MeshBuilder.CreateBox(`cover_${i}`, { width: w, height: 2.5, depth: d }, scene);
    cover.position = new Vector3(x, y + 0.25, z);
    cover.material = wallMat;
    cover.checkCollisions = true;
    cover.receiveShadows = true;
    wallRunSurfaces.push(cover);
    shadowGen?.addShadowCaster(cover);

    // Neon accent strip
    const strip = MeshBuilder.CreateBox(`coverStrip_${i}`, { width: w + 0.1, height: 0.06, depth: d + 0.1 }, scene);
    strip.position = new Vector3(x, y + 1.5, z);
    strip.material = neonMats[i % 4];
    strip.isPickable = false;
  });

  // Floating wall-run surfaces (vertical walls in mid-air)
  const wallRunPanels: [number, number, number, number, boolean][] = [
    [-35, 5, -10, 16, true],
    [35, 5, 10, 16, true],
    [-10, 5, -35, 16, false],
    [10, 5, 35, 16, false],
    [-25, 8, -40, 12, false],
    [25, 8, 40, 12, false],
  ];

  wallRunPanels.forEach(([x, y, z, len, isXAligned], i) => {
    const panel = MeshBuilder.CreateBox(`wrPanel_${i}`, {
      width: isXAligned ? 0.5 : len,
      height: 6,
      depth: isXAligned ? len : 0.5,
    }, scene);
    panel.position = new Vector3(x, y, z);
    panel.material = wallMat;
    panel.checkCollisions = true;
    wallRunSurfaces.push(panel);
    shadowGen?.addShadowCaster(panel);

    // Neon edge
    const edge = MeshBuilder.CreateBox(`wrEdge_${i}`, {
      width: isXAligned ? 0.08 : len + 0.1,
      height: 6.2,
      depth: isXAligned ? len + 0.1 : 0.08,
    }, scene);
    edge.position = new Vector3(
      x + (isXAligned ? 0.3 : 0),
      y,
      z + (isXAligned ? 0 : 0.3),
    );
    edge.material = neonMats[(i + 2) % 4];
    edge.isPickable = false;
  });

  // Neon pillar decorations
  const pillarPositions: [number, number][] = [
    [-70, -70], [70, -70], [-70, 70], [70, 70],
    [-40, -40], [40, -40], [-40, 40], [40, 40],
    [0, -70], [0, 70], [-70, 0], [70, 0],
  ];

  const animatedMeshes: MapData['animatedMeshes'] = [];

  pillarPositions.forEach(([x, z], i) => {
    const pillar = MeshBuilder.CreateBox(`pillar_${i}`, { width: 1, height: 16, depth: 1 }, scene);
    pillar.position = new Vector3(x, 8, z);
    pillar.material = wallMat;
    pillar.checkCollisions = true;
    wallRunSurfaces.push(pillar);
    shadowGen?.addShadowCaster(pillar);

    // Neon ring around pillar
    for (let r = 0; r < 3; r++) {
      const ring = MeshBuilder.CreateBox(`pillarRing_${i}_${r}`, { width: 2, height: 0.1, depth: 2 }, scene);
      ring.position = new Vector3(x, 3 + r * 5, z);
      ring.material = neonMats[(i + r) % 4];
      ring.isPickable = false;
    }
  });

  // Floating decorative elements
  const floatingPositions: [number, number, number][] = [
    [-30, 12, -30], [30, 14, -30], [-30, 11, 30], [30, 13, 30],
    [0, 16, 0], [-60, 10, 0], [60, 10, 0], [0, 10, -60], [0, 10, 60],
  ];

  floatingPositions.forEach(([x, y, z], i) => {
    const shape = i % 3 === 0
      ? MeshBuilder.CreateBox(`float_${i}`, { size: 1.5 }, scene)
      : i % 3 === 1
        ? MeshBuilder.CreateSphere(`float_${i}`, { diameter: 1.8, segments: 8 }, scene)
        : MeshBuilder.CreateBox(`float_${i}`, { width: 2, height: 0.5, depth: 2 }, scene);

    shape.position = new Vector3(x, y, z);
    shape.material = neonMats[i % 4];
    shape.isPickable = false;

    animatedMeshes.push({
      mesh: shape,
      rotSpeed: new Vector3(
        (Math.random() - 0.5) * 0.5,
        0.3 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.3,
      ),
      baseY: y,
      bobSpeed: 0.5 + Math.random() * 0.8,
      bobAmount: 0.5 + Math.random() * 1,
    });
  });

  // Single accent light at center (cheap atmosphere). Other corner colors come from emissive trims.
  const centerLight = new PointLight('pLightCenter', new Vector3(0, 8, 0), scene);
  centerLight.diffuse = new Color3(0, 1, 0.8);
  centerLight.intensity = 8;
  centerLight.range = 30;

  // Grapple points (visible orbs at strategic locations)
  const grapplePoints: Vector3[] = [
    new Vector3(0, 14, 0),
    new Vector3(-40, 12, -40),
    new Vector3(40, 12, -40),
    new Vector3(-40, 12, 40),
    new Vector3(40, 12, 40),
    new Vector3(-60, 10, 0),
    new Vector3(60, 10, 0),
    new Vector3(0, 10, -60),
    new Vector3(0, 10, 60),
    new Vector3(-20, 9, -20),
    new Vector3(20, 9, -20),
    new Vector3(-20, 9, 20),
    new Vector3(20, 9, 20),
  ];

  grapplePoints.forEach((pos, i) => {
    const orb = MeshBuilder.CreateSphere(`grappleOrb_${i}`, { diameter: 0.8, segments: 8 }, scene);
    orb.position = pos;
    orb.material = neonCyan;
    orb.isPickable = false;

    const ring = MeshBuilder.CreateTorus(`grappleRing_${i}`, { diameter: 1.6, thickness: 0.08, tessellation: 16 }, scene);
    ring.position = pos;
    ring.material = neonCyan;
    ring.isPickable = false;

    animatedMeshes.push({
      mesh: ring,
      rotSpeed: new Vector3(0, 1.5, 0.8),
      baseY: pos.y,
      bobSpeed: 1,
      bobAmount: 0.2,
    });
  });

  // Spawn points
  const spawnPoints: Vector3[] = [
    new Vector3(-70, 1, -70), new Vector3(70, 1, -70),
    new Vector3(-70, 1, 70), new Vector3(70, 1, 70),
    new Vector3(-60, 1, 0), new Vector3(60, 1, 0),
    new Vector3(0, 1, -60), new Vector3(0, 1, 60),
    new Vector3(-40, 1, -50), new Vector3(40, 1, -50),
    new Vector3(-40, 1, 50), new Vector3(40, 1, 50),
    new Vector3(-50, 9, -55), new Vector3(50, 9, -55),
    new Vector3(-50, 9, 55), new Vector3(50, 9, 55),
  ];

  // Pickup locations
  const pickupLocations: Vector3[] = [
    new Vector3(0, 5.75, 0),
    new Vector3(-30, 0, -30), new Vector3(30, 0, -30),
    new Vector3(-30, 0, 30), new Vector3(30, 0, 30),
    new Vector3(-55, 8, -55), new Vector3(55, 8, -55),
    new Vector3(-55, 8, 55), new Vector3(55, 8, 55),
    new Vector3(0, 0, -40), new Vector3(0, 0, 40),
    new Vector3(-40, 0, 0), new Vector3(40, 0, 0),
    new Vector3(-15, 6, -55), new Vector3(15, 6, 55),
  ];

  return {
    spawnPoints,
    pickupLocations,
    shadowGenerator: shadowGen,
    platforms,
    wallRunSurfaces,
    grapplePoints,
    animatedMeshes,
  };
}
