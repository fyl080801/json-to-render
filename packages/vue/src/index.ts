import jRender from './components/jRender'
import { globalServiceBuilder } from './service'

const plugin: any = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use: globalServiceBuilder
}

export default plugin
