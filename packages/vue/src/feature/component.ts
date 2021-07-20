import { createToken, isArray, isObject } from '@json2render/core'
import { h, isVNode, resolveComponent } from 'vue'
import { ComponentMeta } from '../types'
import { resolveRenderComponent } from '../utils/render'

export interface ComponentService {
  (props: any): any
}

export const componentServiceToken =
  createToken<ComponentService>('componentService')

export const componentToken = createToken<ComponentMeta>('component')

export const createComponentService = (components: Array<any>) => {
  const componentMap = components.reduce((pre: any, cur: any) => {
    pre[cur.name] = cur
    return pre
  }, {})

  return (props: any) => {
    const providers: Record<string, any> = {
      direct: (field: any) => {
        return h(
          resolveComponent(field.component) as any,
          field.props,
          renderNodes(field.children)
        )
      },
      default: (field: any, scope: any) => {
        return h(resolveComponent('vJnode'), {
          field,
          scope,
        })
      },
    }

    const renderNodes = (
      nodes: Array<unknown> | Record<string, Array<unknown>>
    ) => {
      if (!nodes) {
        return
      }

      if (isArray(nodes)) {
        return {
          default: (scope: any) => handleRender(nodes as Array<any>, scope),
        }
      }

      if (isObject(nodes)) {
        return Object.keys(nodes as Record<string, Array<unknown>>).reduce(
          (target, key) => {
            target[key] = (scope: any) =>
              handleRender(
                (nodes as Record<string, Array<unknown>>)[key],
                scope
              )
            return target
          },
          {} as Record<string, any>
        )
      }
    }

    const handleRender = (nodes: Array<any>, scope: any) => {
      return nodes.map((child) => {
        if (isVNode(child)) {
          return child
        } else {
          const meta = componentMap[child.component] || {
            provider: 'default',
          }
          return providers[meta.provider || 'default'](
            child,
            Object.assign(scope || {}, props.scope)
          )
        }
      })
    }

    return {
      render: (field: any) => {
        const node =
          field?.component &&
          (componentMap[field.component]?.define ||
            resolveRenderComponent(field.component))

        return node && h(node, field.props, renderNodes(field.children))
      },
    }
  }
}
