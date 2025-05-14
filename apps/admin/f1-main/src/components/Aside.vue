<script lang="ts" setup>
import { ref, watch, computed, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '../stores/tabs' // 使用 Pinia Store
import { isReducedMotion } from '../utils'

import { useLayoutStore } from '../stores/layout'
import { isDark, toggleDark } from '../composables'
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
import { useI18n } from 'vue-i18n'
import { MenuIcons } from '@/constants/icons'

const { t } = useI18n()
const tabsStore = useTabsStore()
const layoutStore = useLayoutStore()
const isCollapse = computed(() => layoutStore.isAsideCollapsed)
const router = useRouter()
const route = useRoute()
const isDarkModel = ref(isDark.value ? 'dark' : 'light')

const menuData = ref([
  {
    id: 'dashboard',
    parentId: null,
    children: [],
    data: {
      id: 'dashboard',
      label: 'route.menu.dashboard',
      icon: markRaw(MenuIcons.dashboard),
      title: 'route.menu.dashboard',
      value: '/dashboard',
    },
  },
  {
    id: 'race',
    parentId: null,
    data: {
      id: 'race',
      label: 'route.menu.raceMicro.title',
      icon: markRaw(MenuIcons.race),
      title: 'route.menu.raceMicro.title',
      value: '/race',
    },
    children: [
      {
        id: 'race-calendar',
        parentId: 'race',
        data: {
          id: 'race-calendar',
          label: 'route.menu.raceMicro.calendar',
          icon: markRaw(MenuIcons.calendar),
          title: 'route.menu.raceMicro.calendar',
          value: '/race/calendar',
        },
        children: [],
      },
      {
        id: 'race-results',
        parentId: 'race',
        data: {
          id: 'race-results',
          label: 'route.menu.raceMicro.results',
          icon: markRaw(MenuIcons.results),
          title: 'route.menu.raceMicro.results',
          value: '/race/results',
        },
        children: [],
      },
      {
        id: 'race-standings',
        parentId: 'race',
        data: {
          id: 'race-standings',
          label: 'route.menu.raceMicro.standings',
          icon: markRaw(MenuIcons.standings),
          title: 'route.menu.raceMicro.standings',
          value: '/race/standings',
        },
        children: [],
      },
    ],
  },
  {
    id: 'team',
    parentId: null,
    data: {
      id: 'team',
      label: 'route.menu.teamMicro.title',
      icon: markRaw(MenuIcons.team),
      title: 'route.menu.teamMicro.title',
      value: '/team',
    },
    children: [
      {
        id: 'team-garage',
        parentId: 'team',
        data: {
          id: 'team-garage',
          label: 'route.menu.teamMicro.garage',
          icon: markRaw(MenuIcons.garage),
          title: 'route.menu.teamMicro.garage',
          value: '/team/garage',
        },
        children: [],
      },
      {
        id: 'team-development',
        parentId: 'team',
        data: {
          id: 'team-development',
          label: 'route.menu.teamMicro.development',
          icon: markRaw(MenuIcons.development),
          title: 'route.menu.teamMicro.development',
          value: '/team/development',
        },
        children: [],
      },
      {
        id: 'team-personnel',
        parentId: 'team',
        data: {
          id: 'team-personnel',
          label: 'route.menu.teamMicro.personnel',
          icon: markRaw(MenuIcons.personnel),
          title: 'route.menu.teamMicro.personnel',
          value: '/team/personnel',
        },
        children: [],
      },
    ],
  },
  {
    id: 'car',
    parentId: null,
    data: {
      id: 'car',
      label: 'route.menu.carMicro.title',
      icon: markRaw(MenuIcons.car),
      title: 'route.menu.carMicro.title',
      value: '/car',
    },
    children: [
      {
        id: 'car-telemetry',
        parentId: 'car',
        data: {
          id: 'car-telemetry',
          label: 'route.menu.carMicro.telemetry',
          icon: markRaw(MenuIcons.telemetry),
          title: 'route.menu.carMicro.telemetry',
          value: '/car/telemetry',
        },
        children: [],
      },
      {
        id: 'car-setup',
        parentId: 'car',
        data: {
          id: 'car-setup',
          label: 'route.menu.carMicro.setup',
          icon: markRaw(MenuIcons.setup),
          title: 'route.menu.carMicro.setup',
          value: '/car/setup',
        },
        children: [],
      },
      {
        id: 'car-analysis',
        parentId: 'car',
        data: {
          id: 'car-analysis',
          label: 'route.menu.carMicro.analysis',
          icon: markRaw(MenuIcons.analysis),
          title: 'route.menu.carMicro.analysis',
          value: '/car/analysis',
        },
        children: [],
      },
    ],
  },
  {
    id: 'driver',
    parentId: null,
    data: {
      id: 'driver',
      label: 'route.menu.driverMicro.title',
      icon: markRaw(MenuIcons.driver),
      title: 'route.menu.driverMicro.title',
      value: '/driver',
    },
    children: [
      {
        id: 'driver-profile',
        parentId: 'driver',
        data: {
          id: 'driver-profile',
          label: 'route.menu.driverMicro.profile',
          icon: markRaw(MenuIcons.profile),
          title: 'route.menu.driverMicro.profile',
          value: '/driver/profile',
        },
        children: [],
      },
      {
        id: 'driver-performance',
        parentId: 'driver',
        data: {
          id: 'driver-performance',
          label: 'route.menu.driverMicro.performance',
          icon: markRaw(MenuIcons.performance),
          title: 'route.menu.driverMicro.performance',
          value: '/driver/performance',
        },
        children: [],
      },
      {
        id: 'driver-training',
        parentId: 'driver',
        data: {
          id: 'driver-training',
          label: 'route.menu.driverMicro.training',
          icon: markRaw(MenuIcons.training),
          title: 'route.menu.driverMicro.training',
          value: '/driver/training',
        },
        children: [],
      },
    ],
  },
  {
    id: 'operations',
    parentId: null,
    data: {
      id: 'operations',
      label: 'route.menu.operationsMicro.title',
      icon: markRaw(MenuIcons.operations),
      title: 'route.menu.operationsMicro.title',
      value: '/operations',
    },
    children: [
      {
        id: 'operations-planning',
        parentId: 'operations',
        data: {
          id: 'operations-planning',
          label: 'route.menu.operationsMicro.planning',
          icon: markRaw(MenuIcons.planning),
          title: 'route.menu.operationsMicro.planning',
          value: '/operations/planning',
        },
        children: [],
      },
      {
        id: 'operations-broadcast',
        parentId: 'operations',
        data: {
          id: 'operations-broadcast',
          label: 'route.menu.operationsMicro.broadcast',
          icon: markRaw(MenuIcons.broadcast),
          title: 'route.menu.operationsMicro.broadcast',
          value: '/operations/broadcast',
        },
        children: [],
      },
      {
        id: 'operations-logistics',
        parentId: 'operations',
        data: {
          id: 'operations-logistics',
          label: 'route.menu.operationsMicro.logistics',
          icon: markRaw(MenuIcons.logistics),
          title: 'route.menu.operationsMicro.logistics',
          value: '/operations/logistics',
        },
        children: [],
      },
    ],
  },
  {
    id: 'track',
    parentId: null,
    data: {
      id: 'track',
      label: 'route.menu.trackMicro.title',
      icon: markRaw(MenuIcons.track),
      title: 'route.menu.trackMicro.title',
      value: '/track',
    },
    children: [
      {
        id: 'track-conditions',
        parentId: 'track',
        data: {
          id: 'track-conditions',
          label: 'route.menu.trackMicro.conditions',
          icon: markRaw(MenuIcons.conditions),
          title: 'route.menu.trackMicro.conditions',
          value: '/track/conditions',
        },
        children: [],
      },
      {
        id: 'track-safety',
        parentId: 'track',
        data: {
          id: 'track-safety',
          label: 'route.menu.trackMicro.safety',
          icon: markRaw(MenuIcons.safety),
          title: 'route.menu.trackMicro.safety',
          value: '/track/safety',
        },
        children: [],
      },
      {
        id: 'track-strategy',
        parentId: 'track',
        data: {
          id: 'track-strategy',
          label: 'route.menu.trackMicro.strategy',
          icon: markRaw(MenuIcons.strategy),
          title: 'route.menu.trackMicro.strategy',
          value: '/track/strategy',
        },
        children: [],
      },
    ],
  },
  {
    id: 'analytics',
    parentId: null,
    data: {
      id: 'analytics',
      label: 'route.menu.analyticsMicro.title',
      icon: markRaw(MenuIcons.analytics),
      title: 'route.menu.analyticsMicro.title',
      value: '/analytics',
    },
    children: [
      {
        id: 'analytics-charts',
        parentId: 'analytics',
        data: {
          id: 'analytics-charts',
          label: 'route.menu.analyticsMicro.charts',
          icon: markRaw(MenuIcons.charts),
          title: 'route.menu.analyticsMicro.charts',
          value: '/analytics/charts',
        },
        children: [],
      },
      {
        id: 'analytics-prediction',
        parentId: 'analytics',
        data: {
          id: 'analytics-prediction',
          label: 'route.menu.analyticsMicro.prediction',
          icon: markRaw(MenuIcons.prediction),
          title: 'route.menu.analyticsMicro.prediction',
          value: '/analytics/prediction',
        },
        children: [],
      },
      {
        id: 'analytics-reports',
        parentId: 'analytics',
        data: {
          id: 'analytics-reports',
          label: 'route.menu.analyticsMicro.reports',
          icon: markRaw(MenuIcons.reports),
          title: 'route.menu.analyticsMicro.reports',
          value: '/analytics/reports',
        },
        children: [],
      },
    ],
  },
  {
    id: 'system',
    parentId: null,
    data: {
      id: 'system',
      label: 'route.menu.system.title',
      icon: markRaw(MenuIcons.system),
      title: 'route.menu.system.title',
      value: '/system',
    },
    children: [
      {
        id: 'c3lzdGVtLXVzZXJz', // base64 for 'system-users'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXVzZXJz',
          label: 'route.menu.system.users',
          icon: markRaw(MenuIcons.users),
          title: 'route.menu.system.users',
          value: '/system/users',
        },
        children: [],
      },
      {
        id: 'c3lzdGVtLXJvbGVz', // base64 for 'system-roles'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXJvbGVz',
          label: 'route.menu.system.roles',
          icon: markRaw(MenuIcons.roles),
          title: 'route.menu.system.roles',
          value: '/system/roles',
        },
        children: [],
      },
      {
        id: 'c3lzdGVtLXBlcm1pc3Npb25z', // base64 for 'system-permissions'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXBlcm1pc3Npb25z',
          label: 'route.menu.system.permissions',
          icon: markRaw(MenuIcons.permissions),
          title: 'route.menu.system.permissions',
          value: '/system/permissions',
        },
        children: [],
      },
    ],
  }
])

const microApps = ref([])
function handleOpen(key: string, keyPath: string[]) {
  // console.log('handleOpen:', key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // console.log('handleClose:', key, keyPath)
}
function handleSelect(key: string, keyPath: string[]) {
}
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
  <div class="aside-container">
    <el-menu :collapse="isCollapse" router :default-active="tabsStore.currentTab"
      class="aside-menu-wrapper" @open="handleOpen" @close="handleClose" @select="handleSelect">
      <template v-for="item in menuData" :index="item.data.value" :key="item.id">
        <el-menu-item v-if="!item.children.length" :index="item.data.value">
          <el-icon>
            <component :is="item.data.icon" />
          </el-icon>
          <template #title>{{ t(item.data.label) }}</template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.data.value" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="item.data.icon" />
            </el-icon>
            <span>{{ t(item.data.label) }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.data.value" :key="child.data.id">
            <el-icon>
              <component :is="child.data.icon" />
            </el-icon>
            <template #title>{{ t(child.data.label) }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
    <el-space :size="20" class="aside-action__buttons">
      <el-space :size="8">
        <el-switch class="theme-switch" v-model="isDarkModel" size="large" :active-action-icon="Moon"
          :inactive-action-icon="Sunny" style="--f1-switch-on-color: #2c2c2c" @click="toggleTheme" />
      </el-space>
      <el-button type="info" link @click="handleFullScreen">
        <el-icon size="22px">
          <FullScreen />
        </el-icon>
      </el-button>
    </el-space>
  </div>
</template>

<style lang="scss" scoped>
.aside-container {
  height: 100vh;
  // display: flex;
  // flex-direction: column;
  // background: #fff;
  display: grid;
  grid-template-rows: repeat(12, minmax(0, 1fr));
}

.aside-menu-wrapper {
  flex: 1 1;
  overflow-y: auto;
  min-height: 0;
  // height: 90%;
  grid-row: span 10 / span 10;
}

.aside-action__buttons {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
  padding: 0 16px;
  border-top: solid 1px var(--f1-menu-border-color);
}

.aside-menu-wrapper {
  font-weight: 500;
  overflow-y: auto;
  padding: 10px 20px;
  transition: width 0.3s ease-in-out;
  border-right: none;

  :deep(.f1-menu-item),
  :deep(.f1-sub-menu__title) {}

  &:not(.f1-menu--collapse) {
    .f1-menu-item {}
  }

  :deep(.f1-menu-item) {
    &:hover {}
  }

  :deep(.f1-menu) {
    &.is-opened {
      padding-left: 30px;
    }
  }
}

.f1-menu-item {
  margin: 5px 0px;
  border-radius: 12px;
}

:deep(.f1-sub-menu__title) {
  margin: 5px 0px;
  border-radius: 12px;
}

:deep(.f1-sub-menu__title:hover) {
  // background-color: #f4f4f5 !important;
}

.f1-menu-item:hover {
  // background-color: #f4f4f5 !important;
}

.f1-menu-item.is-active {
  
  // background-color: var(--f1-menu-bg-primary-color);
}
</style>
