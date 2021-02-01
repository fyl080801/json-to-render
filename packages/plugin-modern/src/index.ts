import expression from './proxy/expression'
import method from './proxy/method'
import template from './proxy/template'

export default ({ proxy }: any) => {
  proxy(expression)
  proxy(method)
  proxy(template)
}
