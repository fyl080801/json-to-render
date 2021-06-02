import {
  assignArray,
  assignObject,
  createToken,
  FunctionHook,
  Inject,
  pipeline,
  servicesToken,
} from '@json2render/core'
import { HookService } from '../types'

export const prerenderToken = createToken<FunctionHook>('prerender')

export const prerenderServiceToken =
  createToken<FunctionHook>('prerenderService')

export const renderToken = createToken<FunctionHook>('render')

export const renderServiceToken = createToken<FunctionHook>('renderService')

export class PrerenderService {
  constructor(
    @Inject(prerenderToken) private readonly hooks: FunctionHook[],
    @Inject(servicesToken) private readonly services: { [key: string]: unknown }
  ) {}

  process(value: any, context: Record<string, unknown>) {
    return (extra: FunctionHook[]) => {
      pipeline(
        assignArray(
          this.hooks.sort((a, b) => a.index - b.index),
          extra || []
        ),
        assignObject(this.services, { context })
      )(value)
    }
  }
}

export class RenderService {
  private sorted: FunctionHook[] = []

  constructor(
    @Inject(renderToken) private readonly hooks: FunctionHook[],
    @Inject(servicesToken) private readonly services: { [key: string]: unknown }
  ) {
    this.sorted = this.hooks.sort((a, b) => a.index - b.index)
  }

  process(value: any, extra: FunctionHook[]) {
    pipeline(assignArray(this.sorted, extra || []), {})(value)
  }
}
