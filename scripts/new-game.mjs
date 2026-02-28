import { cpSync, readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const name = process.argv[2];

if (!name) {
  console.error('Usage: npm run new-game -- <game_name>');
  console.error('  Name should be lowercase_with_underscores (e.g. my_cool_game)');
  process.exit(1);
}

if (!/^[a-z][a-z0-9_]*$/.test(name)) {
  console.error('Game name must be lowercase alphanumeric with underscores, starting with a letter.');
  process.exit(1);
}

const templateDir = path.resolve('games/_template');
const destDir = path.resolve('games', name);

if (existsSync(destDir)) {
  console.error(`Directory already exists: ${destDir}`);
  process.exit(1);
}

cpSync(templateDir, destDir, { recursive: true });

const title = name
  .split('_')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');

const replacements = [
  ['package.json', 'GAME_NAME', name],
  ['vite.config.ts', 'GAME_NAME', name],
  ['index.html', 'GAME_NAME', name],
  ['index.html', 'GAME_TITLE', title],
];

for (const [file, token, value] of replacements) {
  const fp = path.join(destDir, file);
  const content = readFileSync(fp, 'utf8');
  writeFileSync(fp, content.replaceAll(token, value));
}

console.log(`Created games/${name}/`);
console.log(`\nNext steps:`);
console.log(`  npm install`);
console.log(`  npm run dev -- ${name}`);
