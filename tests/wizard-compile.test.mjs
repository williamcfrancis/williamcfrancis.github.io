import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { setImmediate as nextTurn } from 'node:timers/promises';

const source = await readFile(new URL('../static/games/wizard_brawl/src/main.js', import.meta.url), 'utf8');
// Run the actual compile UI functions with a DOM/network fixture, without
// starting the unrelated canvas game loop or loading external artwork/audio.
const compileCode = source.slice(source.indexOf('function startCompilerPhase('), source.indexOf('function buildPixelPreviewHtml('));

function fixture(fetchResponse) {
  const element = () => ({ innerHTML: '', value: '', style: {}, classList: { add() {}, remove() {} }, focus() {} });
  const calls = [];
  const shown = [];
  const context = vm.createContext({
    compileInput: element(), compileOutput: element(), compileModsDisplay: element(),
    compilerOverlay: element(), compilePlayerLabel: element(), compileInterval: null,
    compileSubmitted: false, compileResult: null, compileLoser: 0, roundNum: 2,
    players: [{ robeColor: '#ffffff', weapon: { name: '<img src=x onerror=alert(1)>', tradeoff: 'slow', weapon_image_url: 'large data URL' } }],
    activeOmen: { name: '<svg onload=alert(2)>' },
    getMemoryEcho: () => '<b>memory</b>', setTimeout() {}, clearInterval() {},
    AbortSignal: { timeout: ms => ({ timeout: ms }) },
    fetch: (url, options) => { calls.push({ url, options }); return fetchResponse ? Promise.resolve(fetchResponse) : new Promise(() => {}); },
    DEFAULT_WEAPON: { name: 'Fallback' }, normalizeWeapon: weapon => weapon,
    loadWeaponImages: async () => {}, showCompileResult: weapon => shown.push(weapon),
    console: { error() {}, warn() {} },
  });
  vm.runInContext(compileCode, context);
  return { context, calls, shown };
}

test('Wizard compile renders user/model text literally and sends only bounded prior-weapon fields', () => {
  const { context, calls } = fixture();
  vm.runInContext('startCompilerPhase(0)', context);
  assert.doesNotMatch(context.compileModsDisplay.innerHTML, /<img|<svg|<b>/);
  assert.match(context.compileModsDisplay.innerHTML, /&lt;img/);
  const prompt = '<img src=x onerror=alert(3)> & "wand"';
  context.compileInput.value = prompt;
  vm.runInContext('submitCompile(); submitCompile();', context);
  assert.doesNotMatch(context.compileOutput.innerHTML, /<img/);
  assert.match(context.compileOutput.innerHTML, /&lt;img.*&amp; &quot;wand&quot;/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, '/.netlify/functions/compile');
  assert.equal(calls[0].options.signal.timeout, 26000);
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    request: prompt, existingMods: [{ name: context.players[0].weapon.name, tradeoff: 'slow' }], round: 2,
  });
});

test('Wizard compile handles an HTTP error with the local fallback without parsing the error as a weapon', async () => {
  const { context, shown } = fixture({ ok: false, status: 429, json: () => { throw new Error('must not parse'); } });
  context.compileInput.value = 'wooden wand';
  vm.runInContext('submitCompile()', context);
  await nextTurn();
  assert.equal(shown.length, 1);
  assert.equal(shown[0], context.DEFAULT_WEAPON);
});
