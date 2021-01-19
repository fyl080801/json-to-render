import { defineComponent, h, isReactive, reactive, resolveComponent } from 'vue'
import { createProxyInjector } from '@json-to-render/core'
import { getProxyHandler } from '../service/proxy'
import { cloneDeep } from '@json-to-render/utils'
import JNode from './jNode'
import { use } from '../service'

export default defineComponent({
  name: 'vJrender',
  components: { [JNode.name]: JNode },
  props: {
    modelValue: { type: Object, default: () => ({}) },
    component: { type: String, default: 'div' },
    fields: { type: Array, default: () => [] },
    listeners: { type: Array, default: () => [] }
  },
  emits: ['setup', 'update:modelValue'],
  setup: (props, ctx) => {
    ctx.emit('setup', { use })

    const injectProxy = createProxyInjector(getProxyHandler)

    const field = reactive(
      injectProxy(
        cloneDeep({ component: props.component, children: props.fields }),
        isReactive(props.modelValue)
          ? props.modelValue
          : reactive(props.modelValue)
      )
    )

    console.log(field)

    return () => {
      return h(resolveComponent(JNode.name), { field })
    }
  }
})
