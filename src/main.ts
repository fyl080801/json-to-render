import { createApp } from 'vue'
import App from './App'
import router from './router'
import Element from 'element-plus'

// import JRender from '@json2render/vue-full'
import JRender from '@json2render/vue'

import 'element-plus/lib/theme-chalk/index.css'

import JsonEditor from './components/JsonEditor'

createApp(App)
  .use(router)
  .use(Element)
  .use(JRender)
  .component(JsonEditor.name, JsonEditor)
  .mount('#app')
