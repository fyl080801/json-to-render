'use strict'

const path = require('path')

exports.statics = {
  default: '@egglib/render',
  clients: {
    '@egglib/render': {
      dev: true,
      // dist: '',
    },
    '@egglib/render-editor': {
      dev: true,
    },
  },
  env: {},
}

exports.render = {
  // prefix: '/render',
  configRoot: path.resolve(process.cwd(), 'pages'),
  external: [
    'https://cdn.jsdelivr.net/npm/element-ui/lib/index.js',
    '/public/render/component.js',
    '/public/render/extstyle.css',
  ],
  styles: ['https://cdn.jsdelivr.net/npm/element-ui/lib/theme-chalk/index.css'],
}

exports.renderEditor = {
  prefix: '/render-editor',
}
