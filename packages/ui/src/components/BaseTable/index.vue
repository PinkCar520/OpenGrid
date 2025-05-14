<template>
  <div class="base-table">
    <div class="table-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    
    <el-table
      v-bind="$attrs"
      :data="data"
      :border="border"
      :stripe="stripe"
      :size="size"
      :height="height"
      v-loading="loading"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </el-table>
    
    <div class="table-footer" v-if="showPagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  data: any[]
  loading?: boolean
  border?: boolean
  stripe?: boolean
  size?: 'large' | 'default' | 'small'
  height?: string | number
  showPagination?: boolean
  total?: number
  pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  loading: false,
  border: true,
  stripe: true,
  size: 'default',
  height: 'auto',
  showPagination: true,
  total: 0,
  pageSizes: () => [10, 20, 50, 100]
})

const emit = defineEmits(['update:page', 'update:pageSize'])

const currentPage = ref(1)
const pageSize = ref(props.pageSizes[0])

const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
}

const handleCurrentChange = (val: number) => {
  emit('update:page', val)
}
</script>

<style scoped lang="scss">
.base-table {
  .table-header {
    margin-bottom: 16px;
  }
  
  .table-footer {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style> 