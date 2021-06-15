import { assignObject } from '@json2render/core'
import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => {
  return (field, next) => {
    if (field.value === undefined) {
      next(field)
      return
    }

    if (typeof field.value !== 'string' || field.value.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: field.value,
    }

    const updateDefine = {
      $type: 'method',
      $context: field.value,
      $result: 'arguments[0].target.value',
    }

    field.props = assignObject(field.props || {}, {
      value: valueDefine,
      onInput: updateDefine,
    })

    next(field)
  }
}
