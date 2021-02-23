import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-plus'

import JRender from '@json2render/vue-full'

import 'element-plus/lib/theme-chalk/index.css'

import JsonEditor from './components/JsonEditor'

createApp(App)
  .use(router)
  .use(Element)
  .use(JRender)
  .component(JsonEditor.name, JsonEditor)
  .mount('#app')
