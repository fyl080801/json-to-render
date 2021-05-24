import computed from './proxy/computed'
import method from './proxy/method'
import condition from './render/condition'

import add from './functional/add'
import division from './functional/division'
import equal from './functional/equal'
import filter from './functional/filter'
import find from './functional/find'
import get from './functional/get'
import ifFunctional from './functional/if'
import includes from './functional/includes'
import map from './functional/map'
import multiply from './functional/multiply'
import reduce from './functional/reduce'
import subtraction from './functional/subtraction'
import textFunctional from './functional/text'

export default ({ render, proxy, functional }: any) => {
  render(condition)

  proxy(computed)
  proxy(method)

  functional('ADD', add)
  functional('DIVISION', division)
  functional('EQUAL', equal)
  functional('FILTER', filter)
  functional('FIND', find)
  functional('GET', get)
  functional('IF', ifFunctional)
  functional('INCLUDES', includes)
  functional('MAP', map)
  functional('MULTIPLY', multiply)
  functional('REDUCE', reduce)
  functional('SUBTRACTION', subtraction)
  functional('TEXT', textFunctional)
}
