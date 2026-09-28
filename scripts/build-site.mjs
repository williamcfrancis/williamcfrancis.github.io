import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { buildGames } from './build-games.mjs';
import { repoRoot, run } from './games.mjs';
import { stageStatic } from './stage-static.mjs';

const hugo = process.env.HUGO_BINARY || process.env.HUGO_BIN || 'hugo';
const version = spawnSync(hugo, ['version'], { encoding: 'utf8' });
if (version.error) throw version.error;
if (version.status !== 0 || !/v0\.100\.2(?:-[^\s+]*)?\+extended(?:\s|$)/.test(version.stdout)) {
  throw new Error('Install Hugo Extended 0.100.2, the version supported by the pinned Toha theme.');
}

const args = process.argv.slice(2);
const serve = args[0] === '--serve';
if (serve) args.shift();
const staticDir = stageStatic();
buildGames(staticDir);
mkdirSync(path.join(repoRoot, '.build'), { recursive: true });
const overlay = path.join(repoRoot, '.build/hugo-static.json');
writeFileSync(overlay, JSON.stringify({ staticDir: [staticDir] }));
const hugoArgs = [
  ...(serve ? ['server', '--bind', '127.0.0.1'] : ['--gc', '--minify', '--cleanDestinationDir']),
  '--config', `config.yaml,${overlay}`,
  ...args,
];
run(hugo, hugoArgs);
if (!serve) {
  let output = 'public';
  for (let index = 0; index < args.length; index++) {
    if (['--destination', '-d'].includes(args[index])) output = args[index + 1];
    else if (/^(?:--destination|-d)=/.test(args[index])) output = args[index].slice(args[index].indexOf('=') + 1);
  }
  run(process.execPath, ['scripts/validate-catalog.mjs', '--output', path.resolve(repoRoot, output)]);
}
