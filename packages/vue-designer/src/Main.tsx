import { defineComponent, reactive } from 'vue'
import Jrender from '@json2render/vue'

export default defineComponent({
  name: 'vJrenderDesigner',
  components: { Jrender },
  props: { config: { type: Object, required: true } },
  setup(props) {
    const { config } = props

    const reactived = reactive(config)

    return () => (
      <div class="w-full">
        <jrender datasource={reactived.datasource}></jrender>
      </div>
    )
  },
})
