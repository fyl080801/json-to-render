import { defineComponent } from 'vue'
import Designer from '@json2render/vue-designer'

export default defineComponent({
  components: { Designer },
  setup() {
    return () => <designer />
  },
})
