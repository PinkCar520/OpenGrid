<script setup lang="ts">
import { ref, watch } from 'vue'
import { isDark, toggleDark } from '../composables'
import { Moon, Sunny, FullScreen, Bell, ArrowDown } from '@element-plus/icons-vue'
import { isReducedMotion } from '../utils'

const isDarkModel = ref("light");

const handleFullScreen = () => {
  const fullscreenElement = document.fullscreenElement
  if (!fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// Watch system theme changes
watch(() => window.matchMedia('(prefers-color-scheme: dark)').matches, (isDarkMode) => {
  isDark.value = isDarkMode
})

const toggleTheme = async (event: MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  if (!document.startViewTransition || isReducedMotion()) {
    toggleDark()
    return
  }

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];
    document.documentElement.animate(
    {
      clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)',
    }
  )
  })
}
</script>

<template>
<el-container>
  <ul class="ul-menu">
    <li class="ul-menu-item">
      <div class="flex items-center justify-center gap-2">
        <div class="text-xl" i-ep-element-plus />
        <span>ZeroSphere 新能源汽车 · 智能化平台</span>
      </div>
    </li>

    <li class="ul-menu-item">
      <el-switch 
        v-model="isDarkModel" 
        size="large"
        :active-action-icon="Moon" 
        :inactive-action-icon="Sunny"
        style="--ep-switch-on-color: #2c2c2c;" 
        @click="toggleTheme"
      />
    </li>
    <li class="ul-menu-item" @click="handleFullScreen">
      <el-button type="info"  link>
        <el-icon size="20px" style="cursor: pointer;">
          <FullScreen />
        </el-icon>
      </el-button>
    </li>
    <li class="ul-menu-item">
      <el-button type="info"  link>
        <el-tooltip content="消息通知" placement="bottom">
        <el-badge :value="3" class="notice-badge">
        <el-icon size="20px" style="cursor: pointer;">
          <Bell />
        </el-icon>
        </el-badge>
      </el-tooltip>
      </el-button>
    </li>
    <li class="ul-menu-item">
      <el-dropdown>
        <el-space>
          <el-avatar size="small" src="https://placeholder.com/30x30" />
          <span>管理员</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-space>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </li>
  </ul>
</el-container>
</template>

<style lang="scss">
.ul-menu {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px var(--ep-menu-border-color);
  // var(--border-color);
  .ul-menu-item {
    padding: 0 20px;
    cursor: pointer;
  }
  .ul-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
.ep-menu-item [class^=ep-icon] {
  margin-right: 0px;
  font-size: 14px;
}
.ep-switch__core {
  cursor: pointer;
}
.ep-switch__core {
  border: 1px solid #c2c2c2;
}
.ep-switch__core:hover {
  border: 1px solid #377e22;
}
.ep-switch.is-checked .ep-switch__core {
  border: 1px solid #3c3f44;
}
.ep-switch.is-checked:hover .ep-switch__core {
  border: 1px solid #f7d366;
}
</style>