import { defineComponent, h, watch, ref } from 'vue'
import {
  getRenderer,
  resolveRenderComponent,
  resolveChildren,
} from '../utils/render'
import { isArray, assignObject } from '@json2render/utils'
import { getState } from '../store'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true },
    scope: { type: Object, required: true },
  },
  setup: (props) => {
    const {
      prerender,
      render,
      injectProxy,
      components,
      context,
    }: any = getState()

    const nodeField = ref({ children: [] })

    const injectedContext = assignObject(context, { scope: props.scope })

    watch(
      () => props.field,
      (value) => {
        prerender(
          [
            () => (field: any, next: any) => {
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

              field.children = resolveChildren(field.children)

              next(field)
            },
            () => (field: any, next: any) => {
              nodeField.value = injectProxy(field, injectedContext)
              next(nodeField.value)
            },
          ],
          {
            injectProxy,
            context: injectedContext,
          }
        )(injectProxy(value, injectedContext))
      },
      { deep: false, immediate: true }
    )

    return () => {
      // 是否需要每次渲染都转换成真实对象?
      let renderField = assignObject(nodeField.value, {
        children:
          nodeField.value.children && assignObject(nodeField.value.children),
      })

      render(
        [
          () => (field: any, next: any) => {
            renderField = field
            next(renderField)
          },
        ],
        {
          injectProxy,
          context: injectedContext,
        }
      )(renderField)

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

      if (rendered?.ref) {
        const { r, i }: any = rendered.ref
        context.refs[r] = i.refs[r]
      }

      return rendered
    }
  },
})
