<template>
  <div class="track-map">
    <div ref="mapContainer" class="track-container">
      <!-- 3D地图渲染区域 -->
    </div>
    <div class="track-controls">
      <el-button-group>
        <el-button size="small" @click="zoomIn">
          <el-icon><ZoomIn /></el-icon>
        </el-button>
        <el-button size="small" @click="zoomOut">
          <el-icon><ZoomOut /></el-icon>
        </el-button>
        <el-button size="small" @click="resetView">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </el-button-group>
    </div>
    <div class="track-stats">
      <div v-for="sector in sectors" :key="sector.id" 
        class="sector-stat" 
        :style="{ backgroundColor: getSectorColor(sector) }">
        <span class="sector-name">{{ sector.name }}</span>
        <span class="sector-time">{{ formatTime(sector.time) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ZoomIn, ZoomOut, Refresh } from '@element-plus/icons-vue'

const props = defineProps<{
  sectors: Array<{
    id: string
    name: string
    time: number
    bestTime: number
    coordinates: number[][]
  }>
  analysisType: string
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let trackMesh: THREE.Mesh

// 初始化三维场景
const initScene = () => {
  if (!mapContainer.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  camera = new THREE.PerspectiveCamera(
    75,
    mapContainer.value.clientWidth / mapContainer.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 50, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight)
  mapContainer.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  createTrack()
  animate()
}

// 创建赛道模型
const createTrack = () => {
  // 这里添加赛道3D模型的创建逻辑
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 缩放控制
const zoomIn = () => {
  camera.position.multiplyScalar(0.9)
}

const zoomOut = () => {
  camera.position.multiplyScalar(1.1)
}

const resetView = () => {
  camera.position.set(0, 50, 0)
  camera.lookAt(0, 0, 0)
}

// 格式化时间
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const milliseconds = Math.floor((time % 1) * 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

// 获取扇区颜色
const getSectorColor = (sector: any) => {
  const ratio = sector.time / sector.bestTime
  if (ratio <= 1) return '#67C23A'
  if (ratio <= 1.02) return '#E6A23C'
  return '#F56C6C'
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
})

const onResize = () => {
  if (!mapContainer.value) return
  
  camera.aspect = mapContainer.value.clientWidth / mapContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight)
}

watch(() => props.analysisType, (newType) => {
  updateTrackVisualization(newType)
})

const updateTrackVisualization = (type: string) => {
  // 根据分析类型更新赛道可视化效果
}
</script>

<style lang="scss" scoped>
.track-map {
  position: relative;
  width: 100%;
  height: 100%;
  
  .track-container {
    width: 100%;
    height: 100%;
  }
  
  .track-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 10;
  }
  
  .track-stats {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    .sector-stat {
      display: flex;
      justify-content: space-between;
      padding: 6px 12px;
      margin-bottom: 4px;
      border-radius: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .sector-time {
        font-family: monospace;
        font-weight: 600;
      }
    }
  }
}
</style>
