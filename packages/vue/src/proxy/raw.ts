import { ProxyFlags, ProxyHandlerFactory, RawTransform } from '../../../types'
import { isAllowedProxy } from '../utils/proxy'

const raw: ProxyHandlerFactory<RawTransform> = value => {
  return typeof value === 'object' && value && value.$type === 'raw'
    ? () => {
        if (isAllowedProxy(value.$value)) {
          return new Proxy(value.$value as object, {
            get: (target, p, receiver) => {
              if (p === ProxyFlags.IS_PROXY) {
                return true
              }
              return Reflect.get(target, p, receiver)
            }
          })
        } else {
          value.$value
        }
      }
    : null
}

export default raw
