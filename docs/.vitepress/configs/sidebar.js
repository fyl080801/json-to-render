module.exports = {
  '/guide/': [
    {
      text: '指南',
      children: [
        { text: '介绍', link: '/guide/' },
        { text: '快速上手', link: '/guide/getting-started' },
        { text: '在线示例', link: '/guide/examples' },
        { text: '仓库说明', link: '/guide/repo' },
      ],
    },
    {
      text: '组件',
      children: [
        { text: '使用组件', link: '/guide/reference-component' },
        { text: '配置', link: '/guide/configs' },
        { text: '数据源', link: '/guide/datasource' },
        { text: '属性表达式', link: '/guide/prop-transform' },
        { text: '快捷属性', link: '/guide/prop-render' },
        { text: '功能函数', link: '/guide/functional' },
        { text: '监听', link: '/guide/listeners' },
      ],
    },
    {
      text: '高级',
      children: [{ text: '自定义', link: '/guide/setup' }],
    },
  ],
  '/reference/json-to-render/': 'auto',
  '/reference/designer/': 'auto',
}
