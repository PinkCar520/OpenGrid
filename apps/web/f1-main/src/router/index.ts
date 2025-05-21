import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  isNavigationFailure,
  type RouteRecordRaw,
} from 'vue-router'
import NProgress from 'nprogress'
import Layout from '../components/Layout.vue'
import Dashboard from '../views/dashboard/index.vue'
import QueryTable from '../views/example/QueryTable.vue'
import { getMicroAppTitle } from '../hooks/microAppHelpers'
import { useTabsStore } from '../stores/tabs'
import i18n from '../locales/index'
import { useAuthStore } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'route.menu.dashboard',
          keepAlive: true,
          requiresAuth: true,
        },
      },
      {
        path: '/queryTable',
        name: 'queryTable',
        component: QueryTable,
        meta: {
          title: 'route.menu.dashboard',
          keepAlive: true,
          requiresAuth: true,
        },
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          title: 'route.menu.system.title',
          keepAlive: true,
          requiresAuth: true,
        },
        children: [
          {
            path: 'users',
            name: 'users',
            component: () => import('../views/system/Users.vue'),
            meta: {
              title: 'route.menu.system.users',
              keepAlive: true,
              requiresAuth: true,
            },
          },
          {
            path: 'roles',
            name: 'roles',
            component: () => import('../views/system/Roles.vue'),
            meta: {
              title: 'route.menu.system.roles',
              keepAlive: true,
              requiresAuth: true,
            },
          },
          {
            path: 'permissions',
            name: 'permissions',
            component: () => import('../views/system/Permissions.vue'),
            meta: {
              title: 'route.menu.system.permissions',
              keepAlive: true,
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/AccountView.vue'),
        meta: {
          title: 'settings.title',
          requiresAuth: true,
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('../views/error/404.vue'),
        meta: {
          title: '404',
          hidden: true,
          requiresAuth: true,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
          hidden: true,
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/race/:pathMatch(.*)*',
    name: 'raceMicro',
    component: Layout,
    children: [],
    meta: {
      title: 'route.menu.raceMicro',
      keepAlive: true,
      isMicroApp: true,
      requiresAuth: true,
      microAppName: 'raceMicro',
    },
  },
  {
    path: '/team/:pathMatch(.*)*',
    name: 'teamMicro',
    component: Layout,
    children: [],
    meta: {
      title: 'route.menu.teamMicro',
      keepAlive: true,
      isMicroApp: true,
      requiresAuth: true,
      microAppName: 'teamMicro',
    },
  },
  {
    path: '/car/:pathMatch(.*)*',
    name: 'carMicro',
    component: Layout,
    children: [],
    meta: {
      title: 'route.menu.carMicro',
      keepAlive: true,
      isMicroApp: true,
      requiresAuth: true,
      microAppName: 'carMicro',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresAuth: false },
  },
]

export const history = createWebHashHistory()
export const router = createRouter({
  history,
  routes,
})

router.beforeEach((to, from, next) => {
  const tabsStore = useTabsStore()
  const authStore = useAuthStore()
  tabsStore.addCurrentTab(to)
  if (to.meta?.isMicroApp) {
    const microAppTitle = getMicroAppTitle(to)
    to.meta.title = microAppTitle
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (!requiresAuth && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    if (to.path !== '/login' && to.path !== '/register') {
      NProgress.start()
    }
    next()
  }
})

router.afterEach((to, from, failure) => {
  NProgress.done()
  router.listening = false
  if (to.path === from.path) {
    return
  }
  if (isNavigationFailure(failure)) {
    console.log('failed navigation', failure)
  }
})
