<template>
  <div class="race-home">
    <h1>纯电动汽车_Micro_App</h1>
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card @click="$router.push('/race/superchargerMap')">
            <div class="card-content">
              <el-icon size="48" color="var(--race-color-primary)"><Location /></el-icon>
              <h3>充电站地图</h3>
              <p>查找附近充电站和实时充电状态</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card @click="$router.push('/race/batteryHealthDashboard')">
            <div class="card-content">
              <el-icon size="48" color="var(--race-color-primary)"><DataLine /></el-icon>
              <h3>电池健康仪表盘</h3>
              <p>监控电池健康状态和性能指标</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Location, DataLine } from '@element-plus/icons-vue'
const input = ref('')
</script>

<style lang="scss" scoped>
.race-home {
  padding: 20px;

  h1 {
    color: var(--race-color-primary);
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
        color: var(--race-color-primary);
      }

      p {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>