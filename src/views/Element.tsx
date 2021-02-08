import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({})

    const fields = reactive([
      {
        component: 'el-form',
        props: { labelWidth: '120px' },
        children: [
          {
            component: 'el-input',
            formProps: { label: 'input1' },
            model: 'model.text1',
          },
          {
            component: 'el-select',
            formProps: { label: 'select1' },
            model: 'model.select1',
          },
        ],
      },
      { component: 'p', text: '$:JSON.stringify(model)' },
    ])

    const onSetup = ({ prerender }: any) => {
      prerender(({ injectProxy, context }: any) => (field: any, next: any) => {
        if (!field.formProps) {
          next(field)
          return
        }

        const formProps = field.formProps

        delete field.formProps

        next(
          injectProxy(
            { component: 'el-form-item', props: formProps, children: [field] },
            context
          )
        )
      })
    }

    return () => (
      <div>
        <v-jrender
          v-model={data}
          fields={fields}
          class="j-form"
          onSetup={onSetup}
        ></v-jrender>
      </div>
    )
  },
})
