<script setup lang="ts">
import { useRouter,useRoute,RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="el-wrapper">
    <el-config-provider :locale="zhCn" namespace="el">
      <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss">
.el-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
