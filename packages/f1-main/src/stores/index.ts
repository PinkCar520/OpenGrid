import { defineStore } from 'pinia';
import { events } from '../utils/events';

export const useMicroAppStore = defineStore('microApp', {
  state: () => ({
    loadedApps: {} as Record<string, any>,
    childRoute: [] as Array<string>,
  }),
  actions: {
    addChildRoute(route: string) {
      if (route && !this.childRoute.includes(route)) {
        this.childRoute.push(route);
      }
      events.emit('childRoute-event', { childRoute: this.childRoute });
    },
    deleteChildRoute(childRoutePath: string) {
      this.childRoute = this.childRoute.filter(route => route !== childRoutePath);
    },
    addLoadedApps(app: Record<string, any>) {
      this.loadedApps = { ...this.loadedApps, ...app };
      console.log('loadedApps', this.loadedApps);
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