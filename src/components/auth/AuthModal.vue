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
        <!-- 主要内容面板 -->
        <q-card class="auth-modal">
          <!-- 标题区域 -->
          <div class="auth-header text-center">
            <h2 class="text-h4 q-mb-md">{{ isLogin ? '欢迎回来' : '创建账号' }}</h2>
            <p class="text-subtitle1 text-grey-5">{{ isLogin ? '使用您的账号登录' : '填写以下信息创建您的账号' }}</p>
          </div>

          <!-- 表单区域 -->
          <q-card-section class="q-px-lg q-pb-lg">
            <q-form @submit="onSubmit" class="auth-form" autocomplete="off">
              <!-- 注册时的用户名输入 -->
              <q-input
                v-if="!isLogin"
                v-model="form.username"
                class="auth-input"
                outlined
                dark
                label="用户名"
                autocomplete="off"
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
                autocomplete="off"
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
                autocomplete="new-password"
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
                autocomplete="new-password"
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
            </q-form>
          </q-card-section>
        </q-card>

        <!-- 右侧按钮面板 -->
        <div class="floating-buttons" @click.stop>
          <!-- 主操作按钮 -->
          <q-btn
            flat
            round
            color="white"
            size="lg"
            :icon="isLogin ? 'login' : 'person_add'"
            class="q-mb-md action-btn"
            @click="onSubmit"
          >
            <q-tooltip>{{ isLogin ? '登录' : '注册' }}</q-tooltip>
          </q-btn>
          
          <!-- 模式切换按钮 -->
          <q-btn
            flat
            round
            color="white"
            size="lg"
            :icon="isLogin ? 'person_add' : 'arrow_back'"
            class="q-mb-md action-btn"
            @click="toggleAuthMode"
          >
            <q-tooltip>{{ isLogin ? '创建新账号' : '返回登录' }}</q-tooltip>
          </q-btn>

          <!-- 关闭按钮 -->
          <q-btn
            flat
            round
            color="white"
            size="lg"
            icon="close"
            class="action-btn"
            @click="closeModal"
          >
            <q-tooltip>关闭</q-tooltip>
          </q-btn>
        </div>
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
    // 禁用背景滚动
    document.body.style.overflow = 'hidden'
  } else {
    // 恢复背景滚动
    document.body.style.overflow = ''
  }
})

// 监听modalOpen变化
watch(() => modalOpen.value, (newVal) => {
  emit('update:modelValue', newVal)
})

// 关闭模态窗口
const closeModal = () => {
  modalOpen.value = false
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 模态窗口隐藏时触发
const onHide = () => {
  emit('update:modelValue', false)
  // 恢复背景滚动
  document.body.style.overflow = ''
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
  max-width: 900px;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  cursor: default;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: stretch;
}

.blur-active .modal-content-wrapper {
  opacity: 1;
  transform: scale(1);
}

.auth-modal {
  flex: 1;
  max-width: 580px;
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

.auth-header {
  padding: 48px 48px 24px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
  flex-shrink: 0;
}

.q-card-section {
  padding: 0 48px 48px;
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

.floating-buttons {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
}

.floating-buttons .action-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.5rem;
}

.floating-buttons .action-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.floating-buttons .action-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.08);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .modal-content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 92%;
    padding: 12px;
  }

  .auth-modal {
    width: 100%;
  }

  .floating-buttons {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 580px;
    margin-top: 16px;
    background: transparent;
    padding: 0;
  }

  .floating-buttons .action-btn {
    margin: 0;
  }

  .auth-header {
    padding: 36px 32px 20px;
  }
  
  .q-card-section {
    padding: 0 32px 36px;
  }
  
  .auth-form {
    gap: 16px;
  }

  .action-btn {
    height: 52px;
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
}

:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
}
</style> 