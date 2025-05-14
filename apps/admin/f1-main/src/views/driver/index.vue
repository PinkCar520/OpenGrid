<template>
  <div class="driver-center">
    <el-tabs class="driver-tabs" v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="车手档案" name="profile">
        <router-view v-if="activeTab === 'profile'" />
      </el-tab-pane>
      <el-tab-pane label="表现分析" name="performance">
        <router-view v-if="activeTab === 'performance'" />
      </el-tab-pane>
      <el-tab-pane label="训练数据" name="training">
        <router-view v-if="activeTab === 'training'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeTab = ref('profile')

watch(() => route.path, (newPath) => {
  const path = newPath.split('/').pop()
  if (path) {
    activeTab.value = path
  }
}, { immediate: true })

const handleTabClick = (tab: any) => {
  router.push(`/driver/${tab.props.name}`)
}
</script>

<style lang="scss" scoped>
.driver-center {
  padding: 20px;
}
</style>
