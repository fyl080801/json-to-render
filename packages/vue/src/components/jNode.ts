import { defineComponent, watch, ref } from 'vue'
import { resolveChildren } from '../utils/render'
import {
  isArray,
  assignObject,
  proxyContextToken,
  proxyServiceToken,
} from '@json2render/core'
import { getState } from '../store'
import {
  componentServiceToken,
  prerenderServiceToken,
  renderServiceToken,
} from '../feature'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true },
    scope: { type: Object, required: true },
  },
  setup: (props) => {
    const container: any = getState()

    const nodeField = ref<any>({})
    const prerender = container.resolve(prerenderServiceToken)
    const render = container.resolve(renderServiceToken)
    const proxy = container.resolve(proxyServiceToken)
    const context = container.resolve(proxyContextToken)
    const component = container.resolve(componentServiceToken)
    const injectedContext = assignObject(context, {
      scope: props.scope,
    })

    watch(
      () => props.field,
      (value) => {
        prerender.process(
          proxy.inject(value, injectedContext),
          injectedContext
        )([
          {
            invoke: () => (field: any, next: any) => {
              if (!isArray(field.children)) {
                next(field)
                return
              }

              const children =
                field.children?.filter((child: any) => child) ?? []

              if (children.length <= 0) {
                next(field)
                return
              }

              field.children = resolveChildren(children)

              next(field)
            },
          },
          {
            invoke: () => (field: any, next: any) => {
              nodeField.value = proxy.inject(field, injectedContext)
              next(nodeField.value)
            },
          },
        ])
      },
      { deep: false, immediate: true }
    )

    return () => {
      // 是否需要每次渲染都转换成真实对象?
      let renderField = assignObject(nodeField.value)

      render.process(
        renderField,
        injectedContext
      )([
        {
          invoke: () => (field: any, next: any) => {
            renderField = field
            next(renderField)
          },
        },
      ])

      const rendered = component.renderNode(renderField, props.scope)

      if (rendered?.ref) {
        const { r, i }: any = rendered.ref
        context.refs[r] = i.refs[r]
      }

      return rendered
    }
  },
})
