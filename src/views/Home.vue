<template>
  <div class="h-full flex flex-row">
    <!-- <select :value="current" @change="(evt) => (current = evt.target.value)">
      <option :key="item" v-for="item in basics" :value="item">
        {{ item }}
      </option>
    </select> -->
    <div class="flex-none w-60">
      <ul class="flex flex-col">
        <a :key="item" v-for="item in basics" @click="current = item">
          <li
            class="border-b px-5 py-3 cursor-pointer"
            :class="{
              'bg-blue-400 text-white': current === item,
              'hover:bg-gray-100': current !== item,
            }"
          >
            {{ item }}
          </li>
        </a>
      </ul>
    </div>
    <div class="flex-1 border-l px-5 py-3">
      {{ JSON.stringify(Object.assign({}, active, { model: undefined })) }}
    </div>
    <div class="flex-1 border-l px-5 py-3 overflow-auto">
      <v-jrender
        v-model="active.model"
        :fields="active.fields"
        :datasource="active.datasource"
        :listeners="active.listeners"
        class="j-form"
        @setup="onSetup"
      ></v-jrender>
    </div>
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
