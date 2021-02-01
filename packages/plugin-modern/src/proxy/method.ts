import { assignArray, deepSet } from '@json-to-render/utils'

const method: ProxyHandlerResolver<FunctionTransform> = value => {
  const execute = (context: any) => {
    return (...args: any) => {
      try {
        const expr = value.slice(value.indexOf(':') + 1, value.length)
        const expProp = value.slice(1, value.indexOf(':'))
        const contextkeys = Object.keys(context)
        const inputs = assignArray(
          contextkeys.map(key => context[key]),
          [args]
        )

        const result = new Function(
          ...assignArray(contextkeys, ['arguments', `return ${expr}`])
        )(...inputs)

        if (expProp && expProp.length > 0) {
          const keyExpr = '`' + expProp + '`'
          const expKey = new Function(
            ...assignArray(contextkeys, ['arguments', `return ${keyExpr}`])
          )(...inputs)
          deepSet(context, expKey, result)
        } else {
          return result
        }
      } catch {
        //
      }
    }
  }

  return typeof value === 'string' && /^(@[\s\S]*:)/g.test(value)
    ? execute
    : undefined
}

export default method
