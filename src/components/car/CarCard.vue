<template>
  <q-card class="car-card" @click="showDetails">
    <!-- 车辆图片 - 使用缩略图 -->
    <q-img
      :src="thumbnailUrl"
      :ratio="16/9"
      class="car-image"
    >
      <!-- 价格标签 -->
      <div class="absolute-bottom price-tag-wrapper q-pa-md">
        <div class="price-tag">
          <div class="text-h5 price-text">{{ formatPrice(car.price) }}</div>
        </div>
      </div>
      
      <!-- 状态标签 - 根据状态显示不同标签 -->
      <div v-if="statusText" class="absolute-top-left status-chip q-ma-sm">
        {{ statusText }}
      </div>
    </q-img>

    <!-- 车辆信息 -->
    <q-card-section>
      <div class="text-h6 car-title">{{ car.brand }} {{ car.model }}</div>
      <div class="text-subtitle2 car-subtitle">{{ car.category }} · {{ car.year }}年</div>
    </q-card-section>

    <q-separator />

    <!-- 车辆特点 - 来自CarDetails表的基本信息 -->
    <q-card-section class="car-features" v-if="car.details">
      <div class="features-grid">
        <div class="feature-item">
          <q-icon name="directions_car" size="sm" />
          <span class="q-ml-sm">{{ car.year }}年</span>
        </div>
        <div class="feature-item">
          <q-icon name="local_gas_station" size="sm" />
          <span class="q-ml-sm">{{ car.details.fuel_type || '未知' }}</span>
        </div>
        <div class="feature-item">
          <q-icon name="settings" size="sm" />
          <span class="q-ml-sm">{{ car.details.transmission || '未知' }}</span>
        </div>
        <div class="feature-item">
          <q-icon name="event_seat" size="sm" />
          <span class="q-ml-sm">{{ car.details.seats || '未知' }}座</span>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <!-- 卡片操作区 -->
    <q-card-actions align="right" class="q-pa-md">
      <q-btn
        flat
        round
        class="action-btn"
        icon="favorite_border"
      />
      <q-btn
        flat
        round
        class="action-btn"
        icon="share"
      />
      <q-btn
        class="apple-btn-outline"
        flat
        no-caps
        icon="visibility"
        label="查看详情"
        @click.stop="showDetails"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

// 定义组件接收的属性
const props = defineProps({
  car: {
    type: Object,
    required: true,
    default: () => ({
      car_id: '',
      brand: '未知品牌',
      model: '未知车型',
      year: '未知',
      price: 0,
      category: '未知类别',
      status: 1,
      details: null,
      images: []
    })
  }
})

// 定义组件事件
const emit = defineEmits(['show-details'])

// 获取缩略图URL
const thumbnailUrl = computed(() => {
  if (props.car.images && props.car.images.length > 0) {
    const thumbnail = props.car.images.find(img => img.image_type === '缩略图')
    if (thumbnail) return thumbnail.image_url
  }
  // 默认图片
  return 'https://cdn.quasar.dev/img/parallax1.jpg'
})

// 根据状态获取状态文本和样式
const statusText = computed(() => {
  switch (props.car.status) {
    case 0: return '已下架'
    case 1: return '在售'
    case 2: return '已预约'
    case 3: return '已售出'
    default: return ''
  }
})

const statusClass = computed(() => {
  switch (props.car.status) {
    case 0: return 'status-inactive'
    case 1: return 'status-active'
    case 2: return 'status-reserved'
    case 3: return 'status-sold'
    default: return ''
  }
})

// 格式化价格
const formatPrice = (price) => {
  if (!price) return '询价'
  return `¥${parseFloat(price).toLocaleString()} 万`
}

// 显示详情
const showDetails = () => {
  emit('show-details', props.car)
}
</script>

<style scoped>
.car-card {
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
}

.car-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.car-image {
  height: 180px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.price-tag-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  pointer-events: none;
}

.price-tag {
  display: inline-block;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 8px 16px;
}

.price-text {
  font-weight: 600;
  letter-spacing: -0.5px;
  background: linear-gradient(45deg, #2196f3, #64b5f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.status-chip {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.car-title {
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 2px;
}

.car-subtitle {
  font-size: 0.85rem;
  line-height: 1.4;
}

.q-separator {
  opacity: 0.1;
  margin: 8px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 4px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 8px;
  min-height: 32px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.feature-item .q-icon {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
  min-width: 20px;
}

.feature-item span {
  flex: 1;
  padding-left: 4px;
  font-weight: 500;
}

.action-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.action-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
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

@media (min-width: 600px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 8px;
  }
}

.q-card__section {
  padding: 12px 16px;
}

.q-card__actions {
  padding: 8px 12px;
}
</style> 