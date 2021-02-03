import { assignObject, cloneDeep } from '@json-to-render/utils'
import { DatasourceProviders } from '../types'

export const createDatasourceSetup = (store: DatasourceProviders) => {
  return (type: string, provider: any) => {
    store[type] = provider
  }
}

export const createDatasourceService = (inits?: DatasourceProviders) => {
  const store = assignObject(inits)

  const resolve = (datasource: any, services: any) => {
    const service = store[datasource.type]

    if (!service) {
      return null
    }

    const { injectProxy, context } = services

    const define = () => injectProxy(cloneDeep(datasource), context)

    return service(assignObject({ define }, services))
  }

  return {
    store,
    setup: createDatasourceSetup(store),
    resolve
  }
}
