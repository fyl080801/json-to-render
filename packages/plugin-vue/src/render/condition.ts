import { getProxyDefine } from '@json2render/core'
import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => (field, next) => {
  const defined = getProxyDefine(field.condition)

  if (defined === undefined) {
    next(field)
    return
  }

  field.component = field.condition ? field.component : null

  next(field)
}
