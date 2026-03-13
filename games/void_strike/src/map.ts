import {
  Scene,
  MeshBuilder,
  Vector3,
  Color3,
  Color4,
  Mesh,
  HemisphericLight,
  DirectionalLight,
  StandardMaterial,
} from '@babylonjs/core';

const ARENA_SIZE = 80;
const WALL_HEIGHT = 12;

function makeStdMat(scene: Scene, name: string, color: Color3, emissive?: Color3): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = Color3.Black();
  if (emissive) mat.emissiveColor = emissive;
  mat.freeze();
  return mat;
}

export interface MapData {
  meshes: Mesh[];
  spawnPoints: Vector3[];
  pickupLocations: Vector3[];
  shadowGenerator: null;
  navMeshBounds: { min: Vector3; max: Vector3 };
  animatedMeshes: { mesh: Mesh; rotSpeed: Vector3; bobSpeed: number; bobAmount: number; baseY: number }[];
}

export function buildMap(scene: Scene): MapData {
  const allMeshes: Mesh[] = [];
  const spawnPoints: Vector3[] = [];
  const pickupLocations: Vector3[] = [];

  scene.clearColor = new Color4(0.35, 0.45, 0.55, 1);
  scene.ambientColor = new Color3(0.4, 0.4, 0.45);

  // Two cheap lights: hemisphere + directional
  const hemi = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
  hemi.intensity = 0.8;
  hemi.diffuse = new Color3(0.9, 0.9, 1);
  hemi.groundColor = new Color3(0.3, 0.3, 0.35);

  const dirLight = new DirectionalLight('dir', new Vector3(-0.5, -1, 0.3), scene);
  dirLight.intensity = 0.6;
  dirLight.diffuse = new Color3(1, 0.95, 0.85);

  // Floor
  const floorMat = makeStdMat(scene, 'floorMat', new Color3(0.35, 0.38, 0.42));
  const floor = MeshBuilder.CreateGround('floor', { width: ARENA_SIZE * 2, height: ARENA_SIZE * 2, subdivisions: 1 }, scene);
  floor.material = floorMat;
  floor.checkCollisions = true;
  floor.isPickable = false;
  allMeshes.push(floor);

  // Floor grid lines (thin boxes, few of them)
  const gridMat = makeStdMat(scene, 'gridMat', new Color3(0.28, 0.3, 0.34));
  for (let x = -ARENA_SIZE; x <= ARENA_SIZE; x += 20) {
    const lineX = MeshBuilder.CreateBox('gx', { width: 0.08, height: 0.01, depth: ARENA_SIZE * 2 }, scene);
    lineX.position = new Vector3(x, 0.005, 0);
    lineX.material = gridMat;
    lineX.checkCollisions = false;
    lineX.isPickable = false;
    lineX.freezeWorldMatrix();
    allMeshes.push(lineX);

    const lineZ = MeshBuilder.CreateBox('gz', { width: ARENA_SIZE * 2, height: 0.01, depth: 0.08 }, scene);
    lineZ.position = new Vector3(0, 0.005, x);
    lineZ.material = gridMat;
    lineZ.checkCollisions = false;
    lineZ.isPickable = false;
    lineZ.freezeWorldMatrix();
    allMeshes.push(lineZ);
  }

  // Outer walls
  const wallMat = makeStdMat(scene, 'wallMat', new Color3(0.45, 0.48, 0.52));
  const wallPositions: [number, number, number, number, number][] = [
    [0, WALL_HEIGHT / 2, -ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [0, WALL_HEIGHT / 2, ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [-ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
    [ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
  ];

  // Wall accent stripe colors (simple colored bands at top)
  const accentColors = [
    new Color3(0.2, 0.5, 0.9),
    new Color3(0.9, 0.3, 0.2),
    new Color3(0.2, 0.7, 0.3),
    new Color3(0.8, 0.6, 0.1),
  ];

  wallPositions.forEach(([x, y, z, w, d], i) => {
    const wall = MeshBuilder.CreateBox(`wall${i}`, { width: w + 1, height: WALL_HEIGHT, depth: d + 1 }, scene);
    wall.position = new Vector3(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    wall.freezeWorldMatrix();
    allMeshes.push(wall);

    // Colored band near top for orientation
    const isXWall = w > d;
    const stripW = isXWall ? w : 0.15;
    const stripD = isXWall ? 0.15 : d;
    const band = MeshBuilder.CreateBox(`band${i}`, { width: stripW, height: 0.5, depth: stripD }, scene);
    band.position = new Vector3(x, WALL_HEIGHT - 1, z);
    band.material = makeStdMat(scene, `bandMat${i}`, accentColors[i], accentColors[i].scale(0.3));
    band.checkCollisions = false;
    band.isPickable = false;
    band.freezeWorldMatrix();
    allMeshes.push(band);
  });

  // Central platform
  const centerMat = makeStdMat(scene, 'centerMat', new Color3(0.5, 0.52, 0.55));
  const centerPlatform = MeshBuilder.CreateBox('centerPlat', { width: 16, height: 2, depth: 16 }, scene);
  centerPlatform.position = new Vector3(0, 1, 0);
  centerPlatform.material = centerMat;
  centerPlatform.checkCollisions = true;
  centerPlatform.freezeWorldMatrix();
  allMeshes.push(centerPlatform);

  // Center pillar
  const pillarMat = makeStdMat(scene, 'pillarMat', new Color3(0.55, 0.55, 0.58));
  const centerPillar = MeshBuilder.CreateCylinder('centerPillar', { height: 18, diameter: 4, tessellation: 8 }, scene);
  centerPillar.position = new Vector3(0, 9, 0);
  centerPillar.material = pillarMat;
  centerPillar.checkCollisions = true;
  centerPillar.freezeWorldMatrix();
  allMeshes.push(centerPillar);

  // Ramps to center platform
  const rampMat = makeStdMat(scene, 'rampMat', new Color3(0.48, 0.5, 0.52));
  const rampAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  rampAngles.forEach((angle, i) => {
    const ramp = MeshBuilder.CreateBox(`ramp${i}`, { width: 4, height: 0.3, depth: 10 }, scene);
    const rx = Math.sin(angle) * 12;
    const rz = Math.cos(angle) * 12;
    ramp.position = new Vector3(rx, 1, rz);
    ramp.rotation.x = Math.atan2(2, 10) * (Math.abs(Math.cos(angle)) > 0.5 ? -Math.sign(Math.cos(angle)) : 0);
    ramp.rotation.z = Math.atan2(2, 10) * (Math.abs(Math.sin(angle)) > 0.5 ? Math.sign(Math.sin(angle)) : 0);
    ramp.material = rampMat;
    ramp.checkCollisions = true;
    ramp.freezeWorldMatrix();
    allMeshes.push(ramp);
  });

  // Cover structures
  const coverMat = makeStdMat(scene, 'coverMat', new Color3(0.42, 0.44, 0.48));
  const coverPositions: [number, number, number, number, number][] = [
    [-30, 2, -30, 6, 4],
    [30, 2, -30, 6, 4],
    [-30, 2, 30, 6, 4],
    [30, 2, 30, 6, 4],
    [-50, 1.5, 0, 8, 3],
    [50, 1.5, 0, 8, 3],
    [0, 1.5, -50, 3, 8],
    [0, 1.5, 50, 3, 8],
    [-20, 3, -15, 4, 6],
    [20, 3, 15, 4, 6],
    [-15, 2.5, 25, 5, 5],
    [15, 2.5, -25, 5, 5],
    [-45, 2, -45, 5, 4],
    [45, 2, 45, 5, 4],
    [-40, 1.5, 20, 3, 6],
    [40, 1.5, -20, 3, 6],
  ];

  coverPositions.forEach(([x, h, z, w, d], i) => {
    const cover = MeshBuilder.CreateBox(`cover${i}`, { width: w, height: h * 2, depth: d }, scene);
    cover.position = new Vector3(x, h, z);
    cover.material = coverMat;
    cover.checkCollisions = true;
    cover.freezeWorldMatrix();
    allMeshes.push(cover);
  });

  // Elevated sniper perches in corners
  const perchMat = makeStdMat(scene, 'perchMat', new Color3(0.5, 0.5, 0.55));
  const corners: [number, number][] = [[-60, -60], [60, -60], [-60, 60], [60, 60]];
  corners.forEach(([cx, cz], i) => {
    const support = MeshBuilder.CreateCylinder(`ps${i}`, { height: 8, diameter: 2, tessellation: 6 }, scene);
    support.position = new Vector3(cx, 4, cz);
    support.material = pillarMat;
    support.checkCollisions = true;
    support.freezeWorldMatrix();
    allMeshes.push(support);

    const perch = MeshBuilder.CreateBox(`perch${i}`, { width: 8, height: 0.5, depth: 8 }, scene);
    perch.position = new Vector3(cx, 8, cz);
    perch.material = perchMat;
    perch.checkCollisions = true;
    perch.freezeWorldMatrix();
    allMeshes.push(perch);

    for (let side = 0; side < 4; side++) {
      const railing = MeshBuilder.CreateBox(`rail${i}_${side}`, { width: side < 2 ? 8 : 0.15, height: 1.5, depth: side < 2 ? 0.15 : 8 }, scene);
      const rxp = cx + (side === 2 ? -4 : side === 3 ? 4 : 0);
      const rzp = cz + (side === 0 ? -4 : side === 1 ? 4 : 0);
      railing.position = new Vector3(rxp, 9, rzp);
      railing.material = coverMat;
      railing.checkCollisions = true;
      railing.freezeWorldMatrix();
      allMeshes.push(railing);
    }

    spawnPoints.push(new Vector3(cx, 9, cz));
  });

  // Scattered pillars
  const pillarPositions: [number, number][] = [
    [-20, -40], [20, -40], [-20, 40], [20, 40],
    [-40, -20], [40, -20], [-40, 20], [40, 20],
    [-55, -25], [55, 25], [-25, -55], [25, 55],
  ];

  pillarPositions.forEach(([px, pz], i) => {
    const pillar = MeshBuilder.CreateCylinder(`pil${i}`, { height: 10, diameter: 2.5, tessellation: 8 }, scene);
    pillar.position = new Vector3(px, 5, pz);
    pillar.material = pillarMat;
    pillar.checkCollisions = true;
    pillar.freezeWorldMatrix();
    allMeshes.push(pillar);
  });

  // Enemy spawn points
  const enemySpawns: [number, number][] = [
    [-65, -65], [65, -65], [-65, 65], [65, 65],
    [-65, 0], [65, 0], [0, -65], [0, 65],
    [-40, -40], [40, -40], [-40, 40], [40, 40],
  ];
  enemySpawns.forEach(([sx, sz]) => {
    spawnPoints.push(new Vector3(sx, 0.5, sz));
  });

  // Pickup locations
  const pickupSpots: [number, number][] = [
    [0, 3], [-30, -30], [30, -30], [-30, 30], [30, 30],
    [-55, 0], [55, 0], [0, -55], [0, 55],
    [-15, -15], [15, 15], [-45, 45], [45, -45],
  ];
  pickupSpots.forEach(([px, pz]) => {
    pickupLocations.push(new Vector3(px, 0.5, pz));
  });

  return {
    meshes: allMeshes,
    spawnPoints,
    pickupLocations,
    shadowGenerator: null,
    navMeshBounds: {
      min: new Vector3(-ARENA_SIZE + 2, 0, -ARENA_SIZE + 2),
      max: new Vector3(ARENA_SIZE - 2, 0, ARENA_SIZE - 2),
    },
    animatedMeshes: [],
  };
}
