import jRender from './components/jRender'
import { use } from './service'
import plugins from './plugin'

const plugin: any = {
  ...jRender,
  install: (app: any) => {
    app.component(jRender.name, jRender)
  },
  use
}

plugin.use(plugins)

export default plugin
