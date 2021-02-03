import { assignArray } from '@json-to-render/utils'
import { ProxyHandlerResolver } from '@json-to-render/core'

const template: ProxyHandlerResolver<string> = value => {
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
