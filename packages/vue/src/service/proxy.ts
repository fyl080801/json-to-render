import { assignArray } from '@json-to-render/utils'

export const createProxySetup = (store: ProxyHandlerResolver[]) => {
  return (proxy: ProxyHandlerResolver) => {
    store.push(proxy)
  }
}

export const createProxyService = (inits?: ProxyHandlerResolver[]) => {
  const store: ProxyHandlerResolver[] = assignArray([], inits || [])

  const getProxyHandlerResolver = (): ProxyHandlerResolver => {
    return value => {
      const assigned = assignArray([], store)
      for (const index in assigned) {
        const handler = assigned[index](value)
        if (handler) {
          return handler
        }
      }
    }
  }

  return {
    store,
    setup: createProxySetup(store),
    getProxyHandlerResolver
  }
}
