import { assignArray, ProxyHandler, ProxyMatcher } from '@json2render/core'

const computed: ProxyMatcher = (value: any, { functional }) => {
  const func: ProxyHandler = (context) => {
    try {
      const contextKeys = Object.keys(context)
      const functionals = functional.getMap()
      const functionalKeys = Object.keys(functionals)

      return new Function(
        ...assignArray(contextKeys, functionalKeys, [`return ${value.$result}`])
      )(
        ...assignArray(
          contextKeys.map((key) => context[key]),
          functionalKeys.map((key) => functionals[key])
        )
      )
    } catch {
      //
    }
  }

  if (
    typeof value === 'object' &&
    value &&
    value.$type === 'computed' &&
    value.$result
  ) {
    return func
  }
}

export default computed
