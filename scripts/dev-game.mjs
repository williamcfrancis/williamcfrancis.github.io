import { discoverGames, runNodeTool } from './games.mjs';

const games = discoverGames();
const game = games.find((entry) => entry.name === process.argv[2]);
if (!game) {
  console.error('Usage: npm run dev -- <game_name>\n');
  console.error(`Available games:\n${games.map((entry) => `  ${entry.name}`).join('\n')}`);
  process.exit(1);
}
runNodeTool('vite', 'bin/vite.js', process.argv.slice(3), game.directory);
