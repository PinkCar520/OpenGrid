<template>
  <div class="query-page">
    <!-- 查询表单区域 -->
    <el-card class="query-form">
      <el-form :model="queryForm" ref="formRef" :inline="true">
        <el-form-item label="借款人" prop="borrower">
          <el-input
            v-model="queryForm.borrower"
            placeholder="请输入借款人姓名"
            clearable
          />
        </el-form-item>
        
        <el-form-item label="贷后状态" prop="status">
          <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
            <el-option label="待提交材料" value="pending" />
            <el-option label="已提交待审批" value="submitted" />
            <el-option label="审批通过" value="approved" />
            <el-option label="需整改" value="rejected" />
            <el-option label="延期审批中" value="extension" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="材料提交期限" prop="dateRange">
          <el-date-picker
            v-model="queryForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <el-icon><Search /></el-icon>查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card class="table-container">
      <template #header>
        <div class="card-header">
          <span>查询结果</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>新增
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="借款编号" width="120" />
        <el-table-column prop="borrower" label="借款人" width="100" />
        <el-table-column prop="amount" label="借款金额" width="120">
          <template #default="{ row }">
            {{ formatMoney(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="nextSubmitDate" label="下次提交日期" width="120" />
        <el-table-column prop="status" label="贷后状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastSubmitDate" label="最近提交日期" width="120" />
        <el-table-column prop="approvalDate" label="审批日期" width="120" />
        <el-table-column prop="overdueDays" label="逾期天数" width="100">
          <template #default="{ row }">
            <span :class="{ 'text-red': row.overdueDays > 0 }">
              {{ row.overdueDays || 0 }}天
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" link @click="handleViewMaterials(row)">
                <el-icon><Document /></el-icon>
                查看材料
              </el-button>
              <el-button type="primary" link @click="handleEdit(row)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button type="danger" link @click="handleDelete(row)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>

  <!-- 材料预览弹窗 -->
  <el-dialog v-model="materialsDialogVisible" title="贷后检查材料" width="900px">
    <div class="materials-container">
      <div class="materials-tabs">
        <!-- 检查材料 -->
        <div class="materials-section">
          <h3 class="section-title">检查材料</h3>
          <el-table :data="postLoanMaterials" border>
            <el-table-column prop="name" label="材料名称" />
            <el-table-column prop="required" label="是否必须" width="100">
              <template #default="{ row }">
                <el-tag :type="row.required ? 'danger' : 'info'">
                  {{ row.required ? '必须' : '可选' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getFileStatusType(row.status)">
                  {{ getFileStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="uploadTime" label="上传时间" width="180" />
            <el-table-column label="操作" width="100" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handlePreview(row)">
                  预览
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 审批操作 -->
        <div class="approval-section" v-if="currentRow?.status === 'submitted'">
          <h3 class="section-title">审批操作</h3>
          <el-form :model="approvalForm" ref="approvalFormRef" :rules="approvalRules" label-width="100px">
            <el-form-item label="审批结果" prop="result">
              <el-select v-model="approvalForm.result" placeholder="请选择审批结果" style="width: 100%">
                <el-option
                  v-for="item in approvalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="处理意见" prop="opinion">
              <el-select 
                v-model="approvalForm.opinion" 
                placeholder="请选择处理意见"
                style="width: 100%"
                :disabled="!approvalForm.result"
              >
                <el-option
                  v-for="item in getOpinionOptions(approvalForm.result)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item v-if="approvalForm.result === 'extension'" label="延期至" prop="extensionDate">
              <el-date-picker
                v-model="approvalForm.extensionDate"
                type="date"
                placeholder="选择延期日期"
                :min-date="new Date()"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleApprovalSubmit" :loading="approvalLoading">
                提交审批
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Search, Refresh, Plus, Edit, Delete, Document } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const loading = ref(false)

// 查询表单数据
const queryForm = reactive({
  borrower: '',
  status: '',
  dateRange: []
})

// 表格数据
const tableData = ref([
  {
    id: 'JK202402001',
    borrower: '张三',
    amount: 1000000,
    nextSubmitDate: '2024-03-20',
    status: 'pending',
    lastSubmitDate: '-',
    approvalDate: '-',
    overdueDays: 0
  },
  {
    id: 'JK202402002',
    borrower: '李四',
    amount: 2000000,
    nextSubmitDate: '2024-02-15',
    status: 'submitted',
    lastSubmitDate: '2024-02-14',
    approvalDate: '-',
    overdueDays: 0
  },
  {
    id: 'JK202402003',
    borrower: '王五',
    amount: 1500000,
    nextSubmitDate: '2024-02-10',
    status: 'rejected',
    lastSubmitDate: '2024-02-12',
    approvalDate: '2024-02-13',
    overdueDays: 2
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 查询方法
const handleQuery = () => {
  loading.value = true
  // TODO: 实现查询逻辑
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 重置查询
const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  handleQuery()
}

// 分页方法
const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleQuery()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleQuery()
}

// 表格操作方法
const handleAdd = () => {
  // TODO: 实现新增逻辑
}

const handleEdit = (row: any) => {
  // TODO: 实现编辑逻辑
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    '确定要删除这条数据吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // TODO: 实现删除逻辑
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {})
}

// 材料预览相关
const materialsDialogVisible = ref(false)
const activeTab = ref('basic')
const currentRow = ref<any>(null)

const handleViewMaterials = (row: any) => {
  currentRow.value = row
  materialsDialogVisible.value = true
}

const handlePreview = (file: any) => {
  // TODO: 实现文件预览逻辑
  console.log('预览文件:', file.name)
}

// 贷后材料列表
const postLoanMaterials = ref([
  {
    name: '企业经营场所照片',
    required: true,
    status: 'approved',
    uploadTime: '2024-02-14 10:00:00'
  },
  {
    name: '企业财务报表',
    required: true,
    status: 'rejected',
    uploadTime: '2024-02-14 10:30:00'
  },
  {
    name: '库存材料清单',
    required: false,
    status: 'missing',
    uploadTime: '-'
  }
])

// 工具方法
const formatMoney = (amount: number) => {
  return amount ? `¥${amount.toLocaleString()}` : '-'
}

const getStatusType = (status: string | undefined) => {
  const types: Record<string, 'success' | 'warning' | 'info' | 'primary' | 'danger'> = {
    pending: 'info',
    submitted: 'warning',
    approved: 'success',
    rejected: 'danger',
    extension: 'warning'
  }
  return types[status || ''] || 'info'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: '待提交材料',
    submitted: '待审批',
    approved: '审批通过',
    rejected: '需整改',
    extension: '延期审批中'
  }
  return texts[status] || status
}

const getFileStatusType = (status: string) => {
  const types: Record<string, string> = {
    approved: 'success',
    rejected: 'danger',
    missing: 'info'
  }
  return types[status] || 'info'
}

const getFileStatusText = (status: string) => {
  const texts: Record<string, string> = {
    approved: '已通过',
    rejected: '已驳回',
    missing: '未提交'
  }
  return texts[status] || status
}

// 文件处理方法
const handleUpload = (file: any) => {
  // TODO: 实现文件上传逻辑
}

// 审批表单相关
const approvalFormRef = ref<FormInstance>()
const approvalLoading = ref(false)
const approvalForm = reactive({
  result: '',
  opinion: '',
  extensionDate: ''
})

const approvalRules = {
  result: [{ required: true, message: '请选择审批结果', trigger: 'change' }],
  opinion: [{ required: true, message: '请选择处理意见', trigger: 'change' }],
  extensionDate: [{ 
    required: true, 
    message: '请选择延期日期', 
    trigger: 'change',
    validator: (rule: any, value: string) => {
      if (approvalForm.result === 'extension' && !value) {
        return new Error('延期时必须选择日期')
      }
      return true
    }
  }]
}

const getOpinionPlaceholder = (result: string) => {
  const placeholders: Record<string, string> = {
    approved: '请输入通过意见...',
    rejected: '请输入驳回原因...',
    extension: '请说明延期原因...'
  }
  return placeholders[result] || '请输入处理意见...'
}

const handleApprovalSubmit = async () => {
  if (!approvalFormRef.value) return
  
  try {
    await approvalFormRef.value.validate()
    approvalLoading.value = true
    
    // TODO: 调用审批接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新状态
    if (currentRow.value) {
      currentRow.value.status = approvalForm.result
      currentRow.value.approvalDate = new Date().toLocaleDateString()
    }
    
    ElMessage.success('审批提交成功')
    materialsDialogVisible.value = false // 关闭弹窗
    
    // 重置表单
    approvalForm.result = ''
    approvalForm.opinion = ''
    approvalForm.extensionDate = ''
    
  } catch (error) {
    console.error('审批提交失败:', error)
  } finally {
    approvalLoading.value = false
  }
}

// 在 script setup 部分添加字典配置
const approvalOptions = [
  { label: '通过', value: 'approved' },
  { label: '驳回', value: 'rejected' },
  { label: '延期', value: 'extension' }
]

const opinionDict = {
  approved: [
    { label: '材料完整，审核通过', value: '材料完整，审核通过' },
    { label: '经营正常，准予通过', value: '经营正常，准予通过' }
  ],
  rejected: [
    { label: '财务报表数据异常，请重新提供', value: '财务报表数据异常，请重新提供' },
    { label: '缺少必要材料，请补充提供', value: '缺少必要材料，请补充提供' },
    { label: '经营场所照片不清晰，需重新拍摄', value: '经营场所照片不清晰，需重新拍摄' }
  ],
  extension: [
    { label: '因疫情影响，同意延期', value: '因疫情影响，同意延期' },
    { label: '材料准备中，同意延期', value: '材料准备中，同意延期' }
  ]
}

const getOpinionOptions = (result: string) => {
  return opinionDict[result as keyof typeof opinionDict] || []
}

// Watch审批结果变化，清空处理意见
watch(() => approvalForm.result, () => {
  approvalForm.opinion = ''
})
</script>

<style lang="scss" scoped>
.query-page {
  padding: 20px;
  
  .query-form {
    margin-bottom: 20px;
  }

  .table-container {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}

.materials-container {
  padding: 20px;

  .materials-tabs {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .section-title {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  .materials-section {
    flex: 1;
  }

  .approval-section {
    padding-top: 16px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 20px;
}

.text-red {
  color: #f56c6c;
}

.approval-record {
  h4 {
    margin: 0 0 8px;
    font-size: 16px;
  }

  .approval-opinion {
    margin: 8px 0;
    color: #666;
  }

  .approval-info {
    margin: 8px 0 0;
    font-size: 13px;
    color: #999;

    span {
      margin-right: 20px;
    }
  }
}

.mt-4 {
  margin-top: 16px;
}
</style>
