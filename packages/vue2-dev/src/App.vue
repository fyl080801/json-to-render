<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { useGlobalRender, createRender } from '@json2render/core'
import { provider } from '@json2render/vue2'

export default defineComponent({
  setup() {
    const rootRef = ref()

    const render = createRender({
      fields: [
        { component: 'div', domProps: { innerText: 'aaaaaa' } },
        {
          component: 'input',
          domProps: { value: '$:GET(model, "text")' },
          on: { input: '$:(e)=>SET(model, "text", e.target.value)' },
        },
        {
          component: 'p',
          domProps: { innerText: '$:model.text' },
        },
      ],
    })

    useGlobalRender(({ useProvider }) => {
      useProvider(provider)
    })

    onMounted(() => {
      render.render(rootRef.value)
    })

    return {
      rootRef,
    }
  },
})
</script>

<template>
  <div>
    <div ref="rootRef"></div>
  </div>
</template>
