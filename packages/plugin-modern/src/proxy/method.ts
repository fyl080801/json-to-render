import {
  assignArray,
  deepSet,
  ProxyMatcher,
  ProxyHandler,
} from '@json2render/core'

const method: ProxyMatcher = (value: any, { functional }) => {
  const execute: ProxyHandler = (context) => {
    return (...args: any) => {
      try {
        const expr = value.slice(value.indexOf(':') + 1, value.length)
        const expProp = value.slice(1, value.indexOf(':'))
        const contextkeys = Object.keys(context)
        const functionals = functional.getMap()
        const functionalKeys = Object.keys(functionals)
        const inputs = assignArray(
          contextkeys.map((key) => context[key]),
          functionalKeys.map((key) => functionals[key]),
          [args]
        )

        const result = new Function(
          ...assignArray(contextkeys, functionalKeys, [
            'arguments',
            `return ${expr}`,
          ])
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
        // console.log(e)
      }
    }
  }

  if (typeof value === 'string' && /^(@[\s\S]*:)/g.test(value)) {
    return execute
  }
}

export default method
