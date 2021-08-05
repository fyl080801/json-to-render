import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const model = reactive({ checks: [] })

    const active = ref({
      model: { text: 'xxx', arr: ['aaa', 'bbb'] },
      fields: [
        {
          component: 'el-checkbox-group',
          model: 'model.arr',
          props: {
            // modelValue: model.checks,
            // 'onUpdate:modelValue': (value: never[]) => {
            //   model.checks = value
            // },
          },
          children: [{ component: 'el-checkbox', props: { label: 'option1' } }],
        },
      ],
      datasource: {
        raw: {
          type: 'rawdata',
          props: {
            data: { zzz: 'zzz' },
          },
        },
      },
      listeners: [],
    })

    const onSetup = ({ datasource }: any) => {
      datasource('rawdata', (options: any) => {
        return options.props.data
      })
    }

    return () => (
      <div>
        <v-jrender
          v-model={active.value.model}
          fields={active.value.fields}
          datasource={active.value.datasource}
          listeners={active.value.listeners}
          onSetup={onSetup}
          class="j-form"
        ></v-jrender>
      </div>
    )
  },
})
