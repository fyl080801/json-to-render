import { ConditionTransform, ProxyHandlerFactory } from '../../../types'

const bind: ProxyHandlerFactory<ConditionTransform> = value => {
  return typeof value === 'object' &&
    value &&
    value.$type === 'condition' &&
    value.$condition !== undefined
    ? () => {
        return value.$condition ? value.$value : ''
      }
    : null
}

export default bind
