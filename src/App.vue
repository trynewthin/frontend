<script setup>
// 无需导入多余模块
</script>

<template>
  <!-- 基础布局框架 -->
  <q-layout view="lHh Lpr lFf">
    <!-- 页面内容容器 -->
    <q-page-container>
      <!-- 路由视图 -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
/* 基础全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}
</style>
