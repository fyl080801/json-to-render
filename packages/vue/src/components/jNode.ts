import { resolveComponent, defineComponent, h, watch, ref } from 'vue'
import getRenderer from '../utils/render'
import { isArray, assignObject, isOriginTag } from '@json2render/utils'
import { getState } from '../store'

const slot = () => (field: any, next: any) => {
  if (!isArray(field.children)) {
    next(field)
    return
  }

  const children = field.children?.filter((child: any) => child) ?? []

  if (children.length <= 0) {
    next(field)
    return
  }

  field.children = children.reduce((pre: any, cur: any) => {
    const currentSlot = cur.slot || 'default'
    pre[currentSlot] = pre[currentSlot] || []
    pre[currentSlot].push(cur)
    return pre
  }, {})

  next(field)
}

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
        const hookField = injectProxy(value, injectedContext)

        prerender(
          [
            slot,
            () => (field: any, next: any) => {
              nodeField.value = field
              next(field)
            },
          ],
          {
            injectProxy,
            context: injectedContext,
          }
        )(hookField)
      },
      { deep: false, immediate: true }
    )

    return () => {
      // 是否需要每次渲染都转换成真实对象?
      const renderField = assignObject(nodeField.value, {
        children:
          nodeField.value.children && assignObject(nodeField.value.children),
      })

      render([], { injectProxy, context: injectedContext })(renderField)

      const component =
        renderField.component &&
        (components[renderField.component] ||
          (isOriginTag(renderField.component)
            ? renderField.component
            : resolveComponent(renderField.component)))

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
