import jRender from './components/jRender'
import { globalServiceBuilder } from './service'
import plugins from './plugin'

const plugin: any = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use: globalServiceBuilder
}

plugin.use(plugins)

export default plugin
