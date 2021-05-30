import jRender from './components/jRender'
import { globalSetup } from './service'
import { JRenderPlugin } from './types'

export * from './types'

const plugin: JRenderPlugin = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use: globalSetup,
}

export default plugin
