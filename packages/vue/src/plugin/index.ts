import condition from './render/condition'
import slot from './prerender/slot'

import raw from './proxy/raw'

export default ({ render, prerender, proxy }: any) => {
  prerender(slot)

  render(condition)

  proxy(raw)
}
