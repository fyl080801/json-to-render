import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import { createSetupHooks, createRenderHooks } from '../hook'
import slotHook from '../hook/slot'
import {
  cloneDeep,
  isObject,
  isArray,
  assignObject,
  assignArray
} from '../utils/helpers'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    createSetupHooks([slotHook])(props.field)

    return () => {
      // 暂时规划每次渲染都用非代理对象
      const renderField = assignObject(
        cloneDeep(assignObject(props.field, { children: null })),
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
            resolveComponent(renderField.component),
            renderField.props,
            render(renderField.children)
          )
        : null
    }
  }
})
