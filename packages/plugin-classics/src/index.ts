import model from './prerender/model'
import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

import fetchDatasource from './datasource/fetch'

export default ({ prerender, render, proxy, datasource }: any) => {
  prerender(model)

  render(text)
  render(condition)

  proxy(computed)
  proxy(method)

  datasource('fetch', fetchDatasource)
}
