/**
 * Axios请求配置
 */

import { APP_CONFIG } from '@/config/app.config'
import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: APP_CONFIG.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
request.interceptors.request.use(
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
request.interceptors.response.use(
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

export default request 