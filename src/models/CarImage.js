/**
 * 车辆图片模型
 * 对应数据库中的CarImages表
 */
export default class CarImage {
  constructor({
    image_id = null,
    car_id = null,
    image_url = '',
    is_main = 0, // 0: 普通图片, 1: 主图
    order_num = 0,
    create_time = new Date()
  } = {}) {
    this.image_id = image_id;
    this.car_id = car_id;
    this.image_url = image_url;
    this.is_main = is_main;
    this.order_num = order_num;
    this.create_time = create_time instanceof Date ? create_time : new Date(create_time);
  }

  // 判断是否为主图
  isMainImage() {
    return this.is_main === 1;
  }

  // 获取图片完整URL路径（如果需要添加域名前缀）
  getFullUrl(baseUrl = '') {
    if (!this.image_url) return '';
    
    // 如果图片URL已经是完整路径，则直接返回
    if (this.image_url.startsWith('http://') || this.image_url.startsWith('https://')) {
      return this.image_url;
    }
    
    // 否则添加baseUrl前缀
    return `${baseUrl}${this.image_url}`;
  }
} 