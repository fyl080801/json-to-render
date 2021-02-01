import { resolveComponent, defineComponent, h } from 'vue'
import getRender from '../utils/render'
import slot from '../plugin/prerender/slot'
import {
  isArray,
  assignObject,
  assignArray,
  isOriginTag
} from '@json-to-render/utils'
import { getState } from '../store'

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

    return () => {
      const assign = isArray(props.field.children) ? assignArray : assignObject

      // 暂时规划每次渲染都用非代理对象
      const field = assignObject(props.field, {
        children: assign(props.field.children)
      })

      render([], { injectProxy, context })(field)

      const component =
        field.component &&
        (components[field.component] ||
          (isOriginTag(field.component)
            ? field.component
            : resolveComponent(field.component)))

      return (
        component &&
        h(
          component,
          field.props,
          getRender({ injectProxy, context })(field.children)
        )
      )
    }
  }
})
