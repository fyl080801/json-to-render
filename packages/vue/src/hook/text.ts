import { FunctionHook } from '../../../types'

const hook: FunctionHook = (field, next) => {
  const textProp = Reflect.getOwnPropertyDescriptor(field, 'text')

  if (!textProp) {
    next(field)
    return
  }

  field.props = field.props || {}
  field.props.innerText = textProp.value

  // if (!field.text) {
  //   next(field)
  //   return
  // }

  // field.props = field.props || {}
  // field.props.innerText = field.text

  next(field)
}

export default hook
