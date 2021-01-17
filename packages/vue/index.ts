import { Plugin } from 'vue'
import jRender from './components/jRender'
export * from './components/jRender'
export * from './components/jNode'

const plugin: Plugin = {
  ...jRender,
  install: app => {
    app.component(jRender.name, jRender)
  }
}

export default plugin
