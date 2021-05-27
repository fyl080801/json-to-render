import { Container, Constructable, Token, ServiceOptions } from 'typedi'
import { v4 } from 'uuid'

export const createServiceContainer = () => {
  const stored: ServiceOptions[] = []

  const build = (id?: string) => {
    const container = Container.of(id || v4())

    stored.forEach((item) => container.set(item))

    const provider = {
      addService<T>(
        token: Token<T> | Constructable<T>,
        type?: Constructable<T> | null
      ) {
        if (!type) {
          container.set({
            id: token,
            multiple: true,
            type: token as Constructable<T>,
          })
        } else {
          container.set({ id: token, multiple: true, type })
        }
        return provider
      },
      addValue<T>(token: Token<T>, value: T | null) {
        container.set({
          id: token,
          multiple: false,
          value: value,
        })
        return provider
      },
      resolve<T>(token: Token<T> | Constructable<T>) {
        return container.get<T>(token)
      },
      resolveAll<T>(token: Token<T>) {
        return container.getMany<T>(token)
      },
    }

    return provider
  }

  const instance = {
    addService<T>(
      token: Token<T> | Constructable<T>,
      type?: Constructable<T> | null
    ) {
      if (!type) {
        // 直接类型
        stored.push({
          id: token,
          multiple: true,
          type: token as Constructable<T>,
        })
      } else {
        stored.push({ id: token, multiple: true, type })
      }
      return instance
    },
    build,
  }

  return instance
}
