export const createSetup = (store: Map<string, any>) => {
  return (name: string, functional: any) => {
    store.set(name, functional)
  }
}

export const createService = (inits?: Map<string, any>) => {
  const store: Map<string, any> = inits || new Map()

  return {
    store,
    setup: createSetup(store),
    resolve: () => {
      const keys = Array.from(store.keys() || [])

      const executers = keys.map((key) => store.get(key))

      return { names: keys, executers }
    },
  }
}
