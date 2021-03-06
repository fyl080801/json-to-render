import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => (field, next) => {
  const textProp = Reflect.getOwnPropertyDescriptor(field, 'text')

  if (!textProp) {
    next(field)
    return
  }

  field.props = field.props || {}
  field.props.innerText = textProp.value

  next(field)
}
