<template>
  <div class="race-results">
    <el-card>
      <template #header>
        <div class="header-content">
          <el-select v-model="selectedRace" placeholder="选择比赛">
            <el-option
              v-for="race in races"
              :key="race.id"
              :label="race.name"
              :value="race.id"
            />
          </el-select>
          <div class="session-tabs">
            <el-radio-group v-model="selectedSession">
              <el-radio-button label="FP1">练习赛1</el-radio-button>
              <el-radio-button label="FP2">练习赛2</el-radio-button>
              <el-radio-button label="FP3">练习赛3</el-radio-button>
              <el-radio-button label="Q">排位赛</el-radio-button>
              <el-radio-button label="R">正赛</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </template>

      <el-table :data="sessionResults" stripe>
        <el-table-column prop="position" label="位置" width="80" />
        <el-table-column prop="driver" label="车手">
          <template #default="{ row }">
            <div class="driver-info">
              <el-avatar :src="row.driverPhoto" :size="32" />
              <span>{{ row.driver }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="team" label="车队" />
        <el-table-column prop="time" label="用时/退赛原因" />
        <el-table-column prop="gap" label="差距" width="100" />
        <el-table-column prop="points" label="积分" width="80" />
      </el-table>

      <!-- 圈速分析图表 -->
      <div class="lap-analysis">
        <h3>圈速分析</h3>
        <div ref="chartRef" style="height: 400px"></div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const selectedRace = ref('')
const selectedSession = ref('R')
const chartRef = ref()

const races = ref([
  { id: '2025-01', name: '2025 巴林大奖赛' },
  { id: '2025-02', name: '2025 沙特阿拉伯大奖赛' }
])

const sessionResults = ref([
  {
    position: 1,
    driver: 'Max Verstappen',
    driverPhoto: '/drivers/verstappen.png',
    team: 'Red Bull Racing',
    time: '1:30:31.421',
    gap: 'Leader',
    points: 25
  }
])

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  // 配置图表选项
})
</script>

<style lang="scss" scoped>
.race-results {
  padding: 20px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .driver-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lap-analysis {
    margin-top: 30px;
  }
}
</style>
