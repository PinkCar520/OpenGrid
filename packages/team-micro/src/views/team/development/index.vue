<template>
  <div class="team-development">
    <!-- 统计卡片区域 -->
    <el-row :gutter="24" class="stats-section">
      <el-col :span="6" v-for="stat in statsData" :key="stat.title">
        <el-card class="stat-card">
          <div class="stat-header">
            <span class="title">{{ stat.title }}</span>
            <el-icon :class="stat.trend > 0 ? 'up' : 'down'">
              <component :is="stat.trend > 0 ? 'CaretTop' : 'CaretBottom'" />
            </el-icon>
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-trend" :class="{ positive: stat.trend > 0 }">
            {{ Math.abs(stat.trend) }}% 
            {{ stat.trend > 0 ? '增长' : '下降' }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区域 -->
    <el-row :gutter="24" class="main-content">
      <!-- 研发树和进度 -->
      <el-col :span="16">
        <el-card class="development-card">
          <template #header>
            <div class="card-header">
              <h3>研发进度</h3>
              <el-segmented v-model="selectedCategory" :options="selectedCategoryOptions" />
            </div>
          </template>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-tree
                :data="techTreeData"
                :props="defaultProps"
                @node-click="handleNodeClick"
                node-key="id"
                highlight-current
              >
                <template #default="{ node, data }">
                  <div class="tech-node">
                    <span>{{ node.label }}</span>
                    <el-progress :percentage="data.progress" :status="data.status" />
                  </div>
                </template>
              </el-tree>
            </el-col>
            
            <el-col :span="16">
              <div v-if="selectedTech" class="tech-details">
                <div class="tech-header">
                  <h4>{{ selectedTech.name }}</h4>
                  <el-button type="primary" :disabled="!canStartDevelopment">
                    开始研发
                  </el-button>
                </div>
                
                <div class="metrics-grid">
                  <div class="metric-item">
                    <span class="label">预计收益</span>
                    <span class="value">{{ selectedTech.benefit }}</span>
                  </div>
                  <div class="metric-item">
                    <span class="label">研发周期</span>
                    <span class="value">{{ selectedTech.duration }}</span>
                  </div>
                  <div class="metric-item">
                    <span class="label">预算消耗</span>
                    <span class="value">${{ selectedTech.cost }}M</span>
                  </div>
                  <div class="metric-item">
                    <span class="label">风险等级</span>
                    <el-tag :type="selectedTech.riskLevel">{{ selectedTech.risk }}</el-tag>
                  </div>
                </div>

                <div class="tech-progress">
                  <div ref="progressChartRef" class="progress-chart"></div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 预算和进度追踪 -->
      <el-col :span="8">
        <el-card class="budget-card">
          <template #header>
            <div class="card-header">
              <h3>预算分配</h3>
            </div>
          </template>
          <div ref="budgetChartRef" class="budget-chart"></div>
          <div class="budget-breakdown">
            <div v-for="(value, key) in budget.categories" 
                 :key="key" 
                 class="budget-item"
            >
              <div class="item-header">
                <span class="name">{{ getBudgetCategoryName(key) }}</span>
                <span class="value">${{ value }}M</span>
              </div>
              <el-progress 
                :percentage="(value / budget.total) * 100"
                :color="getBudgetCategoryColor(key)"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CaretTop, CaretBottom, SetUp, Connection, Money, Tools } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

// 统计数据
const statsData = ref([
  {
    title: '研发效率',
    value: '94%',
    trend: 12.5
  },
  {
    title: '项目进度',
    value: '68%',
    trend: 8.3
  },
  {
    title: '预算使用',
    value: '76%',
    trend: -5.2
  },
  {
    title: '完成项目',
    value: '12',
    trend: 15.8
  }
])

// 预算数据
const budget = ref({
  total: 145,
  used: 110.2,
  remaining: 34.8,
  categories: {
    operations: 45.5,
    development: 35.8,
    personnel: 28.9
  }
})

const selectedCategoryOptions = ref([
  { label: '空气动力学', value: 'aero' },
  { label: '动力系统', value: 'power' },
  { label: '底盘', value: 'chassis' },
  { label: '车身', value: 'body' }
])
// 预算类别名称映射
const budgetCategoryNames = {
  operations: '运营成本',
  development: '研发投入',
  personnel: '人员开支'
}

// 预算类别颜色映射
const budgetCategoryColors = {
  operations: '#60a5fa',
  development: '#10b981',
  personnel: '#f59e0b'
}

// 获取预算类别名称
const getBudgetCategoryName = (key: string) => {
  return budgetCategoryNames[key as keyof typeof budgetCategoryNames] || key
}

// 获取预算类别颜色
const getBudgetCategoryColor = (key: string) => {
  return budgetCategoryColors[key as keyof typeof budgetCategoryColors] || '#9ca3af'
}

// 研发树数据
const techTreeData = ref([
  {
    id: 1,
    label: '前翼优化',
    progress: 85,
    status: 'success',
    children: [
      {
        id: 2,
        label: '端板设计',
        progress: 30,
        status: 'warning'
      }
    ]
  }
])

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleNodeClick = (data: any) => {
  selectedTech.value = {
    name: data.label,
    benefit: '+0.15s/lap',
    duration: '2 周',
    cost: 2.5,
    risk: '中等',
    riskLevel: 'warning',
    description: '通过改进前翼端板设计，提升前轮外侧气流质量...',
    requirements: [
      { id: 1, name: '基础空气动力学研究' }
    ],
    checkedRequirements: [1]
  }
}

const canStartDevelopment = computed(() => {
  if (!selectedTech.value) return false
  return selectedTech.value.checkedRequirements.length === 
         selectedTech.value.requirements.length
})

const startDevelopment = () => {
  // 开始研发逻辑
}

const initCharts = () => {
  // 预算图表初始化
  const budgetChart = echarts.init(budgetChartRef.value)
  budgetChart.setOption({
    // ...图表配置
  })

  // 进度图表初始化
  if (progressChartRef.value) {
    const progressChart = echarts.init(progressChartRef.value)
    progressChart.setOption({
      // ...图表配置
    })
  }
}

const selectedCategory = ref('aero')
const selectedTech = ref<{
  name: string;
  benefit: string;
  duration: string;
  cost: number;
  risk: string;
  riskLevel: string;
  description: string;
  requirements: Array<{ id: number; name: string }>;
  checkedRequirements: number[];
} | null>(null)

const progressChartRef = ref<HTMLElement | null>(null)
const budgetChartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  initCharts()
})
</script>

<style lang="scss" scoped>
.team-development {
  padding: 32px;
  background: #fafafa;
  min-height: 100vh;

  .stats-section {
    margin-bottom: 32px;

    .stat-card {
      background: #fff;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .title {
          color: #6b7280;
          font-size: 14px;
        }

        .el-icon {
          font-size: 16px;
          
          &.up {
            color: #10b981;
          }
          
          &.down {
            color: #ef4444;
          }
        }
      }

      .stat-value {
        font-size: 28px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
      }

      .stat-trend {
        font-size: 13px;
        color: #ef4444;

        &.positive {
          color: #10b981;
        }
      }
    }
  }

  .main-content {
    .development-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;

        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        :deep(.el-segmented) {
          --el-border-radius-base: 6px;
          
          .el-segmented-option {
            padding: 6px 16px;
            font-size: 14px;
            
            &.is-active {
              font-weight: 500;
            }
          }
        }
      }

      .tech-node {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;

        .el-progress {
          width: 100px;
        }
      }

      .tech-details {
        padding: 0 24px;

        .tech-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;

          h4 {
            margin: 0;
            font-size: 18px;
            color: #111827;
          }
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
      }
    }

    .budget-card {
      .budget-breakdown {
        margin-top: 24px;

        .budget-item {
          margin-bottom: 16px;

          .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            
            .name {
              color: #6b7280;
              font-size: 14px;
            }
            
            .value {
              font-weight: 500;
              color: #111827;
            }
          }
        }
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }
  }
}
</style>
