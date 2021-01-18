declare type ServiceFactory<T> = (...args: Array<any>) => T

declare type ServiceRegister = <T>(
  type: string,
  name: string,
  service: ServiceFactory<T>
) => ServiceCollection

declare interface ServiceCollection {
  singleton: ServiceRegister
  scoped: ServiceRegister
  temporary: ServiceRegister
  startScope: () => ServiceProvider
}

declare type ServiceResolver = (name: string) => any

declare interface ServiceProvider {
  resolve: ServiceResolver
  endScope: any
  identity: symbol
}

declare enum Lifecycles {
  Singleton,
  Scoped,
  Temporary
}
declare interface ServiceItem {
  lifecycle: Lifecycles
  instance?: any
  factory: any
}

declare type ServiceCollectionFactory = () => ServiceCollection

const getStore = <T>(store: Map<string, T>, name: string, def: T): T => {
  const exist = store.get(name)
  if (exist) {
    return exist
  } else {
    store.set(name, def)
    return def
  }
}

export const createServiceCollection: ServiceCollectionFactory = () => {
  const scopes = new Map()
  const serviceStore = new Map<string, Map<string, ServiceItem>>()

  const createProvider = (): ServiceProvider => {
    const id = Symbol()
    scopes.set(id, new Map())
    return {
      resolve: () => {
        //
      },
      endScope: () => {
        //
      },
      identity: id
    }
  }

  const instance: ServiceCollection = {
    singleton: (type, name, service) => {
      const store = getStore(serviceStore, type, new Map<string, ServiceItem>())
      store.set(name, {
        factory: service,
        instance: service(),
        lifecycle: Lifecycles.Singleton
      })
      return instance
    },
    scoped: (type, name, service) => {
      const store = getStore(serviceStore, type, new Map<string, ServiceItem>())
      store.set(name, {
        factory: service,
        instance: null,
        lifecycle: Lifecycles.Scoped
      })
      return instance
    },
    temporary: (type, name, service) => {
      const store = getStore(serviceStore, type, new Map<string, ServiceItem>())
      store.set(name, {
        factory: service,
        instance: null,
        lifecycle: Lifecycles.Temporary
      })
      return instance
    },
    startScope: () => {
      return createProvider()
    }
  }

  return instance
}

createServiceCollection().scoped('', '', () => {
  return ''
})
