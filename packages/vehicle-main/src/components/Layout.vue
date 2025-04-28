<template>
  <div>
    <Header />
    <el-container class="main-container flex">
      <Aside />
      <el-container class="main-content">
        <tabs-view />
        <el-main>
          <BaseApp />
          <MicroApp />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  House,
  User,
  Bell,
  ArrowDown,
  FullScreen,
} from "@element-plus/icons-vue";
import TabsView from "./TabsView.vue";
import ThemeSwitch from "./ThemeSwitch.vue";
import { useDark } from "@vueuse/core";
import Aside from "./Aside.vue";

const isDark = useDark();

const handleInternational = () => {
  console.log("国际化");
};
</script>

<style>
/* 引入 Element Plus 暗黑模式的样式 */
@import "element-plus/theme-chalk/dark/css-vars.css";
</style>

<style scoped>
.ep-main {
  background-color: #f5f7fa;
  height: 100%;
}

#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  display: flex;
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
.main-content {
  display: flex;
  flex-direction: column;
}
</style>
