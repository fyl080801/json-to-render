// import conditionHook from './prerender/condition'
import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './proxy/condition'

export default ({ prerender, render, proxy }: any) => {
  // prerender(conditionHook)

  render(text)

  proxy(computed)
  proxy(method)
  proxy(condition)
}
