import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // 브라우저 자동 열기
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
