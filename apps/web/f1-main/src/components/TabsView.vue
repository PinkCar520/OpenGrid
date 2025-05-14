<template>
    <el-tabs
    class="tabs"
      v-model="tabsStore.currentTab"
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
:deep(.f1-tabs__item) {
  margin-right: 5px;
  border-radius: 12px;
  // color: var(--f1-text-color-primary);
  padding: 0px 20px !important;
}
:deep(.f1-tabs__nav-wrap)::after {
  height: 0px !important;
}
:deep(.f1-tabs__header) {
  background-color: var(--f1-border-color-light);
    padding: 5px;
    border-radius: 12px;
}
:deep(.f1-tabs__item.is-active) {
  background-color: #fff !important;
  border: 1px solid #eee;
  // color: var(--f1-text-color-primary);
}
:deep(.f1-tabs__active-bar) {
  height: 0px;
  background-color: none;
}
.f1-tabs--card > .f1-tabs__header .f1-tabs__item.is-active.is-closable {
  padding: 0px 20px !important;
}
.f1-tabs--card > .f1-tabs__header .f1-tabs__item:first-child{
  border-left: none;
}
</style>
