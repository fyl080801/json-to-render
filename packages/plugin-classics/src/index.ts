import value from './prerender/value'
import checked from './prerender/checked'
import events from './prerender/events'

import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

export default ({ prerender, render, proxy }: any) => {
  prerender(value)
  prerender(checked)
  prerender(events)

  render(text)
  render(condition)

  proxy(computed)
  proxy(method)
}
