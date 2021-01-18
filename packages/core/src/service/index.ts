declare type ServiceFactory<T> = (...args: Array<any>) => T

declare type ServiceRegister = <T>(
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

declare type ServiceCollectionFactory = () => ServiceCollection

export const createServiceCollection: ServiceCollectionFactory = () => {
  const temporaries = new Map() // new Map<string, Map<string, any>>()
  const singletons = new Map()
  const scopes = new Map()

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
    singleton: (name, service) => {
      singletons.set(name, service())
      return instance
    },
    scoped: (name, service) => {
      scopes.set(name, service)
      return instance
    },
    temporary: (name, service) => {
      temporaries.set(name, service)
      return instance
    },
    startScope: () => {
      return createProvider()
    }
  }

  return instance
}

createServiceCollection().scoped('', () => {
  return ''
})
