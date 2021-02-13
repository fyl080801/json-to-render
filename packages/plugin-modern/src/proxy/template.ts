import { assignArray } from '@json2render/utils'
import { ProxyHandlerResolver } from '@json2render/core'

const template: ProxyHandlerResolver<string> = (value, { functional }) => {
  const func = (context: any) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)
      const contextKeys = Object.keys(context)
      const functionals = functional()
      const exprStr = '`' + expr + '`'

      return new Function(
        ...assignArray(contextKeys, functionals.names, [`return ${exprStr}`])
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

  return typeof value === 'string' && /^([#]:)/g.test(value) ? func : undefined
}

export default template
