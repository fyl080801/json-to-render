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

        if (define.$model !== undefined) {
          const rejected = injectProxy({ $model: define.$model }, context)
          deepSet(context, rejected.$model, result)
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
