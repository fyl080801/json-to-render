import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import { createSetupHooks, createRenderHooks } from '../hook'
import slot from '@jrender/hook-base/setup/slot'
import {
  isObject,
  isArray,
  assignObject,
  assignArray
} from '@jrender/core/utils/helpers'
import { isOriginTag } from '@jrender/core/utils/domTags'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    createSetupHooks([slot])(props.field)

    return () => {
      // 暂时规划每次渲染都用非代理对象
      const renderField = assignObject(
        assignObject(props.field, { children: null }),
        {
          children: isArray(props.field.children)
            ? assignArray(props.field.children)
            : isObject(props.field.children)
            ? assignObject(props.field.children)
            : null
        }
      )

      createRenderHooks([])(renderField)

      return renderField.component
        ? h(
            isOriginTag(renderField.component)
              ? renderField.component
              : resolveComponent(renderField.component),
            renderField.props,
            render(renderField.children)
          )
        : null
    }
  }
})
