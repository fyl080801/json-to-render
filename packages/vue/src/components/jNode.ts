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

    let renderField: any

    prerender(
      [
        slot,
        () => (field: any, next: Function) => {
          renderField = field
          next(renderField)
        }
      ],
      { injectProxy, context }
    )(props.field)

    return () => {
      const childrenAssign = isArray(renderField.children)
        ? assignArray
        : assignObject

      // 暂时规划每次渲染都用非代理对象
      const field = assignObject(renderField, {
        children: childrenAssign(renderField.children)
      })

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
                field.props, // 必须在这里将实际值还原出来
                getRender({ injectProxy, context })(field.children)
              )

            if (result) {
              next(field)
            }
          }
        ],
        { injectProxy, context }
      )(field)

      return result
    }
  }
})
