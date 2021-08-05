import {
  // assignObject,
  isFunction,
  // assignArray,
  // forEachTarget,
  isArray,
  isObject,
  createToken,
  ContainerInstance,
} from '../utils'
import { ProxyHandler, ProxyMatcher, ProxyContext, ProxyFlags } from '../types'
import { servicesToken } from '../service/token'

export const proxyToken = createToken<ProxyMatcher>('proxy')

export const proxyServiceToken = createToken<ProxyService>('proxyService')

export const proxyContextToken = createToken<ProxyContext>('proxyContext')

export class ProxyService {
  private proxies: ProxyMatcher[] = []
  private services: Record<string, unknown> = {}

  constructor(container: ContainerInstance) {
    this.proxies = container.getMany(proxyToken)
    this.services = container.get(servicesToken) as Record<string, unknown>
  }

  private getHandler() {
    return (value: any) => {
      for (const index in this.proxies) {
        const handler: ProxyHandler | undefined = this.proxies[index](
          value,
          this.services
        )
        if (handler) {
          return handler
        }
      }
    }
  }

  private createProxy(origin: unknown, context: ProxyContext) {
    const get = (target: any, p: any, receiver: any): any => {
      if (p === ProxyFlags.PROXY_DEFINE) {
        return target
      }

      if (p === ProxyFlags.IS_PROXY) {
        return true
      }

      const value = Reflect.get(target, p, receiver)
      const handler: ProxyHandler | undefined = this.getHandler()(value)
      const result = handler && isFunction(handler) ? handler(context) : value

      return this.inject(result, context)

      // return this.inject(
      //   handler && isFunction(handler) ? handler(context) : value,
      //   context
      // )
    }

    return new Proxy(origin, { get })
  }

  inject(target: unknown, context: ProxyContext) {
    if (!isAllowedProxy(target)) {
      return target
    }

    if (isProxy(target)) {
      return this.createProxy(getProxyDefine(target), context)
    }

    return this.createProxy(target, context)
  }
}

export const isProxy = (target: unknown) => {
  const proxy: any = target
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.IS_PROXY])
}

export const isRejectProxy = (target: unknown) => {
  const proxy: any = target
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.NOT_PROXY])
}

export const isAllowedProxy = (target: unknown) => {
  return (
    !!target &&
    !isRejectProxy(target) &&
    !isFunction(target) &&
    (isObject(target) || isArray(target))
  )
}

export const getProperty = (target: any, prop: any) => {
  return Reflect.getOwnPropertyDescriptor(target, prop)
}

export const getProxyDefine = (target: any) => {
  if (!isArray(target) && !isObject(target)) {
    return target
  }

  const result = isProxy(target) ? target[ProxyFlags.PROXY_DEFINE] : target

  // const assign = isArray(target) ? assignArray : assignObject

  // const result = assign(
  //   isProxy(target) ? target[ProxyFlags.PROXY_DEFINE] : target
  // )

  // forEachTarget(result, (value: any, prop: any) => {
  //   result[prop] = getProxyDefine(value)
  // })

  return result
}
