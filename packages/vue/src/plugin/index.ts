import condition from './hooks/render/condition'
import text from './hooks/render/text'
import slot from './hooks/setup/slot'

import bind from './proxy/bind'
import on from './proxy/on'
import raw from './proxy/raw'

export default ({ render, setup, proxy }: any) => {
  setup(slot)

  render(condition)
  render(text)

  proxy(bind)
  proxy(on)
  proxy(raw)
}
