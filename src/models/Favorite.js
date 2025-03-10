/**
 * 收藏模型
 * 对应数据库中的Favorites表
 */

import Car from './Car';
import User from './User';

export default class Favorite {
  constructor({
    favorite_id = null,
    user_id = null,
    car_id = null,
    create_time = new Date(),
    // 扩展字段
    car = null,
    user = null
  } = {}) {
    this.favorite_id = favorite_id;
    this.user_id = user_id;
    this.car_id = car_id;
    this.create_time = create_time instanceof Date ? create_time : new Date(create_time);
    
    // 关联对象
    this.car = car instanceof Car ? car : (car ? new Car(car) : null);
    this.user = user instanceof User ? user : (user ? new User(user) : null);
  }
} 