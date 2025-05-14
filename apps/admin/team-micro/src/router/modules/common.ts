import Home from '../../views/home/index.vue'
import TeamDevelopment from '../../views/team/development/index.vue'
import TeamGarage from '../../views/team/garage/index.vue'
import TeamPersonnel from '../../views/team/personnel/index.vue'

export default [
        {
            path: 'development',
            name: 'teamDevelopment',
            component: TeamDevelopment,
            meta: {
                title: 'Team Development & Overview',
                keepAlive: true
            }
        },
        {
            path: 'garage',
            name: 'teamGarage',
            component: TeamGarage,
            meta: {
                title: 'Team Garage',
                keepAlive: true
            }
        },
        {
            path: 'personnel',
            name: 'teamPersonnel',
            component: TeamPersonnel,
            meta: {
                title: 'Team Personnel',
                keepAlive: true
            }
        }
]
