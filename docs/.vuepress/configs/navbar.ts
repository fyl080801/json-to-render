import { NavbarConfig } from '@vuepress/theme-default'

const navbar: NavbarConfig = [
  { text: '指南', link: '/guide/00.intro.html' },
  {
    text: '参考',
    children: [
      {
        text: 'JsonToRender',
        children: ['/reference/json-to-render/00.props.html'],
      },
      {
        text: '设计器',
        children: ['/reference/designer/00.intro.html'],
      },
    ],
  },
  { text: 'Github', link: 'https://github.com/fyl080801/json-to-render' },
  { text: 'Gitee', link: 'https://gitee.com/fyl080801/json-to-render' },
]

export default navbar
