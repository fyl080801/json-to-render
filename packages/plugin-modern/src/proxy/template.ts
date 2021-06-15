import { assignArray, ProxyHandler, ProxyMatcher } from '@json2render/core'

const template: ProxyMatcher = (value: any, { functional }) => {
  const func: ProxyHandler = (context) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)
      const contextKeys = Object.keys(context)
      const functionals = functional.getMap()
      const functionalKeys = Object.keys(functionals)
      const exprStr = '`' + expr + '`'

      return new Function(
        ...assignArray(contextKeys, functionalKeys, [`return ${exprStr}`])
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

  if (typeof value === 'string' && /^([#]:)/g.test(value)) {
    return func
  }
}

export default template
