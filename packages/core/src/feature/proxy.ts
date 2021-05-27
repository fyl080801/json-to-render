import {
  assignObject,
  isFunction,
  assignArray,
  forEachTarget,
  isArray,
  isObject,
  createToken,
  InjectMany,
  Inject,
} from '../utils'
import { ProxyHandler, ProxyMatcher, ProxyContext, ProxyFlags } from '../types'
import { servicesToken } from '../service/token'

export const proxyToken = createToken<ProxyMatcher>('proxy')

export const proxyServiceToken = createToken<ProxyService>('proxyService')

export const proxyContextToken = createToken<ProxyContext>('proxyContext')

export class ProxyService {
  constructor(
    @InjectMany(proxyToken) private readonly proxies: ProxyMatcher[],
    @Inject(servicesToken) private readonly services: { [key: string]: unknown }
  ) {}

  private getHandler() {
    return (value: any) => {
      for (const index in this.proxies) {
        const handler: ProxyHandler = this.proxies[index](value)
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

      return this.inject(
        handler && isFunction(handler)
          ? handler(context, this.services)
          : value,
        context
      )
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
    !!target && !isRejectProxy(target) && (isObject(target) || isArray(target))
  )
}

export const getProperty = (target: any, prop: any) => {
  return Reflect.getOwnPropertyDescriptor(target, prop)
}

export const getProxyDefine = (target: any) => {
  if (!isArray(target) && !isObject(target)) {
    return target
  }

  const assign = isArray(target) ? assignArray : assignObject

  const result = assign(
    isProxy(target) ? target[ProxyFlags.PROXY_DEFINE] : target
  )

  forEachTarget(result, (value: any, prop: any) => {
    result[prop] = getProxyDefine(value)
  })

  return result
}
