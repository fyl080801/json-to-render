import { defineComponent, reactive } from 'vue'
import elementPlugin from '@json2render/plugin-elementui'

export default defineComponent({
  setup() {
    const data = reactive({})

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
        row: {
          gutter: 20,
        },
        props: {
          labelWidth: '120px',
        },
        children: [
          {
            component: 'el-input',
            model: 'model.text',
            col: { span: 24 },
            form: { label: 'text1' },
          },
          {
            component: 'el-select',
            model: 'model.selected',
            col: { span: 12 },
            form: { label: 'selected' },
            options: {
              component: 'el-option',
              valueProp: 'key',
              items: '$:raw.options',
            },
          },
          {
            component: 'el-checkbox-group',
            model: 'model.checks',
            col: { span: 12 },
            form: {
              label: 'checks',
            },
            // children:
            //   '$:raw.options.map(item=>({component:"el-checkbox", props:{label:item.label}}))',
            options: {
              component: 'el-checkbox',
              items: '$:raw.options',
            },
          },
          {
            component: 'el-slider',
            model: 'model.num',
            col: { span: 24 },
            form: { label: 'silder' },
            props: { min: 1, max: 24 },
          },
          {
            component: 'el-input',
            model: 'model.text',
            col: { span: '$:model.num' },
            form: { label: 'silder' },
          },
        ],
      },
      {
        component: 'p',
        text: '$:JSON.stringify(model)',
      },
    ])

    const onSetup = (services: any) => {
      elementPlugin(services)

      services.datasource('rawdata', (options: any) => {
        return reactive(options.data)
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
        {/* <el-button onClick={() => {
          datasource.raw.data.options.push({ key: datasource.raw.data.options.length + 1, label: 'aaa' })
          debugger
        }}>add</el-button> */}
      </div>
    )
  },
})
