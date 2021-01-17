import { forEachTarget } from '../utils/helpers'
import {
  ProxyHandlerFactory,
  ProxyHandler,
  ProxyTarget,
  ProxyFlags
} from '../../../types'
import on from './on'
import bind from './bind'
import raw from './raw'
import { isAllowedProxy, isProxy, isRejectProxy } from '../utils/proxy'

const proxys: ProxyHandlerFactory[] = [bind, on, raw]

class ProxyHandlerMap {
  private map: Map<string, ProxyHandler>

  constructor() {
    this.map = new Map<string, ProxyHandler>()
  }

  set(key: string, handler?: ProxyHandler) {
    if (handler) {
      this.map.set(key, handler)
    }
  }
  get(key: string) {
    return this.map.get(key)
  }

  remove(key: string) {
    this.map.delete(key)
  }
}

const getProxyHandler = (value: any, context: any) => {
  for (const index in proxys) {
    const handler = proxys[index](value, context)
    if (handler) {
      return handler
    }
  }
}

const createProxyMap = (origin: any, context: any) => {
  const handlers = new ProxyHandlerMap()

  forEachTarget(origin, (value: any, prop: any) => {
    handlers.set(prop, getProxyHandler(value, context))
  })

  // proxy flags
  handlers.set(ProxyFlags.IS_PROXY, () => true)

  return handlers
}

const createProxy = (origin: any, context: any) => {
  const handlers = createProxyMap(origin, context)

  const getter = (target: any, p: any, receiver: any): ProxyTarget => {
    return (handlers.get(p) || Reflect.get)(target, p, receiver)
  }

  const setter = (target: any, p: any, value: any, receiver: any): boolean => {
    if (!isAllowedProxy(value)) {
      return Reflect.set(target, p, value, receiver)
    } else {
      const injected = isProxy(value)
        ? value
        : /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
          injectProxy(value, context)
      handlers.set(p, getProxyHandler(injected, context))
      return Reflect.set(target, p, injected, receiver)
    }
  }

  const deleter = (target: any, p: any) => {
    handlers.remove(p)
    return Reflect.deleteProperty(target, p)
  }

  return new Proxy(origin, {
    get: getter,
    set: setter,
    deleteProperty: deleter
  })
}

const process = (context: any) => {
  return (value: any, index: any, collection: any) => {
    // if (isProxy(value) || !isAllowedProxy(value)) {
    //   return
    // }
    if (!isAllowedProxy(value)) {
      return
    }

    collection[index] = createProxy(collection[index], context)

    if (!isRejectProxy(collection[index])) {
      forEachTarget(collection[index], process(context))
    }
  }
}

const processProxy = (target: any, context: any) => {
  forEachTarget(target, process(context))
}

export const injectProxy = (target: any, context: any) => {
  const proxy = { value: target }
  processProxy(proxy, context)
  return proxy.value
}
