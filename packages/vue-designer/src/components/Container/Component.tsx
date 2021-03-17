import { defineComponent, reactive } from 'vue'
import Jrender from '@json2render/vue'

export default defineComponent({
  name: 'v-jdesigner-container',
  components: { Jrender },
  setup() {
    const reactived: any = reactive({})

    return () => (
      <div>
        <jrender
          fields={reactived.fields}
          datasource={reactived.datasource}
          listeners={reactived.listeners}
        ></jrender>
      </div>
    )
  },
})