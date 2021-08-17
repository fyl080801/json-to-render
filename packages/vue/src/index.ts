import JRender from './components/JRender.vue'
import { globalSetup } from './service'
import { JRenderPlugin } from './types'

export * from './types'

const plugin: JRenderPlugin = {
  ...JRender,
  install: (app: any) => {
    app.component('jrender', JRender)
  },
  use: globalSetup,
}

export default plugin
