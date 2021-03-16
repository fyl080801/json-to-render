import { defineComponent } from 'vue'
import Designer from '@json2render/vue-designer'

export default defineComponent({
  components: { Designer },
  setup() {
    const config = {
      fields: [
        {
          component: 'v-jdesigner-toolbox',
          props: { style: { width: '200px' } },
        },
        {
          component: 'v-jdesigner-container',
          props: { style: {} },
        },
        {
          component: 'v-jdesigner-container',
          props: { style: {} },
        },
      ],
    }
    return () => <designer config={config} />
  },
})
