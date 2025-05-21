<template>
  <div class="analysis-view">
    <el-row :gutter="24">
      <!-- 性能指标总览 -->
      <el-col :span="24">
        <el-card class="overview-card">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="title">性能指标总览</span>
              <el-select v-model="selectedSession" size="small">
                <el-option v-for="session in sessions" :key="session.id" 
                  :label="session.label" :value="session.id" />
              </el-select>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="6" v-for="metric in performanceMetrics" :key="metric.key">
              <div class="metric-card" :class="{ 'is-improved': metric.trend > 0 }">
                <div class="metric-header">
                  <span class="label">{{ metric.label }}</span>
                  <el-tag :type="metric.trend > 0 ? 'success' : 'danger'" size="small">
                    {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
                  </el-tag>
                </div>
                <div class="metric-value">{{ metric.value }}{{ metric.unit }}</div>
                <div class="metric-chart">
                  <SparklineChart :data="metric.history" :color="metric.trend > 0 ? '#67C23A' : '#F56C6C'" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 赛道分段时间分析 -->
      <el-col :span="16">
        <el-card class="lap-analysis-card">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="title">赛道分段分析</span>
              <el-radio-group v-model="analysisType" size="small">
                <el-radio-button label="time">单圈时间</el-radio-button>
                <el-radio-button label="speed">速度分布</el-radio-button>
                <el-radio-button label="gear">档位使用</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="track-map">
            <TrackMap :sectors="trackSectors" :analysis-type="analysisType" />
          </div>
          <div class="sector-details">
            <el-table :data="sectorData" stripe>
              <el-table-column prop="sector" label="赛道分段" width="100" />
              <el-table-column prop="bestTime" label="最佳时间" width="120" />
              <el-table-column prop="avgSpeed" label="平均速度" width="120" />
              <el-table-column prop="maxSpeed" label="最高速度" width="120" />
              <el-table-column prop="minSpeed" label="最低速度" width="120" />
            </el-table>
          </div>
        </el-card>
      </el-col>

      <!-- 车辆状态分析 -->
      <el-col :span="8">
        <el-card class="status-card">
          <template #header>
            <span class="title">车辆状态分析</span>
          </template>
          <div class="status-items">
            <div v-for="status in carStatus" :key="status.key" class="status-item">
              <div class="status-label">{{ status.label }}</div>
              <el-progress 
                :percentage="status.value" 
                :color="status.color"
                :status="status.status"
                :stroke-width="10"
                :format="(val) => `${val}%`"
              />
            </div>
          </div>
        </el-card>

        <el-card class="recommendation-card mt-4">
          <template #header>
            <span class="title">优化建议</span>
          </template>
          <div class="recommendations">
            <el-timeline>
              <el-timeline-item
                v-for="item in recommendations"
                :key="item.id"
                :type="item.type"
                :color="item.color"
                :timestamp="item.timestamp"
              >
                {{ item.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SparklineChart from '../../components/charts/SparklineChart.vue'
import TrackMap from '../../components/TrackMap.vue'

// 会话选择
const selectedSession = ref('latest')
const sessions = [
  { id: 'latest', label: '最新数据' },
  { id: 'fp1', label: '练习赛 1' },
  { id: 'fp2', label: '练习赛 2' },
  { id: 'qualifying', label: '排位赛' }
]

// 性能指标数据
const performanceMetrics = ref([
  {
    key: 'lapTime',
    label: '最快圈速',
    value: '1:24.365',
    unit: '',
    trend: -1.2,
    history: [85, 87, 84, 82, 85, 83, 84, 81]
  },
  {
    key: 'maxSpeed',
    label: '最高速度',
    value: '342',
    unit: 'km/h',
    trend: 2.5,
    history: [330, 335, 338, 340, 339, 341, 342]
  },
  {
    key: 'avgSpeed',
    label: '平均速度',
    value: '285',
    unit: 'km/h',
    trend: 1.8,
    history: [275, 278, 280, 282, 283, 285]
  },
  {
    key: 'cornering',
    label: '过弯性能',
    value: '92',
    unit: '%',
    trend: 3.2,
    history: [86, 88, 87, 89, 90, 91, 92]
  }
])

// 分析类型
const analysisType = ref('time')

// 车辆状态数据
const carStatus = ref([
  { key: 'engine', label: '引擎状态', value: 95, color: '#67C23A', status: 'success' },
  { key: 'brake', label: '制动系统', value: 88, color: '#E6A23C', status: 'warning' },
  { key: 'tires', label: '轮胎状况', value: 82, color: '#F56C6C', status: 'exception' },
  { key: 'aero', label: '空气动力学', value: 94, color: '#409EFF', status: 'success' }
])

// 添加建议数据
const recommendations = ref([
  {
    id: 1,
    content: '建议降低3号弯出弯时的油门开度，可提升轮胎寿命',
    type: 'warning',
    color: '#E6A23C',
    timestamp: '2分钟前'
  },
  {
    id: 2,
    content: '1号弯入弯点可以提前5米，有助于提升过弯速度',
    type: 'success',
    color: '#67C23A',
    timestamp: '5分钟前'
  },
  {
    id: 3,
    content: '进站时机建议提前2圈，避免轮胎性能明显下降',
    type: 'info',
    color: '#909399',
    timestamp: '10分钟前'
  }
])

// 添加赛道分段数据
const trackSectors = ref([
  {
    id: 's1',
    name: '第一段',
    coordinates: [[0, 0], [100, 50]],
    time: 28.5,
    bestTime: 28.2
  },
  {
    id: 's2',
    name: '第二段',
    coordinates: [[100, 50], [150, 100]],
    time: 35.2,
    bestTime: 34.8
  },
  {
    id: 's3',
    name: '第三段',
    coordinates: [[150, 100], [0, 0]],
    time: 26.8,
    bestTime: 26.5
  }
])

// 添加分段详细数据
const sectorData = ref([
  {
    sector: '第一段',
    bestTime: '28.523',
    avgSpeed: '245',
    maxSpeed: '280',
    minSpeed: '125'
  },
  {
    sector: '第二段',
    bestTime: '35.245',
    avgSpeed: '215',
    maxSpeed: '245',
    minSpeed: '95'
  },
  {
    sector: '第三段',
    bestTime: '26.892',
    avgSpeed: '265',
    maxSpeed: '320',
    minSpeed: '180'
  }
])
</script>

<style lang="scss" scoped>
.analysis-view {
  padding: 24px;

  .metric-card {
    padding: 16px;
    border-radius: 8px;
    background: var(--el-bg-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    &.is-improved {
      background: linear-gradient(to right, var(--el-color-success-light-9), var(--el-bg-color));
    }
  }

  .track-map {
    height: 400px;
    margin-bottom: 20px;
    background: var(--el-fill-color-light);
    border-radius: 8px;
  }

  .status-items {
    .status-item {
      margin-bottom: 24px;

      .status-label {
        margin-bottom: 8px;
        font-weight: 500;
      }
    }
  }

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .mt-4 {
    margin-top: 16px;
  }
}
</style>
