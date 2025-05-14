import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/team/development',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/team',
    name: 'team',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'team',
      keepAlive: true
    }
  },
];

export default routes;