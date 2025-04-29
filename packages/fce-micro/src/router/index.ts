import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/fce/fcehome',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/fce',
    name: 'fce',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'fce',
      keepAlive: true
    }
  },
];

export default routes;