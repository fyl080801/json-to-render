export const createServiceBuilder: ServiceBuilderFactory = services => {
  return builder => {
    builder(services)
  }
}
