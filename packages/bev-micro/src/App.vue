<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { ref, onMounted, onUnmounted } from "vue";

interface Messages {
  childRoute?: string[];
}
const message = ref<Messages>({});

onMounted(() => {
  window.addEventListener("childRoute-event", handleChildRouteMessage);
});
onUnmounted(() => {
  window.removeEventListener("childRoute-event", handleChildRouteMessage);
});
const handleChildRouteMessage = (event: any) => {
  message.value = event.detail;
  console.log(message.value, "childRoutes");
};
</script>

<template>
  <div class="bev-wrapper">
    <el-config-provider :locale="zhCn" namespace="bev">
      <router-view v-slot="{ Component }">
        <keep-alive :max="10">
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
      </router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss">
.bev-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
