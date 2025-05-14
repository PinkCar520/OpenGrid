<template>
  <div class="driver-profile">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="profile-card">
          <div class="profile-header">
            <el-avatar :size="120" :src="driverInfo.photo" />
            <div class="driver-number" :style="{ background: driverInfo.teamColor }">
              {{ driverInfo.number }}
            </div>
          </div>
          
          <div class="profile-info">
            <h2>{{ driverInfo.name }}</h2>
            <p class="team">{{ driverInfo.team }}</p>
            
            <div class="info-grid">
              <div class="info-item">
                <span class="label">国籍</span>
                <span class="value">
                  <el-image 
                    :src="`/flags/${driverInfo.countryCode}.png`"
                    class="flag"
                  />
                  {{ driverInfo.nationality }}
                </span>
              </div>
              <div class="info-item">
                <span class="label">出生日期</span>
                <span class="value">{{ driverInfo.dateOfBirth }}</span>
              </div>
              <div class="info-item">
                <span class="label">总参赛</span>
                <span class="value">{{ driverInfo.grandsPrix }}</span>
              </div>
              <div class="info-item">
                <span class="label">冠军数</span>
                <span class="value">{{ driverInfo.championships }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="16">
        <el-card class="stats-card">
          <template #header>
            <div class="card-header">
              <h3>赛季统计</h3>
              <el-select v-model="selectedSeason">
                <el-option
                  v-for="year in seasons"
                  :key="year"
                  :label="year"
                  :value="year"
                />
              </el-select>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="6" v-for="stat in seasonStats" :key="stat.label">
              <div class="stat-item">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </el-col>
          </el-row>
          
          <div ref="performanceChart" style="height: 300px; margin-top: 20px"></div>
        </el-card>
        
        <el-card class="achievements-card">
          <template #header>
            <h3>职业生涯成就</h3>
          </template>
          
          <el-timeline>
            <el-timeline-item
              v-for="achievement in achievements"
              :key="achievement.date"
              :timestamp="achievement.date"
              :type="achievement.type"
            >
              {{ achievement.title }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const selectedSeason = ref(2025)
const seasons = [2025, 2024, 2023]

const driverInfo = ref({
  name: 'Max Verstappen',
  number: 1,
  team: 'Red Bull Racing',
  teamColor: '#0600EF',
  nationality: '荷兰',
  countryCode: 'NLD',
  dateOfBirth: '1997-09-30',
  grandsPrix: 163,
  championships: 3,
  photo: '/drivers/verstappen.png'
})

const seasonStats = ref([
  { label: '胜场', value: 19 },
  { label: '领奖台', value: 21 },
  { label: '杆位', value: 12 },
  { label: '积分', value: 575 }
])

const achievements = ref([
  {
    date: '2023',
    title: 'F1世界冠军',
    type: 'success'
  }
])

onMounted(() => {
  initPerformanceChart()
})

function initPerformanceChart() {
  // 初始化性能趋势图表
}
</script>

<style lang="scss" scoped>
.driver-profile {
  padding: 20px;

  .profile-card {
    .profile-header {
      position: relative;
      text-align: center;
      padding: 20px 0;
      
      .driver-number {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        font-weight: bold;
        border-radius: 50%;
      }
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 20px;
    
    .info-item {
      .label {
        color: var(--f1-text-color-secondary);
        font-size: 14px;
      }
      
      .value {
        display: block;
        margin-top: 4px;
        font-weight: 500;
      }
    }
  }

  .stat-item {
    text-align: center;
    padding: 20px;
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: var(--f1-color-primary);
    }
    
    .stat-label {
      margin-top: 8px;
      color: var(--f1-text-color-secondary);
    }
  }
}
</style>
