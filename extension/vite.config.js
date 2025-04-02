import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// resolve() 함수는 여러 개의 경로 조각들을 받아 하나의 절대 경로로 만들어 줌
// fildURLtoPath() 함수는 파일 URL 을 파일 시스템 경로로 변환해주는 역할을 함 
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// __dirname 이라는 변수는 commonJS 모듈 시스템에만 존재하는 전역 변수
// ESM 환경에서는 기본적으로 없음. 하지만 여러 함수를 사용해 동일한 역할을 하는 변수를 생성할 수 있음

// 현재 모듈의 경로에서 "file://" 의 prefix 를 제거한 경로를 반환
// dirname() 함수는 주어진 경로에서 파일 이름을 제외한 디렉토리 부분을 반환
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  
  build: {
    rollupOptions: {
      input: {
        // 최상위에 index.html 을 두어 dist/index.html 이 생성되도록 함
        index: resolve(__dirname, 'src/index.html'),
        service_worker: resolve(__dirname, 'src/service_worker/service_worker.js'),
        content_script: resolve(__dirname, 'src/content_script/content_script.js')
      },
      output: {
        // JS 번들은 assets/js 폴더에 생성
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        // CSS, 이미지 등 에셋 파일을 별도 폴더에 분리
        assetFileNames: assetInfo => {
          const ext = assetInfo.name.split('.').pop();
          if (ext === 'css') {
            return 'assets/css/[name][extname]';
          }
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/img/[name][extname]';
          }
          // 그 외 에셋은 기본 assets 폴더에
          return 'assets/[name][extname]';
        }
      }
    }
  },

  plugins: [
    react(),
    tailwindcss()
  ],
})
