const {
  alias,
  babel,
  buble,
  commonjs,
  filesize,
  image,
  json,
  multi,
  nodeResolve,
  progress,
  sizes,
  strip,
  terser,
  vue,
  typescript,
  // vuetify,
  postcss,
  postcssPresetEnv,
  simpleVars,
  nested,
  cssnano
} = require('./rollup.plugins')

const { path, resolve, assignObject, assignArray } = require('./utils')
const { helperGlobal } = require('./runtime.helper')

/**
 * globals配置写法与import配置写法正好相反
 * 例如：
 * Main.js:
 *
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * config.js
 *
 * export default {
 *   external: ['react', 'react-dom'],
 *   globals: {
 *     'react': 'React',
 *     'react-dom': 'ReactDOM'
 *   },
 * };
 */

const commonGlobal = {
  vue: 'vue'
}

const defaultGlobal = assignObject(helperGlobal, commonGlobal)

const defaultExternal = [
  /core-js/,
  // /@babel\/runtime/,
  // /@babel\/runtime-corejs3/,
  /vue-runtime-helpers/,
  /regenerator-runtime/
]

const defaultPlugins = [
  alias({
    resolve: ['.vue', '.js', '.ts'],
    entries: [{ find: '@', replacement: path.resolve('./', 'src') }]
  }),
  postcss({
    // https://github.com/remaxjs/rollup-plugin-postcss
    // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
    extensions: ['.css'],
    // PostCSS Plugins.
    plugins: [simpleVars(), nested(), postcssPresetEnv(), cssnano()],
    // Extract CSS to the same location where JS file is generated but with .css extension.
    extract: true,
    // Use named exports alongside default export.
    module: true,
    // Minimize CSS, boolean or options for cssnano.
    minimize: true,
    // Enable sourceMap.
    sourceMap: true
  }),
  vue({
    css: false
  }),
  typescript({
    tsconfig: path.resolve('../../', 'tsconfig.json')
  }),
  babel({
    extensions: ['.ts'],
    exclude: ['node_modules/**'],
    babelHelpers: 'runtime',
    configFile: path.resolve('../../', 'babel.config.js')
  }),
  nodeResolve({
    // browser: true,
    // modulesOnly: false,
    moduleDirectories: ['node_modules']
  }),
  commonjs({
    // esmExternals: true,
    // requireReturnsDefault: true,
    include: 'node_modules/**'
  }),

  json(),
  image(),
  multi(),
  terser(),
  strip(),
  progress({
    clearLine: false
  }),
  filesize(),
  buble({
    objectAssign: 'Object.assign',
    transforms: { forOf: false }
  }),
  sizes({
    details: true
  })
]

/**
 * amd – 异步模块定义，用于像RequireJS这样的模块加载器
 * cjs – CommonJS，适用于 Node 和 Browserify/Webpack
 * esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
 * iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
 * umd – 通用模块定义，以amd，cjs 和 iife 为一体
 * system - SystemJS 加载器格式
 */
const createOutputType = (entryKey, entryValue, format, globals = {}) => {
  let path = JSON.parse(JSON.stringify(entryValue))

  let result = {}
  if (format === 'iife') {
    result.file = path.replace('./src', 'dist').replace('js', 'min.js')
  } else {
    result.file = path.replace('./src', 'dist').replace('js', format + '.js')
  }

  result.format = format
  result.globals = assignObject(globals, defaultGlobal)
  result.sourcemap = true

  if (format === 'umd' || format === 'iife') {
    result.name = entryKey
  }

  // console.log('[HRB] create output type: ', result);
  return result
}

const createOutput = (name, path, configs) => {
  let result = []
  if (configs.types && configs.types.length > 0) {
    for (let index in configs.types) {
      let output = createOutputType(
        name,
        path,
        configs.types[index],
        configs.globals
      )
      result.push(output)
    }
  } else {
    result.push(createOutputType(name, path, 'umd', configs.globals))
  }
  return result
}

const createEntry = (name, path, configs) => {
  return {
    input: path,
    output: createOutput(name, path.replace('.ts', '.js'), configs),
    plugins: configs.plugins ? configs.plugins : defaultPlugins,
    external: assignArray(configs.external, defaultExternal)
  }
}

const establish = (entries, configs = {}) => {
  let result = []
  for (let item in entries) {
    let entry = createEntry(item, entries[item], configs)
    // console.log('[HRB] create entry : ', entry);
    result.push(entry)
  }

  return result
}

module.exports = { defaultPlugins, establish }
