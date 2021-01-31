// import conditionHook from './prerender/condition'
import text from './render/text'

import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

export default ({ render, proxy }: any) => {
  // prerender(conditionHook)

  render(text)
  render(condition)

  proxy(computed)
  proxy(method)
  // proxy(condition)
}
