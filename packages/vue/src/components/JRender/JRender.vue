<script setup>
import {
  defineProps,
  defineEmits,
  reactive,
  watch,
  useSlots,
  nextTick,
} from 'vue'
import { useJRender } from './mixins'
import { isFunction } from '@/utils/helpers'
import JNode from './JNode'

const props = defineProps({
  fields: Array,
  tag: { type: String, default: 'div' },
})
const emit = defineEmits(['setup', 'update:modelValue'])

const { components, beforeRenderHandlers } = useJRender({
  slots: useSlots(),
  components: new Map(),
  beforeRenderHandlers: [],
  context: { model: { text: '测试绑定的值' } },
})

emit('setup', {
  setComponent: (name, type) => {
    components.set(name, type)
  },
  onBeforeRender: (handler) => {
    if (isFunction(handler)) {
      beforeRenderHandlers.push(handler)
    }
  },
})

const root = reactive({ component: props.tag, children: props.fields })

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
