import { assignArray } from '@json2render/utils'
import { ProxyHandlerResolver } from '@json2render/core'

const expression: ProxyHandlerResolver<string> = (value, { functional }) => {
  const func = (context: any) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)
      const functionals = functional()
      const contextKeys = Object.keys(context)

      return new Function(
        ...assignArray(contextKeys, functionals.names, [`return ${expr}`])
      )(
        ...assignArray(
          contextKeys.map((key) => context[key]),
          functionals.executers
        )
      )
    } catch {
      //
    }
  }

  return typeof value === 'string' && value.indexOf('$:') === 0
    ? func
    : undefined
}

export default expression
