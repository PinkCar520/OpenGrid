<template>
  <div class="race-results">
    <el-button @click="goJ()" type="primary">查看积分排名</el-button>
    <el-card class="results-card">
      <template #header>
        <div class="header-content">
          <div class="race-selector">
            <el-select 
              v-model="selectedRace" 
              placeholder="选择比赛"
              class="race-select"
            >
              <el-option
                v-for="race in races"
                :key="race.id"
                :label="race.name"
                :value="race.id"
              >
                <div class="race-option">
                  <el-image :src="`/flags/${race.countryCode}.png`" class="country-flag" />
                  <div class="race-info">
                    <span class="race-name">{{ race.name }}</span>
                    <span class="race-date">{{ race.date }}</span>
                  </div>
                </div>
              </el-option>
            </el-select>
            
            <div class="race-stats">
              <el-statistic title="赛道长度" :value="selectedRaceInfo?.length || '-'" suffix="km" />
              <el-statistic title="总圈数" :value="selectedRaceInfo?.laps || '-'" />
              <el-statistic title="完赛车手" :value="sessionResults.length" />
            </div>
          </div>

          <div class="session-tabs">
            <el-radio-group v-model="selectedSession" size="large">
              <el-radio-button v-for="session in sessions" :key="session.value" :label="session.value">
                <el-tooltip :content="session.description" placement="top">
                  <div class="session-label">
                    <span>{{ session.label }}</span>
                    <small>{{ session.time }}</small>
                  </div>
                </el-tooltip>
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </template>

      <div class="results-content">
        <div class="table-filters">
          <el-input
            v-model="searchQuery"
            placeholder="搜索车手或车队..."
            prefix-icon="Search"
            clearable
            class="search-input"
          />
          <el-select v-model="filterTeam" placeholder="筛选车队" clearable>
            <el-option v-for="team in teams" :key="team" :label="team" :value="team" />
          </el-select>
        </div>

        <el-table 
          :data="filteredResults" 
          :highlight-current-row="true"
          class="results-table"
        >
          <el-table-column prop="position" label="位置" width="80" />
          <el-table-column prop="driver" label="车手">
            <template #default="{ row }">
              <div class="driver-info">
                <el-avatar :src="row.driverPhoto" :size="32" />
                <span>{{ row.driver }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="team" label="车队" />
          <el-table-column prop="time" label="用时/退赛原因" />
          <el-table-column prop="gap" label="差距" width="100" />
          <el-table-column prop="points" label="积分" width="80" />
          <el-table-column label="最快圈速" width="120">
            <template #default="{ row }">
              <div class="fastest-lap" :class="{ 'is-fastest': row.isFastestLap }">
                {{ row.fastestLap }}
                <el-icon v-if="row.isFastestLap"><Timer /></el-icon>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="analysis-section">
          <el-tabs v-model="activeAnalysis">
            <el-tab-pane label="圈速分析" name="lapTimes">
              <div ref="chartRef" class="chart-container" />
            </el-tab-pane>
            <el-tab-pane label="速度分布" name="speed">
              <div ref="speedChartRef" class="chart-container" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"
import { Search, Timer } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const router = useRouter()
const selectedRace = ref('')
const selectedSession = ref('R')
const chartRef = ref()
const speedChartRef = ref()

const races = ref([
  { 
    id: '2025-01', 
    name: '2025 巴林大奖赛', 
    countryCode: 'bh', 
    date: '2025-03-15',
    circuit: {
      name: '萨基尔国际赛道',
      length: 5.412,
      laps: 57,
      type: 'permanent'
    }
  },
  { 
    id: '2025-02', 
    name: '2025 沙特阿拉伯大奖赛', 
    countryCode: 'sa', 
    date: '2025-03-22',
    circuit: {
      name: '吉达街道赛道',
      length: 6.174,
      laps: 50,
      type: 'street'
    }
  }
])

const sessionResults = ref([
  {
    position: 1,
    driver: 'Max Verstappen',
    driverPhoto: '/drivers/verstappen.png',
    team: 'Red Bull Racing',
    time: '1:30:31.421',
    gap: 'Leader',
    points: 25,
    fastestLap: '1:28.123',
    isFastestLap: true
  }
])

const sessions = [
  { value: 'FP1', label: '练习赛1', time: '周五 11:00', description: '第一次自由练习赛' },
  { value: 'FP2', label: '练习赛2', time: '周五 15:00', description: '第二次自由练习赛' },
  { value: 'FP3', label: '练习赛3', time: '周六 12:00', description: '第三次自由练习赛' },
  { value: 'Q', label: '排位赛', time: '周六 15:00', description: '排位赛' },
  { value: 'R', label: '正赛', time: '周日 14:00', description: '正式比赛' }
]

const searchQuery = ref('')
const filterTeam = ref('')
const activeAnalysis = ref('lapTimes')

// Add selectedRaceInfo computed property
const selectedRaceInfo = computed(() => {
  const race = races.value.find(r => r.id === selectedRace.value)
  return race?.circuit
})

// 过滤后的结果
const filteredResults = computed(() => {
  return sessionResults.value.filter(result => {
    const matchesSearch = result.driver.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         result.team.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTeam = !filterTeam.value || result.team === filterTeam.value
    return matchesSearch && matchesTeam
  })
})

onMounted(() => {
  initCharts()
})

const initCharts = () => {
  const lapChart = echarts.init(chartRef.value)
  lapChart.setOption({
    title: { text: '圈速变化趋势' },
    tooltip: { trigger: 'axis' },
    legend: { type: 'scroll', top: 24 },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: Array.from({length: 50}, (_, i) => `Lap ${i + 1}`) },
    yAxis: { type: 'value', name: '圈速 (秒)' },
    series: [
      {
        name: 'Max Verstappen',
        type: 'line',
        smooth: true,
        data: Array.from({length: 50}, () => 80 + Math.random() * 5)
      }
      // 更多车手数据...
    ]
  })
}
const goJ = () => {
  window.parentRouter.push('/race/standings')
}
</script>

<style lang="scss" scoped>
.race-results {
  min-height: 100vh;

  .results-card {
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04),
                0 4px 12px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.08);

    .header-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 24px;
      border-bottom: 1px solid #f0f0f0;
    }

    .race-selector {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 40px;

      .race-select {
        width: 400px;

        :deep(.f1-input__wrapper) {
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          
          &:hover {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
          }
          
          &.is-focus {
            box-shadow: 0 0 0 2px var(--f1-color-primary-light-5);
          }
        }
      }

      .race-stats {
        display: flex;
        gap: 48px;

        :deep(.f1-statistic) {
          .f1-statistic__title {
            font-size: 13px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 8px;
            letter-spacing: -0.01em;
          }

          .f1-statistic__content {
            font-size: 28px;
            font-weight: 600;
            color: #111827;
            letter-spacing: -0.02em;
          }
        }
      }
    }

    .session-tabs {
      padding: 0 4px;

      :deep(.f1-radio-group) {
        display: flex;
        gap: 8px;
      }

      :deep(.f1-radio-button__inner) {
        padding: 12px 20px;
        height: auto;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: none;
        transition: all 0.2s ease;

        &:hover {
          background: #f9fafb;
        }

        &.is-active {
          background: var(--f1-color-primary-light-9);
          border-color: var(--f1-color-primary-light-5);
          color: var(--f1-color-primary);
          font-weight: 500;
        }
      }
    }
  }

  .results-content {
    padding: 32px;

    .table-filters {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;

      :deep(.f1-input__wrapper),
      :deep(.f1-select .f1-input__wrapper) {
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        
        &:hover {
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
        }
        
        &.is-focus {
          box-shadow: 0 0 0 2px var(--f1-color-primary-light-5);
        }
      }
    }

    :deep(.f1-table) {
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      
      .f1-table__header {
        th {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          background: #f9fafb;
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }
      }

      .f1-table__row {
        td {
          padding: 20px 16px;
          font-size: 14px;
          color: #111827;
          border-bottom: 1px solid #f3f4f6;
        }

        &:hover td {
          background: #f9fafb;
        }
      }

      .driver-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .f1-avatar {
          border: 1px solid #e5e7eb;
        }

        span {
          font-weight: 500;
          color: #111827;
        }
      }
    }
  }

  .analysis-section {
    margin-top: 40px;
    
    :deep(.f1-tabs__header) {
      margin-bottom: 32px;
    }

    :deep(.f1-tabs__item) {
      font-size: 14px;
      padding: 0 24px;
      height: 40px;
      line-height: 40px;
      transition: all 0.2s ease;

      &.is-active {
        font-weight: 500;
      }

      &:hover {
        color: var(--f1-color-primary);
      }
    }

    .chart-container {
      height: 480px;
      margin-top: 32px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
    }
  }
}
</style>
