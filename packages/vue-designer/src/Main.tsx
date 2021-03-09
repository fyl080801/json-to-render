import { defineComponent, reactive, ref } from 'vue'
import Jrender from '@json2render/vue'

export default defineComponent({
  name: 'vJrenderDesigner',
  components: { Jrender },
  props: { config: { type: Object, required: true } },
  setup(props) {
    const { config } = props

    const reactived = reactive(config)

    const model = ref({})

    return () => (
      <div class="w-full">
        <jrender
          v-model={model.value}
          fields={reactived.fields}
          datasource={reactived.datasource}
          listeners={reactived.listeners}
        />
      </div>
    )
  },
})
