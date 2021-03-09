import Main from './Main'

const plugin = {
  ...Main,
  install: (app: any) => {
    app.component(Main.name, Main)
  },
}

export default plugin
