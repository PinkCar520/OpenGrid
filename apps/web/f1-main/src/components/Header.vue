<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '../stores/layout'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const layoutStore = useLayoutStore()
const isCollapse = computed(() => layoutStore.isAsideCollapsed)
const emit = defineEmits(['toggle-aside'])

const toggleAside = () => {
  layoutStore.toggleAside()
  // 触发事件通知父组件
  emit('toggle-aside', isCollapse.value)
}

const { locale, t } = useI18n()

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm(t('header.logoutConfirm'), t('common.tips'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning',
  })
    .then(() => {
      // TODO: 调用退出登录接口
      router.push('/login')
      ElMessage({
        type: 'success',
        message: t('header.logoutSuccess'),
      })
    })
    .catch(() => {})
}

// 处理消息点击
const handleNotification = () => {
  // TODO: 打开消息面板
}

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
</script>

<template>
<el-header>
  <ul class="ul-menu">
    <!-- 左侧展开/收起按钮 -->
    <li class="ul-menu-item aside-toggle">
      <el-button type="default" circle @click="toggleAside">
        <el-icon size="20px">
          <component :is="isCollapse ? ArrowRight : ArrowLeft" />
        </el-icon>
      </el-button>
    </li>

    <!-- 中间标题 -->
    <li class="ul-menu-item flex-grow title-container">
      <div class="title-content">
        <span>{{ t('header.title') }}</span>
      </div>
    </li>

    <!-- 右侧功能区 -->
    <li class="ul-menu-item function-area">
      <el-space :size="20" class="function-buttons">

        <div class="action-buttons">
          <el-dropdown trigger="hover" class="lang-dropdown" placement="bottom-start">
            <el-space :size="8">
              <!-- <el-icon><Shop /></el-icon> -->
              <span class="current-lang">
                <span class="flag">{{ languages.find((l) => l.value === currentLang)?.flag }}</span>
                {{ languages.find((l) => l.value === currentLang)?.label }}
              </span>
            </el-space>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in languages"
                  :key="item.value"
                  @click="handleLangChange(item.value)"
                >
                  <span class="lang-option">
                    <span class="flag">{{ item.flag }}</span>
                    {{ item.label }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button type="info" link>
            <el-tooltip :content="t('header.notifications')" placement="bottom">
              <el-badge :value="3" class="notice-badge">
                <el-icon size="22px"><Bell /></el-icon>
              </el-badge>
            </el-tooltip>
          </el-button>
        </div>

        <div class="user-dropdown">
          <el-dropdown trigger="click">
            <el-space :size="10">
              <el-avatar size="small" src="https://placeholder.com/30x30" />
              <span class="username">{{ t('header.admin') }}</span>
              <el-icon><ArrowDown /></el-icon>
            </el-space>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>{{ t('header.profile') }}
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Key /></el-icon>{{ t('header.changePassword') }}
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>{{ t('header.logout') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-space>
    </li>
  </ul>
</el-header>
</template>

<style lang="scss">
.f1-header {
  // height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5000;
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
  background-color:  hsl(var(--f1-bg-color) / .2);
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
  .f1-select-dropdown__item {
    padding: 8px 12px;
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
</style>
