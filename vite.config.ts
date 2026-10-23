import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    // Raise warning threshold to 600 kB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split large vendor libs into separate cacheable chunks.
        // On repeat visits, unchanged vendor chunks are served from disk cache.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('/motion/')) return 'vendor-framer'
            if (id.includes('gsap')) return 'vendor-gsap'
            if (id.includes('lenis')) return 'vendor-lenis'
            if (id.includes('radix-ui')) return 'vendor-radix'
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            )
              return 'vendor-react'
          }
        },
      },
    },
  },
})
