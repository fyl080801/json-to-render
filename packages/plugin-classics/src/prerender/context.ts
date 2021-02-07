import { assignObject, FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => {
  return (field, next) => {
    if (field.context == undefined) {
      next(field)
      return
    }

    if (typeof field.context !== 'string' || field.context.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: field.context,
    }

    const updateDefine = {
      $type: 'method',
      $context: field.context,
      $result:
        'arguments[0].target ? (["checkbox", "radio"].indexOf(arguments[0].target.type) >= 0 ? arguments[0].target.checked : arguments[0].target.value) : arguments[0]',
    }

    field.props = assignObject(field.props || {}, {
      value: valueDefine,
      modelValue: valueDefine,
      'onUpdate:value': updateDefine,
      'onUpdate:modelValue': updateDefine,
      onChange: updateDefine,
      onInput: updateDefine,
    })

    next(field)
  }
}

export default hook
