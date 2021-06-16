import { createToken, ContainerInstance } from '../utils'
import { FunctionalMeta } from '../types'

export const functionalToken = createToken<FunctionalMeta>('functional')

export const functionalServiceToken =
  createToken<FunctionalService>('functionalService')

export class FunctionalService {
  private functionals: FunctionalMeta[] = []

  constructor(container: ContainerInstance) {
    this.functionals = container.getMany(functionalToken)
  }

  getMap() {
    return this.functionals.reduce((pre, cur) => {
      pre[cur.name] = (...args: unknown[]) => cur.invoke(...args)
      return pre
    }, {} as { [key: string]: (...args: unknown[]) => unknown })
  }
}
