<template>
  <f1-card :type="type" :hoverable="true" class="f1-stats-card">
    <div class="stats-content">
      <el-icon :size="32" :class="iconClass">
        <component :is="icon" />
      </el-icon>
      <div class="stats-info">
        <h4 class="stats-title">{{ title }}</h4>
        <div class="stats-value">
          <el-tooltip :content="value" placement="top">
            <span>{{ value }}</span>
          </el-tooltip>
        </div>
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
import type { Component } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: {
    type: [String, Object] as PropType<string | Component>,
    required: true
  },
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
    color: var(--el-text-color-secondary);
  }

  .stats-value {
    font-size: 24px;
    font-weight: bold;
    margin: 8px 0;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .stats-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    padding: 2px 8px;
    font-weight: bold;
    border-radius: 6px;
    background-color: var(--el-bg-color-overlay);
    
    &.trend-up {
      color: var(--el-color-success);
      background-color: var(--el-color-success-light-9);
    }
    
    &.trend-down {
      color: var(--el-color-danger);
      background-color: var(--el-color-danger-light-9);
    }
  }

  .icon-primary { color: var(--el-color-primary); }
  .icon-secondary { color: var(--el-color-info); }
  .icon-victory { color: var(--el-color-success); }
  .icon-pit { color: var(--el-color-warning); }
}
</style>
