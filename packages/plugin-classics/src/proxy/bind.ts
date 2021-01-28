const bind: ProxyHandlerResolver<BindTransform> = value => {
  return typeof value === 'object' &&
    value &&
    value.$type === 'bind' &&
    value.$source
    ? context => {
        try {
          return new Function(
            ...[...Object.keys(context), `return ${value.$source}`]
          )(...Object.keys(context).map(key => context[key]))
        } catch {
          //
        }
      }
    : undefined
}

export default bind
