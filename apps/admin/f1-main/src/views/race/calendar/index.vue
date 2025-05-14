<template>
  <div class="race-calendar">
    <el-card class="calendar-card">
      <template #header>
        <div class="card-header">
          <span>2025赛季比赛日历</span>
          <el-button type="primary" @click="handleAddRace">添加比赛</el-button>
        </div>
      </template>
      
      <el-table :data="raceSchedule" style="width: 100%">
        <el-table-column prop="round" label="轮次" width="80" />
        <el-table-column prop="name" label="大奖赛" />
        <el-table-column prop="circuit" label="赛道" />
        <el-table-column prop="date" label="比赛日期" width="120" />
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
import { ref, reactive } from 'vue'

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
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .country-flag {
    width: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  .unit {
    margin-left: 8px;
    color: var(--f1-text-color-secondary);
  }
}
</style>
