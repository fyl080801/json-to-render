import {
  createServiceContainer,
  functionalToken,
  proxyToken,
  ProxyMatcher,
  datasourceToken,
  DatasourceBuilder,
  Hook,
  Functional,
} from '@json2render/core'
import { Setup } from '../types'
import { prerenderToken, renderToken } from '../feature/hook'

export const containerBuilder = createServiceContainer()

export const createSetupCollection = (container: any) => {
  const proxySetup = (value: ProxyMatcher) => {
    container.addValue(proxyToken, value)
  }

  const functionalSetup = (name: string, value: Functional) => {
    container.addValue(functionalToken, {
      name,
      invoke: value,
    })
  }

  const datasourceSetup = (name: string, value: DatasourceBuilder) => {
    container.addValue(datasourceToken, {
      type: name,
      build: value,
    })
  }

  const prerenderSetup = (value: Hook, index?: number) => {
    container.addValue(prerenderToken, { index: index || 0, invoke: value })
  }

  const renderSetup = (value: Hook, index?: number) => {
    container.addValue(renderToken, {
      index: index || 0,
      invoke: value,
    })
  }

  return {
    proxy: proxySetup,
    functional: functionalSetup,
    datasource: datasourceSetup,
    prerender: prerenderSetup,
    render: renderSetup,
  }
}

export const globalSetup: Setup = (handler) => {
  handler(createSetupCollection(containerBuilder))
}
