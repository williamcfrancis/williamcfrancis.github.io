import * as THREE from 'three';

interface Stop {
  zoom: number;
  clear: [number, number, number];
  vignette: string;
}

const stops: Stop[] = [
  { zoom: 0.00, clear: [0.047, 0.063, 0.094], vignette: 'rgba(20, 30, 60, 0.45)' },     // Neuron — warm slate
  { zoom: 0.20, clear: [0.016, 0.047, 0.078], vignette: 'rgba(10, 50, 70, 0.5)' },      // Layer — deep teal night
  { zoom: 0.36, clear: [0.020, 0.039, 0.078], vignette: 'rgba(20, 60, 90, 0.5)' },      // Block
  { zoom: 0.50, clear: [0.020, 0.039, 0.094], vignette: 'rgba(20, 30, 100, 0.55)' },    // Transformer — cool navy
  { zoom: 0.65, clear: [0.031, 0.031, 0.110], vignette: 'rgba(40, 30, 110, 0.6)' },     // Model — indigo
  { zoom: 0.79, clear: [0.063, 0.024, 0.102], vignette: 'rgba(120, 30, 130, 0.6)' },    // Leap — magenta void
  { zoom: 0.95, clear: [0.000, 0.000, 0.000], vignette: 'rgba(80, 30, 140, 0.7)' },     // Galaxy — pure black, violet rim
];

const cachedClear = new THREE.Color();

export class Palette {
  private vignetteEl: HTMLElement | null = null;
  private currentVignette = '';

  attach(vignetteEl: HTMLElement) {
    this.vignetteEl = vignetteEl;
  }

  applyTo(renderer: THREE.WebGLRenderer, zoom: number) {
    const { clear, vignette } = this.sample(zoom);
    cachedClear.setRGB(clear[0], clear[1], clear[2]);
    renderer.setClearColor(cachedClear, 1);

    if (this.vignetteEl && vignette !== this.currentVignette) {
      this.vignetteEl.style.boxShadow = `inset 0 0 ${this.vignetteRadius(zoom)}px ${this.vignetteRadius(zoom) * 0.4}px ${vignette}`;
      this.currentVignette = vignette;
    }
  }

  private vignetteRadius(zoom: number): number {
    return 200 + zoom * 400;
  }

  private sample(zoom: number): { clear: [number, number, number]; vignette: string } {
    if (zoom <= stops[0].zoom) return { clear: stops[0].clear, vignette: stops[0].vignette };
    if (zoom >= stops[stops.length - 1].zoom) {
      const last = stops[stops.length - 1];
      return { clear: last.clear, vignette: last.vignette };
    }
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (zoom >= a.zoom && zoom <= b.zoom) {
        const t = (zoom - a.zoom) / (b.zoom - a.zoom);
        const eased = t * t * (3 - 2 * t);
        return {
          clear: [
            a.clear[0] + (b.clear[0] - a.clear[0]) * eased,
            a.clear[1] + (b.clear[1] - a.clear[1]) * eased,
            a.clear[2] + (b.clear[2] - a.clear[2]) * eased,
          ],
          vignette: t < 0.5 ? a.vignette : b.vignette,
        };
      }
    }
    return { clear: stops[0].clear, vignette: stops[0].vignette };
  }
}
