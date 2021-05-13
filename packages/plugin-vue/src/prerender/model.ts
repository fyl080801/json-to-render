import { assignObject, FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => {
  return (field, next) => {
    if (field.model === undefined) {
      next(field)
      return
    }

    if (typeof field.model !== 'string' || field.model.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: field.model,
    }

    const updateDefine = {
      $type: 'method',
      $context: field.model,
      $result: 'arguments[0]',
    }

    field.props = assignObject(field.props || {}, {
      modelValue: valueDefine,
      'onUpdate:modelValue': updateDefine,
    })

    next(field)
  }
}

export default hook
