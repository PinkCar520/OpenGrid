<template>
  <f1-card :type="type" class="f1-standings">
    <template #header>
      <div class="standings-header">
        <h3>{{ title }}</h3>
        <el-button-group>
          <el-button 
            v-for="option in viewOptions" 
            :key="option.value"
            :type="currentView === option.value ? 'primary' : 'default'"
            @click="currentView = option.value"
          >
            {{ option.label }}
          </el-button>
        </el-button-group>
      </div>
    </template>

    <el-table :data="currentData" :max-height="400" stripe>
      <el-table-column prop="position" label="排名" width="70" />
      <el-table-column :label="nameLabel">
        <template #default="{ row }">
          <div class="standings-entry">
            <img :src="row.image" :alt="row.name" class="entry-image">
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="points" label="积分" width="80" align="right" />
      <el-table-column prop="wins" label="胜场" width="80" align="right" />
      <el-table-column 
        v-if="currentView === 'driver'"
        prop="team" 
        label="车队" 
      />
    </el-table>
  </f1-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import F1Card from '../common/F1Card.vue'

interface Driver {
  position: number
  name: string
  team: string
  points: number
  wins: number
  image: string
}

interface Constructor {
  position: number
  name: string
  points: number
  wins: number
  image: string
}

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  title: String,
  drivers: {
    type: Array as PropType<Driver[]>,
    default: () => []
  },
  constructors: {
    type: Array as PropType<Constructor[]>,
    default: () => []
  }
})

const viewOptions = [
  { label: '车手', value: 'driver' },
  { label: '车队', value: 'constructor' }
]

const currentView = ref('driver')

const currentData = computed(() => 
  currentView.value === 'driver' ? props.drivers : props.constructors
)

const nameLabel = computed(() => 
  currentView.value === 'driver' ? '车手' : '车队'
)
</script>

<style lang="scss" scoped>
.f1-standings {
  .standings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: var(--f1-color-secondary);
    }
  }

  .standings-entry {
    display: flex;
    align-items: center;
    gap: 12px;

    .entry-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  :deep(.f1-table) {
    // --f1-table-header-bg-color: var(--f1-color-grid);
    --f1-table-row-hover-bg-color: var(--f1-color-grid);
  }
}
</style>
