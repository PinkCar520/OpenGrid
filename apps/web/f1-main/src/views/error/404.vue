<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-icon">
        <el-icon :size="100"><Warning /></el-icon>
      </div>
      <h1 class="error-title">{{ t('error.pageNotFound') }}</h1>
      <p class="error-desc">{{ t('error.pageNotFoundDesc') }}</p>
      <div class="error-actions">
        <el-button type="primary" @click="$router.push('/')" class="home-btn">
          {{ t('error.backHome') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Warning } from '@element-plus/icons-vue'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .error-content {
    text-align: center;
    
    .error-icon {
      margin-bottom: 24px;
      .f1-icon {
        color: var(--f1-color-warning);
      }
    }

    .error-title {
      font-size: 48px;
      font-weight: 700;
      margin: 0 0 16px;
      color: var(--f1-text-color-primary);
    }

    .error-desc {
      font-size: 16px;
      line-height: 1.6;
      color: var(--f1-text-color-secondary);
      margin: 0 0 32px;
    }

    .error-actions {
      display: flex;
      gap: 16px;
      justify-content: center;

      .f1-button {
        padding: 20px;
        min-width: 120px;
        border-radius: 10px;
        
        &.home-btn {
          background: linear-gradient(to right, var(--f1-color-primary), var(--f1-color-primary-light-3));
          border: none;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(var(--f1-color-primary-rgb), 0.4);
          }
        }
      }
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@media (max-width: 640px) {
  .error-page .error-content {
    padding: 32px 24px;
    margin: 20px;
    
    .error-code {
      font-size: 72px;
    }
    
    .error-title {
      font-size: 24px;
    }
    
    .error-actions {
      flex-direction: column;
      
      .f1-button {
        width: 100%;
      }
    }
  }
}
</style>
