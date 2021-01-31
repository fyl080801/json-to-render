import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

import fetchDatasource from './datasource/fetch'

export default ({ render, proxy, datasource }: any) => {
  render(text)
  render(condition)

  proxy(computed)
  proxy(method)

  datasource('fetch', fetchDatasource)
}
