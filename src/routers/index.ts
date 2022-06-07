import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '../utils/token'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import('../layouts/blog/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/blog/home/index.vue')
      },
      {
        path: '/category/:id',
        name: 'category',
        component: () => import('../views/blog/category/index.vue')
      },
      {
        path: '/search/:content',
        name: 'search',
        component: () => import('../views/blog/search/index.vue')
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/blog/article/index.vue')
      }
    ]
  },
  {
    path: '/root',
    name: 'root',
    redirect: '/root/dashboard',
    component: () => import('../layouts/root/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'root_dashboard',
        component: () => import('../views/root/dashboard/index.vue')
      },
      {
        path: 'category',
        name: 'root_category',
        component: () => import('../views/root/category/index.vue')
      },
      {
        path: 'comment',
        name: 'root_comment',
        component: () => import('../views/root/comment/index.vue')
      },
      {
        path: 'article',
        name: 'root_article',
        component: () => import('../views/root/article/index.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: () => import('../views/login/index.vue') },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/blog/error/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由全局前置守卫
router.beforeEach(async (to, from) => {
  if (to.fullPath.includes('root')) {
    const token = getToken()
    if (!token) {
      window.$message.error('当前身份无权限访问')
      console.log(from)
      if (from.path === '/') {
        setTimeout(() => {
          window.location.href = window.location.origin
        }, 1000)
      }
      return false
    }
    //如果token存在则去验证后再进行跳转 暂时用不到 后端来验证token
    // const res = await store.verify(token)
    // if (res) {
    //   return true
    // } else {
    //   window.$message.error('当前身份无权限访问')
    //   return false
    // }
  }
  return true
})
// //路由全局后置守卫
// router.afterEach((to, from) => {
//   console.log('路由全局后置守卫', to, from);
// })

export default router
