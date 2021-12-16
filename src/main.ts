import Vue from "vue";
import CompositionApi from "@vue/composition-api";
import App from "./App.vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(CompositionApi);
Vue.use(Element);

new Vue({
  render: (h) => h(App as any),
}).$mount("#app");
