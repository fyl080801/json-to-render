// eslint-disable-next-line @typescript-eslint/no-var-requires
const { rollups } = require('../../build')

const configs = {
  types: ['umd', 'iife', 'esm'],
  external: ['@json-to-render/core', '@json-to-render/utils']
}

const entries = (() => {
  const entries = {}
  entries['main'] = './src/index.ts'

  const result = rollups.establish(entries, configs)
  return result
})()

export default entries
