import DefaultTheme from 'vitepress/theme'
// import DemoShow from './components/demo-show'

export default {
  ...DefaultTheme,
  //   Layout,
  //   NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app.component(DemoShow.name, DemoShow)
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
}
