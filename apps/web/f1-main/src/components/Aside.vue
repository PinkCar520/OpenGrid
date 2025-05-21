<script lang="ts" setup>
import { ref, watch, computed, markRaw, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { trpc } from '@/api/trpc'
import { useTabsStore } from '../stores/tabs' // 使用 Pinia Store
import avatar from "../assets/avatar.png"

import { useLayoutStore } from '../stores/layout'
import {
  Moon,
  Sunny,
  FullScreen,
  Warning,
  ArrowDownBold,
  User,
  Key,
  SwitchButton,
  ArrowLeftBold,
  ArrowRightBold,
  Shop,
  ArrowUpBold,
} from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { MenuIcons } from '@/constants/icons'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const tabsStore = useTabsStore()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const isCollapse = computed(() => layoutStore.isAsideCollapsed)
const router = useRouter()
const route = useRoute()
const avatarUrl = ref(avatar)

const menuData = ref([]);

const fetchMenuData = async () => {
  try {
    const data = await trpc.menu.getMenuTree.query()
    // 处理菜单图标
    const processedData = data.map(item => ({
      ...item,
      data: {
        ...item.data,
        icon: markRaw(MenuIcons[item.data.icon]) // 假设后端返回的是图标名称
      }
    }))
    menuData.value = processedData
  } catch (error) {
    console.error('Failed to fetch menu data:', error)
    // 可以使用默认菜单数据作为fallback
  }
}
onMounted(() => {
  fetchMenuData()
})

// const menuData1 = ref([
//   {
//     id: 'dashboard',
//     parentId: null,
//     children: [],
//     data: {
//       id: 'dashboard',
//       label: 'route.menu.dashboard',
//       icon: markRaw(MenuIcons.dashboard),
//       title: 'route.menu.dashboard',
//       value: '/dashboard',
//     },
//   },
//   {
//     id: 'race',
//     parentId: null,
//     data: {
//       id: 'race',
//       label: 'route.menu.raceMicro.title',
//       icon: markRaw(MenuIcons.race),
//       title: 'route.menu.raceMicro.title',
//       value: '/race',
//     },
//     children: [
//       {
//         id: 'race-calendar',
//         parentId: 'race',
//         data: {
//           id: 'race-calendar',
//           label: 'route.menu.raceMicro.calendar',
//           icon: markRaw(MenuIcons.calendar),
//           title: 'route.menu.raceMicro.calendar',
//           value: '/race/calendar',
//         },
//         children: [],
//       },
//       {
//         id: 'race-results',
//         parentId: 'race',
//         data: {
//           id: 'race-results',
//           label: 'route.menu.raceMicro.results',
//           icon: markRaw(MenuIcons.results),
//           title: 'route.menu.raceMicro.results',
//           value: '/race/results',
//         },
//         children: [],
//       },
//       {
//         id: 'race-standings',
//         parentId: 'race',
//         data: {
//           id: 'race-standings',
//           label: 'route.menu.raceMicro.standings',
//           icon: markRaw(MenuIcons.standings),
//           title: 'route.menu.raceMicro.standings',
//           value: '/race/standings',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'team',
//     parentId: null,
//     data: {
//       id: 'team',
//       label: 'route.menu.teamMicro.title',
//       icon: markRaw(MenuIcons.team),
//       title: 'route.menu.teamMicro.title',
//       value: '/team',
//     },
//     children: [
//       {
//         id: 'team-garage',
//         parentId: 'team',
//         data: {
//           id: 'team-garage',
//           label: 'route.menu.teamMicro.garage',
//           icon: markRaw(MenuIcons.garage),
//           title: 'route.menu.teamMicro.garage',
//           value: '/team/garage',
//         },
//         children: [],
//       },
//       {
//         id: 'team-development',
//         parentId: 'team',
//         data: {
//           id: 'team-development',
//           label: 'route.menu.teamMicro.development',
//           icon: markRaw(MenuIcons.development),
//           title: 'route.menu.teamMicro.development',
//           value: '/team/development',
//         },
//         children: [],
//       },
//       {
//         id: 'team-personnel',
//         parentId: 'team',
//         data: {
//           id: 'team-personnel',
//           label: 'route.menu.teamMicro.personnel',
//           icon: markRaw(MenuIcons.personnel),
//           title: 'route.menu.teamMicro.personnel',
//           value: '/team/personnel',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'car',
//     parentId: null,
//     data: {
//       id: 'car',
//       label: 'route.menu.carMicro.title',
//       icon: markRaw(MenuIcons.car),
//       title: 'route.menu.carMicro.title',
//       value: '/car',
//     },
//     children: [
//       {
//         id: 'car-telemetry',
//         parentId: 'car',
//         data: {
//           id: 'car-telemetry',
//           label: 'route.menu.carMicro.telemetry',
//           icon: markRaw(MenuIcons.telemetry),
//           title: 'route.menu.carMicro.telemetry',
//           value: '/car/telemetry',
//         },
//         children: [],
//       },
//       {
//         id: 'car-setup',
//         parentId: 'car',
//         data: {
//           id: 'car-setup',
//           label: 'route.menu.carMicro.setup',
//           icon: markRaw(MenuIcons.setup),
//           title: 'route.menu.carMicro.setup',
//           value: '/car/setup',
//         },
//         children: [],
//       },
//       {
//         id: 'car-analysis',
//         parentId: 'car',
//         data: {
//           id: 'car-analysis',
//           label: 'route.menu.carMicro.analysis',
//           icon: markRaw(MenuIcons.analysis),
//           title: 'route.menu.carMicro.analysis',
//           value: '/car/analysis',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'driver',
//     parentId: null,
//     data: {
//       id: 'driver',
//       label: 'route.menu.driverMicro.title',
//       icon: markRaw(MenuIcons.driver),
//       title: 'route.menu.driverMicro.title',
//       value: '/driver',
//     },
//     children: [
//       {
//         id: 'driver-profile',
//         parentId: 'driver',
//         data: {
//           id: 'driver-profile',
//           label: 'route.menu.driverMicro.profile',
//           icon: markRaw(MenuIcons.profile),
//           title: 'route.menu.driverMicro.profile',
//           value: '/driver/profile',
//         },
//         children: [],
//       },
//       {
//         id: 'driver-performance',
//         parentId: 'driver',
//         data: {
//           id: 'driver-performance',
//           label: 'route.menu.driverMicro.performance',
//           icon: markRaw(MenuIcons.performance),
//           title: 'route.menu.driverMicro.performance',
//           value: '/driver/performance',
//         },
//         children: [],
//       },
//       {
//         id: 'driver-training',
//         parentId: 'driver',
//         data: {
//           id: 'driver-training',
//           label: 'route.menu.driverMicro.training',
//           icon: markRaw(MenuIcons.training),
//           title: 'route.menu.driverMicro.training',
//           value: '/driver/training',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'operations',
//     parentId: null,
//     data: {
//       id: 'operations',
//       label: 'route.menu.operationsMicro.title',
//       icon: markRaw(MenuIcons.operations),
//       title: 'route.menu.operationsMicro.title',
//       value: '/operations',
//     },
//     children: [
//       {
//         id: 'operations-planning',
//         parentId: 'operations',
//         data: {
//           id: 'operations-planning',
//           label: 'route.menu.operationsMicro.planning',
//           icon: markRaw(MenuIcons.planning),
//           title: 'route.menu.operationsMicro.planning',
//           value: '/operations/planning',
//         },
//         children: [],
//       },
//       {
//         id: 'operations-broadcast',
//         parentId: 'operations',
//         data: {
//           id: 'operations-broadcast',
//           label: 'route.menu.operationsMicro.broadcast',
//           icon: markRaw(MenuIcons.broadcast),
//           title: 'route.menu.operationsMicro.broadcast',
//           value: '/operations/broadcast',
//         },
//         children: [],
//       },
//       {
//         id: 'operations-logistics',
//         parentId: 'operations',
//         data: {
//           id: 'operations-logistics',
//           label: 'route.menu.operationsMicro.logistics',
//           icon: markRaw(MenuIcons.logistics),
//           title: 'route.menu.operationsMicro.logistics',
//           value: '/operations/logistics',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'track',
//     parentId: null,
//     data: {
//       id: 'track',
//       label: 'route.menu.trackMicro.title',
//       icon: markRaw(MenuIcons.track),
//       title: 'route.menu.trackMicro.title',
//       value: '/track',
//     },
//     children: [
//       {
//         id: 'track-conditions',
//         parentId: 'track',
//         data: {
//           id: 'track-conditions',
//           label: 'route.menu.trackMicro.conditions',
//           icon: markRaw(MenuIcons.conditions),
//           title: 'route.menu.trackMicro.conditions',
//           value: '/track/conditions',
//         },
//         children: [],
//       },
//       {
//         id: 'track-safety',
//         parentId: 'track',
//         data: {
//           id: 'track-safety',
//           label: 'route.menu.trackMicro.safety',
//           icon: markRaw(MenuIcons.safety),
//           title: 'route.menu.trackMicro.safety',
//           value: '/track/safety',
//         },
//         children: [],
//       },
//       {
//         id: 'track-strategy',
//         parentId: 'track',
//         data: {
//           id: 'track-strategy',
//           label: 'route.menu.trackMicro.strategy',
//           icon: markRaw(MenuIcons.strategy),
//           title: 'route.menu.trackMicro.strategy',
//           value: '/track/strategy',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'analytics',
//     parentId: null,
//     data: {
//       id: 'analytics',
//       label: 'route.menu.analyticsMicro.title',
//       icon: markRaw(MenuIcons.analytics),
//       title: 'route.menu.analyticsMicro.title',
//       value: '/analytics',
//     },
//     children: [
//       {
//         id: 'analytics-charts',
//         parentId: 'analytics',
//         data: {
//           id: 'analytics-charts',
//           label: 'route.menu.analyticsMicro.charts',
//           icon: markRaw(MenuIcons.charts),
//           title: 'route.menu.analyticsMicro.charts',
//           value: '/analytics/charts',
//         },
//         children: [],
//       },
//       {
//         id: 'analytics-prediction',
//         parentId: 'analytics',
//         data: {
//           id: 'analytics-prediction',
//           label: 'route.menu.analyticsMicro.prediction',
//           icon: markRaw(MenuIcons.prediction),
//           title: 'route.menu.analyticsMicro.prediction',
//           value: '/analytics/prediction',
//         },
//         children: [],
//       },
//       {
//         id: 'analytics-reports',
//         parentId: 'analytics',
//         data: {
//           id: 'analytics-reports',
//           label: 'route.menu.analyticsMicro.reports',
//           icon: markRaw(MenuIcons.reports),
//           title: 'route.menu.analyticsMicro.reports',
//           value: '/analytics/reports',
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: 'system',
//     parentId: null,
//     data: {
//       id: 'system',
//       label: 'route.menu.system.title',
//       icon: markRaw(MenuIcons.system),
//       title: 'route.menu.system.title',
//       value: '/system',
//     },
//     children: [
//       {
//         id: 'c3lzdGVtLXVzZXJz', // base64 for 'system-users'
//         parentId: 'c3lzdGVt',
//         data: {
//           id: 'c3lzdGVtLXVzZXJz',
//           label: 'route.menu.system.users',
//           icon: markRaw(MenuIcons.users),
//           title: 'route.menu.system.users',
//           value: '/system/users',
//         },
//         children: [],
//       },
//       {
//         id: 'c3lzdGVtLXJvbGVz', // base64 for 'system-roles'
//         parentId: 'c3lzdGVt',
//         data: {
//           id: 'c3lzdGVtLXJvbGVz',
//           label: 'route.menu.system.roles',
//           icon: markRaw(MenuIcons.roles),
//           title: 'route.menu.system.roles',
//           value: '/system/roles',
//         },
//         children: [],
//       },
//       {
//         id: 'c3lzdGVtLXBlcm1pc3Npb25z', // base64 for 'system-permissions'
//         parentId: 'c3lzdGVt',
//         data: {
//           id: 'c3lzdGVtLXBlcm1pc3Npb25z',
//           label: 'route.menu.system.permissions',
//           icon: markRaw(MenuIcons.permissions),
//           title: 'route.menu.system.permissions',
//           value: '/system/permissions',
//         },
//         children: [],
//       },
//     ],
//   }
// ])

const microApps = ref([])
function handleOpen(key: string, keyPath: string[]) {
  // console.log('handleOpen:', key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // console.log('handleClose:', key, keyPath)
}
function handleSelect(key: string, keyPath: string[]) {
}

const toggleAside = () => {
  layoutStore.toggleAside()
  // 触发事件通知父组件
  // emit('toggle-aside', isCollapse.value)
}
const handleSettings = () => {
  router.push('/settings')
}
// 处理退出登录
const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="aside-container">
    <el-menu :collapse="isCollapse" router :default-active="tabsStore.currentTab" class="aside-menu-wrapper"
      @open="handleOpen" @close="handleClose" @select="handleSelect">
      <template v-for="item in menuData" :index="item.data.value" :key="item.id">
        <el-menu-item v-if="!item.children.length" :index="item.data.value">
          <el-icon>
            <component :is="item.data.icon" />
          </el-icon>
          <template #title>{{ t(item.data.label) }}</template>
        </el-menu-item>
        <el-sub-menu :expand-close-icon="ArrowDownBold" :collapse-close-icon="ArrowRightBold"
          :collapse-open-icon="ArrowLeftBold" :expand-open-icon="ArrowUpBold" v-else :index="item.data.value"
          :key="item.id">
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
      <div class="user-dropdown">
        <el-dropdown trigger="click">
          <div class="user-info">
            <el-avatar shape="circle" :size="40" :src="avatarUrl" />
            <div class="user-text">
              <span class="name">{{ authStore.user?.name }}</span>
              <span class="email">{{ authStore.user?.email }}</span>
            </div>
            <el-icon class="arrow-icon">
              <ArrowDownBold />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="custom-dropdown">
              <div class="dropdown-header"></div>
              <div class="dropdown-menu">
                <el-dropdown-item class="menu-item" @click="handleSettings">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>My account</span>
                </el-dropdown-item>
                <el-dropdown-item class="menu-item">
                  <el-icon>
                    <Warning />
                  </el-icon>
                  <span>Support Info</span>
                </el-dropdown-item>
                <el-dropdown-item divided class="menu-item sign-out" @click="handleLogout">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  <span>Sign out</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-space>

    <el-button type="default" link @click="toggleAside" class="toggle-aside">
      <el-icon>
        <component :is="isCollapse ? ArrowRightBold : ArrowLeftBold" />
      </el-icon>
    </el-button>
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

.user-dropdown {
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--el-fill-color-light);
      // border-color: var(--el-border-color);

      .arrow-icon {
        transform: rotate(180deg);
      }
    }

    .user-text {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-primary);
        line-height: 1.4;
      }

      .email {
        font-size: 12px;
        color: var(--el-text-color-secondary);
        line-height: 1.4;
      }
    }

    .arrow-icon {
      margin-left: auto;
      color: var(--el-text-color-secondary);
      transition: transform 0.2s ease;
    }
  }
}

.custom-dropdown {
  min-width: 280px !important;
  padding: 0 !important;
  border-radius: 12px !important;
  overflow: hidden;

  .dropdown-header {
    // padding: 20px;
    background-color: var(--el-fill-color-light);
    // border-bottom: 1px solid var(--el-border-color-lighter);

    .user-info {
      margin-top: 16px;
      text-align: center;

      .name {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        margin-bottom: 4px;
      }

      .email {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .dropdown-menu {
    padding: 8px;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 44px;
      padding: 0 12px;
      margin: 4px 0;
      border-radius: 8px;
      color: var(--el-text-color-primary);

      .el-icon {
        margin: 0;
        font-size: 18px;
      }

      &:hover {
        background-color: var(--el-fill-color-light);
      }

      &.sign-out {
        color: var(--el-color-danger);
        margin-top: 8px;
        // border-top: 1px solid var(--el-border-color-lighter);

        .el-icon {
          color: var(--el-color-danger);
        }
      }
    }
  }
}

.toggle-aside {
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  padding: 5px;
  box-shadow: var(--el-box-shadow);
}
</style>
