<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="index === breadcrumbs.length - 1"
          class="no-redirect"
        >{{item.meta.title}}</span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch,computed } from 'vue'
import { useRoute, useRouter, type RouteLocationMatched } from 'vue-router'
import { isMicroApp } from '../config/loadedMicroAppLifeCycle'

const route = useRoute()
const router = useRouter()
const breadcrumbs = ref<RouteLocationMatched[]>([])

const getBreadcrumbs = () => {
  // 过滤有标题的路由
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  // 处理微应用路由
  if (route.meta?.isMicroApp) {
    const appRoute = matched[matched.length - 1]
    if (appRoute) {
      const parentPath = appRoute.path.split('/')[1] 
      // 获取父级路径 (race/team/hev/hpv)
      // 确保添加微应用的父级面包屑
      matched = matched.map(item => {
        if (item.path.includes(parentPath)) {
          return {
            ...item,
            meta: {
              ...item.meta,
              title: `${route.meta.title}` // 使用对应的首页标题
            }
          }
        }
        return item
      })
    }
  }
  
  breadcrumbs.value = matched
}

const handleLink = (item: RouteLocationMatched) => {
  const { path } = item
  router.push(path)
}

watch(
  () => route.path,
  () => getBreadcrumbs(),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .el-breadcrumb__separator {
    margin: 0 9px;
  }
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
