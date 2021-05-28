// import { createHookService } from './hooks'
// import { createDatasourceService } from './datasource'
import {
  createServiceContainer,
  functionalToken,
  proxyToken,
  ProxyMatcher,
  FunctionalMeta,
  datasourceToken,
  DatasourceMeta,
} from '@json2render/core'
import { ServiceBuilder } from '../types'
// import {
//   createServiceBuilder,
//   createFunctionalService,
// } from '@json2render/core'

// export const proxy = createProxyService()

// export const prerender = createHookService()

// export const render = createHookService()

// export const datasource = createDatasourceService()

// export const functional = createFunctionalService()

// export const globalServiceBuilder = createServiceBuilder({
//   proxy: proxy.setup,
//   prerender: prerender.setup,
//   render: render.setup,
//   datasource: datasource.setup,
//   functional: functional.setup,
// })

export const containerBuilder = createServiceContainer()

export const proxySetup = (type: new () => ProxyMatcher) => {
  containerBuilder.addService(proxyToken, type)
}

export const functionalSetup = (type: new () => FunctionalMeta) => {
  containerBuilder.addService(functionalToken, type)
}

export const datasourceSetup = (type: new () => DatasourceMeta) => {
  containerBuilder.addService(datasourceToken, type)
}

export const globalServiceBuilder = (
  setup: (setups: ServiceBuilder) => void
) => {
  setup({
    proxy: proxySetup,
    functional: functionalSetup,
    datasource: datasourceSetup,
  })
}

// containerBuilder.addService(ProxyService)
// containerBuilder.addService(FunctionalService)
