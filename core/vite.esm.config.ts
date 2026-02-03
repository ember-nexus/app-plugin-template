import type { UserConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default {
  base: './',
  build: {
    outDir: 'dist/css',
    sourcemap: true,
    minify: true,
    rollupOptions: {
      input: resolve(__dirname, './src/index.css'),
      output: {
        assetFileNames: 'index.css',
      },
    },
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss()
  ],
} satisfies UserConfig;
