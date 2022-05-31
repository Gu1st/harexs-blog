import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/blog/home/index.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/blog/error/index.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由全局前置守卫
router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
})
//路由全局后置守卫
router.afterEach((to, from) => {
  // console.log('路由全局后置守卫', to, from);
})

export default router
