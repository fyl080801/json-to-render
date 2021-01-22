import { assignArray } from '@json-to-render/utils'

const createResolver = (
  scope: Map<string, any>,
  merged: Array<ServiceProvider>,
  serviceStore: Map<string, ServiceDefinition>
): ServiceResolver => {
  const resolver: ServiceResolver = name => {
    const service = serviceStore.get(name)

    if (service) {
      const depParams: Array<any> = service.dependents.map(depName => {
        let dependInstance = null
        const dependOn = serviceStore.get(depName)

        if (dependOn && dependOn.lifecycle && dependOn.service) {
          switch (dependOn?.lifecycle) {
            case Lifecycles.Singleton:
              dependInstance = dependOn.service
              break
            case Lifecycles.Scoped:
              {
                let scopedDep = scope.get(depName)

                if (!scopedDep) {
                  scopedDep = dependOn.service(
                    ...dependOn.dependents.map(item => resolver(item))
                  )
                  scope.set(depName, scopedDep)
                }

                dependInstance = scopedDep
              }
              break
            case Lifecycles.Temporary:
              dependInstance = dependOn.service(
                ...dependOn.dependents.map(item => resolver(item))
              )
              break
          }
        }

        if (dependInstance === null) {
          for (let i = 0; i < merged.length; i++) {
            dependInstance = merged[i].resolve(depName)
            if (dependInstance) {
              break
            }
          }
        }

        return dependInstance
      })

      return service.service(...depParams)
    } else {
      for (let i = 0; i < merged.length; i++) {
        const mergedService = merged[i].resolve(name)
        if (mergedService) {
          return mergedService
        }
      }
    }
  }

  return resolver
}

const scopes = new Map<symbol, Map<string, any>>()

export const createServiceCollection: ServiceCollectionFactory = (
  ...merges
) => {
  const merged: Array<ServiceProvider> = []
  const serviceStore = new Map<string, ServiceDefinition>()

  const createProvider = (
    ...starts: Array<ServiceProvider>
  ): ServiceProvider => {
    const id = Symbol()

    const startedScope = new Map<string, any>()

    scopes.set(id, startedScope)

    const provider: ServiceProvider = {
      resolve: createResolver(
        startedScope,
        assignArray(merged, starts),
        serviceStore
      ),
      endScope: () => {
        merged.forEach(item => {
          item.endScope()
        })
        merged.length = 0
        scopes.delete(id)
      },
      identity: id
    }

    return provider
  }

  const instance: ServiceCollection = {
    singleton: (name, service, ...dependents) => {
      serviceStore.set(name, {
        service: service(),
        dependents,
        lifecycle: Lifecycles.Singleton
      })
      return instance
    },
    scoped: (name, service, ...dependents) => {
      serviceStore.set(name, {
        service: service,
        dependents,
        lifecycle: Lifecycles.Scoped
      })
      return instance
    },
    temporary: (name, service, ...dependents) => {
      serviceStore.set(name, {
        service: service,
        dependents,
        lifecycle: Lifecycles.Temporary
      })
      return instance
    },
    startScope: (...starts: Array<ServiceProvider>) => {
      merges.forEach(item => {
        merged.push(item.startScope())
      })
      return createProvider(...starts)
    }
  }

  return instance
}

// createServiceCollection()
//   .scoped('arrayStore', () => {
//     return []
//   })
//   .scoped(
//     'proxy',
//     (store: Array<any>) => {
//       //
//     },
//     'arrayStore'
//   )
