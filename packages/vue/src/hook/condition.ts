import { isArray } from 'lodash-es'
import { FunctionHook } from '../../../types'

const hook: FunctionHook = (field, next) => {
  if (!field.children || !isArray(field.children)) {
    next(field)
    return
  }

  field.children.forEach((child: any, index: number) => {
    if (!child) {
      return
    }
    const conditionProp = Reflect.getOwnPropertyDescriptor(child, 'condition')
    if (conditionProp && conditionProp.value !== undefined) {
      // console.log(index, conditionProp)
      // field.children[index] = {
      //   $type: 'condition',
      //   $condition: conditionProp.value,
      //   $value: child
      // }
    }
  })

  next(field)
}

export default hook
