import { forEachTarget } from '@json-to-render/utils'
import { isAllowedProxy, isProxy, isRejectProxy, ProxyFlags } from './utils'

// import on from './on'
// import bind from './bind'
// import raw from './raw'

const proxys: ProxyHandlerFactory[] = [] // [bind, on, raw]

const getProxyHandler = (value: any, context: any) => {
  for (const index in proxys) {
    const handler = proxys[index](value, context)
    if (handler) {
      return handler
    }
  }
}

const createProxyHandlerMap = () => {
  const map = new Map<string, JProxyHandler>()

  return {
    set: (key: string, handler?: JProxyHandler) => {
      if (handler) {
        map.set(key, handler)
      }
    },
    get: (key: string) => {
      return map.get(key)
    },

    remove: (key: string) => {
      if (map.has(key)) {
        map.delete(key)
      }
    }
  }
}

const createProxyMap = (target: any, context: any) => {
  const handlers = createProxyHandlerMap()

  forEachTarget(target, (value: any, prop: any) => {
    handlers.set(prop, getProxyHandler(value, context))
  })

  // proxy flags
  handlers.set(ProxyFlags.IS_PROXY, () => true)

  return handlers
}

const createProxy = (originTarget: any, context: any) => {
  const handlers = createProxyMap(originTarget, context)

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

  return new Proxy(originTarget, {
    get: getter,
    set: setter,
    deleteProperty: deleter
  })
}

const process = (context: any) => {
  return (value: any, index: any, collection: any) => {
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
