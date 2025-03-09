/**
 * 用户状态管理文件
 * 
 * 使用Pinia实现的用户状态管理，包含以下功能：
 * 1. 用户信息管理：
 *    - 用户ID、用户名
 *    - 权限等级
 *    - 登录令牌(token)
 * 
 * 2. 状态持久化：
 *    - 自动保存到localStorage
 *    - 页面刷新后自动恢复状态
 * 
 * 3. 用户权限相关：
 *    - 获取用户权限等级
 *    - 判断登录状态
 *    - 获取用户角色名称
 */

import { PERMISSION_LEVELS } from '../config/permission'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: null,
      username: '',
      level: PERMISSION_LEVELS.VISITOR,
      token: ''
    }
  }),

  actions: {
    // 设置用户信息
    setUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info }
      // 保存到localStorage
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },

    // 清除用户信息
    clearUserInfo() {
      this.userInfo = {
        id: null,
        username: '',
        level: PERMISSION_LEVELS.VISITOR,
        token: ''
      }
      localStorage.removeItem('userInfo')
    },

    // 初始化用户信息（从localStorage加载）
    initUserInfo() {
      const savedInfo = localStorage.getItem('userInfo')
      if (savedInfo) {
        this.userInfo = JSON.parse(savedInfo)
      }
    }
  },

  getters: {
    // 获取当前用户权限等级
    permissionLevel: (state) => state.userInfo.level,
    
    // 判断是否已登录
    isLoggedIn: (state) => !!state.userInfo.token,
    
    // 获取用户角色名称
    roleName: (state) => {
      switch (state.userInfo.level) {
        case PERMISSION_LEVELS.ADMIN:
          return '管理员'
        case PERMISSION_LEVELS.DEALER:
          return '经销商'
        case PERMISSION_LEVELS.USER:
          return '用户'
        default:
          return '访客'
      }
    }
  }
}) 