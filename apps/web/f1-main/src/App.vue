<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div class="el-wrapper">
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
