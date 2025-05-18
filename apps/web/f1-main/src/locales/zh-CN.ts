export default {
  message: {
    microApp: {
      loadError: '微应用加载失败',
      containerDisconnect: '微应用容器断开连接'
    },
    tabs: {
      close: '关闭',
      closeOthers: '关闭其他',
      closeAll: '关闭所有',
      refresh: '刷新'
    }
  },
  route: {
    menu: {
      dashboard: '赛季总览',
      raceMicro: {
        title: '赛事管理',
        calendar: '赛历管理',
        results: '比赛结果',
        standings: '积分排名'
      },
      teamMicro: {
        title: '车队管理',
        garage: '维修车间',
        development: '研发中心',
        personnel: '人员管理'
      },
      carMicro: {
        title: '赛车性能',
        telemetry: '遥测数据',
        setup: '赛车设置',
        analysis: '性能分析'
      },
      driverMicro: {
        title: '车手中心',
        profile: '车手档案',
        performance: '表现分析',
        training: '训练数据'
      },
      operationsMicro: {
        title: '赛事运营',
        planning: '赛事计划',
        broadcast: '转播管理',
        logistics: '物流管理'
      },
      trackMicro: {
        title: '赛道管理',
        conditions: '赛道状况',
        safety: '安全管理',
        strategy: '比赛策略'
      },
      analyticsMicro: {
        title: '数据分析',
        charts: '数据图表',
        prediction: '预测分析',
        reports: '报告中心'
      },
      system: {
        title: '系统管理',
        users: '用户管理',
        roles: '角色管理',
        permissions: '权限管理',
      }
    },
    // 纯电动车应用
    raceHome: '纯电动监控',
    batteryHealth: '电池健康',
    supercharger: '充电站',

    // 燃料电池应用
    teamHome: '燃料电池监控',
    fuelCell: '电池系统',
    hydrogen: '加氢站',

    // 混动应用
    hevHome: '混动系统监控',
    engineStatus: '发动机状态',
    batteryStatus: '电池状态',

    // 插混应用
    hpvHome: '插混系统监控',
    powerSystem: '动力系统',
    charging: '充电系统',

    race: {
      title: '赛事管理',
      calendar: '赛历管理',
      results: '比赛结果',
      standings: '积分排名'
    },
    team: {
      title: '车队管理',
      garage: '维修车间',
      development: '研发中心',
      personnel: '人员管理'
    },
    car: {
      title: '赛车性能',
      telemetry: '遥测数据',
      setup: '赛车设置',
      analysis: '性能分析'
    },
    driver: {
      title: '车手中心',
      profile: '车手档案',
      performance: '表现分析',
      training: '训练数据'
    }
  },
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    loading: '加载中...',
    success: '操作成功',
    error: '操作失败',
    tips: '提示',
    locale: 'zh-CN'
  },
  dashboard: {
    title: '赛季总览',
    weather: {
      title: '赛道天气',
      sunny: '晴朗',
      cloudy: '多云',
      thunderstorm: '雷阵雨'
    },
    standings: {
      title: '2025赛季积分榜'
    },
    schedule: {
      title: '比赛日程',
      practice1: '第一次练习赛',
      practice2: '第二次练习赛',
      practice3: '第三次练习赛',
      qualifying: '排位赛',
      sprint: '冲刺赛',
      race: '正赛'
    },
    stats: {
      completedRaces: '已完成比赛',
      leadingDriver: '领先车手',
      leadingTeam: '领先车队',
      nextRace: '下一站',
      monacoGP: '摩纳哥大奖赛',
      monteCarlo: '蒙特卡洛街道赛道'
    },
    totalVehicles: '总车辆数',
    currentAlarms: '当前报警',
    onlineRate: '在线率',
    runningStatus: '运行状态',
    normal: '正常',
    vehicleTypes: '车辆类型',
    vehicleDistribution: '车辆类型分布',
    alarmTrend: '近期报警趋势',
    alarmCount: '报警数量',
    race: '纯电动',
    teamv: '燃料电池',
    hev: '混合动力',
    phev: '插电混动'
  },
  header: {
    title: 'OPEN GRID 赛事 · 智能化平台',
    notifications: '消息通知',
    profile: '个人信息',
    changePassword: '修改密码',
    logout: '退出登录',
    logoutConfirm: '确定要退出登录吗？',
    logoutSuccess: '已退出登录',
    admin: '管理员',
    zhCN: '简体中文',
    enUS: 'English'
  },
  permissions: {
    addPermission: '添加权限',
    editPermission: '编辑权限',
    deleteConfirm: '确定要删除该权限吗？',
    deleteSuccess: '删除成功',
    saveSuccess: '保存成功',
    searchPlaceholder: '搜索权限名称或编码',
    name: '权限名称',
    code: '权限编码',
    type: '权限类型',
    path: '路径',
    parent: '上级权限',
    actions: '操作',
    nameRequired: '请输入权限名称',
    codeRequired: '请输入权限编码',
    typeRequired: '请选择权限类型',
    types: {
      menu: '菜单',
      button: '按钮'
    }
  },
  users: {
    addUser: '添加用户',
    editUser: '编辑用户',
    deleteConfirm: '确定要删除该用户吗？',
    deleteSuccess: '删除成功',
    saveSuccess: '保存成功',
    statusUpdateSuccess: '状态更新成功',
    roleUpdateSuccess: '角色更新成功',
    searchPlaceholder: '搜索用户名/姓名/邮箱',
    username: '用户名',
    realName: '真实姓名',
    email: '邮箱',
    phone: '手机号',
    password: '密码',
    status: '状态',
    roles: '角色',
    actions: '操作',
    assignRoles: '分配角色',
    usernameRequired: '请输入用户名',
    realNameRequired: '请输入真实姓名',
    emailRequired: '请输入邮箱',
    emailInvalid: '请输入正确的邮箱格式',
    passwordRequired: '请输入密码'
  },
  roles: {
    addRole: '添加角色',
    editRole: '编辑角色',
    deleteConfirm: '确定要删除该角色吗？',
    deleteSuccess: '删除成功',
    saveSuccess: '保存成功',
    statusUpdateSuccess: '状态更新成功',
    permissionUpdateSuccess: '权限更新成功',
    searchPlaceholder: '搜索角色名称或编码',
    name: '角色名称',
    code: '角色编码',
    description: '角色描述',
    status: '状态',
    actions: '操作',
    assignPermissions: '分配权限',
    nameRequired: '请输入角色名称',
    codeRequired: '请输入角色编码'
  },
  f1: {
    race: {
      round: '轮次',
      practice: '练习赛',
      qualifying: '排位赛',
      sprint: '冲刺赛',
      race: '正赛',
      next: '下一站',
      previous: '上一站'
    },
    team: {
      points: '积分',
      wins: '胜场',
      podiums: '领奖台',
      fastestLaps: '最快圈速',
      budget: '预算上限',
      remaining: '剩余预算'
    },
    driver: {
      championships: '冠军数',
      races: '参赛场次',
      nationality: '国籍',
      dateOfBirth: '出生日期'
    },
    car: {
      speed: '速度',
      gear: '档位',
      rpm: '转速',
      drs: 'DRS系统',
      tyreWear: '轮胎磨损',
      fuelLoad: '燃油载量'
    }
  },
  error: {
    pageNotFound: "页面未找到",
    pageNotFoundDesc: "抱歉，您访问的页面不存在或已被移除",
    backHome: "返回首页",
  },
  login: {
    title: '账号登录',
    description: '输入您的邮箱和密码进行登录',
    email: '邮箱',
    emailPlaceholder: '请输入邮箱',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    submit: '登录',
    submitting: '登录中...',
    noAccount: '还没有账号？',
    register: '立即注册',
    validation: {
      emailRequired: '请输入邮箱',
      emailFormat: '请输入正确的邮箱格式',
      passwordRequired: '请输入密码',
      passwordLength: '密码长度不能小于6位'
    }
  },
  register: {
    title: '注册账号',
    description: '创建您的账户',
    email: '邮箱',
    emailPlaceholder: '请输入邮箱',
    username: '用户名',
    usernamePlaceholder: '请输入用户名',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '请再次输入密码',
    submit: '注册',
    submitting: '注册中...',
    haveAccount: '已有账号？',
    login: '立即登录',
    validation: {
      emailRequired: '请输入邮箱',
      emailFormat: '请输入正确的邮箱格式',
      usernameRequired: '请输入用户名',
      usernameLength: '用户名长度不能小于2位',
      passwordRequired: '请输入密码',
      passwordLength: '密码长度不能小于6位',
      confirmPasswordRequired: '请再次输入密码',
      passwordMismatch: '两次输入密码不一致'
    }
  },
  auth: {
    notifications: {
      loginSuccess: '登录成功',
      loginFailed: '登录失败',
      registerSuccess: '注册成功',
      registerFailed: '注册失败',
      logoutSuccess: '已退出登录'
    }
  }
}
