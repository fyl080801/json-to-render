import { createVuePlugin } from 'vite-plugin-vue2'
// import ViteComponents from 'vite-plugin-components'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'

export const viteVue = createVuePlugin()

export const scriptSetup = ScriptSetup({})

export const viteLegacy = legacy({
  targets: ['ie >= 11'],
  additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
})

export const windicss = WindiCSS()

export const plugins = [viteVue, scriptSetup, viteLegacy, windicss]
