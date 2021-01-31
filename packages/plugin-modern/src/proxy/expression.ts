import { assignArray } from '@json-to-render/utils'

const expression: ProxyHandlerResolver<BindTransform> = value => {
  const func = (context: any) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)

      const contextKeys = Object.keys(context)

      return new Function(...assignArray(contextKeys, [`return ${expr}`]))(
        ...contextKeys.map(key => context[key])
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
