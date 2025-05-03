<template>
  <div class="telemetry">
    <div class="telemetry-header">
      <el-select v-model="selectedDriver" placeholder="选择车手">
        <el-option
          v-for="driver in drivers"
          :key="driver.id"
          :label="driver.name"
          :value="driver.id"
        >
          <div class="driver-option">
            <el-avatar :src="driver.photo" :size="24" />
            <span>{{ driver.name }}</span>
          </div>
        </el-option>
      </el-select>

      <div class="lap-selector">
        <el-button-group>
          <el-button :disabled="currentLap <= 1" @click="prevLap">
            <el-icon><ArrowLeft /></el-icon>
          </el-button>
          <el-button>Lap {{ currentLap }}/{{ totalLaps }}</el-button>
          <el-button :disabled="currentLap >= totalLaps" @click="nextLap">
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </el-button-group>
      </div>

      <el-switch
        v-model="isLive"
        active-text="实时数据"
        :loading="isLive"
      />
    </div>

    <el-row :gutter="20" class="telemetry-content">
      <el-col :span="16">
        <el-card class="track-map">
          <div ref="trackMapRef" style="height: 400px"></div>
          
          <div class="car-info">
            <div class="info-item">
              <span>速度</span>
              <span class="value">{{ currentSpeed }} km/h</span>
            </div>
            <div class="info-item">
              <span>引擎转速</span>
              <span class="value">{{ currentRPM }} RPM</span>
            </div>
            <div class="info-item">
              <span>档位</span>
              <span class="value">{{ currentGear }}</span>
            </div>
            <div class="info-item">
              <span>DRS</span>
              <el-tag :type="drsEnabled ? 'success' : 'info'">
                {{ drsEnabled ? '启用' : '关闭' }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="telemetry-charts">
          <el-tabs v-model="activeChart">
            <el-tab-pane label="速度" name="speed">
              <div ref="speedChartRef" style="height: 200px"></div>
            </el-tab-pane>
            <el-tab-pane label="油门/刹车" name="throttle">
              <div ref="throttleChartRef" style="height: 200px"></div>
            </el-tab-pane>
            <el-tab-pane label="G值" name="gforce">
              <div ref="gforceChartRef" style="height: 200px"></div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const selectedDriver = ref('')
const currentLap = ref(1)
const totalLaps = ref(58)
const isLive = ref(false)
const activeChart = ref('speed')

// 遥测数据
const currentSpeed = ref(285)
const currentRPM = ref(11800)
const currentGear = ref(7)
const drsEnabled = ref(true)

let wsConnection: WebSocket | null = null

onMounted(() => {
  // 初始化图表
  initCharts()
  
  if (isLive.value) {
    connectWebSocket()
  }
})

onUnmounted(() => {
  if (wsConnection) {
    wsConnection.close()
  }
})

function connectWebSocket() {
  wsConnection = new WebSocket('ws://your-telemetry-server.com')
  // 处理实时数据更新
}

// ...其他实现代码
</script>

<style lang="scss" scoped>
.telemetry {
  padding: 20px;

  .telemetry-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .driver-option {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .car-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 20px;
    
    .info-item {
      text-align: center;
      
      .value {
        display: block;
        font-size: 24px;
        font-weight: bold;
        margin-top: 4px;
      }
    }
  }
}
</style>
