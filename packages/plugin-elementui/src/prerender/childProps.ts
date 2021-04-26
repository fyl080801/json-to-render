import { FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => (field, next) => {
  if (!field.child) {
    next(field)
    return
  }

  const childProps = field.child

  console.log(childProps)

  next(field)
}

export default hook
