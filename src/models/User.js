/**
 * 用户模型
 * 对应数据库中的Users表
 */
export default class User {
  constructor({
    user_id = null,
    username = '',
    password = '',
    email = '',
    phone = '',
    real_name = '',
    id_card = '',
    role = 1, // 1: 普通用户, 2: 经销商, 3: 管理员
    register_time = new Date(),
    last_login_time = null,
    status = 1, // 1: 正常, 0: 禁用
    avatar = ''
  } = {}) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.real_name = real_name;
    this.id_card = id_card;
    this.role = role;
    this.register_time = register_time instanceof Date ? register_time : new Date(register_time);
    this.last_login_time = last_login_time ? (last_login_time instanceof Date ? last_login_time : new Date(last_login_time)) : null;
    this.status = status;
    this.avatar = avatar;
  }

  // 判断用户是否为经销商
  isDealer() {
    return this.role === 2;
  }

  // 判断用户是否为管理员
  isAdmin() {
    return this.role === 3;
  }

  // 判断用户账号是否正常
  isActive() {
    return this.status === 1;
  }

  // 获取用户姓名或用户名
  getDisplayName() {
    return this.real_name || this.username;
  }
} 