import { defineComponent, h, watch, ref } from 'vue'
import {
  getRenderer,
  resolveRenderComponent,
  resolveChildren,
} from '../utils/render'
import {
  isArray,
  assignObject,
  proxyContextToken,
  proxyServiceToken,
} from '@json2render/core'
import { getState } from '../store'
import { prerenderServiceToken, renderServiceToken } from '../feature'

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

    const injectedContext = assignObject(container.resolve(proxyContextToken), {
      scope: props.scope,
    })

    watch(
      () => props.field,
      (value) => {
        prerender.process(
          proxy.inject(value, injectedContext),
          injectedContext
        )([
          () => (field: any, next: any) => {
            if (!isArray(field.children)) {
              next(field)
              return
            }

            const children = field.children?.filter((child: any) => child) ?? []

            if (children.length <= 0) {
              next(field)
              return
            }

            field.children = resolveChildren(children)

            next(field)
          },
          () => (field: any, next: any) => {
            nodeField.value = proxy.inject(field, injectedContext)
            next(nodeField.value)
          },
        ])
      },
      { deep: false, immediate: true }
    )

    return () => {
      // 是否需要每次渲染都转换成真实对象?
      let renderField = assignObject(nodeField.value)

      render.process(renderField, [
        () => (field: any, next: any) => {
          renderField = field
          next(renderField)
        },
      ])

      const component =
        renderField &&
        renderField.component &&
        (components[renderField.component] ||
          resolveRenderComponent(renderField.component))

      const rendered =
        component &&
        h(
          component,
          renderField.props,
          getRenderer(props.scope)(renderField.children)
        )

      // if (rendered?.ref) {
      //   const { r, i }: any = rendered.ref
      //   context.refs[r] = i.refs[r]
      // }

      return rendered
    }
  },
})
