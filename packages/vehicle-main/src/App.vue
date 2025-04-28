<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div class="em-wrapper">
    <el-config-provider :locale="zhCn" namespace="em">
    <RouterView v-slot="{ Component }">
      <keep-alive :max="10">
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"/>
    </RouterView>
  </el-config-provider>
  </div>
</template>

<style lang="scss">
.el {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
