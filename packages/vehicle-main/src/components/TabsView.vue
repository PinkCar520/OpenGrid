<template>
  <div class="tabs-view">
    <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="tab in allTabs"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
      >
      <template #label>
      <span>{{generateTitle('route',tab.title) }}</span>
        <i class="el-icon-close" @click.stop="handleTabRemove(tab.path)"></i>
      </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '../stores/tabs'
import { generateTitle } from '../utils/i18n'
import { isMicroApp,closeSelectMicroTags } from '../config/loadedMicroAppLifeCycle'; // 使用 Pinia Store
import { useMicroAppStore } from '../stores/index'; // 使用 Pinia Store


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
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    const existingTab = allTabs.value.find(tab => tab.path === newPath)
    if (!existingTab) {
      allTabs.value.push({
        title: route.meta.title as string || '未命名',
        path: newPath
      })
    }
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

<style scoped>
.tabs-view {
  padding: 5px 10px;
  border-bottom: 1px solid #dcdfe6;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav) {
  border: none;
}

:deep(.el-tabs__item) {
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdfe6 !important;
  margin: 0 2px;
  border-radius: 3px;
}

:deep(.el-tabs__item.is-active) {
  border-bottom: 1px solid #409eff !important;
}
</style> 