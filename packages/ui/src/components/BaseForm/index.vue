<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    :rules="rules"
    :label-width="labelWidth"
    :size="size"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
    
    <el-form-item v-if="showSubmit">
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        {{ submitText }}
      </el-button>
      <el-button @click="handleReset">{{ resetText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface Props {
  modelValue: Record<string, any>
  rules?: FormRules
  labelWidth?: string | number
  size?: 'large' | 'default' | 'small'
  showSubmit?: boolean
  submitText?: string
  resetText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  rules: () => ({}),
  labelWidth: '120px',
  size: 'default',
  showSubmit: true,
  submitText: '提交',
  resetText: '重置',
  loading: false
})

const emit = defineEmits(['update:modelValue', 'submit', 'reset'])

const formRef = ref<FormInstance>()

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    emit('submit', props.modelValue)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  emit('reset')
}
</script> 