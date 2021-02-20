# 配置

## 概览

在了解配置之前需要先用一组示例代码表示一下 `json2render` 使用上的一些重要特征

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
      // 定义数据源
      datasource: {
        // 定义一个具有http请求的数据来源，在界面渲染后自动发起请求获取数据
        listdata: { type: 'fetch', url: '/data.json', auto: true },
      },
      // 初始化的数据，以及用于内部交互的数据
      model: {
        text: '',
      },
      // 要渲染的组件定义
      fields: [
        { component: 'p', text: 'Hello' },
        {
          component: 'input',
          value: 'model.text',
          props: { placeholder: '请输入' },
        },
        { component: 'p', text: 'Hello', props: { style: 'color: red' } },
        {
          component: 'button',
          text: 'click',
          props: {
            type: 'button',
            // 如果不是存储的配置，可以直接用函数
            onClick: () => {
              alert('Hello')
            },
          },
        },
      ],
    }
  },
})
</script>
```

## 组件相关

#### modelValue (Object)

动态渲染的组件成员使用的数据以及对外输出的数据，可通过传入值实现数据初始化或整体变更数据

#### fields (Array)

用于动态渲染的组件集合，`json2render` 会渲染什么样的视图以及支持的操作全在这个属性里定义

#### datasource (Object)

组件内部可使用的额外数据来源，和插件定义的数据源相对应

#### listeners (Array)

对数据的监听集合，定义 `listeners` 可实现监听组件内各种数据，在数据变化后触发一组操作实现联动

#### setup (Function)

组件初始化的事件，在事件中可以单独引用插件或者实现自定义功能，关于如何自定义请参考高级用法

## 组件集合定义

组件 `fields` 属性是一个数组，成员具有如下基本属性

#### component (String)

表示组件的名称，任何 html 标签、组件库组件或自定义组件的名称都可以作为该属性值

::: tip
如果是组件库或者是自定义组件，至少要保证在当前项目中是可用的，就是说要先引用相关组件
:::

#### props (Object)

定义组件属性，组件所有属性都在这里定义

在 vue2 版本中 vue 渲染调用的 createElement 方法的第二个参数是一个对象，定义了组件的相关属性，这些属性还分 `attrs` `props` `domProps` `on` `nativeOn` 等等，在 vue3 中这种定义得到了改善，无论是 html 元素还是 vue 组件属性一律定义在一个对象中，事件也通过名称加上 `on` 前缀来表示，因此这里的 `props` 就是表示该组件的所有属性及事件的定义，具体看 vue3 关于此处的[概念描述](https://www.vue3js.cn/docs/zh/api/global-api.html#%E5%8F%82%E6%95%B0-2)

::: tip
props 里该写什么值可参考对应 html 元素的属性和相关组件库里组件定义的属性
:::

#### options (Object)

是一个预留的属性，用于定义一些额外的选项，一般用不到

## 监听定义

监听的作用是为了响应数据的变化，触发一组联动操作，比如当遇到级联选项的情况，在了解监听的用法之前最好先了解一下[属性表达式](/json-to-render/guide/prop-transform.html)的用法
