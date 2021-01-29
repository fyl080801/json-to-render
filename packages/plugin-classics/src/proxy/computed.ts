const computed: ProxyHandlerResolver<BindTransform> = value => {
  const func = (context: any) => {
    try {
      return new Function(
        ...[...Object.keys(context), `return ${value.$result}`]
      )(...Object.keys(context).map(key => context[key]))
    } catch {
      //
    }
  }

  return typeof value === 'object' &&
    value &&
    value.$type === 'computed' &&
    value.$result
    ? func
    : undefined
}

export default computed
