<script setup>
import { ref, onMounted } from 'vue'

// 示例数据
const items = ref([])
const loading = ref(false)

// 模拟加载数据
onMounted(async () => {
  loading.value = true
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟数据
  items.value = [
    { id: 1, title: '智能汽车A', desc: '智能汽车系统介绍A' },
    { id: 2, title: '智能汽车B', desc: '智能汽车系统介绍B' },
    { id: 3, title: '智能汽车C', desc: '智能汽车系统介绍C' },
  ]
  
  loading.value = false
})
</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">智选车系统</h1>
      <p class="q-mb-lg text-body1">欢迎使用智选车前端系统，这是一个基于Vue 3和Quasar的现代化前端应用。</p>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="q-pa-md flex flex-center">
        <q-spinner color="primary" size="3em" />
      </div>
      
      <!-- 内容卡片 -->
      <div class="row q-col-gutter-md">
        <div v-for="item in items" :key="item.id" class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">{{ item.title }}</div>
            </q-card-section>
            
            <q-card-section>
              {{ item.desc }}
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="查看详情" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.my-card {
  transition: all 0.3s;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style> 