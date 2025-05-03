<template>
  <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="tab in tabsStore.tabs"
        :key="tab.path"
        :value="tab.meta.title"
        :name="tab.path"
      >
      <template #label>
        <span>{{tab.meta.title}}</span>
        <i class="el-icon-close" @click.stop="handleTabRemove(tab.path)"></i>
      </template>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute, type RouteLocationMatched } from 'vue-router'
import { useTabsStore } from '../stores/tabs'
// import { generateTitle } from '../utils/i18n'
import { isMicroApp,closeSelectMicroTags } from '../config/loadedMicroAppLifeCycle'; // 使用 Pinia Store
import { useMicroAppStore } from '../stores/index'; // 使用 Pinia Store

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
interface Tab {
  title: string
  path: string
}

const router = useRouter();
const route = useRoute();
const tabsStore = useTabsStore();
const microAppStore = useMicroAppStore();
const allTabs = ref(tabsStore.tabs);
const activeTab = ref('/dashboard')


const generateTitle = (item: RouteLocationMatched) => {
  // const { meta, path } = item
  // console.log('item',item,meta?.title)
  // // 处理微应用的路由
  // if (isMicroApp(path)) {
  //   const appType = path.split('/')[1] // 获取微应用类型 (race/team/hev/hpv)
  //   return t(`${meta?.title}`)
  // }
  // console.log('meta?.title', t(`${meta?.title}`))
  // return t(`${meta?.title}`)
}
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    // const existingTab = tabsStore.tabs.find(tab => {
    //   // tab.path === newPath
    //   console.log('tab.path',tab)
    // })
    // if (!existingTab) {
    //   // tabsStore.addTabs(route)
    // }
    activeTab.value = newPath

    // if(isMicroApp(route.path)) {
    //   const childRoutePath = route.path.split("/").pop() || null;
    //   microAppStore.addChildRoute(childRoutePath);
    // }

  },
  { immediate: true}
)

// 处理标签点击
const handleTabClick = (tab: any) => {
  if(tab.props.name === route.path) return
  tabsStore.setCurrentTab(tab.props.name)
  console.log('当前选中的标签:', tab.props.name)
  console.log(route)
  // 如果当前标签是微前端应用，则需要关闭微前端应用
  // if (tab.props.name.startsWith('/insVue')) {
  //   closeSelectMicroTags(tab.props.name)
  // }
  // 跳转到选中的标签
  // 这里需要根据实际情况进行调整 
  router.push(tab.props.name)
}

// 处理标签关闭
const handleTabRemove = (targetPath: string) => {
  const tabIndex = allTabs.value.findIndex(tab => tab.path === targetPath)
  if (tabIndex === -1) return

  // 如果关闭的是当前激活的标签，需要激活其他标签
  if (activeTab.value === targetPath) {
    const nextTab = allTabs.value[tabIndex - 1] || allTabs.value[tabIndex + 1]
    if (nextTab) {
      router.push(nextTab.path)
    }
  }
  // 移除标签
  allTabs.value.splice(tabIndex, 1)
  closeSelectMicroTags(targetPath)
}
</script>

<style lang="scss" scoped>

</style> 