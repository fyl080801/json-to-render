<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  reactive,
  watch,
  useSlots,
  nextTick,
  Slots,
} from 'vue'
import JNode from './JNode'
import { containerBuilder, createSetup } from '../service'
import { useJRender } from './mixins'
import {
  ComponentService,
  componentServiceToken,
  PrerenderService,
  prerenderServiceToken,
  RenderService,
  renderServiceToken,
  slotsToken,
} from '../feature'
import { createStore } from '../store'
import {
  ProxyContext,
  proxyContextToken,
  datasourceServiceToken,
  proxyServiceToken,
  isArray,
  isFunction,
  assignObject,
  assignArray,
} from '@json2render/core'

const props = defineProps({
  fields: Array,
  tag: { type: String, default: 'div' },
  modelValue: Object,
})

const emit = defineEmits(['setup', 'update:modelValue'])

const root = reactive({ component: props.tag, children: props.fields })

const { components, beforeRenderHandlers } = useJRender({
  slots: useSlots(),
  components: new Map(),
  beforeRenderHandlers: [],
  // context: { model: { text: '测试绑定的值' } },
})

const context: ProxyContext = reactive({
  model: assignObject(props.modelValue),
  scope: {},
  refs: {},
})

//#region 初始化服务相关
const container = containerBuilder
  .build()
  .addService<PrerenderService>(prerenderServiceToken, PrerenderService)
  .addService<RenderService>(renderServiceToken, RenderService)
  .addService<ComponentService>(componentServiceToken, ComponentService)
  .addValue<ProxyContext>(proxyContextToken, context)
  .addValue<Slots>(slotsToken, useSlots())

emit('setup', createSetup(container))

createStore(container)
//#endregion

// emit('setup', {
//   setComponent: (name, type) => {
//     // components.set(name, type)
//   },
//   onBeforeRender: (handler) => {
//     // if (isFunction(handler)) {
//     //   beforeRenderHandlers.push(handler)
//     // }
//   },
// })

watch(
  () => props.fields,
  (value) => {
    nextTick(() => {
      root.children = value
    })
  }
)
</script>

<template>
  <JNode :field="root" />
</template>
