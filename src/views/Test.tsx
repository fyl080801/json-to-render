import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref({
      model: { text: 'xxx' },
      fields: [
        {
          component: 'p',
          props: { innerText: { $type: 'computed', $result: 'model.text' } },
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
      datasource: {},
      listeners: [],
    })

    return () => (
      <div>
        <v-jrender
          v-model={active.value.model}
          fields={active.value.fields}
          datasource={active.value.datasource}
          listeners={active.value.listeners}
          class="j-form"
        ></v-jrender>
      </div>
    )
  },
})
