<template>
  <div class="hev-battery__status">
    <h1>混动电池状态</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>电池电量</span>
            </div>
          </template>
          <div class="battery-info">
            <el-progress
              type="dashboard"
              :percentage="batteryLevel"
              :color="getBatteryColor"
            />
            <div class="status-info">
              <p>剩余里程: {{ remainingRange }}km</p>
              <p>能量回收: {{ regeneration ? '开启' : '关闭' }}</p>
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
          <div class="battery-status">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="status-item">
                  <h4>电压</h4>
                  <p>{{ voltage }}V</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="status-item">
                  <h4>电流</h4>
                  <p>{{ current }}A</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mt-4">
              <el-col :span="12">
                <div class="status-item">
                  <h4>温度</h4>
                  <p>{{ temperature }}°C</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="status-item">
                  <h4>功率</h4>
                  <p>{{ power }}kW</p>
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
              <span>能量流向</span>
            </div>
          </template>
          <div class="energy-flow">
            <div class="flow-diagram">
              <el-empty description="能量流向图加载中..." />
            </div>
            <div class="flow-stats">
              <p>充电功率: {{ chargingPower }}kW</p>
              <p>放电功率: {{ dischargingPower }}kW</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const batteryLevel = ref(85)
const remainingRange = ref(150)
const regeneration = ref(true)
const voltage = ref(350)
const current = ref(120)
const temperature = ref(35)
const power = ref(42)
const chargingPower = ref(15)
const dischargingPower = ref(28)

const getBatteryColor = computed(() => {
  if (batteryLevel.value < 20) return '#F56C6C'
  if (batteryLevel.value < 50) return '#E6A23C'
  return '#67C23A'
})
</script>

<style lang="scss" scoped>
.hev-battery__status {
  padding: 20px;

  h1 {
    font-size: 24px;
    color: var(--hev-color-primary);
    margin-bottom: 20px;
  }

  .battery-info {
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
      color: var(--hev-color-primary);
      margin: 0;
    }
  }

  .energy-flow {
    .flow-diagram {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
      margin-bottom: 15px;
    }

    .flow-stats {
      text-align: center;
      p {
        margin: 8px 0;
        color: #666;
      }
    }
  }

  .mt-4 {
    margin-top: 16px;
  }
}
</style>
