import { resolveComponent, h } from 'vue'
import {
  assignObject,
  isArray,
  isObject,
  isOriginTag,
} from '@json2render/utils'

const render = (children: any[], scope: any) => {
  return children.map((child) => {
    return child.options && child.options.direct
      ? h(
          resolveComponent(child.component),
          child.props,
          getRenderer(scope)(child.children)
        )
      : h(resolveComponent('vJnode'), {
          field: child,
          scope,
        })
  })
}

export const resolveRenderComponent = (name: string) => {
  return isOriginTag(name) ? name : resolveComponent(name)
}

export const getRenderer = (scope: any) => (children: any): any => {
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
