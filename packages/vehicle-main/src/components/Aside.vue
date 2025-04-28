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
    id: '123',
    parentId: null,
    children: [],
    data: {
      id: '123',
      label: '首页',
      icon: 'House',
      title: 'myTask',
      value: '/dashboard',
    }
  },
  {
    id: '1234',
    parentId: null,
    data: {
      id: '1234',
      label: '系统管理',
      icon: 'Setting',
      title: 'myTask',
      value: '/system',
    },
    children: [
      {
        id: '1234A',
        parentId: '123456',
        data: {
          id: '1234A',
          label: '用户管理',
          icon: 'User',
          title: 'myTask',
          value: '/system/users',
        },
        children: [],
      },
      {
        id: '1234B',
        parentId: '1234',
        data: {
          id: '1234B',
          label: '角色管理',
          icon: 'List',
          title: 'myTask',
          value: '/system/roles',
        },
        children: [],
      },
      {
        id: '1234C',
        parentId: '1234',
        data: {
          id: '1234C',
          label: '权限管理',
          icon: 'Document',
          title: 'myTask',
          value: '/system/permissions'
        },
        children: [],
      }
    ]
  },
  {
    id: '12345',
    parentId: null,
    data: {
      id: '12345',
      label: '新能源汽车',
      icon: 'List',
      title: 'myTask',
      value: '/myTask',
    },
    children: [
      {
        id: '123456A',
        parentId: '12345',
        data: {
          id: '123456A',
          label: '纯电动汽车应用',
          icon: 'List',
          title: 'bevHome',
          value: '/bev/bevHome',
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