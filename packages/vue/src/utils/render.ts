import { resolveComponent, h } from 'vue'
import { assignObject, isArray, isObject } from '@json2render/utils'

const render = (children: any[], scope: any) => {
  return children.map((child) => {
    return h(resolveComponent('vJnode'), {
      field: child,
      scope,
    })
  })
}

export default (scope: any) => (children: any) => {
  if (!children) {
    return null
  }

  return isArray(children)
    ? render(children, scope)
    : isObject(children)
    ? Object.keys(children).reduce((pre: any, key: string) => {
        pre[key] = (scope: any) =>
          render(children[key], assignObject(scope, Object.keys(scope || {})))
        return pre
      }, {})
    : null
}
