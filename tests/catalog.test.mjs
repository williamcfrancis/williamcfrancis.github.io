import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stringify } from 'yaml';
import { attributes, validateCatalog } from '../scripts/validate-catalog.mjs';

function fixture(t, edit = () => {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'site-catalog-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, value = '') => {
    const filename = path.join(root, file);
    mkdirSync(path.dirname(filename), { recursive: true });
    writeFileSync(filename, value);
  };
  const game = { title: 'Demo', genre: 'Arcade', summary: 'Jump through a small world.', icon: '🎮', accent: 'cyan', tags: ['browser'], image: 'images/games/demo.png', link: { label: 'Play Demo', url: '/games/demo/' } };
  const games = [game];
  edit(game, games);
  write('data/en/personal.yaml', stringify({ sections: [{ section: { id: 'games', enable: true }, games }] }));
  write('assets/images/games/demo.png');
  write('static/games/demo/index.html', '<script src="main.js"></script>');
  return { root, write };
}

test('valid standalone game catalog resolves its preview and playable route', (t) => {
  assert.deepEqual(validateCatalog(fixture(t)).errors, []);
});

test('rejects duplicate routes and previews outside the asset roots', (t) => {
  const fixtureData = fixture(t, (game, games) => {
    game.image = '../private.png';
    games.push({ ...game, title: 'Another title' });
  });
  const errors = validateCatalog(fixtureData).errors.join('\n');
  assert.match(errors, /duplicate route/);
  assert.match(errors, /unsafe preview/);
});

test('a catalog screenshot cannot disguise a missing game', (t) => {
  const fixtureData = fixture(t, (game) => { game.link.url = '/games/missing/'; });
  assert.match(validateCatalog(fixtureData).errors.join('\n'), /missing playable route/);
});

test('malformed metadata reports errors without crashing or accepting a directory as an image', (t) => {
  const fixtureData = fixture(t, (game) => { game.link.label = 42; game.image = 'images/games'; });
  const errors = validateCatalog(fixtureData).errors.join('\n');
  assert.match(errors, /missing link label/);
  assert.match(errors, /missing or unsafe preview/);
});

test('workspace source is valid before the production bundle exists', (t) => {
  const { root, write } = fixture(t, (game) => { game.link.url = '/games/source_game/'; });
  write('games/source_game/package.json', '{}');
  write('games/source_game/index.html');
  assert.deepEqual(validateCatalog({ root }).errors, []);
});

test('published validation detects broken bundle references', (t) => {
  const { root, write } = fixture(t);
  write('public/games/demo/index.html', '<script type=module src=/games/demo/assets/missing.js></script>');
  const errors = validateCatalog({ root, output: 'public' }).errors.join('\n');
  assert.match(errors, /missing published asset \/games\/demo\/assets\/missing.js/);
  assert.match(errors, /\/arcade\/: missing published page/);
});

test('published validation accepts embedded SVG favicons', (t) => {
  const { root, write } = fixture(t);
  write('public/games/demo/index.html', `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text>🎮</text></svg>">`);
  assert.equal(validateCatalog({ root, output: 'public' }).errors.some((error) => error.includes('missing published asset')), false);
});

test('published assets must be files rather than existing directories', (t) => {
  const { root, write } = fixture(t);
  write('public/games/demo/assets/nested.js', '');
  write('public/games/demo/index.html', '<script src="assets/"></script>');
  assert.match(validateCatalog({ root, output: 'public' }).errors.join('\n'), /missing published asset assets\//);
});

test('HTML attributes survive Hugo minification and quoted spaces', () => {
  assert.deepEqual(attributes('<img loading=lazy width=960 alt="Demo preview" srcset="/a.webp 480w, /b.webp 960w">'), {
    loading: 'lazy', width: '960', alt: 'Demo preview', srcset: '/a.webp 480w, /b.webp 960w',
  });
});
