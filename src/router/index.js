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
import { PERMISSION_LEVELS } from '../config/permission'
import { useUserStore } from '../store/user'

// 路由配置
const routes = [
  // 访客主路由 - 所有人可访问
  {
    path: '/',
    name: 'VisitorHome',
    component: () => import('../views/VisitorHome.vue'),
    meta: {
      title: APP_CONFIG.PAGE_TITLES.HOME,
      requiredPermission: PERMISSION_LEVELS.VISITOR
    },
    children: [
      {
        path: 'visitor/search',
        name: 'CarSearch',
        component: () => import('../views/Home.vue'), // 这里应该是真实的搜索组件
        meta: {
          title: '汽车搜索',
          requiredPermission: PERMISSION_LEVELS.VISITOR
        }
      },
      {
        path: 'visitor/popular',
        name: 'PopularCars',
        component: () => import('../views/Home.vue'), // 这里应该是真实的热门车辆组件
        meta: {
          title: '热门车型',
          requiredPermission: PERMISSION_LEVELS.VISITOR
        }
      }
    ]
  },
  
  // 普通用户主路由
  {
    path: '/user',
    name: 'UserHome',
    component: () => import('../views/user/UserHome.vue'),
    meta: {
      title: '用户中心',
      requiredPermission: PERMISSION_LEVELS.USER
    },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('../views/Home.vue'), // 这里应该是真实的用户资料组件
        meta: {
          title: '个人资料',
          requiredPermission: PERMISSION_LEVELS.USER
        }
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../views/Home.vue'), // 这里应该是真实的订单组件
        meta: {
          title: '我的订单',
          requiredPermission: PERMISSION_LEVELS.USER
        }
      },
      {
        path: 'favorites',
        name: 'UserFavorites',
        component: () => import('../views/Home.vue'), // 这里应该是真实的收藏组件
        meta: {
          title: '我的收藏',
          requiredPermission: PERMISSION_LEVELS.USER
        }
      }
    ]
  },
  
  // 经销商主路由
  {
    path: '/dealer',
    name: 'DealerHome',
    component: () => import('../views/dealer/DealerHome.vue'),
    meta: {
      title: '经销商中心',
      requiredPermission: PERMISSION_LEVELS.DEALER
    },
    children: [
      {
        path: 'vehicles',
        name: 'DealerVehicles',
        component: () => import('../views/Home.vue'), // 这里应该是真实的车辆管理组件
        meta: {
          title: '车辆管理',
          requiredPermission: PERMISSION_LEVELS.DEALER
        }
      },
      {
        path: 'orders',
        name: 'DealerOrders',
        component: () => import('../views/Home.vue'), // 这里应该是真实的订单管理组件
        meta: {
          title: '订单管理',
          requiredPermission: PERMISSION_LEVELS.DEALER
        }
      },
      {
        path: 'customers',
        name: 'DealerCustomers',
        component: () => import('../views/Home.vue'), // 这里应该是真实的客户管理组件
        meta: {
          title: '客户管理',
          requiredPermission: PERMISSION_LEVELS.DEALER
        }
      }
    ]
  },
  
  // 管理员主路由
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('../views/admin/AdminHome.vue'),
    meta: {
      title: '管理员控制台',
      requiredPermission: PERMISSION_LEVELS.ADMIN
    },
    children: [
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/Home.vue'), // 这里应该是真实的用户管理组件
        meta: {
          title: '用户管理',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      },
      {
        path: 'dealers',
        name: 'AdminDealers',
        component: () => import('../views/Home.vue'), // 这里应该是真实的经销商管理组件
        meta: {
          title: '经销商管理',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('../views/Home.vue'), // 这里应该是真实的系统设置组件
        meta: {
          title: '系统设置',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      },
      {
        path: 'content',
        name: 'AdminContent',
        component: () => import('../views/Home.vue'), // 这里应该是真实的内容管理组件
        meta: {
          title: '内容管理',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      },
      {
        path: 'statistics',
        name: 'AdminStatistics',
        component: () => import('../views/Home.vue'), // 这里应该是真实的数据统计组件
        meta: {
          title: '数据统计',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      },
      {
        path: 'monitor',
        name: 'AdminMonitor',
        component: () => import('../views/Home.vue'), // 这里应该是真实的系统监控组件
        meta: {
          title: '系统监控',
          requiredPermission: PERMISSION_LEVELS.ADMIN
        }
      }
    ]
  },
  
  // 登录/注册页面 - 所有人可访问
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Home.vue'), // 这里应该是真实的登录组件
    meta: {
      title: '用户登录',
      requiredPermission: PERMISSION_LEVELS.VISITOR
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Home.vue'), // 这里应该是真实的注册组件
    meta: {
      title: '用户注册',
      requiredPermission: PERMISSION_LEVELS.VISITOR
    }
  },
  
  // 404页面 - 处理所有未匹配路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取用户状态
  const userStore = useUserStore()
  userStore.initUserInfo()
  
  // 特殊处理404页面
  if (to.name === 'NotFound') {
    document.title = `${to.meta.title || '404'} - ${APP_CONFIG.APP_NAME}`
    next()
    return
  }
  
  // 如果是访客权限页面或登录/注册页面，直接通过
  if (to.meta.requiredPermission === PERMISSION_LEVELS.VISITOR) {
    document.title = `${to.meta.title || 'Page'} - ${APP_CONFIG.APP_NAME}`
    next()
    return
  }
  
  // 权限检查
  if (to.meta.requiredPermission && userStore.permissionLevel < to.meta.requiredPermission) {
    // 无权限，转到首页
    next({ path: '/' })
    return
  }
  
  // 设置页面标题并允许访问
  document.title = `${to.meta.title || 'Page'} - ${APP_CONFIG.APP_NAME}`
  next()
})

export default router 