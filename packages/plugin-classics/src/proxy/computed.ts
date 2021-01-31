import { assignArray } from '@json-to-render/utils'

const computed: ProxyHandlerResolver<BindTransform> = value => {
  const func = (context: any) => {
    try {
      const contextKeys = Object.keys(context)

      return new Function(
        ...assignArray(contextKeys, [`return ${value.$result}`])
      )(...contextKeys.map(key => context[key]))
    } catch {
      //
    }
  }

  return typeof value === 'object' &&
    value &&
    value.$type === 'computed' &&
    value.$result
    ? func
    : undefined
}

export default computed
