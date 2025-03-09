/**
 * 用户相关API
 */

import request from '../request'

export const userApi = {
  // 用户登录
  login: (username, password) => {
    return request.post('/auth/login', { username, password })
  },
  
  // 获取用户信息
  getUserInfo: () => {
    return request.get('/user/info')
  },
  
  // 用户登出
  logout: () => {
    return request.post('/auth/logout')
  }
} 