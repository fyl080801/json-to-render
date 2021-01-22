import { assignArray } from '@json-to-render/utils'

const proxyMap: ProxyHandlerResolver[] = []

export const createProxyService = (store: ProxyHandlerResolver[]) => {
  return (proxy: ProxyHandlerResolver) => {
    store.push(proxy)
  }
}

export const getProxyService = (
  store: ProxyHandlerResolver[]
): ProxyHandlerResolver => {
  return (value, context) => {
    const assigned = assignArray([], proxyMap, store)
    for (const index in assigned) {
      const handler = assigned[index](value, context)
      if (handler) {
        return handler
      }
    }
  }
}

export const proxy = createProxyService(proxyMap)
