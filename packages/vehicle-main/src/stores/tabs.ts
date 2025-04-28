import { defineStore } from 'pinia';
import { events } from '../utils/events';
import i18n from '../locales'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [{
      title: 'dashboard',
      path: '/dashboard',
    }],
    currentTab: '/dashboard',
  }),
  actions: {
    addTabs(route: string | null) {
      this.tabs = route;
    },
    removeTabs(name: string) {
      delete this.tabs[name];
    },
    setCurrentTab(currentTab: string | null) {
      this.currentTab = currentTab;
    },
    removeCurrentTab(currentTab: string) {
      delete this.tabs[name];
    },
  },
  // persist: {
  //   key: 'microApp',
  //   storage: localStorage,
  // },
});