import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
// import { createSetupHooks, createRenderHooks } from '../hook'
// import { slot } from '@json-to-render/hooks'
import {
  isObject,
  isArray,
  assignObject,
  assignArray,
  isOriginTag,
  pipeline
} from '@json-to-render/utils'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    pipeline([])(props.field)

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

      pipeline([])(field)

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
