import { assignArray, deepSet } from '@json2render/utils'
import {
  getProxyDefine,
  JsonProxyHandler,
  ProxyHandlerResolver,
} from '@json2render/core'
import { MethodTransform } from '../types'

const method: ProxyHandlerResolver<MethodTransform> = (
  value: any,
  { injectProxy, functional }: any
) => {
  const execute: JsonProxyHandler = (context) => {
    return (...args: any) => {
      try {
        const functionals = functional()

        const params = assignArray(Object.keys(context), functionals.names, [
          'arguments',
          `return ${value.$result}`,
        ])

        const inputs = assignArray(
          Object.keys(context).map((key) => context[key]),
          functionals.executers,
          [args]
        )

        const result = new Function(...params)(...inputs)

        const define = getProxyDefine(value)

        if (define.$context !== undefined) {
          const rejected = injectProxy({ $context: define.$context }, context)
          deepSet(context, rejected.$context, result)
        } else {
          return result
        }
      } catch {
        //
      }
    }
  }

  return (
    typeof value === 'object' && value && value.$type === 'method' && execute
  )
}

export default method
