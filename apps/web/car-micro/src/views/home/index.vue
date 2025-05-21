<template>
  <div class="car-home">
    <h1>赛车性能分析系统</h1>
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card @click="$router.push('/car/telemetry')" class="hoverable">
            <div class="card-content">
              <el-icon size="48" color="var(--car-color-primary)"><DataLine /></el-icon>
              <h3>遥测数据</h3>
              <p>实时数据监控和分析</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card @click="$router.push('/car/setup')" class="hoverable">
            <div class="card-content">
              <el-icon size="48" color="var(--car-color-primary)"><Setting /></el-icon>
              <h3>赛车设置</h3>
              <p>整车性能参数配置</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card @click="$router.push('/car/analysis')" class="hoverable">
            <div class="card-content">
              <el-icon size="48" color="var(--car-color-primary)"><TrendCharts /></el-icon>
              <h3>性能分析</h3>
              <p>深度性能数据分析</p>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 3D赛车模型展示区 -->
      <div class="car-model-viewer mt-8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>赛车3D模型</span>
              <el-button-group>
                <el-button size="small" @click="rotateCar('left')">
                  <el-icon><ArrowLeft /></el-icon>
                </el-button>
                <el-button size="small" @click="rotateCar('right')">
                  <el-icon><ArrowRight /></el-icon>
                </el-button>
              </el-button-group>
            </div>
          </template>
          <div class="model-container" ref="modelContainer">
            <!-- 这里将集成 Three.js 用于渲染3D模型 -->
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataLine, Setting, TrendCharts, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const modelContainer = ref<HTMLElement | null>(null)

const rotateCar = (direction: 'left' | 'right') => {
  // 实现3D模型旋转逻辑
}

onMounted(() => {
  // 初始化3D模型渲染
})
</script>

<style lang="scss" scoped>
.car-home {
  padding: 20px;

  h1 {
    color: var(--car-color-primary);
    margin-bottom: 30px;
  }

  .hoverable {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .card-content {
    text-align: center;
    padding: 20px;

    h3 {
      margin: 15px 0;
      color: var(--car-color-primary);
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }

  .car-model-viewer {
    .model-container {
      height: 400px;
      background: #f5f7fa;
      border-radius: 8px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .mt-8 {
    margin-top: 32px;
  }
}
</style>
