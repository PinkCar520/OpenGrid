<template>
  <div class="fce-hydrogen__map">
    <h1>加氢站地图</h1>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="map-container">
          <div class="map-placeholder">
            <el-empty description="地图加载中..." />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>附近加氢站</span>
              <el-input
                v-model="searchQuery"
                placeholder="搜索加氢站"
                prefix-icon="Search"
                clearable
              />
            </div>
          </template>
          <el-scrollbar height="400px">
            <div v-for="station in stations" :key="station.id" class="station-item">
              <div class="station-info">
                <h4>{{ station.name }}</h4>
                <p>
                  <el-tag :type="station.status === 'available' ? 'success' : 'warning'">
                    {{ station.status === 'available' ? '可用' : '维护中' }}
                  </el-tag>
                  <span class="price">¥{{ station.price }}/kg</span>
                  <span class="distance">{{ station.distance }}km</span>
                </p>
                <p class="address">{{ station.address }}</p>
              </div>
              <div class="station-actions">
                <el-button type="primary" @click="navigate(station)">导航</el-button>
              </div>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchQuery = ref('')

interface Station {
  id: number
  name: string
  status: 'available' | 'maintenance'
  price: number
  distance: number
  address: string
}

const stations = ref<Station[]>([
  {
    id: 1,
    name: '未来科技城加氢站',
    status: 'available',
    price: 35,
    distance: 2.5,
    address: '未来科技城创新路100号'
  },
  {
    id: 2,
    name: '高新区加氢站',
    status: 'available',
    price: 32,
    distance: 4.2,
    address: '高新区科技路200号'
  },
  {
    id: 3,
    name: '滨江加氢站',
    status: 'maintenance',
    price: 33,
    distance: 6.8,
    address: '滨江区江南大道300号'
  }
])

const navigate = (station: Station) => {
  ElMessage.success(`正在导航至: ${station.name}`)
}
</script>

<style lang="scss" scoped>
.fce-hydrogen__map {
  padding: 20px;

  h1 {
    font-size: 24px;
    color: var(--fce-color-primary);
    margin-bottom: 20px;
  }

  .map-container {
    .map-placeholder {
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
    }
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .station-item {
    padding: 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .station-info {
      h4 {
        margin: 0 0 8px;
        color: var(--fce-color-primary);
      }

      .price {
        margin-left: 10px;
        color: #f56c6c;
        font-weight: bold;
      }

      .distance {
        margin-left: 10px;
        color: #666;
      }

      .address {
        margin: 5px 0 0;
        font-size: 13px;
        color: #666;
      }
    }
  }
}
</style>
