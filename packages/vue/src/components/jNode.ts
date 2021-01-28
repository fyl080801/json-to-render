import { resolveComponent, defineComponent, h } from 'vue'
import getRender from '../utils/render'
import slot from '../plugin/prerender/slot'
import {
  isObject,
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

    prerender([slot], { injectProxy })(props.field)

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

      render(
        [
          () => (field: any, next: any) => {
            const component =
              field.component &&
              (components[field.component] ||
                (isOriginTag(field.component)
                  ? field.component
                  : resolveComponent(field.component)))

            result =
              component &&
              h(
                component,
                field.props,
                getRender({ injectProxy, context })(field.children)
              )

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
