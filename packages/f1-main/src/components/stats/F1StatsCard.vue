<template>
  <f1-card :type="type" :hoverable="true" class="f1-stats-card">
    <div class="stats-content">
      <el-icon :size="32" :class="iconClass">
        <component :is="icon" />
      </el-icon>
      <div class="stats-info">
        <h4 class="stats-title">{{ title }}</h4>
        <div class="stats-value">{{ value }}</div>
        <div v-if="trend" class="stats-trend" :class="getTrendClass">
          <el-icon><component :is="getTrendIcon" /></el-icon>
          <span>{{ Math.abs(trend) }}%</span>
        </div>
      </div>
    </div>
  </f1-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import F1Card from '../common/F1Card.vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  type: {
    type: String,
    default: 'default'
  },
  trend: Number
})

const iconClass = computed(() => `icon-${props.type}`)
const getTrendIcon = computed(() => props.trend > 0 ? CaretTop : CaretBottom)
const getTrendClass = computed(() => props.trend > 0 ? 'trend-up' : 'trend-down')
</script>

<style lang="scss" scoped>
.f1-stats-card {
  .stats-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .stats-info {
    flex: 1;
  }

  .stats-title {
    margin: 0;
    font-size: 14px;
    color: var(--f1-color-track);
  }

  .stats-value {
    font-size: 24px;
    font-weight: bold;
    margin: 8px 0;
  }

  .stats-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;

    &.trend-up {
      color: var(--f1-color-victory);
    }
    
    &.trend-down {
      color: var(--f1-color-primary);
    }
  }

  .icon-primary { color: var(--f1-color-primary); }
  .icon-secondary { color: var(--f1-color-secondary); }
  .icon-victory { color: var(--f1-color-victory); }
  .icon-pit { color: var(--f1-color-pit); }
}
</style>
