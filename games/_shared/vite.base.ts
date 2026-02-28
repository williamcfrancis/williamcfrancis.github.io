import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import path from 'path';

/**
 * Shared Vite config factory for all games.
 *
 * @param gameName  Directory name under games/ (used for base path and output dir)
 * @param overrides Game-specific Vite config merged on top of the base
 *
 * Assumes Vite is invoked with cwd set to the game directory (games/{gameName}/).
 * Build output lands in static/games/{gameName}/ so Hugo picks it up.
 */
export function gameConfig(gameName: string, overrides: UserConfig = {}) {
  const gameDir = process.cwd();
  const repoRoot = path.resolve(gameDir, '../..');

  return mergeConfig(
    defineConfig({
      base: `/games/${gameName}/`,
      build: {
        outDir: path.resolve(repoRoot, 'static/games', gameName),
        emptyOutDir: true,
      },
      plugins: [wasm(), topLevelAwait()],
      resolve: {
        alias: {
          '@shared': path.resolve(repoRoot, 'games/_shared/src'),
        },
      },
      server: {
        proxy: {
          '/.netlify/functions': {
            target: 'http://localhost:9999',
            changeOrigin: true,
          },
        },
      },
    }),
    overrides,
  );
}
