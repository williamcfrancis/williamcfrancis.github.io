import * as THREE from 'three';
import type { PerfMonitor } from '../PerfMonitor';

export interface LevelContext {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  setSubLabel: (text: string) => void;
  setParamTarget: (n: number) => void;
  perf: PerfMonitor;
  reducedMotion: boolean;
}

export interface Level {
  init(ctx: LevelContext): void;
  enter?(): void;
  exit?(): void;
  update(dt: number, localZoom: number, opacity: number): void;
  render(opacity: number): void;
  cleanup?(): void;
}
