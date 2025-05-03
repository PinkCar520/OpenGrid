<template>
  <div class="race-management">
    <el-tabs class="race-tabs" v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="赛历管理" name="calendar">
        <router-view v-if="activeTab === 'calendar'" />
      </el-tab-pane>
      <el-tab-pane label="比赛结果" name="results">
        <router-view v-if="activeTab === 'results'" />
      </el-tab-pane>
      <el-tab-pane label="积分排名" name="standings">
        <router-view v-if="activeTab === 'standings'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeTab = ref('calendar')

// 根据当前路由设置激活的标签
watch(() => route.path, (newPath) => {
  const path = newPath.split('/').pop()
  if (path) {
    activeTab.value = path
  }
}, { immediate: true })

const handleTabClick = (tab: any) => {
  router.push(`/race/${tab.props.name}`)
}
</script>

<style lang="scss" scoped>
.race-management {
  padding: 20px;
  
  .race-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }
  }
}
</style>
