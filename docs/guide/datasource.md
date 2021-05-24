# 数据源

## 概念

数据源的意义就是数据的来源，是属性表达式里能够使用的数据，`json2render`

```vue
<template>
  <j-render
    v-model="model"
    :fields="fields"
    :datasource="datasource"
  ></j-render>
</template>

<script>
import { defineComponent } from 'vue'
import JRender from 'json2render/vue-full'

export default defineComponent({
  components: { JRender },
  setup() {
    return {
      datasource: {
        listdata: { type: 'fetch', url: '/data.json', auto: true },
      },
      model: {
        text: '',
      },
      fields: [
        {
          component: 'p',
          // 属性值是从 model 的 text 里获取，值发生变化显示也发生变化
          text: {
            $type: 'computed',
            $result: 'model.text',
          },
        },
        {
          component: 'input',
          props: {
            placeholder: '请输入',
            // 属性值是从 model 的 text 里获取，值发生变化显示也发生变化
            value: '$:model.text',
            // 事件里将第一个参数里的属性值更新到 model 的 text 属性里
            onInput: '@model.text:arguments[0].target.value',
          },
        },
        {
          component: 'p',
          // 属性值是数据源 listdata 的 data 属性转换成字符串
          text: '$:JSON.stringify(listdata.data)',
          props: { style: 'color: red' },
        },
      ],
    }
  },
})
</script>
```

## 数据源定义

`json2render` 支持 `model` `arguments` `scope` 三种数据来源

#### model

是组件 `modelValue` 属性传递过来的值

#### arguments

如果属性是一个事件，则 `arguments` 代表事件传过来的参数集合

#### scope

如果组件是由数组数据渲染出来的或者父级组件有值传递过来，`scope` 就作为当前数据项的引用

::: tip
类似 vue `scope-slot` 的作用
:::

## 自定义数据源

除了固定数据来源以外，可使用的数据也包括通过插件定义的或自定义的数据来源，具体参考[高级用法](/json-to-render/guide/setup.html)
