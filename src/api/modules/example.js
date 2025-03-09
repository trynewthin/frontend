/**
 * 示例数据API
 */

import request from '../request'

export const exampleApi = {
  // 获取列表数据
  getList: (params) => {
    return request.get('/examples', { params })
  },
  
  // 获取详情
  getDetail: (id) => {
    return request.get(`/examples/${id}`)
  },
  
  // 创建数据
  create: (data) => {
    return request.post('/examples', data)
  },
  
  // 更新数据
  update: (id, data) => {
    return request.put(`/examples/${id}`, data)
  },
  
  // 删除数据
  delete: (id) => {
    return request.delete(`/examples/${id}`)
  }
} 