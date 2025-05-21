import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/car/telemetry',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/car',
    name: 'car',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'car',
      keepAlive: true
    }
  },
];

export default routes