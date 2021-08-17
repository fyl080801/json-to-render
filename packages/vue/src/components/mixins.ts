import { provide, inject } from 'vue'

const serviceToken = Symbol('serviceToken')

export const useJRender = (props?: Record<string, unknown>) => {
  if (props) {
    const services = Object.keys(props).reduce((target, key) => {
      target[key] = props[key]
      return target
    }, {} as Record<string, unknown>)

    provide(serviceToken, services)

    return services
  } else {
    return inject(serviceToken)
  }
}
