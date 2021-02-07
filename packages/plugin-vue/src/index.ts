import fetchDatasource from './datasource/fetch'
import model from './prerender/model'

export default ({ datasource, prerender }: any) => {
  datasource('fetch', fetchDatasource)

  prerender(model)
}
