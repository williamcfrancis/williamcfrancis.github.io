import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { discoverGames, repoRoot } from '../scripts/games.mjs';
import { includeStaticFile } from '../scripts/stage-static.mjs';

test('the build discovers both formerly independent projects', () => {
  const names = discoverGames().map((game) => game.name);
  assert.ok(names.includes('scale_of_autonomy'));
  assert.ok(names.includes('trillion_parameters'));
  assert.equal(names.some((name) => name.startsWith('_')), false);
});

test('staging excludes dev artifacts and stale bundles while preserving static game files', () => {
  const built = new Set(['scale_of_autonomy']);
  for (const file of [
    'games/scale_of_autonomy/index.html',
    'games/scale_of_autonomy/assets/old-bundle.js',
    'games/wizard_brawl/dev/test_pollinations.html',
    'games/example/node_modules/library/index.js',
    'games/example/dist/index.html',
    'games/example/src/main.ts',
    'games/example/package-lock.json',
    'games/example/vite.config.ts',
    'js/pdf-js/web/viewer.js.map',
  ]) assert.equal(includeStaticFile(file, built), false, file);
  for (const file of [
    'games/wizard_brawl/index.html', 'games/wizard_brawl/game.js',
    'games/wizard_brawl/src/style.css', 'games/wizard_brawl/src/main.js',
    'games/wizard_brawl/src/intro.js',
    'games/tongue_drum/index.html', 'files/Resume.pdf', 'js/pdf-js/web/viewer.js',
  ]) assert.equal(includeStaticFile(file, built), true, file);
  assert.equal(includeStaticFile('games\\wizard_brawl\\dev\\test.html', built), false);
});

test('standalone game HTML keeps every existing local script and stylesheet it uses', () => {
  const built = new Set(discoverGames().map(game => game.name));
  const staticRoot = path.join(repoRoot, 'static');
  for (const directory of readdirSync(path.join(staticRoot, 'games'), { withFileTypes: true })) {
    if (!directory.isDirectory() || built.has(directory.name)) continue;
    const index = path.join(staticRoot, 'games', directory.name, 'index.html');
    if (!existsSync(index)) continue;
    const html = readFileSync(index, 'utf8');
    for (const [, target] of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(target)) continue;
      const url = new URL(target, `https://test.invalid/games/${directory.name}/`);
      const relative = decodeURIComponent(url.pathname).replace(/^\//, '');
      const file = path.join(staticRoot, relative);
      if (!existsSync(file) || !statSync(file).isFile()) continue;
      assert.equal(includeStaticFile(relative, built), true, `${directory.name} needs ${relative}`);
    }
  }
});
