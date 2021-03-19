import { defineComponent } from 'vue'
import Designer from '@json2render/vue-designer'

export default defineComponent({
  components: { Designer },
  setup() {
    // const config = {
    //   fields: [
    //     {
    //       component: 'v-jdesigner-toolbox',
    //       props: { style: { width: '200px' } },
    //     },
    //     {
    //       component: 'v-jdesigner-container',
    //       props: { style: {} },
    //     },
    //     {
    //       component: 'v-jdesigner-container',
    //       props: { style: {} },
    //     },
    //   ],
    // }
    const config: any[] = [
      {
        component: 'v-jdesigner-toolbox',
        location: {},
      },
      {
        component: 'v-jdesigner-propertybox',
        location: {},
      },
      {
        component: 'property',
        location: {},
      },
    ]

    return () => <designer config={config} />
  },
})
