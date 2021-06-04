import { debounce } from '../utils/helpers'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const active = ref({
      model: {},
      fields: [{ component: 'p', props: { innerText: 'aaa' } }],
      datasource: {},
      listeners: [],
    })

    return () => (
      <v-jrender
        v-model={active.value.model}
        fields={active.value.fields}
        datasource={active.value.datasource}
        listeners={active.value.listeners}
        class="j-form"
      ></v-jrender>
    )
  },
})
