import {
  assignArray,
  assignObject,
  createToken,
  ContainerInstance,
  InjectContainer,
  servicesToken,
} from '@json2render/core'
import { HookMeta } from '../types'
import pipeline from '../utils/pipeline'

export const prerenderToken = createToken<HookMeta>('prerender')

export const prerenderServiceToken =
  createToken<PrerenderService>('prerenderService')

export const renderToken = createToken<HookMeta>('render')

export const renderServiceToken = createToken<RenderService>('renderService')

export class PrerenderService {
  private hooks: HookMeta[] = []
  private services: Record<string, unknown>

  constructor(@InjectContainer() container: ContainerInstance) {
    this.hooks = container
      .getMany(prerenderToken)
      .sort((a, b) => a.index - b.index)
    this.services = container.get(servicesToken)
  }

  process(value: any, context: Record<string, unknown>) {
    const innerServices = new Proxy(
      { context },
      {
        get: (target, p, receiver) => {
          if (p === 'context') {
            return Reflect.get(target, p, receiver)
          } else {
            return this.services[p as string]
          }
        },
      }
    )

    return (extra: HookMeta[]) => {
      pipeline(assignArray(this.hooks, extra || []), innerServices)(value)
    }
  }
}

export class RenderService {
  private hooks: HookMeta[] = []

  constructor(@InjectContainer() container: ContainerInstance) {
    this.hooks = container
      .getMany(renderToken)
      .sort((a, b) => a.index - b.index)
  }

  process(value: any, context: Record<string, unknown>) {
    return (extra: HookMeta[]) => {
      pipeline(
        assignArray(this.hooks, extra || []),
        assignObject({ context })
      )(value)
    }
  }
}
