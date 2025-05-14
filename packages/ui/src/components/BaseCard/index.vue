<template>
  <el-card
    class="base-card"
    :header="title"
    :shadow="shadow"
    :body-style="bodyStyle"
    v-bind="$attrs"
  >
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    
    <slot></slot>
    
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </el-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  shadow?: 'always' | 'hover' | 'never'
  bodyStyle?: Record<string, any>
}

withDefaults(defineProps<Props>(), {
  title: '',
  shadow: 'hover',
  bodyStyle: () => ({ padding: '20px' })
})
</script>

<style scoped lang="scss">
.base-card {
  margin-bottom: 20px;
  
  :deep(.el-card__header) {
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  
  :deep(.el-card__body) {
    padding: 20px;
  }
}
</style> 