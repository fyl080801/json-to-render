import { Plugin } from 'vue'
import jRender from './src/components/jRender'
export * from './src/components/jRender'
export * from './src/components/jNode'

const plugin: Plugin = {
  ...jRender,
  install: app => {
    app.component(jRender.name, jRender)
  }
}

export default plugin
