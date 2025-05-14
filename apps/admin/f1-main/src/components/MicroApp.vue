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
import { useRoute } from 'vue-router'
import { start } from 'qiankun'
import { mountMicroApps,updateMicroApps,unmountMicroApps } from '../hooks/microAppHelpers'
import { useMicroAppStore } from '../stores/microApp';

const route = useRoute()
const microAppStore = useMicroAppStore()

onBeforeMount(() => {
    start({
        urlRerouteOnly: true
    })
    console.log("micro_beforeMount")
})

onMounted(async ()=> {
    await mountMicroApps(route)
    console.log("micro_mounted")
})

onBeforeUpdate(() => {
    console.log("micro_beforeUpdate")
})

onUpdated(async () => {
    await updateMicroApps(route)
    console.log("micro_updated")
})

onActivated(() => {
    console.log("micro_activated")
})

onDeactivated(() => {
    console.log("micro_deactivated")
})

onBeforeUnmount(async () => {
    await unmountMicroApps(route)
    console.log("micro_beforeUnmount")
})

onUnmounted(() => {
    console.log("micro_unmounted")
})
</script>