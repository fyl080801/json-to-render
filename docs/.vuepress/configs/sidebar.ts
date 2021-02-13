import { SidebarConfig } from '@vuepress/theme-default'

const sidebar: SidebarConfig = {
  '/guide/': [
    {
      text: '指南',
      isGroup: true,
      children: ['/guide/00.intro.html', '/guide/01.getting-started.html'],
    },
  ],
  '/reference/json-to-render/': [
    {
      isGroup: true,
      text: 'JsonToRender 参考',
      children: ['/reference/json-to-render/00.props.html'],
    },
  ],
  '/reference/designer/': [
    {
      isGroup: true,
      text: '设计器参考',
      children: ['/reference/designer/00.intro.html'],
    },
  ],
}

export default sidebar
