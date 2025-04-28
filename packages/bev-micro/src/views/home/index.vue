<template>
  <div class="bev-home">
    <h1>纯电动汽车_Micro_App</h1>
    <el-button type="primary" @click="$router.push('/bev/superchargerMap')">充电功能</el-button>
    <el-button type="primary" @click="$router.push('/bev/batteryHealthDashboard')">电池健康仪表盘</el-button>
  </div>
  </template>
  <script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
  </script>