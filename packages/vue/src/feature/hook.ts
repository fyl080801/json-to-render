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
  constructor(
    @InjectContainer() private readonly container: ContainerInstance
  ) {}

  process(value: any, context: Record<string, unknown>) {
    return (extra: HookMeta[]) => {
      pipeline(
        assignArray(
          this.container
            .getMany(prerenderToken)
            .sort((a, b) => a.index - b.index),
          extra || []
        ),
        assignObject(this.container.get(servicesToken), { context })
      )(value)
    }
  }
}

export class RenderService {
  private sorted: HookMeta[] = []

  constructor(@InjectContainer() container: ContainerInstance) {
    this.sorted = container
      .getMany(renderToken)
      .sort((a, b) => a.index - b.index)
  }

  process(value: any, context: Record<string, unknown>) {
    return (extra: HookMeta[]) => {
      pipeline(
        assignArray(this.sorted, extra || []),
        assignObject({ context })
      )(value)
    }
  }
}
