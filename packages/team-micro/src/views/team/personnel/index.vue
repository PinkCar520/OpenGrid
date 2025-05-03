<template>
  <div class="team-personnel">
    <el-row :gutter="24">
      <!-- 人员列表 -->
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <h3>团队成员</h3>
                <span class="member-count">共 {{ members.length }} 人</span>
              </div>
              <div class="header-right">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索成员..."
                  prefix-icon="Search"
                  clearable
                  class="search-input"
                />
                <el-button type="primary" @click="addMember">
                  <el-icon><Plus /></el-icon>添加成员
                </el-button>
              </div>
            </div>
          </template>

          <el-table :data="filteredMembers" style="width: 100%">
            <el-table-column label="成员" min-width="200">
              <template #default="{ row }">
                <div class="member-info">
                  <el-avatar :src="row.avatar" :size="40" />
                  <div class="info-text">
                    <div class="name">{{ row.name }}</div>
                    <div class="role">{{ row.role }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="部门" prop="department" width="120" />
            <el-table-column label="工作效率" width="200">
              <template #default="{ row }">
                <el-progress 
                  :percentage="row.efficiency"
                  :status="getEfficiencyStatus(row.efficiency)"
                />
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                  {{ row.status === 'active' ? '在岗' : '休假' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-button-group>
                  <el-button link type="primary" @click="editMember(row)">编辑</el-button>
                  <el-button link type="primary" @click="assignTask(row)">分配任务</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 部门概览 -->
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>部门概览</span>
            </div>
          </template>
          
          <div ref="departmentChartRef" class="department-chart"></div>

          <div class="department-stats">
            <div v-for="dept in departments" :key="dept.name" class="dept-item">
              <div class="dept-info">
                <span class="name">{{ dept.name }}</span>
                <span class="count">{{ dept.count }} 人</span>
              </div>
              <div class="dept-metrics">
                <div class="metric">
                  <span class="label">平均效率</span>
                  <span class="value">{{ dept.avgEfficiency }}%</span>
                </div>
                <div class="metric">
                  <span class="label">在岗率</span>
                  <span class="value">{{ dept.activeRate }}%</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const searchQuery = ref('')
const departmentChartRef = ref()

const members = ref([
  {
    id: 1,
    name: 'John Smith',
    role: '首席工程师',
    department: '技术部',
    efficiency: 92,
    status: 'active',
    avatar: '/avatars/john.jpg'
  }
  // ...更多成员
])

const departments = ref([
  {
    name: '技术部',
    count: 25,
    avgEfficiency: 88,
    activeRate: 95
  }
  // ...更多部门
])

const filteredMembers = computed(() => {
  return members.value.filter(member => 
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getEfficiencyStatus = (efficiency: number) => {
  if (efficiency >= 90) return 'success'
  if (efficiency >= 70) return 'warning'
  return 'exception'
}

onMounted(() => {
  initDepartmentChart()
})

const initDepartmentChart = () => {
  const chart = echarts.init(departmentChartRef.value)
  chart.setOption({
    // ...图表配置
  })
}

const addMember = () => {
  // 添加成员逻辑
}

const editMember = (member: any) => {
  // 编辑成员逻辑
}

const assignTask = (member: any) => {
  // 分配任务逻辑
}
</script>

<style lang="scss" scoped>
.team-personnel {
  padding: 32px;
  background: #fafafa;
  min-height: 100vh;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;

      h3 {
        margin: 0;
        font-size: 18px;
        color: #111827;
      }

      .member-count {
        color: #6b7280;
        font-size: 14px;
      }
    }

    .header-right {
      display: flex;
      gap: 12px;

      .search-input {
        width: 220px;
      }
    }
  }

  .member-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .info-text {
      .name {
        font-weight: 500;
        color: #111827;
      }

      .role {
        font-size: 13px;
        color: #6b7280;
      }
    }
  }

  .department-chart {
    height: 300px;
    margin-bottom: 24px;
  }

  .department-stats {
    .dept-item {
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;

      &:last-child {
        border-bottom: none;
      }

      .dept-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .name {
          font-weight: 500;
          color: #111827;
        }

        .count {
          color: #6b7280;
        }
      }

      .dept-metrics {
        display: flex;
        gap: 24px;

        .metric {
          .label {
            font-size: 13px;
            color: #6b7280;
          }

          .value {
            display: block;
            font-size: 16px;
            font-weight: 500;
            color: #111827;
          }
        }
      }
    }
  }
}
</style>
