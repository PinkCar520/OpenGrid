<template>
  <div class="users-container">
    <!-- 搜索和操作栏 -->
    <div class="header-actions">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>{{ t('users.addUser') }}
      </el-button>
      <el-input
        v-model="searchQuery"
        :placeholder="t('users.searchPlaceholder')"
        style="width: 200px"
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 用户列表表格 -->
    <el-table :data="filteredUsers" border stripe>
      <el-table-column type="selection" width="55" />
      <el-table-column :label="t('users.username')" prop="username" />
      <el-table-column :label="t('users.realName')" prop="realName" />
      <el-table-column :label="t('users.email')" prop="email" />
      <el-table-column :label="t('users.phone')" prop="phone" />
      <el-table-column :label="t('users.status')" width="100">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="t('users.roles')" width="200">
        <template #default="{ row }">
          <el-tag v-for="role in row.roles" :key="role" size="small" class="role-tag">
            {{ role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('users.actions')" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" link @click="handleEdit(row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="success" link @click="handleAssignRoles(row)">
              <el-icon><UserFilled /></el-icon>
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

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? t('users.editUser') : t('users.addUser')"
      width="500px"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item :label="t('users.username')" prop="username">
          <el-input v-model="formData.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item :label="t('users.realName')" prop="realName">
          <el-input v-model="formData.realName" />
        </el-form-item>
        <el-form-item :label="t('users.email')" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item :label="t('users.phone')" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item :label="t('users.password')" prop="password" v-if="!isEdit">
          <el-input v-model="formData.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>

    <!-- 角色分配对话框 -->
    <el-dialog
      v-model="roleDialogVisible"
      :title="t('users.assignRoles')"
      width="400px"
    >
      <el-checkbox-group v-model="selectedRoles">
        <el-checkbox
          v-for="role in availableRoles"
          :key="role.value"
          :label="role.value"
        >
          {{ role.label }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button @click="roleDialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleRoleSubmit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, Search, Edit, Delete, UserFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const { t } = useI18n()

// 表格数据
const users = ref([
  {
    id: '1',
    username: 'admin',
    realName: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    status: 1,
    roles: ['管理员']
  }
])

// 搜索和分页
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.username.toLowerCase().includes(query) ||
    user.realName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

// 表单相关
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const formData = ref({
  username: '',
  realName: '',
  email: '',
  phone: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: t('users.usernameRequired'), trigger: 'blur' }],
  realName: [{ required: true, message: t('users.realNameRequired'), trigger: 'blur' }],
  email: [
    { required: true, message: t('users.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('users.emailInvalid'), trigger: 'blur' }
  ],
  password: [{ required: true, message: t('users.passwordRequired'), trigger: 'blur' }]
}

// 角色分配相关
const roleDialogVisible = ref(false)
const selectedRoles = ref([])
const availableRoles = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' }
]
const currentUserId = ref('')

// 处理分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  // TODO: 重新加载数据
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // TODO: 重新加载数据
}

// 处理用户操作
const handleAdd = () => {
  isEdit.value = false
  formData.value = {
    username: '',
    realName: '',
    email: '',
    phone: '',
    password: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    t('users.deleteConfirm'),
    t('common.warning'),
    { type: 'warning' }
  ).then(() => {
    // TODO: 调用删除API
    ElMessage.success(t('users.deleteSuccess'))
  })
}

const handleStatusChange = (row: any) => {
  // TODO: 调用状态更新API
  ElMessage.success(t('users.statusUpdateSuccess'))
}

const handleAssignRoles = (row: any) => {
  currentUserId.value = row.id
  selectedRoles.value = row.roles
  roleDialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用保存API
      ElMessage.success(t('users.saveSuccess'))
      dialogVisible.value = false
    }
  })
}

const handleRoleSubmit = () => {
  // TODO: 调用角色分配API
  ElMessage.success(t('users.roleUpdateSuccess'))
  roleDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.users-container {
  padding: 20px;

  .header-actions {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    margin-left: auto;
  }

  .role-tag {
    margin-right: 5px;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
