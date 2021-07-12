import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Test from '../views/Test'
import Home from '../views/Home'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Test',
  //   component: Test,
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/element',
    name: 'Element',
    component: () => import('../views/Element.vue'),
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('../views/Tabs'),
  },
  {
    path: '/designer',
    name: 'Designer',
    component: () => import('../views/Designer'),
  },
  {
    path: '/yaml',
    name: 'Yaml',
    component: () => import('../views/Yaml'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
