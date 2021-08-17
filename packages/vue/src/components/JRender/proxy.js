import { isArray, isObject } from '@/utils/helpers'

const ISPROXY = '__j_proxy'

const compute = (value) => {
  const handler = (context) => {
    const keys = Object.keys(context)
    return new Function(...keys, `return ${value.replace('$:', '')}`)(
      ...keys.map((key) => context[key])
    )
  }

  return typeof value === 'string' && value.startsWith('$:') && handler
}

const handlers = [compute]

export const isInjectedProxy = (target) => {
  return target[ISPROXY]
}

export const injectProxy = (context) => {
  const inject = (input) => {
    if (!isObject(input) && !isArray(input)) {
      return input
    }

    if (isInjectedProxy(input)) {
      return input
    }

    return new Proxy(input, {
      get: (target, p, receiver) => {
        if (p === ISPROXY) {
          return true
        }

        const value = Reflect.get(target, p, receiver)

        for (const f of handlers) {
          const handler = f(value)

          if (handler) {
            return inject(handler(context))
          }
        }

        return inject(value)
      },
    })
  }

  return inject
}
