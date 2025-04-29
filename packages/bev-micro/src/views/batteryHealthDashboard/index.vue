<template>
  <div class="bev-battery-dashboard">
    <h1>电池健康仪表盘</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>电池电量</span>
            </div>
          </template>
          <div class="battery-status">
            <el-progress
              type="dashboard"
              :percentage="batteryLevel"
              :color="getBatteryColor"
            />
            <div class="status-info">
              <p>剩余里程: {{ remainingRange }}km</p>
              <p>充电时间: {{ chargingTime }}min</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>电池健康度</span>
            </div>
          </template>
          <div class="health-status">
            <el-progress
              type="circle"
              :percentage="batteryHealth"
              :color="getHealthColor"
            />
            <div class="health-info">
              <el-tag :type="getHealthStatus.type">{{ getHealthStatus.label }}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>充放电次数</span>
            </div>
          </template>
          <div class="cycle-info">
            <h3>{{ cycleTimes }}次</h3>
            <el-progress :percentage="cyclePercentage" :format="formatCycle" />
            <p>预计剩余: {{ remainingCycles }}次</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>温度监控</span>
            </div>
          </template>
          <div class="temperature-monitor">
            <div class="temp-grid">
              <div v-for="(temp, index) in temperatures" :key="index" class="temp-item">
                <div class="temp-value" :class="getTempClass(temp)">{{ temp }}°C</div>
                <div class="temp-label">模块 {{ index + 1 }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>性能建议</span>
            </div>
          </template>
          <div class="suggestions">
            <el-timeline>
              <el-timeline-item
                v-for="(suggestion, index) in suggestions"
                :key="index"
                :type="suggestion.type"
                :timestamp="suggestion.time"
              >
                {{ suggestion.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const batteryLevel = ref(75)
const remainingRange = ref(320)
const chargingTime = ref(45)
const batteryHealth = ref(92)
const cycleTimes = ref(258)
const temperatures = ref([35, 38, 36, 42, 37, 39])

const getBatteryColor = computed(() => {
  if (batteryLevel.value < 20) return '#F56C6C'
  if (batteryLevel.value < 50) return '#E6A23C'
  return '#67C23A'
})

const getHealthColor = computed(() => {
  if (batteryHealth.value < 60) return '#F56C6C'
  if (batteryHealth.value < 80) return '#E6A23C'
  return '#67C23A'
})

const getHealthStatus = computed(() => {
  if (batteryHealth.value >= 90) return { type: 'success', label: '优秀' }
  if (batteryHealth.value >= 80) return { type: 'warning', label: '良好' }
  return { type: 'danger', label: '需要检查' }
})

const cyclePercentage = computed(() => (cycleTimes.value / 1500) * 100)
const remainingCycles = computed(() => 1500 - cycleTimes.value)

const formatCycle = (percentage: number) => {
  return `${cycleTimes.value}/1500`
}

const getTempClass = (temp: number) => {
  if (temp > 40) return 'temp-high'
  if (temp < 25) return 'temp-low'
  return 'temp-normal'
}

const suggestions = ref([
  {
    content: '建议进行电池均衡充电',
    time: '2024-02-20',
    type: 'warning'
  },
  {
    content: '电池温度正常，性能良好',
    time: '2024-02-19',
    type: 'success'
  },
  {
    content: '完成例行健康检查',
    time: '2024-02-18',
    type: 'info'
  }
])
</script>

<style lang="scss" scoped>
.bev-battery-dashboard {
  padding: 20px;

  h1 {
    font-size: 24px;
    color: var(--bev-color-primary);
    margin-bottom: 20px;
  }

  .battery-status,
  .health-status,
  .cycle-info {
    text-align: center;
    padding: 20px 0;

    .status-info,
    .health-info {
      margin-top: 15px;
    }
  }

  .cycle-info {
    h3 {
      font-size: 24px;
      color: var(--bev-color-primary);
      margin-bottom: 15px;
    }
  }

  .temperature-monitor {
    .temp-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }

    .temp-item {
      text-align: center;
      
      .temp-value {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;

        &.temp-high { color: #F56C6C; }
        &.temp-normal { color: #67C23A; }
        &.temp-low { color: #409EFF; }
      }

      .temp-label {
        font-size: 12px;
        color: #666;
      }
    }
  }

  .mt-4 {
    margin-top: 20px;
  }

  .suggestions {
    padding: 10px;
  }
}
</style>