<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <q-page padding class="flex flex-center column">
    <div class="text-h1 text-primary q-mb-md">404</div>
    <div class="text-h5 q-mb-xl">页面不存在</div>
    <p class="text-body1 q-mb-lg">您访问的页面可能已被删除、移动或暂时不可用。</p>
    <q-btn 
      color="primary" 
      label="返回首页" 
      @click="goHome" 
      icon="home"
      class="q-px-md"
    />
  </q-page>
</template>

<style scoped>
/* 404页面样式 */
</style> 