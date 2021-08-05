import formProps from './prerender/formProps'
import rowProps from './prerender/rowProps'
import colProps from './prerender/colProps'
// import options from './render/options'
import vmodel from './prerender/vmodel'

export default ({ prerender }: any) => {
  prerender(formProps, 2)
  prerender(rowProps)
  prerender(colProps, 1)
  prerender(vmodel)
  // render(options)
}
