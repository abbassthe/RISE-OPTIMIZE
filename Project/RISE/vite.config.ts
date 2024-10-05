import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // generate .vite/manifest.json in outDir
    chunkSizeWarningLimit: 5000,
    outDir: 'dist',

  },
})