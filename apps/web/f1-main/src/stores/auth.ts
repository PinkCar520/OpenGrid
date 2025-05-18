import { defineStore } from 'pinia'
import { trpc } from '@/api/trpc'
import { ElMessage, ElNotification } from 'element-plus'
import { router } from '@/router'
import { useTabsStore } from './tabs'
import i18n from '@/locales'

interface User {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const result = await trpc.login.mutate({ email, password })
        this.user = result.user
        this.token = result.token
        this.isAuthenticated = true
        localStorage.setItem('token', result.token)
        ElNotification({
          title: 'Success',
          message: i18n.global.t('auth.notifications.loginSuccess'),
          type: 'success',
        })
        router.push('/dashboard')
      } catch (error: any) {
        ElNotification({
          title: 'Error',
          message: error.message || i18n.global.t('auth.notifications.loginFailed'),
          type: 'error',
        })
        throw error
      }
    },

    async register(email: string, password: string, name?: string) {
      try {
        const result = await trpc.register.mutate({ email, password, name })
        this.user = result.user
        this.token = result.token
        this.isAuthenticated = true
        localStorage.setItem('token', result.token)
        ElNotification({
          title: 'Success',
          message: i18n.global.t('auth.notifications.registerSuccess'),
          type: 'success',
        })
        router.push('/dashboard')
      } catch (error: any) {
        ElNotification({
          title: 'Error',
          message: error.message || i18n.global.t('auth.notifications.registerFailed'),
          type: 'error',
        })
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      const tabsStore = useTabsStore()
      tabsStore.clearTabs()
      router.push('/login')
      ElNotification({
        title: 'Success',
        message: i18n.global.t('auth.notifications.logoutSuccess'),
        type: 'success',
      })
    },
  },

  persist: {
    key: 'auth',
    storage: localStorage,
    // paths: ['user', 'isAuthenticated'],
  },
})
