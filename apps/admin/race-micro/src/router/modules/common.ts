export default [
    {
        path: 'calendar',
        name: 'calendar',
        component: () => import('@/views/calendar/index.vue'),
        meta: {
          keepAlive: true,
          title: 'calendar'
        }
    },
    {
        path: 'results',
        name: 'results',
        component: () => import('@/views/results/index.vue'),
        meta: {
          keepAlive: true,
          title: 'results'
        }
    },
    {
        path: 'standings',
        name: 'standings',
        component: () => import('@/views/standings/index.vue'),
        meta: {
          keepAlive: true,
          title: 'standings'
        }
    }
]