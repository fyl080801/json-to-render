import {
  createServiceContainer,
  functionalToken,
  proxyToken,
  ProxyMatcher,
  FunctionalMeta,
  datasourceToken,
  DatasourceMeta,
  FunctionHook,
  proxyServiceToken,
} from '@json2render/core'
import { Setup } from '../types'
import { prerenderToken, renderToken } from '../feature/hook'

export const containerBuilder = createServiceContainer({
  proxy: proxyServiceToken,
})

export const proxySetup = (type: new () => ProxyMatcher) => {
  containerBuilder.addService(proxyToken, type)
}

export const functionalSetup = (type: new () => FunctionalMeta) => {
  containerBuilder.addService(functionalToken, type)
}

export const datasourceSetup = (type: new () => DatasourceMeta) => {
  containerBuilder.addService(datasourceToken, type)
}

export const prerenderSetup = (type: new () => FunctionHook) => {
  containerBuilder.addService(prerenderToken, type)
}

export const renderSetup = (type: new () => FunctionHook) => {
  containerBuilder.addService(renderToken, type)
}

export const globalSetup: Setup = (handler) => {
  handler({
    proxy: proxySetup,
    functional: functionalSetup,
    datasource: datasourceSetup,
    prerender: prerenderSetup,
    render: renderSetup,
  })
}
