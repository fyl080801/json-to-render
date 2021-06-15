import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({ active: 'first' })
    const fields = reactive([
      {
        component: 'el-input',
        model: 'model.text',
        props: { style: { width: '200px' }, placeholder: '请输入' },
      },
      {
        component: 'el-tabs',
        model: 'model.active',
        children: [
          {
            component: 'el-tab-pane',
            props: { label: 'aaa', name: 'first' },
            children: [
              { component: 'p', text: '$:model.text' },
              { component: 'p', text: '$:ADD(1, 1)' },
            ],
          },
          {
            component: 'el-tab-pane',
            props: { label: 'bbb', name: 'second' },
            children: [{ component: 'p', text: 'bbb' }],
          },
        ],
      },
    ])

    const onSetup = ({ component }: any) => {
      component('el-tab-pane', { provider: 'direct' })
    }

    return () => (
      <div>
        <v-jrender
          v-model={data}
          fields={fields}
          class="j-form"
          onSetup={onSetup}
        />
      </div>
    )
  },
})
