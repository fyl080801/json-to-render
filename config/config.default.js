'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (appInfo) => {
  const config = (exports = {})

  const packagesPath = fs.readdirSync(path.resolve(process.cwd(), 'packages'))

  config.keys = appInfo.name + '_1636560035989_1239'

  config.development = {
    overrideDefault: true,
    overrideIgnore: false,
    watchDirs: ['app', 'config', 'app.js', 'agent.js', 'packages', 'pages'],
    ignoreDirs: [
      'node_modules',
      ...packagesPath.map((dir) => `packages/${dir}/lib`),
      ...packagesPath.map((dir) => `packages/${dir}/src`),
    ],
  }

  config.cluster = {}

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  }

  config.middleware = []

  const userConfig = {}

  return {
    ...config,
    ...userConfig,
  }
}
