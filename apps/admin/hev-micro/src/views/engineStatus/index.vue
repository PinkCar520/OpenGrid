<template>
  <div class="hev-engine__status">
    <h1>发动机状态监控</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>发动机运行状态</span>
            </div>
          </template>
          <div class="engine-info">
            <el-progress
              type="dashboard"
              :percentage="engineLoad"
              :color="getEngineColor"
              :format="formatLoad"
            />
            <div class="status-info">
              <p>运转时间: {{ runningTime }}h</p>
              <p>发动机转速: {{ engineRPM }}RPM</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>性能指标</span>
            </div>
          </template>
          <div class="performance-info">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="perf-item">
                  <h4>机油压力</h4>
                  <p>{{ oilPressure }}MPa</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="perf-item">
                  <h4>机油温度</h4>
                  <p>{{ oilTemp }}°C</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mt-4">
              <el-col :span="12">
                <div class="perf-item">
                  <h4>冷却液温度</h4>
                  <p>{{ coolantTemp }}°C</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="perf-item">
                  <h4>燃料消耗</h4>
                  <p>{{ fuelConsumption }}L/h</p>
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
              <span>运行日志</span>
            </div>
          </template>
          <div class="engine-logs">
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in engineLogs"
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

const engineLoad = ref(65)
const runningTime = ref(126)
const engineRPM = ref(1800)
const oilPressure = ref(0.45)
const oilTemp = ref(85)
const coolantTemp = ref(78)
const fuelConsumption = ref(8.5)

const getEngineColor = computed(() => {
  if (engineLoad.value > 90) return '#F56C6C'
  if (engineLoad.value > 75) return '#E6A23C'
  return '#67C23A'
})

const formatLoad = (percentage: number) => {
  return `${percentage}% 负荷`
}

const engineLogs = ref([
  {
    content: '发动机正常启动',
    time: '2024-02-20 09:00',
    type: 'success'
  },
  {
    content: '负荷率正常',
    time: '2024-02-20 09:05',
    type: 'info'
  },
  {
    content: '油温偏高，请注意',
    time: '2024-02-20 09:15',
    type: 'warning'
  }
])
</script>

<style lang="scss" scoped>
.hev-engine__status {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;

  h1 {
    font-size: 24px;
    color: var(--hev-color-primary);
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .engine-info {
    text-align: center;
    padding: 20px 0;

    .status-info {
      margin-top: 15px;
      
      p {
        margin: 8px 0;
        color: #666;
      }
    }
  }

  .performance-info {
    padding: 10px;

    .perf-item {
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      h4 {
        color: #666;
        margin-bottom: 8px;
        font-size: 14px;
      }
      
      p {
        font-size: 20px;
        font-weight: bold;
        color: var(--hev-color-primary);
        margin: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .engine-logs {
    padding: 10px;
    height: 300px;
    overflow-y: auto;

    .f1-timeline-item {
      padding-bottom: 15px;

      &:last-child {
        padding-bottom: 0;
      }

      .f1-timeline-item__timestamp {
        color: #909399;
      }
    }
  }

  .mt-4 {
    margin-top: 16px;
  }

  .f1-card {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
