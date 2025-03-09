import { createRouter, createWebHistory } from 'vue-router'

import { APP_CONFIG } from '../config'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: APP_CONFIG.PAGE_TITLES.HOME
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: APP_CONFIG.PAGE_TITLES.ABOUT
    }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: APP_CONFIG.PAGE_TITLES.NOT_FOUND
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加身份验证逻辑
  // 例如检查用户是否已登录，有权访问该页面等
  
  // 设置页面标题
  document.title = `${to.meta.title} - ${APP_CONFIG.APP_NAME}`
  
  next()
})

export default router 