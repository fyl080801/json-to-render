import { assignArray, deepSet } from '@json2render/core'
import { getProxyDefine, ProxyMatcher, ProxyHandler } from '@json2render/core'

const method: ProxyMatcher = (value: any, { functional, proxy }) => {
  const execute: ProxyHandler = (context) => {
    return (...args: any) => {
      try {
        const functionals = functional.getMap()

        const functionalKeys = Object.keys(functionals)

        const params = assignArray(Object.keys(context), functionalKeys, [
          'arguments',
          `return ${value.$result}`,
        ])

        const inputs = assignArray(
          Object.keys(context).map((key) => context[key]),
          functionalKeys.map((key) => functionals[key]),
          [args]
        )

        const result = new Function(...params)(...inputs)

        const define = getProxyDefine(value)

        if (define.$context !== undefined) {
          const rejected = proxy.inject({ $context: define.$context }, context)
          deepSet(context, rejected.$context, result)
        } else {
          return result
        }
      } catch {
        //
      }
    }
  }

  if (typeof value === 'object' && value && value.$type === 'method') {
    return execute
  }
}

export default method
