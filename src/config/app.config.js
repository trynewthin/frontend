// 从环境变量中获取配置
export const APP_CONFIG = {
  // 应用基本信息
  APP_NAME: import.meta.env.VITE_APP_TITLE || '智选车系统',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // API配置
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api',
  
  // 基础URL配置
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:8090',
  
  // 图片资源配置
  IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:8090/images',
  
  // 开发模式配置
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  API_MOCK: import.meta.env.VITE_API_MOCK === 'true',
  
  // 公司信息
  COMPANY: {
    NAME: '智选车',
    EMAIL: 'info@zhixuanche.com',
    PHONE: '+86 10 12345678',
    ADDRESS: '北京市海淀区中关村大街XX号',
    COPYRIGHT: `智选车 © ${new Date().getFullYear()}`
  },

  // 页面标题
  PAGE_TITLES: {
    HOME: '首页',
    ABOUT: '关于我们',
    NOT_FOUND: '页面不存在',
    SETTINGS: '系统设置',
    PROFILE: '个人资料'
  },

  // 菜单配置
  MENU_ITEMS: [
    { 
      title: '首页', 
      icon: 'home', 
      path: '/' 
    },
    { 
      title: '关于我们', 
      icon: 'info', 
      path: '/about' 
    }
  ]
} 