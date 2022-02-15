import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { name } from './package.json'

export default defineConfig({
  base: `/${name}/`,
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    Vue({}),
  ],
})
