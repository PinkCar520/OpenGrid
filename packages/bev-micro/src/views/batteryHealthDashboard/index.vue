<template>
    <div class="bev-battery__bashboard">
      <h1>电池健康仪表盘</h1>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const input = ref('')
  </script>
  <style lang="scss" scoped>
  .bev-battery__bashboard {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    h1 {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    }
    .bev-input {
      width: 100%;
      max-width: 400px;
    }
  }
  </style>