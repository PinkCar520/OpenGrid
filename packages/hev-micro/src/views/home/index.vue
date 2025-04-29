<template>
  <div class="hev-home">
    <h1>混合动力汽车_Micro_App</h1>
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card @click="$router.push('/hev/engineStatus')">
            <div class="card-content">
              <el-icon size="48" color="var(--hev-color-primary)"><Setting /></el-icon>
              <h3>发动机状态</h3>
              <p>监控发动机运行状态和性能</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card @click="$router.push('/hev/batteryStatus')">
            <div class="card-content">
              <el-icon size="48" color="var(--hev-color-primary)"><DataAnalysis /></el-icon>
              <h3>电池状态</h3>
              <p>监控混动电池状态和效率</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Setting, DataAnalysis } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.hev-home {
  padding: 20px;

  h1 {
    color: var(--hev-color-primary);
    margin-bottom: 30px;
  }

  .dashboard-cards {
    .el-card {
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .card-content {
      text-align: center;
      padding: 20px;

      h3 {
        margin: 15px 0;
        color: var(--hev-color-primary);
      }

      p {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>
