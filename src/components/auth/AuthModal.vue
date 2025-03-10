<!-- 登录注册模态窗口 -->
<template>
  <q-dialog
    v-model="modalOpen"
    transition-show="fade"
    transition-hide="fade"
    @hide="onHide"
    full-width
    full-height
    seamless
  >
    <div class="fullscreen-modal" :class="{ 'blur-active': modalOpen }" @click="closeModal">
      <div class="modal-content-wrapper" @click.stop>
        <q-card class="auth-modal">
          <!-- 关闭按钮 -->
          <div class="close-button" @click="closeModal">
            <q-btn flat round color="white" icon="close" />
          </div>

          <!-- 标题区域 -->
          <div class="auth-header text-center">
            <h2 class="text-h4 q-mb-md">{{ isLogin ? '欢迎回来' : '创建账号' }}</h2>
            <p class="text-subtitle1 text-grey-5">{{ isLogin ? '使用您的账号登录' : '填写以下信息创建您的账号' }}</p>
          </div>

          <!-- 表单区域 -->
          <q-card-section class="q-px-lg q-pb-lg">
            <q-form @submit="onSubmit" class="auth-form">
              <!-- 注册时的用户名输入 -->
              <q-input
                v-if="!isLogin"
                v-model="form.username"
                class="auth-input"
                outlined
                dark
                label="用户名"
                :rules="[val => val && val.length > 0 || '请输入用户名']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <!-- 邮箱输入 -->
              <q-input
                v-model="form.email"
                class="auth-input"
                outlined
                dark
                type="email"
                label="邮箱"
                :rules="[val => val && val.length > 0 || '请输入邮箱', val => validateEmail(val) || '请输入有效的邮箱地址']"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- 密码输入 -->
              <q-input
                v-model="form.password"
                class="auth-input"
                outlined
                dark
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                :rules="[val => val && val.length > 5 || '密码至少需要6个字符']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <!-- 注册时的确认密码 -->
              <q-input
                v-if="!isLogin"
                v-model="form.confirmPassword"
                class="auth-input"
                outlined
                dark
                :type="showConfirmPassword ? 'text' : 'password'"
                label="确认密码"
                :rules="[
                  val => val && val.length > 0 || '请确认密码',
                  val => val === form.password || '两次输入的密码不一致'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </q-input>

              <!-- 提交按钮 -->
              <div class="auth-actions">
                <q-btn
                  class="submit-btn full-width"
                  unelevated
                  size="large"
                  :label="isLogin ? '登录' : '注册'"
                  type="submit"
                />
              </div>

              <!-- 切换登录/注册 -->
              <div class="text-center q-mt-md">
                <p class="text-grey-5">
                  {{ isLogin ? '还没有账号？' : '已有账号？' }}
                  <a
                    href="#"
                    class="text-primary"
                    @click.prevent="toggleAuthMode"
                  >{{ isLogin ? '立即注册' : '立即登录' }}</a>
                </p>
              </div>

              <!-- 第三方登录 -->
              <div class="third-party-auth q-mt-lg">
                <div class="divider">
                  <span class="text-grey-5">或使用以下方式</span>
                </div>
                <div class="third-party-buttons q-mt-md">
                  <q-btn round flat color="white" icon="img:https://www.google.com/favicon.ico" class="q-mx-sm" />
                  <q-btn round flat color="white" icon="img:https://www.wechat.com/favicon.ico" class="q-mx-sm" />
                  <q-btn round flat color="white" icon="img:https://weibo.com/favicon.ico" class="q-mx-sm" />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'login', // 'login' 或 'register'
    validator: (value) => ['login', 'register'].includes(value)
  }
})

// 定义组件事件
const emit = defineEmits(['update:modelValue', 'login', 'register', 'update:mode'])

// 模态窗口状态
const modalOpen = ref(props.modelValue)

// 表单数据
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 控制密码显示
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 登录/注册模式
const isLogin = ref(props.mode === 'login')

// 监听mode变化
watch(() => props.mode, (newVal) => {
  isLogin.value = newVal === 'login'
  // 切换模式时重置表单
  form.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  modalOpen.value = newVal
  if (newVal) {
    // 打开模态窗口时，根据mode设置登录/注册状态
    isLogin.value = props.mode === 'login'
    // 重置表单
    form.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
})

// 监听modalOpen变化
watch(() => modalOpen.value, (newVal) => {
  emit('update:modelValue', newVal)
})

// 关闭模态窗口
const closeModal = () => {
  modalOpen.value = false
}

// 模态窗口隐藏时触发
const onHide = () => {
  emit('update:modelValue', false)
}

// 切换登录/注册模式
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  // 重置表单
  form.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  // 发出事件通知父组件模式已改变
  emit('update:mode', isLogin.value ? 'login' : 'register')
}

// 表单提交
const onSubmit = () => {
  if (isLogin.value) {
    emit('login', {
      email: form.value.email,
      password: form.value.password
    })
  } else {
    emit('register', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    })
  }
}

// 邮箱验证
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
</script>

<style scoped>
@keyframes blurSpread {
  0% {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    background: rgba(0, 0, 0, 0);
  }
  100% {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.2);
  }
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1000;
}

.fullscreen-modal.blur-active {
  animation: blurSpread 0.3s ease-out forwards;
}

.modal-content-wrapper {
  width: 85%;
  max-width: 480px;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blur-active .modal-content-wrapper {
  opacity: 1;
  transform: scale(1);
}

.auth-modal {
  width: 100%;
  max-height: 85vh;
  border-radius: 16px;
  background-color: #121212;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
  position: relative;
  overflow: hidden;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
}

.auth-header {
  padding: 40px 40px 20px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
  flex-shrink: 0;
}

.q-card-section {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

/* 自定义滚动条样式 */
.q-card-section::-webkit-scrollbar {
  width: 8px;
}

.q-card-section::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.q-card-section::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.q-card-section::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-input {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  :deep(.q-field__control:hover) {
    border-color: rgba(255, 255, 255, 0.2);
  }

  :deep(.q-field__control.text-white) {
    color: white;
  }

  :deep(.q-field__label) {
    color: rgba(255, 255, 255, 0.7);
  }

  :deep(.q-field__marginal) {
    color: rgba(255, 255, 255, 0.7);
  }
}

.submit-btn {
  background: linear-gradient(45deg, #2196f3, #64b5f6);
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 8px;
  height: 48px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.third-party-auth {
  position: relative;
  padding-top: 20px;
}

.divider {
  text-align: center;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
  
  span {
    background: #121212;
    padding: 0 15px;
    font-size: 0.9rem;
  }
}

.third-party-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  
  .q-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  }
}

/* 响应式调整 */
@media (max-width: 600px) {
  .modal-content-wrapper {
    padding: 16px;
  }
  
  .auth-header {
    padding: 30px 20px 15px;
  }
  
  .auth-form {
    gap: 15px;
  }
}

:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
}
</style> 