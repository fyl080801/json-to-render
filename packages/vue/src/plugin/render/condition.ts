const hook: FunctionHook = () => {
  return (field, next) => {
    const defined = Reflect.getOwnPropertyDescriptor(field, 'condition')

    if (defined === undefined) {
      next(field)
      return
    }

    field.component = field.condition ? field.component : null

    next(field)
  }
}

export default hook
