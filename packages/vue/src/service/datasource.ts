import { assignObject, cloneDeep } from '@json-to-render/utils'

type DatasourceProviders = { [key: string]: Function }

export const createDatasourceSetup = (store: DatasourceProviders) => {
  return (type: string, provider: any) => {
    store[type] = provider
  }
}

export const createDatasourceService = (inits?: DatasourceProviders) => {
  const store = assignObject(inits)

  const resolve = (name: string, datasource: any, services: any) => {
    //
    const service = store[datasource.type]

    if (!service) {
      return null
    }

    const { injectProxy, context } = services

    const getProps = () => injectProxy(cloneDeep(datasource), context)

    const update = (value: any) => {
      if (context[name] === undefined) {
        context[name] = assignObject(value)
      } else {
        Object.keys(value).forEach(key => {
          context[name][key] = value[key]
        })
      }
    }

    service(getProps, update)
  }

  return {
    store,
    setup: createDatasourceSetup(store),
    resolve
  }
}
