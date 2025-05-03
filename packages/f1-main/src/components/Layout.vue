<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <Aside />
        </el-aside>
        <el-container>
          <el-main>
            <Breadcrumb />
            <TabsView />
            <BaseApp />
            <MicroApp />
          </el-main>
          <el-footer>
            <el-text>ZeroSphere Admin Design</el-text>
            <el-text>Powered by ZeroSphere Desgin</el-text>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { House, User, Bell, ArrowDown, FullScreen } from '@element-plus/icons-vue'
import TabsView from './TabsView.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { useDark } from '@vueuse/core'
import Aside from './Aside.vue'
import Breadcrumb from './Breadcrumb.vue'
import { useLayoutStore } from '../stores/layout'

const isDark = useDark()
const layoutStore = useLayoutStore()
const asideWidth = computed(() => layoutStore.isAsideCollapsed ? '64px' : '240px')

const handleInternational = () => {
  console.log('国际化')
}
</script>

<style>
/* 引入 Element Plus 暗黑模式的样式 */
@import 'element-plus/theme-chalk/dark/css-vars.css';
</style>

<style lang="scss">
.common-layout {
  .el-header,
  .el-aside,
  .el-main,
  .el-footer {
    transition: width 0.8s ease-in-out;
  }

  .el-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
