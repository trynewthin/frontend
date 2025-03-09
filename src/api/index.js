/**
 * API统一导出
 */

import { exampleApi } from './modules/example'
import request from './request'
import { userApi } from './modules/user'

// 导出所有API模块
export {
  userApi,
  exampleApi
}

// 导出请求实例
export default request 