import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      checks: [],
    })

    const datasource = reactive({
      raw: {
        type: 'rawdata',
        data: {
          options: [
            {
              key: 0,
              label: 'select 1',
            },
            {
              key: 1,
              label: 'select 2',
            },
          ],
        },
      },
    })

    const listeners = reactive([
      {
        watch: '$:model.selected',
        actions: [{ handler: '@model.checks:[`select ${model.selected+1}`]' }],
      },
    ])

    const fields = reactive([
      {
        component: 'el-form',
        rowProps: {
          gutter: 20,
        },
        props: {
          labelWidth: '120px',
        },
        children: [
          {
            component: 'el-input',
            model: 'model.text',
            colProps: { span: 24 },
            formProps: { label: 'text1' },
          },
          {
            component: 'el-select',
            model: 'model.selected',
            colProps: { span: 12 },
            formProps: { label: 'selected' },
            children:
              '$:raw.options.map(item=>({component:"el-option", props:{label:item.label, value:item.key}}))',
          },
          {
            component: 'el-checkbox-group',
            model: 'model.checks',
            colProps: { span: 12 },
            formProps: {
              label: 'checks',
            },
            children:
              '$:raw.options.map(item=>({component:"el-checkbox", props:{label:item.label}}))',
          },
          {
            component: 'el-slider',
            model: 'model.num',
            colProps: { span: 24 },
            formProps: { label: 'silder' },
            props: { min: 1, max: 24 },
          },
          {
            component: 'el-input',
            model: 'model.text',
            colProps: { span: '$:model.num' },
            formProps: { label: 'silder' },
          },
        ],
      },
      {
        component: 'p',
        text: '$:JSON.stringify(model)',
      },
    ])

    const onSetup = ({ prerender, datasource }: any) => {
      // 在组件外部套一个 el-form-item
      prerender(
        ({ proxy, context }: any) =>
          (field: any, next: any) => {
            if (!field.formProps) {
              next(field)
              return
            }

            const formProps = field.formProps

            delete field.formProps

            next(
              proxy.inject(
                {
                  component: 'el-form-item',
                  props: formProps,
                  children: [field],
                },
                context
              )
            )
          },
        2
      )

      // 在组件内部套一个 el-row
      prerender(() => (field: any, next: any) => {
        if (!field.rowProps) {
          next(field)
          return
        }

        const rowProps = field.rowProps

        delete field.rowProps

        field.children = [
          {
            component: 'el-row',
            props: rowProps,
            children: field.children,
          },
        ]

        next(field)
      })

      // 在组件外部套一个 el-col
      prerender(
        ({ proxy, context }: any) =>
          (field: any, next: any) => {
            if (!field.colProps) {
              next(field)
              return
            }

            const colProps = field.colProps.__jr_proxyDefine

            delete field.colProps

            next(
              proxy.inject(
                {
                  component: 'el-col',
                  props: colProps,
                  children: [field],
                },
                context
              )
            )
          },
        1
      )

      datasource('rawdata', (options: any) => {
        return options.data
      })
    }

    return () => (
      <div>
        <v-jrender
          v-model={data}
          fields={fields}
          datasource={datasource}
          listeners={listeners}
          class="j-form"
          onSetup={onSetup}
        ></v-jrender>
      </div>
    )
  },
})
