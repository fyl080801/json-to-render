import jRender from './components/jRender'
import { globalServiceBuilder } from './service'
import { JRenderPlugin } from './types'

export * from './types'

export const plugin: JRenderPlugin = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use: globalServiceBuilder
}
