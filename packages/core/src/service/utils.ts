import { ServiceProvider, ServiceStore } from '../types'

// export const createServiceBuilder: ServiceBuilderFactory = (services) => {
//   return (builder) => {
//     builder(services)
//   }
// }

export const createServiceSetup = <TService>(store: ServiceStore<TService>) => {
  return (name: string, service: TService, index?: number) => {
    store[name] = { service, index: index || 0 }
  }
}

export const createServieProvider = <TService>(
  init?: ServiceStore<TService>
): ServiceProvider<TService> => {
  const store = { ...(init || {}) }

  return {
    setup: createServiceSetup(store),
    resolveAll: (excludes) => {
      return Object.values(
        excludes
          ? Object.keys(store).filter((key) => excludes.indexOf(key) < 0)
          : store
      )
        .sort((a, b) => a.index - b.index)
        .map(({ service }) => service)
    },
    resolve: (name: string) => {
      return store[name].service
    },
  }
}
