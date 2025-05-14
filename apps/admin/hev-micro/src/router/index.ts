import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/hev/hevhome',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/hev',
    name: 'hev',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'hev',
      keepAlive: true
    }
  },
];

export default routes;