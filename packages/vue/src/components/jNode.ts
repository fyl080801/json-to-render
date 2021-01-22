import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import { getSetupProcess, getRenderProcess } from '../service/hooks'
import slot from '../plugin/setup/slot'
import {
  isObject,
  isArray,
  assignObject,
  assignArray,
  isOriginTag
} from '@json-to-render/utils'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    getSetupProcess(slot)(props.field)

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

      getRenderProcess()(field)

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
