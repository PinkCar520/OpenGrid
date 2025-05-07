<template>
  <div class="roles-container">
    <h2>{{ t('route.menu.system.roles') }}</h2>
    <!-- 搜索和操作栏 -->
    <div class="header-actions">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>{{ t('roles.addRole') }}
      </el-button>
      <el-input
        v-model="searchQuery"
        :placeholder="t('roles.searchPlaceholder')"
        style="width: 200px"
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 角色列表 -->
    <el-table :data="filteredRoles" border stripe>
      <el-table-column :label="t('roles.name')" prop="name" />
      <el-table-column :label="t('roles.code')" prop="code" />
      <el-table-column :label="t('roles.description')" prop="description" />
      <el-table-column :label="t('roles.status')" width="100">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="t('roles.actions')" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" link @click="handleEdit(row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="success" link @click="handlePermissions(row)">
              <el-icon><Setting /></el-icon>
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? t('roles.editRole') : t('roles.addRole')"
      width="500px"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item :label="t('roles.name')" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item :label="t('roles.code')" prop="code">
          <el-input v-model="formData.code" :disabled="isEdit" />
        </el-form-item>
        <el-form-item :label="t('roles.description')" prop="description">
          <el-input v-model="formData.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>

    <!-- 权限分配对话框 -->
    <el-dialog
      v-model="permissionDialogVisible"
      :title="t('roles.assignPermissions')"
      width="600px"
    >
      <el-tree
        ref="permissionTree"
        :data="permissionData"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedPermissions"
        :props="{ label: 'name' }"
      />
      <template #footer>
        <el-button @click="permissionDialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handlePermissionSubmit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const { t } = useI18n()

// 角色列表数据
const roles = ref([
  {
    id: '1',
    name: '系统管理员',
    code: 'ADMIN',
    description: '系统最高权限管理员',
    status: 1
  }
])

// 权限树数据
const permissionData = ref([
  {
    id: '1',
    name: '系统管理',
    children: [
      {
        id: '1-1',
        name: '用户管理'
      },
      {
        id: '1-2',
        name: '角色管理'
      }
    ]
  }
])

// 搜索功能
const searchQuery = ref('')
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roles.value
  const query = searchQuery.value.toLowerCase()
  return roles.value.filter(role => 
    role.name.toLowerCase().includes(query) ||
    role.code.toLowerCase().includes(query)
  )
})

// 表单相关
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const formData = ref({
  name: '',
  code: '',
  description: ''
})

const rules = {
  name: [{ required: true, message: t('roles.nameRequired'), trigger: 'blur' }],
  code: [{ required: true, message: t('roles.codeRequired'), trigger: 'blur' }]
}

// 权限分配相关
const permissionDialogVisible = ref(false)
const selectedPermissions = ref<string[]>([])
const currentRoleId = ref('')

// 处理角色操作
const handleAdd = () => {
  isEdit.value = false
  formData.value = { name: '', code: '', description: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    t('roles.deleteConfirm'),
    t('common.warning'),
    { type: 'warning' }
  ).then(() => {
    // TODO: 调用删除API
    ElMessage.success(t('roles.deleteSuccess'))
  })
}

const handleStatusChange = (row: any) => {
  // TODO: 调用状态更新API
  ElMessage.success(t('roles.statusUpdateSuccess'))
}

const handlePermissions = (row: any) => {
  currentRoleId.value = row.id
  selectedPermissions.value = ['1-1'] // 示例：已分配的权限ID
  permissionDialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用保存API
      ElMessage.success(t('roles.saveSuccess'))
      dialogVisible.value = false
    }
  })
}

const handlePermissionSubmit = () => {
  // TODO: 调用权限分配API
  ElMessage.success(t('roles.permissionUpdateSuccess'))
  permissionDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.roles-container {
  padding: 20px;

  .header-actions {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    margin-left: auto;
  }
}
</style>
