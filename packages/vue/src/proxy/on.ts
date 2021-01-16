import { FunctionTransform, ProxyHandlerFactory } from '@/types'

const on: ProxyHandlerFactory<FunctionTransform> = value => {
  return typeof value === 'object' && value && value.$type === 'on'
    ? () => {
        return () => {
          new Function(`${value.$result}`)()
        }
      }
    : null
}

export default on
