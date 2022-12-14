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
        path: '/label',
        name: 'label',
        meta: {
          title: '标签页'
        },
        component: () => import('../views/blog/label/index.vue')
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
router.beforeEach(async to => {
  if (to.meta) {
    document.title = `Harexs's Blog` + ' - ' + (to.meta.title as string);
  }
  //  如果要去后台则对token进行验证 6.13 将会话存储为本地存储
  if (to.fullPath.includes('root')) {
    const token = getToken();
    //token不存在则直接失败返回
    if (!token) {
      window.$message.error('当前身份无权限访问');
      return false;
    } else {
      return true;
      //如果token存在则去验证后再进行跳转 废弃 直接跳转 验证交给后端
      // const res = await store.verify(token)
      // if (res) {
      //   return true
      // } else {
      //   window.$message.error('当前身份已过期，请重新登录');
      //   return false
      // }
    }
  }
  return true;
});
//路由全局后置守卫
// router.afterEach(() => {

// });

export default router;
