declare type ServiceFactory<T> = (...args: Array<any>) => T

declare type ServiceRegister = <T>(
  name: string,
  service: ServiceFactory<T>,
  ...dependents: Array<string>
) => ServiceCollection

declare interface ServiceCollection {
  singleton: ServiceRegister
  scoped: ServiceRegister
  temporary: ServiceRegister
  startScope: (...starts: Array<ServiceProvider>) => ServiceProvider
}

declare type ServiceResolver = (name: string) => any

declare interface ServiceProvider {
  resolve: ServiceResolver
  endScope: () => void
  identity: symbol
}

declare enum Lifecycles {
  Singleton,
  Scoped,
  Temporary
}
declare interface ServiceDefinition {
  lifecycle: Lifecycles
  service: any
  dependents: Array<string>
}

declare type ServiceCollectionFactory = (
  ...merges: Array<ServiceCollection>
) => ServiceCollection
