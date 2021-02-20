# 使用组件

## 引用组件

在 vue3 下全局引用组件

```javascript
import { createApp } from 'vue'
import JRender from 'json2render/vue-full'

createApp({}).use(JRender).mount('#app')
```

在组件中单独引用

```vue
<template>
  <j-render></j-render>
</template>

<script>
import JRender from 'json2render/vue-full'

export default {
  components: { JRender },
}
</script>
```

在 vue 中可以通过引用 `json2render/vue-full` 或 `json2render/vue` 两个库，区别是 `json2render/vue-full` 包含了全部插件功能而 `json2render/vue`
只包含核心渲染功能不包含插件

::: tip
插件是 `json2render` 一系列扩展功能，使组件支持更多的渲染方式
:::

## 引用插件

插件引用分为全局方式和局部方式

全局方式引用插件后项目中所有用到 `json2render` 组件的地方都会启用该插件提供的功能

```javascript {3,5}
import { createApp } from 'vue'
import JRender from 'json2render/vue'
import Classics from 'json2render/plugin-classics'

JRender.use(Classics)

createApp({}).use(JRender).mount('#app')
```

局部方式引用是只有当前引用该插件的组件才会启用该插件提供的功能

```vue {7,12,13,14}
<template>
  <j-render @setup="onSetup"></j-render>
</template>

<script>
import JRender from 'json2render/vue'
import Classics from 'json2render/plugin-classics'

export default {
  components: { JRender },
  methods: {
    onSetup(services) {
      Classics(services)
    },
  },
}
</script>
```
