<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">用户中心</h1>
      <p class="q-mb-lg text-body1">欢迎进入智选车用户中心，这里可以管理您的个人信息和查看您的订单。</p>
      
      <div class="row q-col-gutter-md">
        <!-- 用户中心卡片 -->
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">个人信息</div>
            </q-card-section>
            
            <q-card-section>
              <p>查看和修改您的个人资料、联系方式和偏好设置。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="进入" to="/user/profile" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">我的订单</div>
            </q-card-section>
            
            <q-card-section>
              <p>查看您的订单历史、当前订单状态和交付信息。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="进入" to="/user/orders" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">收藏夹</div>
            </q-card-section>
            
            <q-card-section>
              <p>查看您收藏的车型、比较清单和价格提醒。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="进入" to="/user/favorites" />
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
.my-card {
  transition: all 0.3s;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style> 