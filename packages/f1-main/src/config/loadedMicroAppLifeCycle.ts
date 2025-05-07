import { loadMicroApp } from "qiankun";
import { type RouteLocationNormalized } from 'vue-router'
import { useMicroAppStore } from '../stores/index'; // 使用 Pinia Store
import { useTabsStore } from "@/stores/tabs";
import i18n from '../locales'

interface MicroAppConfig {
  name: string;
  entry: string;
  container: string;
  activeRule?: string;
  prefixPath: string;
}

export function getMicroAppTitle(route: RouteLocationNormalized) {
  const appName = route.meta?.microAppName
  try {
    const title = route.path.split("/").pop() || ''
    const microAppTitle = i18n.global.t(`${route.meta?.title}.${title}`)
    return microAppTitle
  } catch (error) {
    console.warn(`Failed to get title for micro-app: ${appName}`, error)
    return route.meta?.title || ''
  }
}

export function loadedMicroApps(targetPath: string): void {
  const microAppStore = useMicroAppStore();
  const microApps = microAppStore.microApps;
  const loadedApps = microAppStore.loadedApps
  const microApp = microApps.find((item: { name: string; entry: string; container: string; prefixPath: string; }) => targetPath.includes(item.prefixPath));
  if (microApp) {
    const microAppName = microApp.name;
    if (!microAppStore.loadedApps[microAppName]) {
      loadMicroAppConfig(loadedApps, microAppName, microApp);
    }
  }
}

export function loadMicroAppConfig(loadedApps: Record<string, any>, microAppName: string, microApp: MicroAppConfig): void {
  const microAppStore = useMicroAppStore();
  // if (loadedApps[microAppName]) {
  //   microAppStore.unmountLoadedApps(microAppName);
  // }
  const app = loadMicroApp(microApp)
  loadedApps[microAppName] = {
    ...app,
    childRoutes: []
  }
  microAppStore.addLoadedApps(loadedApps);
}

export function addChildRoutes(route: Record<string,any>) {
  console.log(route,'route')
  const { name,isMicroApp,path } = route
  // const microAppName = name;
  const microAppStore = useMicroAppStore();
  const loadedApps = microAppStore.loadedApps;
  const childRoutePath = path.split("/").pop() || null;
  loadedApps[name].childRoutes.push(childRoutePath);
  console.log(loadedApps,'loadedApps')
}

export function closeSelectMicroTags(targetPath:string) {
  const microAppStore = useMicroAppStore();
  const tabsStore = useTabsStore()
  const microApp = microApps.find((item: { name: string; entry: string; container: string; prefixPath: string; }) => targetPath.includes(item.prefixPath));
  if(microApp && targetPath) {
    const microAppName = microApp.name;
    const microActiveIndex = tabsStore.tabs.filter((item) => microAppName === item.name).length;
    if(microActiveIndex < 1) {
      microAppStore.unmountLoadedApps(microAppName);
    }
  }
}