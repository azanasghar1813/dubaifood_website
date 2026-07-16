import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('react-icons') || id.includes('swiper') || id.includes('react-hot-toast')) {
              return 'vendor-ui';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') || id.includes('axios')) {
              return 'vendor-state';
            }
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'vendor-analytics';
            }
            return 'vendor-others';
          }
        }
      }
    }
  }
})
