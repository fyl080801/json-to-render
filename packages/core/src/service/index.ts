import {
  Container,
  Constructable,
  Token,
  ServiceOptions,
  ContainerInstance,
} from 'typedi'
import { v4 } from 'uuid'
import {
  ProxyService,
  proxyServiceToken,
  functionalServiceToken,
  FunctionalService,
  datasourceServiceToken,
  DatasourceService,
  proxyToken,
  functionalToken,
  datasourceToken,
} from '../feature'
import { DatasourceBuilder, Functional, ProxyMatcher } from '../types'
import { assignArray, assignObject } from '../utils'
import { servicesToken } from './token'

const createServices = (
  container: ContainerInstance,
  tokenMap: {
    [key: string]: unknown
  }
) => {
  return new Proxy(
    {},
    {
      get(target, p, receiver) {
        if (typeof p === 'string') {
          const token: any = tokenMap[p]

          if (token) {
            return container.get(token)
          }
        }

        return Reflect.get(target, p, receiver)
      },
    }
  )
}

const getProvider = (container: ContainerInstance) => {
  const instance = {
    addService<T>(token: Token<T> | Constructable<T>, type: Constructable<T>) {
      container.set({
        id: token,
        multiple: false,
        type,
      })
      return instance
    },
    addValue<T>(token: Token<T> | string, value: T) {
      container.set({
        id: token,
        multiple: true,
        value: value,
      })
      return instance
    },
    resolve<T>(token: Token<T> | Constructable<T> | string) {
      return container.get<T>(token)
    },
    resolveAll<T>(token: Token<T> | string) {
      return container.getMany<T>(token)
    },
  }
  return instance
}

export const createServiceContainer = (tokenMap?: Record<string, unknown>) => {
  const stored: ServiceOptions[] = []

  const tokens = assignObject(
    { functional: functionalServiceToken, proxy: proxyServiceToken },
    tokenMap
  )

  const instance = {
    addService<T>(token: Token<T> | Constructable<T>, type: Constructable<T>) {
      stored.push({
        id: token,
        multiple: false,
        type,
      })
      return instance
    },
    addValue<T>(token: Token<T> | string, value: T) {
      stored.push({
        id: token,
        multiple: true,
        value: value,
      })
      return instance
    },
    build(id?: string) {
      const container = Container.of(id || v4())

      assignArray(
        [
          {
            id: servicesToken,
            multiple: false,
            value: createServices(container, tokens),
          },
          {
            id: proxyServiceToken,
            multiple: false,
            type: ProxyService,
          },
          {
            id: functionalServiceToken,
            multiple: false,
            type: FunctionalService,
          },
          {
            id: datasourceServiceToken,
            multiple: false,
            type: DatasourceService,
          },
        ],
        stored
      ).forEach((item) => container.set(item))

      return getProvider(container)
    },
  }

  return instance
}

export const createCoreSetup = (container: any) => {
  const proxySetup = (value: ProxyMatcher) => {
    container.addValue(proxyToken, value)
  }

  const functionalSetup = (name: string, value: Functional) => {
    container.addValue(functionalToken, {
      name,
      invoke: value,
    })
  }

  const datasourceSetup = (name: string, value: DatasourceBuilder) => {
    container.addValue(datasourceToken, {
      type: name,
      build: value,
    })
  }

  return {
    proxy: proxySetup,
    functional: functionalSetup,
    datasource: datasourceSetup,
  }
}

export { servicesToken }
