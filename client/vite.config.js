import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // REQUIRED: Allows the app to be accessible outside the Docker container
    host: true,
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true, // Fixes hot reload on Windows/Docker
    }
  }
})