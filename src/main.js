// 导入Quasar CSS
import 'quasar/dist/quasar.css'
// 导入Quasar图标集
import '@quasar/extras/material-icons/material-icons.css'
import './style.css'

import App from './App.vue'
import { Quasar } from 'quasar'
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

// 创建Vue应用实例
const app = createApp(App)

// 配置全局Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
})

// 将axios实例添加到全局属性
app.config.globalProperties.$axios = api
app.config.globalProperties.$api = api

// 使用Vue Router
app.use(router)

// 使用Pinia
app.use(createPinia())

// 使用Quasar UI框架
app.use(Quasar, {
  plugins: {}, // 如需导入Quasar插件，在此处添加
  config: {
    // 可选：配置Quasar的全局设置
    brand: {
      primary: '#1976D2',
      secondary: '#26A69A',
      accent: '#9C27B0',
      dark: '#1D1D1D',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
})

app.mount('#app')
