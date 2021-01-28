import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-plus'

import jRender from '@json-to-render/vue'
import classics from '@json-to-render/plugin-classics'

jRender.use(classics)

import 'element-plus/lib/theme-chalk/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Element)
  .use(jRender)
  .mount('#app')
