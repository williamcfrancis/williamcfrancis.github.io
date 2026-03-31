import { CatalogObject, Shape } from './catalog';

export interface CalculationResult {
  count: number;
  packingEfficiency: number;
  gridFit: number | null;
  small: CatalogObject;
  large: CatalogObject;
  tooSmall: boolean;
  sizeRatio: number;
}

function getPackingEfficiency(
  smallShape: Shape,
  largeShape: Shape,
): number {
  let eff: number;

  if (smallShape === 'sphere' && largeShape === 'box') {
    eff = 0.64;
  } else if (smallShape === 'box' && largeShape === 'box') {
    eff = 1.0;
  } else if (smallShape === 'cylinder' && largeShape === 'box') {
    eff = 0.785;
  } else if (smallShape === 'sphere' && largeShape === 'sphere') {
    eff = 0.64;
  } else if (smallShape === 'box' && largeShape === 'sphere') {
    eff = 0.64;
  } else if (smallShape === 'cylinder' && largeShape === 'sphere') {
    eff = 0.60;
  } else if (smallShape === 'box' && largeShape === 'cylinder') {
    eff = 0.785;
  } else if (smallShape === 'sphere' && largeShape === 'cylinder') {
    eff = 0.60;
  } else if (smallShape === 'cylinder' && largeShape === 'cylinder') {
    eff = 0.785;
  } else {
    eff = 0.64;
  }

  if (largeShape === 'sphere') {
    eff *= 0.85;
  }

  return eff;
}

function computeGridFit(small: CatalogObject, large: CatalogObject): number {
  const [sw, sh, sd] = small.dimensions;
  const [lw, lh, ld] = large.dimensions;
  return (
    Math.floor(lw / sw) *
    Math.floor(lh / sh) *
    Math.floor(ld / sd)
  );
}

export function calculate(
  small: CatalogObject,
  large: CatalogObject,
): CalculationResult {
  const sizeRatio = large.volume / small.volume;

  if (large.volume <= small.volume) {
    return {
      count: 0,
      packingEfficiency: 0,
      gridFit: null,
      small,
      large,
      tooSmall: true,
      sizeRatio,
    };
  }

  const eff = getPackingEfficiency(small.shape, large.shape);
  let volumeBasedFit = Math.floor((large.volume * eff) / small.volume);

  let gridFit: number | null = null;
  if (small.shape === 'box' && large.shape === 'box') {
    gridFit = computeGridFit(small, large);
    volumeBasedFit = Math.min(volumeBasedFit, gridFit);
  }

  return {
    count: Math.max(0, volumeBasedFit),
    packingEfficiency: eff,
    gridFit,
    small,
    large,
    tooSmall: false,
    sizeRatio,
  };
}
