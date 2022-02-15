import { assignArray, assignObject, isArray, isFunction, isObject, uuid } from './helper'
import { rawData, GET, SET } from './inner'
import { compute } from './proxy'

const sortHandlers = (handlers) => {
  const maps = handlers.reduce((target, item) => {
    target[item.name] = item
    return target
  }, {})
  const dependencies = handlers.reduce((target, item) => {
    target[item.name] = item.dependencies
    return target
  }, {})
  const used = new Set()
  const result = []

  let keys = Object.keys(dependencies)
  let items
  let length

  do {
    length = keys.length
    items = []
    keys = keys.filter((k) => {
      if (!dependencies[k].every(Set.prototype.has, used)) {
        return true
      }

      items.push(k)

      return false
    })
    result.push(...items)
    items.forEach(Set.prototype.add, used)
  } while (keys.length && keys.length !== length)

  result.push(...keys)

  return result.map((key) => maps[key])
}

export const createServiceProvider = () => {
  const services = {
    provider: null,
    functional: {},
    components: {},
    beforeBindHandlers: [],
    proxy: [],
    store: {},
  }

  const setting = {
    useProvider(provider) {
      services.provider = provider
    },
    addComponent: (name, type?) => {
      if (type !== undefined) {
        services.components[name] = type
      } else if (name?.name) {
        services.components[name.name] = name
      }
    },
    onBeforeBind: (handler) => {
      const hook = { name: `BR_${uuid(5)}`, provider: null, dependencies: [], handler }

      if (isFunction(handler)) {
        services.beforeBindHandlers.push(hook)
      }

      const instance = {
        name: (name) => {
          hook.name = name
          return instance
        },
        provider: (name) => {
          hook.provider = name
          return instance
        },
        depend: (name) => {
          if (hook.dependencies.indexOf(name) < 0) {
            hook.dependencies.push(name)
          }
          return instance
        },
      }

      return instance
    },
    addFunction: (name, fx) => {
      if (isFunction(fx)) {
        services.functional[name] = fx
      }
    },
    addProxy: (handler) => {
      if (isFunction(handler)) {
        services.proxy.push(handler)
      }
    },
    addStore(type, provider) {
      if (type && isFunction(provider)) {
        services.store[type] = provider
      }
    },
  }

  const instance = {
    setup: (onSetup) => {
      onSetup(setting)
      return instance
    },
    getSetting() {
      return setting
    },
    getServices() {
      return services
    },
  }

  return instance
}

export const mergeServices = (...services) => {
  const merged = {
    functional: { SET, GET },
    proxy: [compute],
    beforeBindHandlers: [],
    provider: null,
    store: {
      default: rawData,
    },
  }

  services.forEach((service) => {
    Object.keys(service || {}).forEach((key) => {
      if (isObject(service[key])) {
        merged[key] ||= {}
        merged[key] = assignObject(merged[key], service[key])
      } else if (isArray(service[key])) {
        merged[key] ||= []
        merged[key] = assignArray(merged[key], service[key])
      } else {
        merged[key] = service[key] || merged[key]
      }
    })
  })

  merged.beforeBindHandlers = sortHandlers(merged.beforeBindHandlers)

  return merged
}

export const globalServiceProvider = createServiceProvider()

export const useGlobalRender = (setting) => {
  globalServiceProvider.setup(setting)
}
