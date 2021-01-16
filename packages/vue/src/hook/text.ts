import { FunctionHook } from '../../../types'

const hook: FunctionHook = (field, next) => {
  const textProp = Reflect.getOwnPropertyDescriptor(field, 'text')

  if (!textProp) {
    next(field)
    return
  }

  field.props = field.props || {}
  field.props.innerText = textProp.value

  next(field)
}

export default hook
