<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGlobalRender, createRender } from '@json2render/core'
import { provider } from '@json2render/vue3'

const rootRef = ref()

const render = createRender({
  fields: {
    component: 'div',
    children: [
      { component: 'div', children: [{ component: 'div', props: { innerText: 'xxxxxx' } }] },
      {
        component: 'input',
        props: {
          value: '$:GET(model, "text")',
          onInput: '$:(e)=>SET(model, "text", e.target.value)',
        },
      },
      {
        component: 'p',
        props: { innerText: '$:model.text' },
      },
    ],
  },
})

useGlobalRender(({ useProvider }) => {
  useProvider(provider)
})

onMounted(() => {
  render.render(rootRef.value)
})
</script>

<template>
  <div class="render">
    <div ref="rootRef"></div>
  </div>
</template>
