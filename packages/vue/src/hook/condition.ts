import { FunctionHook } from '../../../types'

const hook: FunctionHook = (field, next) => {
  if (!field.children) {
    next(field)
    return
  }
  debugger
  const childrenProp = Reflect.getOwnPropertyDescriptor(field, 'children')

  childrenProp?.value.forEach((child: any, index: number) => {
    if (!child) {
      return
    }
    const conditionProp = Reflect.getOwnPropertyDescriptor(child, 'condition')
    if (conditionProp && conditionProp.value !== undefined) {
      debugger
      field.children[index] = {
        $type: 'condition',
        $condition: conditionProp.value,
        $value: child
      }
    }
  })

  next(field)
}

export default hook
