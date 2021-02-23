<template>
  <div class="h-full flex flex-row">
    <div class="flex-none w-60">
      <ul class="flex flex-col divide-y">
        <a :key="item" v-for="item in basics" @click="current = item">
          <li
            class="px-5 py-3 cursor-pointer"
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
    <div class="flex-1 border-l">
      <json-editor :modelValue="code" @change="onCodeChange"></json-editor>
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
import { debounce } from '../utils/helpers'

export default defineComponent({
  name: 'Home',
  setup: () => {
    const current = ref('')
    const basics = ref(['simple', 'input', 'full'])
    const active = ref({})
    const code = ref('')
    const updater = debounce((value) => {
      try {
        Object.assign(active.value, JSON.parse(value))
      } catch {
        //
      }
    }, 1000)

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

            code.value = JSON.stringify(
              Object.assign({}, json, { model: undefined })
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
      code,
      updater,
    }
  },
  methods: {
    onSetup({ datasource }: any) {
      datasource('rawdata', ({ define }: any) => {
        const { data } = define()

        return data
      })
    },
    onCodeChange(value: string) {
      this.updater(value)
    },
  },
})
</script>
