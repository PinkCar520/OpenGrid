<template>
  <div class="theme-switch">
    <el-switch
      v-model="isDark"
      class="dark-switch"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="onToggleDark"
    />
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--f1-menu-item-height)"
      >
        <i inline-flex i="dark:el-moon el-sunny" />
      </button>
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleDark } from '../composables/dark'
import { Moon, Sunny } from '@element-plus/icons-vue'

const isDark = ref(false)

const onToggleDark = () => {
  toggleDark()
}
</script>

<style scoped>
.theme-switch {
  margin-right: 20px;
}
.dark-switch {
  margin: 0 12px;
}
</style>
