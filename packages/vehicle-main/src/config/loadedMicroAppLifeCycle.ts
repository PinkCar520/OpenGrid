import { loadMicroApp } from "qiankun";
import { microApps } from "./index";
import { useMicroAppStore } from '../stores/index'; // 使用 Pinia Store
import i18n from '../locales'

interface MicroAppConfig {
  name: string;
  entry: string;
  container: string;
  activeRule?: string;
  prefixPath: string;
}

export function metaTitle(to: any): void {
  // const pathMatch = to.params.pathMatch;
  // const length = pathMatch.length - 1;
  // to.meta.title = pathMatch.length > 1 ? pathMatch[length] : pathMatch;
}

export function isMicroApp(targetPath) {
  const microApp = microApps.find(item => targetPath.includes(item.prefixPath))
  return microApp
}

export function loadedMicroApps(targetPath: string): void {
  const microApp = microApps.find((item: { name: string; entry: string; container: string; prefixPath: string; }) => targetPath.includes(item.prefixPath));
  if (microApp) {
    const microName = microApp.name;
    const microAppStore = useMicroAppStore();
    const loadedApps = microAppStore.loadedApps;
    const childRoutePath = targetPath.split("/").pop() || null;
    if (!loadedApps[microName]) {
      loadMicroAppConfig(loadedApps, microName, microApp, childRoutePath);
    }
    microAppStore.addChildRoute(childRoutePath);
  }
}

export function loadMicroAppConfig(loadedApps: Record<string, any>, microName: string, microApp: MicroAppConfig,childRoute:string): void {
  const microAppStore = useMicroAppStore();
  if (loadedApps[microName]) {
    microAppStore.unmountLoadedApps(microName);
  }
  loadedApps[microName] = loadMicroApp(microApp);
  microAppStore.addLoadedApps(loadedApps);
}

export function setChildRoute() {
  
}


export function waitForContainerNode(loadedApps: Record<string, MicroAppConfig>, microName: string, microApp: MicroAppConfig, childRoutePath: string | null): void {
  const observer = new MutationObserver(() => {
    const containerNode = document.querySelector(microApp.container);
    if (containerNode) {
      console.info(`[${performance.now().toFixed(2)}ms] ${i18n.global.t('message.microApp.containerDisconnect')}`);
      loadMicroAppConfig(loadedApps, microName, microApp,childRoutePath);
      observer.disconnect();
    } else {
      console.error(`[${performance.now().toFixed(2)}ms] ${i18n.global.t('message.microApp.loadError')}`);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function closeSelectMicroTags(targetPath) {
  const microAppStore = useMicroAppStore();
  const microApp = microApps.find((item: { name: string; entry: string; container: string; prefixPath: string; }) => targetPath.includes(item.prefixPath));
  if(microApp && targetPath) {
    const microName = microApp.name;
    const childRoutePath = targetPath.split("/").pop() || null;
    microAppStore.deleteChildRoute(childRoutePath);
    const microActiveIndex = microAppStore.childRoute.length;
    console.log(microActiveIndex, 'microActiveIndex');
    console.log(microAppStore.childRoute, 'microAppStore.childRoute');
    if(microActiveIndex < 1) {
      microAppStore.unmountLoadedApps(microName);
    }
  }
}