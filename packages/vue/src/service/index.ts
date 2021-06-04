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

export const proxySetup = (type: ProxyMatcher) => {
  containerBuilder.addValue(proxyToken, type)
}

export const functionalSetup = (type: FunctionalMeta) => {
  containerBuilder.addValue(functionalToken, type)
}

export const datasourceSetup = (type: DatasourceMeta) => {
  containerBuilder.addValue(datasourceToken, type)
}

export const prerenderSetup = (type: FunctionHook) => {
  containerBuilder.addValue(prerenderToken, type)
}

export const renderSetup = (type: FunctionHook) => {
  containerBuilder.addValue(renderToken, type)
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
