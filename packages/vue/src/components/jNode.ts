import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import { createSetupHooks, createRenderHooks } from '../hook'
import slotHook from '../hook/slot'
import { isArray, isObject } from 'lodash-es'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    createSetupHooks([slotHook])(props.field)

    return () => {
      const renderField: any = {
        ...props.field,
        children: isArray(props.field.children)
          ? [...props.field.children]
          : isObject(props.field.children)
          ? { ...props.field.children }
          : null
      }

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
