<template>
  <svg
    class="zs-logo"
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Z形充电标志 -->
    <path
      d="M12 8H36L12 40H36"
      :stroke="primaryColor"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- 闪电⚡图标 -->
    <path
      d="M24 4L14 25H24L24 44L34 23H24L24 4Z"
      :fill="secondaryColor"
    />
    <!-- 圆形外环 -->
    <circle
      cx="24"
      cy="24"
      r="22"
      :stroke="primaryColor"
      stroke-width="2"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: number
  primaryColor?: string
  secondaryColor?: string
}>(), {
  size: 32,
  primaryColor: '#409EFF',
  secondaryColor: '#67C23A'
})
</script>

<style scoped>
.zs-logo {
  display: inline-block;
  vertical-align: middle;
}
</style>
