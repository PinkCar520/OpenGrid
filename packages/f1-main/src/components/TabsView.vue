<template>
  <el-tabs
      v-model="tabsStore.currentTab"
      type="card"
      :closable="tabsStore.tabs.length > 1"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove">
      <el-tab-pane
        v-for="tab in tabsStore.tabs"
        :key="tab.path"
        :value="tab.meta.title"
        :name="tab.path"
      >
      <template #label>
        <span>{{tab.meta.title}}</span>
        <i class="el-icon-close"></i>
      </template>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '../stores/tabs'

const router = useRouter();
const route = useRoute();
const tabsStore = useTabsStore();

const handleTabClick = (tab: any) => {
  if(tab.props.name === route.path) return
  router.push(tab.props.name)
}
const handleTabRemove = (currentTab: any):void => {
  tabsStore.removeCurrentTab(currentTab)
}
</script>

<style lang="scss" scoped>

</style> 