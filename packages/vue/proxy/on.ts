import { FunctionTransform, ProxyHandlerFactory } from '@jrender/types/index'
import { deepSet } from '@jrender/core/utils/helpers'

const on: ProxyHandlerFactory<FunctionTransform> = (value, context) => {
  return typeof value === 'object' && value && value.$type === 'on'
    ? () => {
        return (...args: any) => {
          try {
            const params = [
              ...Object.keys(context),
              'arguments',
              `return ${value.$result}`
            ]
            const inputs = [
              ...Object.keys(context).map(key => context[key]),
              args
            ]
            const result = new Function(...params)(...inputs)

            if (value.$model) {
              deepSet(context, value.$model, result)
            }
          } catch {
            //
          }
        }
      }
    : null
}

export default on
