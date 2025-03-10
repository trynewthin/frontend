<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">经销商中心</h1>
      <p class="q-mb-lg text-body1">欢迎使用智选车经销商管理系统，您可以在这里管理您的车辆信息、订单和客户。</p>
      
      <!-- 经销商统计卡片 -->
      <div class="row q-mb-lg">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-primary text-white">
            <q-card-section>
              <div class="text-h6">在售车辆</div>
              <div class="text-h4">24</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-positive text-white">
            <q-card-section>
              <div class="text-h6">本月销量</div>
              <div class="text-h4">12</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-warning text-white">
            <q-card-section>
              <div class="text-h6">待处理订单</div>
              <div class="text-h4">5</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-info text-white">
            <q-card-section>
              <div class="text-h6">客户咨询</div>
              <div class="text-h4">8</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      
      <!-- 经销商功能卡片 -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-secondary text-white">
              <div class="text-h6">车辆管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>管理您的车辆库存、添加新车、更新车辆信息和价格。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="secondary" label="进入" to="/dealer/vehicles" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-secondary text-white">
              <div class="text-h6">订单管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>处理客户订单、跟踪订单状态、管理交付和售后服务。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="secondary" label="进入" to="/dealer/orders" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-secondary text-white">
              <div class="text-h6">客户管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>管理客户信息、查看客户历史、处理客户咨询和投诉。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="secondary" label="进入" to="/dealer/customers" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      
      <!-- 路由出口，用于渲染子页面 -->
      <router-view />
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from '@/store/user'

// 获取用户状态
const userStore = useUserStore()
</script>

<style scoped>
.my-card, .stat-card {
  transition: all 0.3s;
}

.my-card:hover, .stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-card {
  border-radius: 10px;
}
</style> 