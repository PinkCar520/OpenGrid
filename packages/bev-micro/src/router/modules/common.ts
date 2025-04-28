import BatteryHealthDashboard from '../../views/batteryHealthDashboard/index.vue'
import SuperchargerMap from '../../views/superchargerMap/index.vue'
import Home from '../../views/home/index.vue'

export default [
    {
        path: 'batteryHealthDashboard',
        name: 'batteryHealthDashboard',
        component: BatteryHealthDashboard,
        meta: {
            title: 'batteryHealthDashboard',
            keepAlive: true
        }
    },
    {
        path: 'superchargerMap',
        name: 'superchargerMap',
        component: SuperchargerMap,
        meta: {
            title: 'superchargerMap',
            keepAlive: true
        }
    },
    {
        path: 'bevHome',
        name: 'bevHome',
        component: Home,
        meta: {
            title: 'bevHome',
            keepAlive: true
        } 
    }
]