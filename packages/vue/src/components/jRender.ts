import {
  defineComponent,
  h,
  isReactive,
  reactive,
  ref,
  resolveComponent,
  watch
} from 'vue'
import { createProxyInjector } from '@json-to-render/core'
import { createProxyService } from '../service/proxy'
import { createDatasourceService } from '../service/datasource'
import { assignObject, cloneDeep } from '@json-to-render/utils'
import JNode from './jNode'
import { createHookService } from '../service/hooks'
import { createComponentService } from '../service/component'
import { proxy, prerender, render, datasource } from '../service'
import { createStore } from '../store/service'

export default defineComponent({
  name: 'vJrender',
  components: { [JNode.name]: JNode },
  props: {
    modelValue: { type: Object, default: () => ({}) },
    component: { type: String, default: 'div' },
    fields: { type: Array, default: () => [] },
    datasource: { type: Object, default: () => ({}) },
    listeners: { type: Array, default: () => [] }
  },
  emits: ['setup', 'update:modelValue'],
  setup: (props, ctx) => {
    //#region 初始化服务相关
    const proxyService = createProxyService(proxy.store)
    const prerenderService = createHookService(prerender.store)
    const renderService = createHookService(render.store)
    const componentService = createComponentService()
    const datasourceService = createDatasourceService(datasource.store)
    const injectProxy = createProxyInjector(proxyService.store)

    // 共享给节点的服务
    const services = {
      prerender: prerenderService.processHook,
      render: renderService.processHook,
      components: componentService.store
    }

    createStore(assignObject(services, { injectProxy }))

    ctx.emit('setup', {
      proxy: proxyService.setup,
      prerender: prerenderService.setup,
      render: renderService.setup,
      component: componentService.setup,
      datasource: datasourceService.setup
    })
    //#endregion

    //#region 数据相关
    const context: { [key: string]: any } = ref({})

    const field = ref([])

    watch(
      () => props.fields,
      value => {
        field.value = reactive(
          injectProxy(
            cloneDeep({ component: props.component, children: value }),
            context.value
          )
        )
      },
      { deep: false, immediate: true }
    )

    watch(
      () => props.modelValue,
      value => {
        Object.assign(
          context.value,
          isReactive(value) ? value : reactive(value)
        )
      },
      { deep: false, immediate: true }
    )

    watch(
      () => props.datasource,
      value => {
        Object.keys(value).forEach(key => {
          context.value[key] = datasourceService.resolve(
            value[key],
            context.value,
            { injectProxy }
          )
        })
      },
      { deep: false, immediate: true }
    )
    //#endregion

    return () => {
      return h(resolveComponent(JNode.name), { field: field.value })
    }
  }
})
