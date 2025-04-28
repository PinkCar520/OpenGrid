<template>
    <div id="micro-bev-container"></div>
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
import { isMicroApp,loadedMicroApps } from '../config/loadedMicroAppLifeCycle'

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
    start()
    console.log("micro_beforeMount")
})

onMounted(() => {
    console.log("micro_mounted")
})

onBeforeUpdate(() => {
    console.log("micro_beforeUpdate")
})

onUpdated(() => {
    console.log("micro_updated")
})

onActivated(() => {
    if (isMicroApp(route.path)) {
        loadedMicroApps(route.path)
    }
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