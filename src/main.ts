import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-plus'

import JRender from '@json2render/vue'
import classics from '@json2render/plugin-classics'
import modern from '@json2render/plugin-modern'

JRender.use(classics)
JRender.use(modern)

import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).use(Element).use(JRender).mount('#app')
