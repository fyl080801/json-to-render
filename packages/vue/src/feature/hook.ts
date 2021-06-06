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

  private get hooks() {
    return this.container
      .getMany(prerenderToken)
      .sort((a, b) => a.index - b.index)
  }

  process(value: any, context: Record<string, unknown>) {
    return (extra: HookMeta[]) => {
      pipeline(
        assignArray(this.hooks, extra || []),
        assignObject(this.container.get(servicesToken), { context })
      )(value)
    }
  }
}

export class RenderService {
  private sorted: HookMeta[] = []

  constructor(
    @InjectContainer() private readonly container: ContainerInstance
  ) {}

  private get hooks() {
    return this.container
      .getMany(prerenderToken)
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
