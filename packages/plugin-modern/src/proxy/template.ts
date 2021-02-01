import { assignArray } from '@json-to-render/utils'

const template: ProxyHandlerResolver<BindTransform> = value => {
  const func = (context: any) => {
    try {
      const expr = value.slice(value.indexOf(':') + 1, value.length)
      const contextKeys = Object.keys(context)
      const exprStr = '`' + expr + '`'

      return new Function(...assignArray(contextKeys, [`return ${exprStr}`]))(
        ...contextKeys.map(key => context[key])
      )
    } catch {
      //
    }
  }

  return typeof value === 'string' && /^([#]:)/g.test(value) ? func : undefined
}

export default template
