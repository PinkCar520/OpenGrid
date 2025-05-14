<template>
  <div class="car-performance">
    <el-tabs class="car-tabs" v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="遥测数据" name="telemetry">
        <router-view v-if="activeTab === 'telemetry'" />
      </el-tab-pane>
      <el-tab-pane label="赛车设置" name="setup">
        <router-view v-if="activeTab === 'setup'" />
      </el-tab-pane>
      <el-tab-pane label="性能分析" name="analysis">
        <router-view v-if="activeTab === 'analysis'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeTab = ref('telemetry')

watch(() => route.path, (newPath) => {
  const path = newPath.split('/').pop()
  if (path) {
    activeTab.value = path
  }
}, { immediate: true })

const handleTabClick = (tab: any) => {
  router.push(`/car/${tab.props.name}`)
}
</script>

<style lang="scss" scoped>
.car-performance {
  padding: 20px;
}
</style>
