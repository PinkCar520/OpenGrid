<template>
    <div v-for="item in microAppStore.microApps" :key="item.name" :id="item.container.slice(1)"
        v-show="route.path.startsWith(item.prefixPath)">
    </div>
</template>
<script lang="ts" setup>
import {
    onMounted,
    onActivated,
    onDeactivated,
    onBeforeUnmount,
    onBeforeMount,
    onUnmounted,
    onUpdated,
    onBeforeUpdate
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { start } from 'qiankun'
import { loadedMicroApps } from '../config/loadedMicroAppLifeCycle'
import { useMicroAppStore } from '../stores/index'; // 使用 Pinia Store

const router = useRouter()
const route = useRoute()
const microAppStore = useMicroAppStore()

onBeforeMount(() => {
    start({
        urlRerouteOnly: true
    })
    console.log("micro_beforeMount")
})

onMounted(() => {
    if(route.meta?.isMicroApp) {
        loadedMicroApps(route.path)
    }
    console.log("micro_mounted")
})

onBeforeUpdate(() => {
    console.log("micro_beforeUpdate")
})

onUpdated(() => {
    if(route.meta?.isMicroApp) {
        loadedMicroApps(route.path)
    }
    console.log("micro_updated")
})

onActivated(() => {
    console.log("micro_activated")
})

onDeactivated(() => {
    console.log("micro_deactivated")
})

onBeforeUnmount(() => {
    console.log("micro_beforeUnmount")
})

onUnmounted(() => {
    console.log("micro_unmounted")
})
</script>