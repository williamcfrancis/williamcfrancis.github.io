import { execSync, spawn } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import path from 'path';

const gameName = process.argv[2];
const gamesDir = path.resolve('games');

if (!gameName) {
  const available = readdirSync(gamesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .filter((d) => existsSync(path.join(gamesDir, d.name, 'package.json')))
    .map((d) => d.name);

  console.error('Usage: npm run dev -- <game_name>\n');
  console.error('Available games:');
  available.forEach((g) => console.error(`  ${g}`));
  process.exit(1);
}

const gameDir = path.join(gamesDir, gameName);
if (!existsSync(path.join(gameDir, 'package.json'))) {
  console.error(`No game found at ${gameDir}`);
  process.exit(1);
}

console.log(`Starting dev server for ${gameName}...`);
const child = spawn('npx', ['vite'], {
  cwd: gameDir,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
