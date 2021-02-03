import { assignArray } from '@json2render/utils'
import { ProxyHandlerResolver } from '@json2render/core'
import { ComputedTransform } from '../types'

const computed: ProxyHandlerResolver<ComputedTransform> = (value) => {
  const func = (context: any) => {
    try {
      const contextKeys = Object.keys(context)

      return new Function(
        ...assignArray(contextKeys, [`return ${value.$result}`])
      )(...contextKeys.map((key) => context[key]))
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
