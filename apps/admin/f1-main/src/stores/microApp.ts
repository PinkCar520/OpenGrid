import { defineStore } from 'pinia';
import { events } from '../utils/events';
import {loadMicroApp} from "qiankun";

type MicroAppInstance = ReturnType<typeof loadMicroApp>;

interface MicroAppConfig {
  name: string;
  entry: string;
  container: string;
  activeRule?: string;
  prefixPath: string;
}

export const useMicroAppStore = defineStore('microApp', {
  state: () => ({
    loadedApps: new Map<string, MicroAppInstance>(),
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
    addLoadedApps(microAppName:string,microApp: MicroAppConfig,action:string) {
      const instance = this.loadedApps.get(microAppName);
      if(!instance) {
        try {
          this.loadedApps.set(microAppName, loadMicroApp(microApp));
        } catch (error) {
          console.error(`[MicroApp] ${action} failed:`, microAppName, error);
        }
      }
    },
    removeLoadedApps(microAppName: string) {
      const instance = this.loadedApps.get(microAppName);
      if (instance) {
        instance.unmount();
        this.loadedApps.delete(microAppName);
      }
    },
  },
});