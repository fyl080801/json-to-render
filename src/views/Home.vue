<template>
  <div class="home">
    <select :value="current" @change="(evt) => (current = evt.target.value)">
      <option :key="item" v-for="item in basics" :value="item">
        {{ item }}
      </option>
    </select>
    <v-jrender
      v-model="active.model"
      :fields="active.fields"
      :datasource="active.datasource"
      :listeners="active.listeners"
      class="j-form"
      @setup="onSetup"
    ></v-jrender>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  setup: () => {
    const current = ref('')
    const basics = ref(['simple', 'input', 'full'])
    const active = ref({})

    watch(
      () => current.value,
      (value) => {
        fetch(`/data/basic/${value}.json`).then((response) => {
          response.json().then((json) => {
            Object.assign(
              active.value,
              { fields: [], datasource: {}, listeners: [], model: {} },
              json
            )
          })
        })
      }
    )

    onMounted(() => {
      current.value = 'full'
    })

    // return ret
    return {
      current,
      active,
      basics,
    }
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
