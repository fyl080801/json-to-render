import { HookInvoker } from '@json2render/core'

export default (): HookInvoker => (field, next) => {
  if (!field.child) {
    next(field)
    return
  }

  const childProps = field.child

  console.log(childProps)

  next(field)
}
