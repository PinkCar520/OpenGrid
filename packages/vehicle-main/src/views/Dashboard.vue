<template>
  <div>
    <h1>Dashboard</h1>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'dashboard',
  data() {
    return {
      input: ref('')
    }
  },
  setup() {
  }
}
</script>