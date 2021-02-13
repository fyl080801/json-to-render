import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({ active: 'first' })
    const fields = reactive([
      { component: 'input', value: 'model.text' },
      {
        component: 'el-tabs',
        model: 'model.active',
        children: [
          {
            component: 'el-tab-pane',
            options: { direct: true },
            props: { label: 'aaa', name: 'first' },
            children: [
              { component: 'p', text: '$:model.text' },
              { component: 'p', text: '$:ADD(1, 1)' },
            ],
          },
          {
            component: 'el-tab-pane',
            options: { direct: true },
            props: { label: 'bbb', name: 'second' },
            children: [{ component: 'p', text: 'bbb' }],
          },
        ],
      },
    ])

    return () => (
      <div>
        <v-jrender v-model={data} fields={fields} class="j-form"></v-jrender>
      </div>
    )
  },
})
