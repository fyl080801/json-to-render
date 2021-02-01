import { getProxyDefine } from '@json-to-render/core'

const hook: FunctionHook = () => {
  return (field, next) => {
    const defined = getProxyDefine(field.condition)

    if (defined === undefined) {
      next(field)
      return
    }

    field.component = field.condition ? field.component : null

    next(field)
  }
}

export default hook