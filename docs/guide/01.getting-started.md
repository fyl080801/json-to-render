# 快速上手

通过 npm 安装

```bash
npm i @json2render/vue-full
```

实现一个简单示例

main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import JRender from '@json2render/vue-full'

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
        { component: 'input', value: 'model.text1' },
      ],
    }
  },
})
</script>
```
