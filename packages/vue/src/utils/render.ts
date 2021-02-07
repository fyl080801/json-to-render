import { resolveComponent, h } from 'vue'
// import { getProxyDefine } from '@json2render/core'
import { assignObject, isArray, isObject } from '@json2render/utils'

const render = (children: any[], scope: any) => {
  // const { injectProxy } = services

  return children.map((child) => {
    // if (!scope) {
    //   return h(resolveComponent('vJnode'), { field: child, context })
    // }

    // const childDefine = getProxyDefine(child)

    // const combinedContext = assignObject(context, { scope })

    // const scopedChild = injectProxy(childDefine, combinedContext)

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
