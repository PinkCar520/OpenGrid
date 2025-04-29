<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useTabsStore } from '../stores/tabs'; // 使用 Pinia Store

import { useI18n } from 'vue-i18n'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  House,
  User,
  List
} from '@element-plus/icons-vue'

const { t } = useI18n()
const tabsStore = useTabsStore();
const menuData = ref([
  {
    id: 'aG9tZQ==', // base64 for 'home'
    parentId: null,
    children: [],
    data: {
      id: 'aG9tZQ==',
      label: '首页',
      icon: 'House',
      title: 'dashboard',
      value: '/dashboard',
    }
  },
  {
    id: 'c3lzdGVt', // base64 for 'system'
    parentId: null,
    data: {
      id: 'c3lzdGVt',
      label: '系统管理',
      icon: 'Setting',
      title: 'system',
      value: '/system',
    },
    children: [
      {
        id: 'c3lzdGVtLXVzZXJz', // base64 for 'system-users'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXVzZXJz',
          label: '用户管理',
          icon: 'User',
          title: 'users',
          value: '/system/users',
        },
        children: [],
      },
      {
        id: 'c3lzdGVtLXJvbGVz', // base64 for 'system-roles'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXJvbGVz',
          label: '角色管理',
          icon: 'List',
          title: 'roles',
          value: '/system/roles',
        },
        children: [],
      },
      {
        id: 'c3lzdGVtLXBlcm1pc3Npb25z', // base64 for 'system-permissions'
        parentId: 'c3lzdGVt',
        data: {
          id: 'c3lzdGVtLXBlcm1pc3Npb25z',
          label: '权限管理',
          icon: 'Document',
          title: 'permissions',
          value: '/system/permissions'
        },
        children: [],
      }
    ]
  },
  {
    id: 'bmV3RW5lcmd5', // base64 for 'newEnergy'
    parentId: null,
    data: {
      id: 'bmV3RW5lcmd5',
      label: '新能源汽车',
      icon: 'List',
      title: 'myTask',
      value: '/myTask',
    },
    children: [
      {
        id: 'YmV2LWhvbWU=', // base64 for 'bev-home'
        parentId: 'bmV3RW5lcmd5',
        data: {
          id: 'YmV2LWhvbWU=',
          label: '纯电动汽车应用',
          icon: 'List',
          title: 'bevHome',
          value: '/bev/bevHome',
        },
        children: [],
      },
      {
        id: 'ZmNlLWhvbWU=', // base64 for 'fce-home'
        parentId: 'bmV3RW5lcmd5',
        data: {
          id: 'ZmNlLWhvbWU=',
          label: '燃料电池汽车应用',
          icon: 'List',
          title: 'fceHome',
          value: '/fce/fceHome',
        },
        children: [],
      },
      {
        id: 'aGV2LWhvbWU=', // base64 for 'hev-home'
        parentId: 'bmV3RW5lcmd5',
        data: {
          id: 'aGV2LWhvbWU=',
          label: '混合动力汽车应用',
          icon: 'List',
          title: 'hevHome',
          value: '/hev/hevHome',
        },
        children: [],
      },
      {
        id: 'aHB2LWhvbWU=', // base64 for 'hpv-home'
        parentId: 'bmV3RW5lcmd5',
        data: {
          id: 'aHB2LWhvbWU=',
          label: '插电式混动汽车应用',
          icon: 'List',
          title: 'hpvHome',
          value: '/hpv/hpvHome',
        },
        children: [],
      },
    ]
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
  if (tabsStore.currentTab === key) return;
  const existTab = tabsStore.tabs.find(item => item.path === key);
  if (existTab) {
    tabsStore.setCurrentTab(key);
  } else {
    const selectMenu = menuData.value.flatMap(item => item.children).find(item => item?.data?.value === key);
    if (selectMenu) {
      tabsStore.tabs.push({ title: selectMenu.data.title, path: selectMenu.data.value });
      tabsStore.setCurrentTab(key);
      tabsStore.addTabs(tabsStore.tabs);
    }
  }
}
</script>

<template>
  <el-menu router :default-active="tabsStore.currentTab" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    @select="handleSelect">
    <template v-for="item in menuData" :index="item.data.value" :key="item.id">
      <el-menu-item v-if="!item.children.length" :index="item.data.value">
        <template #title>
          <el-icon><component :is="item.data.icon" /></el-icon>
          <span>{{ item.data.label }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.data.value" :key="item.id">
        <template #title>
          <el-icon><component :is="item.data.icon" /></el-icon>
          <span>{{ item.data.label }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :index="child.data.value" :key="child.data.id">
          <el-icon><component :is="child.data.icon" /></el-icon>
          <template #title>{{ child.data.label }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>