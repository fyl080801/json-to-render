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
      injectProxy,
      components
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

      let result

      renderHook(
        [
          () => (field: any, next: any) => {
            const component =
              field.component &&
              (components[field.component] ||
                (isOriginTag(field.component)
                  ? field.component
                  : resolveComponent(field.component)))

            result =
              component && h(component, field.props, render(field.children))

            if (result) {
              next(field)
            }
          }
        ],
        { injectProxy }
      )(field)

      return result
    }
  }
})
