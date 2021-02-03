import expression from './proxy/expression'
import method from './proxy/method'
import template from './proxy/template'

export const modern = ({ proxy }: any) => {
  proxy(expression)
  proxy(method)
  proxy(template)
}
