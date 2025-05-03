import { defineStore } from 'pinia';
import { events } from '../utils/events';
import i18n from '../locales'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as Array<any>,
    currentTab: '/dashboard',
  }),
  actions: {
    addTabs(route: Record<string, any>) {
      const index = this.tabs.findIndex((item) => item.path == route.path);
      //   标签不存在 就添加
      if (index == -1) {
        this.tabs.push(route);
      }
      console.log('tabs', this.tabs);
    },
    removeTabs(name: string) {
      delete this.tabs[name];
    },
    setCurrentTab(currentTab: string | any) {
      console.log('currentTab', currentTab);
      this.currentTab = currentTab;
      console.log('currentTab', this.currentTab);
    },
    removeCurrentTab(currentTab: string) {
      delete this.tabs[name];
    },
  },
  // persist: {
  //   key: 'tabs',
  //   storage: localStorage,
  // },
});