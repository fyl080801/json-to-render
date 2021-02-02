import { resolveComponent, defineComponent, h, watch } from 'vue'
import getRender from '../utils/render'
import { isArray, assignObject, isOriginTag } from '@json-to-render/utils'
import { getState } from '../store'

const slot = () => (field: any, next: Function) => {
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
    field: { type: Object, required: true }
  },
  setup: props => {
    const {
      prerender,
      render,
      injectProxy,
      components,
      context
    }: any = getState()

    prerender([slot], { injectProxy, context })(props.field)

    watch(
      () => props.field,
      () => {
        prerender([slot], { injectProxy, context })(props.field)
      }
    )

    return () => {
      // 暂时规划每次渲染都用非代理对象
      const renderField = assignObject(props.field, {
        children: props.field.children && assignObject(props.field.children)
      })

      render([], { injectProxy, context })(renderField)

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
          getRender({ injectProxy, context })(renderField.children)
        )

      if (rendered?.ref) {
        const { r, i } = rendered.ref
        context.refs[r] = i.refs[r]
      }

      return rendered
    }
  }
})
