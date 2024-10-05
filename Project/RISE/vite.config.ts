import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

  build: {
    // generate .vite/manifest.json in outDir
    chunkSizeWarningLimit: 5000,
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "/src/main.tsx",
    },
  },
})