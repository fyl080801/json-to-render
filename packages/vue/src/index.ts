import jRender from './components/jRender'
import { globalServiceBuilder } from './service'
import { JRenderPlugin } from './types'

export * from './types'

const plugin: JRenderPlugin = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use: globalServiceBuilder,
}

export default plugin
