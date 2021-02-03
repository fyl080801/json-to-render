import { assignArray } from '@json2render/utils'
import { ProxyHandlerResolver } from '@json2render/core'

export const createProxySetup = (store: ProxyHandlerResolver[]) => {
  return (proxy: ProxyHandlerResolver) => {
    store.push(proxy)
  }
}

export const createProxyService = (inits?: ProxyHandlerResolver[]) => {
  const store: ProxyHandlerResolver[] = assignArray(inits || [])

  return {
    store,
    setup: createProxySetup(store),
  }
}
