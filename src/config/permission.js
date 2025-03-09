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

// 页面权限配置
export const PAGE_PERMISSIONS = {
  '/': PERMISSION_LEVELS.VISITOR,           // 首页对所有人开放
  '/login': PERMISSION_LEVELS.VISITOR,      // 登录页对所有人开放
  '/register': PERMISSION_LEVELS.VISITOR,   // 注册页对所有人开放
  '/user/profile': PERMISSION_LEVELS.USER,  // 用户资料页需要用户权限
  '/dealer/dashboard': PERMISSION_LEVELS.DEALER, // 经销商仪表盘需要经销商权限
  '/admin/settings': PERMISSION_LEVELS.ADMIN     // 管理设置需要管理员权限
}

// 检查用户是否有权限访问特定页面
export function hasPermission(targetPath, userLevel) {
  const requiredLevel = PAGE_PERMISSIONS[targetPath] || PERMISSION_LEVELS.ADMIN
  return userLevel >= requiredLevel
} 