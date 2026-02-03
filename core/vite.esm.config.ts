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
      input: resolve(__dirname, './src/style.css'),
      output: {
        assetFileNames: 'style.css',
      },
    },
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss()
  ],
} satisfies UserConfig;
