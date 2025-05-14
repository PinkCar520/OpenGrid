<template>
  <div class="hpv-power-system">
    <h1>动力系统状态监控</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>发动机状态</span>
              <el-tag :type="engineRunning ? 'success' : 'info'">
                {{ engineRunning ? '运行中' : '待机' }}
              </el-tag>
            </div>
          </template>
          <div class="engine-info">
            <el-descriptions border :column="2">
              <el-descriptions-item label="发动机转速">
                {{ engineRPM }} RPM
              </el-descriptions-item>
              <el-descriptions-item label="发动机温度" :label-style="warningTempStyle">
                {{ engineTemp }} °C
              </el-descriptions-item>
              <el-descriptions-item label="工作模式">
                {{ workMode }}
              </el-descriptions-item>
              <el-descriptions-item label="燃料消耗">
                {{ fuelConsumption }} L/100km
              </el-descriptions-item>
            </el-descriptions>
            <div class="power-distribution mt-4">
              <h4>动力分配</h4>
              <el-progress :percentage="enginePowerRatio" :format="formatPowerRatio" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>电机状态</span>
              <el-tag :type="motorActive ? 'success' : 'info'">
                {{ motorActive ? '工作中' : '待机' }}
              </el-tag>
            </div>
          </template>
          <div class="motor-info">
            <el-descriptions border :column="2">
              <el-descriptions-item label="电机功率">
                {{ motorPower }} kW
              </el-descriptions-item>
              <el-descriptions-item label="电机温度">
                {{ motorTemp }} °C
              </el-descriptions-item>
              <el-descriptions-item label="能量回收">
                {{ regeneration ? '开启' : '关闭' }}
              </el-descriptions-item>
              <el-descriptions-item label="电机效率">
                {{ motorEfficiency }}%
              </el-descriptions-item>
            </el-descriptions>
            <div class="efficiency-chart mt-4">
              <h4>效率曲线</h4>
              <div class="chart-placeholder">
                <el-empty description="图表加载中..." />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const engineRunning = ref(true)
const engineRPM = ref(1500)
const engineTemp = ref(92)
const workMode = ref('混动模式')
const fuelConsumption = ref(5.8)
const enginePowerRatio = ref(65)

const motorActive = ref(true)
const motorPower = ref(45)
const motorTemp = ref(65)
const regeneration = ref(true)
const motorEfficiency = ref(92)

const warningTempStyle = computed(() => ({
  color: engineTemp.value > 90 ? '#f56c6c' : ''
}))

const formatPowerRatio = (percentage: number) => `发动机占比 ${percentage}%`
</script>

<style lang="scss" scoped>
.hpv-power-system {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    color: var(--hpv-color-primary);
    margin-bottom: 20px;
  }

  .f1-card {
    margin-bottom: 20px;
  }

  .card-header {
    span {
      font-weight: bold;
    }
  }

  .engine-info,
  .motor-info {
    margin-top: 10px;
  }
}

.power-distribution,
.efficiency-chart {
  margin-top: 20px;
  h4 {
    margin-bottom: 15px;
    color: var(--hpv-color-primary);
  }
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
