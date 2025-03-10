<template>
  <q-dialog
    v-model="modalOpen"
    transition-show="fade"
    transition-hide="fade"
    @hide="onHide"
    full-width
    full-height
    seamless
  >
    <div class="fullscreen-modal" :class="{ 'blur-active': modalOpen }" @click="closeModal">
      <!-- 右侧按钮组 -->
      <div class="floating-buttons" @click.stop>
        <q-btn flat round color="white" icon="close" v-close-popup class="q-mb-md" />
        <q-btn flat round color="white" icon="favorite_border" class="q-mb-md" />
        <q-btn flat round color="white" icon="share" class="q-mb-md" />
        <q-btn
          flat
          round
          color="white"
          icon="keyboard_arrow_up"
          @click="scrollToTop"
        />
      </div>

      <div class="modal-content-wrapper" @click.stop>
        <q-card class="car-detail-modal" ref="modalContent">
          <q-card-section class="q-pa-none">
            <!-- 车辆图片轮播 - 使用完整图 -->
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              arrows
              height="300px"
              class="bg-black"
            >
              <q-carousel-slide 
                v-for="(image, index) in carImages" 
                :key="index"
                :name="'image'+index" 
                :img-src="image.image_url"
              />
            </q-carousel>
          </q-card-section>
          
          <!-- 价格和基本信息 -->
          <q-card-section class="q-pa-md">
            <div class="row q-col-gutter-md">
              <!-- 左侧：价格和状态 -->
              <div class="col-12 col-md-6">
                <div class="text-h4 text-weight-bold price-text">{{ formatPrice(car.price) }}</div>
                
                <div class="status-chip">{{ statusText }}</div>
              </div>
              
              <!-- 右侧：联系和咨询 -->
              <div class="col-12 col-md-6 text-right">
                <q-btn
                  class="apple-btn q-mr-sm"
                  unelevated
                  no-caps
                  icon="directions_car"
                  label="预约试驾"
                />
                <q-btn
                  class="apple-btn q-mr-sm"
                  unelevated
                  no-caps
                  icon="chat"
                  label="在线咨询"
                />
                <q-btn
                  class="apple-btn-outline"
                  flat
                  no-caps
                  icon="info"
                  label="了解更多"
                />
              </div>
            </div>
          </q-card-section>
          
          <q-separator />
          
          <!-- 车辆基本参数 -->
          <q-card-section v-if="car.details">
            <div class="text-h6">基本参数</div>
            <div class="row q-col-gutter-md q-my-md">
              <!-- 基础信息 - 来自Cars表 -->
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">品牌</div>
                  <div class="param-value">{{ car.brand }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">车型</div>
                  <div class="param-value">{{ car.model }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">年份</div>
                  <div class="param-value">{{ car.year }}年</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">类别</div>
                  <div class="param-value">{{ car.category }}</div>
                </div>
              </div>
              
              <!-- 详细参数 - 来自CarDetails表 -->
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">发动机</div>
                  <div class="param-value">{{ car.details.engine || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">变速箱</div>
                  <div class="param-value">{{ car.details.transmission || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">燃油类型</div>
                  <div class="param-value">{{ car.details.fuel_type || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">油耗(L/100km)</div>
                  <div class="param-value">{{ car.details.fuel_consumption || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">座位数</div>
                  <div class="param-value">{{ car.details.seats || '未知' }}座</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">颜色</div>
                  <div class="param-value">{{ car.details.color || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">车身尺寸</div>
                  <div class="param-value">{{ car.details.body_size || '未知' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="param-item">
                  <div class="param-label">轴距</div>
                  <div class="param-value">{{ car.details.wheelbase || '未知' }}mm</div>
                </div>
              </div>
            </div>
          </q-card-section>
          
          <q-separator />
          
          <!-- 车辆保修信息 -->
          <q-card-section v-if="car.details && car.details.warranty">
            <div class="text-h6">保修信息</div>
            <p class="text-body1">
              {{ car.details.warranty }}
            </p>
          </q-card-section>
          
          <q-separator v-if="car.details && car.details.warranty" />
          
          <!-- 车辆特性 -->
          <q-card-section v-if="car.details && car.details.features">
            <div class="text-h6">车辆特性</div>
            <p class="text-body1">
              {{ car.details.features }}
            </p>
          </q-card-section>
          
          <q-separator v-if="car.details && car.details.features"/>
          
          <!-- 车辆配置信息 - 使用可展开面板 -->
          <q-card-section>
            <div class="text-h6 q-mb-md">配置详情</div>
            <q-expansion-item
              expand-separator
              icon="settings"
              label="动力系统"
              caption="发动机、变速箱、驱动方式等"
              header-class="text-primary"
              caption-class="text-white"
            >
              <q-card class="bg-dark">
                <q-card-section>
                  <div class="text-body1 text-white">
                    <p v-if="car.details && car.details.engine"><strong>发动机:</strong> {{ car.details.engine }}</p>
                    <p v-if="car.details && car.details.transmission"><strong>变速箱:</strong> {{ car.details.transmission }}</p>
                    <p v-if="car.details && car.details.fuel_type"><strong>燃油类型:</strong> {{ car.details.fuel_type }}</p>
                    <p v-if="car.details && car.details.fuel_consumption"><strong>油耗:</strong> {{ car.details.fuel_consumption }}L/100km</p>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            
            <q-expansion-item
              expand-separator
              icon="straighten"
              label="车身参数"
              caption="尺寸、重量、容积等"
              header-class="text-primary"
              caption-class="text-white"
            >
              <q-card class="bg-dark">
                <q-card-section>
                  <div class="text-body1 text-white">
                    <p v-if="car.details && car.details.body_size"><strong>车身尺寸:</strong> {{ car.details.body_size }}</p>
                    <p v-if="car.details && car.details.wheelbase"><strong>轴距:</strong> {{ car.details.wheelbase }}mm</p>
                    <p v-if="car.details && car.details.seats"><strong>座位数:</strong> {{ car.details.seats }}座</p>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>
          
          <!-- 经销商信息 -->
          <q-card-section>
            <div class="text-h6">经销商信息</div>
            <div class="row q-col-gutter-md q-my-md">
              <div class="col-12">
                <q-card class="dealer-card">
                  <q-card-section class="row items-center">
                    <q-avatar size="50px" font-size="40px" color="primary" text-color="white" icon="storefront" class="q-mr-md" />
                    <div>
                      <div class="text-h6">{{ dealerName }}</div>
                      <div class="text-caption">车辆ID: {{ car.car_id || '未知' }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed, onMounted, onUnmounted } from 'vue'

// 定义组件接收的属性
const props = defineProps({
  car: {
    type: Object,
    required: true,
    default: () => ({})
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

// 定义组件事件
const emit = defineEmits(['update:modelValue'])

// 模态窗口状态
const modalOpen = ref(props.modelValue)

// 轮播图当前幻灯片
const slide = ref('image0')

// 获取车辆图片列表（按指定顺序排列，过滤掉缩略图）
const carImages = computed(() => {
  if (!props.car.images || props.car.images.length === 0) {
    // 没有图片时，返回默认图片
    return [{ image_url: 'https://cdn.quasar.dev/img/parallax1.jpg' }]
  }
  
  // 过滤并排序完整图片
  const fullImages = props.car.images
    .filter(img => img.image_type.includes('完整图'))
    .sort((a, b) => {
      // 按照完整图1、完整图2...的顺序排序
      const aNum = parseInt(a.image_type.replace('完整图', '')) || 1
      const bNum = parseInt(b.image_type.replace('完整图', '')) || 1
      return aNum - bNum
    })
  
  return fullImages.length > 0 ? fullImages : [{ image_url: 'https://cdn.quasar.dev/img/parallax1.jpg' }]
})

// 根据状态生成状态文本和颜色
const statusText = computed(() => {
  switch (props.car.status) {
    case 0: return '已下架'
    case 1: return '在售'
    case 2: return '已预约'
    case 3: return '已售出'
    default: return '未知状态'
  }
})

const statusColor = computed(() => {
  switch (props.car.status) {
    case 0: return 'negative'
    case 1: return 'positive'
    case 2: return 'warning'
    case 3: return 'info'
    default: return 'grey'
  }
})

// 经销商名称
const dealerName = computed(() => {
  return props.car.dealer_name || `经销商ID: ${props.car.dealer_id || '未知'}`
})

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  modalOpen.value = newVal
})

// 监听modalOpen变化
watch(() => modalOpen.value, (newVal) => {
  emit('update:modelValue', newVal)
})

// 模态窗口隐藏时触发
const onHide = () => {
  emit('update:modelValue', false)
}

// 格式化价格
const formatPrice = (price) => {
  if (!price) return '询价'
  return `¥${parseFloat(price).toLocaleString()} 万`
}

// 关闭模态窗口
const closeModal = () => {
  modalOpen.value = false
}

// 防止背景滚动
const preventScroll = (e) => {
  e.preventDefault()
}

// 监听模态窗口状态变化，控制背景滚动
watch(modalOpen, (newVal) => {
  if (newVal) {
    // 模态窗口打开时，禁止背景滚动
    document.body.style.overflow = 'hidden'
  } else {
    // 模态窗口关闭时，恢复背景滚动
    document.body.style.overflow = 'auto'
  }
})

// 模态内容引用
const modalContent = ref(null)

onMounted(() => {
  // 在组件挂载后获取正确的滚动元素
  modalContent.value = document.querySelector('.car-detail-modal')
})

// 回到顶部
const scrollToTop = () => {
  const scrollElement = document.querySelector('.car-detail-modal')
  if (scrollElement) {
    scrollElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

// 组件卸载时恢复背景滚动
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
@keyframes blurSpread {
  0% {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    background: rgba(0, 0, 0, 0);
  }
  100% {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.2);
  }
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  cursor: pointer; /* 添加指针样式表明可点击 */
}

.fullscreen-modal.blur-active {
  animation: blurSpread 0.3s ease-out forwards;
}

.modal-content-wrapper {
  width: 85%;
  max-width: 1600px;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  cursor: default;
}

.blur-active .modal-content-wrapper {
  opacity: 1;
  transform: scale(1);
}

.car-detail-modal {
  width: 100%;
  max-height: 85vh;
  border-radius: 16px;
  background-color: #121212;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
  color: white;
  overscroll-behavior: contain;
}

.blur-dialog {
  display: none;
}

:deep(.blur-dialog .q_dialog__backdrop) {
  display: none;
}

/* 自定义滚动条样式 */
.car-detail-modal::-webkit-scrollbar {
  width: 8px;
}

.car-detail-modal::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.car-detail-modal::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.car-detail-modal::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.price-text {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  background: linear-gradient(45deg, #2196f3, #64b5f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}

.status-chip {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.q-separator {
  opacity: 0.1;
  margin: 24px 0;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
}

.text-body1 {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.2px;
}

.param-item {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.param-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.param-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
  font-weight: 400;
  letter-spacing: 0.3px;
}

.param-value {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.q-expansion-item) {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

:deep(.q-expansion-item:hover) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.q-expansion-item__content) {
  background: rgba(0, 0, 0, 0.2);
  padding: 16px;
}

:deep(.q-expansion-item__container) {
  padding: 12px;
}

:deep(.q-expansion-item__container .q-item__section--side) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.q-expansion-item__container .q-item__label) {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.q-expansion-item__container .q-item__label--caption) {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5) !important;
  margin-top: 4px;
}

.dealer-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}

.dealer-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.dealer-card .text-h6 {
  margin-bottom: 4px;
}

.dealer-card .text-caption {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  letter-spacing: 0.2px;
}

:deep(.q-carousel) {
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.floating-buttons {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
}

.floating-buttons .q-btn {
  transition: all 0.3s ease;
}

.floating-buttons .q-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}

.apple-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 8px 16px;
}

.apple-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.apple-btn-outline {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  padding: 8px 16px;
}

.apple-btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.text-primary {
  color: #2196f3 !important;
}

.text-h4 {
  font-weight: 600;
  letter-spacing: -0.5px;
}
</style> 