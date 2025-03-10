/**
 * 车辆模型
 * 对应数据库中的Cars表和CarDetails表
 */

import Dealer from './Dealer';

export default class Car {
  constructor({
    // Cars表字段
    car_id = null,
    dealer_id = null,
    brand = '',
    model = '',
    year = new Date().getFullYear(),
    price = 0,
    category = '',
    status = 1, // 1: 在售, 2: 已售, 0: 下架
    create_time = new Date(),
    update_time = null,
    
    // CarDetails表字段
    detail_id = null,
    engine = '',
    transmission = '',
    fuel_type = '',
    mileage = 0,
    color = '',
    seats = 5,
    drive_type = '',
    condition = '新车', // 新车或二手车
    description = '',
    features = '',
    
    // 扩展字段
    dealer = null,
    images = [],
    mainImage = ''
  } = {}) {
    // Cars表字段
    this.car_id = car_id;
    this.dealer_id = dealer_id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.price = price;
    this.category = category;
    this.status = status;
    this.create_time = create_time instanceof Date ? create_time : new Date(create_time);
    this.update_time = update_time ? (update_time instanceof Date ? update_time : new Date(update_time)) : null;
    
    // CarDetails表字段
    this.detail_id = detail_id;
    this.engine = engine;
    this.transmission = transmission;
    this.fuel_type = fuel_type;
    this.mileage = mileage;
    this.color = color;
    this.seats = seats;
    this.drive_type = drive_type;
    this.condition = condition;
    this.description = description;
    this.features = features;
    
    // 扩展字段
    this.dealer = dealer instanceof Dealer ? dealer : (dealer ? new Dealer(dealer) : null);
    this.images = images || [];
    this.mainImage = mainImage || (this.images.length > 0 ? this.images[0] : '');
  }

  // 判断车辆是否在售
  isForSale() {
    return this.status === 1;
  }

  // 判断车辆是否已售
  isSold() {
    return this.status === 2;
  }

  // 判断车辆是否下架
  isOffShelf() {
    return this.status === 0;
  }

  // 获取状态文本描述
  getStatusText() {
    const statusMap = {
      0: '已下架',
      1: '在售',
      2: '已售'
    };
    return statusMap[this.status] || '未知状态';
  }

  // 获取车辆完整名称
  getFullName() {
    return `${this.year}年 ${this.brand} ${this.model}`;
  }

  // 获取价格显示文本
  getPriceText() {
    return `¥${(this.price / 10000).toFixed(2)}万`;
  }

  // 获取车辆特性数组
  getFeaturesList() {
    return this.features ? this.features.split(',').map(item => item.trim()) : [];
  }
} 