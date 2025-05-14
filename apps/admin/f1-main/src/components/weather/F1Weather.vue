<template>
  <f1-card type="secondary" class="f1-weather">
    <template #header>
      <div class="weather-header">
        <h3>赛道天气</h3>
        <span class="location">{{ location }}</span>
      </div>
    </template>

    <div class="weather-content">
      <div class="current-weather">
        <el-icon :size="48"><Sunny /></el-icon>
        <div class="temp">{{ currentTemp }}°C</div>
      </div>
      
      <el-divider />
      
      <div class="weather-details">
        <div class="detail-item">
          <el-icon><Wind /></el-icon>
          <span>风速: {{ windSpeed }}km/h</span>
        </div>
        <div class="detail-item">
          <el-icon><Umbrella /></el-icon>
          <span>降水概率: {{ precipitation }}%</span>
        </div>
        <div class="detail-item">
          <el-icon><Odometer /></el-icon>
          <span>湿度: {{ humidity }}%</span>
        </div>
      </div>
    </div>
  </f1-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import F1Card from '../common/F1Card.vue'

const props = defineProps<{
  location: string
  coordinates: {
    lat: number
    lon: number
  }
}>()

const currentTemp = ref(0)
const windSpeed = ref(0)
const precipitation = ref(0)
const humidity = ref(0)

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&units=metric&appid=YOUR_API_KEY`
    )
    const data = await response.json()
    
    currentTemp.value = Math.round(data.main.temp)
    windSpeed.value = Math.round(data.wind.speed * 3.6) // 转换为km/h
    humidity.value = data.main.humidity
    precipitation.value = data.rain ? data.rain['1h'] * 100 : 0
  } catch (error) {
    console.error('获取天气数据失败:', error)
  }
}

onMounted(() => {
  fetchWeather()
})
</script>

<style lang="scss" scoped>
.f1-weather {
  .weather-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h3 {
      margin: 0;
    }
    
    .location {
      font-size: 14px;
      color: var(--f1-color-track);
    }
  }
  
  .weather-content {
    .current-weather {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
      
      .temp {
        font-size: 36px;
        font-weight: bold;
      }
    }
    
    .weather-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      
      .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--f1-color-track);
      }
    }
  }
}
</style>
