<template>
  <div class="standings">
    <!-- 统计数据 -->
    <div class="stats-section">
      <div class="section-header">
        <h2>赛季概览</h2>
        <el-select v-model="selectedSeason" class="season-select">
          <el-option label="2025赛季" value="2025" />
          <el-option label="2024赛季" value="2024" />
        </el-select>
      </div>
      <el-row :gutter="24">
        <el-col :span="6" v-for="stat in statsData" :key="stat.title">
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><component :is="stat.icon" /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">{{ stat.title }}</div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-trend" :class="{ 'positive': stat.trend > 0 }">
                <el-icon><CaretTop v-if="stat.trend > 0" /><CaretBottom v-else /></el-icon>
                {{ Math.abs(stat.trend) }}%
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 积分榜区域 -->
    <div class="standings-section">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card class="standings-card">
            <template #header>
              <div class="card-header">
                <div class="header-left">
                  <h3>车手积分榜</h3>
                  <el-tag type="info" effect="plain">第{{ currentRound }}轮</el-tag>
                  <div class="total-points">总积分: <span>{{ totalDriverPoints }}</span></div>
                </div>
                <div class="header-right">
                  <el-input
                    v-model="searchQuery"
                    placeholder="搜索车手..."
                    prefix-icon="Search"
                    class="search-input"
                  >
                    <template #prefix>
                      <el-icon class="search-icon"><Search /></el-icon>
                    </template>
                  </el-input>
                  <el-radio-group v-model="driverStandingsType" size="small">
                    <el-radio-button label="total">总积分</el-radio-button>
                    <el-radio-button label="sprint">短程赛</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </template>
            
            <el-table 
              :data="driverStandings" 
              :max-height="600"
              :highlight-current-row="true"
              class="standings-table"
            >
              <el-table-column prop="position" label="排名" width="100">
                <template #default="{ row }">
                  <div class="position-cell" :class="{'top-three': row.position <= 3}">
                    <span class="position-number">{{ row.position }}</span>
                    <el-icon v-if="row.position <= 3"><Trophy /></el-icon>
                  </div>
                </template>
              </el-table-column>
              
              <el-table-column label="车手" min-width="280">
                <template #default="{ row }">
                  <div class="driver-info">
                    <el-avatar :src="row.photo" :size="44" />
                    <div class="info-text">
                      <div class="name">{{ row.name }}</div>
                      <div class="details">
                        <span class="team">{{ row.team }}</span>
                        <span class="number">#{{ row.number }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="本轮表现" min-width="160" align="center">
                <template #default="{ row }">
                  <div class="performance-cell">
                    <div class="position-change" :class="getPositionChangeClass(row.positionChange)">
                      {{ formatPositionChange(row.positionChange) }}
                    </div>
                    <div class="fastest-lap" v-if="row.hasFastestLap">
                      <el-icon><Timer /></el-icon>
                      最快圈
                    </div>
                  </div>
                </template>
              </el-table-column>
              
              <el-table-column label="积分" align="right" width="180">
                <template #default="{ row }">
                  <div class="points-cell">
                    <div class="points-info">
                      <span class="points">{{ row.points }}</span>
                      <span v-if="row.delta" class="delta" :class="{'positive': row.delta > 0}">
                        {{ row.delta > 0 ? '+' : '' }}{{ row.delta }}
                      </span>
                    </div>
                    <div class="trend-container">
                      <div class="trend-line" :style="getTrendLineStyle(row.trend)" />
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="points-chart">
              <el-tabs v-model="activeChart">
                <el-tab-pane label="积分趋势" name="trend">
                  <div ref="trendChartRef" class="chart-container"></div>
                </el-tab-pane>
                <el-tab-pane label="对比分析" name="compare">
                  <div ref="compareChartRef" class="chart-container"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card class="standings-card">
            <template #header>
              <div class="card-header">
                <span>车队积分榜</span>
              </div>
            </template>
            
            <el-table :data="constructorStandings" :max-height="600">
              <el-table-column prop="position" label="排名" width="80" />
              <el-table-column label="车队">
                <template #default="{ row }">
                  <div class="team-info">
                    <el-image :src="row.logo" class="team-logo" />
                    <span>{{ row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="points" label="积分" align="right" width="100">
                <template #default="{ row }">
                  <span class="points">{{ row.points }}</span>
                  <span v-if="row.delta" class="delta" :class="{'positive': row.delta > 0}">
                    {{ row.delta > 0 ? '+' : '' }}{{ row.delta }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts'
import { Search, Trophy, Timer, Flag, CaretTop, CaretBottom } from '@element-plus/icons-vue'

const driverStandingsType = ref('total')

const driverStandings = ref([
  {
    position: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 575,
    delta: 25,
    photo: '/drivers/verstappen.png',
    trend: [460, 485, 510, 535, 550, 575], // Last 6 races points
    number: 33,
    positionChange: 1,
    hasFastestLap: true
  }
])

const constructorStandings = ref([
  {
    position: 1,
    name: 'Red Bull Racing',
    points: 860,
    delta: null,
    logo: '/teams/red-bull.png'
  }
])

const currentRound = ref(15)
const searchQuery = ref('')
const activeChart = ref('trend')
const trendChartRef = ref()
const compareChartRef = ref()

const selectedSeason = ref('2025')

const statsData = ref([
  {
    title: '已完成比赛',
    value: '15/24',
    trend: 62.5,
    icon: Flag
  },
  {
    title: '领先优势',
    value: '156',
    subtext: 'points',
    trend: 23.4,
    icon: Trophy
  },
  {
    title: '本站积分',
    value: '26',
    subtext: 'points',
    trend: -12.5,
    icon: Timer
  },
  {
    title: '最快圈数',
    value: '12',
    trend: 15.8,
    icon: Timer
  }
])

onMounted(() => {
  initCharts()
})

const initCharts = () => {
  const trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption({
    title: { text: '积分走势', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { 
      type: 'scroll',
      bottom: 0,
      data: ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc']
    },
    grid: { 
      left: '3%', 
      right: '4%',
      bottom: '10%',
      containLabel: true 
    },
    xAxis: { 
      type: 'category',
      data: Array.from({length: 15}, (_, i) => `Round ${i + 1}`)
    },
    yAxis: { type: 'value', name: '积分' },
    series: [
      {
        name: 'Max Verstappen',
        type: 'line',
        smooth: true,
        data: [25, 50, 75, 95, 120, 145, 170, 195, 220, 245, 270, 295, 320, 345, 370]
      }
      // Add more drivers...
    ]
  })
}

const getTrendLineStyle = (trend: number[]) => {
  const isPositive = trend[trend.length - 1] > trend[0]
  return {
    '--trend-color-start': isPositive ? '#dcteam7' : '#fee2e2',
    '--trend-color-end': isPositive ? '#10b981' : '#ef4444'
  }
}

const totalDriverPoints = computed(() => 
  driverStandings.value.reduce((sum, driver) => sum + driver.points, 0)
)

const getPositionChangeClass = (change: number) => {
  if (change > 0) return 'improved'
  if (change < 0) return 'declined'
  return 'unchanged'
}

const formatPositionChange = (change: number) => {
  if (change > 0) return `↑${change}`
  if (change < 0) return `↓${Math.abs(change)}`
  return '–'
}
</script>

<style lang="scss" scoped>
.standings {
  padding: 40px;
  background: #fafafa;
  // min-height: 100vh;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      letter-spacing: -0.02em;
    }

    .season-select {
      width: 120px;
    }
  }

  .stats-section {
    margin-bottom: 40px;

    .stat-card {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px;
      background: #fff;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .stat-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 10px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);

        .el-icon {
          font-size: 24px;
        }
      }

      .stat-content {
        flex: 1;
        
        .stat-title {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #ef4444;

          &.positive {
            color: #10b981;
          }

          .el-icon {
            font-size: 12px;
          }
        }
      }
    }
  }

  .standings-section {
    .standings-card {
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

      .card-header {
        padding: 24px;

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;

          h3 {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            letter-spacing: -0.01em;
          }

          .total-points {
            color: #6b7280;
            font-size: 14px;
            
            span {
              color: #111827;
              font-weight: 500;
            }
          }
        }

        .header-right {
          .search-input {
            .search-icon {
              color: #9ca3af;
            }
          }
        }
      }

      :deep(.standings-table) {
        --el-table-border-color: #f3f4f6;
        
        .el-table__row {
          height: 80px;
        }
        
        .position-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-left: 12px;
          
          .position-number {
            font-size: 20px;
            font-weight: 600;
            color: #6b7280;
            min-width: 28px;
          }
          
          .el-icon {
            font-size: 18px;
            color: #eab308;
          }
          
          &.top-three .position-number {
            color: #111827;
          }
        }

        .driver-info {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          
          .el-avatar {
            border: 2px solid #f3f4f6;
            flex-shrink: 0;
          }
          
          .info-text {
            .name {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 6px;
            }
            
            .details {
              display: flex;
              align-items: center;
              gap: 12px;
              
              .team {
                font-size: 14px;
                color: #6b7280;
              }
              
              .number {
                font-size: 13px;
                color: #9ca3af;
                font-weight: 500;
              }
            }
          }
        }

        .performance-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          
          .position-change {
            font-size: 14px;
            font-weight: 500;
            
            &.improved { color: #10b981; }
            &.declined { color: #ef4444; }
            &.unchanged { color: #6b7280; }
          }
          
          .fastest-lap {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 13px;
            color: var(--el-color-primary);
            
            .el-icon {
              font-size: 14px;
            }
          }
        }

        .points-cell {
          padding-right: 16px;
          
          .points-info {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            margin-bottom: 8px;
            
            .points {
              font-size: 18px;
              font-weight: 600;
              color: #111827;
            }
          }
          
          .trend-container {
            height: 24px;
            padding: 11px 0;
            
            .trend-line {
              height: 2px;
              background: linear-gradient(90deg, var(--trend-color-start), var(--trend-color-end));
            }
          }
        }
      }
    }
  }

  .points-chart {
    margin-top: 24px;
    padding: 0 24px 24px;

    .chart-container {
      height: 400px;
      margin-top: 24px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
    }
  }

  .driver-info, .team-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .info-text {
      .name {
        font-weight: 500;
      }
      .team {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
  
  .team-logo {
    width: 32px;
    height: 32px;
  }
  
  .points {
    font-weight: 500;
  }
  
  .delta {
    margin-left: 4px;
    font-size: 12px;
    color: var(--el-color-danger);
    
    &.positive {
      color: var(--el-color-success);
    }
  }
}
</style>
