<script setup>
import { APP_CONFIG } from '../config'
</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">{{ APP_CONFIG.PAGE_TITLES.ABOUT }}</h1>
      
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ APP_CONFIG.APP_NAME }}</div>
          <div class="text-subtitle2">前端技术栈</div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-section>
          <p>该项目使用以下技术栈构建：</p>
          <ul>
            <li><strong>Vue 3</strong> - 渐进式JavaScript框架</li>
            <li><strong>Quasar</strong> - 基于Vue的UI框架</li>
            <li><strong>Axios</strong> - 用于HTTP请求</li>
            <li><strong>Vite</strong> - 现代前端构建工具</li>
            <li><strong>Vue Router</strong> - Vue官方路由管理器</li>
          </ul>
        </q-card-section>
      </q-card>
      
      <q-card>
        <q-card-section>
          <div class="text-h6">联系我们</div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-section>
          <p>如有任何问题或建议，请联系我们：</p>
          <div class="q-pa-md">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="email" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>邮箱</q-item-label>
                  <q-item-label caption>{{ APP_CONFIG.COMPANY.EMAIL }}</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>电话</q-item-label>
                  <q-item-label caption>{{ APP_CONFIG.COMPANY.PHONE }}</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item>
                <q-item-section avatar>
                  <q-icon name="location_on" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>地址</q-item-label>
                  <q-item-label caption>{{ APP_CONFIG.COMPANY.ADDRESS }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
/* About页面样式 */
</style> 