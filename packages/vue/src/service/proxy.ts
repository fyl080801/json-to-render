import { assignArray } from '@json-to-render/utils'

export const createProxySetup = (store: ProxyHandlerResolver[]) => {
  return (proxy: ProxyHandlerResolver) => {
    store.push(proxy)
  }
}

export const createProxyService = (inits?: ProxyHandlerResolver[]) => {
  const store: ProxyHandlerResolver[] = assignArray([], inits || [])

  return {
    store,
    setup: createProxySetup(store)
  }
}
