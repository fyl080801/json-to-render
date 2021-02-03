import { assignArray } from '@json-to-render/utils'
import { ProxyHandlerResolver } from '@json-to-render/core'

export const createProxySetup = (store: ProxyHandlerResolver[]) => {
  return (proxy: ProxyHandlerResolver) => {
    store.push(proxy)
  }
}

export const createProxyService = (inits?: ProxyHandlerResolver[]) => {
  const store: ProxyHandlerResolver[] = assignArray(inits || [])

  return {
    store,
    setup: createProxySetup(store)
  }
}
