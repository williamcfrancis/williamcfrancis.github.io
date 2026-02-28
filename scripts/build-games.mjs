import { execSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import path from 'path';

const gamesDir = path.resolve('games');
const dirs = readdirSync(gamesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
  .map((d) => d.name);

let built = 0;

for (const dir of dirs) {
  const pkg = path.join(gamesDir, dir, 'package.json');
  if (!existsSync(pkg)) continue;

  const gameDir = path.join(gamesDir, dir);
  console.log(`\n=== Building ${dir} ===`);
  execSync('npx vite build', { cwd: gameDir, stdio: 'inherit' });
  built++;
}

console.log(`\nDone — built ${built} game(s).`);
