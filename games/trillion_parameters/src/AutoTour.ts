import type { ZoomManager } from './ZoomManager';

interface Waypoint {
  zoom: number;
  dwell: number;
}

export class AutoTour {
  private zm: ZoomManager;
  private waypoints: Waypoint[];
  private readonly tourWaypoints: Waypoint[];
  private active = false;
  private startTime = 0;
  private startZoom = 0;
  private elapsed = 0;
  private speedMul = 1;
  private targetWaypointIdx = -1;
  private listeners: ((active: boolean) => void)[] = [];

  constructor(zm: ZoomManager) {
    this.zm = zm;
    const levelCenters = [0.085, 0.215, 0.35, 0.49, 0.635, 0.785, 0.92];
    this.tourWaypoints = levelCenters.map((z, i) => ({
      zoom: z,
      dwell: i === 0 || i === levelCenters.length - 1 ? 4 : 3,
    }));
    this.waypoints = this.tourWaypoints;
  }

  start(speedMul = 1) {
    this.waypoints = this.tourWaypoints;
    this.active = true;
    this.startTime = performance.now() / 1000;
    this.startZoom = this.zm.getZoom();
    this.elapsed = 0;
    this.speedMul = speedMul;
    this.targetWaypointIdx = -1;
    this.fire(true);
  }

  flyTo(zoomTarget: number, speedMul = 4) {
    this.active = true;
    this.startTime = performance.now() / 1000;
    this.startZoom = this.zm.getZoom();
    this.elapsed = 0;
    this.speedMul = speedMul;
    this.waypoints = [{ zoom: zoomTarget, dwell: 0 }];
    this.targetWaypointIdx = -1;
    this.fire(true);
  }

  stop() {
    if (this.active) {
      this.active = false;
      this.fire(false);
    }
  }

  isActive(): boolean {
    return this.active;
  }

  tick(dt: number) {
    if (!this.active) return;
    this.elapsed += dt * this.speedMul;

    const segmentTime = 6;
    const fullDuration = this.waypoints.reduce((acc, wp) => acc + segmentTime + wp.dwell, 0);

    if (this.elapsed >= fullDuration) {
      this.zm.setTargetSilent(this.waypoints[this.waypoints.length - 1].zoom);
      this.stop();
      return;
    }

    let t = 0;
    let prevZoom = this.startZoom;
    for (let i = 0; i < this.waypoints.length; i++) {
      const wp = this.waypoints[i];
      const segStart = t;
      const segEnd = segStart + segmentTime;
      const dwellEnd = segEnd + wp.dwell;

      if (this.elapsed < segEnd) {
        const localT = (this.elapsed - segStart) / segmentTime;
        const eased = this.smoothstep(localT);
        const z = prevZoom + (wp.zoom - prevZoom) * eased;
        this.zm.setTargetSilent(z);
        return;
      } else if (this.elapsed < dwellEnd) {
        this.zm.setTargetSilent(wp.zoom);
        return;
      }

      t = dwellEnd;
      prevZoom = wp.zoom;
    }
  }

  private smoothstep(t: number): number {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  }

  onChange(fn: (active: boolean) => void) { this.listeners.push(fn); }
  private fire(active: boolean) { for (const fn of this.listeners) fn(active); }
}
