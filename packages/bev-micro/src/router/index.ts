import {type RouteRecordRaw } from 'vue-router';
import commonRoutes from "./modules/COMMON"

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    redirect: '/bev/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/bev',
    name: 'bev',
    children: [
      ...commonRoutes,
    ],
    meta: {
      title: 'bev',
      keepAlive: true
    }
  },
];

export default routes;