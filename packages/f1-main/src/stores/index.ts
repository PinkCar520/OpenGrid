import { defineStore } from 'pinia';
import { events } from '../utils/events';

export const useMicroAppStore = defineStore('microApp', {
  state: () => ({
    loadedApps: {} as Record<string, any>,
    childRoutes: {} as Record<string, any>,
    microApps: [
      {
        name: 'raceMicro',
        entry: 'http://localhost:5110',
        container: '#micro-race-container',
        prefixPath: '/race',
      },
      {
        name: 'teamMicro',
        entry: 'http://localhost:5120',
        container: '#micro-team-container',
        prefixPath: '/team',
      },
      {
        name: 'carMicro',
        entry: 'http://localhost:5130',
        container: '#micro-car-container',
        prefixPath: '/car',
      },
      {
        name: 'driverMicro',
        entry: 'http://localhost:5140',
        container: '#micro-driver-container',
        activeRule: '#/driver',
        prefixPath: '/driver',
      }
    ]
  }),
  actions: {
    addChildRoutes(route: Record<string, any>) {
      this.childRoutes = {...this.childRoutes, ...route}
      // events.emit('childRoutes-event', { childRoutes: this.childRoutes });
    },
    deleteChildRoutes(childRoutesPath: string) {
      this.childRoutes = this.childRoutes.filter((route) => route !== childRoutesPath);
    },
    addLoadedApps(app: Record<string, any>) {
      this.loadedApps = { ...this.loadedApps, ...app };
    },
    unmountLoadedApps(name: string) {
      this.loadedApps[name].unmount();
      delete this.loadedApps[name];
    },
  },
  // persist: {
  //   key: 'microApp',
  //   storage: localStorage,
  // },
});