<template>
  <div class="f1-card" :class="[`f1-card--${type}`, { 'is-hoverable': hoverable }]">
    <div v-if="$slots.header || title" class="f1-card__header">
      <slot name="header">{{ title }}</slot>
    </div>
    <div class="f1-card__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="f1-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  type: {
    type: String,
    default: 'default'
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.f1-card {
  background: #fff;
  border-radius: var(--f1-border-radius);
  box-shadow: var(--f1-box-shadow);
  overflow: hidden;
  
  &--primary {
    // border-top: 3px solid var(--f1-color-primary);
  }

  &--secondary {
    // border-top: 3px solid var(--f1-color-secondary);
  }

  &.is-hoverable {
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
  }

  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--f1-color-grid);
    font-family: var(--f1-font-title);
    font-weight: 500;
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    padding: 16px;
    // border-top: 1px solid var(--f1-color-grid);
  }
}

.dark-theme {
  .f1-card {
    background: var(--f1-color-secondary);
    color: #fff;
  }
}
</style>
