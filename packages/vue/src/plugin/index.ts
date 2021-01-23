import condition from './render/condition'
import text from './render/text'
import slot from './prerender/slot'

import bind from './proxy/bind'
import on from './proxy/on'
import raw from './proxy/raw'

export default ({ render, prerender, proxy }: any) => {
  prerender(slot)

  render(condition)
  render(text)

  proxy(bind)
  proxy(on)
  proxy(raw)
}
