# Json to Render

将 json 数据渲染成界面的 vue 组件库，是根据 [vjform 动态表单](https://github.com/fyl080801/vjform)、[jformer 动态表单](https://github.com/fyl080801/jformer) 以及[vjdesign 设计器](https://github.com/fyl080801/vjdesign) 相关项目开发的 vue3 版本

## 特性

- 将 json 数据渲染成界面
- 基于 vue3 开发
- 支持任何 html 组件和 vue 项目中引用的组件进行渲染，支持组件任何属性
- 支持将 json 数据特殊对象转换成数据关联关系实现联动
- 支持二次开发 json 属性解析方式、数据交互来源与渲染逻辑

## 快速上手

使用 npm 安装

```bash
npm i @json2render/vue @json2render/plugin-classics @json2render/plugin-modern
```

实现一个简单示例

main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import JRender from '@json2render/vue'
import classics from '@json2render/plugin-classics'
import modern from '@json2render/plugin-modern'

JRender.use(classics)
JRender.use(modern)

createApp(App).use(JRender).mount('#app')
```

App.vue

```vue
<template>
  <div>
    <v-jrender v-model="model" :fields="fields" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      model: { text1: 'Hello world!!' },
      fields: [
        { component: 'p', text: '$:model.text1' },
        { component: 'input', model: 'model.text1' },
      ],
    }
  },
})
</script>
```

更细节的说明之后更新...
