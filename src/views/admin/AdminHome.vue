<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 q-mb-md">管理员控制台</h1>
      <p class="q-mb-lg text-body1">欢迎使用智选车系统管理控制台，您可以在这里管理所有系统资源和用户。</p>
      
      <!-- 系统状态卡片 -->
      <div class="row q-mb-lg">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-dark text-white">
            <q-card-section>
              <div class="text-h6">注册用户</div>
              <div class="text-h4">3,245</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-dark text-white">
            <q-card-section>
              <div class="text-h6">经销商数量</div>
              <div class="text-h4">42</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-dark text-white">
            <q-card-section>
              <div class="text-h6">车辆总数</div>
              <div class="text-h4">1,287</div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-3 q-pa-sm">
          <q-card class="stat-card bg-negative text-white">
            <q-card-section>
              <div class="text-h6">系统警告</div>
              <div class="text-h4">3</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      
      <!-- 管理功能卡片 -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-dark text-white">
              <div class="text-h6">用户管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>管理系统用户、权限设置、角色分配和账户状态。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="dark" label="进入" to="/admin/users" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-dark text-white">
              <div class="text-h6">经销商管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>管理经销商信息、审核申请、监控经销商活动。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="dark" label="进入" to="/admin/dealers" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-dark text-white">
              <div class="text-h6">系统设置</div>
            </q-card-section>
            
            <q-card-section>
              <p>配置系统参数、数据备份、日志查看和安全设置。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="dark" label="进入" to="/admin/settings" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-dark text-white">
              <div class="text-h6">内容管理</div>
            </q-card-section>
            
            <q-card-section>
              <p>管理网站内容、公告、帮助文档和FAQs。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="dark" label="进入" to="/admin/content" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-dark text-white">
              <div class="text-h6">数据统计</div>
            </q-card-section>
            
            <q-card-section>
              <p>查看系统使用统计、用户活跃度、交易数据分析。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="dark" label="进入" to="/admin/statistics" />
            </q-card-actions>
          </q-card>
        </div>
        
        <div class="col-12 col-md-4">
          <q-card class="my-card">
            <q-card-section class="bg-negative text-white">
              <div class="text-h6">系统监控</div>
            </q-card-section>
            
            <q-card-section>
              <p>监控系统性能、错误日志、安全警报和异常行为。</p>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="negative" label="进入" to="/admin/monitor" />
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