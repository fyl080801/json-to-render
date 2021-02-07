import { getProxyDefine } from '@json2render/core'
import { assignObject, FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => {
  return (field, next) => {
    if (field.context == undefined) {
      next(field)
      return
    }

    const modelDefine = getProxyDefine(field.context)

    if (typeof modelDefine !== 'string' || modelDefine.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: modelDefine,
    }

    const updateDefine = {
      $type: 'method',
      $context: modelDefine,
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
