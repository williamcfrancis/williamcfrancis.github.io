import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { discoverGames, repoRoot } from './games.mjs';

// Standalone games may execute JavaScript directly from a directory named src.
// Workspace sources are already excluded by game name below.
const developmentDirectories = new Set(['node_modules', 'dev', 'dist', '.git', '.cache']);
const developmentFile = /(?:^package(?:-lock)?\.json$|^tsconfig.*\.json$|^vite\.config\.|\.map$|\.tsx?$)/i;

/** Built workspaces are regenerated; static games keep their runtime assets. */
export function includeStaticFile(relativePath, builtGames) {
  const parts = relativePath.split(/[\\/]/).filter(Boolean);
  if (!parts.length) return true;
  if (parts.some((part) => developmentDirectories.has(part))) return false;
  if (parts[0] === 'games' && builtGames.has(parts[1])) return false;
  return !developmentFile.test(parts.at(-1));
}

export function stageStatic() {
  const output = path.resolve(repoRoot, '.build', 'static');
  const expectedParent = path.resolve(repoRoot, '.build');
  if (path.dirname(output) !== expectedParent) throw new Error('Invalid staging directory.');
  // This generated directory alone is cleared. Never clear the source static tree.
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  const source = path.join(repoRoot, 'static');
  const games = new Set(discoverGames().map((game) => game.name));
  cpSync(source, output, {
    recursive: true,
    filter: (file) => includeStaticFile(path.relative(source, file), games),
  });
  return output;
}
