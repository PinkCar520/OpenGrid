<template>
  <div class="permissions-container">
    <div class="header-actions">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>{{ t('permissions.addPermission') }}
      </el-button>
      <el-input
        v-model="searchQuery"
        :placeholder="t('permissions.searchPlaceholder')"
        style="width: 200px"
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <el-table
      :data="filteredPermissions"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column :label="t('permissions.name')" prop="name" />
      <el-table-column :label="t('permissions.code')" prop="code" />
      <el-table-column :label="t('permissions.type')" prop="type">
        <template #default="{ row }">
          <el-tag :type="row.type === 'menu' ? 'success' : 'info'">
            {{ t(`permissions.types.${row.type}`) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('permissions.path')" prop="path" />
      <el-table-column :label="t('permissions.actions')" width="200">
        <template #default="{ row }">
          <el-button-group>
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

    <!-- 添加/编辑权限对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? t('permissions.editPermission') : t('permissions.addPermission')"
      width="500px"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item :label="t('permissions.name')" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item :label="t('permissions.code')" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item :label="t('permissions.type')" prop="type">
          <el-select v-model="formData.type" style="width: 100%">
            <el-option label="菜单" value="menu" />
            <el-option label="按钮" value="button" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('permissions.path')" prop="path">
          <el-input v-model="formData.path" />
        </el-form-item>
        <el-form-item :label="t('permissions.parent')" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            :data="permissionsTree"
            :props="{ label: 'name', value: 'id' }"
            check-strictly
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const { t } = useI18n()

// 权限数据
const permissions = ref([
  {
    id: '1',
    name: '系统管理',
    code: 'system',
    type: 'menu',
    path: '/system',
    children: [
      {
        id: '1-1',
        name: '用户管理',
        code: 'system:user',
        type: 'menu',
        path: '/system/users'
      },
      {
        id: '1-2',
        name: '角色管理',
        code: 'system:role',
        type: 'menu',
        path: '/system/roles'
      }
    ]
  }
])

// 搜索功能
const searchQuery = ref('')
const filteredPermissions = computed(() => {
  if (!searchQuery.value) return permissions.value
  const query = searchQuery.value.toLowerCase()
  return permissions.value.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.code.toLowerCase().includes(query)
  )
})

// 表单相关
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const formData = ref({
  name: '',
  code: '',
  type: 'menu',
  path: '',
  parentId: ''
})

const rules = {
  name: [{ required: true, message: t('permissions.nameRequired'), trigger: 'blur' }],
  code: [{ required: true, message: t('permissions.codeRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('permissions.typeRequired'), trigger: 'blur' }]
}

// 处理添加权限
const handleAdd = () => {
  isEdit.value = false
  formData.value = {
    name: '',
    code: '',
    type: 'menu',
    path: '',
    parentId: ''
  }
  dialogVisible.value = true
}

// 处理编辑权限
const handleEdit = (row: any) => {
  isEdit.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

// 处理删除权限
const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    t('permissions.deleteConfirm'),
    t('common.warning'),
    {
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用删除API
    ElMessage.success(t('permissions.deleteSuccess'))
  })
}

// 处理表单提交
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // TODO: 调用保存API
      ElMessage.success(t('permissions.saveSuccess'))
      dialogVisible.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.permissions-container {
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
