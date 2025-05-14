<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path"></component>
    </KeepAlive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path"></component>
  </router-view>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>