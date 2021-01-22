import { defineComponent, h, isReactive, reactive, resolveComponent } from 'vue'
import { createProxyInjector, createServiceBuilder } from '@json-to-render/core'
import { getProxyService } from '../service/proxy'
import { cloneDeep } from '@json-to-render/utils'
import JNode from './jNode'
import { createProxyService } from '../service/proxy'
import { createHookService } from '../service/hooks'

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
    // 服务对象仓库
    const service = {
      proxy: [],
      setup: [],
      render: []
    }

    const proxy = createProxyService(service.proxy)
    const setup = createHookService(service.setup)
    const render = createHookService(service.render)

    ctx.emit('setup', { use: createServiceBuilder({ proxy, setup, render }) })

    //
    const injectProxy = createProxyInjector(getProxyService(service.proxy))

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
