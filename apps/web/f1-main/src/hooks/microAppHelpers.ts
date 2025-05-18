import { type RouteLocationNormalized } from 'vue-router'
import { useMicroAppStore } from '../stores/microApp'; // 使用 Pinia Store
import { useTabsStore } from "@/stores/tabs";
import i18n from '../locales'

interface MicroAppConfig {
  name: string;
  entry: string;
  container: string;
  activeRule?: string;
  prefixPath: string;
}

const getMatchedMicroApp = (path: string, microApps: MicroAppConfig[]): MicroAppConfig | undefined => {
  return microApps.find(app => path.startsWith(app.prefixPath));
};

const handleMicroAppLifecycle = (
  route: RouteLocationNormalized,
  action: 'mount' | 'update' | 'unmount'
): void => {
  if (!route.meta?.isMicroApp) return;

  const microAppStore = useMicroAppStore();
  const {addLoadedApps,removeLoadedApps} = microAppStore;
  const microApp = getMatchedMicroApp(route.path, microAppStore.microApps);
  const microAppName = microApp?.name
  if (!microApp || !microAppName) return;

  switch (action) {
    case 'mount':
    case 'update':
      addLoadedApps(microAppName,microApp,action);
      break;
    
    case 'unmount':
      removeLoadedApps(microAppName);
      break;
  }
};

// 导出统一接口
export const mountMicroApps = (route: RouteLocationNormalized) => 
  handleMicroAppLifecycle(route, 'mount');

export const updateMicroApps = (route: RouteLocationNormalized) =>
  handleMicroAppLifecycle(route, 'update');

export const unmountMicroApps = (route: RouteLocationNormalized) =>
  handleMicroAppLifecycle(route, 'unmount');

export function getMicroAppTitle(route: RouteLocationNormalized) {
  const appName = route.meta?.microAppName
  try {
    const title = route.path.split("/").pop() || ''
    const microAppTitle = `${route.meta?.title}.${title}`
    return microAppTitle
  } catch (error) {
    console.warn(`Failed to get title for micro-app: ${appName}`, error)
    return route.meta?.title || ''
  }
}

export function closeSelectMicroTags(targetPath:string) {
  const microAppStore = useMicroAppStore();
  const tabsStore = useTabsStore()
  const microApp = microAppStore.microApps.find((item: { name: string; entry: string; container: string; prefixPath: string; }) => targetPath.includes(item.prefixPath));
  if(microApp && targetPath) {
    const microAppName = microApp.name;
    const microActiveIndex = tabsStore.tabs.filter((item) => microAppName === item.name).length;
    if(microActiveIndex < 1) {
      microAppStore.removeLoadedApps(microAppName);
    }
  }
}