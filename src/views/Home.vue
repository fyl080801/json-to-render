<template>
  <div class="home">
    <v-jrender
      v-model="model"
      :fields="fields"
      :datasource="datasource"
      :listeners="listeners"
      class="j-form"
      @setup="onSetup"
    ></v-jrender>
    <hr />
    <p>{{ JSON.stringify(model) }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  setup: () => {
    const ret: any = reactive({
      model: {
        text1: 'xxx',
        obj: { selected: 0, value: 'text1' },
      },
      fields: [],
      datasource: {},
      listeners: [],
    })

    onMounted(() => {
      fetch('/data/basic.json').then((response) => {
        response.json().then((json) => {
          ret.fields = json.fields
          ret.datasource = json.datasource
          ret.listeners = json.listeners
          ret.model = Object.assign(ret.model, json.model)
        })
      })
    })

    return ret
  },
  methods: {
    onSetup({ datasource }: any) {
      datasource('rawdata', ({ define }: any) => {
        const { data } = define()

        return data
      })
    },
  },
})
</script>
