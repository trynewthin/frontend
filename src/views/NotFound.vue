<!--
  404页面组件
  
  用于显示以下场景的错误页面：
  1. 用户访问了不存在的路由
  2. 用户访问了没有权限的页面
  3. 作为通用的错误页面显示
  
  功能：
  - 显示404错误信息
  - 提供返回首页的按钮
  - 响应式布局，居中显示错误信息
-->

<script>
export default {
  name: 'NotFound'
}
</script>

<template>
  <div class="not-found">
    <q-card class="error-card">
      <q-card-section class="text-center">
        <div class="text-h2 text-weight-bold q-mb-md">404</div>
        <div class="text-h5 q-mb-lg">页面不存在或无权访问</div>
        <q-btn
          color="primary"
          label="返回首页"
          @click="$router.push('/')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error-card {
  min-width: 300px;
  padding: 2rem;
}
</style> 