const { rollups } = require('../../build')
const { typescript, scss, vue3 } = require('../../build/rollup.plugins')
const { path } = require('../../build/utils')
const { defineConfig } = require('rollup')

const configs = defineConfig({
  types: ['umd', 'iife', 'esm'],
  external: [],
  plugins: [
    vue3({}),
    ...rollups.defaultPlugins,
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    scss(),
  ],
  globals: {
    '@json2render/core': 'Json2Render',
  },
})

export default (() => {
  const entries = {}

  entries.Json2RenderVue3 = './lib/index.ts'

  const result = rollups.establish(entries, configs)

  return result
})()
