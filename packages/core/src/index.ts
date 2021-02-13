export {
  getProperty,
  getProxyDefine,
  isAllowedProxy,
  isRejectProxy,
  isProxy,
} from './proxy/utils'

export { createProxyInjector } from './proxy'

export { createServiceBuilder } from './service'

export { createService as createFunctionalService } from './functional'

export * from './types'
