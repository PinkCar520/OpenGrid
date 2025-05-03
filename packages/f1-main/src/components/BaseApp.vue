<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </router-view>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>