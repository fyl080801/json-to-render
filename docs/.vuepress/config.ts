import type { UserConfig, DefaultThemeOptions } from 'vuepress'

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Json to Render',
  description: '基于 vue3 的动态界面组件',
  base: '/',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      { text: '指南', link: '/guide/00.intro.html' },
      {
        text: '参考',
        children: [
          {
            text: 'JsonToRender',
            children: ['/reference/json-to-render/00.props.html'],
          },
        ],
      },
      { text: 'Github', link: 'https://github.com/fyl080801/json-to-render' },
    ],
    sidebar: {
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
    },
  },
}

export default config
