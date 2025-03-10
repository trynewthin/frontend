/**
 * 权限控制配置文件
 * 
 * 该文件定义了系统的权限等级、页面访问权限配置以及权限检查方法
 * - PERMISSION_LEVELS：定义系统中的权限等级（访客、用户、经销商、管理员）
 * - PAGE_PERMISSIONS：配置每个路由路径所需的最低权限等级
 * - hasPermission：检查用户是否有权限访问特定页面的工具函数
 */

// 权限等级定义
export const PERMISSION_LEVELS = {
  VISITOR: 0,    // 访客
  USER: 1,       // 用户
  DEALER: 2,     // 经销商
  ADMIN: 3       // 管理员
}

// 页面权限配置 - 注意：现在主要通过路由的meta.requiredPermission设置权限
export const PAGE_PERMISSIONS = {
  // 访客可访问页面
  '/': PERMISSION_LEVELS.VISITOR,           // 首页对所有人开放
  '/login': PERMISSION_LEVELS.VISITOR,      // 登录页对所有人开放
  '/register': PERMISSION_LEVELS.VISITOR,   // 注册页对所有人开放
  '/visitor/search': PERMISSION_LEVELS.VISITOR, // 汽车搜索
  '/visitor/popular': PERMISSION_LEVELS.VISITOR, // 热门车型
  
  // 用户可访问页面
  '/user': PERMISSION_LEVELS.USER,          // 用户主页
  '/user/profile': PERMISSION_LEVELS.USER,  // 用户资料页
  '/user/orders': PERMISSION_LEVELS.USER,   // 用户订单页
  '/user/favorites': PERMISSION_LEVELS.USER, // 用户收藏页
  
  // 经销商可访问页面
  '/dealer': PERMISSION_LEVELS.DEALER,      // 经销商主页
  '/dealer/vehicles': PERMISSION_LEVELS.DEALER, // 车辆管理
  '/dealer/orders': PERMISSION_LEVELS.DEALER, // 订单管理
  '/dealer/customers': PERMISSION_LEVELS.DEALER, // 客户管理
  
  // 管理员可访问页面
  '/admin': PERMISSION_LEVELS.ADMIN,        // 管理员主页
  '/admin/users': PERMISSION_LEVELS.ADMIN,  // 用户管理
  '/admin/dealers': PERMISSION_LEVELS.ADMIN, // 经销商管理
  '/admin/settings': PERMISSION_LEVELS.ADMIN, // 系统设置
  '/admin/content': PERMISSION_LEVELS.ADMIN, // 内容管理
  '/admin/statistics': PERMISSION_LEVELS.ADMIN, // 数据统计
  '/admin/monitor': PERMISSION_LEVELS.ADMIN  // 系统监控
}

// 检查用户是否有权限访问特定页面
// 注意：主要在路由守卫中通过meta.requiredPermission检查，
// 此函数作为备用的权限检查方法
export function hasPermission(targetPath, userLevel) {
  // 获取路径对应的权限要求，默认为管理员权限
  const requiredLevel = PAGE_PERMISSIONS[targetPath] || PERMISSION_LEVELS.ADMIN
  // 返回用户是否有足够权限
  return userLevel >= requiredLevel
} 