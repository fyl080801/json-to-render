'use strict'

const { name } = require('./package.json')

module.exports = (app) => {
  app.addPageConfig(name)
  app.router.get('/vue2-dev*', app.viewInject(name, 'index.html'), (ctx) => {
    ctx.body = {}
  })
}
