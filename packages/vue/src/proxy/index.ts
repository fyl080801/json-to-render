import { forEach } from 'lodash-es'
import {
  ProxyHandlerFactory,
  ProxyHandler,
  ProxyTarget,
  ProxyFlags
} from '../../../types'
import on from './on'
import bind from './bind'
import update from './update'
import raw from './raw'
import condition from './condition'
import { canProxy, isProxy } from '../utils/proxy'

const proxys: ProxyHandlerFactory[] = [bind, update, on, raw, condition]

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

  forEach(origin, (value, prop) => {
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

  // setter 不仅仅是负责设置属性，还要在设置属性的时候判断属性是否也是需要代理的
  // 如果属性值是可以代理的对象，则直接包装成代理
  const setter = (target: any, p: any, value: any, receiver: any): boolean => {
    if (!canProxy(value)) {
      return Reflect.set(target, p, value, receiver)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const injected = isProxy(value) ? value : injectProxy(value, context)
      handlers.set(p, getProxyHandler(injected, context))
      return Reflect.set(target, p, injected, receiver)
    }
  }

  return new Proxy(origin, { get: getter, set: setter })
}

const process = (context: any) => {
  return (value: any, index: any, collection: any) => {
    if (isProxy(value) || !canProxy(value)) {
      return
    }

    collection[index] = createProxy(value, context)

    forEach(collection[index], process(context))
  }
}

const processProxy = (target: any, context: any) => {
  forEach(target, process(context))
}

export const injectProxy = (target: any, context: any) => {
  const proxy = { value: createProxy(target, context) }
  processProxy(proxy.value, context)
  return proxy.value
}
