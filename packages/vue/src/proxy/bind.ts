import { get } from 'lodash-es'
import { BindTransform, ProxyHandlerFactory } from '@/types'

const bind: ProxyHandlerFactory<BindTransform> = (value, context) => {
  return typeof value === 'object' &&
    value &&
    value.$type === 'bind' &&
    value.$source
    ? () => {
        return get(context, value.$source)
      }
    : null
}

export default bind
