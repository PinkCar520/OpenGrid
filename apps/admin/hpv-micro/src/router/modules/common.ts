export default [
    {
        path: 'hpvHome',
        name: 'hpvHome',
        component: () => import('@/views/home/index.vue'),
        meta: {
          keepAlive: true,
          title: 'hpvHome'
        }
    },
    {
        path: 'powerSystem',
        name: 'powerSystem',
        component: () => import('@/views/powerSystem/index.vue'),
        meta: {
          keepAlive: true,
          title: 'powerSystem'
        }
    },
    {
        path: 'chargingStatus',
        name: 'chargingStatus',
        component: () => import('@/views/chargingStatus/index.vue'),
        meta: {
          keepAlive: true,
          title: 'chargingStatus'
        }
    }
]
