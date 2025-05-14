<template>
  <el-container class="base-layout">
    <el-aside width="200px" v-if="showSidebar">
      <slot name="sidebar"></slot>
    </el-aside>
    <el-container>
      <el-header v-if="showHeader">
        <slot name="header"></slot>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
      <el-footer v-if="showFooter">
        <slot name="footer"></slot>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.base-layout {
  height: 100vh;
  
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
  }
  
  .el-aside {
    background-color: #304156;
  }
  
  .el-main {
    background-color: #f0f2f5;
    padding: 20px;
  }
  
  .el-footer {
    background-color: #fff;
    border-top: 1px solid #dcdfe6;
  }
}
</style> 