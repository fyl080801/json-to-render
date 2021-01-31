<template>
  <div class="home">
    <v-jrender
      v-model="model"
      :fields="fields"
      :datasource="datasource"
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
      model: { text1: 'xxx', obj: { selected: 0, value: 'text1' } },
      fields: [],
      datasource: {}
    })

    onMounted(() => {
      fetch('/data/basic.json').then(response => {
        response.json().then(json => {
          ret.fields = json.fields
          ret.datasource = json.datasource
        })
      })
    })

    return ret
  },
  methods: {
    onSetup({ proxy, datasource }: any) {
      // 测试自定义 proxy
      proxy((value: any) => {
        if (typeof value === 'string' && value.indexOf('=:') === 0) {
          return (context: any) => {
            try {
              const expr = value.replace('=:', '')
              return new Function(
                ...[...Object.keys(context), `return ${expr}`]
              )(...Object.keys(context).map(key => context[key]))
            } catch {
              //
            }
          }
        }
      })

      datasource('rawdata', (getOptions: Function, update: Function) => {
        const { props } = getOptions()
        update(props)
      })
    }
  }
})
</script>
