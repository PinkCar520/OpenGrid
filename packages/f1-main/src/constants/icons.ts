import {
  Flag,
  Timer,
  Trophy,
  Tools,
  DataLine,
  Setting,
  Monitor,
  User,
  Calendar,
  Medal,
  Odometer,
  TrendCharts,
  House,
  Histogram,
  Lock,
  Key,
} from '@element-plus/icons-vue'

export const MenuIcons = {
  // 仪表盘
  dashboard: House,
  
  // 赛事管理
  race: Flag,
  calendar: Calendar,
  results: Medal,
  standings: Trophy,
  
  // 车队管理
  team: Tools,
  garage: Monitor,
  development: TrendCharts,
  personnel: User,
  
  // 赛车性能
  car: Odometer,
  telemetry: DataLine,
  setup: Setting,
  analysis: Histogram,
  
  // 车手中心
  driver: User,
  profile: User,
  performance: TrendCharts,
  training: Timer,

  // 系统中心
  system: Setting,
  users: User,
  roles: Lock,
  permissions: Key,
} as const

export type MenuIconKey = keyof typeof MenuIcons
