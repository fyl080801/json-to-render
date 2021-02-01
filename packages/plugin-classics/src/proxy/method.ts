import { deepSet } from '@json-to-render/utils'
import { getProxyDefine } from '@json-to-render/core'

const method: ProxyHandlerResolver<FunctionTransform> = value => {
  const execute = (context: any, { injectProxy }: any) => {
    return (...args: any) => {
      try {
        const params = [
          ...Object.keys(context),
          'arguments',
          `return ${value.$result}`
        ]
        const inputs = [...Object.keys(context).map(key => context[key]), args]
        const result = new Function(...params)(...inputs)

        const define = getProxyDefine(value)

        if (define.$context !== undefined) {
          const rejected = injectProxy({ $context: define.$context }, context)
          deepSet(context, rejected.$context, result)
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
