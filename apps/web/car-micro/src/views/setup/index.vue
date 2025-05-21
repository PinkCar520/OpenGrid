<template>
  <div class="car-setup">
    <el-row :gutter="24">
      <el-col :span="16">
        <el-card class="setup-card">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold">赛车配置</span>
              <el-button-group>
                <el-button type="primary" @click="saveSetup">保存配置</el-button>
                <el-button @click="resetSetup">重置</el-button>
              </el-button-group>
            </div>
          </template>
          
          <el-form :model="setupForm" label-position="top">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="空气动力学" name="aero">
                <el-form-item label="前翼角度">
                  <el-slider v-model="setupForm.frontWing" :min="0" :max="10" :step="0.5" />
                </el-form-item>
                <el-form-item label="后翼角度">
                  <el-slider v-model="setupForm.rearWing" :min="0" :max="10" :step="0.5" />
                </el-form-item>
              </el-tab-pane>
              
              <el-tab-pane label="悬挂系统" name="suspension">
                <el-row :gutter="16">
                  <el-col :span="12">
                    <el-form-item label="前悬挂硬度">
                      <el-slider v-model="setupForm.frontSuspension" :min="1" :max="10" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="后悬挂硬度">
                      <el-slider v-model="setupForm.rearSuspension" :min="1" :max="10" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              
              <el-tab-pane label="传动系统" name="transmission">
                <el-form-item label="差速器">
                  <el-select v-model="setupForm.differential" style="width: 100%">
                    <el-option label="开放式" value="open" />
                    <el-option label="限滑式" value="limited" />
                    <el-option label="电控式" value="electronic" />
                  </el-select>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="preview-card">
          <template #header>
            <span class="text-lg font-semibold">性能预览</span>
          </template>
          <div class="performance-stats">
            <div v-for="stat in performanceStats" :key="stat.key" class="stat-item">
              <span class="label">{{ stat.label }}</span>
              <el-progress :percentage="stat.value" :color="stat.color" :format="format" />
            </div>
          </div>
        </el-card>
        
        <el-card class="mt-4">
          <template #header>
            <span class="text-lg font-semibold">配置建议</span>
          </template>
          <div class="setup-suggestions">
            <el-alert
              v-for="(suggestion, index) in suggestions"
              :key="index"
              :title="suggestion.title"
              :type="suggestion.type"
              :description="suggestion.description"
              show-icon
              class="mb-2"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('aero')

const setupForm = ref({
  frontWing: 5,
  rearWing: 4.5,
  frontSuspension: 6,
  rearSuspension: 7,
  differential: 'electronic'
})

const performanceStats = computed(() => [
  { key: 'speed', label: '最高速度', value: 85, color: '#409EFF' },
  { key: 'handling', label: '操控性', value: 92, color: '#67C23A' },
  { key: 'acceleration', label: '加速性能', value: 88, color: '#E6A23C' },
  { key: 'stability', label: '稳定性', value: 95, color: '#909399' }
])

const suggestions = ref([
  {
    title: '空气动力学优化',
    type: 'info',
    description: '建议适当增加前翼角度以提升下压力'
  },
  {
    title: '悬挂调教',
    type: 'warning',
    description: '当前悬挂设置可能影响高速稳定性'
  }
])

const format = (percentage: number) => `${percentage}%`

const saveSetup = () => {
  // 保存配置逻辑
}

const resetSetup = () => {
  // 重置配置逻辑
}
</script>

<style lang="scss" scoped>
.car-setup {
  padding: 24px;
  
  .setup-card {
    min-height: calc(100vh - 180px);
  }
  
  .performance-stats {
    .stat-item {
      margin-bottom: 20px;
      
      .label {
        display: block;
        margin-bottom: 8px;
        color: var(--el-text-color-secondary);
      }
    }
  }
  
  .setup-suggestions {
    :deep(.el-alert) {
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
