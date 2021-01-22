declare interface Services {
  [key: string]: Function
}

declare interface ServiceBuildHandler {
  (services: Services): void
}

declare interface ServiceBuilder {
  (services: ServiceBuildHandler): void
}

declare interface ServiceBuilderFactory {
  (services: Services): ServiceBuilder
}
