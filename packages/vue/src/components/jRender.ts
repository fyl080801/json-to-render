import { defineComponent, h, isReactive, reactive, resolveComponent } from 'vue'
import { createProxyInjector } from '@json-to-render/core'
import { createProxyService } from '../service/proxy'
import { assignObject, cloneDeep } from '@json-to-render/utils'
import JNode from './jNode'
import { createHookService } from '../service/hooks'
import { proxy, prerender, render } from '../service'
import { createStore } from '../store/service'

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
    //#region 初始化服务相关
    const proxyService = createProxyService(proxy.store)
    const prerenderService = createHookService(prerender.store)
    const renderService = createHookService(render.store)

    // 所有服务
    const services = {
      prerender: prerenderService.processHook,
      render: renderService.processHook
    }

    // 最后一个参数加上，准备传递需要用到的服务，除了 injectProxy
    // injectProxy 自身内部引用
    const injectProxy = createProxyInjector(
      proxyService.getProxyHandlerResolver(),
      services
    )

    createStore(assignObject(services, { injectProxy }))
    //#endregion

    //#region 数据上下文
    const context = isReactive(props.modelValue)
      ? props.modelValue
      : reactive(props.modelValue)
    //#endregion

    ctx.emit('setup', {
      proxy: proxyService.setup,
      prerender: prerenderService.setup,
      render: renderService.setup
    })

    const field = reactive(
      injectProxy(
        cloneDeep({ component: props.component, children: props.fields }),
        context
      )
    )

    return () => {
      return h(resolveComponent(JNode.name), { field })
    }
  }
})
