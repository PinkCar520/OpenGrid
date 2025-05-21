<template>
  <div class="telemetry-view">
    <el-row :gutter="24">
      <!-- 赛车3D模型展示 -->
      <el-col :span="16">
        <el-card class="model-card">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="title">赛车实时状态</span>
              <el-radio-group v-model="viewMode" size="small">
                <el-radio-button label="3d">3D视图</el-radio-button>
                <el-radio-button label="top">俯视图</el-radio-button>
                <el-radio-button label="side">侧视图</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <CarModelViewer ref="carModelRef" />
        </el-card>
        
        <!-- 遥测图表 -->
        <el-card class="chart-card mt-4">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="title">性能遥测</span>
              <el-select v-model="selectedMetric" size="small">
                <el-option label="速度" value="speed" />
                <el-option label="引擎转速" value="rpm" />
                <el-option label="轮胎温度" value="tireTemp" />
              </el-select>
            </div>
          </template>
          <div class="telemetry-chart">
            <LineChart :data="chartData" :options="chartOptions" height="200px" />
          </div>
        </el-card>
      </el-col>

      <!-- 实时数据面板 -->
      <el-col :span="8">
        <el-card class="data-card">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="title">实时数据</span>
              <el-tag :type="dataStatus.type">{{ dataStatus.text }}</el-tag>
            </div>
          </template>
          
          <div class="data-grid">
            <div v-for="item in telemetryData" :key="item.key" class="data-item">
              <el-statistic :title="item.label" :value="item.value">
                <template #suffix>{{ item.unit }}</template>
              </el-statistic>
            </div>
          </div>

          <!-- 轮胎信息 -->
          <div class="tire-info mt-4">
            <h4>轮胎状态</h4>
            <div class="tire-grid">
              <div v-for="tire in tireData" :key="tire.position" class="tire-item"
                :class="{ warning: tire.temp > 90 }">
                <div class="temp">{{ tire.temp }}°C</div>
                <div class="pressure">{{ tire.pressure }}psi</div>
                <div class="wear">{{ tire.wear }}%</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CarModelViewer from '@/components/CarModelViewer.vue'
import LineChart from '@/components/charts/LineChart.vue'

// 视图模式
const viewMode = ref('3d')
const selectedMetric = ref('speed')

// 遥测数据状态
const dataStatus = ref({
  type: 'success',
  text: '数据连接正常'
})

// 实时遥测数据
const telemetryData = ref([
  { key: 'speed', label: '当前速度', value: 285, unit: 'km/h' },
  { key: 'rpm', label: '引擎转速', value: 11500, unit: 'RPM' },
  { key: 'gear', label: '当前档位', value: 6, unit: '' },
  { key: 'throttle', label: '油门开度', value: 85, unit: '%' },
  { key: 'brake', label: '制动压力', value: 0, unit: 'bar' },
  { key: 'drs', label: 'DRS系统', value: '已启用', unit: '' }
])

// 轮胎数据
const tireData = ref([
  { position: 'FL', temp: 85, pressure: 23.5, wear: 92 },
  { position: 'FR', temp: 87, pressure: 23.4, wear: 91 },
  { position: 'RL', temp: 88, pressure: 22.8, wear: 89 },
  { position: 'RR', temp: 89, pressure: 22.9, wear: 88 }
])

// 图表数据
const chartData = ref({
  xAxis: Array.from({ length: 20 }, (_, i) => i),
  series: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100 + 200))
})

// 图表配置
const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'nearest',
    intersect: false
  },
  scales: {
    y: { beginAtZero: false }
  }
}

let wsConnection: WebSocket | null = null

// WebSocket连接
const initWebSocket = () => {
  wsConnection = new WebSocket('ws://localhost:3000/telemetry')
  
  wsConnection.onmessage = (event) => {
    const data = JSON.parse(event.data)
    updateTelemetryData(data)
  }
}

const updateTelemetryData = (data: any) => {
  // 更新遥测数据
}

onMounted(() => {
  initWebSocket()
})

onUnmounted(() => {
  wsConnection?.close()
})
</script>

<style lang="scss" scoped>
.telemetry-view {
  padding: 24px;
  
  .model-card {
    height: 500px;
  }
  
  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .tire-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 16px;
    
    .tire-item {
      padding: 12px;
      border-radius: 8px;
      background: var(--el-fill-color-light);
      text-align: center;
      
      &.warning {
        background: var(--el-color-danger-light);
      }
      
      .temp {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  
  .title {
    font-size: 16px;
    font-weight: 600;
  }
  
  .mt-4 {
    margin-top: 16px;
  }
}
</style>
