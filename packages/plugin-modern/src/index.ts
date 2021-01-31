import expression from './proxy/expression'
import functionProxy from './proxy/function'

export default ({ proxy }: any) => {
  proxy(expression)
  proxy(functionProxy)
}
