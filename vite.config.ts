/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/ts-matrix.ts'),
      name: 'ts-matrix',
    },
  },
  test: {
    globals: true,
    coverage: {
      reporter: ['text'],
    },
  },
});