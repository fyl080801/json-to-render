import type { UserConfig, DefaultThemeOptions } from 'vuepress'
import navbar from './configs/navbar'
import sidebar from './configs/sidebar'

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Json to Render',
  description: '基于 json 的动态界面组件',
  base: '/',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar,
    sidebar,
    contributors: false,
    lastUpdated: false,
  },
}

export default config
