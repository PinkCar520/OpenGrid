export default {
  route: {
    dashboard: '首页',
    carHome: '赛车性能监控',
    telemetry: '遥测数据监控',
    setup: '赛车设置',
    analysis: '性能分析',
    // 遥测数据相关
    telemetryData: {
      speed: '速度',
      gForce: 'G值',
      throttle: '油门',
      brake: '制动',
      gear: '档位',
      rpm: '转速',
      tires: '轮胎',
      fuel: '燃油'
    },
    // 赛车设置相关
    carSetup: {
      aero: '空气动力学',
      suspension: '悬挂系统',
      brake: '制动系统',
      transmission: '变速箱',
      cooling: '冷却系统',
      electronics: '电子系统'
    },
    // 性能分析相关
    analysis: {
      lapTime: '单圈时间',
      sectors: '分段时间',
      comparison: '对比分析',
      trends: '性能趋势'
    }
  }
}
