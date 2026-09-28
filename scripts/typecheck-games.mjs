import { existsSync } from 'node:fs';
import path from 'node:path';
import { discoverGames, runNodeTool } from './games.mjs';

const games = discoverGames();
let failures = 0;
for (const game of games) {
  console.log(`\nTypechecking ${game.name}`);
  try {
    const config = path.join(game.directory, 'tsconfig.json');
    if (!existsSync(config)) throw new Error(`Missing TypeScript config: ${config}`);
    runNodeTool('typescript', 'bin/tsc', ['--noEmit', '--project', config], game.directory);
  } catch (error) {
    failures++;
    console.error(error.message);
  }
}
if (failures) process.exitCode = 1;
else console.log(`\nAll ${games.length} games passed TypeScript checks.`);
