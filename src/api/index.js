/**
 * API服务模块
 * 集中管理所有API请求
 */

import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：获取并设置token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，可能是token过期
          // 清除token并跳转到登录页
          localStorage.removeItem('token')
          // 如果使用了路由可以跳转到登录页
          // router.push('/login')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error(`请求错误: ${error.response.status}`)
      }
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      console.error('网络错误，无法连接到服务器')
    } else {
      // 请求设置时触发的错误
      console.error('请求错误:', error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * 用户相关API
 */
export const userApi = {
  // 用户登录
  login: (username, password) => {
    return api.post('/auth/login', { username, password })
  },
  
  // 获取用户信息
  getUserInfo: () => {
    return api.get('/user/info')
  },
  
  // 用户登出
  logout: () => {
    return api.post('/auth/logout')
  }
}

/**
 * 示例数据API
 */
export const exampleApi = {
  // 获取列表数据
  getList: (params) => {
    return api.get('/examples', { params })
  },
  
  // 获取详情
  getDetail: (id) => {
    return api.get(`/examples/${id}`)
  },
  
  // 创建数据
  create: (data) => {
    return api.post('/examples', data)
  },
  
  // 更新数据
  update: (id, data) => {
    return api.put(`/examples/${id}`, data)
  },
  
  // 删除数据
  delete: (id) => {
    return api.delete(`/examples/${id}`)
  }
}

// 导出API实例，方便直接使用
export default api 