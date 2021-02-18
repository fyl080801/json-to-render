const nav = require('./configs/navbar')
const sidebar = require('./configs/sidebar')

module.exports = {
  lang: 'zh-CN',
  title: 'Json to Render',
  description: '基于 json 的动态界面组件',
  base: '/json-to-render/',
  themeConfig: {
    nav,
    sidebar,
    lastUpdated: false,
  },
}
