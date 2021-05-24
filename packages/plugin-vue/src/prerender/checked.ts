import { assignObject, FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => {
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

export default hook
