'use strict'

module.exports = (app) => {
  app.router.get(`/`, (ctx) => {
    ctx.redirect('/vue2-dev')
  })
}
