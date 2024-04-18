import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@undo/jotai',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'jotai', 'jotai/utils'],
      output: {
        globals: {
          react: 'React',
          jotai: 'Jotai',
          'jotai/utils': 'Utils',
          'react/jsx-runtime': 'JSXRuntime',
        },
      },
    },
  },
});
