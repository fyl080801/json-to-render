export const createComponentSetup = (store: any) => {
  return (name: string | { [key: string]: any }, component?: any) => {
    if (typeof name === 'string' && component) {
      store[name] = component
    } else {
      Object.assign(store, name)
    }
  }
}

export const createComponentService = () => {
  const store = {}

  return {
    store,
    setup: createComponentSetup(store)
  }
}
