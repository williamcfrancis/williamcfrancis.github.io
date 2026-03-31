import { defineConfig } from 'vite';

export default defineConfig({
  base: '/games/trillion_parameters/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
