import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/hpv/hpvHome',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/hpv',
    name: 'hpv',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'hpv',
      keepAlive: true
    }
  },
];

export default routes
