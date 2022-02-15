import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'

import { name } from './package.json'

export default defineConfig({
  base: `/${name}/`,
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11'],
    }),
    Vue2(),
  ],
})
