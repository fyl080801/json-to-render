const { merge } = require('lodash')
const config = require('../../tailwind.config')

module.exports = merge({}, config, {
  purge: ['./src/**/*.{vue,ts,tsx}'],
})
