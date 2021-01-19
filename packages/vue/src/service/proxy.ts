const proxyMap: ProxyHandlerFactory[] = []

export const addProxy = (proxy: ProxyHandlerFactory) => {
  proxyMap.push(proxy)
}

export const getProxyHandler = (
  value: any,
  context: any
): JProxyHandler | undefined => {
  for (const index in proxyMap) {
    const handler = proxyMap[index](value, context)
    if (handler) {
      return handler
    }
  }
}
