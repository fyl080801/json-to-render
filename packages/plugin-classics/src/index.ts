import text from './render/text'

import bind from './proxy/bind'
import on from './proxy/on'

export default ({ render, proxy }: any) => {
  render(text)

  proxy(bind)
  proxy(on)
}
