<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">智选车系统</h1>
      <p class="q-mb-lg text-body1">欢迎使用智选车前端系统，这是一个基于Vue 3和Quasar的现代化前端应用。</p>
      
      <!-- 轮播推荐 -->
      <div class="q-mb-lg">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          height="400px"
          class="rounded-borders"
        >
          <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h4">智能汽车推荐</div>
              <div class="text-subtitle1">基于AI的个性化推荐系统</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h4">新能源汽车专区</div>
              <div class="text-subtitle1">探索未来出行方式</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h4">豪华车型展示</div>
              <div class="text-subtitle1">尊享高端驾驶体验</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      
      <!-- 功能导航 -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">汽车查询</div>
              <p>根据品牌、价格、类型等条件查询适合您的汽车。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="进入" to="/visitor/search" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">热门推荐</div>
              <p>查看当前最受欢迎的汽车型号和优惠信息。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="进入" to="/visitor/popular" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">用户注册/登录</div>
              <p>注册成为会员，享受更多个性化服务和优惠。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="登录" to="/login" />
              <q-btn flat color="primary" label="注册" to="/register" />
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
import { ref } from 'vue'

// 轮播图当前幻灯片
const slide = ref('first')
</script>

<style scoped>
.my-card {
  transition: all 0.3s;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style> 