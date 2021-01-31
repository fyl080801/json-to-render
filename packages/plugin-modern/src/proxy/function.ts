import { assignArray, deepSet } from '@json-to-render/utils'

const func: ProxyHandlerResolver<FunctionTransform> = value => {
  const execute = (context: any) => {
    return (...args: any) => {
      try {
        const expr = value.slice(value.indexOf(':') + 1, value.length)
        const expKey = value.slice(1, value.indexOf(':'))
        const contextkeys = Object.keys(context)
        const params = assignArray(contextkeys, ['arguments', `return ${expr}`])
        const inputs = assignArray(
          contextkeys.map(key => context[key]),
          [args]
        )
        const result = new Function(...params)(...inputs)

        if (expKey !== undefined && expKey.length > 0) {
          deepSet(context, expKey, result)
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

export default func
