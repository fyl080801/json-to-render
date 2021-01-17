import { FunctionHook } from '@jrender/types/index'

const hook: FunctionHook = (field, next) => {
  const defined = Reflect.getOwnPropertyDescriptor(field, 'condition')

  if (defined === undefined) {
    next(field)
    return
  }

  field.component = field.condition ? field.component : null

  next(field)
}

export default hook
