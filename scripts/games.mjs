import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** A directory becomes a built game by including a package manifest. */
export function discoverGames(root = repoRoot) {
  const directory = path.join(root, 'games');
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .filter((entry) => existsSync(path.join(directory, entry.name, 'package.json')))
    .map((entry) => ({ name: entry.name, directory: path.join(directory, entry.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: repoRoot, stdio: 'inherit', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? result.signal}).`);
  return result;
}

export function runNodeTool(packageName, entry, args, directory) {
  const require = createRequire(path.join(directory, 'package.json'));
  const packageDirectory = path.dirname(require.resolve(`${packageName}/package.json`));
  return run(process.execPath, [path.join(packageDirectory, entry), ...args], { cwd: directory });
}
