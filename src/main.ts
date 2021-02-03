import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-plus'

import { plugin } from '@json-to-render/vue'
import { classics } from '@json-to-render/plugin-classics'
import { modern } from '@json-to-render/plugin-modern'

plugin.use(classics)
plugin.use(modern)

import 'element-plus/lib/theme-chalk/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Element)
  .use(plugin)
  .mount('#app')
