// apps/api/prisma/seed.ts
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // 清理现有数据
  // await prisma.menuItem.deleteMany();

  // 创建根菜单项
  const dashboard = await prisma.menuItem.create({
    data: {
      name: 'Dashboard',
      label: 'route.menu.dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      order: 1,
    },
  });

  const race = await prisma.menuItem.create({
    data: {
      name: 'Race',
      label: 'route.menu.raceMicro.title',
      path: '/race',
      icon: 'race',
      order: 2,
    },
  });

  const team = await prisma.menuItem.create({
    data: {
      name: 'Team',
      label: 'route.menu.teamMicro.title',
      path: '/team',
      icon: 'team',
      order: 3,
    },
  });

  const car = await prisma.menuItem.create({
    data: {
      name: 'Car',
      label: 'route.menu.carMicro.title',
      path: '/car',
      icon: 'car',
      order: 4,
    },
  });

  const driver = await prisma.menuItem.create({
    data: {
      name: 'Driver',
      label: 'route.menu.driverMicro.title',
      path: '/driver',
      icon: 'driver',
      order: 5,
    },
  });

  const operations = await prisma.menuItem.create({
    data: {
      name: 'Operations',
      label: 'route.menu.operationsMicro.title',
      path: '/operations',
      icon: 'operations',
      order: 6,
    },
  });

  const track = await prisma.menuItem.create({
    data: {
      name: 'Track',
      label: 'route.menu.trackMicro.title',
      path: '/track',
      icon: 'track',
      order: 7,
    },
  });

  const analytics = await prisma.menuItem.create({
    data: {
      name: 'Analytics',
      label: 'route.menu.analyticsMicro.title',
      path: '/analytics',
      icon: 'analytics',
      order: 8,
    },
  });

  const system = await prisma.menuItem.create({
    data: {
      name: 'System',
      label: 'route.menu.system.title',
      path: '/system',
      icon: 'system',
      order: 9,
    },
  });

  // 创建子菜单项
  await prisma.menuItem.createMany({
    data: [
      // Race子菜单
      {
        name: 'Calendar',
        label: 'route.menu.raceMicro.calendar',
        path: '/race/calendar',
        icon: 'calendar',
        parentId: race.id,
        order: 1,
      },
      {
        name: 'Results',
        label: 'route.menu.raceMicro.results',
        path: '/race/results',
        icon: 'results',
        parentId: race.id,
        order: 2,
      },
      {
        name: 'Standings',
        label: 'route.menu.raceMicro.standings',
        path: '/race/standings',
        icon: 'standings',
        parentId: race.id,
        order: 3,
      },
      // Team子菜单
      {
        name: 'Garage',
        label: 'route.menu.teamMicro.garage',
        path: '/team/garage',
        icon: 'garage',
        parentId: team.id,
        order: 1,
      },
      {
        name: 'Development',
        label: 'route.menu.teamMicro.development',
        path: '/team/development',
        icon: 'development',
        parentId: team.id,
        order: 2,
      },
      {
        name: 'Personnel',
        label: 'route.menu.teamMicro.personnel',
        path: '/team/personnel',
        icon: 'personnel',
        parentId: team.id,
        order: 3,
      },
      // Car子菜单
      {
        name: 'Telemetry',
        label: 'route.menu.carMicro.telemetry',
        path: '/car/telemetry',
        icon: 'telemetry',
        parentId: car.id,
        order: 1,
      },
      {
        name: 'Setup',
        label: 'route.menu.carMicro.setup',
        path: '/car/setup',
        icon: 'setup',
        parentId: car.id,
        order: 2,
      },
      {
        name: 'Analysis',
        label: 'route.menu.carMicro.analysis',
        path: '/car/analysis',
        icon: 'analysis',
        parentId: car.id,
        order: 3,
      },
      // Driver子菜单
      {
        name: 'Profile',
        label: 'route.menu.driverMicro.profile',
        path: '/driver/profile',
        icon: 'profile',
        parentId: driver.id,
        order: 1,
      },
      {
        name: 'Performance',
        label: 'route.menu.driverMicro.performance',
        path: '/driver/performance',
        icon: 'performance',
        parentId: driver.id,
        order: 2,
      },
      {
        name: 'Training',
        label: 'route.menu.driverMicro.training',
        path: '/driver/training',
        icon: 'training',
        parentId: driver.id,
        order: 3,
      },
      // Operations子菜单
      {
        name: 'Planning',
        label: 'route.menu.operationsMicro.planning',
        path: '/operations/planning',
        icon: 'planning',
        parentId: operations.id,
        order: 1,
      },
      {
        name: 'Broadcast',
        label: 'route.menu.operationsMicro.broadcast',
        path: '/operations/broadcast',
        icon: 'broadcast',
        parentId: operations.id,
        order: 2,
      },
      {
        name: 'Logistics',
        label: 'route.menu.operationsMicro.logistics',
        path: '/operations/logistics',
        icon: 'logistics',
        parentId: operations.id,
        order: 3,
      },
      // Track子菜单
      {
        name: 'Conditions',
        label: 'route.menu.trackMicro.conditions',
        path: '/track/conditions',
        icon: 'conditions',
        parentId: track.id,
        order: 1,
      },
      {
        name: 'Safety',
        label: 'route.menu.trackMicro.safety',
        path: '/track/safety',
        icon: 'safety',
        parentId: track.id,
        order: 2,
      },
      {
        name: 'Strategy',
        label: 'route.menu.trackMicro.strategy',
        path: '/track/strategy',
        icon: 'strategy',
        parentId: track.id,
        order: 3,
      },
      // Analytics子菜单
      {
        name: 'Charts',
        label: 'route.menu.analyticsMicro.charts',
        path: '/analytics/charts',
        icon: 'charts',
        parentId: analytics.id,
        order: 1,
      },
      {
        name: 'Prediction',
        label: 'route.menu.analyticsMicro.prediction',
        path: '/analytics/prediction',
        icon: 'prediction',
        parentId: analytics.id,
        order: 2,
      },
      {
        name: 'Reports',
        label: 'route.menu.analyticsMicro.reports',
        path: '/analytics/reports',
        icon: 'reports',
        parentId: analytics.id,
        order: 3,
      },
      // System子菜单
      {
        name: 'Users',
        label: 'route.menu.system.users',
        path: '/system/users',
        icon: 'users',
        parentId: system.id,
        order: 1,
      },
      {
        name: 'Roles',
        label: 'route.menu.system.roles',
        path: '/system/roles',
        icon: 'roles',
        parentId: system.id,
        order: 2,
      },
      {
        name: 'Permissions',
        label: 'route.menu.system.permissions',
        path: '/system/permissions',
        icon: 'permissions',
        parentId: system.id,
        order: 3,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
