import { getProxyDefine, HookInvoker } from '@json2render/core'

export default (): HookInvoker => (field, next) => {
  const defined = getProxyDefine(field.condition)

  if (defined === undefined) {
    next(field)
    return
  }

  field.component = field.condition ? field.component : null

  next(field)
}
