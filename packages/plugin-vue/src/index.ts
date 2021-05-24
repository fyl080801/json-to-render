import fetchDatasource from './datasource/fetch'
import model from './prerender/model'
import checked from './prerender/checked'
import events from './prerender/events'
import value from './prerender/value'
import text from './render/text'

export default ({ datasource, prerender, render }: any) => {
  datasource('fetch', fetchDatasource)

  prerender(model)
  prerender(value)
  prerender(checked)
  prerender(events)

  render(text)
}
