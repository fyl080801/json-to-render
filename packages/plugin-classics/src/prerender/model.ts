import { getProxyDefine } from '@json-to-render/core'
import { assignObject, FunctionHook } from '@json-to-render/utils'

const hook: FunctionHook = () => {
  return (field, next) => {
    if (field.model == undefined) {
      next(field)
      return
    }

    const modelDefine = getProxyDefine(field.model)

    if (typeof modelDefine !== 'string' || modelDefine.length <= 0) {
      next(field)
      return
    }

    const valueDefine = {
      $type: 'computed',
      $result: modelDefine
    }

    const updateDefine = {
      $type: 'method',
      $context: modelDefine,
      $result: 'arguments[0].target ? arguments[0].target.value : arguments[0]'
    }

    field.props = assignObject(field.props || {}, {
      value: valueDefine,
      modelValue: valueDefine,
      onChange: updateDefine,
      'onUpdate:modelValue': updateDefine
    })
    // delete field.model

    next(field)
  }
}

export default hook
