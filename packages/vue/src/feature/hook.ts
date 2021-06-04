import {
  assignArray,
  assignObject,
  createToken,
  FunctionHook,
  Inject,
  pipeline,
  servicesToken,
} from '@json2render/core'
import { ContainerInstance } from 'typedi'

export const prerenderToken = createToken<FunctionHook>('prerender')

export const prerenderServiceToken =
  createToken<FunctionHook>('prerenderService')

export const renderToken = createToken<FunctionHook>('render')

export const renderServiceToken = createToken<FunctionHook>('renderService')

export class PrerenderService {
  constructor(
    @Inject(prerenderToken) private readonly container: ContainerInstance
  ) {}

  process(value: any, context: Record<string, unknown>) {
    return (extra: FunctionHook[]) => {
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
  private sorted: FunctionHook[] = []

  constructor(@Inject(renderToken) container: ContainerInstance) {
    this.sorted = container
      .getMany(renderToken)
      .sort((a, b) => a.index - b.index)
  }

  process(value: any, context: Record<string, unknown>) {
    return (extra: FunctionHook[]) => {
      pipeline(
        assignArray(this.sorted, extra || []),
        assignObject({ context })
      )(value)
    }
  }
}
