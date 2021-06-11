import { assignObject, createToken, isArray, isObject } from '@json2render/core'
import { h, resolveComponent } from 'vue'
import { resolveRenderComponent } from '../utils/render'

export const componentServiceToken =
  createToken<ComponentService>('componentService')

export class ComponentService {
  render(components: Array<any>, scope: Record<string, unknown>): any {
    return components.map((child) => {
      // 之后根据provider来渲染
      return child.options && child.options.direct
        ? h(
            resolveComponent(child.component),
            child.props,
            this.renderMany(child.children, scope)
          )
        : h(resolveComponent('vJnode'), {
            field: child,
            scope,
          })
    })
  }

  renderMany(
    components: Array<unknown> | Record<string, Array<unknown>>,
    scope: Record<string, unknown>
  ) {
    if (!components) {
      return null
    }

    return isArray(components)
      ? this.render(components as Array<unknown>, scope)
      : isObject(components)
      ? Object.keys(components as Record<string, Array<unknown>>).reduce(
          (pre, key) => {
            pre[key] = (scope: any) =>
              this.render(
                (components as Record<string, Array<unknown>>)[key],
                assignObject(scope, Object.keys(scope || {}))
              )
            return pre
          },
          {} as Record<string, any>
        )
      : null
  }

  renderNode(field: any, scope: Record<string, unknown>) {
    const node =
      field && field.component && resolveRenderComponent(field.component)
    // (components[renderField.component] ||
    //   resolveRenderComponent(renderField.component))

    return node && h(node, field.props, this.renderMany(field.children, scope))
  }
}
