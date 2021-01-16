import { resolveComponent, defineComponent, h } from 'vue'
import render from '../utils/render'
import { createHook } from '../hook'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true }
  },
  setup: props => {
    createHook()(props.field)

    return () =>
      h(
        resolveComponent(props.field.component),
        props.field.props,
        render(props.field.children)
      )
  }
})
