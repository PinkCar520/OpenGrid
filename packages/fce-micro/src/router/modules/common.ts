import FuelCellDashboard from '../../views/fuelCellDashboard/index.vue'
import HydrogenMap from '../../views/hydrogenMap/index.vue'
import Home from '../../views/home/index.vue'

export default [
    {
        path: 'fuelCellDashboard',
        name: 'fuelCellDashboard',
        component: FuelCellDashboard,
        meta: {
            title: 'fuelCellDashboard',
            keepAlive: true
        }
    },
    {
        path: 'hydrogenMap',
        name: 'hydrogenMap',
        component: HydrogenMap,
        meta: {
            title: 'hydrogenMap',
            keepAlive: true
        }
    },
    {
        path: 'fceHome',
        name: 'fceHome',
        component: Home,
        meta: {
            title: 'fceHome',
            keepAlive: true
        } 
    }
]
