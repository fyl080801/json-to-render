import formProps from './prerender/formProps'
import rowProps from './prerender/rowProps'
import colProps from './prerender/colProps'

export default ({ prerender }: any) => {
  prerender(formProps, 2)
  prerender(rowProps)
  prerender(colProps, 1)
}
