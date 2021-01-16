import { ProxyRegistry } from './proxy'

export type ServiceBuildHandler = (
  builder: (serviceBuilder: ServiceBuilder) => void
) => ServiceProvider
export type ServiceMergeHandler = (provider: ServiceProvider) => ServiceProvider
export type ServiceBuildhandler = () => Service
export type ServiceProviderFactory = () => ServiceProvider

export interface ServiceBuilder {
  proxy: ProxyRegistry
  render
  functional
}

export interface Service {
  proxy
  render
  functional
}

export interface ServiceProvider {
  use: ServiceBuildHandler
  merge: ServiceMergeHandler
  build: ServiceBuildhandler
}

export const createServiceProvider: ServiceProviderFactory = () => {
  const store = new Map()

  const serviceBuilder: ServiceBuilder = {
    functional: () => {
      //
    },
    proxy: () => {
      //
    },
    render: () => {
      //
    }
  }

  const sp: ServiceProvider = {
    use: builder => {
      builder(serviceBuilder)

      return sp
    },
    merge: extend => {
      return sp
    },
    build: () => {
      return {
        proxy: () => {
          //
        },
        render: () => {
          //
        },
        functional: () => {
          //
        }
      }
    }
  }

  return sp
}
