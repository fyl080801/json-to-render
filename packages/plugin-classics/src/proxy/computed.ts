import { assignArray } from '@json2render/utils'
import { ProxyHandlerResolver } from '@json2render/core'
import { ComputedTransform } from '../types'

const computed: ProxyHandlerResolver<ComputedTransform> = (
  value,
  { functional }
) => {
  const func = (context: any) => {
    try {
      const contextKeys = Object.keys(context)

      const functionals = functional()

      return new Function(
        ...assignArray(contextKeys, functionals.names, [
          `return ${value.$result}`,
        ])
      )(
        ...assignArray(
          contextKeys.map((key) => context[key]),
          functionals.executers
        )
      )
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
