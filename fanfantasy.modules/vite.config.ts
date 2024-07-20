import { fileURLToPath, URL } from 'node:url'
import { REPOSITORY_NAME } from './src/utils/constants'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: mode === 'production' ? '/'+REPOSITORY_NAME+'/' : '/'
  }
})
