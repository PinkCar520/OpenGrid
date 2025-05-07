<template>
  <div class="f1-dashboard">
    <el-button @click="goToUser" type='primary'>用户管理</el-button>
    <el-button @click="goToMicro" type='primary'>赛事管理/micro</el-button>
    <!-- 错误提示 -->
    <el-alert
      v-if="errorStore.visible"
      :title="errorStore.message"
      :type="errorStore.type"
      @close="errorStore.hideError"
      show-icon
      closable
    />

    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :xs="24" :sm="12" :md="6" v-for="stat in statsData" :key="stat.title">
        <F1StatsCard v-bind="stat" v-loading="f1Store.loading.drivers" />
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <!-- 比赛倒计时 -->
      <el-col :span="12">
        <f1-countdown :next-race="nextRace" />
      </el-col>
      <!-- 天气预报 -->
      <el-col :span="12">
        <f1-card title="赛道天气" type="secondary">
          <template #extra>
            <el-button :icon="Refresh" circle size="small" @click="refreshData" />
            <span class="ml-2">{{ nextRace.circuit }}</span>
          </template>
          <div class="weather-forecast">
            <el-row v-loading="f1Store.loading.weather">
              <el-col :span="8" v-for="day in weatherData" :key="day.date">
                <div class="weather-day">
                  <el-icon size="32px"><component :is="day.icon" /></el-icon>
                  <div class="weather-temp">{{ day.temp }}°C</div>
                  <div class="weather-desc">{{ day.description }}</div>
                  <div class="weather-date">{{ formatDate(day.date) }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </f1-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <!-- 积分榜 -->
      <el-col :span="24">
        <!-- <f1-standings-table
          title="2025赛季积分榜"
          type="primary"
          :drivers="driversStandings"
          :constructors="constructorsStandings"
        /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw} from 'vue'
import {useRouter} from "vue-router"
import { Timer, Trophy, Flag, DataLine, Refresh, Sunny, Cloudy, Lightning } from '@element-plus/icons-vue'
import F1Countdown from '@/components/race/F1Countdown.vue'
import F1StandingsTable from '@/components/standings/F1StandingsTable.vue'
import { useF1Store } from '@/stores/f1'
import { useErrorStore } from '@/stores/error'

const f1Store = useF1Store()
const errorStore = useErrorStore()
const router = useRouter()
// 自动刷新定时器
let refreshTimer: number | null = null

// 天气数据
const weatherData = ref([
  { date: '2025-05-25', temp: 22, description: '晴朗', icon: markRaw(Sunny) },
  { date: '2025-05-26', temp: 20, description: '多云', icon: markRaw(Cloudy) },
  { date: '2025-05-27', temp: 19, description: '雷阵雨', icon: markRaw(Lightning) }
])

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

// 刷新数据
const refreshData = async () => {
  await f1Store.fetchAllData()
  // 保存到本地存储
  localStorage.setItem('f1-data', JSON.stringify({
    drivers: f1Store.drivers,
    constructors: f1Store.constructors,
    nextRace: f1Store.nextRace,
    timestamp: Date.now()
  }))
}

onMounted(async () => {
  // 尝试从缓存加载数据
  const cached = localStorage.getItem('f1-data')
  if (cached) {
    const { drivers, constructors, nextRace, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < 5 * 60 * 1000) {
      f1Store.$patch({
        drivers,
        constructors,
        nextRace,
        lastUpdated: timestamp
      })
    }
  }
  
  await f1Store.fetchAllData()
  f1Store.setupWebSocket()

  // 设置自动刷新（每5分钟）
  refreshTimer = window.setInterval(refreshData, 5 * 60 * 1000)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  if (f1Store.ws) {
    f1Store.ws.close()
  }
})
const goToUser = (() => {
  router.push('/system/users')
})
const goToMicro = (() => {
  router.push('/race/results')
})
// 统计数据
const statsData = ref([
  {
    title: '已完成比赛',
    value: '5/24',
    // icon: Flag,
    type: 'primary',
    trend: 20.8
  },
  {
    title: '领先车手',
    value: 'M. Verstappen',
    // icon: Trophy,
    type: 'victory',
    trend: 15.3
  },
  {
    title: '领先车队',
    value: 'Red Bull Racing',
    // icon: DataLine,
    type: 'pit',
    trend: 12.5
  },
  {
    title: '下一站',
    value: '摩纳哥大奖赛',
    // icon: Timer,
    type: 'secondary',
    trend: 999
  }
])

// 下一场比赛信息
const nextRace = ref({
  name: '摩纳哥大奖赛',
  circuit: '蒙特卡洛街道赛道',
  date: '2025-05-25',
  time: '15:00',
  timestamp: new Date('2025-05-25T15:00:00Z').getTime()
})

// 车手积分榜
const driversStandings = ref([
  {
    position: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 110,
    wins: 4,
    image: '/drivers/verstappen.jpg'
  },
  // ...更多车手数据
])

// 车队积分榜
const constructorsStandings = ref([
  {
    position: 1,
    name: 'Red Bull Racing',
    points: 180,
    wins: 5,
    image: '/teams/redbull.png'
  },
  // ...更多车队数据
])
</script>

<style lang="scss" scoped>
.f1-dashboard {
  padding: 32px;
  background-color: #f8f8fb;
  // min-height: 100vh;

  :deep(.el-card),
  :deep(.el-alert),
  :deep(.f1-countdown),
  :deep(.f1-card--secondary),
  :deep(.f1-standings),
  :deep(.f1-standings-table .el-table) {
    border-radius: 10px;
    border: none;
    box-shadow: rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px;
  }

  :deep(.el-card),
  :deep(.el-alert),
  :deep(.f1-stats-card),
  :deep(.f1-countdown),
  :deep(.f1-card--secondary),
  :deep(.f1-standings),
  :deep(.f1-standings-table .el-table),
  .weather-day {
    border-radius: 12px;
    overflow: hidden;
  }

  :deep(.el-card) {
    border: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
    }

    .el-card__header {
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
      font-weight: 500;
    }
  }

  .mt-4 {
    margin-top: 32px;
  }

  .ml-2 {
    margin-left: 12px;
  }

  :deep(.el-alert) {
    margin-bottom: 24px;
  }

  .weather-forecast {
    padding: 20px;

    .weather-day {
      text-align: center;
      padding: 16px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-4px);
      }

      .el-icon {
        margin-bottom: 12px;
        color: var(--el-color-primary);
      }

      .weather-temp {
        font-size: 28px;
        font-weight: 600;
        margin: 12px 0;
        background: linear-gradient(120deg, #2c3e50, #3498db);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .weather-desc {
        color: #64748b;
        margin-bottom: 8px;
        font-size: 14px;
        letter-spacing: 0.5px;
      }

      .weather-date {
        font-size: 13px;
        color: #94a3b8;
        font-weight: 500;
      }
    }
  }

  :deep(.f1-stats-card) {
    background: white;

    .trend-value {
      font-weight: 500;
      font-size: 13px;
      
      &.up {
        color: #10b981;
      }
      
      &.down {
        color: #ef4444;
      }
    }
  }

  :deep(.f1-standings-table) {
    .el-table {
      overflow: hidden;
      
      th {
        background-color: #f8fafc !important;
        font-weight: 500;
      }
      
      td {
        padding: 16px 0;
      }
    }
  }
}
</style>