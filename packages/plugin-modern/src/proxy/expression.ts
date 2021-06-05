import { assignArray, ProxyMatcher, ProxyHandler } from '@json2render/core'

const expression: ProxyMatcher = (value: any, { functional }) => {
  const func: ProxyHandler = (context) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)
      const contextKeys = Object.keys(context)
      const functionals = functional.getMap()
      const functionalKeys = Object.keys(functionals)

      return new Function(
        ...assignArray(contextKeys, functionalKeys, [`return ${expr}`])
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

  if (typeof value === 'string' && value.indexOf('$:') === 0) {
    return func
  }
}

export default expression
