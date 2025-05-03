<template>
  <div class="team-home">
    <h1>燃料电池汽车_Micro_App</h1>
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card @click="$router.push('/team/hydrogenMap')">
            <div class="card-content">
              <el-icon size="48" color="var(--team-color-primary)"><MapLocation /></el-icon>
              <h3>加氢站地图</h3>
              <p>查找附近加氢站和实时状态</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card @click="$router.push('/team/fuelCellDashboard')">
            <div class="card-content">
              <el-icon size="48" color="var(--team-color-primary)"><Odometer /></el-icon>
              <h3>燃料电池仪表盘</h3>
              <p>监控氢燃料电池状态和性能</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MapLocation, Odometer } from '@element-plus/icons-vue'
const input = ref('')
</script>

<style lang="scss" scoped>
.team-home {
  padding: 20px;

  h1 {
    color: var(--team-color-primary);
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
        color: var(--team-color-primary);
      }

      p {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>
