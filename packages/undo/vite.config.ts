import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        jotai: resolve(__dirname, 'src/jotai.ts'),
      },
      name: '@xfreecoder/undo',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'jotai', 'jotai/utils'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      bundledPackages: ['@undo/*'],
    }),
  ],
});
