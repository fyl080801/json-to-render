const { rollups } = require('../../build')
const {
  typescript,
  // vue2,
  scss,
  // postcss
} = require('../../build/rollup.plugins')
const { path } = require('../../build/utils')
const { defineConfig } = require('rollup')

const configs = defineConfig({
  types: ['umd', 'iife', 'esm'],
  external: [],
  plugins: [
    // 有问题，模板不能正确解析
    // vue2({}),
    ...rollups.defaultPlugins,
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    scss(),
    // postcss({
    //   plugins: [require("tailwindcss"), require("autoprefixer")]
    // })
  ],
  globals: {
    '@json2render/core': 'Json2Render',
  },
})

export default (() => {
  const entries = {}

  entries.Json2RenderVue2 = './lib/index.ts'

  const result = rollups.establish(entries, configs)

  return result
})()
