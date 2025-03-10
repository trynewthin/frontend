/**
 * 经销商模型
 * 对应数据库中的Dealers表
 */

import User from './User';

export default class Dealer {
  constructor({
    dealer_id = null,
    user_id = null,
    dealer_name = '',
    address = '',
    business_license = '',
    contact_person = '',
    contact_phone = '',
    status = 0, // 0: 待审核, 1: 已通过, 2: 已拒绝
    description = '',
    user = null
  } = {}) {
    this.dealer_id = dealer_id;
    this.user_id = user_id;
    this.dealer_name = dealer_name;
    this.address = address;
    this.business_license = business_license;
    this.contact_person = contact_person;
    this.contact_phone = contact_phone;
    this.status = status;
    this.description = description;
    this.user = user instanceof User ? user : (user ? new User(user) : null);
  }

  // 判断经销商是否已通过审核
  isApproved() {
    return this.status === 1;
  }

  // 判断经销商是否待审核
  isPending() {
    return this.status === 0;
  }

  // 判断经销商是否被拒绝
  isRejected() {
    return this.status === 2;
  }

  // 获取状态文本描述
  getStatusText() {
    const statusMap = {
      0: '待审核',
      1: '已通过',
      2: '已拒绝'
    };
    return statusMap[this.status] || '未知状态';
  }
} 