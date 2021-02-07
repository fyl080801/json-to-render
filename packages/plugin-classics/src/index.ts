import context from './prerender/context'
import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

export default ({ prerender, render, proxy }: any) => {
  prerender(context)

  render(text)
  render(condition)

  proxy(computed)
  proxy(method)
}
