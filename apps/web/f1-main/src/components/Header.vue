<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, reactive } from 'vue'
import {
  Moon,
  Sunny,
  FullScreen,
  Bell,
  ArrowDown,
  User,
  Key,
  SwitchButton,
  ArrowLeft,
  ArrowRight,
  Shop,
  Close,
  Setting
} from '@element-plus/icons-vue'
import avatar from "../assets/avatar.png"
import logo from "../assets/logo.png"
import { useRouter } from 'vue-router'
import { useLayoutStore } from '../stores/layout'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { isDark, toggleDark } from '../composables'
import { isReducedMotion } from '../utils'

const router = useRouter()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const isCollapse = computed(() => layoutStore.isAsideCollapsed)
const isDarkModel = ref(isDark.value ? 'dark' : 'light')

const emit = defineEmits(['toggle-aside'])

const toggleAside = () => {
  layoutStore.toggleAside()
  // 触发事件通知父组件
  emit('toggle-aside', isCollapse.value)
}

const { locale, t } = useI18n()

// 添加通知相关状态
const showNotifications = ref(false)
const notificationCount = ref(4)

const handleNotification = () => {
  showNotifications.value = !showNotifications.value
}

const closeNotifications = () => {
  showNotifications.value = false
}

const avatarUrl = ref(avatar)
const logoUrl = ref(logo)
// 模拟通知数据
const notifications = ref([
  {
    id: 1,
    avatar: 'https://placeholder.co/32',
    name: 'Terry Franci',
    action: 'requests permission to change',
    target: 'Project - Nganter App',
    type: 'Project',
    time: '5 min ago',
    status: 'online'
  },
  {
    id: 2,
    avatar: 'https://placeholder.co/32',
    name: 'Alena Franci',
    action: 'requests permission to change',
    target: 'Project - Nganter App',
    type: 'Project',
    time: '8 min ago',
    status: 'online'
  },
  {
    id: 3,
    avatar: 'https://placeholder.co/32',
    name: 'Jocelyn Kenter',
    action: 'requests permission to change',
    target: 'Project - Nganter App',
    type: 'Project',
    time: '15 min ago',
    status: 'online'
  }
])

const currentLang = ref(localStorage.getItem('language') || 'zh-CN')

const languages = [
  { value: 'zh-CN', label: t('header.zhCN'), flag: '🇨🇳' },
  { value: 'en-US', label: t('header.enUS'), flag: '🇺🇸' },
]

const handleLangChange = (lang: string) => {
  currentLang.value = lang
  locale.value = lang
  localStorage.setItem('language', lang)
}

// 初始化语言设置
watch(
  () => currentLang.value,
  (val) => {
    document.documentElement.lang = val
  },
  { immediate: true },
)

// 添加点击外部关闭逻辑
const notificationRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target as Node)) {
    showNotifications.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
const handleFullScreen = () => {
  const fullscreenElement = document.fullscreenElement
  if (!fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const toggleTheme = async (event: MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  if (!document.startViewTransition || isReducedMotion()) {
    toggleDark()
    return
  }

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}
// Watch system theme changes
watch(
  () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  (isDarkMode) => {
    isDark.value = isDarkMode
  },
)


// // 同步主题状态
// watch(isDark, (newValue) => {
//   isDarkModel.value = newValue ? "dark" : "light"
// })
</script>

<template>
  <el-header>
    <ul class="ul-menu">
      <!-- 左侧展开/收起按钮 -->
      <li class="ul-menu-item aside-toggle">

      </li>

      <!-- 中间标题 -->
      <li class="ul-menu-item flex-grow title-container">
        <div class="title-content">
          <el-avatar :src="logoUrl" alt="Logo" :size="40" />
          <span>{{ t('header.title') }}</span>
        </div>
      </li>

      <!-- 右侧功能区 -->
      <li class="ul-menu-item function-area">
        <el-space :size="20" class="function-buttons">
          <div class="action-buttons">
            <el-space :size="8">
              <el-switch class="theme-switch" v-model="isDarkModel" size="large" :active-action-icon="Moon"
                :inactive-action-icon="Sunny" style="--f1-switch-on-color: #2c2c2c" @click="toggleTheme" />
            </el-space>
            <el-space :size="8">
              <el-icon size="22px" @click="handleFullScreen">
                <FullScreen />
              </el-icon>
            </el-space>
            <el-dropdown trigger="hover" class="lang-dropdown">
              <el-space :size="8">
                <!-- <el-icon><Shop /></el-icon> -->
                <span class="current-lang">
                  <span class="flag">{{languages.find((l) => l.value === currentLang)?.flag}}</span>
                  {{languages.find((l) => l.value === currentLang)?.label}}
                </span>
              </el-space>
              <template #dropdown>
                <el-dropdown-menu class="lang-select-dropdown">
                  <el-dropdown-item v-for="item in languages" :key="item.value" @click="handleLangChange(item.value)">
                    <span class="lang-option">
                      <span class="flag">{{ item.flag }}</span>
                      {{ item.label }}
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div class="notification-wrapper" ref="notificationRef">
              <el-button class="notification-btn" :class="{ 'is-active': showNotifications }"
                @click="handleNotification">
                <el-badge :value="notificationCount" :hidden="!notificationCount">
                  <el-icon size="22px">
                    <Bell />
                  </el-icon>
                </el-badge>
              </el-button>

              <!-- 通知面板 -->
              <div class="notification-panel" v-if="showNotifications">
                <div class="panel-header">
                  <h3>Notification</h3>
                  <el-button class="close-btn" type="text" @click="closeNotifications">
                    <el-icon>
                      <Close />
                    </el-icon>
                  </el-button>
                </div>
                <div class="notification-list">
                  <div v-for="notification in notifications" :key="notification.id" class="notification-item">
                    <div class="avatar-wrapper">
                      <el-avatar :size="32" :src="notification.avatar" />
                      <span :class="['status-dot', notification.status]"></span>
                    </div>
                    <div class="notification-content">
                      <p class="message">
                        <span class="name">{{ notification.name }}</span>
                        <span class="action">{{ notification.action }}</span>
                        <span class="target">{{ notification.target }}</span>
                      </p>
                      <div class="meta">
                        <span class="type">{{ notification.type }}</span>
                        <span class="time">{{ notification.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel-footer">
                  <el-button type="primary" link>View All Notifications</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-space>
      </li>
    </ul>
  </el-header>
</template>

<style lang="scss">
.f1-popper {
  border-radius: 12px;
}

.f1-header {
  // height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0;
}

.ul-menu {
  position: relative;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-bottom: solid 1px var(--f1-menu-border-color);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: hsl(var(--f1-bg-color) / .2);
  justify-content: space-between;

  .ul-menu-item {
    padding: 0 20px;
    cursor: pointer;

    .f1-dropdown {
      cursor: pointer;

      .f1-dropdown-menu__item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .notice-badge {
      .f1-badge__content {
        z-index: 6;
      }
    }
  }

  .aside-toggle {
    width: 64px;
    // padding: 0;
    display: flex;
    justify-content: center;
  }

  .title-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    padding: 0;

    .title-content {
      display: flex;
      align-items: center;
      gap: 12px;

      .zs-logo {
        flex-shrink: 0;
      }

      span {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  .function-area {
    padding-right: 24px;
    min-width: 320px;

    .function-buttons {
      height: 100%;
      display: flex;
      align-items: center;

      .theme-switch {
        transition: width 0.8s ease-in-out;
        margin-right: 8px;
      }

      .action-buttons {
        display: flex;
        gap: 16px;
        margin: 0 16px;
        padding: 0 16px;
        border-left: 1px solid var(--f1-border-color-lighter);
        border-right: 1px solid var(--f1-border-color-lighter);

        .lang-dropdown {
          padding: 5px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: var(--f1-fill-color-light);
          }

          .current-lang {
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .flag {
            font-size: 16px;
          }
        }

        .f1-dropdown-menu {
          .lang-option {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 120px;
          }

          .f1-dropdown-menu__item {
            padding: 8px 16px;
            line-height: 1.5;
          }
        }

        .f1-button {
          padding: 8px;

          &:hover {
            background-color: var(--f1-fill-color-light);
          }
        }
      }

      .user-dropdown {
        .username {
          font-size: 14px;
          color: var(--f1-text-color-primary);
        }
      }
    }
  }
}

.ep-menu-item [class^='ep-icon'] {
  margin-right: 0px;
  font-size: 14px;
}

.ep-switch__core {
  cursor: pointer;
}

.ep-switch__core {
  border: 1px solid #c2c2c2;
}

.ep-switch__core:hover {
  border: 1px solid #377e22;
}

.ep-switch.is-checked .ep-switch__core {
  border: 1px solid #3c3f44;
}

.ep-switch.is-checked:hover .ep-switch__core {
  border: 1px solid #f7d366;
}

// 深色模式适配
// html.dark {
//   .ul-menu {
//     background-color: var(--f1-bg-color);
//     border-color: var(--f1-border-color-light);
//   }
// }

.lang-select-dropdown {
  min-width: 120px !important;
  padding: 10px !important;
  border-radius: 12px !important;
  overflow: hidden;

  .f1-select-dropdown__item {
    border-radius: 8px;
  }

  .f1-dropdown-menu__item {
    padding: 8px 12px;
    border-radius: 8px;
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: 8px;

    .flag {
      font-size: 16px;
    }
  }
}

.notification-wrapper {
  position: relative;

  .notification-btn {
    padding: 8px;
    height: auto;
    border: none;
    background: transparent;

    &.is-active {
      background-color: var(--el-fill-color-light);
    }

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  .notification-panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 380px;
    background: var(--el-bg-color);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .close-btn {
        padding: 4px;
        color: var(--el-text-color-secondary);

        &:hover {
          color: var(--el-text-color-primary);
        }
      }
    }

    .notification-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      padding: 16px 20px;
      gap: 12px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--el-fill-color-light);
      }

      .avatar-wrapper {
        position: relative;
        flex-shrink: 0;

        .status-dot {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid var(--el-bg-color);

          &.online {
            background-color: var(--el-color-success);
          }
        }
      }

      .notification-content {
        flex: 1;
        min-width: 0;

        .message {
          margin: 0 0 4px;
          font-size: 14px;
          line-height: 1.4;

          .name {
            font-weight: 600;
          }

          .action {
            color: var(--el-text-color-secondary);
          }

          .target {
            font-weight: 500;
          }
        }

        .meta {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: var(--el-text-color-secondary);

          .type {
            color: var(--el-color-primary);
          }
        }
      }
    }

    .panel-footer {
      padding: 12px;
      text-align: center;
      border-top: 1px solid var(--el-border-color-lighter);
    }
  }
}
</style>
