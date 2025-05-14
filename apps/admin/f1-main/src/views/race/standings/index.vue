<template>
  <div class="standings">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="standings-card">
          <template #header>
            <div class="card-header">
              <span>车手积分榜</span>
              <el-radio-group v-model="driverStandingsType" size="small">
                <el-radio-button label="total">总积分</el-radio-button>
                <el-radio-button label="sprint">短程赛</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          
          <el-table :data="driverStandings" :max-height="600">
            <el-table-column prop="position" label="排名" width="80" />
            <el-table-column label="车手">
              <template #default="{ row }">
                <div class="driver-info">
                  <el-avatar :src="row.photo" :size="32" />
                  <div class="info-text">
                    <div class="name">{{ row.name }}</div>
                    <div class="team">{{ row.team }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="points" label="积分" align="right" width="100">
              <template #default="{ row }">
                <span class="points">{{ row.points }}</span>
                <span v-if="row.delta" class="delta" :class="{'positive': row.delta > 0}">
                  {{ row.delta > 0 ? '+' : '' }}{{ row.delta }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="standings-card">
          <template #header>
            <div class="card-header">
              <span>车队积分榜</span>
            </div>
          </template>
          
          <el-table :data="constructorStandings" :max-height="600">
            <el-table-column prop="position" label="排名" width="80" />
            <el-table-column label="车队">
              <template #default="{ row }">
                <div class="team-info">
                  <el-image :src="row.logo" class="team-logo" />
                  <span>{{ row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="points" label="积分" align="right" width="100">
              <template #default="{ row }">
                <span class="points">{{ row.points }}</span>
                <span v-if="row.delta" class="delta" :class="{'positive': row.delta > 0}">
                  {{ row.delta > 0 ? '+' : '' }}{{ row.delta }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const driverStandingsType = ref('total')

const driverStandings = ref([
  {
    position: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 575,
    delta: null,
    photo: '/drivers/verstappen.png'
  }
])

const constructorStandings = ref([
  {
    position: 1,
    name: 'Red Bull Racing',
    points: 860,
    delta: null,
    logo: '/teams/red-bull.png'
  }
])
</script>

<style lang="scss" scoped>
.standings {
  padding: 20px;
  
  .standings-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .driver-info, .team-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .info-text {
      .name {
        font-weight: 500;
      }
      .team {
        font-size: 12px;
        color: var(--f1-text-color-secondary);
      }
    }
  }
  
  .team-logo {
    width: 32px;
    height: 32px;
  }
  
  .points {
    font-weight: 500;
  }
  
  .delta {
    margin-left: 4px;
    font-size: 12px;
    color: var(--f1-color-danger);
    
    &.positive {
      color: var(--f1-color-success);
    }
  }
}
</style>
