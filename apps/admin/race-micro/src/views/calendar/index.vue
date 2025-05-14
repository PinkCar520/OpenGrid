<template>
  <div class="race-calendar">
    <el-card class="calendar-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3 class="title">2025赛季比赛日历</h3>
            <el-tag type="info" class="race-count">共 {{ raceSchedule.length }} 场比赛</el-tag>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchQuery"
              placeholder="搜索比赛..."
              prefix-icon="Search"
              clearable
              class="search-input"
            />
            <el-button type="primary" @click="handleAddRace">
              <el-icon><Plus /></el-icon>添加比赛
            </el-button>
          </div>
        </div>
      </template>
      
      <div class="table-filters">
        <el-select v-model="filterStatus" placeholder="比赛状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="已结束" value="finished" />
          <el-option label="即将开始" value="upcoming" />
          <el-option label="未开始" value="scheduled" />
        </el-select>
      </div>

      <el-table 
        :data="filteredRaces" 
        style="width: 100%"
        :highlight-current-row="true"
        @row-click="handleRowClick"
      >
        <el-table-column prop="round" label="轮次" width="80" />
        <el-table-column label="大奖赛" min-width="200">
          <template #default="{ row }">
            <div class="race-info">
              <div class="race-main">
                <span class="race-name">{{ row.name }}</span>
                <el-tag :type="getRaceStatusType(row)" size="small">
                  {{ getRaceStatus(row) }}
                </el-tag>
              </div>
              <div class="race-circuit">{{ row.circuit }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="赛道预览" width="120">
          <template #default="{ row }">
            <el-image 
              :src="`/circuits/${row.circuitId}.png`"
              class="circuit-preview"
              fit="cover"
              :preview-src-list="[`/circuits/${row.circuitId}-large.png`]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="比赛日期" width="180">
          <template #default="{ row }">
            <div class="date-info">
              <span class="date">{{ formatDate(row.date) }}</span>
              <span class="time">{{ row.time }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="country" label="举办国" width="120">
          <template #default="{ row }">
            <el-image 
              :src="`/flags/${row.countryCode}.png`"
              class="country-flag"
            />
            {{ row.country }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
              <el-button type="primary" link @click="handleSchedule(row)">时间表</el-button>
              <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="isEdit ? '编辑比赛' : '添加比赛'"
      width="600px"
    >
      <el-form ref="formRef" :model="raceForm" :rules="rules" label-width="100px">
        <el-form-item label="大奖赛名称" prop="name">
          <el-input v-model="raceForm.name" />
        </el-form-item>
        <el-form-item label="举办国家" prop="country">
          <el-select v-model="raceForm.countryCode" filterable>
            <el-option 
              v-for="country in countries" 
              :key="country.code"
              :label="country.name"
              :value="country.code"
            >
              <el-image :src="`/flags/${country.code}.png`" class="country-flag" />
              {{ country.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛日期" prop="date">
          <el-date-picker v-model="raceForm.date" type="date" />
        </el-form-item>
        <el-form-item label="赛道名称" prop="circuit">
          <el-input v-model="raceForm.circuit" />
        </el-form-item>
        <el-form-item label="赛道长度" prop="length">
          <el-input-number v-model="raceForm.length" :min="1" :max="10" :step="0.1" />
          <span class="unit">km</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'

interface Race {
  round: number
  name: string
  circuit: string
  date: string
  country: string
  countryCode: string
  length: number
}

const raceSchedule = ref<Race[]>([
  {
    round: 1,
    name: '巴林大奖赛',
    circuit: '萨基尔国际赛道',
    date: '2025-03-02',
    country: '巴林',
    countryCode: 'BHR',
    length: 5.412
  }
])

const dialogVisible = ref(false)
const isEdit = ref(false)
const currentRace = ref<Race | null>(null)

const raceForm = reactive({
  name: '',
  countryCode: '',
  date: '',
  circuit: '',
  length: 5.0
})

const searchQuery = ref('')
const filterStatus = ref('')

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// 获取比赛状态
const getRaceStatus = (race: Race) => {
  const now = new Date()
  const raceDate = new Date(race.date)
  const diff = raceDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  
  if (diff < 0) return '已结束'
  if (days <= 7) return '即将开始'
  return '未开始'
}

// 获取状态对应的标签类型
const getRaceStatusType = (race: Race) => {
  const status = getRaceStatus(race)
  switch (status) {
    case '已结束': return 'info'
    case '即将开始': return 'success'
    default: return 'warning'
  }
}

// 过滤后的赛程数据
const filteredRaces = computed(() => {
  return raceSchedule.value.filter(race => {
    const matchesSearch = race.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         race.circuit.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || getRaceStatus(race) === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

// 表格行点击处理
const handleRowClick = (row: Race) => {
  // 行点击展示详情等逻辑
}

const handleAddRace = () => {
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: Race) => {
  isEdit.value = true
  currentRace.value = row
  Object.assign(raceForm, row)
  dialogVisible.value = true
}

const handleSubmit = () => {
  // 表单提交逻辑
}
</script>

<style lang="scss" scoped>
.race-calendar {
  
  .calendar-card {
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;

        .title {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          // color: #1a1a1a;
        }

        .race-count {
          font-weight: normal;
        }
      }

      .header-right {
        display: flex;
        gap: 12px;

        .search-input {
          width: 240px;
        }
      }
    }
  }

  .table-filters {
    margin-bottom: 16px;
  }

  :deep(.f1-table) {
    border-radius: 8px;
    overflow: hidden;

    .f1-table__row {
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f8fafc;
      }
    }
  }

  .race-info {
    .race-main {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;

      .race-name {
        font-weight: 500;
      }
    }

    .race-circuit {
      color: #666;
      font-size: 13px;
    }
  }

  .circuit-preview {
    width: 100px;
    height: 60px;
    border-radius: 4px;
    cursor: zoom-in;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .time {
      color: #666;
      font-size: 13px;
    }
  }

  .country-flag {
    width: 20px;
    height: 15px;
    margin-right: 8px;
    vertical-align: middle;
    border-radius: 2px;
    object-fit: cover;
  }

  .unit {
    margin-left: 8px;
    color: var(--f1-text-color-secondary);
  }
}
</style>
