import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

import { name } from './package.json'

export default defineConfig({
  base: `/${name}/`,
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11'],
    }),
  ],
})
