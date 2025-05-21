<template>
  <div ref="container" class="car-model-viewer">
    <div class="controls">
      <el-button-group>
        <el-button size="small" @click="rotateModel('left')">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <el-button size="small" @click="rotateModel('reset')">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button size="small" @click="rotateModel('right')">
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </div>
    <div ref="modelContainer" class="model-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ArrowLeft, ArrowRight, Refresh } from '@element-plus/icons-vue'

const container = ref<HTMLDivElement | null>(null)
const modelContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let carModel: THREE.Object3D

// 初始化Three.js场景
const initScene = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  camera = new THREE.PerspectiveCamera(
    75,
    modelContainer.value!.clientWidth / modelContainer.value!.clientHeight,
    0.1,
    1000
  )
  camera.position.set(5, 3, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(modelContainer.value!.clientWidth, modelContainer.value!.clientHeight)
  renderer.shadowMap.enabled = true
  modelContainer.value!.appendChild(renderer.domElement)

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 10)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  loadModel()
  animate()
}

// 加载3D模型
const loadModel = () => {
  const loader = new GLTFLoader()
  loader.load('/models/f1_car.glb', (gltf) => {
    carModel = gltf.scene
    carModel.scale.set(0.5, 0.5, 0.5)
    scene.add(carModel)
    
    // 自动旋转展示
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.0
    }
  })
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 旋转模型
const rotateModel = (direction: 'left' | 'right' | 'reset') => {
  if (!carModel) return
  
  if (direction === 'reset') {
    carModel.rotation.y = 0
  } else {
    const rotationAmount = direction === 'left' ? -Math.PI / 4 : Math.PI / 4
    carModel.rotation.y += rotationAmount
  }
}

// 响应窗口大小变化
const handleResize = () => {
  if (!modelContainer.value) return
  
  camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight)
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.car-model-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  
  .controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .model-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
    background: linear-gradient(to bottom, #f5f5f5, #e5e5e5);
    border-radius: 8px;
    overflow: hidden;
  }
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
  .car-model-viewer {
    .controls {
      background: rgba(0, 0, 0, 0.8);
    }
    
    .model-container {
      background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);
    }
  }
}
</style>
