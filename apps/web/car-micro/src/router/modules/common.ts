export default [
    {
        path: 'telemetry',
        name: 'telemetry',
        component: () => import('@/views/telemetry/index.vue'),
        meta: {
          keepAlive: true,
          title: 'telemetry'
        }
    },
    {
        path: 'setup',
        name: 'setup',
        component: () => import('@/views/setup/index.vue'),
        meta: {
          keepAlive: true,
          title: 'setup'
        }
    },
    {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/views/analysis/index.vue'),
        meta: {
          keepAlive: true,
          title: 'analysis'
        }
    }
]
