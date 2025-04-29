import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // 개발 서버 포트
    open: true, // 브라우저 자동 열기
    host: true, // 네트워크 호스트 활성화
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
