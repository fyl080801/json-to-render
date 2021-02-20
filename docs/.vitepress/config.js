const nav = require('./configs/navbar')
const sidebar = require('./configs/sidebar')
// const demo = require('markdown-it-vue-demo-block')

module.exports = {
  lang: 'zh-CN',
  title: 'Json to Render',
  description: '功能强大的动态界面渲染组件',
  base: '/json-to-render/',
  themeConfig: {
    nav,
    sidebar,
    lastUpdated: false,
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // md.use(demo)
    },
  },
}
