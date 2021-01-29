import { deepSet } from '@json-to-render/utils'

const method: ProxyHandlerResolver<FunctionTransform> = value => {
  const execute = (context: any) => {
    return (...args: any) => {
      try {
        const params = [
          ...Object.keys(context),
          'arguments',
          `return ${value.$result}`
        ]
        const inputs = [...Object.keys(context).map(key => context[key]), args]
        const result = new Function(...params)(...inputs)

        if (value.$model) {
          deepSet(context, value.$model, result)
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
