<script setup>
// 导入Quasar组件
import { ref } from 'vue'
import { APP_CONFIG } from './config'

// 侧边栏是否开启状态
const leftDrawerOpen = ref(false)

// 切换侧边栏状态的方法
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 顶部导航栏 -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          {{ APP_CONFIG.APP_NAME }}
        </q-toolbar-title>
        <q-btn flat round dense icon="person" />
      </q-toolbar>
    </q-header>

    <!-- 侧边栏 -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>导航菜单</q-item-label>
        
        <q-item 
          v-for="item in APP_CONFIG.MENU_ITEMS" 
          :key="item.path"
          clickable 
          v-ripple 
          :to="item.path"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 页面内容 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- 页脚 -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-center">{{ APP_CONFIG.COMPANY.COPYRIGHT }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style>
/* 全局样式 */
body {
  font-family: 'Microsoft YaHei', sans-serif;
}
</style>
