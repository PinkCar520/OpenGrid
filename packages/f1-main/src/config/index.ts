export const microApps = [
  {
    name: 'raceMicro',
    entry: 'http://localhost:5110',
    container: '#micro-race-container',
    prefixPath: '/race'
  },
  {
    name: 'team',
    entry: 'http://localhost:5120',
    container: '#micro-team-container',
    prefixPath: '/team'
  },
  {
    name: 'car',
    entry: 'http://localhost:5130',
    container: '#micro-car-container',
    prefixPath: '/car'
  },
  {
    name: 'driver',
    entry: 'http://localhost:5140',
    container: '#micro-driver-container',
    activeRule: '#/driver',
    prefixPath: '/driver'
  }
]