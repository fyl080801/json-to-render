import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-plus'

import jRender from '@jrender/vue/index'

import 'element-plus/lib/theme-chalk/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Element)
  .use(jRender)
  .mount('#app')
