const bind: ProxyHandlerFactory<BindTransform> = (value, context) => {
  return typeof value === 'object' &&
    value &&
    value.$type === 'bind' &&
    value.$source
    ? () => {
        try {
          return new Function(
            ...[...Object.keys(context), `return ${value.$source}`]
          )(...Object.keys(context).map(key => context[key]))
        } catch {
          //
        }
      }
    : null
}

export default bind
