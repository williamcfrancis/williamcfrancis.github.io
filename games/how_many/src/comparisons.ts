import { CalculationResult } from './calculator';

interface ComparisonEntry {
  value: number;
  label: string;
}

const populations: ComparisonEntry[] = [
  { value: 600, label: 'a small village' },
  { value: 5000, label: 'a small town' },
  { value: 36000, label: 'the city of Monaco' },
  { value: 370000, label: 'the population of Iceland' },
  { value: 580000, label: 'the population of Wyoming' },
  { value: 870000, label: 'the population of San Francisco' },
  { value: 5000000, label: 'the population of New Zealand' },
  { value: 8800000, label: 'the population of Switzerland' },
  { value: 14000000, label: 'the population of Tokyo' },
  { value: 28000000, label: 'the population of Shanghai' },
  { value: 67000000, label: 'the population of France' },
  { value: 331000000, label: 'the population of the USA' },
  { value: 1400000000, label: 'the population of India' },
  { value: 8000000000, label: 'every person on Earth' },
];

const heights: ComparisonEntry[] = [
  { value: 1.7, label: 'an average person' },
  { value: 8.84, label: 'a three-story building' },
  { value: 93, label: 'the Statue of Liberty' },
  { value: 330, label: 'the Eiffel Tower' },
  { value: 443, label: 'the Empire State Building' },
  { value: 828, label: 'the Burj Khalifa' },
  { value: 8849, label: 'Mount Everest' },
  { value: 12000, label: 'cruising altitude of a jet' },
  { value: 100000, label: 'the edge of space' },
  { value: 384400000, label: 'the distance to the Moon' },
  { value: 149600000000, label: 'the distance to the Sun' },
];

const distances: ComparisonEntry[] = [
  { value: 400, label: 'an athletics track' },
  { value: 42195, label: 'a marathon' },
  { value: 3944000, label: 'New York to Los Angeles' },
  { value: 8849000, label: 'the width of the USA' },
  { value: 40075000, label: 'around the Earth' },
  { value: 384400000, label: 'here to the Moon' },
  { value: 149600000000, label: 'here to the Sun' },
];

const weights: ComparisonEntry[] = [
  { value: 0.001, label: 'a paperclip' },
  { value: 0.045, label: 'a golf ball' },
  { value: 0.15, label: 'a baseball' },
  { value: 1, label: 'a liter of water' },
  { value: 6.4, label: 'a bowling ball' },
  { value: 70, label: 'an adult human' },
  { value: 500, label: 'a horse' },
  { value: 1400, label: 'a car' },
  { value: 5000, label: 'an elephant' },
  { value: 140000, label: 'a blue whale' },
  { value: 735000, label: 'the International Space Station' },
  { value: 52000000, label: 'the Titanic' },
  { value: 6e9, label: 'the Great Pyramid of Giza' },
];

function findNearest(
  entries: ComparisonEntry[],
  value: number,
): ComparisonEntry | null {
  if (entries.length === 0) return null;
  let best = entries[0];
  let bestRatio = Math.abs(Math.log(value / best.value));
  for (const e of entries) {
    const ratio = Math.abs(Math.log(value / e.value));
    if (ratio < bestRatio) {
      best = e;
      bestRatio = ratio;
    }
  }
  return best;
}

function formatNumber(n: number): string {
  if (n >= 1e15) return n.toExponential(1);
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + ' billion';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + ' million';
  if (n >= 1e4) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (n >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (n >= 1) return n.toFixed(1).replace(/\.0$/, '');
  if (n >= 0.01) return n.toFixed(2);
  return n.toExponential(1);
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
  if (seconds < 604800) return `${(seconds / 86400).toFixed(1)} days`;
  if (seconds < 31536000) return `${(seconds / 604800).toFixed(1)} weeks`;
  const years = seconds / 31536000;
  if (years < 100) return `${years.toFixed(1)} years`;
  if (years < 1000) return `${Math.round(years)} years`;
  return `${formatNumber(years)} years`;
}

export function generateComparisons(result: CalculationResult): string[] {
  const { count, small, large } = result;
  const comparisons: string[] = [];

  if (count <= 0) return comparisons;

  const popMatch = findNearest(populations, count);
  if (popMatch) {
    const ratio = count / popMatch.value;
    if (ratio > 0.5 && ratio < 2) {
      comparisons.push(`That's roughly ${popMatch.label}.`);
    } else if (ratio >= 2) {
      comparisons.push(
        `That's about ${formatNumber(ratio)}× ${popMatch.label}.`,
      );
    }
  }

  const countDuration = count;
  comparisons.push(
    `At 1 per second, counting them would take ${formatDuration(countDuration)}.`,
  );

  const smallestDim = Math.min(...small.dimensions);
  if (smallestDim > 0) {
    const stackHeight = count * smallestDim;
    const hMatch = findNearest(heights, stackHeight);
    if (hMatch) {
      const ratio = stackHeight / hMatch.value;
      if (ratio > 0.3) {
        comparisons.push(
          `Stacked up, they'd reach ${formatNumber(stackHeight)}m — ${formatNumber(ratio)}× the height of ${hMatch.label}.`,
        );
      }
    }
  }

  const longestDim = Math.max(...small.dimensions);
  if (longestDim > 0) {
    const totalLength = count * longestDim;
    const dMatch = findNearest(distances, totalLength);
    if (dMatch) {
      const ratio = totalLength / dMatch.value;
      if (ratio > 0.3) {
        comparisons.push(
          `Laid end to end, they'd stretch ${formatNumber(totalLength)}m — ${formatNumber(ratio)}× ${dMatch.label}.`,
        );
      }
    }
  }

  if (small.weight_kg > 0) {
    const totalWeight = count * small.weight_kg;
    const wMatch = findNearest(weights, totalWeight);
    if (wMatch) {
      const ratio = totalWeight / wMatch.value;
      if (ratio > 0.5 && ratio < 2) {
        comparisons.push(
          `Total weight: ${formatNumber(totalWeight)} kg — about the same as ${wMatch.label}.`,
        );
      } else if (ratio >= 2) {
        comparisons.push(
          `Total weight: ${formatNumber(totalWeight)} kg — ${formatNumber(ratio)}× ${wMatch.label}.`,
        );
      }
    }
  }

  const poolVolume = 2500;
  if (count * small.volume > poolVolume * 0.1) {
    const poolCount = (count * small.volume) / poolVolume;
    comparisons.push(
      `That's enough ${small.name}s to fill ${formatNumber(poolCount)} Olympic swimming pools.`,
    );
  }

  return comparisons.slice(0, 4);
}

export function generateTooSmallMessage(result: CalculationResult): string {
  const ratio = result.large.volume / result.small.volume;
  if (ratio <= 0) {
    return `The ${result.small.name} is infinitely larger! Not even close.`;
  }
  return `Not even close! The ${result.small.name} is ${formatNumber(1 / ratio)}× bigger than the ${result.large.name}.`;
}

export { formatNumber };
