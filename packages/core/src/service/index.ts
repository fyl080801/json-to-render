import { ServiceBuilderFactory } from '../types'

export const createServiceBuilder: ServiceBuilderFactory = services => {
  return builder => {
    builder(services)
  }
}
