<template>
  <div class="fce-fuelcell__dashboard">
    <h1>燃料电池仪表盘</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>氢气储量</span>
            </div>
          </template>
          <div class="tank-status">
            <el-progress
              type="dashboard"
              :percentage="hydrogenLevel"
              :color="getHydrogenColor"
            />
            <div class="status-info">
              <p>剩余里程: {{ remainingRange }}km</p>
              <p>储氢压力: {{ tankPressure }}MPa</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>电池组状态</span>
            </div>
          </template>
          <div class="stack-status">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="status-item">
                  <h4>电堆电压</h4>
                  <p>{{ stackVoltage }}V</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="status-item">
                  <h4>电堆电流</h4>
                  <p>{{ stackCurrent }}A</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mt-4">
              <el-col :span="12">
                <div class="status-item">
                  <h4>电堆功率</h4>
                  <p>{{ stackPower }}kW</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="status-item">
                  <h4>电堆效率</h4>
                  <p>{{ stackEfficiency }}%</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>系统温度</span>
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
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>性能趋势</span>
            </div>
          </template>
          <div class="performance-trend">
            <div class="chart-placeholder">
              <el-empty description="图表加载中..." />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>系统日志</span>
            </div>
          </template>
          <div class="system-logs">
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in systemLogs"
                :key="index"
                :type="log.type"
                :timestamp="log.time"
              >
                {{ log.content }}
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

const hydrogenLevel = ref(65)
const remainingRange = ref(380)
const tankPressure = ref(35)
const stackVoltage = ref(360)
const stackCurrent = ref(180)
const stackPower = ref(65)
const stackEfficiency = ref(58)
const temperatures = ref([65, 68, 63, 67, 64, 66])

const getHydrogenColor = computed(() => {
  if (hydrogenLevel.value < 20) return '#F56C6C'
  if (hydrogenLevel.value < 50) return '#E6A23C'
  return '#67C23A'
})

const getTempClass = (temp: number) => {
  if (temp > 75) return 'temp-high'
  if (temp < 55) return 'temp-low'
  return 'temp-normal'
}

const systemLogs = ref([
  {
    content: '系统启动自检完成',
    time: '2024-02-20 09:00',
    type: 'success'
  },
  {
    content: '氢气压力正常',
    time: '2024-02-20 09:05',
    type: 'info'
  },
  {
    content: '电堆温度偏高，启动冷却',
    time: '2024-02-20 09:15',
    type: 'warning'
  }
])
</script>

<style lang="scss" scoped>
.fce-fuelcell__dashboard {
  padding: 20px;

  h1 {
    font-size: 24px;
    color: var(--fce-color-primary);
    margin-bottom: 20px;
  }

  .tank-status,
  .stack-status {
    text-align: center;
    padding: 20px 0;

    .status-info {
      margin-top: 15px;
    }
  }

  .status-item {
    background-color: #f5f7fa;
    padding: 15px;
    border-radius: 4px;
    
    h4 {
      color: #666;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 20px;
      font-weight: bold;
      color: var(--fce-color-primary);
      margin: 0;
    }
  }

  .temperature-monitor {
    .temp-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
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

  .performance-trend {
    .chart-placeholder {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
    }
  }

  .system-logs {
    padding: 10px;
    height: 300px;
    overflow-y: auto;
  }

  .mt-4 {
    margin-top: 20px;
  }
}
</style>
