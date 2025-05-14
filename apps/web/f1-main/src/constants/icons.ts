import {
  House,
  Calendar,
  Trophy,
  Flag,
  Timer,
  DataLine,
  User,
  Setting,
  Odometer,
  Tools,
  TrendCharts,
  VideoCameraFilled,
  Van,
  Location,
  Share,
  Histogram,
  Connection,
  Document,
  Monitor,
  Key,
  Lock
} from '@element-plus/icons-vue'

export const MenuIcons = {
  // 仪表盘
  dashboard: House,
  
  // 赛事管理
  race: Flag,
  calendar: Calendar,
  results: Trophy,
  standings: DataLine,
  
  // 车队管理
  team: User,
  garage: Tools,
  development: TrendCharts,
  personnel: User,
  
  // 赛车管理
  car: Odometer,
  telemetry: Monitor,
  setup: Setting,
  analysis: Connection,
  
  // 车手管理
  driver: User,
  profile: Document,
  performance: Histogram,
  training: Timer,
  
  // 系统管理
  system: Setting,
  users: User,
  roles: Key,
  permissions: Lock,

  // 赛事运营
  operations: Monitor,
  planning: Calendar,
  broadcast: VideoCameraFilled,
  logistics: Van,
  
  // 赛道管理
  track: Location,
  conditions: Monitor,
  safety: Share,
  strategy: Share,
  
  // 数据分析
  analytics: Connection,
  charts: Histogram,
  prediction: TrendCharts,
  reports: Document
} as const

export type MenuIconKey = keyof typeof MenuIcons
