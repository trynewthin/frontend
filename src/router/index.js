/**
 * 路由配置文件
 * 
 * 该文件配置了应用的路由系统，包括：
 * 1. 路由定义：所有页面路由的配置，包括路径、组件和元数据
 * 2. 权限控制：通过路由守卫实现基于用户权限的访问控制
 * 3. 页面标题：自动设置每个页面的标题
 * 
 * 路由守卫功能：
 * - 检查用户访问权限
 * - 无权限时重定向到404页面
 * - 设置动态页面标题
 */

import { createRouter, createWebHistory } from 'vue-router'

import { APP_CONFIG } from '../config/app.config'
import NotFound from '../views/NotFound.vue'
import { hasPermission } from '../config/permission'
import { useUserStore } from '../store/user'

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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 检查用户是否有权限访问目标页面
  if (!hasPermission(to.path, userStore.permissionLevel)) {
    next({ name: 'NotFound' })
    return
  }
  
  // 设置页面标题
  document.title = `${to.meta.title} - ${APP_CONFIG.APP_NAME}`
  
  next()
})

export default router 