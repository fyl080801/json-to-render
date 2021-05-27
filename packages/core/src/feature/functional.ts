import { createToken, InjectMany } from '../utils'
import { FunctionalMeta } from '../types'

export const functionalToken = createToken<FunctionalMeta>('functional')

export class FunctionalService {
  constructor(
    @InjectMany(functionalToken) private readonly functionals: FunctionalMeta[]
  ) {}

  getMap() {
    return this.functionals.reduce((pre, cur) => {
      pre[cur.name] = (...args: unknown[]) => cur.invoke(...args)
      return pre
    }, {} as { [key: string]: (...args: unknown[]) => unknown })
  }
}
