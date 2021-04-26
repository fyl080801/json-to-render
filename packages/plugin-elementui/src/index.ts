import formProps from './prerender/formProps'
import rowProps from './prerender/rowProps'
import colProps from './prerender/colProps'
import childProps from './prerender/childProps'

export default ({ prerender }: any) => {
  prerender(formProps, 2)
  prerender(rowProps)
  prerender(colProps, 1)
  prerender(childProps)
}
