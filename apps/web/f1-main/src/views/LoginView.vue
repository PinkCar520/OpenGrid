<template>
  <div class="login-container">
    <div class="login-logo">
      <!-- 可以在这里添加品牌标志或装饰性图案 -->
       <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="login-wrapper">
      <div class="auth-container">
        <div class="auth-header">
          <h1 class="auth-title">{{ t('login.title') }}</h1>
          <p class="auth-description">
            {{ t('login.description') }}
          </p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleSubmit"
          class="auth-form"
        >
          <el-form-item :label="t('login.email')" prop="email">
            <el-input
              v-model="form.email"
              :placeholder="t('login.emailPlaceholder')"
              type="email"
              autocomplete="email"
            />
          </el-form-item>

          <el-form-item :label="t('login.password')" prop="password">
            <el-input
              v-model="form.password"
              :placeholder="t('login.passwordPlaceholder')"
              type="password"
              autocomplete="current-password"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" class="submit-button" block>
              {{ loading ? t('login.submitting') : t('login.submit') }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth-footer">
          <p class="footer-text">
            {{ t('login.noAccount') }}
            <router-link to="/register" class="footer-link">{{ t('login.register') }}</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const rules: FormRules = {
  email: [
    { required: true, message: t('login.validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('login.validation.emailFormat'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('login.validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('login.validation.passwordLength'), trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    await authStore.login(form.email, form.password)
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  @apply min-h-screen flex bg-background;
  border-radius: 16px;
  border: 1px solid rgb(229 231 235);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.login-logo {
  width: 55%;
  background: #18181b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-wrapper {
  width: 45%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.auth-container {
  width: 100%;
  max-width: 380px;
  @apply space-y-8;
}

.auth-header {
  @apply space-y-3;
}

.auth-title {
  @apply text-2xl font-bold tracking-tight text-gray-900;
  margin-bottom: 0;
}

.auth-description {
  @apply text-sm text-gray-500;
}

.auth-form {
  @apply space-y-6;
}

:deep(.el-form-item__label) {
  @apply text-sm font-medium text-gray-700 mb-1;
}

:deep(.el-input__wrapper) {
  @apply rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors;
  box-shadow: none !important;
}

:deep(.el-input__wrapper:hover) {
  @apply border-gray-300;
}

:deep(.el-input__wrapper.is-focus) {
  @apply border-primary ring-2 ring-primary/10;
}

.submit-button {
  @apply h-11 w-full rounded-lg font-medium transition-colors;
  background-color: #18181b !important;
}

.submit-button:hover {
  background-color: #27272a !important;
}

.auth-footer {
  @apply text-center mt-6;
}

.footer-text {
  @apply text-sm text-gray-500;
}

.footer-link {
  @apply text-primary font-medium hover:text-primary/90 ml-1;
  text-decoration: none;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .login-container {
    background-color: #09090b;
    border-color: #27272a;
  }

  .login-wrapper {
    background-color: #18181b;
  }

  .auth-title {
    @apply text-gray-100;
  }

  .auth-description {
    @apply text-gray-400;
  }

  :deep(.el-form-item__label) {
    @apply text-gray-300;
  }

  :deep(.el-input__wrapper) {
    @apply bg-gray-900 border-gray-800 text-gray-100;
  }

  :deep(.el-input__wrapper:hover) {
    @apply border-gray-700;
  }

  .submit-button {
    @apply bg-white text-gray-900;
  }

  .submit-button:hover {
    @apply bg-gray-100;
  }

  .footer-text {
    @apply text-gray-400;
  }

  .footer-link {
    @apply text-gray-200 hover:text-white;
  }
}
</style>
