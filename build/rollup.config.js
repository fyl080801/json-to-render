const { alias, babel, commonjs, nodeResolve, terser, sizes, banner } = require('./rollup.plugins')
const { helperGlobal } = require('./runtime.helper')
const { assignObject, assignArray } = require('./utils')

const commonGlobal = {
  vue: 'Vue',
  '@vue/composition-api': 'VueCompositionAPI',
}
const defaultGlobal = assignObject(helperGlobal, commonGlobal)
const defaultExternal = ['vue', '@vue/composition-api', /core-js/, /regenerator-runtime/]

const defaultPlugins = [
  alias({
    resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
  }),
  babel({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    exclude: ['node_modules/**'],
    babelHelpers: 'runtime',
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          targets: '> 0.25%, IE >= 11',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      '@babel/transform-runtime',
      '@vue/babel-plugin-jsx',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  }),
  nodeResolve({
    browser: true,
    preferBuiltins: false,
    moduleDirectories: ['node_modules'],
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  terser(),
  sizes(),
  banner(`<%= pkg.name %> v<%= pkg.version %>
(c) 2021-${new Date().getFullYear()} <%= pkg.author %>`),
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
  const path = JSON.parse(JSON.stringify(entryValue))

  const result = {}
  if (format === 'iife') {
    result.file = path.replace('./lib', 'dist').replace('js', 'min.js')
  } else {
    result.file = path.replace('./lib', 'dist').replace('js', format + '.js')
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
  const result = []
  if (configs.types && configs.types.length > 0) {
    for (const index in configs.types) {
      const output = createOutputType(name, path, configs.types[index], configs.globals)
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
    external: assignArray(configs.external, defaultExternal),
  }
}

const establish = (entries, configs = {}) => {
  const result = []
  for (const item in entries) {
    const entry = createEntry(item, entries[item], configs)
    // console.log('[HRB] create entry : ', entry);
    result.push(entry)
  }

  return result
}

module.exports = { defaultPlugins, establish }
