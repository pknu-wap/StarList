import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // 브라우저 자동 열기
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, // 아이콘에 자동으로 currentColor 적용
        exportAsDefault: true, // ?component 없이 default import 만으로 react 컴포넌트 불러오기
        svgoConfig: {
          plugins: [
            // 1) 하드코딩된 색상 지우기
            { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
            // 2) fill="currentColor" 자동으로 추가
            { name: 'addAttributesToSVGElement', params: { attributes: [{ fill: 'currentColor' }] } },
          ],
        },
      },
    }),

  ],
})
