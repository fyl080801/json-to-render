import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/element',
    name: 'Element',
    component: () =>
      import(/* webpackChunkName: "element" */ '../views/Element'),
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import(/* webpackChunkName: "tabs" */ '../views/Tabs'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
