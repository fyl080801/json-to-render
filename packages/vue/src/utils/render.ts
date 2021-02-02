import { resolveComponent, h } from 'vue'
import { getProxyDefine } from '@json-to-render/core'
import { assignObject } from '@json-to-render/utils'

const render = (children: any[], services: any, scope?: any) => {
  const { context, injectProxy } = services

  return children.map(child => {
    if (!scope) {
      return h(resolveComponent('vJnode'), { field: child })
    }

    const childDefine = getProxyDefine(child)

    const scopedChild = injectProxy(
      childDefine,
      assignObject(context, { scope })
    )

    return h(resolveComponent('vJnode'), { field: scopedChild })
  })
}

export default (services: any) => (children: any) => {
  if (!children) {
    return null
  }

  return Array.isArray(children)
    ? render(children, services)
    : Object.keys(children).reduce((pre: any, key: string) => {
        pre[key] = (scope: any) => {
          return render(
            children[key],
            services,
            Object.keys(scope || {}).length && scope
          )
        }
        return pre
      }, {})
}
