export default [
    {
        path: 'batteryStatus',
        name: 'batteryStatus',
        component: () => import('@/views/batteryStatus/index.vue'),
        meta: {
          keepAlive: true,
          title: 'batteryStatus'
        }
    },
    {
        path: 'engineStatus',
        name: 'engineStatus',
        component: () => import('@/views/engineStatus/index.vue'),
        meta: {
          keepAlive: true,
          title: 'engineStatus'
        }
    },
    {
        path: 'hevHome',
        name: 'hevHome',
        component: () => import('@/views/home/index.vue'),
        meta: {
          keepAlive: true,
          title: 'hevHome'
        }
    }
]
