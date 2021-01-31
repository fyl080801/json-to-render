import { resolveComponent, h } from 'vue'
import { getProxyDefine } from '@json-to-render/core'
import { assignObject } from '@json-to-render/utils'

const render = (children: any[], services: any, scope?: any) => {
  const { context, injectProxy } = services

  return children.map(child => {
    if (scope) {
      const childDefine = getProxyDefine(child)

      if (childDefine) {
        const reProxyChild = injectProxy(
          childDefine,
          assignObject(context, { scope })
        )

        return h(resolveComponent('vJnode'), { field: reProxyChild })
      }
    }
    return h(resolveComponent('vJnode'), { field: child })
  })
}

export default (services: any) => (children: any) => {
  if (!children) {
    return null
  }

  return Array.isArray(children)
    ? render(children, services)
    : Object.keys(children).reduce((pre: any, cur: any) => {
        pre[cur] = (scope: any) => {
          return render(
            children[cur],
            services,
            scope && Object.keys(scope).length && scope
          )
        }
        return pre
      }, {})
}
