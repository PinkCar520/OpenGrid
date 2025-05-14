<template>
  <div class="hpv-charging-status">
    <h1>充电状态监控</h1>
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
            >
              <template #default="{ percentage }">
                <div class="progress-content">
                  <h3>{{ percentage }}%</h3>
                  <p>剩余电量</p>
                </div>
              </template>
            </el-progress>
            <div class="status-details">
              <div class="detail-item">
                <el-icon><Location /></el-icon>
                <span>剩余里程: {{ remainingRange }}km</span>
              </div>
              <div class="detail-item">
                <el-icon><Timer /></el-icon>
                <span>充满需要: {{ timeToFull }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>充电模式</span>
            </div>
          </template>
          <div class="charging-mode">
            <el-radio-group v-model="chargingMode" class="mode-select">
              <el-radio-button label="fast">快速充电</el-radio-button>
              <el-radio-button label="normal">标准充电</el-radio-button>
              <el-radio-button label="eco">经济模式</el-radio-button>
            </el-radio-group>
            <div class="mode-details mt-4">
              <el-descriptions border>
                <el-descriptions-item label="当前电流">
                  {{ currentAmpere }}A
                </el-descriptions-item>
                <el-descriptions-item label="充电功率">
                  {{ chargingPower }}kW
                </el-descriptions-item>
                <el-descriptions-item label="充电电压">
                  {{ voltage }}V
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>充电计划</span>
            </div>
          </template>
          <div class="charging-schedule">
            <el-form :model="scheduleForm" label-position="top">
              <el-form-item label="定时充电">
                <el-switch v-model="scheduleForm.enabled" />
              </el-form-item>
              <el-form-item label="开始时间" v-if="scheduleForm.enabled">
                <el-time-picker
                  v-model="scheduleForm.startTime"
                  format="HH:mm"
                  placeholder="选择时间"
                />
              </el-form-item>
              <el-form-item label="目标电量" v-if="scheduleForm.enabled">
                <el-slider
                  v-model="scheduleForm.targetLevel"
                  :step="5"
                  :marks="batteryMarks"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Location, Timer } from '@element-plus/icons-vue'

const batteryLevel = ref(45)
const remainingRange = ref(180)
const timeToFull = ref('3小时20分钟')
const chargingMode = ref('normal')
const currentAmpere = ref(32)
const chargingPower = ref(7.4)
const voltage = ref(230)

const scheduleForm = ref({
  enabled: false,
  startTime: null,
  targetLevel: 80
})

const batteryMarks = {
  20: '20%',
  50: '50%',
  80: '80%',
  100: '100%'
}

const getBatteryColor = computed(() => {
  if (batteryLevel.value < 20) return '#f56c6c'
  if (batteryLevel.value < 50) return '#e6a23c'
  return '#67c23a'
})
</script>

<style lang="scss" scoped>
.hpv-charging-status {
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

  .battery-status {
    text-align: center;
    padding: 20px 0;

    .progress-content {
      h3 {
        font-size: 28px;
        color: var(--hpv-color-primary);
        margin: 0;
      }
      p {
        font-size: 12px;
        color: #666;
        margin: 5px 0 0;
      }
    }
  }

  .status-details {
    margin-top: 20px;
    .detail-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      color: #666;
      
      .f1-icon {
        margin-right: 8px;
        color: var(--hpv-color-primary);
      }
    }
  }

  .mode-select {
    width: 100%;
    justify-content: space-between;
  }

  .charging-schedule {
    .f1-time-picker {
      width: 100%;
    }
  }

  .mt-4 {
    margin-top: 16px;
  }

  .w-full {
    width: 100%;
  }
}
</style>
