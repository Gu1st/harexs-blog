import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getToken } from '../utils/token';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import('../layouts/blog/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('../views/blog/home/index.vue')
      },
      {
        path: '/category',
        name: 'category',
        meta: {
          title: '分类页'
        },
        component: () => import('../views/blog/category/index.vue')
      },
      {
        path: '/search/:content',
        name: 'search',
        meta: {
          title: '搜索页'
        },
        component: () => import('../views/blog/search/index.vue')
      },
      {
        path: '/article',
        name: 'article',
        meta: {
          title: '文章详情'
        },
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
        meta: {
          title: '后台首页'
        },
        component: () => import('../views/root/dashboard/index.vue')
      },
      {
        path: 'category',
        name: 'root_category',
        meta: {
          title: '分类管理'
        },
        component: () => import('../views/root/category/index.vue')
      },
      {
        path: 'comment',
        name: 'root_comment',
        meta: {
          title: '评论管理'
        },
        component: () => import('../views/root/comment/index.vue')
      },
      {
        path: 'article',
        name: 'root_article',
        meta: {
          title: '文章管理'
        },
        component: () => import('../views/root/article/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: () => import('../views/login/index.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404 Page'
    },
    component: () => import('../views/blog/error/index.vue')
  }
];

const router = createRouter({
  history: import.meta.env.VITE_ROUTERMODE === 'prod' ? createWebHistory() : createWebHashHistory(),
  routes
});

//路由全局前置守卫
router.beforeEach(async (to, from) => {
  if (to.meta) {
    document.title = `Gu1st's Blog` + ' - ' + (to.meta.title as string);
  }
  if (to.fullPath.includes('root')) {
    const token = getToken();
    if (!token) {
      window.$message.error('当前身份无权限访问');
      if (from.path === '/') {
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 1000);
      }
      return false;
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
  return true;
});
//路由全局后置守卫
// router.afterEach(() => {

// });

export default router;
