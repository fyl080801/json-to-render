import { createApp } from 'vue'
import App from './App'
import router from './router'
import Element from 'element-plus'
// import AntDesign from 'ant-design-vue'

import JRender from '@json2render/vue-full'

import 'element-plus/lib/theme-chalk/index.css'
// import 'ant-design-vue/dist/antd.css'

import JsonEditor from './components/JsonEditor'

createApp(App)
  .use(router)
  .use(Element)
  // .use(AntDesign)
  .use(JRender)
  .component(JsonEditor.name, JsonEditor)
  .mount('#app')
