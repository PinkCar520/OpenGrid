import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from "./modules/common"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/race/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/race',
    name: 'race',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'race',
      keepAlive: true
    }
  },
];

export default routes;