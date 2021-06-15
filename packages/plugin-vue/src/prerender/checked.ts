import { assignObject } from '@json2render/core'
import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => {
  return (field, next) => {
    if (field.checked == undefined) {
      next(field)
      return
    }

    if (typeof field.checked !== 'string' || field.checked.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: field.checked,
    }

    const updateDefine = {
      $type: 'method',
      $context: field.checked,
      $result: 'arguments[0].target.checked',
    }

    field.props = assignObject(field.props || {}, {
      value: valueDefine,
      onChange: updateDefine,
    })

    next(field)
  }
}
