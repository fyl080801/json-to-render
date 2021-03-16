import Main from './Main'
// import Toolbox from './components/Toolbox'

const plugin = {
  ...Main,
  install: (app: any) => {
    app.component(Main.name, Main)
  },
}

// export { Toolbox }

export default plugin
