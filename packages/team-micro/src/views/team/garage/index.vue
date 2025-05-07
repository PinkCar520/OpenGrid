<template>
  <div class="team-garage">
    <el-row :gutter="24">
      <el-col :span="16">
        <el-card class="car-status">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <h3>车辆状态</h3>
                <el-tag effect="plain" type="info">里程: {{ currentCar?.mileage || 0 }}km</el-tag>
              </div>
              <el-segmented 
                v-model="selectedCar"
                :options="[
                  { label: 'Max Verstappen', value: 1 },
                  { label: 'Sergio Perez', value: 2 }
                ]"
              />
            </div>
          </template>
          
          <div class="car-view">
            <div class="car-image">
              <!-- <el-image :src="currentCar.image" /> -->
              <div v-for="(part, key) in carParts" 
                   :key="key"
                   class="part-indicator"
                   :class="[`position-${key}`, part.status]"
                   @click="selectPart(key)"
              />
            </div>
            
            <div class="part-details" v-if="selectedPart">
              <div class="part-header">
                <h4>{{ carParts[selectedPart].name }}</h4>
                <el-tag :type="carParts[selectedPart].status === 'good' ? 'success' : 
                               carParts[selectedPart].status === 'warning' ? 'warning' : 'danger'">
                  {{ carParts[selectedPart].status === 'good' ? '状态良好' : 
                     carParts[selectedPart].status === 'warning' ? '需要维护' : '需要更换' }}
                </el-tag>
              </div>

              <div class="part-info">
                <div class="info-item">
                  <span class="label">安装日期</span>
                  <span class="value">{{ carParts[selectedPart].installDate }}</span>
                </div>
                <div class="info-item">
                  <span class="label">使用里程</span>
                  <span class="value">{{ carParts[selectedPart].mileage }}km</span>
                </div>
                <div class="info-item">
                  <span class="label">制造商</span>
                  <span class="value">{{ carParts[selectedPart].manufacturer }}</span>
                </div>
              </div>

              <div class="status-bars">
                <div class="status-bar">
                  <div class="bar-header">
                    <span class="bar-label">耐久度</span>
                    <span class="bar-value">{{ carParts[selectedPart].durability }}%</span>
                  </div>
                  <el-progress 
                    :percentage="carParts[selectedPart].durability"
                    :status="carParts[selectedPart].durability < 60 ? 'exception' : 
                             carParts[selectedPart].durability < 80 ? 'warning' : 'success'"
                  />
                </div>
                
                <div class="status-bar">
                  <div class="bar-header">
                    <span class="bar-label">性能</span>
                    <span class="bar-value">{{ carParts[selectedPart].performance }}%</span>
                  </div>
                  <el-progress 
                    :percentage="carParts[selectedPart].performance"
                    :status="carParts[selectedPart].performance < 80 ? 'warning' : 'success'"
                  />
                </div>
              </div>

              <div ref="performanceChartRef" class="performance-chart"></div>

              <div class="actions">
                <el-button-group>
                  <el-button type="primary" @click="maintainPart">
                    <el-icon><Tools /></el-icon>维护
                  </el-button>
                  <el-button type="warning" @click="replacePart">
                    <el-icon><Refresh /></el-icon>更换
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="maintenance-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <h3>维修日程</h3>
                <el-tag effect="plain" type="info">{{ maintenanceTasks.length }} 个任务</el-tag>
              </div>
              <el-button type="primary" @click="showMaintenanceDialog">
                <el-icon class="el-icon--right"><Plus /></el-icon>
              </el-button>
            </div>
          </template>
          
          <div class="maintenance-list">
            <el-scrollbar height="600px">
              <div 
                v-for="task in maintenanceTasks" 
                :key="task.id"
                class="maintenance-item"
                :class="{ 'is-completed': task.status === 'completed' }"
              >
                <div class="item-header">
                  <div class="title-section">
                    <el-tag 
                      size="small" 
                      :type="task.status === 'pending' ? 'warning' : 'success'"
                    >
                      {{ task.status === 'pending' ? '待处理' : '已完成' }}
                    </el-tag>
                    <h4>{{ task.title }}</h4>
                  </div>
                  <span class="time">{{ task.time }}</span>
                </div>

                <div class="item-body">
                  <p class="description">{{ task.description }}</p>
                  <div class="meta-info">
                    <el-tag size="small" effect="plain">
                      <el-icon><UserFilled /></el-icon>
                      {{ task.engineer }}
                    </el-tag>
                    <el-tag size="small" effect="plain" :type="getPartStatusType(task.partKey)">
                      <el-icon><Tools /></el-icon>
                      {{ carParts[task.partKey].name }}
                    </el-tag>
                  </div>
                </div>

                <div class="item-footer">
                  <el-button 
                    size="small"
                    :type="task.status === 'pending' ? 'primary' : 'success'"
                    @click="toggleTaskStatus(task)"
                  >
                    {{ task.status === 'pending' ? '完成' : '重开' }}
                  </el-button>
                  <el-popconfirm
                    title="确定要删除这个任务吗？"
                    @confirm="deleteTask(task.id)"
                  >
                    <template #reference>
                      <el-button size="small" type="danger" plain>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加维修任务弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加维修任务"
      width="500px"
      class="maintenance-dialog"
    >
      <el-form :model="newTask" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="维修部件" required>
              <el-select v-model="newTask.partKey" class="w-full">
                <el-option
                  v-for="(part, key) in carParts"
                  :key="key"
                  :label="part.name"
                  :value="key"
                >
                  <div class="part-option">
                    <span class="status-dot" :class="part.status" />
                    {{ part.name }}
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划时间" required>
              <el-time-picker v-model="newTask.time" format="HH:mm" class="w-full" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="任务标题">
          <el-input v-model="newTask.title" />
        </el-form-item>
        <el-form-item label="维修工程师">
          <el-input v-model="newTask.engineer" />
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="newTask.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMaintenanceTask">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { Tools, Refresh, Plus, UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// Remove individual Tab/TabPane imports, they're globally registered by Element Plus

const selectedCar = ref(1)
const selectedPart = ref('')

const cars = ref([
  { 
    number: 1,
    image: '/cars/rb19-1.png',
    driver: 'Max Verstappen'
  },
  { 
    number: 2,
    image: '/cars/rb19-2.png',
    driver: 'Sergio Perez'
  }
])

const currentCar = computed(() => 
  cars.value.find(car => car.number === selectedCar.value)
)

// 扩展车辆部件数据
const carParts = ref({
  frontWing: { 
    name: '前翼',
    status: 'good',
    durability: 85,
    performance: 92,
    position: { top: '30%', left: '20%' },
    installDate: '2025-03-15',
    mileage: 2800,
    manufacturer: 'Red Bull Advanced Technologies',
    nextMaintenance: 3500,
    history: [
      { date: '2025-03-15', type: 'install', description: '安装新部件' },
      { date: '2025-03-20', type: 'maintain', description: '例行检查' }
    ]
  },
  rearWing: { 
    name: '后翼',
    status: 'warning',
    durability: 65,
    performance: 88,
    position: { top: '60%', left: '80%' },
    installDate: '2025-03-10',
    mileage: 3200,
    manufacturer: 'Red Bull Racing',
    nextMaintenance: 3800,
    history: [
      { date: '2025-03-10', type: 'install', description: '安装新部件' }
    ]
  },
  sidepod: {
    name: '侧箱',
    status: 'good',
    durability: 90,
    performance: 95,
    position: { top: '45%', left: '50%' },
    installDate: '2025-03-15',
    mileage: 2500,
    manufacturer: 'Red Bull Racing',
    nextMaintenance: 4000,
    history: []
  },
  floor: {
    name: '地板',
    status: 'danger',
    durability: 45,
    performance: 78,
    position: { top: '70%', left: '50%' },
    installDate: '2025-03-01',
    mileage: 4500,
    manufacturer: 'Red Bull Racing',
    nextMaintenance: 5000,
    history: []
  }
})

// 性能历史数据
const performanceHistory = ref({
  dates: ['03-15', '03-16', '03-17', '03-18', '03-19', '03-20'],
  data: {
    frontWing: [92, 91, 90, 88, 87, 85],
    rearWing: [88, 86, 84, 82, 80, 78],
    sidepod: [95, 94, 93, 92, 91, 90],
    floor: [78, 75, 70, 65, 60, 55]
  }
})

// 维修历史
const maintenanceHistory = ref([
  {
    id: 1,
    date: '2025-03-20',
    part: 'frontWing',
    type: 'maintain',
    description: '前翼端板维护',
    engineer: 'John Smith',
    duration: '2h',
    cost: 5000
  }
])

// 部件详情图表
let performanceChart: echarts.ECharts | null = null
const performanceChartRef = ref<HTMLElement | null>(null)

const initPerformanceChart = () => {
  if (performanceChartRef.value) {
    performanceChart = echarts.init(performanceChartRef.value)
    updatePerformanceChart()
  }
}

const updatePerformanceChart = () => {
  if (!performanceChart || !selectedPart.value) return
  
  const part = carParts.value[selectedPart.value]
  performanceChart.setOption({
    title: { text: `${part.name}性能趋势` },
    tooltip: { trigger: 'axis' },
    xAxis: { 
      type: 'category',
      data: performanceHistory.value.dates
    },
    yAxis: { type: 'value', min: 50, max: 100 },
    series: [{
      name: '性能',
      type: 'line',
      data: performanceHistory.value.data[selectedPart.value],
      smooth: true,
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }]
  })
}

// 维护逻辑
const maintainPart = () => {
  if (!selectedPart.value) return
  
  const part = carParts.value[selectedPart.value]
  // 更新耐久度
  part.durability = Math.min(100, part.durability + 15)
  // 更新状态
  part.status = part.durability > 80 ? 'good' : part.durability > 60 ? 'warning' : 'danger'
  // 添加维护记录
  part.history.push({
    date: new Date().toISOString().split('T')[0],
    type: 'maintain',
    description: '常规维护'
  })
}

// 更换逻辑
const replacePart = () => {
  if (!selectedPart.value) return
  
  const part = carParts.value[selectedPart.value]
  // 重置状态
  part.durability = 100
  part.performance = 100
  part.status = 'good'
  part.installDate = new Date().toISOString().split('T')[0]
  part.mileage = 0
  // 添加更换记录
  part.history.push({
    date: new Date().toISOString().split('T')[0],
    type: 'replace',
    description: '更换新部件'
  })
}

onMounted(() => {
  initPerformanceChart()
})

// 监听部件选择变化
watch(selectedPart, () => {
  updatePerformanceChart()
})

const selectPart = (part: string) => {
  console.log('Selecting part:', part) // 调试日志
  if (part && carParts.value[part]) {
    selectedPart.value = part
    nextTick(() => {
      // 确保DOM更新后再初始化图表
      updatePerformanceChart()
    })
  }
}

const addMaintenance = () => {
  // 添加维修任务
}

interface MaintenanceTask {
  id: number;
  partKey: string;
  title: string;
  description: string;
  time: string;
  engineer: string;
  status: 'pending' | 'completed';
}

const maintenanceTasks = ref<MaintenanceTask[]>([
  {
    id: 1,
    partKey: 'frontWing',
    title: '前翼端板维护',
    description: '更换前翼端板，检查气动性能',
    time: '14:30',
    engineer: 'John Smith',
    status: 'pending'
  }
])

const dialogVisible = ref(false)
const newTask = ref<Partial<MaintenanceTask>>({
  partKey: '',
  title: '',
  description: '',
  time: '',
  engineer: '',
  status: 'pending'
})

const showMaintenanceDialog = () => {
  newTask.value = {
    partKey: '',
    title: '',
    description: '',
    time: '',
    engineer: '',
    status: 'pending'
  }
  dialogVisible.value = true
}

const submitMaintenanceTask = () => {
  if (!newTask.value.partKey || !newTask.value.title || !newTask.value.engineer) {
    ElMessage.warning('请填写必要信息')
    return
  }

  maintenanceTasks.value.push({
    id: Date.now(),
    partKey: newTask.value.partKey!,
    title: newTask.value.title!,
    description: newTask.value.description || '',
    time: newTask.value.time || new Date().toLocaleTimeString(),
    engineer: newTask.value.engineer!,
    status: 'pending'
  })

  dialogVisible.value = false
  ElMessage.success('任务已添加')
}

const getTaskStatusType = (status: string) => {
  return status === 'pending' ? 'warning' : 'success'
}

const toggleTaskStatus = (task: MaintenanceTask) => {
  task.status = task.status === 'pending' ? 'completed' : 'pending'
}

const deleteTask = (taskId: number) => {
  maintenanceTasks.value = maintenanceTasks.value.filter(task => task.id !== taskId)
}

// 添加获取部件状态类型的方法
const getPartStatusType = (partKey: string) => {
  const status = carParts.value[partKey].status
  return status === 'good' ? 'success' : 
         status === 'warning' ? 'warning' : 'danger'
}
</script>

<style lang="scss" scoped>
.team-garage {
  padding: 32px;
  background: #fafafa;
  // min-height: 100vh;

  .car-status {
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
    //   border-bottom: 1px solid #f3f4f6;

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;

        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }
      }
    }

    .car-view {
      padding: 24px;
      
      .car-image {
        position: relative;
        margin-bottom: 24px;
        aspect-ratio: 16/9;
        background: #f8fafc;
        border-radius: 12px;
        overflow: hidden;
        
        .el-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .part-indicator {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          &::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid transparent;
            transition: border-color 0.2s ease;
          }

          &:hover {
            transform: scale(1.1);
            
            &::after {
              border-color: currentColor;
            }
          }

          &.good { 
            background: #10b981; 
            &::after { border-color: #10b981; }
          }
          &.warning { 
            background: #f59e0b;
            &::after { border-color: #f59e0b; } 
          }
          &.danger { 
            background: #ef4444;
            &::after { border-color: #ef4444; } 
          }
        }
      }
    }

    .performance-analysis {
      .analysis-stats {
        display: flex;
        gap: 24px;
        margin-top: 20px;
        padding: 16px;
        background: #f8fafc;
        border-radius: 8px;

        .stat-item {
          .label {
            display: block;
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 4px;
          }

          .value {
            font-size: 24px;
            font-weight: 600;
            color: #111827;

            &.warning {
              color: #f59e0b;
            }
          }
        }
      }
    }
  }

  .maintenance-card {
    height: 100%;

    .maintenance-list {
      padding: 0 16px;

      .maintenance-item {
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        background: #fff;
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease;

        &:hover {
          border-color: #d1d5db;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        &.is-completed {
          background: #f9fafb;
          border-color: #e5e7eb;
          opacity: 0.8;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;

          .title-section {
            display: flex;
            align-items: center;
            gap: 8px;

            h4 {
              margin: 0;
              font-size: 16px;
              font-weight: 500;
              color: #111827;
            }
          }

          .time {
            font-size: 13px;
            color: #6b7280;
          }
        }

        .item-body {
          margin-bottom: 16px;

          .description {
            margin: 0 0 12px;
            color: #4b5563;
            font-size: 14px;
            line-height: 1.5;
          }

          .meta-info {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
        }

        .item-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
      }
    }
  }
}

.mr-1 {
  margin-right: 4px;
}

.task-description {
  margin: 8px 0;
  color: #4b5563;
  font-size: 14px;
}

.task-footer {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
