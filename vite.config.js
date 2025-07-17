import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/chat/, '/api/chat'),
      }
    }
  }
})
