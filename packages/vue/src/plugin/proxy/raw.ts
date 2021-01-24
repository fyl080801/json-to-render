import { isAllowedProxy, ProxyFlags } from '@json-to-render/core'

const raw: ProxyHandlerResolver<RawTransform> = value => {
  const execute = () => {
    if (isAllowedProxy(value.$value)) {
      return new Proxy(value.$value as object, {
        get: (target, p, receiver) => {
          if (p === ProxyFlags.IS_PROXY) {
            return true
          }
          if (p === ProxyFlags.NOT_PROXY) {
            return true
          }
          return Reflect.get(target, p, receiver)
        }
      })
    } else {
      value.$value
    }
  }

  return typeof value === 'object' && value && value.$type === 'raw' && execute
}

export default raw
