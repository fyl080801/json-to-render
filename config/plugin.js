'use strict'

module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  RequestCurl: {
    enable: !!process.env.curl,
    package: 'egg-request-curl',
  },
  '@egglib/statics': {
    enable: true,
  },
  '@egglib/statics-vite': {
    enable: true,
  },
  '@egglib/render': {
    enable: true,
  },
  '@egglib/render-editor': {
    enable: true,
  },
}
