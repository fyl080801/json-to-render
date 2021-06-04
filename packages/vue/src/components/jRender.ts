import {
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
  toRaw,
  nextTick,
  onBeforeUnmount,
  reactive,
} from 'vue'
import {
  containerBuilder,
  proxySetup,
  functionalSetup,
  datasourceSetup,
  prerenderSetup,
  renderSetup,
} from '../service'
import { createStore } from '../store'
import { innerDataNames } from '../utils/enums'
import JNode from './jNode'
import {
  ProxyContext,
  proxyContextToken,
  datasourceServiceToken,
  proxyServiceToken,
  isArray,
  isFunction,
} from '@json2render/core'
import {
  PrerenderService,
  prerenderServiceToken,
  RenderService,
  renderServiceToken,
} from '../feature'

export default defineComponent({
  name: 'vJrender',
  components: { [JNode.name]: JNode },
  props: {
    modelValue: { type: Object, default: () => ({}) },
    component: { type: String, default: 'div' },
    fields: { type: Array, default: () => [] },
    datasource: { type: Object, default: () => ({}) },
    listeners: { type: Array, default: () => [] },
  },
  emits: ['setup', 'update:modelValue'],
  setup: (props, ctx) => {
    const context: ProxyContext = reactive({
      model: toRaw(props.modelValue),
      scope: {},
      refs: {},
    })

    const root = reactive({ field: {}, scope: {} })

    const updating = ref(false) // 为了更新 fields 时从根节点刷新

    //#region 初始化服务相关
    const container = containerBuilder
      .build()
      .addService<PrerenderService>(prerenderServiceToken, PrerenderService)
      .addService<RenderService>(renderServiceToken, RenderService)
      .addValue<ProxyContext>(proxyContextToken, context)

    const datasourceService = container.resolve(datasourceServiceToken)

    const proxyService = container.resolve(proxyServiceToken)

    createStore(container)

    ctx.emit('setup', {
      proxy: proxySetup,
      functional: functionalSetup,
      datasource: datasourceSetup,
      prerender: prerenderSetup,
      render: renderSetup,
    })
    //#endregion

    //#region 相关监听
    watch(
      () => props.fields,
      (value) => {
        updating.value = true

        root.field = {
          component: props.component,
          children: toRaw(value || []),
        }

        root.scope = {}

        nextTick(() => {
          updating.value = false
        })
      },
      { deep: false, immediate: true }
    )

    watch(
      () => props.modelValue,
      (value) => {
        context.model = toRaw(value || {})
      },
      { deep: false, immediate: false }
    )

    watch(
      () => props.datasource,
      (value, origin) => {
        Object.keys(origin || {})
          .filter((item) => !innerDataNames.includes(item))
          .forEach((key) => {
            datasourceService.release(key)
          })

        Object.keys(value || {})
          .filter((item) => !innerDataNames.includes(item))
          .forEach((key) => {
            datasourceService.build(key, value[key])
          })
      },
      { deep: false, immediate: true }
    )
    //#endregion

    //#region listeners 监听
    const watchs = ref([] as any[])

    watch(
      () => props.listeners,
      (value) => {
        watchs.value.forEach((watcher) => watcher())

        if (!value || !isArray(value)) {
          return
        }

        watchs.value = value.map((item) => {
          const injected = proxyService.inject(item, context)

          const watcher = isFunction(injected.watch)
            ? injected.watch
            : () => injected.watch

          return watch(
            watcher,
            () => {
              injected.actions.forEach((act: any) => {
                if (act.condition === undefined || !!act.condition) {
                  if (act.timeout) {
                    setTimeout(() => act.handler(), act.timeout)
                  } else {
                    act.handler()
                  }
                }
              })
            },
            {
              deep: injected.deep,
              immediate: injected.immediate,
            }
          )
        })
      },
      { deep: false, immediate: true }
    )

    onBeforeUnmount(() => {
      watchs.value.forEach((watcher) => watcher())
    })
    //#endregion

    return () =>
      !updating.value ? h(resolveComponent(JNode.name), root) : null
  },
})
