<script setup lang="ts">
import { onMounted } from 'vue'
import { useTabsStore } from './stores/tabs'
import { useAuthStore } from './stores/auth'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const tabsStore = useTabsStore()
const authStore = useAuthStore()

onMounted(() => {
  // 如果已登录，则恢复tabs状态
  if (authStore.isAuthenticated) {
    tabsStore.restoreTabs()
  }
})
</script>

<template>
 <div class="f1-wrapper">
  <el-config-provider :locale="zhCn" namespace="f1">
    <router-view />
  </el-config-provider>
 </div>
</template>

<style lang="scss">
.f1-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
