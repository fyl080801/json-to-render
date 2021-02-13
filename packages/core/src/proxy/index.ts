import { assignObject, isFunction } from '@json2render/utils'
import { JsonProxyHandler, ProxyFlags, ProxyHandlerResolver } from '../types'
import { getProxyDefine, isAllowedProxy, isProxy } from './utils'

const getProxyHandler = (
  proxies: ProxyHandlerResolver[],
  services: any
): ((value: any) => JsonProxyHandler) => {
  return (value: any) => {
    for (const index in proxies) {
      const handler = proxies[index](value, services)
      if (handler) {
        return handler
      }
    }
  }
}

export const createProxyInjector = (
  proxies: ProxyHandlerResolver[],
  services: any
) => {
  const createProxy = (originTarget: any, context: any) => {
    const getter = (target: any, p: any, receiver: any): any => {
      if (p === ProxyFlags.PROXY_DEFINE) {
        return target
      }

      if (p === ProxyFlags.IS_PROXY) {
        return true
      }

      const originValue = Reflect.get(target, p, receiver)

      const handler = getProxyHandler(
        proxies,
        assignObject(services, { injectProxy })
      )(originValue)

      return injectProxy(
        isFunction(handler) ? handler(context) : originValue,
        context
      )
    }

    return new Proxy(originTarget, {
      get: getter,
    })
  }

  const injectProxy = (target: any, context: any) => {
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
