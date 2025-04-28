<template>
  <div>
    <h2>{{ t('route.userManage') }}</h2>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <!-- 用户管理页面内容 -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'users',
  data() {
    return {
      input: ref(''),
      t: useI18n().t
    }
  },
  setup() {
  }
}
</script>
