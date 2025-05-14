<template>
  <div class="f1-dashboard">
    <!-- <el-button @click="goToUser" type='primary'>用户管理</el-button> -->
    <!-- <el-button @click="goToMicro" type='primary'>赛事管理/micro</el-button> -->
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
        <f1-card :title="$t('dashboard.weather.title')" type="secondary">
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
        <f1-standings-table
          :title="$t('dashboard.standings.title')"
          type="primary"
          :drivers="driversStandings"
          :constructors="constructorsStandings"
        />
      </el-col>
    </el-row>

    <!-- 新增：比赛日程 -->
    <el-row :gutter="20" class="mt-4">
      <el-col :span="24">
        <f1-card :title="$t('dashboard.schedule.title')" type="info">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in scheduleData"
              :key="index"
              :type="activity.type"
              :color="activity.color"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </f1-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import { useRouter } from "vue-router"
import { useI18n } from 'vue-i18n'
import { Timer, Trophy, Flag, DataLine, Refresh, Sunny, Cloudy, Lightning } from '@element-plus/icons-vue'
import F1Countdown from '@/components/race/F1Countdown.vue'
import F1StandingsTable from '@/components/standings/F1StandingsTable.vue'
import { useF1Store } from '@/stores/f1'
import { useErrorStore } from '@/stores/error'

const { t } = useI18n()
const f1Store = useF1Store()
const errorStore = useErrorStore()
const router = useRouter()
// 自动刷新定时器
let refreshTimer: number | null = null

// 天气数据
const weatherData = ref([
  { date: '2025-05-25', temp: 22, description: t('dashboard.weather.sunny'), icon: markRaw(Sunny) },
  { date: '2025-05-26', temp: 20, description: t('dashboard.weather.cloudy'), icon: markRaw(Cloudy) },
  { date: '2025-05-27', temp: 19, description: t('dashboard.weather.thunderstorm'), icon: markRaw(Lightning) }
])

// 比赛日程数据
const scheduleData = ref([
  {
    content: t('dashboard.schedule.practice1'),
    timestamp: '2025-05-25 10:00',
    type: 'primary',
    color: '#409EFF'
  },
  {
    content: t('dashboard.schedule.qualifying'),
    timestamp: '2025-05-25 14:00',
    type: 'success',
    color: '#67C23A'
  },
  {
    content: t('dashboard.schedule.race'),
    timestamp: '2025-05-26 15:00',
    type: 'warning',
    color: '#E6A23C'
  }
])

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(t('common.locale'), { month: 'short', day: 'numeric' })
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
    title: t('dashboard.stats.completedRaces'),
    value: '5/24',
    icon: markRaw(Flag),
    type: 'primary' as const,
    trend: 20.8
  },
  {
    title: t('dashboard.stats.leadingDriver'),
    value: 'M. Verstappen',
    icon: markRaw(Trophy),
    type: 'victory' as const,
    trend: 15.3
  },
  {
    title: t('dashboard.stats.leadingTeam'),
    value: 'Red Bull Racing',
    icon: markRaw(DataLine),
    type: 'pit' as const,
    trend: 12.5
  },
  {
    title: t('dashboard.stats.nextRace'),
    value: t('dashboard.stats.monacoGP'),
    icon: markRaw(Timer),
    type: 'secondary' as const,
    trend: 999
  }
])

// 下一场比赛信息
const nextRace = ref({
  name: t('dashboard.stats.monacoGP'),
  circuit: t('dashboard.stats.monteCarlo'),
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
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  background: var(--el-bg-color-page);

  :deep(.f1-card),
  :deep(.f1-alert),
  :deep(.f1-countdown),
  :deep(.f1-card--secondary),
  :deep(.f1-standings),
  :deep(.f1-standings-table .f1-table) {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  :deep(.f1-card),
  :deep(.f1-alert),
  :deep(.f1-stats-card),
  :deep(.f1-countdown),
  :deep(.f1-card--secondary),
  :deep(.f1-standings),
  :deep(.f1-standings-table .f1-table),
  .weather-day {
    overflow: hidden;
  }

  :deep(.f1-card) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }

    .f1-card__header {
      padding: 16px 20px;
      font-weight: 600;
      border-bottom: 1px solid var(--el-border-color-light);
    }
  }

  .mt-4 {
    margin-top: 32px;
  }

  .ml-2 {
    margin-left: 12px;
  }

  :deep(.f1-alert) {
    margin-bottom: 24px;
  }

  .weather-forecast {
    padding: 20px;

    .weather-day {
      text-align: center;
      padding: 16px;
      background: var(--el-bg-color-overlay);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .el-icon {
        margin-bottom: 12px;
        color: var(--el-color-primary);
      }

      .weather-temp {
        font-size: 28px;
        font-weight: 600;
        margin: 12px 0;
        background: linear-gradient(120deg, var(--el-color-primary), var(--el-color-success));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .weather-desc {
        color: var(--el-text-color-secondary);
        margin-bottom: 8px;
        font-size: 14px;
        letter-spacing: 0.5px;
      }

      .weather-date {
        font-size: 13px;
        color: var(--el-text-color-placeholder);
        font-weight: 500;
      }
    }
  }

  :deep(.f1-stats-card) {
    .trend-value {
      font-weight: 500;
      font-size: 13px;

      &.up {
        color: var(--el-color-success);
      }

      &.down {
        color: var(--el-color-danger);
      }
    }
  }

  :deep(.f1-standings-table) {
    .f1-table {
      overflow: hidden;

      th {
        font-weight: 600;
        background: var(--el-bg-color-overlay);
      }

      td {
        padding: 16px 0;
      }
    }
  }

  :deep(.el-timeline) {
    padding: 20px;

    .el-timeline-item {
      padding-bottom: 24px;

      &:last-child {
        padding-bottom: 0;
      }

      .el-timeline-item__content {
        font-size: 14px;
        color: var(--el-text-color-primary);
      }

      .el-timeline-item__timestamp {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
