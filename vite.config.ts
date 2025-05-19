import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true })
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      name: 'hakataKumohaReact',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'opentetsu', '@tanuden/kumoha']
    }
  }
});
