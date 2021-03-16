import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: 'node_modules/monaco-editor/min/vs/**/*',
              dest: 'dist/assets/monaco-editor/vs',
            },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
  },
  plugins: [vue(), jsx()],
})
