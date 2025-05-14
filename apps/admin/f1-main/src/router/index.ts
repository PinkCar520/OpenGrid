import { createRouter, createWebHistory,createWebHashHistory,isNavigationFailure, type RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import Layout from "../components/Layout.vue";
import Dashboard from "../views/dashboard/index.vue";
import { getMicroAppTitle } from "../hooks/microAppHelpers";
import { useTabsStore } from '../stores/tabs'
import i18n from '../locales/index'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "dashboard",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          title: i18n.global.t("route.menu.dashboard"),
          keepAlive: true,
        },
      },
      {
        path: "system",
        name: "system",
        meta: {
          title: i18n.global.t("route.menu.system.title"),
          keepAlive: true,
        },
        children: [
          {
            path: "users",
            name: "users",
            component: () => import("../views/system/Users.vue"),
            meta: {
              title: i18n.global.t("route.menu.system.users"),
              keepAlive: true,
            },
          },
          {
            path: "roles",
            name: "roles",
            component: () => import("../views/system/Roles.vue"),
            meta: {
              title: i18n.global.t("route.menu.system.roles"),
              keepAlive: true,
            },
          },
          {
            path: "permissions",
            name: "permissions",
            component: () => import("../views/system/Permissions.vue"),
            meta: {
              title: i18n.global.t("route.menu.system.permissions"),
              keepAlive: true,
            },
          },
        ]
      }
    ]
  },
  {
    path: "/race/:pathMatch(.*)*",
    name: "raceMicro",
    component: Layout,
    children: [
    ],
    meta: {
      title: "route.menu.raceMicro",
      keepAlive: true,
      isMicroApp: true,
      microAppName: 'raceMicro'
    },
  },
  {
    path: "/team/:pathMatch(.*)*",
    name: "teamMicro",
    component: Layout,
    children: [],
    meta: {
      title: "route.menu.teamMicro",
      keepAlive: true,
      isMicroApp: true,
      microAppName: 'teamMicro'
    },
  },
  // {
  //   path: '/team',
  //   name: 'Team',
  //   component: () => import('@/views/team/index.vue'),
  //   children: [
  //     // {
  //     //   path: 'garage',
  //     //   name: 'Garage',
  //     //   component: () => import('@/views/team/garage/index.vue'),
  //     //   meta: { title: '维修车间' }
  //     // },
  //     {
  //       path: 'development',
  //       name: 'Development',
  //       component: () => import('@/views/team/development/index.vue'),
  //       meta: { title: '研发中心' }
  //     },
  //     // {
  //     //   path: 'personnel',
  //     //   name: 'Personnel',
  //     //   component: () => import('@/views/team/personnel/index.vue'),
  //     //   meta: { title: '人员管理' }
  //     // }
  //   ]
  // },
  // {
  //   path: '/car',
  //   name: 'Car',
  //   component: () => import('@/views/car/index.vue'),
  //   children: [
  //     {
  //       path: 'telemetry',
  //       name: 'Telemetry',
  //       component: () => import('@/views/car/telemetry/index.vue'),
  //       meta: { title: '遥测数据' }
  //     },
  //     // {
  //     //   path: 'setup',
  //     //   name: 'Setup',
  //     //   component: () => import('@/views/car/setup/index.vue'),
  //     //   meta: { title: '赛车设置' }
  //     // },
  //     // {
  //     //   path: 'analysis',
  //     //   name: 'Analysis',
  //     //   component: () => import('@/views/car/analysis/index.vue'),
  //     //   meta: { title: '性能分析' }
  //     // }
  //   ]
  // },
  // {
  //   path: '/driver',
  //   name: 'Driver',
  //   component: () => import('@/views/driver/index.vue'),
  //   children: [
  //     // {
  //     //   path: 'profile',
  //     //   name: 'Profile',
  //     //   component: () => import('@/views/driver/profile/index.vue'),
  //     //   meta: { title: '车手档案' }
  //     // },
  //     // {
  //     //   path: 'performance',
  //     //   name: 'Performance',
  //     //   component: () => import('@/views/driver/performance/index.vue'),
  //     //   meta: { title: '表现分析' }
  //     // },
  //     // {
  //     //   path: 'training',
  //     //   name: 'Training',
  //     //   component: () => import('@/views/driver/training/index.vue'),
  //     //   meta: { title: '训练数据' }
  //     // }
  //   ]
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]
export const history = createWebHashHistory()
export const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  const tabsStore = useTabsStore()
  tabsStore.addCurrentTab(to)
  if(to.meta?.isMicroApp) {
    const microAppTitle = getMicroAppTitle(to)
    to.meta.title = microAppTitle
  }

  // 添加NProgress加载进度条
  NProgress.start()

  // 权限检查逻辑 (可以根据需要添加)
  // const hasToken = localStorage.getItem('token')
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //   }
  // }
  
  next();
});

router.afterEach((to,from,failure) => {
  NProgress.done()
  router.listening = false
  if (isNavigationFailure(failure)) {
    console.log('failed navigation', failure)
  }
})