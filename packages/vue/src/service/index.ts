// import { createHookService } from './hooks'
// import { createDatasourceService } from './datasource'
import {
  functionalServiceProvider,
  proxyServiceProvider,
} from '@json2render/core'
import { SetupInitialization } from '../types'

// export const prerender = createHookService()

// export const render = createHookService()

// export const datasource = createDatasourceService()

export const globalServiceBuilder: SetupInitialization = (setup) => {
  setup({
    proxy: proxyServiceProvider.setup,
    functional: functionalServiceProvider.setup,
  })
}

// export const functional = createFunctionalService()

// export const globalServiceBuilder = (): ((s) => SetupInitialization) => {
//   return (builder) => {
//     builder(services)
//   }
// }

// (services: ServiceSetups) => (builder: (inputs: ServiceSetups) => void) => void

//  createServiceBuilder({
//   proxy,
//   // proxy: <ProxyMatcher>() => proxyServiceProvider.setup,
//   // prerender: prerender.setup,
//   // render: render.setup,
//   // datasource: datasource.setup,
//   // functional: functional.setup,
// })
