import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { discoverGames, repoRoot, runNodeTool } from './games.mjs';

export function buildGames(outputRoot = path.join(repoRoot, '.build/static')) {
  const games = discoverGames();
  for (const game of games) {
    console.log(`\nBuilding ${game.name}`);
    runNodeTool('vite', 'bin/vite.js', [
      'build', '--outDir', path.join(outputRoot, 'games', game.name),
    ], game.directory);
  }
  console.log(`\nBuilt ${games.length} games.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length && (args[0] !== '--outDir' || args.length !== 2)) {
    throw new Error('Usage: npm run build:games -- [--outDir <static-output-directory>]');
  }
  buildGames(args[1] ? path.resolve(args[1]) : undefined);
}
