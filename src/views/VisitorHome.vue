<template>
  <q-page class="visitor-home">
    <!-- 顶部标题栏 - 渐变效果 -->
    <div class="header-bar">
      <div class="container">
        <div class="header-left">
          <h1 class="text-white q-my-none site-title">智选车</h1>
        </div>
        <div class="header-center">
          <q-input
            v-model="searchQuery"
            dense
            dark
            borderless
            placeholder="搜索品牌、车型"
            class="search-input"
          >
            <template v-slot:prepend>
              <q-icon name="search" size="20px" />
            </template>
          </q-input>
        </div>
        <div class="header-right">
          <q-btn flat text-color="white" label="登录" to="/login" class="q-mr-sm" />
          <q-btn outline text-color="white" label="注册" to="/register" />
        </div>
      </div>
    </div>

    <!-- 轮播推荐 - 占满宽度的顶部轮播 -->
    <div class="full-width-carousel">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        arrows
        infinite
        autoplay
        autoplay-timeout="5000"
        height="550px"
        class="full-width"
      >
        <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h3">智能汽车推荐</div>
            <div class="text-h6">基于AI的个性化推荐系统</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h3">新能源汽车专区</div>
            <div class="text-h6">探索未来出行方式</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h3">豪华车型展示</div>
            <div class="text-h6">尊享高端驾驶体验</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- 内容区域 - 车辆信息展示 -->
    <div class="q-pa-md content-section">
      <!-- 推荐车辆标题 -->
      <!-- 车辆筛选选项 -->
      <div class="filter-options q-py-xl">
        <div class="text-options">
          <span 
            v-for="option in [{label: '最新车型', value: 'latest'}, {label: '热门车型', value: 'popular'}]"
            :key="option.value"
            :class="['filter-text', { 'active': activeFilter === option.value }]"
            @click="activeFilter = option.value"
          >
            {{ option.label }}
          </span>
        </div>
      </div>
      
      <!-- 车辆卡片网格 -->
      <div class="row q-col-gutter-md q-py-md">
        <div 
          v-for="car in displayCars" 
          :key="car.id" 
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <car-card :car="car" @show-details="showCarDetails" />
        </div>
      </div>
      
      <!-- 加载更多按钮 -->
      <div class="text-center q-mt-xl q-mb-xl">
        <q-btn 
          class="load-more-btn"
          flat
          no-caps
          size="lg"
          icon-right="arrow_forward"
          label="查看更多车型"
        />
      </div>
      
      <!-- 车辆详情模态窗口 -->
      <car-detail-modal
        v-model="detailModalOpen"
        :car="selectedCar"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import CarCard from '../components/car/CarCard.vue'
import CarDetailModal from '../components/car/CarDetailModal.vue'

// 轮播图当前幻灯片
const slide = ref('first')

// 筛选和排序
const activeFilter = ref('latest')
const sortOption = ref({label: '默认排序', value: 'default'})

// 车辆详情模态窗口
const detailModalOpen = ref(false)
const selectedCar = ref({})

// 搜索相关
const searchQuery = ref('')

// 显示车辆详情
const showCarDetails = (car) => {
  selectedCar.value = car
  detailModalOpen.value = true
}

// 模拟车辆数据
const cars = [
  {
    car_id: '1',
    dealer_id: 101,
    dealer_name: '奔驰官方认证二手车',
    brand: '奔驰',
    model: 'C级 2023款',
    year: '2023',
    price: 35.88,
    category: '轿车',
    status: 1,
    details: {
      engine: '2.0T 涡轮增压',
      transmission: '9挡自动',
      fuel_type: '汽油',
      fuel_consumption: 6.2,
      seats: 5,
      color: '极地白',
      body_size: '4882mm×1810mm×1460mm',
      wheelbase: 2920,
      features: '全景天窗、自适应巡航、智能驾驶辅助、真皮座椅、电动座椅、座椅加热、多区域恒温空调、无钥匙进入/启动、LED大灯。',
      warranty: '厂家质保至2026年或10万公里，以先到者为准。'
    },
    images: [
      { image_id: 11, car_id: 1, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-01' },
      { image_id: 12, car_id: 1, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-01' },
      { image_id: 13, car_id: 1, image_type: '完整图2', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-01' },
      { image_id: 14, car_id: 1, image_type: '完整图3', image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', upload_time: '2023-01-01' }
    ]
  },
  {
    car_id: '2',
    dealer_id: 102,
    dealer_name: '宝马授权经销商',
    brand: '宝马',
    model: 'X5 2022款',
    year: '2022',
    price: 75.99,
    category: 'SUV',
    status: 1,
    details: {
      engine: '3.0T 直列六缸',
      transmission: '8挡手自一体',
      fuel_type: '汽油',
      fuel_consumption: 8.5,
      seats: 5,
      color: '矿石白',
      body_size: '4922mm×2004mm×1745mm',
      wheelbase: 2975,
      features: '全景天窗、四驱系统、自适应空气悬挂、哈曼卡顿音响、触控大屏、抬头显示、手势控制、真皮多功能方向盘、电动尾门。',
      warranty: '厂家质保至2025年或12万公里，以先到者为准。'
    },
    images: [
      { image_id: 21, car_id: 2, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-02' },
      { image_id: 22, car_id: 2, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-02' },
      { image_id: 23, car_id: 2, image_type: '完整图2', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-02' }
    ]
  },
  {
    car_id: '3',
    dealer_id: 103,
    dealer_name: '特斯拉直营店',
    brand: '特斯拉',
    model: 'Model 3',
    year: '2023',
    price: 29.99,
    category: '新能源',
    status: 1,
    details: {
      engine: '后置电机',
      transmission: '电动单速变速箱',
      fuel_type: '电动',
      fuel_consumption: 0,
      seats: 5,
      color: '珍珠白',
      body_size: '4694mm×1850mm×1443mm',
      wheelbase: 2875,
      features: '全景玻璃车顶、15英寸中控触控屏、无钥匙进入、自动辅助驾驶、空气过滤系统、无线充电、多区域空调。',
      warranty: '电池和驱动单元8年或16万公里质保，整车4年或8万公里质保。'
    },
    images: [
      { image_id: 31, car_id: 3, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', upload_time: '2023-01-03' },
      { image_id: 32, car_id: 3, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', upload_time: '2023-01-03' }
    ]
  },
  {
    car_id: '4',
    dealer_id: 104,
    dealer_name: '一汽奥迪4S店',
    brand: '奥迪',
    model: 'A6L',
    year: '2022',
    price: 45.68,
    category: '轿车',
    status: 1,
    details: {
      engine: '2.0T 涡轮增压',
      transmission: '7挡双离合',
      fuel_type: '汽油',
      fuel_consumption: 6.8,
      seats: 5,
      color: '曜岩黑',
      body_size: '5050mm×1886mm×1487mm',
      wheelbase: 3024,
      features: 'Matrix LED大灯、Bang & Olufsen音响、全景天窗、自适应巡航、四区恒温空调、电动后备厢、座椅通风加热按摩。',
      warranty: '厂家质保至2025年或10万公里，以先到者为准。'
    },
    images: [
      { image_id: 41, car_id: 4, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-04' },
      { image_id: 42, car_id: 4, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-04' }
    ]
  },
  {
    car_id: '5',
    dealer_id: 105,
    dealer_name: '广汽丰田4S店',
    brand: '丰田',
    model: 'RAV4',
    year: '2021',
    price: 21.58,
    category: 'SUV',
    status: 1,
    details: {
      engine: '2.5L 混合动力',
      transmission: 'E-CVT无级变速',
      fuel_type: '混合动力',
      fuel_consumption: 4.8,
      seats: 5,
      color: '云河白',
      body_size: '4600mm×1855mm×1680mm',
      wheelbase: 2690,
      features: '全时四驱、丰田Safety Sense安全系统、全景影像、双温区自动空调、8英寸触控屏、电动尾门。',
      warranty: '三电系统8年或20万公里，整车6年或15万公里。'
    },
    images: [
      { image_id: 51, car_id: 5, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-05' },
      { image_id: 52, car_id: 5, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-05' }
    ]
  },
  {
    car_id: '6',
    dealer_id: 106,
    dealer_name: '比亚迪官方旗舰店',
    brand: '比亚迪',
    model: '汉EV',
    year: '2023',
    price: 23.98,
    category: '新能源',
    status: 1,
    details: {
      engine: '永磁同步电机',
      transmission: '单速变速箱',
      fuel_type: '电动',
      fuel_consumption: 0,
      seats: 5,
      color: '青岚绿',
      body_size: '4980mm×1910mm×1495mm',
      wheelbase: 2920,
      features: '刀片电池、DiPilot智能驾驶辅助系统、15.6英寸自适应旋转悬浮屏、全液晶仪表盘、NFC手机钥匙。',
      warranty: '电池8年或15万公里，整车6年或15万公里。'
    },
    images: [
      { image_id: 61, car_id: 6, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', upload_time: '2023-01-06' },
      { image_id: 62, car_id: 6, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/parallax2.jpg', upload_time: '2023-01-06' }
    ]
  },
  {
    car_id: '7',
    dealer_id: 107,
    dealer_name: '保时捷中心',
    brand: '保时捷',
    model: '911',
    year: '2022',
    price: 158.00,
    category: '豪华',
    status: 1,
    details: {
      engine: '3.0T 水平对置六缸双涡轮',
      transmission: '8挡PDK双离合',
      fuel_type: '汽油',
      fuel_consumption: 9.8,
      seats: 4,
      color: '赛车黄',
      body_size: '4519mm×1852mm×1298mm',
      wheelbase: 2450,
      features: '运动计时组件、保时捷主动悬挂管理系统、保时捷扭矩引导系统、碳陶瓷复合制动系统、全液晶仪表盘。',
      warranty: '保时捷厂家质保2年，不限里程。'
    },
    images: [
      { image_id: 71, car_id: 7, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-07' },
      { image_id: 72, car_id: 7, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/mountains.jpg', upload_time: '2023-01-07' }
    ]
  },
  {
    car_id: '8',
    dealer_id: 108,
    dealer_name: '路虎授权经销商',
    brand: '路虎',
    model: '揽胜',
    year: '2023',
    price: 125.80,
    category: '豪华',
    status: 1,
    details: {
      engine: '4.4T V8双涡轮',
      transmission: '8挡自动',
      fuel_type: '汽油',
      fuel_consumption: 11.6,
      seats: 5,
      color: '御铜棕',
      body_size: '5052mm×2047mm×1870mm',
      wheelbase: 2997,
      features: '全地形反馈适应系统、电子空气悬挂、四区恒温空调、Meridian签名音响系统、后排娱乐系统、全景天窗。',
      warranty: '厂家质保3年或10万公里，以先到者为准。'
    },
    images: [
      { image_id: 81, car_id: 8, image_type: '缩略图', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-08' },
      { image_id: 82, car_id: 8, image_type: '完整图1', image_url: 'https://cdn.quasar.dev/img/parallax1.jpg', upload_time: '2023-01-08' }
    ]
  }
]

// 根据筛选条件显示车辆
const displayCars = ref(cars)
</script>

<style scoped>
.visitor-home {
  padding: 0; /* 移除页面默认内边距，让轮播完全占满宽度 */
  background-color: #121212; /* 深色背景 */
  color: white; /* 默认文字颜色为白色 */
}

.full-width-carousel {
  width: 100%;
  padding-top: 60px; /* 改用padding而不是margin，保持与header-bar同高 */
  background-color: #000000; /* 改为纯黑色 */
}

.full-width {
  width: 100%;
}

.content-section {
  max-width: 1280px;
  margin: 0 auto;
  background-color: #121212; /* 深色背景 */
  color: white;
}

.my-card {
  transition: all 0.3s;
  background-color: #1e1e1e; /* 卡片背景为深灰色 */
  color: white;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1); /* 调整阴影为白色 */
}

.custom-caption {
  text-align: center;
  padding: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 使用视口宽度而不是百分比 */
  height: 60px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1));
  color: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px);
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* 使用负边距扩展到边缘 */
  margin-left: 0px;
  margin-right: 5px;
  padding-left: 15px;
  padding-right: 20px;
  /* 防止文字被选择 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.header-bar .container {
  width: 100%;
  max-width: 1280px; /* 添加最大宽度限制 */
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  min-width: 140px; /* 固定左侧宽度 */
  display: flex;
  align-items: center;
}

.site-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
}

/* 新增样式 */
.section-header {
  margin-top: 20px;
}

.filter-options {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.text-options {
  display: flex;
  gap: 48px;
}

.filter-text {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 4px;
}

.filter-text:hover {
  color: rgba(255, 255, 255, 0.9);
}

.filter-text.active {
  color: #fff;
}

.filter-text.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transform-origin: center;
  animation: lineIn 0.3s ease forwards;
}

@keyframes lineIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.load-more-btn {
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  padding: 12px 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 200px;
}

.load-more-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.load-more-btn .q-icon {
  font-size: 1.4rem;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.load-more-btn:hover .q-icon {
  transform: translateX(4px);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: none;
  margin: 0;
  padding: 0 48px;
}

.search-input {
  width: 460px;
}

.search-input :deep(.q-field__control) {
  height: 40px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.search-input :deep(.q-field__control:before) {
  border: none;
}

.search-input :deep(.q-field__control:after) {
  display: none;
}

.search-input :deep(.q-field__native),
.search-input :deep(.q-field__prefix),
.search-input :deep(.q-field__suffix) {
  color: white;
  font-size: 0.95rem;
  padding-left: 4px;
  min-height: 40px;
}

.search-input :deep(.q-field__marginal) {
  color: rgba(255, 255, 255, 0.7);
  padding: 0 12px;
  height: 40px;
  min-height: 40px;
}

.search-input :deep(.q-field__control:hover) {
  background: rgba(255, 255, 255, 0.15);
}

.search-input :deep(.q-field__control:focus-within) {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.header-right {
  min-width: 140px; /* 固定右侧宽度 */
  display: flex;
  justify-content: flex-end;
}
</style> 