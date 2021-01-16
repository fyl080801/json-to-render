import { set } from 'lodash-es'
import { ProxyHandlerFactory, UpdateTransform } from '@jrender/types'

const update: ProxyHandlerFactory<UpdateTransform> = (value, context) => {
  return context &&
    typeof value === 'object' &&
    value &&
    value.$type === 'update'
    ? () => {
        return (...args: any) => {
          set(
            context,
            value.$model,
            new Function('arguments', `return ${value.$result}`)(args)
          )
        }
      }
    : null
}

export default update
