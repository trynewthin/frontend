<script setup>
import { ref, computed } from 'vue'

// 定义属性
const props = defineProps({
  title: {
    type: String,
    default: '智轩车系统'
  }
})

// 定义事件
const emit = defineEmits(['menu-toggle'])

// 切换菜单方法
const toggleMenu = () => {
  emit('menu-toggle')
}

// 计算属性示例
const appTitle = computed(() => {
  return props.title || import.meta.env.VITE_APP_TITLE || '智轩车系统'
})
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleMenu" />
      
      <q-toolbar-title>
        {{ appTitle }}
      </q-toolbar-title>
      
      <q-space />
      
      <!-- 用户菜单 -->
      <q-btn flat round dense icon="person">
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item clickable v-close-popup to="/profile">
              <q-item-section>个人资料</q-item-section>
            </q-item>
            
            <q-item clickable v-close-popup to="/settings">
              <q-item-section>设置</q-item-section>
            </q-item>
            
            <q-separator />
            
            <q-item clickable v-close-popup>
              <q-item-section>退出登录</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
/* 组件样式 */
</style> 