import { ProxyContext, ProxyFlags, ProxyInjector } from '../types'
import { getProxyDefine, isAllowedProxy, isProxy } from './utils'
import { proxyServiceProvider } from '../service/proxy'

export const getProxyInjector = (excludes: string[]) => {
  const proxies = proxyServiceProvider.resolveAll(excludes)

  const getProxyHandler = (value: any) => {
    for (const proxy of proxies) {
      const handler = proxy(value)
      if (handler) {
        return handler
      }
    }
    return false
  }

  const createProxy = (originTarget: any, context: ProxyContext) => {
    const getter = (target: any, p: any, receiver: any): any => {
      if (p === ProxyFlags.PROXY_DEFINE) {
        return target
      }

      if (p === ProxyFlags.IS_PROXY) {
        return true
      }

      const originValue = Reflect.get(target, p, receiver)

      const handler = getProxyHandler(originValue)

      return injectProxy(handler ? handler(context) : originValue, context)
    }

    return new Proxy(originTarget, {
      get: getter,
    })
  }

  const injectProxy: ProxyInjector = (target: any, context: any) => {
    if (!isAllowedProxy(target)) {
      return target
    }

    if (isProxy(target)) {
      return createProxy(getProxyDefine(target), context)
    }

    const proxed = createProxy(target, context)

    return proxed
  }

  return injectProxy
}
