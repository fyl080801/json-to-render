import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import slot from '../plugin/prerender/slot'
import {
  isObject,
  isArray,
  assignObject,
  assignArray,
  isOriginTag
} from '@json-to-render/utils'
import { getState } from '../store/service'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    const {
      prerender: prerenderHook,
      render: renderHook,
      injectProxy
    }: any = getState()

    prerenderHook([slot], { injectProxy })(props.field)

    return () => {
      // 暂时规划每次渲染都用非代理对象
      const field = assignObject(
        assignObject(props.field, { children: null }),
        {
          children: isArray(props.field.children)
            ? assignArray(props.field.children)
            : isObject(props.field.children)
            ? assignObject(props.field.children)
            : null
        }
      )

      renderHook([], { injectProxy })(field)

      return field.component
        ? h(
            isOriginTag(field.component)
              ? field.component
              : resolveComponent(field.component),
            field.props,
            render(field.children)
          )
        : null
    }
  }
})
