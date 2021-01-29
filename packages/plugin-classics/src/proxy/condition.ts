const condition: ProxyHandlerResolver<BindTransform> = value => {
  const func = () => {
    const { $condition, $result } = value

    if ($condition === undefined || !!$condition) {
      return $result
    } else {
      return null
    }
  }

  return typeof value === 'object' && value && value.$type === 'condition'
    ? func
    : undefined
}

export default condition
