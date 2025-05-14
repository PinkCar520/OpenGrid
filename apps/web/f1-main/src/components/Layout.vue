<template>
  <div class="common-layout">
    <Header />
    <div class="common-container">
      <el-aside :class="[
        'common-aside',
        layoutStore.isAsideCollapsed ? 'common-aside__collapse' : 'common-aside__expand',
      ]">
        <Aside />
      </el-aside>
      <el-main :class="[
        'common-main',
        layoutStore.isAsideCollapsed ? 'common-main__collapse' : 'common-main__expand',
      ]">
        <section style="padding: 20px">
          <Breadcrumb />
          <TabsView />
          <BaseApp />
          <MicroApp />
          <el-footer class="common-footer">
            <el-text>Formula One Admin Design</el-text>
            <el-text>Powered by Formula One Desgin</el-text>
          </el-footer>
        </section>
      </el-main>
    </div>
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
const asideWidth = computed(() => (layoutStore.isAsideCollapsed ? '101px' : '241px'))

const handleInternational = () => {
  console.log('国际化')
}
</script>

<style>
/* 引入 Element Plus 暗黑模式的样式 */
@import 'element-plus/theme-chalk/dark/css-vars.css';
</style>

<style lang="scss" scoped>
.common-layout {
  overflow: auto;
  height: 100vh;

  .f1-header,
  .f1-aside,
  .f1-main,
  .f1-footer {
    transition: all 0.6s ease-in-out;
  }

  .common-aside__expand {
    width: 241px;
  }

  .common-aside__collapse {
    width: 101px;
  }

  .common-main__collapse {
    padding-left: 101px;
  }

  .common-main__expand {
    padding-left: 241px;
  }

  .common-footer {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.common-container {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.common-aside {
  height: 100vh;
  grid-column: span 2 / span 2;
  position: fixed;
  left: 0;
  z-index: 100;
  display: grid;
  border-right: 1px solid var(--f1-menu-border-color);;
}

.common-main {
  position: relative;
  width: 100%;
  height: 100%;
  grid-column: span 12 / span 12;
  // background-color: #f8f8f8;
}

.common-ai {
  position: fixed;
  right: 0;
  grid-column: span 1 / span 1;
  z-index: 200;

  .ai-card {
    min-width: 100px;
    height: 85vh;
  }
}
</style>
