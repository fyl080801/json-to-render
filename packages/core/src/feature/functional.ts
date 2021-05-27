import { createToken, InjectMany } from '../utils'
import { FunctionalBase } from '../types'

export const functionalToken = createToken<FunctionalBase>('functional')

export class FunctionalService {
  constructor(
    @InjectMany(functionalToken) private readonly functionals: FunctionalBase[]
  ) {}

  getMap() {
    return this.functionals.reduce((pre, cur) => {
      pre[cur.name] = (...args: unknown[]) => cur.invoke(...args)
      return pre
    }, {} as { [key: string]: (...args: unknown[]) => unknown })
  }
}
