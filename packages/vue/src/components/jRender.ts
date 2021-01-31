import {
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
  toRaw,
  nextTick
} from 'vue'
import { createProxyInjector, getProxyDefine } from '@json-to-render/core'
import { createProxyService } from '../service/proxy'
import { createDatasourceService } from '../service/datasource'
import { assignObject } from '@json-to-render/utils'
import JNode from './jNode'
import { createHookService } from '../service/hooks'
import { createComponentService } from '../service/component'
import { proxy, prerender, render, datasource } from '../service'
import { createStore } from '../store'
import { innerDataNames } from '../utils/enums'

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
    const context: { [key: string]: any } = ref({
      model: toRaw(props.modelValue)
    })
    const field = ref([])
    const updating = ref(false) // 为了更新 fields 时从根节点刷新

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
      components: componentService.store,
      context: context.value
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

    //#region 相关监听
    watch(
      () => props.fields,
      value => {
        updating.value = true

        field.value = injectProxy(
          {
            component: props.component,
            children: toRaw(getProxyDefine(value || []))
          },
          context.value
        )

        nextTick(() => {
          updating.value = false
        })
      },
      { deep: false, immediate: true }
    )

    watch(
      () => props.modelValue,
      value => {
        context.value.model = toRaw(value || {})
      },
      { deep: false, immediate: false }
    )

    watch(
      () => props.datasource,
      (value, origin) => {
        Object.keys(origin || {})
          .filter(item => !innerDataNames.includes(item))
          .forEach(key => {
            delete context.value[key]
          })

        Object.keys(value || {})
          .filter(item => !innerDataNames.includes(item))
          .forEach(key => {
            datasourceService.resolve(key, value[key], {
              injectProxy,
              context: context.value
            })
          })
      },
      { deep: false, immediate: true }
    )
    //#endregion

    return () =>
      !updating.value
        ? h(resolveComponent(JNode.name), { field: field.value })
        : null
  }
})
