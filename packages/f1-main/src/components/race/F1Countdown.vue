<template>
  <f1-card type="primary" class="f1-countdown">
    <template #header>
      <div class="countdown-header">
        <h3>{{ nextRace.name }}</h3>
        <span class="circuit">{{ nextRace.circuit }}</span>
      </div>
    </template>
    
    <div class="countdown-timer">
      <div class="timer-item">
        <span class="value">{{ days }}</span>
        <span class="label">天</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ hours }}</span>
        <span class="label">时</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ minutes }}</span>
        <span class="label">分</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ seconds }}</span>
        <span class="label">秒</span>
      </div>
    </div>

    <template #footer>
      <div class="countdown-info">
        <el-icon><Timer /></el-icon>
        <span>{{ nextRace.date }} {{ nextRace.time }}</span>
      </div>
    </template>
  </f1-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import F1Card from '../common/F1Card.vue'

interface RaceInfo {
  name: string
  circuit: string
  date: string
  time: string
  timestamp: number
}

const props = defineProps<{
  nextRace: RaceInfo
}>()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer: number

const updateCountdown = () => {
  const now = Date.now()
  const diff = props.nextRace.timestamp - now

  if (diff > 0) {
    days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
    minutes.value = Math.floor((diff / (1000 * 60)) % 60)
    seconds.value = Math.floor((diff / 1000) % 60)
  }
}

onMounted(() => {
  updateCountdown()
  timer = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.f1-countdown {
  .countdown-header {
    h3 {
      margin: 0;
      color: var(--f1-color-primary);
    }
    .circuit {
      font-size: 14px;
      color: var(--f1-color-track);
    }
  }

  .countdown-timer {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
    
    .timer-item {
      text-align: center;
      
      .value {
        display: block;
        font-size: 36px;
        font-weight: bold;
        font-family: var(--f1-font-title);
        color: var(--f1-color-secondary);
        min-width: 60px;
      }
      
      .label {
        font-size: 14px;
        color: var(--f1-color-track);
      }
    }
  }

  .countdown-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--f1-color-track);
  }
}
</style>
