import { deepSet } from '@json2render/utils'
import {
  getProxyDefine,
  JProxyHandler,
  ProxyHandlerResolver,
} from '@json2render/core'
import { MethodTransform } from '../types'

const method: ProxyHandlerResolver<MethodTransform> = (value) => {
  const execute: JProxyHandler | undefined = (context, { injectProxy }) => {
    return (...args: any) => {
      try {
        const params = [
          ...Object.keys(context),
          'arguments',
          `return ${value.$result}`,
        ]
        const inputs = [
          ...Object.keys(context).map((key) => context[key]),
          args,
        ]
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
