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
  '@egglib/statics': {
    enable: true,
  },
  '@egglib/statics-vite': {
    enable: true,
  },
  '@json2render/vue2-dev': {
    enable: true,
  },
  '@json2render/vue3-dev': {
    enable: true,
  },
}
