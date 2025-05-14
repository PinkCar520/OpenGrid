import { defineStore } from 'pinia'
import {router} from '@/router'
import { events } from '../utils/events'
import i18n from '../locales'
import { closeSelectMicroTags } from '@/hooks/microAppHelpers'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as Array<any>,
    currentTab: '/dashboard',
  }),
  actions: {
    addCurrentTab(route: Record<string, any>) {
      this.currentTab = route.path
      const existTab = this.tabs.find((item: { path: string }) => item.path === route.path)
      if (!existTab) {
        this.tabs.push(route)
      }
    },
    setCurrentTab(currentTab:string) {
      this.currentTab = currentTab
    },
    removeCurrentTab(currentTab: string) {
      const tabIndex = this.tabs.findIndex((tab) => tab.path === currentTab)
      if (tabIndex === -1) return

      if (this.currentTab === currentTab) {
        const nextTab = this.tabs[tabIndex - 1] || this.tabs[tabIndex + 1]
        this.currentTab = nextTab.path
        if (nextTab) {
          router.push(nextTab.path)
        }
      }
      // Remove the tab
      this.tabs.splice(tabIndex, 1)
      // this.tabs = this.tabs.filter((tab) => tab.path !== currentTab)
      closeSelectMicroTags(currentTab)
    },
  },
  persist: {
    key: 'tabs',
    storage: localStorage,
  },
})
