import {
  assignObject,
  ContainerInstance,
  createToken,
  isArray,
  isObject,
} from '@json2render/core'
import { h, resolveComponent, isVNode } from 'vue'
import { ComponentMeta } from '../types'
import { resolveRenderComponent } from '../utils/render'

export const componentServiceToken =
  createToken<ComponentService>('componentService')

export const componentToken = createToken<ComponentMeta>('component')

export class ComponentService {
  private store: Record<string, ComponentMeta>

  private providers: Record<string, any> = {
    direct: (field: any, scope: any) => {
      return h(
        resolveComponent(field.component),
        field.props,
        this.renderMany(field.children, scope)
      )
    },
    default: (field: any, scope: any) => {
      return h(resolveComponent('vJnode'), {
        field,
        scope,
      })
    },
  }

  constructor(container: ContainerInstance) {
    this.store = container.getMany(componentToken).reduce((pre, cur) => {
      pre[cur.name] = cur
      return pre
    }, {} as Record<string, ComponentMeta>)
  }

  render(components: Array<any>, scope: Record<string, unknown>): any {
    return components.map((child) => {
      if (isVNode(child)) {
        return child
      } else {
        const meta = this.store[child.component] || { provider: 'default' }
        return this.providers[meta.provider || 'default'](child, scope)
      }
    })
  }

  renderMany(
    components: Array<unknown> | Record<string, Array<unknown>>,
    scope: Record<string, unknown>
  ) {
    if (!components) {
      return
    }

    if (isArray(components)) {
      return this.render(components as Array<unknown>, scope)
    }

    if (isObject(components)) {
      return Object.keys(components as Record<string, Array<unknown>>).reduce(
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
    }
  }

  renderNode(field: any, scope: Record<string, unknown>) {
    const node =
      field?.component &&
      (this.store[field.component]?.define ||
        resolveRenderComponent(field.component))

    return node && h(node, field.props, this.renderMany(field.children, scope))
  }
}
