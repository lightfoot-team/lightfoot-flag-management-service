import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/apis': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/v1/traces': {
        target: 'http://localhost:4318',
        changeOrigin: true
      },
      // '/api/evaluate/config': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true
      // }
    },

  },

  resolve: {
    alias: {
      'client-sdk': path.resolve(__dirname, '../../../../client-sdk/dist/esm/index.js')
    }
  }
})