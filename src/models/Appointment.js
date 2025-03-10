/**
 * 预约模型
 * 对应数据库中的Appointments表
 */

import Car from './Car';
import Dealer from './Dealer';
import User from './User';

export default class Appointment {
  constructor({
    appointment_id = null,
    user_id = null,
    dealer_id = null,
    car_id = null,
    appointment_time = new Date(),
    message = '',
    status = 0, // 0: 待处理, 1: 已确认, 2: 已完成, 3: 已取消
    create_time = new Date(),
    update_time = null,
    // 扩展字段
    car = null,
    user = null,
    dealer = null
  } = {}) {
    this.appointment_id = appointment_id;
    this.user_id = user_id;
    this.dealer_id = dealer_id;
    this.car_id = car_id;
    this.appointment_time = appointment_time instanceof Date ? appointment_time : new Date(appointment_time);
    this.message = message;
    this.status = status;
    this.create_time = create_time instanceof Date ? create_time : new Date(create_time);
    this.update_time = update_time ? (update_time instanceof Date ? update_time : new Date(update_time)) : null;
    
    // 关联对象
    this.car = car instanceof Car ? car : (car ? new Car(car) : null);
    this.user = user instanceof User ? user : (user ? new User(user) : null);
    this.dealer = dealer instanceof Dealer ? dealer : (dealer ? new Dealer(dealer) : null);
  }

  // 判断预约是否待处理
  isPending() {
    return this.status === 0;
  }

  // 判断预约是否已确认
  isConfirmed() {
    return this.status === 1;
  }

  // 判断预约是否已完成
  isCompleted() {
    return this.status === 2;
  }

  // 判断预约是否已取消
  isCancelled() {
    return this.status === 3;
  }

  // 获取状态文本描述
  getStatusText() {
    const statusMap = {
      0: '待处理',
      1: '已确认',
      2: '已完成',
      3: '已取消'
    };
    return statusMap[this.status] || '未知状态';
  }

  // 格式化预约时间
  getFormattedAppointmentTime() {
    if (!this.appointment_time) return '';
    
    const date = this.appointment_time;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
} 