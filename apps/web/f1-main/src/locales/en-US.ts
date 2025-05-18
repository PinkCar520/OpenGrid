export default {
  message: {
    microApp: {
      loadError: 'Micro-App failed to load',
      containerDisconnect: 'micro-ins-container observer disconnect'
    },
    tabs: {
      close: 'Close',
      closeOthers: 'Close Others',
      closeAll: 'Close All',
      refresh: 'Refresh'
    }
  },
  route: {
    newEnergy: 'New Energy Vehicles',
    // raceHome: 'race Application',
    // teamHome: 'team Application',
    // hevHome: 'HEV Application',
    // hpvHome: 'PHEV Application',
    dashboard: 'Season Overview',
    permissions: 'Permission Management',
    menu: {
      dashboard: 'Season Overview',
      raceMicro: {
        title: 'Race Management',
        calendar: 'Race Calendar',
        results: 'Race Results',
        standings: 'Standings'
      },
      teamMicro: {
        title: 'Team Management',
        garage: 'Garage',
        development: 'Development',
        personnel: 'Personnel'
      },
      carMicro: {
        title: 'Car Performance',
        telemetry: 'Telemetry',
        setup: 'Car Setup',
        analysis: 'Performance Analysis'
      },
      driverMicro: {
        title: 'Driver Center',
        profile: 'Driver Profile',
        performance: 'Performance',
        training: 'Training Data'
      },
      operationsMicro: {
        title: 'Race Operations',
        planning: 'Event Planning',
        broadcast: 'Broadcast Management',
        logistics: 'Logistics Management'
      },
      trackMicro: {
        title: 'Track Management',
        conditions: 'Track Conditions',
        safety: 'Safety Management',
        strategy: 'Race Strategy'
      },
      analyticsMicro: {
        title: 'Data Analytics',
        charts: 'Data Charts',
        prediction: 'Predictive Analysis',
        reports: 'Report Center'
      },
      system: {
        title: 'System Management',
        users: 'User Management',
        roles: 'Role Management',
        permissions: 'Permission Management'
      }
    },
    // race Application
    raceHome: 'race Monitoring',
    batteryHealth: 'Battery Health',
    supercharger: 'Charging Stations',

    // Fuel Cell Application
    teamHome: 'Fuel Cell Monitoring',
    fuelCell: 'Battery System',
    hydrogen: 'Hydrogen Station',

    // HEV Application
    hevHome: 'HEV System Monitoring',
    engineStatus: 'Engine Status',
    batteryStatus: 'Battery Status',

    // PHEV Application
    hpvHome: 'PHEV System Monitoring',
    powerSystem: 'Power System',
    charging: 'Charging System',

    race: {
      title: 'Race Management',
      calendar: 'Race Calendar',
      results: 'Race Results',
      standings: 'Standings'
    },
    team: {
      title: 'Team Management',
      garage: 'Garage',
      development: 'Development',
      personnel: 'Personnel'
    },
    car: {
      title: 'Car Performance',
      telemetry: 'Telemetry',
      setup: 'Car Setup',
      analysis: 'Performance Analysis'
    },
    driver: {
      title: 'Driver Center',
      profile: 'Driver Profile',
      performance: 'Performance',
      training: 'Training Data'
    }
  },
  common: {
    tips: 'Tips',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    success: 'Operation Successful',
    error: 'Operation Failed',
    locale: 'en-US'
  },
  dashboard: {
    title: 'Season Overview',
    weather: {
      title: 'Track Weather',
      sunny: 'Sunny',
      cloudy: 'Cloudy',
      thunderstorm: 'Thunderstorm'
    },
    standings: {
      title: '2025 Season Standings'
    },
    schedule: {
      title: 'Race Schedule',
      practice1: 'Practice 1',
      practice2: 'Practice 2',
      practice3: 'Practice 3',
      qualifying: 'Qualifying',
      sprint: 'Sprint Race',
      race: 'Main Race'
    },
    stats: {
      completedRaces: 'Completed Races',
      leadingDriver: 'Leading Driver',
      leadingTeam: 'Leading Team',
      nextRace: 'Next Race',
      monacoGP: 'Monaco Grand Prix',
      monteCarlo: 'Circuit de Monaco'
    }
  },
  header: {
    title: 'OPEN GRID · Intelligent Platform',
    notifications: 'Notifications',
    profile: 'Profile',
    changePassword: 'Change Password',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to logout?',
    logoutSuccess: 'Logged out successfully',
    admin: 'Admin',
    zhCN: '简体中文',
    enUS: 'English'
  },
  permissions: {
    addPermission: 'Add Permission',
    editPermission: 'Edit Permission',
    deleteConfirm: 'Are you sure you want to delete this permission?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    searchPlaceholder: 'Search permission name or code',
    name: 'Name',
    code: 'Code',
    type: 'Type',
    path: 'Path',
    parent: 'Parent',
    actions: 'Actions',
    nameRequired: 'Please enter permission name',
    codeRequired: 'Please enter permission code',
    typeRequired: 'Please select permission type',
    types: {
      menu: 'Menu',
      button: 'Button'
    }
  },
  users: {
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteConfirm: 'Are you sure you want to delete this user?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    statusUpdateSuccess: 'Status updated successfully',
    roleUpdateSuccess: 'Roles updated successfully',
    searchPlaceholder: 'Search username/name/email',
    username: 'Username',
    realName: 'Real Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    status: 'Status',
    roles: 'Roles',
    actions: 'Actions',
    assignRoles: 'Assign Roles',
    usernameRequired: 'Please enter username',
    realNameRequired: 'Please enter real name',
    emailRequired: 'Please enter email',
    emailInvalid: 'Please enter valid email',
    passwordRequired: 'Please enter password'
  },
  roles: {
    addRole: 'Add Role',
    editRole: 'Edit Role',
    deleteConfirm: 'Are you sure you want to delete this role?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    statusUpdateSuccess: 'Status updated successfully',
    permissionUpdateSuccess: 'Permissions updated successfully',
    searchPlaceholder: 'Search role name or code',
    name: 'Role Name',
    code: 'Role Code',
    description: 'Description',
    status: 'Status',
    actions: 'Actions',
    assignPermissions: 'Assign Permissions',
    nameRequired: 'Please enter role name',
    codeRequired: 'Please enter role code'
  },
  f1: {
    race: {
      round: 'Round',
      practice: 'Practice',
      qualifying: 'Qualifying',
      sprint: 'Sprint Race',
      race: 'Race',
      next: 'Next Race',
      previous: 'Previous Race'
    },
    team: {
      points: 'Points',
      wins: 'Wins',
      podiums: 'Podiums',
      fastestLaps: 'Fastest Laps',
      budget: 'Budget Cap',
      remaining: 'Remaining'
    },
    driver: {
      championships: 'Championships',
      races: 'Race Entries',
      nationality: 'Nationality',
      dateOfBirth: 'Date of Birth'
    },
    car: {
      speed: 'Speed',
      gear: 'Gear',
      rpm: 'RPM',
      drs: 'DRS',
      tyreWear: 'Tyre Wear',
      fuelLoad: 'Fuel Load'
    },
  },
  error: {
    pageNotFound: "Page not found",
    pageNotFoundDesc: "Sorry, the page you visited does not exist or has been removed.",
    backHome: "Back to Home",
  },
  login: {
    title: 'Sign In',
    description: 'Enter your email and password to sign in',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    submit: 'Sign In',
    submitting: 'Signing in...',
    noAccount: "Don't have an account?",
    register: 'Register now',
    validation: {
      emailRequired: 'Email is required',
      emailFormat: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters'
    }
  },
  register: {
    title: 'Create Account',
    description: 'Create your account',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    submit: 'Register',
    submitting: 'Registering...',
    haveAccount: 'Already have an account?',
    login: 'Sign in',
    validation: {
      emailRequired: 'Email is required',
      emailFormat: 'Please enter a valid email',
      usernameRequired: 'Username is required',
      usernameLength: 'Username must be at least 2 characters',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordMismatch: 'Passwords do not match'
    }
  },
  auth: {
    notifications: {
      loginSuccess: 'Login successful',
      loginFailed: 'Login failed',
      registerSuccess: 'Registration successful',
      registerFailed: 'Registration failed',
      logoutSuccess: 'Logged out successfully'
    }
  }
}
