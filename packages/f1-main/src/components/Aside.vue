<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '../stores/tabs' // 使用 Pinia Store
import { useLayoutStore } from '../stores/layout'

import { useI18n } from 'vue-i18n'
import { MenuIcons } from '@/constants/icons'

const { t } = useI18n()
const tabsStore = useTabsStore()
const layoutStore = useLayoutStore()
const isCollapse = computed(() => layoutStore.isAsideCollapsed)
const router = useRouter()
const route = useRoute()
const menuData = ref([
  {
    id: 'dashboard',
    parentId: null,
    children: [],
    data: {
      id: 'dashboard',
      label: 'route.menu.dashboard',
      icon: MenuIcons.dashboard,
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
      icon: MenuIcons.race,
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
          icon: MenuIcons.calendar,
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
          icon: MenuIcons.results,
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
          icon: MenuIcons.standings,
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
      icon: MenuIcons.team,
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
          icon: MenuIcons.garage,
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
          icon: MenuIcons.development,
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
          icon: MenuIcons.personnel,
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
      icon: MenuIcons.car,
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
          icon: MenuIcons.telemetry,
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
          icon: MenuIcons.setup,
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
          icon: MenuIcons.analysis,
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
      icon: MenuIcons.driver,
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
          icon: MenuIcons.profile,
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
          icon: MenuIcons.performance,
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
          icon: MenuIcons.training,
          title: 'route.menu.driverMicro.training',
          value: '/driver/training',
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
      icon: MenuIcons.system,
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
          icon: MenuIcons.users,
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
          icon: MenuIcons.roles,
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
          icon: MenuIcons.permissions,
          title: 'route.menu.system.permissions',
          value: '/system/permissions',
        },
        children: [],
      },
    ],
  },
])

const microApps = ref([])
function handleOpen(key: string, keyPath: string[]) {
  // console.log('handleOpen:', key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // console.log('handleClose:', key, keyPath)
}
function handleSelect(key: string, keyPath: string[]) {
  if (tabsStore.currentTab === key) return
  tabsStore.setCurrentTab(key)
  // tabsStore.addTabs(route)
  const existTab = tabsStore.tabs.find((item) => item.path === key)
  console.log('existTab:', existTab)
  if(existTab) {
  } else {
    // tabsStore.setCurrentTab(key);
  //   tabsStore.addTabs(route)
  //   console.log('不存在的tab:', key)
    }
  // if (existTab) {
  //   console.log(existTab,'existTab')
  //   tabsStore.setCurrentTab(key)
  // } else {
  //   console.log('不存在的tab:', key)
  //   tabsStore.setCurrentTab(key)
  //   tabsStore.addTabs(route)
  //   const selectMenu = menuData.value
  //     .flatMap((item) => item.children)
  //     .find((item) => item?.data?.value === key)
  //   if (selectMenu) {
  //     // tabsStore.tabs.push({ title: selectroute.menu.data.title, path: selectroute.menu.data.value })

  //   }
  // }
}
</script>

<template>
  <el-scrollbar>
    <el-menu
    :collapse="isCollapse"
    router
    :default-active="tabsStore.currentTab"
    class="el-menu-vertical-vm"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
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
  </el-scrollbar>

</template>
<style lang="scss" scoped>
.el-menu-vertical-vm {
  height: 100vh;
  transition: width 0.8s ease-in-out;
  border-right: none;
  
  :deep(.el-menu-item) {
    &.is-active {
      background-color: var(--f1-color-primary-light-9);
      color: var(--f1-color-primary);
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--f1-color-primary);
      }
    }
  }
}
</style>
