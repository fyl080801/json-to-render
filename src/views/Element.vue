<script lang="ts" setup>
import { reactive } from 'vue'
import elementPlugin from '@json2render/plugin-elementui'

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
  remotedata: {
    type: 'fetch',
    url: '/data/listdata.json',
    auto: false,
    props: { method: 'GET', params: {} },
  },
})

const listeners = reactive([
  {
    watch: '$:model.selected',
    actions: [
      { handler: '@model.checks:[`select ${model.selected+1}`]' },
      { handler: '@:model.selected && remotedata.request()' },
    ],
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
      { component: 'slot', props: { name: 'header' } },
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
        options: {
          component: 'el-checkbox',
          items: '$:raw.options',
        },
      },
      {
        component: 'el-select',
        model: 'model.remoteselect',
        col: { span: 12 },
        form: { label: 'selected' },
        options: {
          component: 'el-option',
          valueProp: 'name',
          labelProp: 'name',
          items: '$:remotedata.data',
        },
      },
      {
        component: 'slot',
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
    return options.data
  })
}
</script>

<template>
  <div>
    <v-jrender
      v-model="data"
      :fields="fields"
      :datasource="datasource"
      :listeners="listeners"
      class="j-form"
      @setup="onSetup"
    />
  </div>
</template>
