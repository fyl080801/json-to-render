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
} from '../feature'
import { assignArray } from '../utils'
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
          const token = tokenMap[p]

          if (token) {
            return container.get(p)
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
            value: createServices(container, tokenMap || {}),
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

export { servicesToken }
