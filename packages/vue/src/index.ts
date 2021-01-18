import { JRenderPlugin } from '../typings'
import jRender from './components/jRender'
export * from './components/jRender'
export * from './components/jNode'

const use = (builder: any) => {
  builder({})
}

const plugin: JRenderPlugin = {
  ...jRender,
  install: app => {
    app.component(jRender.name, jRender)
  },
  use
}

export default plugin
