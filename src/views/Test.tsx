import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref({
      model: { text: 'xxx' },
      fields: [
        {
          component: 'p',
          props: { innerText: '$:raw.zzz' },
        },
        {
          component: 'p',
          props: { innerText: '$:model.text' },
        },
        {
          component: 'input',
          props: {
            onInput: '@model.text:arguments[0].target.value',
          },
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
      datasource('rawdata', (props: any) => {
        return props.data
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
