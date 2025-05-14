<template>
  <div class="hpv-home">
    <h1>插电式混动汽车_Micro_App</h1>
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card @click="$router.push('/hpv/powerSystem')" class="hoverable">
            <div class="card-content">
              <el-icon size="48" color="var(--hpv-color-primary)"><Operation /></el-icon>
              <h3>动力系统</h3>
              <p>混动动力系统状态监控</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card @click="$router.push('/hpv/chargingStatus')" class="hoverable">
            <div class="card-content">
              <el-icon size="48" color="var(--hpv-color-primary)"><Monitor /></el-icon>
              <h3>充电状态</h3>
              <p>电池充电状态实时监控</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Operation, Monitor } from '@element-plus/icons-vue'
const input = ref('')
</script>

<style lang="scss" scoped>
.hpv-home {
  padding: 20px;
  h1 {
    color: var(--hpv-color-primary);
    margin-bottom: 20px;
  }
  .f1-button {
    margin-right: 10px;
  }
}

.dashboard-cards {
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
    padding: 30px 20px;

    h3 {
      margin: 15px 0;
      color: var(--hpv-color-primary);
      font-size: 18px;
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
